<template>
  <div class="page-container">
    <div class="header-spacer"></div>
    
    <div class="games-hero">
      <h1>Our <span class="highlight">Universe</span></h1>
      <p>Explore worlds where imagination meets adrenaline.</p>
    </div>

    <div class="games-grid-container">
      <div v-for="game in games" :key="game.id" class="game-card">
        <div class="image-wrapper">
          <img :src="game.thumbnail" :alt="game.title" loading="lazy">
          <div class="overlay">
            <a v-if="game.released" :href="game.link" target="_blank" class="play-btn">Play Now</a>
            <span v-else class="coming-soon">Coming Soon</span>
          </div>
        </div>
        <div class="card-info">
          <h3>{{ game.title }}</h3>
          <p>{{ game.description }}</p>
          <div class="stats" v-if="game.released">
            <span><i class="fas fa-user"></i> {{ formatNumber(game.playerCount) }} playing</span>
            <span><i class="fas fa-thumbs-up"></i> {{ game.likePercentage }}%</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'GamesPage',
  setup() {
    const games = ref([
      { id: 1, title: 'Robot Tycoon', description: 'Build your mechanical empire.', thumbnail: 'src/assets/RobotTycoon.webp', playerCount: 5300, likePercentage: 71, released: true, link: 'https://www.roblox.com/games/10828925984/Robot-Tycoon' },
      { id: 2, title: 'Solar System Adventure', description: 'Traverse the galaxy.', thumbnail: 'src/assets/SolarSystemAdventure.webp', playerCount: 150, likePercentage: 46, released: true, link: '#' },
      { id: 4, title: 'Mars Warfare', description: 'Dominate the red planet.', thumbnail: 'src/assets/MarsWarefareTycoon.webp', playerCount: 350, likePercentage: 52, released: true, link: '#' },
      { id: 6, title: 'Chaos Playground', description: 'Pure physics mayhem.', thumbnail: 'src/assets/ChaosPlayground.webp', playerCount: 350, likePercentage: 42, released: true, link: '#' },
      { id: 7, title: 'Billionaire Empire', description: 'Rise to the top.', thumbnail: 'src/assets/BillionaireEmpireTycoon.webp', playerCount: 200, likePercentage: 81, released: true, link: '#' },
      { id: 5, title: 'Animal World', description: 'Survive the wild.', thumbnail: 'src/assets/AnimalWorld.png', playerCount: 400, likePercentage: 29, released: true, link: '#' },
      { id: 8, title: 'My School', description: 'Create your dream school.', thumbnail: 'src/assets/ComingSoon.png', released: false },
    ]);

    const formatNumber = (num) => {
      return num > 999 ? (num/1000).toFixed(1) + 'k' : num;
    };

    return { games, formatNumber };
  }
});
</script>

<style scoped>
.page-container {
  min-height: 100vh;
  padding: 0 20px 100px;
  max-width: 1200px;
  margin: 0 auto;
}
.header-spacer { height: 100px; }

.games-hero { text-align: center; margin-bottom: 60px; }
.games-hero h1 { font-size: 3rem; margin-bottom: 10px; }
.games-hero p { color: var(--text-muted); font-size: 1.2rem; }
.highlight { color: var(--primary); }

.games-grid-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 30px;
}

.game-card {
  background: var(--bg-card);
  border: var(--glass-border);
  border-radius: 12px;
  overflow: hidden;
  transition: 0.3s ease;
}

.game-card:hover { transform: translateY(-10px); box-shadow: 0 10px 30px rgba(0,0,0,0.5); }

.image-wrapper { position: relative; height: 200px; overflow: hidden; }
.image-wrapper img { width: 100%; height: 100%; object-fit: cover; transition: 0.5s; }
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
  transform: scale(0.9); transition: 0.3s;
}
.play-btn:hover { transform: scale(1); box-shadow: 0 0 15px var(--primary-glow); }

.card-info { padding: 20px; }
.card-info h3 { margin: 0 0 5px; font-size: 1.2rem; }
.card-info p { color: var(--text-muted); font-size: 0.9rem; margin-bottom: 15px; }

.stats { display: flex; justify-content: space-between; font-size: 0.85rem; color: #888; }
.stats i { color: var(--primary); margin-right: 5px; }
</style>