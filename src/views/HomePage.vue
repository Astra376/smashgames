<template>
  <section id="home">
    <div class="home-page" ref="homePageRef" :class="{ 'visible': isVisible }">
      
      <div class="background-overlay"></div>
      <ParticlesBackground ref="particlesContainer" class="particles-layer" />

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
        <span>Scroll to Explore</span>
        <div class="line"></div>
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
import { useIntersectionObserver } from '@vueuse/core';
import FeaturedGames from '@/components/FeaturedGames.vue';
import AboutSection from '@/components/AboutSection.vue';
import ParticlesBackground from '@/components/ParticlesBackground.vue';

export default defineComponent({
  name: 'HomePage',
  components: {
    FeaturedGames,
    AboutSection,
    ParticlesBackground,
  },
  setup() {
    // Game Data
    const featuredGames = ref([
      { id: 1, title: 'Robot Tycoon', description: 'Build and manage your own robot empire', thumbnail: 'src/assets/RobotTycoon.webp', playerCount: 5300, playSessions: 38000000, likePercentage: 71, released: true, link: 'https://www.roblox.com/games/10828925984/Robot-Tycoon' },
      { id: 2, title: 'Solar System Adventure', description: 'Explore the mysteries of space', thumbnail: 'src/assets/SolarSystemAdventure.webp', playerCount: 150, playSessions: 2800000, likePercentage: 46, released: true, link: 'https://www.roblox.com/games/5376454753/Solar-System-Adventure' },
      { id: 3, title: 'Escape Burts Burger Shop!', description: 'Can you escape the infamous burger shop?', thumbnail: 'src/assets/EscapeBurtsBurgerShop.webp', playerCount: 100, playSessions: 5300, likePercentage: 33, released: true, link: 'https://www.roblox.com/games/13442533661/Escape-Burts-Burger-Shop-SCARY-OBBY' },
      { id: 4, title: 'Mars Warfare Tycoon', description: 'Dominate the red planet', thumbnail: 'src/assets/MarsWarefareTycoon.webp', playerCount: 350, playSessions: 15033, likePercentage: 52, released: true, link: 'https://www.roblox.com/games/15024121792/Mars-Tycoon' },
      { id: 5, title: 'Animal World 🐺', description: 'Survive and explore the forest', thumbnail: 'src/assets/AnimalWorld.png', playerCount: 400, playSessions: 339719, likePercentage: 29, released: true, link: 'https://www.roblox.com/games/17779125812/Animal-World' },
      { id: 6, title: 'Chaos Playground', description: 'Unleash mayhem in this sandbox world', thumbnail: 'src/assets/ChaosPlayground.webp', playerCount: 350, playSessions: 9900, likePercentage: 42, released: true, link: 'https://www.roblox.com/games/18502373299/Chaos-Playground' },
      { id: 7, title: 'Billionaire Empire Tycoon', description: 'Build your business empire', thumbnail: 'src/assets/BillionaireEmpireTycoon.webp', playerCount: 200, playSessions: 177252, likePercentage: 81, released: true, link: 'https://www.roblox.com/games/8314692489/Billionaire-Empire-Tycoon' },
      { id: 8, title: 'My School', description: 'Create and manage your dream school', thumbnail: 'src/assets/ComingSoon.png', playerCount: 0, playSessions: 0, likePercentage: 0, released: false, link: '' },
      { id: 9, title: 'Space Station Tycoon', description: 'Build the ultimate space station', thumbnail: 'src/assets/ComingSoon.png', playerCount: 0, playSessions: 0, likePercentage: 0, released: false, link: '' },
      { id: 10, title: 'House Flipper', description: 'Buy, renovate and sell houses', thumbnail: 'src/assets/ComingSoon.png', playerCount: 0, playSessions: 0, likePercentage: 0, released: false, link: '' },
    ]);

    const homePageRef = ref(null);
    const isVisible = ref(false);

    useIntersectionObserver(homePageRef, ([{ isIntersecting }]) => {
      if (isIntersecting) {
        isVisible.value = true;
      }
    });

    return { 
      featuredGames,
      homePageRef,
      isVisible,
    };
  }
});
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Kanit:wght@200;300;400;600;800&display=swap');

/* --- Global Variables & Reset --- */
:root {
  --primary-color: #007bff;
  --accent-color: #00d4ff;
  --bg-dark: #0a0a0f;
  --bg-darker: #050508;
  --text-white: #ffffff;
  --glass-border: rgba(255, 255, 255, 0.1);
}

.home-page {
  position: relative;
  min-height: 100vh; /* Hero takes full height */
  color: var(--text-white);
  font-family: "Kanit", sans-serif;
  background-color: var(--bg-dark);
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
}

