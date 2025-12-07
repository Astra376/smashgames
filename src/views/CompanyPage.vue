<template>
  <div class="page-container">
    <div class="header-spacer"></div>
    
    <div class="company-intro">
      <h1>We Are <span class="highlight">Smash Games</span></h1>
      <p>A collective of gamers, dreamers, and creators pushing the boundaries of the Roblox platform.</p>
    </div>

    <div class="content-grid">
      <div class="mission-card">
        <h2>Our Mission</h2>
        <p>To create immersive, high-energy experiences that connect millions of players worldwide. We don't just build games; we build communities where friendships are forged in the heat of battle.</p>
      </div>

      <div class="values-grid">
        <div class="value-card">
          <i class="fas fa-rocket"></i>
          <h3>Innovation</h3>
          <p>We refuse to settle. We experiment, iterate, and evolve constantly.</p>
        </div>
        <div class="value-card">
          <i class="fas fa-users"></i>
          <h3>Community</h3>
          <p>Players are our heartbeat. We build with them, for them.</p>
        </div>
        <div class="value-card">
          <i class="fas fa-star"></i>
          <h3>Quality</h3>
          <p>Polished mechanics. Stunning visuals. Zero compromise.</p>
        </div>
        <div class="value-card">
          <i class="fas fa-bolt"></i>
          <h3>Impact</h3>
          <p>Creating moments that leave a lasting impression on our players.</p>
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
.page-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px 100px;
}
.header-spacer { height: 120px; }

.company-intro { text-align: center; margin-bottom: 80px; max-width: 800px; margin-left: auto; margin-right: auto; }
.company-intro h1 { font-size: clamp(2.5rem, 5vw, 4rem); font-weight: 800; margin-bottom: 20px; }
.company-intro p { font-size: 1.2rem; color: var(--text-muted); line-height: 1.6; }
.highlight { 
  background: linear-gradient(90deg, #fff, var(--primary)); 
  -webkit-background-clip: text; 
  -webkit-text-fill-color: transparent; 
}

.mission-card {
  background: var(--bg-card);
  border: var(--glass-border);
  padding: 40px;
  border-radius: 16px;
  text-align: center;
  margin-bottom: 40px;
}
.mission-card h2 { color: var(--primary); margin-bottom: 20px; font-size: 2rem; }
.mission-card p { font-size: 1.1rem; line-height: 1.8; color: #ddd; max-width: 900px; margin: 0 auto; }

.values-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
}

.value-card {
  background: rgba(255,255,255,0.02);
  border: 1px solid rgba(255,255,255,0.05);
  padding: 30px;
  border-radius: 12px;
  text-align: center;
  transition: 0.3s;
}
.value-card:hover { transform: translateY(-5px); background: rgba(255,255,255,0.04); border-color: var(--primary); }
.value-card i { font-size: 2rem; color: var(--primary); margin-bottom: 15px; }
.value-card h3 { margin-bottom: 10px; font-size: 1.3rem; }
.value-card p { color: var(--text-muted); line-height: 1.5; }
</style>