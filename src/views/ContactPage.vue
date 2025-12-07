<template>
  <div class="page-container">
    <div class="header-spacer"></div>
    
    <div class="page-header">
      <h1>Get in <span class="highlight">Touch</span></h1>
      <p>Have an idea? Want to work with us? Send us a signal.</p>
    </div>

    <div class="contact-grid">
      <div class="info-column">
        <div class="info-card">
          <h3>Connect</h3>
          <p>We are active across the metaverse.</p>
          
          <div class="links-stack">
            <a href="mailto:contact@smashgames.com" class="contact-link">
              <div class="icon-box"><i class="fas fa-envelope"></i></div>
              <span>contact@smashgames.com</span>
            </a>
            <a href="#" class="contact-link">
              <div class="icon-box"><i class="fab fa-discord"></i></div>
              <span>Join our Discord</span>
            </a>
            <a href="#" class="contact-link">
              <div class="icon-box"><i class="fab fa-twitter"></i></div>
              <span>@SmashGames</span>
            </a>
          </div>
        </div>
      </div>

      <form class="contact-form" @submit.prevent="submitForm">
        <div class="form-group">
          <label for="name">Name</label>
          <input type="text" id="name" v-model="formData.name" placeholder="Your Name" required>
        </div>

        <div class="form-group">
          <label for="email">Email</label>
          <input type="email" id="email" v-model="formData.email" placeholder="name@example.com" required>
        </div>

        <div class="form-group">
          <label for="message">Message</label>
          <textarea id="message" v-model="formData.message" rows="6" placeholder="What's on your mind?" required></textarea>
        </div>

        <button type="submit" class="submit-btn" :disabled="isSubmitting">
          {{ isSubmitting ? 'Sending...' : 'Send Message' }}
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'ContactPage',
  setup() {
    const formData = ref({ name: '', email: '', message: '' });
    const isSubmitting = ref(false);

    const submitForm = async () => {
      isSubmitting.value = true;
      // Simulate API
      await new Promise(resolve => setTimeout(resolve, 1500));
      console.log('Sent:', formData.value);
      formData.value = { name: '', email: '', message: '' };
      isSubmitting.value = false;
      alert("Message sent!");
    };

    return { formData, isSubmitting, submitForm };
  }
});
</script>

<style scoped>
.page-container { max-width: 1100px; margin: 0 auto; padding: 0 20px 100px; }
.header-spacer { height: 120px; }

.page-header { text-align: center; margin-bottom: 60px; }
.page-header h1 { font-size: 3rem; margin-bottom: 10px; font-weight: 800; }
.page-header p { color: var(--text-muted); font-size: 1.1rem; }
.highlight { color: var(--primary); }

.contact-grid {
  display: grid;
  grid-template-columns: 1fr 1.5fr;
  gap: 40px;
}

.info-card {
  background: var(--bg-card);
  border: var(--glass-border);
  padding: 40px;
  border-radius: 16px;
  height: 100%;
}

.info-card h3 { font-size: 1.5rem; margin-bottom: 10px; }
.info-card p { color: var(--text-muted); margin-bottom: 30px; }

.links-stack { display: flex; flex-direction: column; gap: 15px; }

.contact-link {
  display: flex; align-items: center; gap: 15px;
  color: white; text-decoration: none;
  padding: 15px;
  background: rgba(255,255,255,0.03);
  border-radius: 10px;
  transition: 0.3s;
}
.contact-link:hover { background: rgba(0, 123, 255, 0.1); transform: translateX(5px); }
.icon-box {
  width: 40px; height: 40px; background: rgba(0, 123, 255, 0.2);
  border-radius: 8px; display: flex; align-items: center; justify-content: center;
  color: var(--primary);
}

.contact-form {
  background: var(--bg-card);
  border: var(--glass-border);
  padding: 40px;
  border-radius: 16px;
}

.form-group { margin-bottom: 25px; }
.form-group label { display: block; margin-bottom: 8px; font-weight: 500; font-size: 0.9rem; color: #ccc; }

input, textarea {
  width: 100%;
  background: rgba(0, 0, 0, 0.4);
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: 15px;
  border-radius: 8px;
  color: white;
  font-family: inherit;
  font-size: 1rem;
  transition: 0.3s;
}

input:focus, textarea:focus {
  outline: none;
  border-color: var(--primary);
  background: rgba(0, 0, 0, 0.6);
  box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.1);
}

.submit-btn {
  width: 100%;
  padding: 15px;
  background: var(--primary);
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: bold;
  font-size: 1.1rem;
  cursor: pointer;
  transition: 0.3s;
}

.submit-btn:hover:not(:disabled) { background: var(--primary-hover); transform: translateY(-2px); }
.submit-btn:disabled { background: #333; cursor: not-allowed; opacity: 0.7; }

@media (max-width: 768px) {
  .contact-grid { grid-template-columns: 1fr; }
}
</style>