// ✅ GLOBAL (VERY IMPORTANT)
function openCatalogueForm() {
  document.getElementById("catalogueModal").classList.add("active");
}

function closeCatalogueForm() {
  document.getElementById("catalogueModal").classList.remove("active");
}

// ✅ CHANGE THIS to wherever your Spring Boot backend is hosted
const API_BASE_URL = "https://mercydapro.mercydatrack.com/ticketportal";

document.addEventListener("DOMContentLoaded", function () {

  // ✅ FORM SUBMIT
  const form = document.getElementById("catalogueForm");

  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      const emailInput = document.getElementById("userEmail");
      const email = emailInput.value.trim();

      if (!email) {
        alert("❌ Please enter email");
        return;
      }

      const submitBtn = form.querySelector("button[type='submit']");
      if (submitBtn) submitBtn.disabled = true;

      fetch(`${API_BASE_URL}/queries/catalogue?mail=${encodeURIComponent(email)}`, {
        method: "POST"
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Request failed with status " + response.status);
          }
          return response.json();
        })
        .then(() => {
          alert("✅ Catalogue sent to your email!");
          closeCatalogueForm();
          form.reset();
        })
        .catch((error) => {
          console.error("Catalogue request error:", error);
          alert("❌ Failed to send email. Try again!");
        })
        .finally(() => {
          if (submitBtn) submitBtn.disabled = false;
        });
    });
  }

});