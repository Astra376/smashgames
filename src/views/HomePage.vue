<template>
  <div class="home-container">
    <section class="hero">
      <div class="hero-content">
        <img src="@/assets/logo 2.png" alt="Logo" class="hero-logo" />
        
        <h1 class="headline">
          BREAKING BARRIERS.<br>
          SMASHING EXPECTATIONS.
        </h1>
        
        <div class="hero-actions">
          <router-link to="/careers" class="btn btn-primary">Join the Team</router-link>
          <router-link to="/games" class="btn btn-outline">Explore Games</router-link>
        </div>
      </div>
    </section>

    <section class="featured-section">
      <div class="section-header">
        <h2>Featured Titles</h2>
      </div>
      <FeaturedGames :games="featuredGames" />
    </section>

    <section class="about-section">
      <AboutSection />
    </section>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue';
import FeaturedGames from '@/components/FeaturedGames.vue';
import AboutSection from '@/components/AboutSection.vue';

// Assets
import robotImg from '@/assets/RobotTycoon.webp';
import solarImg from '@/assets/SolarSystemAdventure.webp';
import burgerImg from '@/assets/EscapeBurtsBurgerShop.webp';

export default defineComponent({
  name: 'HomePage',
  components: { FeaturedGames, AboutSection },
  setup() {
    // Only show top 3 games for the home page feature
    const featuredGames = ref([
      { id: 1, title: 'Robot Tycoon', description: 'Build and manage your own robot empire.', thumbnail: robotImg, link: 'https://www.roblox.com/games/10828925984/Robot-Tycoon' },
      { id: 2, title: 'Solar System Adventure', description: 'Explore the mysteries of space.', thumbnail: solarImg, link: 'https://www.roblox.com/games/5376454753/Solar-System-Adventure' },
      { id: 3, title: 'Escape Burt\'s Burger Shop!', description: 'Can you escape the infamous burger shop?', thumbnail: burgerImg, link: 'https://www.roblox.com/games/13442533661/Escape-Burts-Burger-Shop-SCARY-OBBY' },
    ]);

    return { featuredGames };
  }
});
</script>

<style scoped>
.home-container { width: 100%; }

/* HERO */
.hero {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 0 20px;
}

.hero-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 800px;
}

.hero-logo { width: 200px; margin-bottom: 2rem; }

.headline {
  font-size: clamp(2.5rem, 6vw, 4.5rem);
  font-weight: 800;
  line-height: 1.1;
  margin: 0 0 2.5rem;
  color: white; /* Solid white */
  text-transform: uppercase;
  letter-spacing: -1px;
}

.hero-actions { display: flex; gap: 1rem; }

/* BUTTONS */
.btn {
  padding: 1rem 2rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
  text-decoration: none;
  font-size: 0.9rem;
  border-radius: 4px;
  transition: all 0.2s;
}

.btn-primary {
  background: white;
  color: black;
  border: 1px solid white;
}
.btn-primary:hover { background: #ccc; border-color: #ccc; }

.btn-outline {
  background: transparent;
  color: white;
  border: 1px solid #333;
}
.btn-outline:hover { border-color: white; }

/* SECTIONS */
.featured-section, .about-section {
  padding: 100px 20px;
  max-width: 1400px;
  margin: 0 auto;
}

.section-header { margin-bottom: 40px; text-align: center; }
.section-header h2 { font-size: 2.5rem; font-weight: 700; color: white; margin: 0; }

@media (max-width: 600px) {
  .hero-actions { flex-direction: column; width: 100%; }
  .btn { width: 100%; text-align: center; }
}
</style>