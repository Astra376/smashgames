<template>
  <div class="page-container">
    <div class="header-spacer"></div>
    
    <div class="page-header">
      <h1>Join the <span class="highlight">Revolution</span></h1>
      <p>We are looking for visionaries to build the next generation of experiences.</p>
    </div>

    <div class="jobs-list">
      <div v-for="(job, index) in jobs" :key="index" class="job-card">
        <div class="job-main">
          <h3>{{ job.title }}</h3>
          <p class="job-desc">{{ job.description }}</p>
          <div class="tags">
            <span v-for="tag in job.tags" :key="tag" class="tag">{{ tag }}</span>
          </div>
        </div>
        <div class="job-action">
          <span class="type">Full Time</span>
          <router-link to="/contact" class="apply-btn">Apply Now <i class="fas fa-arrow-right"></i></router-link>
        </div>
      </div>
    </div>

    <div class="perks-container">
      <h2>Why Smash Games?</h2>
      <div class="perks-grid">
        <div class="perk-card">
          <div class="icon">🌍</div>
          <h3>Remote First</h3>
          <p>Work from anywhere in the world.</p>
        </div>
        <div class="perk-card">
          <div class="icon">💰</div>
          <h3>Competitive Pay</h3>
          <p>Top tier salaries and bonuses.</p>
        </div>
        <div class="perk-card">
          <div class="icon">🏥</div>
          <h3>Health</h3>
          <p>Comprehensive wellness coverage.</p>
        </div>
        <div class="perk-card">
          <div class="icon">🚀</div>
          <h3>Growth</h3>
          <p>Annual budget for learning & dev.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'CareersPage',
  setup() {
    const jobs = ref([
      { 
        title: 'Senior Game Developer', 
        description: 'Master of Lua? Lead our engineering efforts and create complex systems for our flagship titles.',
        tags: ['Roblox Studio', 'Lua', '5+ Years']
      },
      { 
        title: '3D Environmental Artist', 
        description: 'Build breathtaking low-poly worlds that players get lost in. Blender mastery required.',
        tags: ['Blender', 'Maya', 'Art']
      },
      { 
        title: 'Game Designer', 
        description: 'Craft the core loops, monetization strategies, and mechanics that keep players coming back.',
        tags: ['System Design', 'Analytics']
      }
    ]);
    return { jobs };
  }
});
</script>

<style scoped>
.page-container { max-width: 1000px; margin: 0 auto; padding: 0 20px 100px; }
.header-spacer { height: 120px; }

.page-header { text-align: center; margin-bottom: 60px; }
.page-header h1 { font-size: 3rem; margin-bottom: 10px; font-weight: 800; }
.page-header p { color: var(--text-muted); font-size: 1.2rem; }
.highlight { color: var(--primary); }

.jobs-list { display: flex; flex-direction: column; gap: 20px; margin-bottom: 80px; }

.job-card {
  background: var(--bg-card);
  border: var(--glass-border);
  padding: 30px;
  border-radius: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: 0.3s;
}

.job-card:hover { border-color: var(--primary); transform: translateX(5px); background: var(--bg-card-hover); }

.job-main h3 { margin: 0 0 10px; font-size: 1.5rem; }
.job-desc { color: var(--text-muted); margin-bottom: 15px; max-width: 600px; }

.tags { display: flex; gap: 10px; flex-wrap: wrap; }
.tag { background: rgba(255,255,255,0.05); padding: 4px 12px; border-radius: 20px; font-size: 0.85rem; color: #ccc; }

.job-action { text-align: right; display: flex; flex-direction: column; gap: 15px; align-items: flex-end; }
.type { font-weight: 600; color: var(--primary); font-size: 0.9rem; background: rgba(0, 123, 255, 0.1); padding: 4px 12px; border-radius: 4px; }

.apply-btn {
  text-decoration: none;
  color: white;
  font-weight: 600;
  display: flex; align-items: center; gap: 8px;
  transition: 0.2s;
}
.apply-btn:hover { color: var(--primary); gap: 12px; }

.perks-container h2 { text-align: center; margin-bottom: 40px; font-size: 2rem; }
.perks-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; }

.perk-card {
  background: rgba(255,255,255,0.02);
  padding: 30px 20px;
  border-radius: 12px;
  text-align: center;
  border: 1px solid transparent;
  transition: 0.3s;
}
.perk-card:hover { background: rgba(255,255,255,0.04); }
.icon { font-size: 2.5rem; margin-bottom: 15px; }
.perk-card h3 { font-size: 1.2rem; margin-bottom: 5px; }
.perk-card p { font-size: 0.9rem; color: var(--text-muted); }

@media (max-width: 768px) {
  .job-card { flex-direction: column; align-items: flex-start; gap: 20px; }
  .job-action { align-items: flex-start; width: 100%; flex-direction: row; justify-content: space-between; }
}
</style>