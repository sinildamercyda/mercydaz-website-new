document.addEventListener('DOMContentLoaded', () => {
  
  // ===== MOBILE MENU TOGGLE =====
  const hamburger = document.getElementById('hamburgerBtn');
  const mobileOverlay = document.getElementById('mobileOverlay');

  if (hamburger && mobileOverlay) {
    const lines = hamburger.querySelectorAll('.hamburger-line');

    hamburger.addEventListener('click', () => {
      const isExpanded = hamburger.getAttribute('aria-expanded') === 'true';
      hamburger.setAttribute('aria-expanded', !isExpanded);
      mobileOverlay.classList.toggle('active');

      if (lines.length === 3) {
        if (!isExpanded) {
          lines[0].style.transform = 'rotate(-45deg) translate(-5px, 6px)';
          lines[1].style.opacity = '0';
          lines[2].style.transform = 'rotate(45deg) translate(-5px, -6px)';
        } else {
          lines[0].style.transform = '';
          lines[1].style.opacity = '1';
          lines[2].style.transform = '';
        }
      }
    });

    const closeMobileMenu = () => {
      mobileOverlay.classList.remove('active');
      hamburger.setAttribute('aria-expanded', 'false');
      if (lines.length === 3) {
        lines.forEach(line => line.style.cssText = '');
      }
    };

    document.querySelectorAll('.mobile-links a').forEach(link => {
      link.addEventListener('click', closeMobileMenu);
    });

    mobileOverlay.addEventListener('click', (e) => {
      if (e.target === mobileOverlay) closeMobileMenu();
    });
  }

  // ===== CATEGORY SUBMENU TOGGLE ONLY (NO TAB SWITCHING) =====
  const categoryBtns = document.querySelectorAll('.category-btn');
  const submenuToggles = document.querySelectorAll('.btn-toggle');

  // 🎯 MAIN HANDLER: Click category button → ONLY toggle submenu
  categoryBtns.forEach(btn => {
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      
      const group = this.closest('.category-group');
      const submenu = group?.querySelector('.category-submenu');
      
      if (!submenu) return;
      
      // Toggle this submenu with accordion behavior (close others)
      toggleSubmenuAccordion(this, submenu);
      
      // 📱 Optional: Smooth scroll to reveal submenu on mobile
      if (window.innerWidth < 992 && this.getAttribute('aria-expanded') === 'true') {
        group.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    });
  });

  // 🔽 Arrow toggle (same behavior as button click)
  submenuToggles.forEach(toggle => {
    toggle.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      
      const btn = this.closest('.category-btn');
      const group = btn?.closest('.category-group');
      const submenu = group?.querySelector('.category-submenu');
      
      if (!submenu) return;
      toggleSubmenuAccordion(btn, submenu);
    });
  });

  // ----- Helper: Toggle submenu with accordion behavior -----
  function toggleSubmenuAccordion(btn, submenu) {
    const isExpanded = btn.getAttribute('aria-expanded') === 'true';
    const newState = !isExpanded;
    
    // 🔄 Close ALL other submenus first (accordion style)
    document.querySelectorAll('.category-submenu.expanded').forEach(openMenu => {
      if (openMenu !== submenu) {
        openMenu.classList.remove('expanded');
        const otherBtn = openMenu.closest('.category-group')?.querySelector('.category-btn');
        otherBtn?.setAttribute('aria-expanded', 'false');
      }
    });
    
    // 🎯 Toggle current submenu
    submenu.classList.toggle('expanded', newState);
    btn.setAttribute('aria-expanded', newState.toString());
    
    // 🎨 Visual feedback: highlight button when submenu is open
    btn.classList.toggle('active', newState);
    
    // 📱 Optional haptic feedback on mobile
    if ('vibrate' in navigator && window.innerWidth < 992 && newState) {
      navigator.vibrate(10);
    }
  }

  // Handle submenu link clicks (smooth scroll to anchor)
  document.querySelectorAll('.submenu-link').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Update active submenu link
        document.querySelectorAll('.submenu-link').forEach(l => l.classList.remove('active'));
        this.classList.add('active');
        
        // 🔄 SWITCH TAB PANES
        const targetId = this.getAttribute('href').slice(1); // e.g., "panel-safety"
        
        // Hide all tab panes
        document.querySelectorAll('.tab-pane').forEach(pane => {
        pane.classList.remove('active');
        });
        
        // Show target tab pane
        const targetPane = document.getElementById(targetId);
        if (targetPane) {
        targetPane.classList.add('active');
        
        // Optional: Smooth scroll to section
        const headerOffset = 80;
        const offsetPosition = targetPane.offsetTop - headerOffset;
        window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
        
        // Highlight effect
        targetPane.classList.add('highlight-target');
        setTimeout(() => targetPane.classList.remove('highlight-target'), 1200);
        }
        
        // 🔄 Optional: Update sidebar button active states
        document.querySelectorAll('.category-btn').forEach(btn => {
        btn.classList.remove('active');
        btn.setAttribute('aria-expanded', 'false');
        });
        const parentGroup = this.closest('.category-submenu')?.closest('.category-group');
        const parentBtn = parentGroup?.querySelector('.category-btn');
        if (parentBtn) {
        parentBtn.classList.add('active');
        parentBtn.setAttribute('aria-expanded', 'true');
        }
    });
    });

  // Keyboard accessibility for category nav
  document.querySelectorAll('.category-btn, .submenu-link').forEach(el => {
    el.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        this.click();
      }
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        e.preventDefault();
        const nav = this.closest('.category-nav');
        if (!nav) return;
        const items = Array.from(nav.querySelectorAll('.category-btn, .submenu-link'));
        const currentIndex = items.indexOf(this);
        const nextIndex = e.key === 'ArrowDown' 
          ? Math.min(currentIndex + 1, items.length - 1)
          : Math.max(currentIndex - 1, 0);
        items[nextIndex]?.focus();
      }
    });
  });

  // ===== INITIAL STAGGERED ANIMATION (For visible product cards) =====
  const initStagger = () => {
    const visibleContainer = document.querySelector('.stagger-container');
    if (!visibleContainer) return;
    animateStagger(visibleContainer);
  };
  setTimeout(initStagger, 400);

  // ===== MODAL HANDLING =====
  document.querySelectorAll('[data-modal-target]').forEach(button => {
    button.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = button.getAttribute('data-modal-target');
      const modal = document.getElementById(targetId);
      if (modal) modal.classList.add('active');
    });
  });

  const closeModal = (modal) => {
    if (modal?.classList.contains('active')) {
      modal.classList.remove('active');
    }
  };

  document.querySelectorAll('[data-close-button]').forEach(btn => {
    btn.addEventListener('click', () => {
      closeModal(btn.closest('.modal'));
    });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeModal(document.querySelector('.modal.active'));
    }
  });

  document.querySelectorAll('.modal-overlay').forEach(overlay => {
    overlay.addEventListener('click', () => {
      closeModal(overlay.closest('.modal'));
    });
  });

  // ===== SCROLL TO PRODUCTS BUTTON =====
  const productsBtn = document.querySelector('a[href="#products"].btn');
  const productsSection = document.getElementById('products');

  if (productsBtn && productsSection) {
    productsBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const headerOffset = 80;
      const offsetPosition = productsSection.offsetTop - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });

      productsSection.classList.add('highlight-target');
      setTimeout(() => {
        productsSection.classList.remove('highlight-target');
      }, 1200);
    });
  }

  // ===== DYNAMIC YEAR =====
  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // ===== WHATSAPP CHAT WIDGET =====
  const waBtn = document.getElementById("waBtn");
  const chatWidget = document.getElementById("chatWidget");
  const closeChat = document.getElementById("closeChat");

  if (waBtn && chatWidget && closeChat) {
    waBtn.addEventListener("click", () => {
      chatWidget.style.display = "block";
      waBtn.style.display = "none";
    });

    closeChat.addEventListener("click", () => {
      chatWidget.style.display = "none";
      waBtn.style.display = "flex";
    });
  }

  // ===== DESKTOP NAV DROPDOWNS (hover-based) =====
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




  // ===== MOBILE NAV DROPDOWNS (click-based) =====
  function isMobile() {
    return window.innerWidth <= 991;
  }

  document.querySelectorAll(".mobile-dropbtn").forEach(btn => {
    btn.addEventListener("click", (e) => {
      if (!isMobile()) return;
      e.stopPropagation();
      document.querySelectorAll(".mobile-dropbtn").forEach(other => {
        if (other !== btn) other.parentElement.classList.remove("active");
      });
      btn.parentElement.classList.toggle("active");
    });
  });

  document.querySelectorAll(".mobile-sub-dropbtn").forEach(btn => {
    btn.addEventListener("click", (e) => {
      if (!isMobile()) return;
      e.stopPropagation();
      btn.parentElement.classList.toggle("active");
    });
  });

  // Close mobile dropdowns when clicking outside
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.mobile-nav, .dropdown')) {
      document.querySelectorAll('.mobile-dropbtn, .mobile-sub-dropbtn').forEach(btn => {
        btn.parentElement?.classList.remove('active');
      });
    }
  });

}); // End DOMContentLoaded

// ===== SCROLL ANIMATIONS (Outside DOMContentLoaded for broader support) =====

// Category tabs scroll-pop animation
const scrollElements = document.querySelectorAll(".scroll-pop");
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });
scrollElements.forEach(el => observer.observe(el));

// Product cards stagger animation
function animateStagger(container) {
  const items = container.querySelectorAll(".stagger-item");
  items.forEach((item, index) => {
    item.classList.remove("show");
    setTimeout(() => item.classList.add("show"), index * 120);
  });
}

const staggerObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateStagger(entry.target);
      staggerObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });

document.querySelectorAll(".stagger-container").forEach(container => {
  staggerObserver.observe(container);
});