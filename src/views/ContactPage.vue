<template>
  <div class="page-container">
    <div class="header-spacer"></div>

    <div class="page-header">
      <h1>Get in <span class="highlight">Touch</span></h1>
      <p>Have an idea? Want to work with us? We'd love to hear from you.</p>
    </div>

    <div class="contact-grid">
      <div class="info-column">
        <div class="info-card">
          <h3>Let's Connect</h3>
          <p>Reach out through the form or find us across the web. We typically respond within 24 hours.</p>

          <div class="links-stack">
            <a href="#contact-form" class="contact-link" @click.prevent="focusForm">
              <div class="icon-box"><i class="fas fa-envelope"></i></div>
              <div class="link-text">
                <span class="link-title">Email Us</span>
                <span class="link-sub">Use the form to get in touch</span>
              </div>
            </a>
            <a href="#" class="contact-link">
              <div class="icon-box discord"><i class="fab fa-discord"></i></div>
              <div class="link-text">
                <span class="link-title">Discord</span>
                <span class="link-sub">Join our community server</span>
              </div>
            </a>
            <a href="#" class="contact-link">
              <div class="icon-box twitter"><i class="fab fa-twitter"></i></div>
              <div class="link-text">
                <span class="link-title">Twitter / X</span>
                <span class="link-sub">@SmashGames</span>
              </div>
            </a>
          </div>

          <div class="response-badge">
            <i class="fas fa-clock"></i>
            <span>Average response time: <strong>under 24h</strong></span>
          </div>
        </div>
      </div>

      <form id="contact-form" class="contact-form" @submit.prevent="submitForm" v-if="!submitted">
        <!-- Web3Forms access key — set in Cloudflare Pages env or replace with your key from web3forms.com -->
        <input type="hidden" name="access_key" :value="accessKey" />
        <input type="hidden" name="subject" value="New Contact Form Submission — Smash Games" />
        <input type="hidden" name="from_name" value="Smash Games Website" />
        <input type="checkbox" name="botcheck" style="display:none" />

        <div class="form-row">
          <div class="form-group">
            <label for="name">Name</label>
            <input type="text" id="name" v-model="formData.name" placeholder="Your name" required />
          </div>
          <div class="form-group">
            <label for="email">Email</label>
            <input type="email" id="email" v-model="formData.email" placeholder="name@example.com" required />
          </div>
        </div>

        <div class="form-group">
          <label for="subject">Subject</label>
          <select id="subject" v-model="formData.subject">
            <option value="" disabled>Select a topic</option>
            <option value="General Inquiry">General Inquiry</option>
            <option value="Partnership / Collaboration">Partnership / Collaboration</option>
            <option value="Game Feedback">Game Feedback</option>
            <option value="Careers">Careers</option>
            <option value="Press / Media">Press / Media</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div class="form-group">
          <label for="message">Message</label>
          <textarea id="message" v-model="formData.message" rows="6" placeholder="Tell us what's on your mind…" required></textarea>
        </div>

        <button type="submit" class="submit-btn" :disabled="isSubmitting">
          <span v-if="isSubmitting" class="btn-inner">
            <span class="spinner"></span> Sending…
          </span>
          <span v-else class="btn-inner">
            Send Message <i class="fas fa-arrow-right"></i>
          </span>
        </button>

        <p v-if="errorMsg" class="error-msg"><i class="fas fa-exclamation-circle"></i> {{ errorMsg }}</p>
      </form>

      <div class="success-state" v-else>
        <div class="success-icon"><i class="fas fa-check"></i></div>
        <h2>Message Sent!</h2>
        <p>Thanks for reaching out. We'll get back to you as soon as possible.</p>
        <button class="reset-btn" @click="resetForm">Send another message</button>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue';

// Web3Forms access key — configure at web3forms.com (free).
// The recipient email is stored in your Web3Forms account, not in this code.
const WEB3FORMS_KEY = import.meta.env.VITE_WEB3FORMS_KEY || '';

export default defineComponent({
  name: 'ContactPage',
  setup() {
    const formData = ref({ name: '', email: '', subject: '', message: '' });
    const isSubmitting = ref(false);
    const submitted = ref(false);
    const errorMsg = ref('');
    const accessKey = ref(WEB3FORMS_KEY);

    const focusForm = () => {
      document.getElementById('name')?.focus();
    };

    const submitForm = async () => {
      isSubmitting.value = true;
      errorMsg.value = '';

      const payload = {
        access_key: accessKey.value,
        subject: `[Smash Games] ${formData.value.subject || 'New Message'} from ${formData.value.name}`,
        from_name: 'Smash Games Website',
        name: formData.value.name,
        email: formData.value.email,
        topic: formData.value.subject,
        message: formData.value.message,
      };

      try {
        const res = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify(payload),
        });
        const data = await res.json();
        if (data.success) {
          submitted.value = true;
        } else {
          errorMsg.value = data.message || 'Something went wrong. Please try again.';
        }
      } catch {
        errorMsg.value = 'Network error — please check your connection and try again.';
      } finally {
        isSubmitting.value = false;
      }
    };

    const resetForm = () => {
      formData.value = { name: '', email: '', subject: '', message: '' };
      submitted.value = false;
      errorMsg.value = '';
    };

    return { formData, isSubmitting, submitted, errorMsg, accessKey, focusForm, submitForm, resetForm };
  }
});
</script>

<style scoped>
.page-container { max-width: 1100px; margin: 0 auto; padding: 0 20px 100px; }
.header-spacer { height: 120px; }

