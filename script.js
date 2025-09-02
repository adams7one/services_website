// scripts.js

(function () {
  function ready(fn) {
    if (document.readyState !== 'loading') fn();
    else document.addEventListener('DOMContentLoaded', fn);
  }

  ready(() => {
    console.log('scripts.js loaded');

    const modal = document.getElementById('contactModal');
    const closeModalBtn = document.querySelector('.close');
    const navLinks = document.querySelector('.nav-links');
    const hamburger = document.querySelector('.hamburger');

    // ===== Mobile Menu Toggle =====
    if (hamburger && navLinks) {
      hamburger.setAttribute('aria-expanded', 'false');
      hamburger.addEventListener('click', () => {
        const open = navLinks.classList.toggle('show');
        hamburger.setAttribute('aria-expanded', open ? 'true' : 'false');
      });
    }

    // ===== Open modal via delegation (covers sticky + any .open-modal) =====
    document.addEventListener('click', (e) => {
      const openBtn = e.target.closest('.open-modal');
      if (openBtn && modal) {
        modal.style.display = 'flex';
      }
    });

    // ===== Close modal =====
    if (closeModalBtn && modal) {
      closeModalBtn.addEventListener('click', () => {
        modal.style.display = 'none';
      });
    }

    // Click outside closes
    window.addEventListener('click', (e) => {
      if (e.target === modal) modal.style.display = 'none';
    });

    // Esc closes
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal && modal.style.display !== 'none') {
        modal.style.display = 'none';
      }
    });

    // ===== Spinner on submit =====
    const contactForm = document.getElementById('contactForm');
    const spinner = document.querySelector('.spinner');
    if (contactForm && spinner) {
      contactForm.addEventListener('submit', () => {
        spinner.style.display = 'block';
      });
    }
  });
})();
