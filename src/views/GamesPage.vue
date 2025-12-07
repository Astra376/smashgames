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
      { id: 1, title: 'Robot Tycoon', description: 'Build and manage your own robot empire', thumbnail: robotImg, released: true, link: 'https://www.roblox.com/games/10828925984/Robot-Tycoon' },
      { id: 7, title: 'Billionaire Empire', description: 'Build your business empire', thumbnail: billionImg, released: true, link: 'https://www.roblox.com/games/8314692489/Billionaire-Empire-Tycoon' },
      { id: 4, title: 'Mars Warfare', description: 'Dominate the red planet', thumbnail: marsImg, released: true, link: 'https://www.roblox.com/games/15024121792/Mars-Tycoon' },
      { id: 6, title: 'Chaos Playground', description: 'Unleash mayhem in this sandbox', thumbnail: chaosImg, released: true, link: 'https://www.roblox.com/games/18502373299/Chaos-Playground' },
      { id: 2, title: 'Solar System', description: 'Explore the mysteries of space', thumbnail: solarImg, released: true, link: 'https://www.roblox.com/games/5376454753/Solar-System-Adventure' },
      { id: 3, title: 'Escape Burt\'s', description: 'Can you escape the burger shop?', thumbnail: burgerImg, released: true, link: 'https://www.roblox.com/games/13442533661/Escape-Burts-Burger-Shop-SCARY-OBBY' },
      { id: 5, title: 'Animal World', description: 'Survive and explore the forest', thumbnail: animalImg, released: true, link: 'https://www.roblox.com/games/17779125812/Animal-World' },
      { id: 8, title: 'My School', description: 'Create your dream school', thumbnail: comingSoonImg, released: false },
      { id: 9, title: 'Space Station', description: 'Build the ultimate station', thumbnail: comingSoonImg, released: false },
    ]);

    return { games };
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

.desc { color: var(--text-muted); font-size: 0.9rem; margin-bottom: 0; flex-grow: 1; }
</style>