<template>
  <section id="home">
    <div class="home-page" ref="homePageRef">
      
      <div class="background-overlay"></div>
      <ParticlesBackground class="particles-layer" />

      <div class="hero-wrapper">
        <div class="hero-content">
          <div class="logo-wrapper">
            <img src="@/assets/logo 2.png" alt="Company Logo" class="logo" />
            <div class="logo-glow"></div>
          </div>

          <h1 class="tagline">
            Breaking barriers.<br />
            <span class="highlight">Smashing expectations.</span>
          </h1>

          <div class="cta-container">
            <router-link to="/careers" class="cta-button primary">
              <span>Join the Team</span>
              <div class="shine"></div>
            </router-link>
            <router-link to="/games" class="cta-button secondary">
              Explore Games
            </router-link>
          </div>
        </div>

        <div class="scroll-indicator">
          <span>Scroll</span>
          <div class="line"></div>
        </div>
      </div>
    </div>

    <section id="featured-games" class="section-wrapper">
      <div class="section-header">
        <h2>Featured Titles</h2>
        <div class="divider"></div>
      </div>
      <FeaturedGames :games="featuredGames" />
    </section>

    <section id="about" class="section-wrapper alt-bg">
      <AboutSection />
    </section>
  </section>
</template>

<script>
import { defineComponent, ref } from 'vue';
import FeaturedGames from '@/components/FeaturedGames.vue';
import AboutSection from '@/components/AboutSection.vue';
import ParticlesBackground from '@/components/ParticlesBackground.vue';

// Import Assets
import robotImg from '@/assets/RobotTycoon.webp';
import solarImg from '@/assets/SolarSystemAdventure.webp';
import burgerImg from '@/assets/EscapeBurtsBurgerShop.webp';
import marsImg from '@/assets/MarsWarefareTycoon.webp';
import animalImg from '@/assets/AnimalWorld.png';
import chaosImg from '@/assets/ChaosPlayground.webp';
import billionImg from '@/assets/BillionaireEmpireTycoon.webp';
import comingSoonImg from '@/assets/ComingSoon.png';

export default defineComponent({
  name: 'HomePage',
  components: {
    FeaturedGames,
    AboutSection,
    ParticlesBackground,
  },
  setup() {
    const featuredGames = ref([
      { id: 1, title: 'Robot Tycoon', description: 'Build and manage your own robot empire', thumbnail: robotImg, playerCount: 5300, playSessions: 38000000, likePercentage: 71, released: true, link: 'https://www.roblox.com/games/10828925984/Robot-Tycoon' },
      { id: 2, title: 'Solar System Adventure', description: 'Explore the mysteries of space', thumbnail: solarImg, playerCount: 150, playSessions: 2800000, likePercentage: 46, released: true, link: 'https://www.roblox.com/games/5376454753/Solar-System-Adventure' },
      { id: 3, title: 'Escape Burt\'s Burger Shop!', description: 'Can you escape the infamous burger shop?', thumbnail: burgerImg, playerCount: 100, playSessions: 5300, likePercentage: 33, released: true, link: 'https://www.roblox.com/games/13442533661/Escape-Burts-Burger-Shop-SCARY-OBBY' },
      { id: 4, title: 'Mars Warfare Tycoon', description: 'Dominate the red planet', thumbnail: marsImg, playerCount: 350, playSessions: 15033, likePercentage: 52, released: true, link: 'https://www.roblox.com/games/15024121792/Mars-Tycoon' },
      { id: 5, title: 'Animal World 🐺', description: 'Survive and explore the forest', thumbnail: animalImg, playerCount: 400, playSessions: 339719, likePercentage: 29, released: true, link: 'https://www.roblox.com/games/17779125812/Animal-World' },
      { id: 6, title: 'Chaos Playground', description: 'Unleash mayhem in this sandbox world', thumbnail: chaosImg, playerCount: 350, playSessions: 9900, likePercentage: 42, released: true, link: 'https://www.roblox.com/games/18502373299/Chaos-Playground' },
      { id: 7, title: 'Billionaire Empire Tycoon', description: 'Build your business empire', thumbnail: billionImg, playerCount: 200, playSessions: 177252, likePercentage: 81, released: true, link: 'https://www.roblox.com/games/8314692489/Billionaire-Empire-Tycoon' },
      { id: 8, title: 'My School', description: 'Create and manage your dream school', thumbnail: comingSoonImg, playerCount: 0, playSessions: 0, likePercentage: 0, released: false, link: '' },
      { id: 9, title: 'Space Station Tycoon', description: 'Build the ultimate space station', thumbnail: comingSoonImg, playerCount: 0, playSessions: 0, likePercentage: 0, released: false, link: '' },
      { id: 10, title: 'House Flipper', description: 'Buy, renovate and sell houses', thumbnail: comingSoonImg, playerCount: 0, playSessions: 0, likePercentage: 0, released: false, link: '' },
    ]);

    return { featuredGames };
  }
});
</script>

