<template>
  <div class="page-container">
    <div class="header-spacer"></div>

    <div class="games-hero">
      <h1>Our <span class="highlight">Universe</span></h1>
      <p>Explore worlds where imagination meets adrenaline.</p>
    </div>

    <StatsBar class="games-stats" />

    <LoadingSpinner v-if="loading && !stats" />
    <ErrorMessage v-else-if="error && !stats" :message="`Couldn't load games: ${error}`" />

    <div v-else-if="stats" class="games-grid">
      <div v-for="game in stats.games" :key="game.universeId" class="game-card">
        <div class="image-wrapper">
          <img v-if="game.thumbnail" :src="game.thumbnail" :alt="game.name" loading="lazy">
          <span v-if="game.playing > 0" class="live-badge"><span class="dot"></span>{{ formatNumber(game.playing) }} playing</span>
          <div class="overlay">
            <a :href="game.url" target="_blank" rel="noopener" class="play-btn">
              <i class="fas fa-gamepad"></i> Play
            </a>
          </div>
        </div>
        <div class="card-body">
          <div class="card-header">
            <h3>{{ game.name }}</h3>
          </div>
          <p class="owner">by {{ game.owner.name }}</p>
          <div class="game-stats">
            <span><i class="fas fa-user"></i> {{ formatNumber(game.playing) }}</span>
            <span><i class="fas fa-eye"></i> {{ formatCompact(game.visits) }} visits</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import StatsBar from '@/components/StatsBar.vue';
import LoadingSpinner from '@/components/LoadingSpinner.vue';
import ErrorMessage from '@/components/ErrorMessage.vue';
import { useRobloxStats, formatCompact, formatNumber } from '@/composables/useRobloxStats';

export default defineComponent({
  name: 'GamesPage',
  components: { StatsBar, LoadingSpinner, ErrorMessage },
  setup() {
    const { stats, error, loading } = useRobloxStats();
    return { stats, error, loading, formatCompact, formatNumber };
  }
});
</script>

<style scoped>
.page-container {
  min-height: 100vh;
  padding: 0 40px 100px;
  max-width: 1600px;
  margin: 0 auto;
}
.header-spacer { height: 120px; }

.games-hero { text-align: center; margin-bottom: 60px; }
.games-hero h1 { font-size: 3rem; margin-bottom: 10px; font-weight: 800; color: white; }
.games-hero p { color: var(--text-muted); font-size: 1.2rem; }
.highlight { color: var(--primary); }

.games-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 30px;
  width: 100%;
}

.game-card {
  background: var(--bg-card);
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: 12px;
  overflow: hidden;
  transition: 0.3s ease;
  display: flex;
  flex-direction: column;
}

.game-card:hover {
  transform: translateY(-8px);
  background: rgba(255,255,255,0.05);
}

.image-wrapper {
  position: relative;
  width: 100%;
  padding-top: 56.25%;
  overflow: hidden;
}

.image-wrapper img {
  position: absolute;
  top: 0; left: 0; width: 100%; height: 100%;
  object-fit: cover;
  transition: 0.5s ease;
}

.game-card:hover .image-wrapper img { transform: scale(1.1); }

.overlay {
  position: absolute; inset: 0;
  background: rgba(0,0,0,0.6);
  display: flex; align-items: center; justify-content: center;
  opacity: 0; transition: 0.3s;
}
.game-card:hover .overlay { opacity: 1; }

.play-btn {
  padding: 10px 25px;
  background: var(--primary);
  color: white;
  text-decoration: none;
  border-radius: 20px;
  font-weight: bold;
  display: flex; align-items: center; gap: 8px;
}
.play-btn:hover { background: var(--primary-hover); }

.status-badge {
  background: rgba(255,255,255,0.1);
  padding: 6px 14px;
  border-radius: 20px;
  font-size: 0.9rem;
  backdrop-filter: blur(5px);
}

.card-body { padding: 20px; flex-grow: 1; display: flex; flex-direction: column; }

.card-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px; }
.card-header h3 { margin: 0; font-size: 1.3rem; color: white; }


.games-stats { margin-bottom: 60px; }

.image-wrapper { background: #0f0f14; }

.live-badge {
  position: absolute; top: 12px; left: 12px; z-index: 1;
  display: flex; align-items: center; gap: 6px;
  background: rgba(0,0,0,0.75);
  padding: 4px 10px; border-radius: 20px;
  font-size: 0.8rem; font-weight: 600; color: white;
}
.live-badge .dot { width: 8px; height: 8px; border-radius: 50%; background: #22c55e; }

.owner { color: var(--text-muted); font-size: 0.85rem; margin: 0 0 12px; }
.game-stats { display: flex; gap: 18px; color: var(--text-muted); font-size: 0.9rem; margin-top: auto; }
.game-stats i { margin-right: 4px; }
</style>