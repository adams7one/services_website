document.addEventListener("DOMContentLoaded", () => {
  // ====== Elements ======
  const hamburger = document.querySelector(".hamburger");
  const navLinks = document.querySelector(".nav-links");

  // Contact modal
  const contactModal = document.getElementById("contactModal");
  const closeContactBtn = contactModal ? contactModal.querySelector(".close") : null;
  const contactForm = document.getElementById("contactForm");

  // Audit modal
  const auditModal = document.getElementById("auditModal");
  const closeAuditBtn = auditModal ? auditModal.querySelector(".close") : null;
  const auditForm = document.getElementById("auditForm");

  // ====== Mobile nav toggle ======
  if (hamburger && navLinks) {
    hamburger.addEventListener("click", () => {
      navLinks.classList.toggle("active");
      hamburger.classList.toggle("active");
    });

    navLinks.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", (e) => {
        const isContact = link.classList.contains("open-modal");
        const isAudit = link.classList.contains("open-audit");

        if (isContact) {
          e.preventDefault();
          openModal(contactModal);
        }
        if (isAudit) {
          e.preventDefault();
          openModal(auditModal);
        }

        navLinks.classList.remove("active");
        hamburger.classList.remove("active");
      });
    });
  }

  // ====== Open modal triggers ======
  document.querySelectorAll(".open-modal").forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      openModal(contactModal);
    });
  });

  document.querySelectorAll(".open-audit").forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      openModal(auditModal);
    });
  });

  // ====== Close buttons ======
  if (closeContactBtn) closeContactBtn.addEventListener("click", () => closeModal(contactModal));
  if (closeAuditBtn) closeAuditBtn.addEventListener("click", () => closeModal(auditModal));

  // ====== Global close controls ======
  window.addEventListener("click", (e) => {
    if (e.target === contactModal) closeModal(contactModal);
    if (e.target === auditModal) closeModal(auditModal);
  });

  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeModal(contactModal);
      closeModal(auditModal);
    }
  });

  // ====== Helpers ======
  function openModal(modal) {
    if (!modal) return;
    modal.style.display = "flex";
    document.body.style.overflow = "hidden";
  }

  function closeModal(modal) {
    if (!modal) return;
    modal.style.display = "none";
    document.body.style.overflow = "";
  }

  // ====== Setup forms (Contact + Audit) ======
  if (contactForm) setupForm(contactForm, contactModal, {
    successTitle: "Thanks!",
    successMsg: "I’ve received your message and will be in touch as soon as I can."
  });

  if (auditForm) setupForm(auditForm, auditModal, {
    successTitle: "Request Received!",
    successMsg: "I’ll review your website and get back to you soon with your free audit."
  });

  // ====== Form handler ======
  function setupForm(form, modal, { successTitle, successMsg }) {
    const spinner = form.querySelector(".spinner");
    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      spinner.style.display = "block";

      try {
        const response = await fetch(form.action, {
          method: "POST",
          body: new FormData(form),
          headers: { Accept: "application/json" },
        });

        spinner.style.display = "none";

        if (response.ok) {
          // Hide header + form
          const modalContent = modal.querySelector(".modal-content");
          const modalHeader = modalContent.querySelector("h2");
          form.style.display = "none";
          if (modalHeader) modalHeader.style.display = "none";

          // Show confirmation takeover
          const confirmation = document.createElement("div");
          confirmation.className = "confirmation-message";
          confirmation.innerHTML = `
            <div class="checkmark">✔</div>
            <h3>${successTitle}</h3>
            <p>${successMsg}</p>
          `;
          modalContent.appendChild(confirmation);

          // Auto-close modal
          setTimeout(() => {
            confirmation.remove();
            if (modalHeader) modalHeader.style.display = "block";
            form.style.display = "block";
            form.reset();
            closeModal(modal);
          }, 4000);
        } else {
          alert("❌ Oops, something went wrong. Please try again.");
        }
      } catch (err) {
        spinner.style.display = "none";
        alert("⚠️ Network error. Please try later.");
      }
    });
  }
});
