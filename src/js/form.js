/**
 * Form Manager
 * Handles email waitlist form submission with Formspree
 */

class FormManager {
  constructor(formId) {
    this.form = document.getElementById(formId);
    if (!this.form) return;

    this.message = this.form.querySelector('.form-message');
    this.button = this.form.querySelector('button[type="submit"]');
    this.input = this.form.querySelector('input[type="email"]');
    this.actionUrl = this.form.getAttribute('action') || '';
    this.init();
  }

  init() {
    this.form.addEventListener('submit', (e) => this.handleSubmit(e));
  }

  async handleSubmit(e) {
    e.preventDefault();

    // Prevent confusing failures when Formspree is not configured
    if (!this.actionUrl || this.actionUrl.includes('YOUR_FORM_ID')) {
      this.showError(window.i18n?.t('formNotConfigured') || 'Form is not configured yet.');
      return;
    }

    // Basic email validation
    if (!this.input.validity.valid) {
      this.showError(window.i18n?.t('error') || 'Něco se nepovedlo. Zkuste to znovu.');
      return;
    }

    const formData = new FormData(this.form);
    this.setLoading(true);
    this.clearMessage();

    try {
      const response = await fetch(this.actionUrl, {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        this.showSuccess();
        this.form.reset();
      } else {
        let data = null;
        try {
          data = await response.json();
        } catch {
          data = null;
        }

        if (data?.errors) {
          this.showError(data.errors.map(error => error.message).join(', '));
          return;
        }

        this.showError(window.i18n?.t('error') || 'Něco se nepovedlo. Zkuste to znovu.');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      this.showError(window.i18n?.t('error') || 'Něco se nepovedlo. Zkuste to znovu.');
    } finally {
      this.setLoading(false);
    }
  }

  setLoading(loading) {
    this.button.disabled = loading;
    this.button.classList.toggle('loading', loading);
    this.input.disabled = loading;
  }

  showSuccess() {
    const message = window.i18n?.t('success') || 'Díky. Ozveme se, až bude čas.';
    this.message.textContent = message;
    this.message.className = 'form-message success';

    // Auto-hide after 5 seconds
    setTimeout(() => this.clearMessage(), 5000);
  }

  showError(errorMessage) {
    const message = errorMessage || window.i18n?.t('error') || 'Něco se nepovedlo. Zkuste to znovu.';
    this.message.textContent = message;
    this.message.className = 'form-message error';

    // Auto-hide after 5 seconds
    setTimeout(() => this.clearMessage(), 5000);
  }

  clearMessage() {
    if (this.message) {
      this.message.textContent = '';
      this.message.className = 'form-message';
    }
  }
}

// Initialize and make available globally
window.addEventListener('DOMContentLoaded', () => {
  window.formManager = new FormManager('waitlist-form');
});
