// Roblox data for the Smash Games site. Runs in Cloudflare Pages Functions and Node 18+.
//
// discoverGames(): slow (~40 requests) — finds every group the user owns and every public game
//   owned by the user or those groups, with names and thumbnails. Run rarely and store the result.
// fetchLiveCounts(): fast (1 request per 50 games) — current players and visits for known games.

const REQUEST_TIMEOUT_MS = 8000;

async function getJson(url, attempt = 0) {
  const res = await fetch(url, {
    headers: { accept: 'application/json' },
    signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
  });
  if (res.status === 429 && attempt < 2) {
    await new Promise((r) => setTimeout(r, 750 * (attempt + 1)));
    return getJson(url, attempt + 1);
  }
  if (!res.ok) throw new Error(`${res.status} from ${url}`);
  return res.json();
}

async function paginate(baseUrl) {
  const out = [];
  let cursor = '';
  do {
    const sep = baseUrl.includes('?') ? '&' : '?';
    const page = await getJson(`${baseUrl}${sep}limit=50&sortOrder=Asc${cursor ? `&cursor=${encodeURIComponent(cursor)}` : ''}`);
    out.push(...(page.data || []));
    cursor = page.nextPageCursor;
  } while (cursor);
  return out;
}

function chunk(arr, size) {
  const out = [];
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
  return out;
}

// The owner isn't always in the rank-255 role, so check each group's actual owner field.
export async function getOwnedGroups(userId) {
  const { data } = await getJson(`https://groups.roblox.com/v2/users/${userId}/groups/roles?includeLocked=true`);
  const members = new Map(data.map((m) => [m.group.id, m.group.memberCount]));
  const owned = [];
  for (const ids of chunk([...members.keys()], 50)) {
    const res = await getJson(`https://groups.roblox.com/v2/groups?groupIds=${ids.join(',')}`);
    for (const g of res.data || []) {
      if (g.owner?.id === userId) owned.push({ id: g.id, name: g.name, memberCount: members.get(g.id) || 0 });
    }
  }
  return owned;
}

export async function fetchLiveCounts(universeIds) {
  const counts = new Map();
  const batches = await Promise.all(chunk(universeIds, 50).map((ids) => getJson(`https://games.roblox.com/v1/games?universeIds=${ids.join(',')}`)));
  for (const batch of batches) {
    for (const d of batch.data || []) {
      counts.set(d.id, { playing: d.playing || 0, visits: d.visits || 0, favorites: d.favoritedCount || 0, name: d.name, placeId: d.rootPlaceId, creator: d.creator, created: d.created, updated: d.updated });
    }
  }
  return counts;
}

export async function discoverGames(userId) {
  const groups = await getOwnedGroups(userId);

  const owners = [
    { type: 'User', id: userId, url: `https://games.roblox.com/v2/users/${userId}/games?accessFilter=Public` },
    ...groups.map((g) => ({ type: 'Group', id: g.id, name: g.name, url: `https://games.roblox.com/v2/groups/${g.id}/games?accessFilter=Public` })),
  ];

  // A few owners at a time keeps us under Roblox rate limits. If any owner fails the whole
  // discovery fails, so callers keep the previous complete list instead of a partial one.
  const ownerOf = new Map();
  for (const batch of chunk(owners, 8)) {
    const results = await Promise.all(batch.map((o) => paginate(o.url)));
    results.forEach((games, i) => games.forEach((g) => ownerOf.set(g.id, batch[i])));
  }

  const universeIds = [...ownerOf.keys()];
  const thumbs = new Map();
  const [counts] = await Promise.all([
    fetchLiveCounts(universeIds),
    ...chunk(universeIds, 50).map(async (ids) => {
      const res = await getJson(`https://thumbnails.roblox.com/v1/games/multiget/thumbnails?universeIds=${ids.join(',')}&countPerUniverse=1&size=768x432&format=Png&isCircular=false`).catch(() => ({ data: [] }));
      for (const t of res.data || []) {
        const img = t.thumbnails?.find((x) => x.state === 'Completed');
        if (img) thumbs.set(t.universeId, img.imageUrl);
      }
    }),
  ]);

  const games = universeIds
    .filter((id) => counts.has(id))
    .map((id) => {
      const d = counts.get(id);
      const owner = ownerOf.get(id);
      return {
        universeId: id,
        placeId: d.placeId,
        name: d.name,
        playing: d.playing,
        visits: d.visits,
        favorites: d.favorites,
        created: d.created,
        updated: d.updated,
        owner: { type: owner.type, id: owner.id, name: d.creator?.name || owner.name },
        thumbnail: thumbs.get(id) || null,
        url: `https://www.roblox.com/games/${d.placeId}`,
      };
    });

  return { discoveredAt: new Date().toISOString(), groups, games };
}

// Combine a discovered game list with (optionally) fresher live counts into the API payload.
export function buildStats(list, counts, countsAt) {
  const games = list.games
    .map((g) => {
      const c = counts?.get(g.universeId);
      return c ? { ...g, playing: c.playing, visits: c.visits, favorites: c.favorites, name: c.name } : g;
    })
    .sort((a, b) => b.playing - a.playing || b.visits - a.visits);

  return {
    updatedAt: countsAt || list.discoveredAt,
    discoveredAt: list.discoveredAt,
    totals: {
      liveCcu: games.reduce((s, g) => s + g.playing, 0),
      visits: games.reduce((s, g) => s + g.visits, 0),
      games: games.length,
      groups: list.groups.length,
    },
    groups: list.groups,
    games,
  };
}

// Convenience for scripts/tests: full fresh stats in one call.
export async function collectStats(userId) {
  return buildStats(await discoverGames(userId));
}
