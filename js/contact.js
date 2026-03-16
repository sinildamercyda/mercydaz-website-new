document.addEventListener("DOMContentLoaded", function () {

    /* ==========================
       MOBILE MENU
    ========================== */
    const hamburger = document.getElementById('hamburgerBtn');
    const overlay = document.getElementById('mobileOverlay');

    function toggleMenu() {
        overlay.classList.toggle('active');
        document.body.style.overflow = overlay.classList.contains('active') ? 'hidden' : '';
    }

    hamburger.addEventListener('click', toggleMenu);
    overlay.addEventListener('click', toggleMenu);

    document.querySelectorAll('.mobile-overlay a').forEach(link => {
        link.addEventListener('click', () => {
            overlay.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
});



const waBtn = document.getElementById("waBtn");
  const chatWidget = document.getElementById("chatWidget");
  const closeChat = document.getElementById("closeChat");

  waBtn.addEventListener("click", () => {
    chatWidget.style.display = "block";
    waBtn.style.display = "none";
  });

  closeChat.addEventListener("click", () => {
    chatWidget.style.display = "none";
    waBtn.style.display = "flex";
  });


    document.querySelectorAll('.dropdown').forEach(dropdown => {
    dropdown.addEventListener('mouseenter', () => {
        const content = dropdown.querySelector('.dropdown-content');
        if (content) content.style.display = 'block';
    });

    dropdown.addEventListener('mouseleave', () => {
        const content = dropdown.querySelector('.dropdown-content');
        if (content) content.style.display = 'none';
    });
});

    document.querySelectorAll('.sub-dropbtn').forEach(btn => {
        btn.addEventListener('click', function (e) {
            e.preventDefault();

            const parent = this.parentElement;
            const submenu = parent.querySelector('.sub-dropdown-content');

            // close only sibling menus
            parent.parentElement.querySelectorAll(':scope > .sub-dropdown .sub-dropdown-content')
                .forEach(menu => {
                    if (menu !== submenu) menu.style.display = 'none';
                });

            submenu.style.display =
                submenu.style.display === 'block' ? 'none' : 'block';
        });
    });


document.querySelectorAll(".store-btn").forEach(btn => {

  btn.addEventListener("click", function(e) {

    e.stopPropagation();

    const parent = this.closest(".store-dropdown");

    document.querySelectorAll(".store-dropdown").forEach(drop => {
      if (drop !== parent) drop.classList.remove("active");
    });

    parent.classList.toggle("active");

  });

});

document.addEventListener("click", () => {
  document.querySelectorAll(".store-dropdown")
    .forEach(drop => drop.classList.remove("active"));
});







 function isMobile() {
  return window.innerWidth <= 991;
}

// MAIN DROPDOWN (Products / Solutions)
document.querySelectorAll(".mobile-dropbtn").forEach(btn => {
  btn.addEventListener("click", (e) => {
    if (!isMobile()) return;   // 🚫 desktop safety
    e.stopPropagation();
    btn.parentElement.classList.toggle("active");
  });
});

// SUB-DROPDOWN
document.querySelectorAll(".mobile-sub-dropbtn").forEach(btn => {
  btn.addEventListener("click", (e) => {
    if (!isMobile()) return;   // 🚫 desktop safety
    e.stopPropagation();
    btn.parentElement.classList.toggle("active");
  });
});




const form = document.getElementById("contactForm");
const successBox = document.getElementById("successMessage");

form.addEventListener("submit", function (e) {
    e.preventDefault();

    let isValid = true;

    // Inputs map
    const inputs = {
        name: document.getElementById("name"),
        email: document.getElementById("email"),
        phone: document.getElementById("phone"),
        date: document.getElementById("date"),
        message: document.getElementById("message")
    };

    const errors = {
        name: document.getElementById("nameError"),
        email: document.getElementById("emailError"),
        phone: document.getElementById("phoneError"),
        date: document.getElementById("dateError"),
        message: document.getElementById("messageError")
    };

    // Clear old errors
    Object.values(errors).forEach(el => el.textContent = "");

    /* -----------------------
       Name
    ----------------------- */
    if (inputs.name.value.trim().length < 3) {
        errors.name.textContent = "Name must be at least 3 characters.";
        isValid = false;
    }

    /* -----------------------
       Email
    ----------------------- */
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(inputs.email.value.trim())) {
        errors.email.textContent = "Please enter a valid email address.";
        isValid = false;
    }

    /* -----------------------
       Phone
    ----------------------- */
    const phonePattern = /^[0-9+\-\s()]{8,15}$/;
    if (!phonePattern.test(inputs.phone.value.trim())) {
        errors.phone.textContent = "Please enter a valid phone number.";
        isValid = false;
    }

    /* -----------------------
       Date (safe compare)
    ----------------------- */
    if (!inputs.date.value) {
        errors.date.textContent = "Please select a preferred date.";
        isValid = false;
    } else {
        const selected = new Date(inputs.date.value + "T00:00:00");
        const today = new Date();
        today.setHours(0,0,0,0);

        if (selected < today) {
            errors.date.textContent = "Date cannot be in the past.";
            isValid = false;
        }
    }

    /* -----------------------
       Message
    ----------------------- */
    if (inputs.message.value.trim().length < 10) {
        errors.message.textContent = "Message must be at least 10 characters.";
        isValid = false;
    }

    /* -----------------------
       Success
    ----------------------- */
    if (isValid) {
        successBox.classList.remove("hidden");

        form.reset();

        setTimeout(() => {
            successBox.classList.add("hidden");
        }, 4000);
    }
});


/* =================================
   BONUS: live validation (better UX)
================================= */

document.querySelectorAll("#contactForm input, #contactForm textarea")
.forEach(field => {
    field.addEventListener("input", () => {
        const err = document.getElementById(field.id + "Error");
        if (err) err.textContent = "";
    });
});