document.addEventListener("DOMContentLoaded", () => {
  // Burger menu
  const menuToggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");

  menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("show");
  });

  // Modal logic
  const modal = document.querySelector("#contactModal");
  const closeModal = document.querySelector(".modal .close");

  // Multiple contact buttons (nav, hero, sticky)
  const contactButtons = [
    document.querySelector("#contactBtn"),
    document.querySelector("#contactBtnHero"),
    document.querySelector("#contactBtnSticky")
  ].filter(Boolean);

  contactButtons.forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      modal.style.display = "flex";
    });
  });

  closeModal.addEventListener("click", () => {
    modal.style.display = "none";
  });

  window.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.style.display = "none";
    }
  });
});
