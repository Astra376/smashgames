// GET /api/roblox-stats — every public game owned by the Smash Games owner account and its groups,
// with summed live CCU and visits. Served from Cloudflare's edge cache and refreshed in the
// background so visitors never wait on (or rate-limit us against) the Roblox APIs.
import { collectStats } from '../../server/roblox-stats.js';

const DEFAULT_USER_ID = 136083958; // Astra376
const FRESH_SECONDS = 60; // serve as-is for this long
const STALE_SECONDS = 600; // then keep serving while refreshing in the background

function toResponse(stats) {
  return new Response(JSON.stringify(stats), {
    headers: {
      'content-type': 'application/json; charset=utf-8',
      'cache-control': `public, max-age=${STALE_SECONDS}`,
      'x-generated-at': String(Date.now()),
    },
  });
}

function clientResponse(res) {
  const out = new Response(res.body, res);
  out.headers.set('cache-control', `public, max-age=${FRESH_SECONDS}`);
  return out;
}

export async function onRequestGet({ request, env, waitUntil }) {
  const userId = Number(env.ROBLOX_USER_ID) || DEFAULT_USER_ID;
  const cache = caches.default;
  const key = new Request(new URL(`/api/roblox-stats?u=${userId}`, request.url).toString());

  const refresh = async () => {
    const res = toResponse(await collectStats(userId));
    await cache.put(key, res.clone());
    return res;
  };

  const cached = await cache.match(key);
  if (cached) {
    const age = (Date.now() - Number(cached.headers.get('x-generated-at') || 0)) / 1000;
    if (age > FRESH_SECONDS) waitUntil(refresh().catch((err) => console.error('roblox-stats refresh failed', err)));
    return clientResponse(cached);
  }

  try {
    return clientResponse(await refresh());
  } catch (err) {
    console.error('roblox-stats failed', err);
    return new Response(JSON.stringify({ error: 'Could not load Roblox stats right now.' }), {
      status: 502,
      headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' },
    });
  }
}
