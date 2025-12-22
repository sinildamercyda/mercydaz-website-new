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
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Skip if already active
            if (btn.classList.contains('active')) return;

            const targetTab = btn.dataset.tab;

            // Update buttons
            tabBtns.forEach(b => {
                b.classList.remove('active');
                b.setAttribute('aria-selected', 'false');
            });
            btn.classList.add('active');
            btn.setAttribute('aria-selected', 'true');

            // Hide all panes FIRST (prevents layout jump)
            tabPanes.forEach(pane => {
                pane.classList.remove('active');
                pane.setAttribute('aria-hidden', 'true');
            });

            // Show target pane after tiny delay (ensures display:none applied)
            setTimeout(() => {
                const targetPane = document.getElementById(`panel-${targetTab}`);
                if (targetPane) {
                    targetPane.classList.add('active');
                    targetPane.setAttribute('aria-hidden', 'false');

                    // Trigger staggered product reveal
                    const cards = targetPane.querySelectorAll('.stagger-item');
                    cards.forEach((card, i) => {
                        card.style.opacity = '0';
                        card.style.transform = 'translateY(20px)';
                        setTimeout(() => {
                            card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                        }, 50 + i * 100);
                    });
                }
            }, 10);
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
});