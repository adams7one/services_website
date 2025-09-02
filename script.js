// Run after DOM is parsed (we also used `defer` in the script tag)
(function () {
  // ===== Hamburger / Drawer =====
  const menuBtn = document.querySelector('.menu-toggle');
  const nav = document.getElementById('navMenu');

  if (menuBtn && nav) {
    menuBtn.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('show');
      menuBtn.setAttribute('aria-expanded', String(isOpen));
      nav.setAttribute('aria-hidden', String(!isOpen));
    });

    // Close drawer when clicking a link (optional)
    nav.addEventListener('click', (e) => {
      if (e.target.matches('a')) {
        nav.classList.remove('show');
        menuBtn.setAttribute('aria-expanded', 'false');
        nav.setAttribute('aria-hidden', 'true');
      }
    });

    // Click outside to close (mobile)
    document.addEventListener('click', (e) => {
      const clickedInside = nav.contains(e.target) || menuBtn.contains(e.target);
      if (!clickedInside && nav.classList.contains('show')) {
        nav.classList.remove('show');
        menuBtn.setAttribute('aria-expanded', 'false');
        nav.setAttribute('aria-hidden', 'true');
      }
    });
  }

  // ===== Modal =====
  const modal = document.getElementById('contactModal');
  const closeBtn = modal ? modal.querySelector('.close') : null;
  const openers = [
    document.getElementById('contactBtn'),
    document.getElementById('openModalHero'),
    document.getElementById('stickyContactBtn'),
  ].filter(Boolean);

  function openModal(e) {
    if (e) e.preventDefault();
    if (!modal) return;
    modal.classList.add('show');
  }
  function closeModal() {
    if (!modal) return;
    modal.classList.remove('show');
  }

  openers.forEach((el) => el.addEventListener('click', openModal));
  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });
  }

  // ===== Form (spinner + status) =====
  const form = document.getElementById('contactForm');
  if (form) {
    const btn = form.querySelector('button[type="submit"]');
    const btnText = btn ? btn.querySelector('.btn-text') : null;
    const status = document.getElementById('formStatus');

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      if (!btn || !btnText || !status) return;

      // Loading state
      btn.disabled = true;
      btnText.textContent = 'Sending…';

      try {
        const data = new FormData(form);
        const res = await fetch(form.action, {
          method: 'POST',
          body: data,
          headers: { Accept: 'application/json' },
        });

        if (res.ok) {
          status.textContent = '✅ Thanks! Your message has been sent.';
          form.reset();
        } else {
          status.textContent = '❌ Oops! Something went wrong. Please try again.';
        }
      } catch (err) {
        status.textContent = '❌ Network error. Please try again later.';
      } finally {
        btn.disabled = false;
        btnText.textContent = 'Send';
      }
    });
  }
})();
