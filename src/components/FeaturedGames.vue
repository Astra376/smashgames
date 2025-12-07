<template>
  <div class="grid-container">
    <a 
      v-for="game in games" 
      :key="game.id" 
      :href="game.link" 
      target="_blank" 
      class="game-tile"
    >
      <div class="image-wrapper">
        <img :src="game.thumbnail" :alt="game.title" loading="lazy" />
      </div>
      <div class="tile-info">
        <h3>{{ game.title }}</h3>
        <span class="play-arrow">Play <i class="fas fa-arrow-right"></i></span>
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
.grid-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
  width: 100%;
}

.game-tile {
  display: block;
  text-decoration: none;
  color: white;
  group: pointer;
}

.image-wrapper {
  width: 100%;
  aspect-ratio: 16/9;
  overflow: hidden;
  border-radius: 8px;
  background: #111;
  margin-bottom: 15px;
}

.image-wrapper img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s ease;
}

.game-tile:hover .image-wrapper img {
  transform: scale(1.05);
}

.tile-info h3 {
  font-size: 1.2rem;
  margin: 0 0 5px;
  font-weight: 600;
}

.play-arrow {
  font-size: 0.9rem;
  color: #666;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: color 0.2s;
}

.game-tile:hover .play-arrow { color: white; }

@media (max-width: 768px) {
  .grid-container { grid-template-columns: 1fr; }
}
</style>