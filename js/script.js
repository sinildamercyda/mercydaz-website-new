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
// document.querySelectorAll('.dropdown').forEach(dropdown => {
//         dropdown.addEventListener('mouseenter', () => {
//             const content = dropdown.querySelector('.dropdown-content');
//             if (content) content.style.display = 'block';
//         });

//         dropdown.addEventListener('mouseleave', () => {
//             const content = dropdown.querySelector('.dropdown-content');
//             if (content) content.style.display = 'none';
//         });
//     });

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

document.addEventListener("DOMContentLoaded", function () {

  const faqBtn = document.getElementById("faqBtn");
  const faqModal = document.getElementById("faqModal");
  const closeFaq = document.getElementById("closeFaq");

  const chatMessages = document.getElementById("chatMessages");
  const chatOptions = document.getElementById("chatOptions");

  // OPEN / CLOSE
  faqBtn.onclick = () => faqModal.style.display = "block";
  closeFaq.onclick = () => faqModal.style.display = "none";

  // FAQ DATA
 const faqData = {

general: [
  { q: "Is it mandatory to install a GPS device in cars?", a: "It depends on your region and vehicle type. In many regions, it is mandatory for commercial vehicles as per transport regulations." },
  { q: "Do I need internet to use the GPS tracking system?", a: "Yes. A stable internet connection is required to view live location and reports through the app." },
  { q: "How can I track my vehicle in real time?", a: "Log in to the MERCYDA'Z app and select your vehicle to view its live location on the map." },
  { q: "Can I monitor multiple vehicles at once using a single account?", a: "Yes. You can track multiple vehicles if they are registered under the same account." },
  { q: "How do I connect my GPS device to the MERCYDA'Z mobile app?", a: "Download the app, log in with your credentials, and your registered devices will appear automatically." },
  {
    q: "What should I do if my GPS device is not showing the correct location?",
    a: `Check if the device has power, GPS signal, and mobile network coverage. Restart if needed.<br>
  Contact support if the issue continues.`
  },
  { q: "How can I reset or restart my GPS device?", a: "Most devices have a reset button. Refer to the manual or contact support." },
  { q: "Who can access my GPS data?", a: "Only you and authorized users with your login credentials." },
  { q: "What happens to my data if I uninstall the app?", a: "Your data stays on our servers. Reinstall the app and log in to access it again." },
  { q: "Does the GPS device work when the vehicle is off?", a: "Yes, if it is connected to a constant power source. Otherwise, tracking pauses." },
  { q: "Does it work in rural or remote areas?", a: "Yes, as long as GPS satellite and mobile network coverage are available." },
  { q: "What happens if there's no internet or GPS signal?", a: "The device stores data and sends it once the connection is restored." },
  { q: "Can the same device be transferred to another vehicle?", a: "Yes, but reinstallation and configuration are required." },
  { q: "Does the GPS device affect the vehicle's battery?", a: "No, it consumes minimal power and has negligible effect." },
  { q: "How accurate is the location tracking in the application?", a: "Accuracy depends on GPS and network quality; usually within 100–500 meters." },
  { q: "How effective is the route optimization in the app?", a: "The app provides efficient route mapping and trip playback for better travel planning." },
  { q: "How easy is it to monitor all vehicles/assets in real time?", a: "Very easy. The dashboard gives a live view of all linked vehicles with alerts." }

],

  login: [
    { q: "I forgot my password. How can I reset it?", a: "Use the “Forgot Password” option on the login screen." },
    { q: "How can I change my phone number or email address?", a: "Contact customer support." },
    { q: "Can I log in from multiple devices?", a: "Yes, you can use your credentials on multiple devices." },
    { q: "How can I log out of the app?", a: "Use the logout option at the top right corner." },
  ],

  reports: [
    { q: "Can I view past trips or route history?", a: "Export from the Reports tab in Excel or PDF." },
    { q: "How can I download or export route history or reports?", a: "Vehicle is ON but not moving." },
    { q: "How do I take daily or monthly reports?", a: "Choose the vehicle and date range in the Reports section, then select the type." },
    { q: "How do I get trip or fuel reports?", a: "Trip reports are available in the app. Fuel reports depend on device compatibility." },
    { q: "How many days of history or reports are stored in the app?", a: "Up to 90 days, depending on your plan." },
    { q: "Can I set up a notification when the vehicle enters a specific area (Geo-fence)?", a: "Yes, if your device supports it. Contact support for setup." },
    { q: "How do I receive alerts or notifications?", a: "Enable notifications in the app and your phone settings." },
    { q: "What all alerts will be shown in the app?", a: "Alerts include over-speeding, idling, ignition on/off, power disconnect, and more." },
    { q: "How do I set up speed alerts or due dates?", a: "Contact customer support." },
    { q: "Can I get reports for distance, over-speed, ignition, SOS, etc.?", a: "Yes, depending on device features." },
    { q: "What does the word \"Idle\" indicate in the app?", a: "It means the vehicle is on but not moving." }
  ],

  subscription: [
    { q: "How can I renew or recharge my GPS service?", a: "You can recharge via the app, website, or by contacting support." },
    { q: "Can I renew from the app itself?", a: "Yes, through the recharge option under your device info." },
    { q: "Is there a monthly or yearly subscription?", a: `Yes. Yearly plans are most common. Monthly is available if required, usually for compliance<br>
          with government expiry dates.` },
    { q: "What are the available service plans?", a: "They vary by duration and features. Check in the app or contact support." },
    { q: "Will expired recharges be shown in the app?", a: "Yes, your subscription status is displayed." },
    { q: "How do I check recharge validity?", a: "Check the device info or subscription section in the app." },
  ],

  app: [
    { q: "What should I do if tracking is not showing in the app?", a: "Ensure the device has power and signal. Restart it. Contact support if the issue persists." },
    { q: "Why is the location showing incorrectly or delayed?", a: "Likely due to poor GPS or mobile signal. Move the vehicle to an open area." },
    { q: "Is the location shown in the app real-time?", a: "Yes, updated every few seconds depending on plan and signal." },
    { q: "How do I select a specific vehicle when taking reports?", a: "Go to Reports, select the vehicle, and choose report type." },
    { q: "How are alerts displayed in the app?", a: "As push notifications and inside the alerts section." },
    { q: "Is there a demo video for using the app?", a: "Yes, available through customer support." },
    { q: "What is \"Play Back\" and why is it not working?", a: `Playback shows past trip movement. If it doesn’t work, check if data exists for the selected<br>
          period.` },
    { q: "How can I enable notifications if I’m not receiving them?", a: "Check both app and phone notification settings and grant permission." },     

  ],

  support: [
    { q: "How do I contact customer support?", a: "Call, email, or use the support option in the app." },
    { q: "How do I contact customer support through the app?", a: "Go to the Help/Support section and choose your preferred contact method." },
    { q: "How do you rate the real-time tracking feature?", a: "It is highly rated for accuracy and speed." },
    { q: "What type of activities do users typically use the GPS app for?", a: "Fleet tracking, personal vehicle monitoring, school transport, delivery, and logistics." },
  ]

};

  // MESSAGE FUNCTIONS
  function addUserMessage(text) {
    const msg = document.createElement("div");
    msg.className = "user-msg";
    msg.innerText = text;
    chatMessages.appendChild(msg);
  }

  function addBotMessage(text) {
    const msg = document.createElement("div");
    msg.className = "bot-msg";
    msg.innerHTML = text;
    chatMessages.appendChild(msg);
  }

  function scrollChat() {
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  // SHOW CATEGORIES
function showCategories() {
  chatOptions.innerHTML = `
    <button data-category="general">📍 General GPS Usage</button>
    <button data-category="login">🔐 Login & Account</button>
    <button data-category="reports">📊 Reports & Alerts</button>
    <button data-category="subscription">💳 Subscription</button>
    <button data-category="app">⚙️ App Issues</button>
    <button data-category="support">📩 Support</button>
  `;
}

  // SHOW QUESTIONS (WITH SHOW MORE)
  function showQuestions(category) {

    let visibleCount = 5;
    const questions = faqData[category];

    function render() {
      chatOptions.innerHTML = "";

      questions.slice(0, visibleCount).forEach(item => {
        const btn = document.createElement("button");
        btn.innerText = item.q;

        btn.onclick = () => {
          addUserMessage(item.q);

          setTimeout(() => {
            addBotMessage(item.a);
            scrollChat();
          }, 400);
        };

        chatOptions.appendChild(btn);
      });

      // SHOW MORE BUTTON
      if (visibleCount < questions.length) {
        const moreBtn = document.createElement("button");
        moreBtn.innerText = `➕ Show More Questions`;

        moreBtn.onclick = () => {
          visibleCount += 5;
          render();
        };

        chatOptions.appendChild(moreBtn);
      }

      // BACK BUTTON
      const backBtn = document.createElement("button");
      backBtn.innerText = "⬅ Back";

      backBtn.onclick = () => {
        addBotMessage("Select another category 👇");
        showCategories();
      };

      chatOptions.appendChild(backBtn);
    }

    render();
  }

  // CLICK HANDLER
  chatOptions.addEventListener("click", (e) => {
    if (e.target.tagName !== "BUTTON") return;

    const category = e.target.dataset.category;
    if (!category) return;

    addUserMessage(e.target.innerText);
    showQuestions(category);
    scrollChat();
  });

  // INIT
  showCategories();

});


