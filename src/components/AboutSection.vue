<template>
  <div class="about-container">
    <div class="about-left">
      <h2>Creating Incredible.</h2>
    </div>
    <div class="about-right">
      <div class="text-block">
        <h3>Publish</h3>
        <p>We move fast. Every hour is harnessed to its full potential to ship updates faster than anyone else in the industry.</p>
      </div>
      <div class="text-block">
        <h3>Learn</h3>
        <p>Data drives us. Every success and failure is a lesson that improves our workflow and game quality.</p>
      </div>
      <div class="text-block">
        <h3>Repeat</h3>
        <p>Consistency is key. What takes other studios months takes us weeks. We ensure every game is better than the last.</p>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
export default defineComponent({ name: 'AboutSection' });
</script>

<style scoped>
.about-container {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 60px;
  padding: 40px 0;
  border-top: 1px solid #222;
}

.about-left h2 {
  font-size: 3rem;
  line-height: 1;
  font-weight: 800;
  color: white;
  margin: 0;
  position: sticky;
  top: 100px;
}

.about-right {
  display: flex;
  flex-direction: column;
  gap: 60px;
}

.text-block h3 {
  font-size: 1.5rem;
  margin-bottom: 10px;
  color: white;
}

.text-block p {
  color: #888;
  font-size: 1.1rem;
  line-height: 1.6;
  max-width: 600px;
}

@media (max-width: 768px) {
  .about-container { grid-template-columns: 1fr; gap: 40px; }
  .about-left h2 { position: static; font-size: 2.5rem; }
}
</style>