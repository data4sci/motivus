/**
 * Animations Manager
 * Handles scroll-based fade-in animations
 */

class AnimationsManager {
  constructor() {
    this.observers = new Map();
    this.init();
  }

  init() {
    // Respect prefers-reduced-motion
    if (Utils.prefersReducedMotion()) {
      // Add 'visible' class immediately to all fade-in elements
      document.querySelectorAll('.fade-in').forEach(el => {
        el.classList.add('visible');
      });
      return;
    }

    // Check for IntersectionObserver support
    if (!Utils.supportsIntersectionObserver()) {
      // Fallback: show all elements immediately
      document.querySelectorAll('.fade-in').forEach(el => {
        el.classList.add('visible');
      });
      return;
    }

    // Setup scroll-based fade-in
    this.setupFadeIn();
  }

  setupFadeIn() {
    const elements = document.querySelectorAll('.fade-in');

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.2,
      rootMargin: '0px 0px -100px 0px'
    });

    elements.forEach(el => observer.observe(el));
    this.observers.set('fadeIn', observer);
  }

  // Cleanup method if needed
  destroy() {
    this.observers.forEach(observer => observer.disconnect());
    this.observers.clear();
  }
}

// Initialize and make available globally
window.addEventListener('DOMContentLoaded', () => {
  window.animationsManager = new AnimationsManager();
});
