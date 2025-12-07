<template>
  <div class="page-wrapper">
    <div class="header-spacer"></div>
    
    <section class="company-intro">
      <h1>We Are <span class="gradient-text">Smash Games</span></h1>
      <p class="mission-statement">
        A collective of gamers, dreamers, and creators pushing the boundaries of the Roblox platform.
      </p>
    </section>

    <div class="grid-layout">
      <div class="info-card wide">
        <h2>Our Mission</h2>
        <p>To create immersive, high-energy experiences that connect millions of players worldwide. We don't just build games; we build communities where friendships are forged in the heat of battle.</p>
      </div>

      <div class="values-section">
        <div class="value-card">
          <i class="fas fa-rocket"></i>
          <h3>Innovation</h3>
          <p>We refuse to settle for the status quo. We experiment, we iterate, and we evolve.</p>
        </div>
        <div class="value-card">
          <i class="fas fa-users"></i>
          <h3>Community</h3>
          <p>Our players are our heartbeat. We build with them, for them.</p>
        </div>
        <div class="value-card">
          <i class="fas fa-star"></i>
          <h3>Quality</h3>
          <p>Polished mechanics. Stunning visuals. Zero compromise.</p>
        </div>
        <div class="value-card">
          <i class="fas fa-bolt"></i>
          <h3>Impact</h3>
          <p>Creating moments that leave a lasting impression.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
export default defineComponent({ name: 'CompanyPage' });
</script>

<style scoped>
.page-wrapper {
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 20px 100px;
}
.header-spacer { height: 120px; }

.company-intro { text-align: center; margin-bottom: 80px; }
.company-intro h1 { font-size: clamp(2.5rem, 5vw, 4rem); font-weight: 800; margin-bottom: 20px; }
.gradient-text {
  background: linear-gradient(120deg, #fff, #007bff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
.mission-statement { font-size: 1.25rem; color: var(--text-muted); max-width: 600px; margin: 0 auto; line-height: 1.6; }

.info-card {
  background: var(--bg-card);
  border: var(--glass-border);
  padding: 40px;
  border-radius: 16px;
  margin-bottom: 40px;
  text-align: center;
}
.info-card h2 { font-size: 2rem; margin-bottom: 20px; color: var(--primary); }
.info-card p { font-size: 1.1rem; line-height: 1.6; color: #ddd; }

.values-section {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 20px;
}

.value-card {
  background: rgba(255,255,255,0.02);
  border: 1px solid rgba(255,255,255,0.05);
  padding: 30px 20px;
  border-radius: 12px;
  text-align: center;
  transition: 0.3s;
}
.value-card:hover { background: rgba(255,255,255,0.05); transform: translateY(-5px); }
.value-card i { font-size: 2rem; color: var(--primary); margin-bottom: 15px; }
.value-card h3 { margin-bottom: 10px; font-size: 1.2rem; }
.value-card p { font-size: 0.9rem; color: var(--text-muted); line-height: 1.5; }
</style>