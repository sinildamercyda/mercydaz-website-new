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
  const whatWeDo = document.querySelector(".what-we-do");
  if (whatWeDo) scrollObserver.observe(whatWeDo);



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

const video = document.getElementById('routeVideo');
  const controlBtn = document.getElementById('videoControl');
  const icon = controlBtn.querySelector('i');

  // Single click handler to toggle play/pause
  controlBtn.addEventListener('click', () => {
    if (video.paused) {
      video.play();
      icon.classList.remove('fa-play');
      icon.classList.add('fa-pause');
      controlBtn.style.opacity = 0; // hide button after play
    } else {
      video.pause();
      icon.classList.remove('fa-pause');
      icon.classList.add('fa-play');
      controlBtn.style.opacity = 1; // show play button again
    }
  });

  // Show pause button on hover if video is playing
  video.parentElement.addEventListener('mouseenter', () => {
    if (!video.paused) {
      controlBtn.style.opacity = 1;
      icon.classList.remove('fa-play');
      icon.classList.add('fa-pause');
    }
  });

  video.parentElement.addEventListener('mouseleave', () => {
    if (!video.paused) {
      controlBtn.style.opacity = 0;
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

});


