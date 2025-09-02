// Modal logic
const modal = document.getElementById("contactModal");
const closeBtn = document.querySelector(".close");
const heroBtn = document.getElementById("openModalHero");
const stickyBtn = document.getElementById("openModalSticky");
const navBtn = document.getElementById("openModalNav");

[heroBtn, stickyBtn, navBtn].forEach(btn => {
  if (btn) {
    btn.onclick = e => {
      e.preventDefault();
      modal.style.display = "flex";
    };
  }
});

closeBtn.onclick = () => modal.style.display = "none";

window.onclick = e => {
  if (e.target === modal) modal.style.display = "none";
};

// Form handling
const form = document.getElementById("contactForm");
const spinner = document.getElementById("formSpinner");
const statusMsg = document.getElementById("formStatus");

if (form) {
  form.addEventListener("submit", async function(e) {
    e.preventDefault();
    spinner.classList.remove("hidden");
    statusMsg.textContent = "";

    const data = new FormData(form);
    try {
      const res = await fetch(form.action, {
        method: form.method,
        body: data,
        headers: { 'Accept': 'application/json' }
      });

      spinner.classList.add("hidden");

      if (res.ok) {
        statusMsg.textContent = "✅ Thanks! Your message has been sent.";
        form.reset();
      } else {
        statusMsg.textContent = "❌ Oops! Something went wrong.";
      }
    } catch (err) {
      spinner.classList.add("hidden");
      statusMsg.textContent = "❌ Network error. Try again later.";
    }
  });
}
