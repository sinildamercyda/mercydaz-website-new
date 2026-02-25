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

    /* ==========================
       INTERSECTION OBSERVER  
       (Works for all scroll animations)
    ========================== */

  
  const observerOptions = {
    root: null,
    threshold: 0.1,
    rootMargin: "-150px 0px" // keeps animations from firing immediately on load
  };

  const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const el = entry.target;

      if (entry.isIntersecting) {
        // Element entered viewport → add classes to animate
        el.classList.add("in-view");
        el.classList.add("active");

        // If it's a stagger container, add class to children as well
        if (el.classList.contains("animate-stagger")) {
          el.classList.add("in-view");
        }

      } else {
        // Element left viewport → remove classes so animation can re-run on re-entry
        el.classList.remove("in-view");
        el.classList.remove("active");

        if (el.classList.contains("animate-stagger")) {
          el.classList.remove("in-view");
        }
      }
    });
  }, observerOptions);

  // Observe targets
  document.querySelectorAll(".animate-on-scroll").forEach(el => scrollObserver.observe(el));
  document.querySelectorAll(".animate-stagger").forEach(el => scrollObserver.observe(el));
  document.querySelectorAll(".feature-box").forEach(el => scrollObserver.observe(el));


  const animatedItems = document.querySelectorAll('.animate-left, .animate-right');

  const observertracking = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
      }
    });
  }, { threshold: 0.3 });

  animatedItems.forEach(item => observertracking.observe(item));


/* ==========================
   WORD BY WORD TEXT REVEAL
========================== */

const revealTexts = document.querySelectorAll(".reveal-text");

revealTexts.forEach(el => {
  const words = el.innerHTML.split(/(\s+)/);
  el.innerHTML = words.map(word => {
    if (word.trim() === "") return word;
    return `<span class="word">${word}</span>`;
  }).join("");
});

/* Observe reveal text */
const textRevealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const spans = entry.target.querySelectorAll(".word");

      spans.forEach((span, index) => {
        span.style.animationDelay = `${index * 0.035}s`;
      });

      entry.target.classList.add("active");
      textRevealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

revealTexts.forEach(el => textRevealObserver.observe(el));



  const items = document.querySelectorAll('.service-item');

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("show");
        } else {
            entry.target.classList.remove("show");
        }
    });
}, { threshold: 0.3 });

items.forEach(item => observer.observe(item));



  
    /* ==========================
       COUNTER ANIMATION ON SCROLL
    ========================== */

    const statBoxes = document.querySelectorAll(".stat-box");

    function startCount(counter) {
        const target = +counter.getAttribute("data-target");
        let current = 0;
        const increment = Math.ceil(target / 150);

        function update() {
            current += increment;
            if (current >= target) {
                counter.textContent = target;
            } else {
                counter.textContent = current;
                requestAnimationFrame(update);
            }
        }

        update();
    }

    const counterObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target.querySelector(".count");
                if (counter) startCount(counter);
                observer.unobserve(entry.target); // run only once
            }
        });
    }, {
        root: null,
        threshold: 0.5 // triggers when 50% of stat-box is visible
    });

    statBoxes.forEach(box => counterObserver.observe(box));


  const featureObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Element entered viewport → animate
            entry.target.classList.add("reveal");
        } else {
            // Element left viewport → remove animation class
            entry.target.classList.remove("reveal");
        }
    });
}, { threshold: 0.2 });


document.querySelectorAll('.feature-item, .features-center img')
    .forEach(el => featureObserver.observe(el));


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



/* ==========================
   COOKIE CONSENT
========================== */

 const cookieBanner = document.getElementById("cookie-banner");
  const cookieOverlay = document.getElementById("cookie-overlay");
  const acceptBtn = document.getElementById("accept-cookies");
  const rejectBtn = document.getElementById("reject-cookies");

  const consent = localStorage.getItem("cookieConsent");

  if (consent === "accepted") {
    document.body.style.overflow = "auto";
  } else {
    cookieBanner.style.display = "block";
    cookieOverlay.style.display = "block";
    document.body.style.overflow = "hidden";
  }

  acceptBtn.addEventListener("click", () => {
    localStorage.setItem("cookieConsent", "accepted");
    cookieBanner.style.display = "none";
    cookieOverlay.style.display = "none";
    document.body.style.overflow = "auto";
  });

  rejectBtn.addEventListener("click", () => {
    localStorage.setItem("cookieConsent", "rejected");
    alert("You must accept cookies to use this website.");
  });

//localStorage.removeItem("cookieConsent");
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

    document.querySelectorAll('.sub-dropdown').forEach(sub => {
        const btn = sub.querySelector('.sub-dropbtn');
        const content = sub.querySelector('.sub-dropdown-content');

        if (btn && content) {
            btn.addEventListener('click', e => {
                e.preventDefault();
                document.querySelectorAll('.sub-dropdown-content')
                    .forEach(c => c.style.display = 'none');
                content.style.display =
                    content.style.display === 'block' ? 'none' : 'block';
            });
        }
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




const swiper = new Swiper('.testimonial-swiper', {
    loop: true,
    spaceBetween: 20,
    autoplay: {
        delay: 4000,
        disableOnInteraction: false,
    },
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },

    // ONLY here
    breakpoints: {
        0: {
            slidesPerView: 1,
            spaceBetween: 15
        },
        768: {
            slidesPerView: 2,
            spaceBetween: 25
        },
        1024: {
            slidesPerView: 3,
            spaceBetween: 30
        }
    }
});





});


document.addEventListener("DOMContentLoaded", () => {
    const items = document.querySelectorAll(".leader-item");

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("active");
                observer.unobserve(entry.target); // animate once
            }
        });
    }, {
        threshold: 0.2
    });

    items.forEach(item => observer.observe(item));
});

document.addEventListener("DOMContentLoaded", () => {
  const logos = document.querySelectorAll(".partner-logo");

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("reveal");
      }
    });
  }, { threshold: 0.2 });

  logos.forEach(logo => observer.observe(logo));
});



/* ===== Solutions cards reveal animation ===== */

const solutionCards = document.querySelectorAll(".solution-card");

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
    }
  });
}, {
  threshold: 0.2
});

solutionCards.forEach(card => observer.observe(card));


