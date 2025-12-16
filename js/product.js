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

            // Animate hamburger to X (only if 3 lines exist)
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

        // Close mobile menu
        const closeMobileMenu = () => {
            mobileOverlay.classList.remove('active');
            hamburger.setAttribute('aria-expanded', 'false');
            if (lines.length === 3) {
                lines.forEach(line => line.style.cssText = '');
            }
        };

        // Close on link click or overlay click
        document.querySelectorAll('.mobile-links a').forEach(link => {
            link.addEventListener('click', closeMobileMenu);
        });

        mobileOverlay.addEventListener('click', (e) => {
            if (e.target === mobileOverlay) closeMobileMenu();
        });
    }

    // ===== MODALS (Scroll-friendly: body scroll remains enabled) =====
    // ✅ No `overflow: hidden` — page stays scrollable
    document.querySelectorAll('[data-modal-target]').forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = button.getAttribute('data-modal-target');
            const modal = document.getElementById(targetId);
            if (modal) {
                modal.classList.add('active');
                // ✅ We intentionally DO NOT lock scroll — per your request
            }
        });
    });

    // Close modals
    const closeModal = (modal) => {
        if (modal && modal.classList.contains('active')) {
            modal.classList.remove('active');
            // ✅ No scroll reset needed
        }
    };

    // Close via close button
    document.querySelectorAll('[data-close-button]').forEach(btn => {
        btn.addEventListener('click', () => {
            const modal = btn.closest('.modal');
            closeModal(modal);
        });
    });

    // Close via ESC key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            const modal = document.querySelector('.modal.active');
            closeModal(modal);
        }
    });

    // Close via clicking modal overlay
    document.querySelectorAll('.modal-overlay').forEach(overlay => {
        overlay.addEventListener('click', () => {
            const modal = overlay.closest('.modal');
            closeModal(modal);
        });
    });

    // ===== PRODUCTS BUTTON → SCROLL + HIGHLIGHT =====
    const productsBtn = document.querySelector('a[href="#products"].btn');
    const productsSection = document.getElementById('products');

    if (productsBtn && productsSection) {
        productsBtn.addEventListener('click', (e) => {
            e.preventDefault();

            // Smooth scroll to section
            const headerOffset = 80; // height of fixed header
            const elementPosition = productsSection.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });

            // Highlight animation
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

    // ===== PRODUCT CARD ANIMATION ON SCROLL =====
    const productObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('appear');
                productObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15
    });

    document.querySelectorAll('.product-card').forEach(card => {
        productObserver.observe(card);
    });
});