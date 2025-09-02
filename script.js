// Toggle hamburger menu
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
  navLinks.classList.toggle('show');
});

// Modal handling
const contactBtns = document.querySelectorAll('#contactBtn, #stickyContactBtn');
const modal = document.getElementById('contactModal');
const closeModal = document.querySelector('.close');
const spinner = document.getElementById('spinner');
const form = document.getElementById('contactForm');

contactBtns.forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    modal.style.display = 'flex';
  });
});

closeModal.addEventListener('click', () => {
  modal.style.display = 'none';
});

window.addEventListener('click', (e) => {
  if (e.target === modal) {
    modal.style.display = 'none';
  }
});

// Form submission with spinner
form.addEventListener('submit', () => {
  spinner.style.display = 'block';
});
