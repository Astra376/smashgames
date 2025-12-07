<template>
  <div class="page-container">
    <div class="header-spacer"></div>
    
    <div class="games-hero">
      <h1>Our <span class="highlight">Universe</span></h1>
      <p>Explore worlds where imagination meets adrenaline.</p>
    </div>

    <div class="games-grid">
      <div v-for="game in games" :key="game.id" class="game-card">
        <div class="image-wrapper">
          <img :src="game.thumbnail" :alt="game.title" loading="lazy">
          <div class="overlay">
            <a v-if="game.released" :href="game.link" target="_blank" class="play-btn">
              <i class="fas fa-gamepad"></i> Play
            </a>
            <span v-else class="status-badge">Coming Soon</span>
          </div>
        </div>
        <div class="card-body">
          <div class="card-header">
            <h3>{{ game.title }}</h3>
          </div>
          <p class="desc">{{ game.description }}</p>
          <div class="card-footer" v-if="game.released">
            <div class="stat">
              <i class="fas fa-user"></i> {{ formatNumber(game.playerCount) }}
            </div>
            <div class="stat">
              <i class="fas fa-thumbs-up"></i> {{ game.likePercentage }}%
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue';
// Asset imports
import robotImg from '@/assets/RobotTycoon.webp';
import solarImg from '@/assets/SolarSystemAdventure.webp';
import marsImg from '@/assets/MarsWarefareTycoon.webp';
import chaosImg from '@/assets/ChaosPlayground.webp';
import billionImg from '@/assets/BillionaireEmpireTycoon.webp';
import animalImg from '@/assets/AnimalWorld.png';
import burgerImg from '@/assets/EscapeBurtsBurgerShop.webp';
import comingSoonImg from '@/assets/ComingSoon.png';

export default defineComponent({
  name: 'GamesPage',
  setup() {
    const games = ref([
      { id: 1, title: 'Robot Tycoon', description: 'Build and manage your own robot empire', thumbnail: robotImg, playerCount: 5300, likePercentage: 71, released: true, link: 'https://www.roblox.com/games/10828925984/Robot-Tycoon' },
      { id: 7, title: 'Billionaire Empire', description: 'Build your business empire', thumbnail: billionImg, playerCount: 200, likePercentage: 81, released: true, link: 'https://www.roblox.com/games/8314692489/Billionaire-Empire-Tycoon' },
      { id: 4, title: 'Mars Warfare', description: 'Dominate the red planet', thumbnail: marsImg, playerCount: 350, likePercentage: 52, released: true, link: 'https://www.roblox.com/games/15024121792/Mars-Tycoon' },
      { id: 6, title: 'Chaos Playground', description: 'Unleash mayhem in this sandbox', thumbnail: chaosImg, playerCount: 350, likePercentage: 42, released: true, link: 'https://www.roblox.com/games/18502373299/Chaos-Playground' },
      { id: 2, title: 'Solar System', description: 'Explore the mysteries of space', thumbnail: solarImg, playerCount: 150, likePercentage: 46, released: true, link: 'https://www.roblox.com/games/5376454753/Solar-System-Adventure' },
      { id: 3, title: 'Escape Burt\'s', description: 'Can you escape the burger shop?', thumbnail: burgerImg, playerCount: 100, likePercentage: 33, released: true, link: 'https://www.roblox.com/games/13442533661/Escape-Burts-Burger-Shop-SCARY-OBBY' },
      { id: 5, title: 'Animal World', description: 'Survive and explore the forest', thumbnail: animalImg, playerCount: 400, likePercentage: 29, released: true, link: 'https://www.roblox.com/games/17779125812/Animal-World' },
      { id: 8, title: 'My School', description: 'Create your dream school', thumbnail: comingSoonImg, playerCount: 0, released: false },
      { id: 9, title: 'Space Station', description: 'Build the ultimate station', thumbnail: comingSoonImg, playerCount: 0, released: false },
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
  padding: 0 40px 100px;
  max-width: 1600px; /* Wider container */
  margin: 0 auto;
}
.header-spacer { height: 120px; }

.games-hero { text-align: center; margin-bottom: 60px; }
.games-hero h1 { font-size: 3rem; margin-bottom: 10px; font-weight: 800; }
.games-hero p { color: var(--text-muted); font-size: 1.2rem; }
.highlight { color: var(--primary); }

.games-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); /* Optimized grid width */
  gap: 30px;
  width: 100%;
}

.game-card {
  background: #151515; /* Solid dark */
  border-radius: 12px;
  overflow: hidden;
  transition: 0.3s ease;
  display: flex;
  flex-direction: column;
}

.game-card:hover {
  transform: translateY(-8px);
  background: #202020;
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

.game-card:hover .image-wrapper img { transform: scale(1.05); }

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
.play-btn:hover { background: #0056b3; }

.status-badge {
  background: rgba(255,255,255,0.2);
  padding: 6px 14px;
  border-radius: 20px;
  font-size: 0.9rem;
}

.card-body { padding: 20px; flex-grow: 1; display: flex; flex-direction: column; }

.card-header { margin-bottom: 8px; }
.card-header h3 { margin: 0; font-size: 1.3rem; color: white; }

.desc { color: var(--text-muted); font-size: 0.9rem; margin-bottom: 15px; flex-grow: 1; }

.card-footer { display: flex; gap: 15px; border-top: 1px solid rgba(255,255,255,0.1); padding-top: 15px; color: #888; font-size: 0.85rem; }
.stat { display: flex; align-items: center; gap: 5px; }
.stat i { color: var(--primary); }
</style>