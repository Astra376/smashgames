<template>
  <section class="contact-page">
    <div class="header-spacer"></div>
    
    <div class="contact-header">
      <h1>Get in <span class="highlight">Touch</span></h1>
      <p>Have an idea? Want to work with us? Send us a signal.</p>
    </div>

    <div class="contact-wrapper">
      <div class="contact-info">
        <div class="info-block">
          <h3>Other Channels</h3>
          <p class="sub-text">We are active across the metaverse.</p>
          
          <div class="channels">
            <a href="mailto:contact@smashgames.com" class="channel-link">
              <i class="fas fa-envelope"></i> contact@smashgames.com
            </a>
            <a href="#" class="channel-link">
              <i class="fab fa-discord"></i> Join our Discord
            </a>
            <a href="#" class="channel-link">
              <i class="fab fa-twitter"></i> @SmashGames
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
          <textarea id="message" v-model="formData.message" rows="5" placeholder="What's on your mind?" required></textarea>
        </div>

        <button type="submit" class="submit-btn" :disabled="isSubmitting">
          {{ isSubmitting ? 'Sending...' : 'Send Message' }}
        </button>
      </form>
    </div>
  </section>
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
    };

    return { formData, isSubmitting, submitForm };
  }
});
</script>

<style scoped>
.contact-page { max-width: 1100px; margin: 0 auto; padding: 0 20px 100px; }
.header-spacer { height: 120px; }

.contact-header { text-align: center; margin-bottom: 60px; }
.contact-header h1 { font-size: 3rem; margin-bottom: 10px; }
.highlight { color: var(--primary); }

.contact-wrapper {
  display: grid;
  grid-template-columns: 1fr 1.5fr;
  gap: 50px;
  background: var(--bg-card);
  border: var(--glass-border);
  padding: 50px;
  border-radius: 20px;
}

.contact-info h3 { font-size: 1.5rem; margin-bottom: 10px; }
.sub-text { color: var(--text-muted); margin-bottom: 30px; }

.channel-link {
  display: flex; align-items: center; gap: 15px;
  color: white; text-decoration: none;
  padding: 15px;
  background: rgba(255,255,255,0.03);
  border-radius: 8px;
  margin-bottom: 15px;
  transition: 0.3s;
}
.channel-link:hover { background: rgba(0, 123, 255, 0.1); color: var(--primary); transform: translateX(5px); }

/* Form Styles */
.form-group { margin-bottom: 25px; }
.form-group label { display: block; margin-bottom: 8px; font-weight: 500; font-size: 0.9rem; color: #ccc; }

input, textarea {
  width: 100%;
  background: rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: 15px;
  border-radius: 8px;
  color: white;
  font-family: inherit;
  font-size: 1rem;
  transition: 0.3s;
  box-sizing: border-box; /* Fixes padding issues */
}

input:focus, textarea:focus {
  outline: none;
  border-color: var(--primary);
  box-shadow: 0 0 0 4px rgba(0, 123, 255, 0.1);
  background: rgba(0, 0, 0, 0.5);
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

.submit-btn:hover:not(:disabled) { background: #0069d9; transform: translateY(-2px); box-shadow: 0 5px 15px rgba(0, 123, 255, 0.3); }
.submit-btn:disabled { background: #333; cursor: not-allowed; opacity: 0.7; }

@media (max-width: 768px) {
  .contact-wrapper { grid-template-columns: 1fr; padding: 30px; }
}
</style>