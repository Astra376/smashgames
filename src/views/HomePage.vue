<template>
  <section id="home">
    <div class="home-page" ref="homePageRef">
      
      <div class="background-overlay"></div>

      <div class="hero-wrapper">
        <div class="hero-content">
          <div class="logo-wrapper">
            <img src="@/assets/logo 2.png" alt="Company Logo" class="logo" />
          </div>

          <h1 class="tagline">
            Breaking barriers.<br />
            <span class="highlight">Smashing expectations.</span>
          </h1>

          <div class="cta-container">
            <router-link to="/careers" class="cta-button primary">
              <span>Join the Team</span>
            </router-link>
            <router-link to="/games" class="cta-button secondary">
              Explore Games
            </router-link>
          </div>
        </div>
      </div>
    </div>

    <section id="live-stats" class="section-wrapper stats-section">
      <StatsBar />
    </section>

    <section id="featured-games" class="section-wrapper">
      <div class="section-header">
        <h2>Featured Titles</h2>
        <div class="divider"></div>
      </div>
      <FeaturedGames v-if="featuredGames.length" :games="featuredGames" />
      <ErrorMessage v-else-if="error" :message="`Couldn't load games: ${error}`" />
      <LoadingSpinner v-else />
    </section>

    <section id="about" class="section-wrapper alt-bg">
      <AboutSection />
    </section>
  </section>
</template>

<script>
import { defineComponent, computed } from 'vue';
import FeaturedGames from '@/components/FeaturedGames.vue';
import AboutSection from '@/components/AboutSection.vue';
import StatsBar from '@/components/StatsBar.vue';
import LoadingSpinner from '@/components/LoadingSpinner.vue';
import ErrorMessage from '@/components/ErrorMessage.vue';
import { useRobloxStats, formatCompact, formatNumber } from '@/composables/useRobloxStats';

const FEATURED_COUNT = 10;

export default defineComponent({
  name: 'HomePage',
  components: {
    FeaturedGames,
    AboutSection,
    StatsBar,
    LoadingSpinner,
    ErrorMessage,
  },
  setup() {
    const { stats, error } = useRobloxStats();

    // Top games by visits, shaped for the carousel.
    const featuredGames = computed(() =>
      [...(stats.value?.games || [])]
        .filter((g) => g.thumbnail)
        .sort((a, b) => b.visits - a.visits)
        .slice(0, FEATURED_COUNT)
        .map((g) => ({
          id: g.universeId,
          title: g.name,
          description: `${formatNumber(g.playing)} playing · ${formatCompact(g.visits)} visits`,
          thumbnail: g.thumbnail,
          released: true,
          link: g.url,
        }))
    );

    return { featuredGames, error };
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
  background-color: #0a0a0f;
}

.background-overlay {
  position: absolute;
  top: 0; left: 0; width: 100%; height: 100%;
  background: #0a0a0f; /* Solid dark background, no gradients */
  z-index: 0;
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
  opacity: 0;
  animation: fadeUp 1s ease-out 0.2s forwards;
}

.tagline {
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: 200;
  line-height: 1.1;
  margin-bottom: 3rem;
  letter-spacing: -1px;
  color: white;
  opacity: 0;
  animation: fadeUp 1s ease-out 0.4s forwards;
}

.tagline .highlight {
  display: block;
  font-weight: 800;
  color: var(--primary); /* Solid Primary Color */
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
}

.cta-button.primary:hover {
  transform: translateY(-3px);
  background: #0056b3;
}

.cta-button.secondary {
  background: transparent;
  color: white;
  border: 2px solid white;
}

.cta-button.secondary:hover {
  background: white;
  color: #0a0a0f;
  transform: translateY(-3px);
}

.section-wrapper {
  position: relative;
  z-index: 2;
  padding: 100px 20px;
  max-width: 1400px;
  margin: 0 auto;
}

.stats-section { padding-top: 60px; padding-bottom: 20px; }

.section-header { text-align: center; margin-bottom: 60px; }
.section-header h2 { font-size: 3rem; font-weight: 700; margin-bottom: 1rem; color: white; }
.section-header .divider { width: 80px; height: 4px; background: var(--primary); margin: 0 auto; border-radius: 2px; }

@keyframes fadeUp {
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
}

@media (max-width: 768px) {
  .cta-container { flex-direction: column; width: 100%; max-width: 300px; }
  .cta-button { width: 100%; }
}
</style>