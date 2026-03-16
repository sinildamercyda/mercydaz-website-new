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

const timeline = document.querySelector(".animate-timeline");

const timelineObserver = new IntersectionObserver(
  ([entry]) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("in-view");
      timelineObserver.unobserve(entry.target);
    }
  },
  { threshold: 0.3 }
);

if (timeline) timelineObserver.observe(timeline);




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




const animatedItems = document.querySelectorAll(".animate");

function splitLines(element) {
  const paragraph = element.querySelector("p");
  if (!paragraph || paragraph.dataset.split) return;

  paragraph.dataset.split = "true";

  const words = paragraph.innerHTML.split(" ");
  paragraph.innerHTML = "";

  let delay = 0;

  words.forEach(word => {
    const span = document.createElement("span");
    span.className = "line";
    span.innerHTML = word + " ";
    span.style.animationDelay = `${delay}s`;
    paragraph.appendChild(span);
    delay += 0.12;   // control speed here
  });
}

const mindobserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");

      // ✅ Animate text line-by-line only for story points
      if (entry.target.classList.contains("story-point")) {
        splitLines(entry.target);
      }

      mindobserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.2
});

animatedItems.forEach(item => mindobserver.observe(item));





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



});