<style scoped>
.home-page {
  position: relative;
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.background-overlay {
  position: absolute;
  top: 0; left: 0; width: 100%; height: 100%;
  background: radial-gradient(circle at 50% 0%, #1a2542 0%, #0a0a0f 60%);
  z-index: 0;
}

.particles-layer {
  position: absolute;
  top: 0; left: 0; width: 100%; height: 100%;
  z-index: 1;
}

.hero-wrapper {
  position: relative;
  z-index: 2;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.hero-content {
  text-align: center;
  padding: 0 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.logo-wrapper { position: relative; margin-bottom: 2rem; display: flex; justify-content: center; }

.logo {
  width: clamp(200px, 30vw, 400px);
  position: relative;
  z-index: 2;
  filter: drop-shadow(0 10px 30px rgba(0, 0, 0, 0.5));
  opacity: 0;
  animation: fadeUp 1s ease-out 0.2s forwards;
}

.logo-glow {
  position: absolute;
  top: 50%; left: 50%;
  transform: translate(-50%, -50%);
  width: 70%; height: 70%;
  background: radial-gradient(circle, rgba(0, 123, 255, 0.4) 0%, transparent 70%);
  filter: blur(50px);
  z-index: 1;
  opacity: 0;
  animation: pulseGlow 4s infinite alternate;
}

.tagline {
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: 200;
  line-height: 1.1;
  margin-bottom: 3rem;
  letter-spacing: -1px;
  opacity: 0;
  animation: fadeUp 1s ease-out 0.4s forwards;
}

.tagline .highlight {
  display: block;
  font-weight: 800;
  background: linear-gradient(90deg, #fff, #7abaff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-top: 0.5rem;
}

.cta-container {
  display: flex;
  gap: 1.5rem;
  opacity: 0;
  animation: fadeUp 1s ease-out 0.6s forwards;
}

.cta-button {
  position: relative;
  padding: 1rem 2.5rem;
  font-size: 1.1rem;
  font-weight: 600;
  border-radius: 50px;
  text-decoration: none;
  text-transform: uppercase;
  letter-spacing: 1px;
  transition: all 0.3s ease;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

.cta-button.primary {
  background: var(--primary);
  color: white;
  box-shadow: 0 4px 15px rgba(0, 123, 255, 0.3);
}

.cta-button.primary:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 25px rgba(0, 123, 255, 0.5);
}

.cta-button.primary .shine {
  position: absolute;
  top: 0; left: -100%;
  width: 50%; height: 100%;
  background: linear-gradient(120deg, transparent, rgba(255,255,255,0.4), transparent);
  transform: skewX(-20deg);
  transition: 0.5s;
}

.cta-button.primary:hover .shine { left: 200%; transition: 0.7s; }

.cta-button.secondary {
  background: rgba(255, 255, 255, 0.05);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
}

.cta-button.secondary:hover {
  background: rgba(255, 255, 255, 0.1);
  border-color: rgba(255, 255, 255, 0.5);
  transform: translateY(-3px);
}

.scroll-indicator {
  position: absolute;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  opacity: 0;
  animation: fadeUp 1s ease-out 1s forwards;
  z-index: 10;
}

.scroll-indicator span { font-size: 0.8rem; text-transform: uppercase; letter-spacing: 2px; opacity: 0.7; }
.scroll-indicator .line { width: 1px; height: 40px; background: linear-gradient(to bottom, #fff, transparent); }

.section-wrapper {
  position: relative;
  z-index: 2;
  padding: 100px 20px;
  max-width: 1400px;
  margin: 0 auto;
}

.section-header { text-align: center; margin-bottom: 60px; }
.section-header h2 { font-size: 3rem; font-weight: 700; margin-bottom: 1rem; }
.section-header .divider { width: 80px; height: 4px; background: var(--primary); margin: 0 auto; border-radius: 2px; }

@keyframes fadeUp {
  from { opacity: 0; transform: translateY(30px) translateX(var(--tx, 0)); }
  to { opacity: 1; transform: translateY(0) translateX(var(--tx, 0)); }
}

@keyframes pulseGlow {
  from { opacity: 0.3; transform: translate(-50%, -50%) scale(0.9); }
  to { opacity: 0.6; transform: translate(-50%, -50%) scale(1.1); }
}

@media (max-width: 768px) {
  .cta-container { flex-direction: column; width: 100%; max-width: 300px; }
  .cta-button { width: 100%; }
}
</style>