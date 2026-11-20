<template>
  <div class="page-container">
    <div class="header-spacer"></div>

    <div class="page-header">
      <h1>Get in <span class="highlight">Touch</span></h1>
      <p>Have an idea? Want to work with us? Get in contact on Discord.</p>
    </div>

    <div class="discord-card">
      <div class="discord-icon"><i class="fab fa-discord"></i></div>
      <span class="eyebrow">Get in contact on Discord</span>
      <div class="handle">@{{ discordContact }}</div>
      <p>Send a friend request or DM on Discord for business, collabs and support.</p>
      <div class="actions">
        <button type="button" class="btn primary" @click="copyHandle">
          <i :class="copied ? 'fas fa-check' : 'far fa-copy'"></i>
          {{ copied ? 'Copied!' : 'Copy username' }}
        </button>
        <a href="https://discord.com/app" target="_blank" rel="noopener" class="btn secondary">
          <i class="fab fa-discord"></i> Open Discord
        </a>
      </div>
    </div>

    <div class="follow">
      <h3>Follow Smash Games</h3>
      <div class="links-row">
        <a :href="socials.roblox" target="_blank" rel="noopener" class="contact-link">
          <div class="icon-box"><i class="fas fa-gamepad"></i></div>
          <span>Roblox Community</span>
        </a>
        <a :href="socials.x" target="_blank" rel="noopener" class="contact-link">
          <div class="icon-box"><i class="fa-brands fa-x-twitter"></i></div>
          <span>@PlaySmashGames</span>
        </a>
        <a :href="socials.youtube" target="_blank" rel="noopener" class="contact-link">
          <div class="icon-box"><i class="fab fa-youtube"></i></div>
          <span>@SmashGamesOfficial</span>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { socials, discordContact } from '@/config/socials';

export default defineComponent({
  name: 'ContactPage',
  setup() {
    const copied = ref(false);

    const copyHandle = async () => {
      try {
        await navigator.clipboard.writeText(discordContact);
      } catch {
        window.prompt('Copy this Discord username:', discordContact);
        return;
      }
      copied.value = true;
      setTimeout(() => (copied.value = false), 2000);
    };

    return { socials, discordContact, copied, copyHandle };
  }
});
</script>

<style scoped>
.page-container { max-width: 1100px; margin: 0 auto; padding: 0 20px 100px; }
.header-spacer { height: 120px; }

.page-header { text-align: center; margin-bottom: 50px; }
.page-header h1 { font-size: 3rem; margin-bottom: 10px; font-weight: 800; }
.page-header p { color: var(--text-muted); font-size: 1.1rem; }
.highlight { color: var(--primary); }

.discord-card {
  max-width: 720px;
  margin: 0 auto 60px;
  padding: clamp(2rem, 5vw, 3.5rem);
  text-align: center;
  background: linear-gradient(180deg, rgba(88, 101, 242, 0.16), rgba(88, 101, 242, 0.04));
  border: 1px solid rgba(88, 101, 242, 0.45);
  border-radius: 24px;
}
.discord-icon {
  width: 84px; height: 84px; margin: 0 auto 20px;
  border-radius: 24px;
  background: #5865f2;
  display: flex; align-items: center; justify-content: center;
  font-size: 2.6rem; color: white;
}
.eyebrow { text-transform: uppercase; letter-spacing: 3px; font-size: 0.9rem; font-weight: 600; color: #aab2ff; }
.handle {
  font-size: clamp(2.5rem, 7vw, 4.25rem);
  font-weight: 900;
  letter-spacing: -1px;
  line-height: 1.1;
  margin: 10px 0 14px;
  color: white;
  word-break: break-all;
}
.discord-card p { color: var(--text-muted); font-size: 1.05rem; margin: 0 0 28px; }

.actions { display: flex; gap: 14px; justify-content: center; flex-wrap: wrap; }
.btn {
  display: inline-flex; align-items: center; gap: 10px;
  padding: 14px 28px;
  border-radius: 50px;
  font: inherit; font-weight: 600; font-size: 1rem;
  text-transform: uppercase; letter-spacing: 1px;
  text-decoration: none;
  cursor: pointer;
  transition: 0.3s;
}
.btn.primary { background: #5865f2; color: white; border: 2px solid #5865f2; }
.btn.primary:hover { background: #4752c4; border-color: #4752c4; transform: translateY(-2px); }
.btn.secondary { background: transparent; color: white; border: 2px solid rgba(255, 255, 255, 0.6); }
.btn.secondary:hover { background: white; color: #0a0a0f; transform: translateY(-2px); }

.follow { text-align: center; }
.follow h3 { font-size: 1.4rem; margin-bottom: 20px; }
.links-row { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 15px; }

.contact-link {
  display: flex; align-items: center; gap: 15px;
  color: white; text-decoration: none;
  padding: 15px;
  background: var(--bg-card);
  border: var(--glass-border);
  border-radius: 12px;
  transition: 0.3s;
}
.contact-link:hover { background: rgba(0, 123, 255, 0.1); transform: translateY(-3px); }
.icon-box {
  width: 40px; height: 40px; background: rgba(0, 123, 255, 0.2);
  border-radius: 8px; display: flex; align-items: center; justify-content: center;
  color: var(--primary);
}
</style>
