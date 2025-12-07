<template>
  <div id="app">
    <header class="header" :class="{ 'scrolled': isScrolled }">
      <div class="header-container">
        <router-link to="/" class="logo" @click="closeMenu">
          <img src="@/assets/logo 2.png" alt="Smash Games" />
          <span>SMASH GAMES</span>
        </router-link>
        
        <button class="menu-toggle" @click="toggleMenu">
          <i class="fas" :class="isMenuOpen ? 'fa-times' : 'fa-bars'"></i>
        </button>

        <nav class="nav-menu" :class="{ 'active': isMenuOpen }">
          <router-link to="/" class="nav-link" @click="closeMenu">Home</router-link>
          <router-link to="/games" class="nav-link" @click="closeMenu">Games</router-link>
          <router-link to="/company" class="nav-link" @click="closeMenu">Company</router-link>
          <router-link to="/careers" class="nav-link" @click="closeMenu">Careers</router-link>
          <router-link to="/contact" class="nav-cta" @click="closeMenu">Get in Touch</router-link>
        </nav>
      </div>
    </header>

    <main>
      <router-view />
    </main>

    <footer class="footer">
      <div class="footer-container">
        <div class="footer-col">
          <img src="@/assets/logo.png" alt="Smash Games" class="footer-logo" />
          <p class="footer-desc">Breaking barriers.<br>Smashing expectations.</p>
        </div>
        <div class="footer-col links">
          <a href="https://www.roblox.com/groups/8338753/Smash-Games" target="_blank" class="social-link"><i class="fas fa-gamepad"></i> Roblox</a>
          <a href="#" class="social-link"><i class="fab fa-twitter"></i> Twitter</a>
          <a href="#" class="social-link"><i class="fab fa-discord"></i> Discord</a>
        </div>
        <div class="footer-col copyright">
          <p>&copy; 2024 Smash Games.</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
import { defineComponent, ref, onMounted, onUnmounted } from 'vue';

export default defineComponent({
  setup() {
    const isScrolled = ref(false);
    const isMenuOpen = ref(false);

    const handleScroll = () => {
      isScrolled.value = window.scrollY > 20;
    };

    const toggleMenu = () => {
      isMenuOpen.value = !isMenuOpen.value;
    };

    const closeMenu = () => {
      isMenuOpen.value = false;
    };

    onMounted(() => {
      window.addEventListener('scroll', handleScroll);
    });

    onUnmounted(() => {
      window.removeEventListener('scroll', handleScroll);
    });

    return { isScrolled, isMenuOpen, toggleMenu, closeMenu };
  }
});
</script>

<style>
/* --- GLOBAL RESET & THEME --- */
:root {
  --bg-main: #09090b; /* Zinc 950 */
  --bg-card: #18181b; /* Zinc 900 */
  --border-color: #27272a; /* Zinc 800 */
  --text-primary: #ffffff;
  --text-secondary: #a1a1aa; /* Zinc 400 */
  --accent: #2563eb; /* Blue 600 */
  --accent-hover: #3b82f6; /* Blue 500 */
  --font-family: 'Kanit', sans-serif;
  --max-width: 1440px;
  --header-height: 80px;
}

* { box-sizing: border-box; }

html {
  scrollbar-gutter: stable; /* FIXES THE LAYOUT SHIFT */
}

body {
  margin: 0;
  padding: 0;
  background-color: var(--bg-main);
  color: var(--text-primary);
  font-family: var(--font-family);
  -webkit-font-smoothing: antialiased;
  line-height: 1.5;
}

a { text-decoration: none; color: inherit; transition: 0.2s; }
ul { list-style: none; padding: 0; margin: 0; }

/* --- HEADER --- */
.header {
  position: fixed;
  top: 0; left: 0; right: 0;
  height: var(--header-height);
  z-index: 1000;
  background: transparent;
  transition: all 0.3s ease;
  border-bottom: 1px solid transparent;
}

.header.scrolled {
  background: rgba(9, 9, 11, 0.95); /* High opacity solid color */
  border-bottom: 1px solid var(--border-color);
  backdrop-filter: blur(10px);
}

.header-container {
  max-width: var(--max-width);
  margin: 0 auto;
  padding: 0 40px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.logo {
  display: flex;
  align-items: center;
  gap: 12px;
  font-weight: 700;
  font-size: 1.25rem;
  letter-spacing: 0.5px;
}

.logo img { height: 36px; width: auto; }

.nav-menu { display: flex; align-items: center; gap: 32px; }

.nav-link {
  font-size: 0.95rem;
  font-weight: 500;
  color: var(--text-secondary);
}

.nav-link:hover, .nav-link.router-link-active {
  color: var(--text-primary);
}

.nav-cta {
  padding: 10px 24px;
  background: var(--text-primary);
  color: var(--bg-main);
  font-weight: 600;
  border-radius: 4px;
  font-size: 0.9rem;
}

.nav-cta:hover {
  background: #e4e4e7;
}

.menu-toggle {
  display: none;
  background: none;
  border: none;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
}

/* --- FOOTER --- */
.footer {
  border-top: 1px solid var(--border-color);
  padding: 60px 40px;
  margin-top: auto;
  background: #050505;
}

.footer-container {
  max-width: var(--max-width);
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 40px;
}

.footer-logo { height: 30px; opacity: 0.6; margin-bottom: 10px; }
.footer-desc { color: var(--text-secondary); font-size: 0.9rem; }

.footer-col.links { display: flex; gap: 24px; }
.social-link {
  color: var(--text-secondary);
  font-size: 0.95rem;
  display: flex; align-items: center; gap: 8px;
}
.social-link:hover { color: var(--text-primary); }

.copyright { color: #444; font-size: 0.85rem; }

/* --- RESPONSIVE --- */
@media (max-width: 768px) {
  .header-container { padding: 0 20px; }
  .menu-toggle { display: block; }
  
  .nav-menu {
    position: fixed;
    top: var(--header-height);
    left: 0;
    right: 0;
    bottom: 0;
    background: var(--bg-main);
    flex-direction: column;
    padding: 40px;
    gap: 30px;
    transform: translateX(100%);
    transition: transform 0.3s ease;
  }
  
  .nav-menu.active { transform: translateX(0); }
  .nav-link { font-size: 1.5rem; }
  
  .footer-container { flex-direction: column; align-items: flex-start; }
  .footer-col.links { flex-direction: column; gap: 12px; }
}
</style>