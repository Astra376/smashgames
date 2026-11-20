import { ref, onMounted, onUnmounted } from 'vue';

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
  inflight = fetch('/api/roblox-stats')
    .then(async (res) => {
      const body = await res.json();
      if (!res.ok) throw new Error(body.error || `HTTP ${res.status}`);
      stats.value = body;
      error.value = null;
    })
    .catch((err) => {
      error.value = err.message;
    })
    .finally(() => {
      loading.value = false;
      inflight = null;
    });
  return inflight;
}

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
  return { stats, error, loading, reload: load };
}
