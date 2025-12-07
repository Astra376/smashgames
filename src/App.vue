<template>
  <div id="app" class="app">
    <header class="header" :class="{ 'header-visible': isScrolled || isMobileMenuOpen }">
      <div class="header-content">
        <router-link to="/" class="logo" @click="closeMobileMenu">
          <img src="@/assets/logo 2.png" alt="Smash Games" class="logo-img" />
          <span class="logo-text">SMASH GAMES</span>
        </router-link>
        
        <button class="mobile-menu-btn" @click="toggleMobileMenu" aria-label="Toggle menu">
          <div class="hamburger" :class="{ 'active': isMobileMenuOpen }">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </button>

        <nav class="nav" :class="{ 'nav-open': isMobileMenuOpen }">
          <div class="nav-links-wrapper">
            <router-link to="/" class="nav-link" @click="closeMobileMenu">Home</router-link>
            <router-link to="/games" class="nav-link" @click="closeMobileMenu">Games</router-link>
            <router-link to="/company" class="nav-link" @click="closeMobileMenu">Company</router-link>
            <router-link to="/careers" class="nav-link" @click="closeMobileMenu">Careers</router-link>
          </div>
          <router-link to="/contact" class="nav-button" @click="closeMobileMenu">Contact</router-link>
        </nav>
      </div>
    </header>

    <main class="main-content">
      <router-view />
    </main>

    <footer class="footer">
      <div class="footer-content">
        <div class="footer-left">
          <img src="@/assets/logo.png" alt="Logo" class="footer-logo"/>
          <p>© 2024 Smash Games.</p>
        </div>
        <div class="social-links">
          <a href="#" target="_blank" aria-label="Discord"><i class="fab fa-discord"></i></a>
          <a href="#" target="_blank" aria-label="X"><i class="fa-brands fa-x-twitter"></i></a>
          <a href="#" target="_blank" aria-label="YouTube"><i class="fab fa-youtube"></i></a>
          <a href="https://www.roblox.com/groups/8338753/Smash-Games" target="_blank" aria-label="Roblox"><i class="fas fa-gamepad"></i></a>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
import { defineComponent, ref, onMounted, onUnmounted } from 'vue';
import '@fortawesome/fontawesome-free/css/all.css';

export default defineComponent({
  name: 'App',
  setup() {
    const isScrolled = ref(false);
    const isMobileMenuOpen = ref(false);

    const handleScroll = () => {
      isScrolled.value = window.scrollY > 50;
    };

    const toggleMobileMenu = () => {
      isMobileMenuOpen.value = !isMobileMenuOpen.value;
      document.body.style.overflow = isMobileMenuOpen.value ? 'hidden' : '';
    };

    const closeMobileMenu = () => {
      isMobileMenuOpen.value = false;
      document.body.style.overflow = '';
    };

    onMounted(() => {
      window.addEventListener('scroll', handleScroll);
      window.addEventListener('resize', closeMobileMenu);
    });

    onUnmounted(() => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', closeMobileMenu);
    });

    return { isScrolled, isMobileMenuOpen, toggleMobileMenu, closeMobileMenu };
  }
});
</script>

<style>
/* --- RESET & VARIABLES --- */
:root {
  --bg-color: #050505;
  --bg-card: #111111;
  --text-primary: #ffffff;
  --text-secondary: #888888;
  --accent-color: #0066ff;
  --accent-hover: #0052cc;
  --font-main: "Kanit", sans-serif;
  --nav-height: 80px;
}

*, *::before, *::after {
  box-sizing: border-box;
}

body {
  margin: 0;
  background-color: var(--bg-color);
  color: var(--text-primary);
  font-family: var(--font-main);
  -webkit-font-smoothing: antialiased;
  line-height: 1.5;
}

/* --- HEADER --- */
.header {
  position: fixed;
  top: 0; left: 0; width: 100%;
  height: var(--nav-height);
  z-index: 1000;
  transition: background-color 0.3s ease;
}

.header-visible {
  background-color: rgba(5, 5, 5, 0.95);
  border-bottom: 1px solid #222;
}

.header-content {
  max-width: 1400px;
  height: 100%;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  display: flex;
  align-items: center;
  gap: 12px;
  text-decoration: none;
  color: white;
  z-index: 1002;
}

.logo-img { height: 32px; width: auto; }
.logo-text { font-weight: 700; font-size: 1.2rem; letter-spacing: 1px; }

/* --- NAV --- */
.nav { display: flex; align-items: center; gap: 3rem; }
.nav-links-wrapper { display: flex; gap: 2rem; }

.nav-link {
  text-decoration: none;
  color: var(--text-secondary);
  font-weight: 500;
  font-size: 0.95rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  transition: color 0.2s;
  white-space: nowrap;
}

.nav-link:hover, .nav-link.router-link-active { color: var(--text-primary); }

.nav-button {
  background: white;
  color: black;
  padding: 0.5rem 1.5rem;
  font-weight: 600;
  text-decoration: none;
  border-radius: 4px;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-size: 0.9rem;
  transition: background 0.2s;
}

.nav-button:hover { background: #ddd; }

/* --- MOBILE --- */
.mobile-menu-btn { display: none; background: none; border: none; padding: 10px; cursor: pointer; z-index: 1002; }
.hamburger span { display: block; width: 24px; height: 2px; background: white; margin: 5px 0; transition: 0.3s; }
.hamburger.active span:nth-child(1) { transform: rotate(45deg) translate(5px, 5px); }
.hamburger.active span:nth-child(2) { opacity: 0; }
.hamburger.active span:nth-child(3) { transform: rotate(-45deg) translate(5px, -5px); }

/* --- FOOTER --- */
.footer {
  border-top: 1px solid #222;
  padding: 3rem 2rem;
  background: var(--bg-color);
}

.footer-content {
  max-width: 1400px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.footer-left { display: flex; align-items: center; gap: 1rem; }
.footer-logo { height: 30px; opacity: 0.5; }
.footer p { color: #444; font-size: 0.9rem; margin: 0; }

.social-links { display: flex; gap: 1.5rem; }
.social-links a { color: #444; font-size: 1.2rem; transition: 0.2s; }
.social-links a:hover { color: white; }

@media (max-width: 768px) {
  .mobile-menu-btn { display: block; }
  .nav {
    position: fixed; top: 0; left: 0; width: 100%; height: 100vh;
    background: var(--bg-color);
    flex-direction: column; justify-content: center;
    transform: translateX(100%); transition: transform 0.3s ease;
    z-index: 1001;
  }
  .nav-open { transform: translateX(0); }
  .nav-links-wrapper { flex-direction: column; align-items: center; gap: 2rem; margin-bottom: 2rem; }
  .nav-link { font-size: 1.5rem; }
  
  .footer-content { flex-direction: column; gap: 2rem; }
}
</style>