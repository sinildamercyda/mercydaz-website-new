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
     WHATSAPP CHAT WIDGET
  ========================== */
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
     ABOUT COMPANY ANIMATION
  ========================== */
  const aboutSection = document.querySelector(".about-company");

  const aboutObserver = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        aboutSection.classList.add("show");
        aboutObserver.unobserve(aboutSection); // animate once
      }
    },
    { threshold: 0.3 }
  );

  aboutObserver.observe(aboutSection);

  /* ==========================
     MISSION & VISION ANIMATION
  ========================== */
   const mvSection = document.querySelector(".mission-vision");

  const mvObserver = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        mvSection.classList.add("show");
        mvObserver.unobserve(mvSection);
      }
    },
    { threshold: 0.3 }
  );

  mvObserver.observe(mvSection);


     const coreValues = document.querySelector(".core-values");

  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        coreValues.classList.add("show");
        observer.unobserve(coreValues);
      }
    },
    { threshold: 0.3 }
  );

  observer.observe(coreValues);



  const mindSection = document.querySelector(".mind-success");
  const founderCard = document.querySelector(".founder-card");
  const storyPoints = document.querySelectorAll(".story-point");
  const points = document.querySelectorAll(".point");

  const mindobserver = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        mindSection.classList.add("show");

        founderCard.style.transitionDelay = "0.2s";
        storyPoints.forEach((p, i) => p.style.transitionDelay = `${0.3 + i*0.2}s`);
        points.forEach((p, i) => p.style.transitionDelay = `${0.5 + i*0.2}s`);

        mindobserver.unobserve(mindSection);
      }
    },
    { threshold: 0.3 }
  );

  mindobserver.observe(mindSection);




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



});
