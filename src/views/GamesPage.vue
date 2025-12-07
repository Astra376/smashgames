<template>
  <div class="page-container">
    <div class="header-spacer"></div>
    
    <div class="page-header">
      <h1>OUR UNIVERSE</h1>
    </div>

    <div class="games-grid">
      <a v-for="game in games" :key="game.id" :href="game.link || '#'" target="_blank" class="game-tile">
        <div class="image-wrapper">
          <img :src="game.thumbnail" :alt="game.title" loading="lazy">
        </div>
        <div class="tile-details">
          <h3>{{ game.title }}</h3>
          <span v-if="game.released" class="action">Play Now</span>
          <span v-else class="action disabled">Coming Soon</span>
        </div>
      </a>
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
      { id: 1, title: 'Robot Tycoon', thumbnail: robotImg, released: true, link: 'https://www.roblox.com/games/10828925984/Robot-Tycoon' },
      { id: 7, title: 'Billionaire Empire', thumbnail: billionImg, released: true, link: 'https://www.roblox.com/games/8314692489/Billionaire-Empire-Tycoon' },
      { id: 4, title: 'Mars Warfare', thumbnail: marsImg, released: true, link: 'https://www.roblox.com/games/15024121792/Mars-Tycoon' },
      { id: 6, title: 'Chaos Playground', thumbnail: chaosImg, released: true, link: 'https://www.roblox.com/games/18502373299/Chaos-Playground' },
      { id: 2, title: 'Solar System', thumbnail: solarImg, released: true, link: 'https://www.roblox.com/games/5376454753/Solar-System-Adventure' },
      { id: 3, title: 'Escape Burt\'s', thumbnail: burgerImg, released: true, link: 'https://www.roblox.com/games/13442533661/Escape-Burts-Burger-Shop-SCARY-OBBY' },
      { id: 5, title: 'Animal World', thumbnail: animalImg, released: true, link: 'https://www.roblox.com/games/17779125812/Animal-World' },
      { id: 8, title: 'My School', thumbnail: comingSoonImg, released: false },
      { id: 9, title: 'Space Station', thumbnail: comingSoonImg, released: false },
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

.page-header { margin-bottom: 60px; }
.page-header h1 { font-size: 3rem; font-weight: 800; text-transform: uppercase; margin: 0; }

.games-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 40px 30px;
  width: 100%;
}

.game-tile {
  text-decoration: none;
  color: white;
  display: flex;
  flex-direction: column;
}

.image-wrapper {
  width: 100%;
  aspect-ratio: 16/9;
  background: #111;
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 15px;
}

.image-wrapper img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: opacity 0.3s;
}

.game-tile:hover .image-wrapper img { opacity: 0.8; }

.tile-details { display: flex; justify-content: space-between; align-items: center; }

.tile-details h3 { font-size: 1.2rem; font-weight: 600; margin: 0; }

.action { font-size: 0.9rem; color: #888; text-transform: uppercase; letter-spacing: 1px; }
.action.disabled { opacity: 0.5; }

@media (max-width: 768px) {
  .page-container { padding: 0 20px 60px; }
  .games-grid { grid-template-columns: 1fr; }
}
</style>