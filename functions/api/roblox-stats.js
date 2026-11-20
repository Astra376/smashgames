// GET /api/roblox-stats — every public game owned by the Smash Games owner account and its groups,
// with summed live CCU and visits.
//
// Visitors should never wait on game discovery (~40 Roblox requests, which Roblox rate-limits from
// Cloudflare). So:
//  - The discovered game list lives in KV (ROBLOX_STATS) and is rebuilt in the background every 30 min.
//  - Live counts need 1-2 Roblox requests; the finished payload is edge-cached and refreshed in the
//    background once it is over a minute old.
//  - If Roblox is slow or failing, the last known numbers are served instead of an error.
import { discoverGames, fetchLiveCounts, buildStats } from '../../server/roblox-stats.js';

const DEFAULT_USER_ID = 136083958; // Astra376
const FRESH_SECONDS = 60;
const EDGE_CACHE_SECONDS = 3600;
const REDISCOVER_SECONDS = 30 * 60;
const CACHE_VERSION = 2;

function json(body, { status = 200, maxAge = FRESH_SECONDS, generatedAt = Date.now() } = {}) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      'content-type': 'application/json; charset=utf-8',
      'cache-control': status === 200 ? `public, max-age=${maxAge}` : 'no-store',
      'x-generated-at': String(generatedAt),
    },
  });
}

function ageSeconds(isoOrMs) {
  return (Date.now() - new Date(isoOrMs).getTime()) / 1000;
}

export async function onRequestGet({ request, env, waitUntil }) {
  const userId = Number(env.ROBLOX_USER_ID) || DEFAULT_USER_ID;
  const kv = env.ROBLOX_STATS;
  const listKey = `games-list:v${CACHE_VERSION}:${userId}`;
  const cache = caches.default;
  const cacheKey = new Request(new URL(`/api/roblox-stats?u=${userId}&v=${CACHE_VERSION}`, request.url).toString());

  const rediscover = async () => {
    const list = await discoverGames(userId);
    if (kv) await kv.put(listKey, JSON.stringify(list));
    return list;
  };

  const refresh = async (list) => {
    const counts = await fetchLiveCounts(list.games.map((g) => g.universeId));
    const res = json(buildStats(list, counts, new Date().toISOString()), { maxAge: EDGE_CACHE_SECONDS });
    await cache.put(cacheKey, res.clone());
    return res;
  };

  const toClient = (res) => {
    const out = new Response(res.body, res);
    out.headers.set('cache-control', `public, max-age=${FRESH_SECONDS}`);
    return out;
  };

  try {
    let list = kv ? await kv.get(listKey, 'json') : null;
    if (list && ageSeconds(list.discoveredAt) > REDISCOVER_SECONDS) {
      waitUntil(rediscover().catch((err) => console.error('rediscover failed', err)));
    }

    // Fast path: edge-cached payload. If it's over a minute old, return it anyway and refresh behind.
    const cached = await cache.match(cacheKey);
    if (cached) {
      const age = (Date.now() - Number(cached.headers.get('x-generated-at') || 0)) / 1000;
      if (age > FRESH_SECONDS) {
        waitUntil(
          (async () => refresh(list || (await rediscover())))().catch((err) => console.error('refresh failed', err))
        );
      }
      return toClient(cached);
    }

    // Cold edge cache. Only the very first request ever (empty KV) has to wait for discovery.
    if (!list) list = await rediscover();
    try {
      return toClient(await refresh(list));
    } catch (err) {
      console.error('live counts failed, serving stored numbers', err);
      return json(buildStats(list));
    }
  } catch (err) {
    console.error('roblox-stats failed', err);
    return json({ error: 'Could not load Roblox stats right now.' }, { status: 502 });
  }
}
