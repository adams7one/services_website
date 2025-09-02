// Toggle mobile menu
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (menuToggle) {
  menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('show');
  });
}

// Modal logic
const modal = document.getElementById('contactModal');
const openModalBtns = document.querySelectorAll('.open-modal');
const closeModalBtn = document.querySelector('.close');

openModalBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    modal.style.display = 'flex';
  });
});

if (closeModalBtn) {
  closeModalBtn.addEventListener('click', () => {
    modal.style.display = 'none';
  });
}

window.addEventListener('click', e => {
  if (e.target === modal) {
    modal.style.display = 'none';
  }
});

// Form handling with spinner
const contactForm = document.getElementById('contactForm');
const spinner = document.querySelector('.spinner');

if (contactForm) {
  contactForm.addEventListener('submit', function (e) {
    spinner.style.display = 'block';
  });
}

const stickyBtn = document.getElementById('contactBtnSticky');

if (stickyBtn) {
  stickyBtn.addEventListener('click', () => {
    modal.style.display = 'flex';
  });
}
