<template>
  <div class="page-wrap">
    <div class="spacer"></div>
    <div class="container">
      <h1 class="page-title">All Games</h1>
      
      <div class="full-grid">
        <a 
          v-for="game in games" 
          :key="game.id" 
          :href="game.released ? game.link : '#'" 
          :class="['tile', { disabled: !game.released }]"
          target="_blank"
        >
          <div class="tile-img">
            <img :src="game.thumbnail" :alt="game.title" loading="lazy" />
            <div class="tile-overlay" v-if="!game.released">
              <span>Coming Soon</span>
            </div>
          </div>
          <div class="tile-info">
            <h3>{{ game.title }}</h3>
          </div>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue';
import robotImg from '@/assets/RobotTycoon.webp';
import solarImg from '@/assets/SolarSystemAdventure.webp';
import marsImg from '@/assets/MarsWarefareTycoon.webp';
import chaosImg from '@/assets/ChaosPlayground.webp';
import billionImg from '@/assets/BillionaireEmpireTycoon.webp';
import animalImg from '@/assets/AnimalWorld.png';
import burgerImg from '@/assets/EscapeBurtsBurgerShop.webp';
import comingSoonImg from '@/assets/ComingSoon.png';

export default defineComponent({
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
.page-wrap { min-height: 100vh; padding-bottom: 80px; }
.spacer { height: 120px; }
.container { max-width: var(--max-width); margin: 0 auto; padding: 0 40px; }

.page-title {
  font-size: 2.5rem;
  font-weight: 800;
  margin-bottom: 40px;
  color: white;
}

.full-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 30px;
}

.tile {
  display: block;
  text-decoration: none;
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  overflow: hidden;
  transition: 0.2s;
}

.tile:not(.disabled):hover {
  border-color: #555;
  transform: translateY(-2px);
}

.tile-img {
  position: relative;
  width: 100%;
  aspect-ratio: 16/9;
  background: #222;
}

.tile-img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.tile-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0,0,0,0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  color: #ccc;
}

.tile-info { padding: 15px; }
.tile-info h3 { margin: 0; font-size: 1rem; color: white; font-weight: 500; }

@media (max-width: 768px) {
  .container { padding: 0 20px; }
}
</style>