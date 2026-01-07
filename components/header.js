document.addEventListener("DOMContentLoaded", () => {
  fetch("/components/header.html")
    .then(res => res.text())
    .then(html => {
      document.getElementById("header-placeholder").innerHTML = html;
      initHeader(); // 🔥 IMPORTANT
    });
});

function initHeader() {

  const hamburger = document.getElementById("hamburgerBtn");
  const overlay = document.getElementById("mobileOverlay");

  if (hamburger && overlay) {
    hamburger.addEventListener("click", () => {
      overlay.classList.toggle("active");
      document.body.style.overflow =
        overlay.classList.contains("active") ? "hidden" : "";
    });

    overlay.addEventListener("click", e => {
      if (e.target === overlay) {
        overlay.classList.remove("active");
        document.body.style.overflow = "";
      }
    });
  }

  // Desktop dropdown hover
  document.querySelectorAll(".dropdown").forEach(dropdown => {
    dropdown.addEventListener("mouseenter", () => {
      dropdown.querySelector(".dropdown-content")?.classList.add("show");
    });
    dropdown.addEventListener("mouseleave", () => {
      dropdown.querySelector(".dropdown-content")?.classList.remove("show");
    });
  });

  // Mobile dropdowns
  document.querySelectorAll(".mobile-dropbtn").forEach(btn => {
    btn.addEventListener("click", e => {
      e.stopPropagation();
      btn.parentElement.classList.toggle("active");
    });
  });
}
