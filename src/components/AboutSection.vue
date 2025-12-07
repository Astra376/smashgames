<template>
  <div class="about-container">
    <div class="about-header">
      <h2>Creating Incredible</h2>
      <p>Our mission is to build the best experiences on the platform.</p>
    </div>
    
    <div class="features-grid">
      <div class="feature-item">
        <div class="icon-wrapper">
          <img src="@/assets/create.png" alt="Publish" />
        </div>
        <h3>Publish</h3>
        <p>We move fast. Every hour is harnessed to its full potential to ship updates faster than anyone else.</p>
      </div>

      <div class="feature-item">
        <div class="icon-wrapper">
          <img src="@/assets/learn.png" alt="Learn" />
        </div>
        <h3>Learn</h3>
        <p>Data drives us. Every success and failure is a lesson that improves our workflow and game quality.</p>
      </div>

      <div class="feature-item">
        <div class="icon-wrapper">
          <img src="@/assets/repeat.png" alt="Repeat" />
        </div>
        <h3>Repeat</h3>
        <p>Consistency is key. What takes other studios months takes us weeks. Always better than the last.</p>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
export default defineComponent({ name: 'AboutSection' });
</script>

<style scoped>
.about-container { text-align: center; }

.about-header h2 { font-size: 2.5rem; margin-bottom: 10px; font-weight: 700; color: white; }
.about-header p { font-size: 1.2rem; color: var(--text-muted); margin-bottom: 60px; max-width: 600px; margin-left: auto; margin-right: auto; }

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 40px;
}

.feature-item {
  background: var(--bg-card);
  padding: 40px 30px;
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: 0.3s;
  display: flex;
  flex-direction: column;
  align-items: center; /* Horizontally center content */
  text-align: center; /* Center text */
}

.feature-item:hover { transform: translateY(-10px); background: rgba(255,255,255,0.05); }

.icon-wrapper {
  width: 80px; height: 80px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  margin: 0 auto 25px; /* Margin auto ensures centering */
}

.icon-wrapper img { width: 40px; height: 40px; filter: invert(1); opacity: 0.9; }

.feature-item h3 { font-size: 1.5rem; margin-bottom: 15px; color: white; }
.feature-item p { color: var(--text-muted); line-height: 1.6; }
</style>