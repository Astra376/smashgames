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
            
            <div class="stats-row" v-if="game.released">
              <div class="stat">
                <i class="fas fa-users"></i>
                <span>{{ formatNumber(game.playerCount) }}</span>
              </div>
              <div class="stat">
                <i class="fas fa-thumbs-up"></i>
                <span>{{ game.likePercentage }}%</span>
              </div>
            </div>
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
    const formatNumber = (num) => {
      if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
      if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
      return num;
    };

    return {
      Pagination, Navigation, Autoplay,
      formatNumber
    };
  },
});
</script>

<style scoped>
.carousel-container {
  padding: 0 60px; /* Make room for arrows */
  position: relative;
  max-width: 1400px;
  margin: 0 auto;
}

.games-swiper {
  padding-bottom: 50px; /* Space for pagination */
  padding-top: 10px;
}

/* Custom Nav Arrows */
.custom-prev, .custom-next {
  position: absolute;
  top: 45%;
  transform: translateY(-50%);
  width: 50px;
  height: 50px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
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
  box-shadow: 0 0 15px var(--primary-glow);
}

.custom-prev { left: 0; }
.custom-next { right: 0; }

.game-card {
  background: var(--bg-card);
  border: var(--glass-border);
  border-radius: 16px;
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.game-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.4);
  background: var(--bg-card-hover);
}

.image-container {
  position: relative;
  width: 100%;
  padding-top: 56.25%; /* 16:9 Aspect Ratio */
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
  transform: scale(0.9);
  transition: 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.play-btn:hover { transform: scale(1); background: var(--primary-hover); }

.coming-soon-badge {
  background: rgba(255, 255, 255, 0.1);
  padding: 8px 16px;
  border-radius: 20px;
  backdrop-filter: blur(5px);
  font-size: 0.9rem;
}

.card-content {
  padding: 20px;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}

.card-content h3 { font-size: 1.4rem; margin: 0 0 8px; color: white; }
.description { color: var(--text-muted); font-size: 0.95rem; margin-bottom: 20px; flex-grow: 1; }

.stats-row {
  display: flex;
  gap: 20px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding-top: 15px;
  color: #ccc;
  font-size: 0.9rem;
}

.stat { display: flex; align-items: center; gap: 6px; }
.stat i { color: var(--primary); }

/* Custom Swiper Styles */
:deep(.swiper-pagination-bullet) { background: white; opacity: 0.3; width: 10px; height: 10px; }
:deep(.swiper-pagination-bullet-active) { background: var(--primary); opacity: 1; }

@media (max-width: 768px) {
  .carousel-container { padding: 0 10px; }
  .custom-prev, .custom-next { display: none; } /* Hide arrows on mobile */
}
</style>