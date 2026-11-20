<template>
  <div class="stats-bar" :class="`size-${size}`">
    <div class="stat live">
      <span class="value">
        <span class="pulse" aria-hidden="true"></span>{{ stats ? formatNumber(stats.totals.liveCcu) : '—' }}
      </span>
      <span class="label">Playing now</span>
    </div>
    <div class="stat">
      <span class="value" :title="stats ? `${formatNumber(stats.totals.visits)} visits` : ''">
        {{ stats ? formatCompact(stats.totals.visits) : '—' }}
      </span>
      <span class="label">Total visits</span>
    </div>
    <div class="stat">
      <span class="value">{{ stats ? listedGames.length : '—' }}</span>
      <span class="label">Live games</span>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { useRobloxStats, formatCompact, formatNumber } from '@/composables/useRobloxStats';

export default defineComponent({
  name: 'StatsBar',
  props: {
    // 'normal' for inline use, 'hero' for the big home-page tiles.
    size: { type: String, default: 'normal' },
  },
  setup() {
    const { stats, listedGames } = useRobloxStats();
    return { stats, listedGames, formatCompact, formatNumber };
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
  line-height: 1;
  color: white;
  display: flex;
  align-items: center;
  gap: 12px;
  font-variant-numeric: tabular-nums;
}
.label {
  margin-top: 8px;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 2px;
  font-size: 0.85rem;
  font-weight: 500;
}
.pulse {
  width: 12px; height: 12px; border-radius: 50%;
  flex-shrink: 0;
  background: #22c55e;
  box-shadow: 0 0 0 0 rgba(34, 197, 94, 0.6);
  animation: pulse 2s infinite;
}
@keyframes pulse {
  70% { box-shadow: 0 0 0 12px rgba(34, 197, 94, 0); }
  100% { box-shadow: 0 0 0 0 rgba(34, 197, 94, 0); }
}

/* Hero: big, boxed tiles that read at a glance. */
.size-hero { gap: clamp(0.75rem, 2vw, 1.5rem); }
.size-hero .stat {
  box-sizing: border-box;
  min-width: clamp(150px, 20vw, 260px);
  padding: clamp(1.25rem, 2.5vw, 2rem) clamp(1rem, 2.5vw, 2.5rem);
  background: rgba(255, 255, 255, 0.04);
  border: var(--glass-border);
  border-radius: 20px;
}
.size-hero .stat.live { border-color: rgba(34, 197, 94, 0.35); background: rgba(34, 197, 94, 0.06); }
.size-hero .value { font-size: clamp(2.5rem, 6vw, 4.75rem); font-weight: 900; letter-spacing: -1px; }
.size-hero .stat.live .value { color: #4ade80; }
.size-hero .pulse { width: 16px; height: 16px; }
.size-hero .label { font-size: clamp(0.75rem, 1.2vw, 0.95rem); color: #c8c8d0; }

@media (max-width: 560px) {
  .size-hero .stat { min-width: 0; flex: 1 1 40%; }
  .size-hero .stat.live { flex-basis: 100%; }
}
</style>
