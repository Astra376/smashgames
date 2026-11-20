<template>
  <div class="social-container">
    <div class="social-header">
      <h2>Join the <span class="highlight">Community</span></h2>
      <p>Updates, sneak peeks and giveaways. Follow Smash Games everywhere.</p>
    </div>

    <div class="social-grid">
      <a :href="socials.roblox" target="_blank" rel="noopener" class="social-card roblox">
        <div class="icon">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path fill="currentColor" fill-rule="evenodd" d="M5.2 1 23 5.2 18.8 23 1 18.8Zm5.5 8.5-1.2 3.8 3.8 1.2 1.2-3.8Z" />
          </svg>
        </div>
        <span class="platform">Roblox Community</span>
        <span class="handle">Smash Games.</span>
        <span class="detail">{{ robloxMembers ? `${formatCompact(robloxMembers)} members` : 'Join the group' }}</span>
        <span class="cta">Join <i class="fas fa-arrow-right"></i></span>
      </a>

      <a :href="socials.x" target="_blank" rel="noopener" class="social-card x">
        <div class="icon"><i class="fa-brands fa-x-twitter"></i></div>
        <span class="platform">X</span>
        <span class="handle">@PlaySmashGames</span>
        <span class="detail">News and updates</span>
        <span class="cta">Follow <i class="fas fa-arrow-right"></i></span>
      </a>

      <a :href="socials.youtube" target="_blank" rel="noopener" class="social-card youtube">
        <div class="icon"><i class="fab fa-youtube"></i></div>
        <span class="platform">YouTube</span>
        <span class="handle">@SmashGamesOfficial</span>
        <span class="detail">Trailers and devlogs</span>
        <span class="cta">Subscribe <i class="fas fa-arrow-right"></i></span>
      </a>

      <component
        :is="socials.discord ? 'a' : 'router-link'"
        v-bind="socials.discord ? { href: socials.discord, target: '_blank', rel: 'noopener' } : { to: '/contact' }"
        class="social-card discord"
      >
        <div class="icon"><i class="fab fa-discord"></i></div>
        <span class="platform">Discord</span>
        <span class="handle">{{ socials.discord ? 'Smash Games' : `@${discordContact}` }}</span>
        <span class="detail">{{ socials.discord ? 'Chat with the community' : 'Get in contact' }}</span>
        <span class="cta">{{ socials.discord ? 'Join' : 'Message' }} <i class="fas fa-arrow-right"></i></span>
      </component>
    </div>
  </div>
</template>

<script>
import { defineComponent, computed } from 'vue';
import { socials, discordContact, ROBLOX_COMMUNITY_ID } from '@/config/socials';
import { useRobloxStats, formatCompact } from '@/composables/useRobloxStats';

export default defineComponent({
  name: 'SocialSection',
  setup() {
    const { stats } = useRobloxStats();
    const robloxMembers = computed(() => stats.value?.groups?.find((g) => g.id === ROBLOX_COMMUNITY_ID)?.memberCount || 0);
    return { socials, discordContact, robloxMembers, formatCompact };
  },
});
</script>

<style scoped>
.social-container { text-align: center; }

.social-header h2 { font-size: 3rem; font-weight: 800; margin: 0 0 10px; color: white; letter-spacing: -0.5px; }
.social-header p { font-size: 1.2rem; color: var(--text-muted); margin: 0 auto 60px; max-width: 600px; }
.highlight { color: var(--primary); }

.social-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 24px;
}

.social-card {
  --accent: var(--primary);
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  text-align: left;
  padding: 32px 28px 28px;
  background: var(--bg-card);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  text-decoration: none;
  color: white;
  overflow: hidden;
  transition: transform 0.3s ease, border-color 0.3s ease, background 0.3s ease;
}
.social-card::before {
  content: '';
  position: absolute; inset: 0 0 auto 0; height: 4px;
  background: var(--accent);
  transform: scaleX(0); transform-origin: left;
  transition: transform 0.35s ease;
}
.social-card:hover { transform: translateY(-8px); border-color: var(--accent); background: rgba(255, 255, 255, 0.04); }
.social-card:hover::before { transform: scaleX(1); }

.social-card.roblox { --accent: #e2231a; }
.social-card.x { --accent: #ffffff; }
.social-card.youtube { --accent: #ff0033; }
.social-card.discord { --accent: #5865f2; }

.icon {
  width: 60px; height: 60px;
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.06);
  display: flex; align-items: center; justify-content: center;
  font-size: 1.8rem;
  color: var(--accent);
  margin-bottom: 22px;
  transition: 0.3s;
}
.icon svg { width: 30px; height: 30px; }
.social-card:hover .icon { background: var(--accent); color: #0a0a0f; }
.social-card.discord:hover .icon, .social-card.youtube:hover .icon, .social-card.roblox:hover .icon { color: white; }

.platform { font-size: 0.8rem; font-weight: 600; text-transform: uppercase; letter-spacing: 2px; color: var(--text-muted); }
.handle { font-size: 1.45rem; font-weight: 800; margin: 4px 0 6px; word-break: break-word; }
.detail { color: var(--text-muted); font-size: 0.95rem; margin-bottom: 22px; }
.cta {
  margin-top: auto;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-size: 0.9rem;
  display: inline-flex; align-items: center; gap: 8px;
}
.cta i { transition: transform 0.3s; }
.social-card:hover .cta i { transform: translateX(4px); }
</style>
