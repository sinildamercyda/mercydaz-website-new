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

    // ===== TAB SWITCHING (Modern Product Categories) =====
   // Tab switching with accessibility
document.querySelectorAll('.category-btn').forEach(btn => {
  btn.addEventListener('click', function() {
    // Update active states
    document.querySelectorAll('.category-btn').forEach(b => {
      b.classList.remove('active');
      b.setAttribute('aria-selected', 'false');
    });
    this.classList.add('active');
    this.setAttribute('aria-selected', 'true');
    
    // Show corresponding panel
    const target = this.dataset.tab;
    document.querySelectorAll('.tab-pane').forEach(panel => {
      panel.classList.remove('active');
    });
    document.getElementById(`panel-${target}`).classList.add('active');
    
    // Optional: Scroll to products on mobile
    if (window.innerWidth < 992) {
      document.getElementById('products').scrollIntoView({ behavior: 'smooth' });
    }
  });
});

    // ===== INITIAL STAGGERED ANIMATION (First Tab: Telematics) =====
    const initStagger = () => {
        const firstPane = document.querySelector('.tab-pane.active');
        if (!firstPane) return;

        const cards = firstPane.querySelectorAll('.stagger-item');
        cards.forEach((card, i) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            setTimeout(() => {
                card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, 300 + i * 100);
        });
    };

    // Trigger after slight delay for smoother UX
    setTimeout(initStagger, 400);

    // ===== MODAL HANDLING =====
    document.querySelectorAll('[data-modal-target]').forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = button.getAttribute('data-modal-target');
            const modal = document.getElementById(targetId);
            if (modal) {
                modal.classList.add('active');
            }
        });
    });

    const closeModal = (modal) => {
        if (modal && modal.classList.contains('active')) {
            modal.classList.remove('active');
        }
    };

    document.querySelectorAll('[data-close-button]').forEach(btn => {
        btn.addEventListener('click', () => {
            const modal = btn.closest('.modal');
            closeModal(modal);
        });
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            const modal = document.querySelector('.modal.active');
            closeModal(modal);
        }
    });

    document.querySelectorAll('.modal-overlay').forEach(overlay => {
        overlay.addEventListener('click', () => {
            const modal = overlay.closest('.modal');
            closeModal(modal);
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

    // ===== SUB-DROPDOWN TOGGLE =====
    document.querySelectorAll('.sub-dropbtn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const parent = btn.closest('.sub-dropdown');

            // Close others
            document.querySelectorAll('.sub-dropdown.active').forEach(item => {
                if (item !== parent) {
                    item.classList.remove('active');
                }
            });

            parent.classList.toggle('active');
        });
    });

    // Close all sub-dropdowns on outside click
    document.addEventListener('click', (e) => {
        const isInsideDropdown = e.target.closest('.dropdown');
        if (!isInsideDropdown) {
            document.querySelectorAll('.sub-dropdown.active').forEach(item => {
                item.classList.remove('active');
            });
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


// ****************************************category-tabs animation****************************************************
const scrollElements = document.querySelectorAll(".scroll-pop");

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target); // animate once
    }
  });
}, {
  threshold: 0.2
});

scrollElements.forEach(el => observer.observe(el));


// ***************************************animate product cards****************************************************
function animateStagger(container) {
  const items = container.querySelectorAll(".stagger-item");

  items.forEach((item, index) => {
    item.classList.remove("show"); // reset
    setTimeout(() => {
      item.classList.add("show");
    }, index * 120); // stagger delay
  });
}

/* Scroll Observer */
const staggerObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateStagger(entry.target);
      staggerObserver.unobserve(entry.target); // run once on scroll
    }
  });
}, { threshold: 0.2 });

document.querySelectorAll(".stagger-container").forEach(container => {
  staggerObserver.observe(container);
});
