// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize animations
    initAnimations();
    
    // Initialize mobile menu
    initMobileMenu();
    
    // Initialize WhatsApp chat widget
    initWhatsAppWidget();
    
    // Initialize back to top button
    initBackToTop();
    
    // Initialize scroll effects
    initScrollEffects();
    
    // Initialize cursor effects
    initCursorEffects();
    
    // Set current year in footer
    document.getElementById('year').textContent = new Date().getFullYear();

    /* =========================================================
       SMOOTH SCROLL FOR FEATURE & SPECIFICATION BUTTONS
    ========================================================= */
    function smoothScrollWithOffset(targetId) {
        const headerOffset = 90; // adjust to your header height
        const element = document.querySelector(targetId);

        if (!element) return;

        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    }

    const featureBtn = document.querySelector('.btn-primary');
    const specBtn = document.querySelector('.btn-secondary');

    if (featureBtn) {
        featureBtn.addEventListener('click', function (e) {
            e.preventDefault();
            smoothScrollWithOffset('#features');
        });
    }

    if (specBtn) {
        specBtn.addEventListener('click', function (e) {
            e.preventDefault();
            smoothScrollWithOffset('#specifications');
        });
    }
});

// Initialize animations
function initAnimations() {
    const animateElements = document.querySelectorAll('.animate-on-scroll');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });
    
    animateElements.forEach(element => observer.observe(element));
    
    const heroTitle = document.querySelector('.animated-title');
    const productName = document.querySelector('.product-name');
    const productDesc = document.querySelector('.product-description');
    const ctaButtons = document.querySelector('.cta-buttons');
    
    if (heroTitle) setTimeout(() => {
        heroTitle.style.opacity = '1';
        heroTitle.style.transform = 'translateY(0)';
    }, 300);

    if (productName) setTimeout(() => {
        productName.style.opacity = '1';
        productName.style.transform = 'translateY(0)';
    }, 500);

    if (productDesc) setTimeout(() => {
        productDesc.style.opacity = '1';
        productDesc.style.transform = 'translateY(0)';
    }, 700);

    if (ctaButtons) setTimeout(() => {
        ctaButtons.style.opacity = '1';
        ctaButtons.style.transform = 'translateY(0)';
    }, 900);
}

// Initialize mobile menu
function initMobileMenu() {
    const hamburgerBtn = document.getElementById('hamburgerBtn');
    const mobileOverlay = document.getElementById('mobileOverlay');
    
    if (hamburgerBtn && mobileOverlay) {
        hamburgerBtn.addEventListener('click', () => {
            mobileOverlay.style.display = 'block';
            document.body.style.overflow = 'hidden';
        });
        
        mobileOverlay.addEventListener('click', e => {
            if (e.target === mobileOverlay) {
                mobileOverlay.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });

        document.querySelectorAll('.mobile-links a').forEach(link => {
            link.addEventListener('click', () => {
                mobileOverlay.style.display = 'none';
                document.body.style.overflow = 'auto';
            });
        });
    }

}

// Initialize WhatsApp chat widget
function initWhatsAppWidget() {
    const waBtn = document.getElementById('waBtn');
    const chatWidget = document.getElementById('chatWidget');
    const closeChat = document.getElementById('closeChat');
    
    if (!waBtn || !chatWidget || !closeChat) return;

    waBtn.addEventListener('click', () => {
        chatWidget.style.display = 'block';
        setTimeout(() => {
            chatWidget.style.opacity = '1';
            chatWidget.style.transform = 'translateY(0)';
        }, 10);
    });

    closeChat.addEventListener('click', () => {
        chatWidget.style.opacity = '0';
        chatWidget.style.transform = 'translateY(20px)';
        setTimeout(() => chatWidget.style.display = 'none', 300);
    });
}

// Initialize back to top button
function initBackToTop() {
    const backToTop = document.getElementById('backToTop');
    if (!backToTop) return;

    window.addEventListener('scroll', () => {
        backToTop.style.display =
            window.pageYOffset > 300 ? 'flex' : 'none';
    });

    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// Initialize scroll effects
function initScrollEffects() {
    const heroSection = document.querySelector('.hero-section');
    if (!heroSection) return;

    window.addEventListener('scroll', () => {
        const opacity = 1 - window.pageYOffset * 0.0005;
        heroSection.style.opacity = opacity > 0 ? opacity : 0;
    });
}

// Initialize cursor effects
function initCursorEffects() {
    const cursorDot = document.createElement('div');
    const cursorOutline = document.createElement('div');

    cursorDot.className = 'cursor-dot';
    cursorOutline.className = 'cursor-outline';

    document.body.appendChild(cursorDot);
    document.body.appendChild(cursorOutline);

    document.addEventListener('mousemove', e => {
        cursorDot.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
        cursorOutline.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
    });
}



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