.page-header { text-align: center; margin-bottom: 60px; }
.page-header h1 { font-size: 3rem; margin-bottom: 12px; font-weight: 800; }
.page-header p { color: var(--text-muted); font-size: 1.1rem; }
.highlight { color: var(--primary); }

.contact-grid {
  display: grid;
  grid-template-columns: 1fr 1.6fr;
  gap: 30px;
  align-items: start;
}

/* Info Card */
.info-card {
  background: var(--bg-card);
  border: var(--glass-border);
  padding: 36px;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  gap: 0;
}

.info-card h3 { font-size: 1.4rem; margin: 0 0 8px; font-weight: 700; }
.info-card > p { color: var(--text-muted); font-size: 0.92rem; line-height: 1.6; margin: 0 0 28px; }

.links-stack { display: flex; flex-direction: column; gap: 10px; }

.contact-link {
  display: flex;
  align-items: center;
  gap: 14px;
  color: white;
  text-decoration: none;
  padding: 14px 16px;
  background: rgba(255,255,255,0.03);
  border: 1px solid rgba(255,255,255,0.05);
  border-radius: 12px;
  transition: all 0.25s ease;
}
.contact-link:hover {
  background: rgba(0, 123, 255, 0.08);
  border-color: rgba(0, 123, 255, 0.25);
  transform: translateX(4px);
}

.icon-box {
  width: 42px; height: 42px;
  background: rgba(0, 123, 255, 0.15);
  border-radius: 10px;
  display: flex; align-items: center; justify-content: center;
  color: var(--primary);
  flex-shrink: 0;
  font-size: 1rem;
}
.icon-box.discord { background: rgba(88, 101, 242, 0.15); color: #5865F2; }
.icon-box.twitter { background: rgba(29, 155, 240, 0.15); color: #1D9BF0; }

.link-text { display: flex; flex-direction: column; gap: 2px; }
.link-title { font-size: 0.9rem; font-weight: 600; }
.link-sub { font-size: 0.78rem; color: var(--text-muted); }

.response-badge {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 24px;
  padding: 12px 16px;
  background: rgba(0, 123, 255, 0.06);
  border: 1px solid rgba(0, 123, 255, 0.15);
  border-radius: 10px;
  font-size: 0.82rem;
  color: var(--text-muted);
}
.response-badge i { color: var(--primary); font-size: 0.85rem; }
.response-badge strong { color: white; }

/* Contact Form */
.contact-form {
  background: var(--bg-card);
  border: var(--glass-border);
  padding: 40px;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  gap: 0;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

.form-group { margin-bottom: 22px; }
.form-group label {
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
  font-size: 0.85rem;
  color: #bbb;
  letter-spacing: 0.3px;
  text-transform: uppercase;
}

input, textarea, select {
  width: 100%;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: 13px 16px;
  border-radius: 10px;
  color: white;
  font-family: inherit;
  font-size: 0.95rem;
  transition: all 0.25s ease;
  box-sizing: border-box;
  appearance: none;
}

select {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%23888' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 14px center;
  padding-right: 40px;
  cursor: pointer;
}
select option { background: #1a1a2e; color: white; }

input::placeholder, textarea::placeholder { color: #555; }

input:focus, textarea:focus, select:focus {
  outline: none;
  border-color: var(--primary);
  background: rgba(0, 123, 255, 0.04);
  box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.12);
}

textarea { resize: vertical; min-height: 120px; }

.submit-btn {
  width: 100%;
  padding: 15px;
  background: var(--primary);
  color: white;
  border: none;
  border-radius: 10px;
  font-weight: 600;
  font-size: 1rem;
  font-family: inherit;
  cursor: pointer;
  transition: all 0.25s ease;
  letter-spacing: 0.3px;
}
.submit-btn:hover:not(:disabled) {
  background: var(--primary-hover);
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(0, 123, 255, 0.3);
}
.submit-btn:disabled { background: #2a2a2a; cursor: not-allowed; opacity: 0.6; }

.btn-inner { display: flex; align-items: center; justify-content: center; gap: 8px; }

.spinner {
  width: 16px; height: 16px;
  border: 2px solid rgba(255,255,255,0.3);
  border-top-color: white;
  border-radius: 50%;
  animation: spin 0.7s linear infinite;
  display: inline-block;
}
@keyframes spin { to { transform: rotate(360deg); } }

.error-msg {
  margin-top: 12px;
  color: #ff6b6b;
  font-size: 0.88rem;
  display: flex;
  align-items: center;
  gap: 6px;
}

/* Success State */
.success-state {
  background: var(--bg-card);
  border: var(--glass-border);
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 60px 40px;
  gap: 16px;
}

.success-icon {
  width: 70px; height: 70px;
  background: rgba(0, 200, 100, 0.12);
  border: 1px solid rgba(0, 200, 100, 0.3);
  border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  font-size: 1.8rem;
  color: #00c864;
  animation: popIn 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
}
@keyframes popIn { from { transform: scale(0); opacity: 0; } to { transform: scale(1); opacity: 1; } }

.success-state h2 { font-size: 1.8rem; margin: 0; }
.success-state p { color: var(--text-muted); margin: 0; }

.reset-btn {
  margin-top: 8px;
  padding: 10px 24px;
  background: transparent;
  border: 1px solid rgba(255,255,255,0.15);
  color: var(--text-muted);
  border-radius: 8px;
  font-family: inherit;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.25s;
}
.reset-btn:hover { border-color: var(--primary); color: white; }

@media (max-width: 900px) {
  .form-row { grid-template-columns: 1fr; }
}

@media (max-width: 768px) {
  .contact-grid { grid-template-columns: 1fr; }
  .contact-form { padding: 28px 22px; }
  .info-card { padding: 28px 22px; }
}
</style>
