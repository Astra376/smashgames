// Collects every public game owned by a Roblox user and by every group that user owns,
// then totals live players (CCU) and visits. Runs in Cloudflare Pages Functions and Node 18+.

async function getJson(url, attempt = 0) {
  const res = await fetch(url, { headers: { accept: 'application/json' } });
  if (res.status === 429 && attempt < 4) {
    await new Promise((r) => setTimeout(r, 1000 * 2 ** attempt));
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

export async function collectStats(userId) {
  const groups = await getOwnedGroups(userId);

  const owners = [
    { type: 'User', id: userId, url: `https://games.roblox.com/v2/users/${userId}/games?accessFilter=Public` },
    ...groups.map((g) => ({ type: 'Group', id: g.id, name: g.name, url: `https://games.roblox.com/v2/groups/${g.id}/games?accessFilter=Public` })),
  ];

  // A few owners at a time keeps us under Roblox rate limits. If one owner fails, the request
  // fails rather than silently publishing totals that are too low.
  const ownerOf = new Map();
  for (const batch of chunk(owners, 5)) {
    const results = await Promise.all(batch.map((o) => paginate(o.url)));
    results.forEach((games, i) => games.forEach((g) => ownerOf.set(g.id, batch[i])));
  }

  const universeIds = [...ownerOf.keys()];
  const details = new Map();
  const thumbs = new Map();
  const icons = new Map();
  for (const ids of chunk(universeIds, 50)) {
    const list = ids.join(',');
    const [info, thumbRes, iconRes] = await Promise.all([
      getJson(`https://games.roblox.com/v1/games?universeIds=${list}`),
      getJson(`https://thumbnails.roblox.com/v1/games/multiget/thumbnails?universeIds=${list}&countPerUniverse=1&size=768x432&format=Png&isCircular=false`).catch(() => ({ data: [] })),
      getJson(`https://thumbnails.roblox.com/v1/games/icons?universeIds=${list}&size=512x512&format=Png&isCircular=false`).catch(() => ({ data: [] })),
    ]);
    for (const d of info.data || []) details.set(d.id, d);
    for (const t of thumbRes.data || []) {
      const img = t.thumbnails?.find((x) => x.state === 'Completed');
      if (img) thumbs.set(t.universeId, img.imageUrl);
    }
    for (const t of iconRes.data || []) if (t.state === 'Completed') icons.set(t.targetId, t.imageUrl);
  }

  const games = universeIds
    .map((id) => {
      const d = details.get(id);
      if (!d) return null;
      const owner = ownerOf.get(id);
      return {
        universeId: id,
        placeId: d.rootPlaceId,
        name: d.name,
        description: d.description || '',
        playing: d.playing || 0,
        visits: d.visits || 0,
        favorites: d.favoritedCount || 0,
        created: d.created,
        updated: d.updated,
        owner: { type: owner.type, id: owner.id, name: d.creator?.name || owner.name },
        thumbnail: thumbs.get(id) || icons.get(id) || null,
        icon: icons.get(id) || null,
        url: `https://www.roblox.com/games/${d.rootPlaceId}`,
      };
    })
    .filter(Boolean)
    .sort((a, b) => b.playing - a.playing || b.visits - a.visits);

  return {
    updatedAt: new Date().toISOString(),
    totals: {
      liveCcu: games.reduce((s, g) => s + g.playing, 0),
      visits: games.reduce((s, g) => s + g.visits, 0),
      games: games.length,
      groups: groups.length,
    },
    groups,
    games,
  };
}
