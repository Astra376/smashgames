<template>
  <div class="carousel-container">
    <swiper
      :modules="[Pagination, Navigation, Autoplay]"
      :slides-per-view="1.1"
      :space-between="16"
      :pagination="{ clickable: true, dynamicBullets: true }"
      :navigation="{ nextEl: '.custom-next', prevEl: '.custom-prev' }"
      :autoplay="{ delay: 4500, disableOnInteraction: false, pauseOnMouseEnter: true }"
      :breakpoints="{
        700: { slidesPerView: 2, spaceBetween: 24 },
        1200: { slidesPerView: 3, spaceBetween: 32 },
      }"
      :loop="games.length > 3"
      class="games-swiper"
    >
      <swiper-slide v-for="game in games" :key="game.universeId">
        <a :href="game.url" target="_blank" rel="noopener" class="game-card">
          <div class="image-container">
            <img :src="game.thumbnail" :alt="game.name" loading="lazy" />
            <span v-if="game.playing > 0" class="live-badge">
              <span class="dot"></span>{{ formatNumber(game.playing) }} playing
            </span>
            <div class="overlay">
              <span class="play-btn"><i class="fas fa-play"></i> Play Now</span>
            </div>
          </div>

          <div class="card-content">
            <span class="studio">{{ game.owner.name }}</span>
            <h3>{{ game.name }}</h3>
            <div class="meta">
              <span><i class="fas fa-eye"></i> {{ formatCompact(game.visits) }} <small>visits</small></span>
              <span><i class="fas fa-heart"></i> {{ formatCompact(game.favorites) }} <small>favs</small></span>
            </div>
          </div>
        </a>
      </swiper-slide>
    </swiper>

    <button class="custom-prev" aria-label="Previous"><i class="fas fa-chevron-left"></i></button>
    <button class="custom-next" aria-label="Next"><i class="fas fa-chevron-right"></i></button>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Pagination, Navigation, Autoplay } from 'swiper/modules';
import { formatCompact, formatNumber } from '@/composables/useRobloxStats';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

export default defineComponent({
  name: 'FeaturedGames',
  components: { Swiper, SwiperSlide },
  props: {
    // Game objects from /api/roblox-stats.
    games: { type: Array, required: true },
  },
  setup() {
    return { Pagination, Navigation, Autoplay, formatCompact, formatNumber };
  },
});
</script>

<style scoped>
.carousel-container {
  padding: 0 70px;
  position: relative;
  max-width: 1700px;
  margin: 0 auto;
}

.games-swiper { padding: 14px 4px 56px; }

.custom-prev, .custom-next {
  position: absolute;
  top: 42%;
  transform: translateY(-50%);
  width: 54px;
  height: 54px;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.1rem;
  cursor: pointer;
  z-index: 10;
  transition: 0.3s;
}
.custom-prev:hover, .custom-next:hover { background: var(--primary); border-color: var(--primary); }
.custom-prev { left: 0; }
.custom-next { right: 0; }

.game-card {
  display: flex;
  flex-direction: column;
  height: 100%;
  background: var(--bg-card);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  overflow: hidden;
  text-decoration: none;
  color: inherit;
  transition: transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
}
.game-card:hover {
  transform: translateY(-10px);
  border-color: rgba(0, 123, 255, 0.6);
  box-shadow: 0 20px 40px -20px rgba(0, 123, 255, 0.5);
}

.image-container {
  position: relative;
  width: 100%;
  padding-top: 56.25%;
  overflow: hidden;
  background: #0f0f14;
}
.image-container img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}
.game-card:hover .image-container img { transform: scale(1.08); }

.live-badge {
  position: absolute; top: 14px; left: 14px; z-index: 1;
  display: flex; align-items: center; gap: 7px;
  background: rgba(0, 0, 0, 0.75);
  padding: 5px 12px; border-radius: 30px;
  font-size: 0.85rem; font-weight: 600; color: white;
}
.live-badge .dot { width: 8px; height: 8px; border-radius: 50%; background: #22c55e; box-shadow: 0 0 8px #22c55e; }

.overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.55);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
}
.game-card:hover .overlay { opacity: 1; }

.play-btn {
  padding: 14px 30px;
  background: var(--primary);
  color: white;
  border-radius: 40px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
  display: flex;
  align-items: center;
  gap: 10px;
}

.card-content {
  padding: 22px 26px 26px;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}
.studio {
  color: var(--primary);
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 2px;
  margin-bottom: 6px;
}
.card-content h3 {
  font-size: clamp(1.4rem, 1.8vw, 1.85rem);
  font-weight: 800;
  line-height: 1.15;
  letter-spacing: -0.5px;
  margin: 0 0 16px;
  color: white;
}
.meta {
  margin-top: auto;
  display: flex;
  gap: 22px;
  color: white;
  font-size: 1.05rem;
  font-weight: 600;
}
.meta i { color: var(--text-muted); margin-right: 4px; font-size: 0.9rem; }
.meta small { color: var(--text-muted); font-weight: 400; font-size: 0.85rem; text-transform: uppercase; letter-spacing: 1px; }

:deep(.swiper-pagination-bullet) { background: white; opacity: 0.3; width: 10px; height: 10px; }
:deep(.swiper-pagination-bullet-active) { background: var(--primary); opacity: 1; }

@media (max-width: 768px) {
  .carousel-container { padding: 0 12px; }
  .custom-prev, .custom-next { display: none; }
}
</style>
