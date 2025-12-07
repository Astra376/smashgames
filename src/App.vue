<template>
  <div id="app" class="app">
    <header class="header" :class="{ 'header-scrolled': isScrolled || isMobileMenuOpen }">
      <div class="header-content">
        <router-link to="/" class="logo" @click="closeMobileMenu">
          <img src="@/assets/logo 2.png" alt="Smash Games" class="logo-img" />
          <span class="logo-text">Smash Games</span>
        </router-link>
        
        <button class="mobile-menu-btn" @click="toggleMobileMenu" aria-label="Toggle menu">
          <span class="menu-icon" :class="{ 'open': isMobileMenuOpen }"></span>
        </button>

        <nav class="nav" :class="{ 'nav-open': isMobileMenuOpen }">
          <div class="nav-links-wrapper">
            <router-link to="/" class="nav-link" @click="closeMobileMenu">Home</router-link>
            <router-link to="/games" class="nav-link" @click="closeMobileMenu">Games</router-link>
            <router-link to="/company" class="nav-link" @click="closeMobileMenu">Company</router-link>
            <router-link to="/careers" class="nav-link" @click="closeMobileMenu">Careers</router-link>
          </div>
          <router-link to="/contact" class="nav-link standout" @click="closeMobileMenu">Contact Us</router-link>
        </nav>
      </div>
    </header>

    <main class="main-content">
      <router-view v-slot="{ Component }">
        <transition name="page-fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>

    <footer class="footer">
      <div class="footer-content">
        <div class="footer-brand">
          <img src="@/assets/logo.png" alt="Logo" class="footer-logo"/>
          <p>Breaking barriers. Smashing expectations.</p>
        </div>
        <div class="social-links">
          <a href="#" target="_blank" aria-label="Discord"><i class="fab fa-discord"></i></a>
          <a href="#" target="_blank" aria-label="X"><i class="fa-brands fa-x-twitter"></i></a>
          <a href="#" target="_blank" aria-label="YouTube"><i class="fab fa-youtube"></i></a>
          <a href="https://www.roblox.com/groups/8338753/Smash-Games" target="_blank" aria-label="Roblox"><i class="fas fa-gamepad"></i></a>
        </div>
        <div class="copyright">
          <p>© 2024 Smash Games. All rights reserved.</p>
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
      isScrolled.value = window.scrollY > 20;
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
/* --- GLOBAL VARIABLES --- */
:root {
  --primary: #007bff;
  --primary-hover: #0056b3;
  --primary-glow: rgba(0, 123, 255, 0.4);
  --bg-dark: #0a0a0f;
  --bg-darker: #050508;
  --bg-card: rgba(255, 255, 255, 0.03);
  --bg-card-hover: rgba(255, 255, 255, 0.06);
  --text-main: #ffffff;
  --text-muted: #a0a0a0;
  --glass-border: 1px solid rgba(255, 255, 255, 0.08);
  --font-main: "Kanit", sans-serif;
  --nav-height: 80px;
}

/* --- RESET & BASE --- */
*, *::before, *::after {
  box-sizing: border-box;
}

body {
  margin: 0;
  background-color: var(--bg-dark);
  color: var(--text-main);
  font-family: var(--font-main);
  -webkit-font-smoothing: antialiased;
  overflow-x: hidden;
  line-height: 1.6;
}

/* --- HEADER --- */
.header {
  position: fixed;
  top: 0; left: 0; right: 0;
  z-index: 1000;
  height: var(--nav-height);
  transition: all 0.3s ease;
  border-bottom: 1px solid transparent;
}

.header-scrolled {
  background: rgba(10, 10, 15, 0.9);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-bottom: var(--glass-border);
  height: 70px;
}

.header-content {
  max-width: 1600px; /* Wider container for header */
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
  flex-shrink: 0; /* Prevent logo shrinking */
}

.logo-img { height: 40px; width: auto; }
.logo-text { font-weight: 700; font-size: 1.5rem; letter-spacing: -0.5px; text-transform: uppercase; white-space: nowrap; }

