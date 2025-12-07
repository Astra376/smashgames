<template>
  <div class="about-block">
    <div class="ab-col">
      <h3>Publish</h3>
      <p>We work 24/7 to ship updates faster than anyone else.</p>
    </div>
    <div class="ab-col">
      <h3>Learn</h3>
      <p>Every success and failure improves our workflow.</p>
    </div>
    <div class="ab-col">
      <h3>Repeat</h3>
      <p>We ensure every game is better than the last.</p>
    </div>
  </div>
</template>

<style scoped>
.about-block {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 40px;
  border-top: 1px solid var(--border-color);
  padding-top: 40px;
  margin-top: 40px;
}
.ab-col h3 { font-size: 1.25rem; color: white; margin-bottom: 10px; }
.ab-col p { color: var(--text-secondary); font-size: 0.95rem; }
@media(max-width: 768px) { .about-block { grid-template-columns: 1fr; } }
</style>