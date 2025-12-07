<template>
  <div class="carousel-container">
    <swiper
      :modules="[Pagination, Navigation, Autoplay]"
      :slides-per-view="1"
      :space-between="30"
      :centered-slides="false"
      :pagination="{ clickable: true, dynamicBullets: true }"
      :navigation="{
        nextEl: '.custom-next',
        prevEl: '.custom-prev',
      }"
      :autoplay="{ delay: 4000, disableOnInteraction: false }"
      :breakpoints="{
        640: { slidesPerView: 2, spaceBetween: 20 },
        1024: { slidesPerView: 3, spaceBetween: 30 },
      }"
      :loop="true"
      class="games-swiper"
    >
      <swiper-slide v-for="game in games" :key="game.id">
        <div class="game-card">
          <div class="image-container">
            <img :src="game.thumbnail" :alt="game.title" loading="lazy" />
            <div class="overlay">
              <a v-if="game.released" :href="game.link" target="_blank" class="play-btn">
                <i class="fas fa-play"></i> Play Now
              </a>
              <span v-else class="coming-soon-badge">Coming Soon</span>
            </div>
          </div>
          
          <div class="card-content">
            <h3>{{ game.title }}</h3>
            <p class="description">{{ game.description }}</p>
          </div>
        </div>
      </swiper-slide>
    </swiper>

    <div class="custom-prev"><i class="fas fa-chevron-left"></i></div>
    <div class="custom-next"><i class="fas fa-chevron-right"></i></div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Pagination, Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

export default defineComponent({
  name: 'FeaturedGames',
  components: { Swiper, SwiperSlide },
  props: {
    games: { type: Array, required: true },
  },
  setup() {
    return { Pagination, Navigation, Autoplay };
  },
});
</script>

<style scoped>
.carousel-container {
  padding: 0 60px;
  position: relative;
  max-width: 1400px;
  margin: 0 auto;
}

.games-swiper {
  padding-bottom: 50px;
  padding-top: 10px;
}

.custom-prev, .custom-next {
  position: absolute;
  top: 45%;
  transform: translateY(-50%);
  width: 50px;
  height: 50px;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  cursor: pointer;
  z-index: 10;
  transition: 0.3s;
}

.custom-prev:hover, .custom-next:hover {
  background: var(--primary);
  border-color: var(--primary);
}

.custom-prev { left: 0; }
.custom-next { right: 0; }

.game-card {
  background: var(--bg-card);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  overflow: hidden;
  transition: transform 0.3s ease;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.game-card:hover {
  transform: translateY(-10px);
}

.image-container {
  position: relative;
  width: 100%;
  padding-top: 56.25%;
  overflow: hidden;
}

.image-container img {
  position: absolute;
  top: 0; left: 0; width: 100%; height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.game-card:hover .image-container img {
  transform: scale(1.1);
}

.overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.game-card:hover .overlay { opacity: 1; }

.play-btn {
  padding: 12px 24px;
  background: var(--primary);
  color: white;
  border-radius: 30px;
  text-decoration: none;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 8px;
}

.play-btn:hover { background: var(--primary-hover); }

.coming-soon-badge {
  background: rgba(255, 255, 255, 0.1);
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 0.9rem;
}

.card-content {
  padding: 20px;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}

.card-content h3 { font-size: 1.4rem; margin: 0 0 8px; color: white; }
.description { color: var(--text-muted); font-size: 0.95rem; margin-bottom: 0; flex-grow: 1; }

/* Custom Swiper Styles */
:deep(.swiper-pagination-bullet) { background: white; opacity: 0.3; width: 10px; height: 10px; }
:deep(.swiper-pagination-bullet-active) { background: var(--primary); opacity: 1; }

@media (max-width: 768px) {
  .carousel-container { padding: 0 10px; }
  .custom-prev, .custom-next { display: none; }
}
</style>