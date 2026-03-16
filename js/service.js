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

    // ================= SCROLL REVEAL =================
const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      }
    });
  },
  { threshold: 0.2 }
);

document.querySelectorAll(".animate-on-scroll").forEach(el => {
  observer.observe(el);
});

// Footer year
document.getElementById("year").textContent = new Date().getFullYear();
// Scroll reveal animation
const serviceCards = document.querySelectorAll(".service-card");

const revealOnScroll = () => {
  serviceCards.forEach(card => {
    const top = card.getBoundingClientRect().top;
    if (top < window.innerHeight - 80) {
      card.classList.add("reveal");
    }
  });
};

window.addEventListener("scroll", revealOnScroll);
window.addEventListener("load", revealOnScroll);
window.addEventListener('scroll', () => {
  const section = document.querySelector('.animate-section');
  const sectionTop = section.getBoundingClientRect().top;
  const triggerPoint = window.innerHeight - 100;

  if(sectionTop < triggerPoint){
    section.classList.add('active');
  }
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



    const cards = document.querySelectorAll(".benefit-card");

    const observerbenefit = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Add delay one by one
                setTimeout(() => {
                    entry.target.classList.add("show");
                }, index * 200); // 200ms gap
                observerbenefit.unobserve(entry.target); // animate only once
            }
        });
    }, {
        threshold: 0.3
    });

    cards.forEach(card => observerbenefit.observe(card));


});



document.addEventListener("DOMContentLoaded", () => {
  const image = document.querySelector(".contact-cta-image img");

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        image.classList.add("show");

        // Start floating after slide animation
        setTimeout(() => {
          image.classList.add("float");
        }, 1200);

        observer.unobserve(image);
      }
    });
  }, { threshold: 0.3 });

  observer.observe(image);
});



/* NAVIGATE TO SOLUTIONS SCROLL ANIMATION */
const solSection = document.querySelector(".animate-solutions");

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      solSection.classList.add("solutions-visible");
    }
  });
}, { threshold: 0.25 });

observer.observe(solSection);


const cards = document.querySelectorAll('.industry-card');

const observerIndus = new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      entry.target.classList.add('show');
    }
  });
},{threshold:0.25});

cards.forEach(card=>observerIndus.observe(card));