/* --- NAVIGATION --- */
.nav { display: flex; align-items: center; gap: 3rem; } /* Increased gap */

.nav-links-wrapper {
  display: flex;
  gap: 2.5rem; /* Space between links */
}

.nav-link {
  text-decoration: none;
  color: var(--text-muted);
  font-weight: 500;
  font-size: 1rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  transition: color 0.3s;
  position: relative;
  white-space: nowrap; /* Prevent squishing */
}

.nav-link:not(.standout):hover, 
.nav-link:not(.standout).router-link-active { 
  color: var(--text-main); 
}

.nav-link:not(.standout)::after {
  content: '';
  position: absolute;
  bottom: -4px; left: 0; width: 0%; height: 2px;
  background: var(--primary);
  transition: width 0.3s ease;
}

.nav-link:not(.standout):hover::after,
.nav-link:not(.standout).router-link-active::after {
  width: 100%;
}

.nav-link.standout {
  padding: 0.6rem 1.8rem;
  background: var(--primary);
  color: white;
  border-radius: 50px;
  font-weight: 600;
  box-shadow: 0 0 15px var(--primary-glow);
  transition: all 0.3s;
}

.nav-link.standout:hover {
  transform: translateY(-2px);
  background: var(--primary-hover);
  box-shadow: 0 0 25px var(--primary-glow);
}

/* --- MOBILE MENU --- */
.mobile-menu-btn { display: none; background: none; border: none; cursor: pointer; padding: 10px; z-index: 1002; }
.menu-icon { display: block; width: 28px; height: 2px; background: white; position: relative; transition: 0.3s; }
.menu-icon::before, .menu-icon::after { content: ''; position: absolute; width: 100%; height: 2px; background: white; transition: 0.3s; }
.menu-icon::before { top: -8px; }
.menu-icon::after { top: 8px; }

.menu-icon.open { background: transparent; }
.menu-icon.open::before { top: 0; transform: rotate(45deg); }
.menu-icon.open::after { top: 0; transform: rotate(-45deg); }

/* --- MAIN CONTENT --- */
.main-content { min-height: 100vh; display: flex; flex-direction: column; }

.page-fade-enter-active, .page-fade-leave-active { transition: opacity 0.4s ease, transform 0.4s ease; }
.page-fade-enter-from, .page-fade-leave-to { opacity: 0; transform: translateY(10px); }

/* --- FOOTER --- */
.footer {
  background: var(--bg-darker);
  border-top: var(--glass-border);
  padding: 4rem 2rem 2rem;
  text-align: center;
}

.footer-content { max-width: 1200px; margin: 0 auto; display: flex; flex-direction: column; align-items: center; gap: 1.5rem; }
.footer-logo { height: 50px; margin-bottom: 1rem; opacity: 0.8; }
.footer-brand p { color: var(--text-muted); font-size: 0.9rem; margin: 0; }

.social-links { display: flex; gap: 2rem; margin: 1rem 0; }
.social-links a { color: var(--text-muted); font-size: 1.5rem; transition: 0.3s; }
.social-links a:hover { color: var(--primary); transform: translateY(-3px); }

.copyright p { color: #444; font-size: 0.8rem; margin: 0; }

/* --- MEDIA QUERIES --- */
@media (max-width: 1024px) {
  .nav { gap: 1.5rem; }
  .nav-links-wrapper { gap: 1.5rem; }
}

@media (max-width: 768px) {
  .mobile-menu-btn { display: block; }
  
  .nav {
    position: fixed; top: 0; left: 0; width: 100%; height: 100vh;
    background: #0a0a0f;
    flex-direction: column; justify-content: center;
    padding: 2rem;
    transform: translateX(100%); transition: transform 0.4s cubic-bezier(0.77, 0, 0.175, 1);
    z-index: 1001;
  }
  .nav.nav-open { transform: translateX(0); }
  
  .nav-links-wrapper { display: flex; flex-direction: column; gap: 2rem; align-items: center; margin-bottom: 2rem; width: 100%; }
  .nav-link { font-size: 1.5rem; }
  .nav-link.standout { width: 100%; text-align: center; max-width: 300px; }
}
</style>