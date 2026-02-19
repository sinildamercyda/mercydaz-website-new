// Lightweight hero interactions for telematics page
(function(){
  // Reveal animations using IntersectionObserver
  const observer = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        entry.target.classList.add('in-view');
      }
    });
  },{threshold:0.12});

  document.querySelectorAll('.animate-fade-in-up').forEach(el=>{
    observer.observe(el);
    // allow CSS animation-delay inline styles to work by adding class slightly later
    el.addEventListener('animationend',()=>el.classList.add('animated'));
  });

  // Observe major sections to create a slow, full-section reveal while scrolling
  const sectionObserver = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        entry.target.classList.add('in-view');
      }
    });
  }, { threshold: 0.14, rootMargin: '0px 0px -8% 0px' });

  document.querySelectorAll('section').forEach(sec=>{
    // skip small utility sections or ones that shouldn't animate
    if(sec.classList.contains('no-reveal') || sec.classList.contains('main-header')) return;
    sectionObserver.observe(sec);
  });

  // Simple parallax for the device mock on mouse move
  const device = document.querySelector('.device-mock');
  if(device){
    const img = device.querySelector('img');
    const badges = device.querySelectorAll('.floating-badge');
    device.addEventListener('mousemove', (e)=>{
      const r = device.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      const tx = px * 12; const ty = py * 10;
      img.style.transform = `translate3d(${tx}px, ${ty}px, 0) scale(1.01)`;
      badges.forEach((b, i)=>{
        const factor = (i+1) * 6;
        b.style.transform = `translate3d(${tx/factor}px, ${-ty/factor}px, 0)`;
      });
    });
    device.addEventListener('mouseleave', ()=>{
      img.style.transform='translate3d(0,0,0) scale(1)';
      badges.forEach(b=> b.style.transform='translate3d(0,0,0)');
    });
  }

  // Smooth in-page navigation that accounts for a fixed header
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click', function(evt){
      const href = this.getAttribute('href');
      if(!href || href === '#') return;
      const target = document.querySelector(href);
      if(!target) return; // let browser handle it if no target
      evt.preventDefault();

      // compute header offset (handle responsive header height)
      const header = document.querySelector('.main-header');
      const headerHeight = header ? Math.ceil(header.getBoundingClientRect().height) : 0;
      const extraGap = 12; // breathing room
      const top = Math.max(0, target.getBoundingClientRect().top + window.pageYOffset - headerHeight - extraGap);

      window.scrollTo({ top, behavior: 'smooth' });

      // update URL hash without jumping
      try{ history.pushState(null, '', href); }catch(e){}

      // for accessibility, focus the element after scrolling
      target.setAttribute('tabindex', '-1');
      target.focus({ preventScroll: true });
    });
  });

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



     document.getElementById('year').textContent = new Date().getFullYear();
        
        // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });


        document.addEventListener('DOMContentLoaded', () => {

  const observerOptions = {
    root: null,
    threshold: 0.15
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate');
        observer.unobserve(entry.target); // animate once
      }
    });
  }, observerOptions);

  /* Animate header */
  const headerEls = document.querySelectorAll(
    '.navigation-header h2, .navigation-header p'
  );

  headerEls.forEach((el, i) => {
    el.style.transitionDelay = `${i * 0.15}s`;
    observer.observe(el);
  });

  /* Animate cards with stagger */
  const cards = document.querySelectorAll('.nav-card');
  cards.forEach((card, i) => {
    card.style.transitionDelay = `${0.3 + i * 0.12}s`;
    observer.observe(card);
  });

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


  const reveals = document.querySelectorAll(".reveal");

  function revealOnScroll() {
    reveals.forEach(el => {
      const windowHeight = window.innerHeight;
      const elementTop = el.getBoundingClientRect().top;
      const revealPoint = 120;

      if (elementTop < windowHeight - revealPoint) {
        el.classList.add("active");
      }
    });
  }

  window.addEventListener("scroll", revealOnScroll);
  revealOnScroll(); // trigger on load



  const featureSections = document.querySelectorAll(".features-section");

  function revealSection(section) {
    section.classList.add("animate");
  }

  const observerfeature = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        revealSection(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.05,
    rootMargin: "0px 0px -100px 0px"
  });

  featureSections.forEach(section => {
    observerfeature.observe(section);

    /* 👇 Mobile Fix: force check immediately */
    if (section.getBoundingClientRect().top < window.innerHeight) {
      revealSection(section);
    }
  });


})();



