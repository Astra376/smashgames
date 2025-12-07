<template>
  <div class="games-grid">
    <a 
      v-for="game in games" 
      :key="game.id" 
      :href="game.link" 
      target="_blank" 
      class="game-card"
    >
      <div class="card-image">
        <img :src="game.thumbnail" :alt="game.title" loading="lazy" />
      </div>
      <div class="card-meta">
        <h3>{{ game.title }}</h3>
      </div>
    </a>
  </div>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'FeaturedGames',
  props: {
    games: { type: Array, required: true },
  },
});
</script>

<style scoped>
.games-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}

.game-card {
  display: block;
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  overflow: hidden;
  transition: transform 0.2s, border-color 0.2s;
}

.game-card:hover {
  transform: translateY(-4px);
  border-color: #52525b; /* Zinc 600 */
}

.card-image {
  width: 100%;
  aspect-ratio: 16/9;
  background: #27272a;
  overflow: hidden;
}

.card-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: opacity 0.2s;
}

.game-card:hover .card-image img {
  opacity: 0.9;
}

.card-meta {
  padding: 20px;
}

.card-meta h3 {
  margin: 0;
  font-size: 1.1rem;
  font-weight: 600;
  color: white;
}

@media (max-width: 1024px) {
  .games-grid { grid-template-columns: repeat(2, 1fr); }
}

@media (max-width: 640px) {
  .games-grid { grid-template-columns: 1fr; }
}
</style>