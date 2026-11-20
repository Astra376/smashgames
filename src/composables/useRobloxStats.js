import { ref, computed, onMounted, onUnmounted } from 'vue';

// Shared across components so the home and games pages reuse one request.
const stats = ref(null);
const error = ref(null);
const loading = ref(false);
let users = 0;
let timer = null;
let inflight = null;

async function load() {
  if (inflight) return inflight;
  loading.value = !stats.value;
  inflight = fetch('/api/roblox-stats', { signal: AbortSignal.timeout(20000) })
    .then(async (res) => {
      const body = await res.json();
      if (!res.ok) throw new Error(body.error || `HTTP ${res.status}`);
      stats.value = body;
      error.value = null;
    })
    .catch((err) => {
      error.value = err.name === 'TimeoutError' ? 'the request timed out' : err.message;
    })
    .finally(() => {
      loading.value = false;
      inflight = null;
    });
  return inflight;
}

// Small, quiet games are hidden from listings (they still count toward the totals).
export const MIN_LISTED_VISITS = 100000;
export const isListed = (g) => g.visits >= MIN_LISTED_VISITS || g.playing > 0;
const listedGames = computed(() => (stats.value?.games || []).filter(isListed));

export function formatCompact(n) {
  return new Intl.NumberFormat('en-US', { notation: 'compact', maximumFractionDigits: 1 }).format(n || 0);
}

export function formatNumber(n) {
  return new Intl.NumberFormat('en-US').format(n || 0);
}

export function useRobloxStats({ refreshMs = 60000 } = {}) {
  onMounted(() => {
    users++;
    load();
    if (!timer) timer = setInterval(load, refreshMs);
  });
  onUnmounted(() => {
    users--;
    if (users === 0 && timer) {
      clearInterval(timer);
      timer = null;
    }
  });
  return { stats, listedGames, error, loading, reload: load };
}
