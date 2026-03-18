
// ✅ GLOBAL (VERY IMPORTANT)
function openCatalogueForm() {
  document.getElementById("catalogueModal").classList.add("active");
}

function closeCatalogueForm() {
  document.getElementById("catalogueModal").classList.remove("active");
}


document.addEventListener("DOMContentLoaded", function () {

  // ✅ INIT EMAILJS
  emailjs.init("ipOHikyHTtKE4KpXW");

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

      emailjs.send("service_7hn507l", "template_k6wll2a", {
        user_email: email
      })
      .then(() => {
        alert("✅ Catalogue sent to your email!");
        closeCatalogueForm();
        form.reset();
      })
      .catch((error) => {
        console.error("EmailJS Error:", error);
        alert("❌ Failed to send email. Try again!");
      });
    });
  }

});