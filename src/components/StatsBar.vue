<template>
  <div class="stats-bar">
    <div class="stat">
      <span class="value live">
        <span class="pulse"></span>{{ stats ? formatNumber(stats.totals.liveCcu) : '—' }}
      </span>
      <span class="label">Playing now</span>
    </div>
    <div class="stat">
      <span class="value" :title="stats ? formatNumber(stats.totals.visits) : ''">
        {{ stats ? formatCompact(stats.totals.visits) : '—' }}
      </span>
      <span class="label">Total visits</span>
    </div>
    <div class="stat">
      <span class="value">{{ stats ? stats.totals.games : '—' }}</span>
      <span class="label">Games</span>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { useRobloxStats, formatCompact, formatNumber } from '@/composables/useRobloxStats';

export default defineComponent({
  name: 'StatsBar',
  setup() {
    const { stats } = useRobloxStats();
    return { stats, formatCompact, formatNumber };
  },
});
</script>

<style scoped>
.stats-bar {
  display: flex;
  justify-content: center;
  gap: clamp(1.5rem, 6vw, 5rem);
  flex-wrap: wrap;
}
.stat { display: flex; flex-direction: column; align-items: center; min-width: 120px; }
.value {
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 800;
  color: white;
  display: flex;
  align-items: center;
  gap: 12px;
  font-variant-numeric: tabular-nums;
}
.label { color: var(--text-muted); text-transform: uppercase; letter-spacing: 1px; font-size: 0.85rem; }
.pulse {
  width: 12px; height: 12px; border-radius: 50%;
  background: #22c55e;
  box-shadow: 0 0 0 0 rgba(34, 197, 94, 0.6);
  animation: pulse 2s infinite;
}
@keyframes pulse {
  70% { box-shadow: 0 0 0 12px rgba(34, 197, 94, 0); }
  100% { box-shadow: 0 0 0 0 rgba(34, 197, 94, 0); }
}
</style>
