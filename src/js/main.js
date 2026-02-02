/**
 * Main Application
 * Coordinates all modules and handles initialization
 */

(function() {
  'use strict';

  /**
   * Application initialization
   */
  function init() {
    // All modules are initialized in their respective files via DOMContentLoaded
    // This file serves as a coordination point for any cross-module communication

    // Smooth scroll polyfill for older browsers
    initSmoothScroll();
  }

  /**
   * Initialize smooth scrolling
   */
  function initSmoothScroll() {
    // Modern browsers support this via CSS (scroll-behavior: smooth)
    // This is a fallback for older browsers
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#') return;

        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    });
  }

  /**
   * Error handler
   */
  window.addEventListener('error', (e) => {
    console.error('Global error:', e.error);
    // In production, send to error tracking service
  });

  /**
   * Unhandled promise rejection handler
   */
  window.addEventListener('unhandledrejection', (e) => {
    console.error('Unhandled promise rejection:', e.reason);
    // In production, send to error tracking service
  });

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
