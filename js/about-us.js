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

});