/* --- Background Styling --- */
.background-overlay {
  position: absolute;
  top: 0; left: 0; width: 100%; height: 100vh;
  background: radial-gradient(circle at 50% -20%, #1a2542 0%, #0a0a0f 70%);
  z-index: 0;
}

.particles-layer {
  position: absolute;
  top: 0; left: 0; width: 100%; height: 100vh;
  z-index: 1;
  opacity: 0.6; /* Subtle particles */
  pointer-events: none;
}

/* --- Hero Section --- */
.hero-content {
  position: relative;
  z-index: 2;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 0 20px;
}

.logo-wrapper {
  position: relative;
  margin-bottom: 2rem;
}

.logo {
  width: clamp(200px, 30vw, 450px);
  position: relative;
  z-index: 2;
  filter: drop-shadow(0 10px 30px rgba(0, 0, 0, 0.5));
  opacity: 0;
  transform: translateY(30px);
  animation: fadeUp 1s cubic-bezier(0.2, 0.8, 0.2, 1) 0.2s forwards;
}

/* A soft glow behind the logo instead of on it */
.logo-glow {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 60%;
  height: 60%;
  background: radial-gradient(circle, rgba(0, 123, 255, 0.4) 0%, transparent 70%);
  filter: blur(40px);
  z-index: 1;
  opacity: 0;
  animation: pulseGlow 4s infinite alternate;
}

.tagline {
  font-size: clamp(2rem, 4vw, 3.5rem);
  font-weight: 200;
  line-height: 1.1;
  margin-bottom: 3.5rem;
  letter-spacing: -1px;
  opacity: 0;
  transform: translateY(20px);
  animation: fadeUp 1s cubic-bezier(0.2, 0.8, 0.2, 1) 0.4s forwards;
}

.tagline .highlight {
  display: block;
  font-weight: 800;
  background: linear-gradient(90deg, #fff, #aabfe0);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-transform: uppercase;
  margin-top: 0.5rem;
}

/* --- CTA Buttons --- */
.cta-container {
  display: flex;
  gap: 1.5rem;
  opacity: 0;
  transform: translateY(20px);
  animation: fadeUp 1s cubic-bezier(0.2, 0.8, 0.2, 1) 0.6s forwards;
}

.cta-button {
  position: relative;
  padding: 1rem 2.5rem;
  font-size: 1.1rem;
  font-weight: 500;
  border-radius: 8px; /* Slightly rounded, not full pill */
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
  background: #007bff;
  color: white;
  border: 1px solid transparent;
  box-shadow: 0 4px 15px rgba(0, 123, 255, 0.3);
}

.cta-button.primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 123, 255, 0.5);
}

.cta-button.primary .shine {
  position: absolute;
  top: 0;
  left: -100%;
  width: 50%;
  height: 100%;
  background: linear-gradient(120deg, transparent, rgba(255,255,255,0.3), transparent);
  transform: skewX(-20deg);
  transition: 0.5s;
}

.cta-button.primary:hover .shine {
  left: 200%;
  transition: 0.7s;
}

.cta-button.secondary {
  background: rgba(255, 255, 255, 0.05);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
}

.cta-button.secondary:hover {
  background: rgba(255, 255, 255, 0.1);
  border-color: rgba(255, 255, 255, 0.3);
  transform: translateY(-2px);
}

/* --- Scroll Indicator --- */
.scroll-indicator {
  position: absolute;
  bottom: 40px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  opacity: 0.7;
  font-size: 0.8rem;
  font-weight: 300;
  letter-spacing: 2px;
  text-transform: uppercase;
  z-index: 2;
  animation: fadeUp 1s 1.5s forwards;
}

.scroll-indicator .line {
  width: 1px;
  height: 40px;
  background: linear-gradient(to bottom, #fff, transparent);
}

/* --- Content Sections --- */
.section-wrapper {
  position: relative;
  z-index: 2;
  padding: 80px 20px;
  max-width: 1400px;
  margin: 0 auto;
}

.section-wrapper.alt-bg {
  /* Optional: distinct background for About section */
  background: linear-gradient(to bottom, transparent, rgba(0,0,0,0.3));
}

.section-header {
  text-align: center;
  margin-bottom: 60px;
}

.section-header h2 {
  font-size: 2.5rem;
  font-weight: 600;
  margin-bottom: 1rem;
}

.section-header .divider {
  width: 60px;
  height: 4px;
  background: #007bff;
  margin: 0 auto;
  border-radius: 2px;
}

/* --- Animations --- */
@keyframes fadeUp {
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes pulseGlow {
  from { opacity: 0.3; transform: translate(-50%, -50%) scale(0.9); }
  to { opacity: 0.6; transform: translate(-50%, -50%) scale(1.1); }
}

/* --- Mobile Responsiveness --- */
@media (max-width: 768px) {
  .tagline { font-size: 2rem; }
  .logo { width: 70%; }
  .cta-container { flex-direction: column; width: 100%; max-width: 300px; }
  .cta-button { width: 100%; }
}
</style>