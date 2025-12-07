<template>
  <div class="page-container">
    <div class="header-spacer"></div>
    
    <div class="intro-section">
      <h1>Join the <span class="highlight">Revolution</span></h1>
      <p>We are looking for visionaries to build the next generation of Roblox experiences.</p>
    </div>

    <div class="jobs-grid">
      <div v-for="(job, index) in jobs" :key="index" class="job-card">
        <div class="job-header">
          <h3>{{ job.title }}</h3>
          <span class="job-type">Full Time</span>
        </div>
        <p class="job-desc">{{ job.description }}</p>
        <ul class="job-tags">
          <li v-for="tag in job.tags" :key="tag">{{ tag }}</li>
        </ul>
        <router-link to="/contact" class="apply-btn">Apply Now <i class="fas fa-arrow-right"></i></router-link>
      </div>
    </div>

    <div class="perks-section">
      <h2>Why Smash Games?</h2>
      <div class="perks-grid">
        <div class="perk"><span>🌍</span> Remote First</div>
        <div class="perk"><span>💰</span> Competitive Pay</div>
        <div class="perk"><span>🏥</span> Health Coverage</div>
        <div class="perk"><span>🚀</span> Growth Budget</div>
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
        description: 'Master of Lua? Lead our engineering efforts and create complex systems.',
        tags: ['Roblox Studio', 'Lua', '5+ Years']
      },
      { 
        title: '3D Environmental Artist', 
        description: 'Build breathtaking worlds that players get lost in.',
        tags: ['Blender', 'Maya', 'Low Poly']
      },
      { 
        title: 'Game Designer', 
        description: 'Craft the loops and mechanics that keep players coming back.',
        tags: ['System Design', 'Monetization', 'Analytics']
      }
    ]);
    return { jobs };
  }
});
</script>

<style scoped>
.page-container { max-width: 1000px; margin: 0 auto; padding: 0 20px 100px; }
.header-spacer { height: 120px; }
.highlight { color: var(--primary); }

.intro-section { text-align: center; margin-bottom: 60px; }
.intro-section h1 { font-size: 3rem; margin-bottom: 15px; }
.intro-section p { color: var(--text-muted); font-size: 1.2rem; }

.jobs-grid { display: flex; flex-direction: column; gap: 20px; margin-bottom: 80px; }

.job-card {
  background: var(--bg-card);
  border: var(--glass-border);
  padding: 30px;
  border-radius: 12px;
  transition: 0.3s;
  display: flex;
  flex-direction: column;
}

.job-card:hover { border-color: var(--primary); transform: translateX(5px); }

.job-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px; }
.job-header h3 { font-size: 1.5rem; margin: 0; }
.job-type { background: rgba(0, 123, 255, 0.1); color: var(--primary); padding: 5px 12px; border-radius: 20px; font-size: 0.8rem; font-weight: bold; }

.job-desc { color: var(--text-muted); margin-bottom: 20px; }

.job-tags { list-style: none; padding: 0; display: flex; gap: 10px; margin-bottom: 25px; }
.job-tags li { background: rgba(255,255,255,0.05); padding: 5px 10px; border-radius: 4px; font-size: 0.85rem; color: #ccc; }

.apply-btn {
  align-self: flex-start;
  color: white;
  text-decoration: none;
  font-weight: 600;
  display: flex; align-items: center; gap: 10px;
  transition: 0.2s;
}
.apply-btn:hover { color: var(--primary); gap: 15px; }

.perks-section h2 { text-align: center; margin-bottom: 40px; font-size: 2rem; }
.perks-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; }
.perk { background: rgba(255,255,255,0.03); padding: 20px; border-radius: 8px; text-align: center; font-weight: 600; border: 1px solid transparent; }
.perk span { display: block; font-size: 2rem; margin-bottom: 10px; }
</style>