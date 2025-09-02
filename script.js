document.addEventListener("DOMContentLoaded", () => {
  // ===== Hamburger menu toggle =====
  const hamburger = document.querySelector(".hamburger");
  const navLinks = document.querySelector(".nav-links");

  hamburger.addEventListener("click", () => {
    navLinks.classList.toggle("active");
    hamburger.classList.toggle("active");
  });

  // ===== Modal handling =====
  const modal = document.getElementById("contactModal");
  const openModalBtns = document.querySelectorAll(".open-modal");
  const closeModalBtn = document.querySelector(".close");

  openModalBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      modal.style.display = "block";
    });
  });

  closeModalBtn.addEventListener("click", () => {
    modal.style.display = "none";
  });

  window.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.style.display = "none";
    }
  });
});
