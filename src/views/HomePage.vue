<template>
  <div class="home-view">
    <section class="hero">
      <div class="hero-bg">
        <img src="@/assets/company-banner.png" alt="Background" />
        <div class="overlay"></div>
      </div>
      
      <div class="hero-content">
        <img src="@/assets/logo 2.png" alt="Smash Games" class="hero-logo" />
        <h1>
          Breaking Barriers.<br>
          Smashing Expectations.
        </h1>
        <div class="hero-buttons">
          <router-link to="/careers" class="btn primary">Join the Team</router-link>
          <router-link to="/games" class="btn outline">Explore Games</router-link>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="section-header">
          <h2>Featured Titles</h2>
          <router-link to="/games" class="view-all">View All <i class="fas fa-arrow-right"></i></router-link>
        </div>
        <FeaturedGames :games="featuredGames" />
      </div>
    </section>

    <section class="section alt-bg">
      <div class="container about-grid">
        <div class="about-text">
          <h2>Creating Incredible.</h2>
          <p>We are a Roblox development studio committed to high-fidelity experiences. We move fast, ship often, and prioritize gameplay above all else.</p>
        </div>
        <div class="about-stats">
          <div class="stat-item">
            <h3>50M+</h3>
            <p>Play Sessions</p>
          </div>
          <div class="stat-item">
            <h3>24/7</h3>
            <p>Live Operations</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue';
import FeaturedGames from '@/components/FeaturedGames.vue';

// Assets
import robotImg from '@/assets/RobotTycoon.webp';
import solarImg from '@/assets/SolarSystemAdventure.webp';
import burgerImg from '@/assets/EscapeBurtsBurgerShop.webp';

export default defineComponent({
  components: { FeaturedGames },
  setup() {
    // Only showing top 3 for the home page for a clean look
    const featuredGames = ref([
      { id: 1, title: 'Robot Tycoon', thumbnail: robotImg, link: 'https://www.roblox.com/games/10828925984/Robot-Tycoon' },
      { id: 2, title: 'Solar System Adventure', thumbnail: solarImg, link: 'https://www.roblox.com/games/5376454753/Solar-System-Adventure' },
      { id: 3, title: 'Escape Burt\'s Burger Shop!', thumbnail: burgerImg, link: 'https://www.roblox.com/games/13442533661/Escape-Burts-Burger-Shop-SCARY-OBBY' },
    ]);

    return { featuredGames };
  }
});
</script>

<style scoped>
.hero {
  position: relative;
  height: 90vh; /* Not full 100vh to show hint of content below */
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  overflow: hidden;
}

.hero-bg {
  position: absolute;
  inset: 0;
  z-index: 0;
}

.hero-bg img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to bottom, rgba(9,9,11,0.7), rgba(9,9,11,1));
}

.hero-content {
  position: relative;
  z-index: 1;
  padding: 0 20px;
  max-width: 900px;
}

.hero-logo {
  width: 120px;
  margin-bottom: 40px;
  opacity: 0.9;
}

h1 {
  font-size: clamp(3rem, 6vw, 5rem);
  line-height: 1.1;
  font-weight: 800;
  margin-bottom: 40px;
  letter-spacing: -2px;
  text-transform: uppercase;
}

.hero-buttons {
  display: flex;
  gap: 20px;
  justify-content: center;
}

.btn {
  padding: 14px 32px;
  font-size: 1rem;
  font-weight: 600;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s;
}

.btn.primary {
  background: white;
  color: black;
  border: 1px solid white;
}
.btn.primary:hover { background: #e4e4e7; border-color: #e4e4e7; }

.btn.outline {
  background: transparent;
  color: white;
  border: 1px solid #3f3f46;
}
.btn.outline:hover { border-color: white; }

/* Sections */
.section {
  padding: 100px 40px;
}

.section.alt-bg {
  background: #101012;
  border-top: 1px solid var(--border-color);
  border-bottom: 1px solid var(--border-color);
}

.container {
  max-width: var(--max-width);
  margin: 0 auto;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 40px;
}

.section-header h2 { font-size: 2rem; font-weight: 700; margin: 0; }
.view-all { color: var(--text-secondary); font-size: 0.9rem; }
.view-all:hover { color: white; }

/* About Grid */
.about-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 80px;
  align-items: center;
}

.about-text h2 { font-size: 3rem; margin-bottom: 20px; line-height: 1; }
.about-text p { color: var(--text-secondary); font-size: 1.1rem; max-width: 500px; }

.about-stats {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
}

.stat-item {
  border-left: 2px solid var(--border-color);
  padding-left: 20px;
}

.stat-item h3 { font-size: 2.5rem; margin: 0; color: white; }
.stat-item p { margin: 5px 0 0; color: var(--text-secondary); }

@media (max-width: 768px) {
  .section { padding: 60px 20px; }
  .about-grid { grid-template-columns: 1fr; gap: 40px; }
  .hero-buttons { flex-direction: column; width: 100%; }
  .btn { width: 100%; text-align: center; }
}
</style>