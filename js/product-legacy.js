/**
 * Legacy Products Page - Complete JavaScript
 * Features: Mobile menu, dropdowns, animations, chat widget, accessibility
 */

document.addEventListener("DOMContentLoaded", function () {
    
    "use strict";

    /* =====================================================
       🎬 1. CURTAIN OVERLAY ANIMATION
       ===================================================== */
    const curtain = document.querySelector('.curtain-overlay');
    
    if (curtain) {
        // Remove curtain from DOM after animation completes
        curtain.addEventListener('animationend', () => {
            curtain.style.display = 'none';
        });
    }

    /* =====================================================
       📱 2. MOBILE MENU TOGGLE
       ===================================================== */
    const hamburger = document.getElementById('hamburgerBtn');
    const overlay = document.getElementById('mobileOverlay');
    const body = document.body;

    function toggleMenu() {
        if (!overlay) return;
        
        const isActive = overlay.classList.toggle('active');
        body.style.overflow = isActive ? 'hidden' : '';
        
        // Animate hamburger icon
        if (hamburger) {
            hamburger.classList.toggle('active', isActive);
            hamburger.setAttribute('aria-expanded', isActive);
        }
    }

    if (hamburger && overlay) {
        hamburger.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleMenu();
        });

        // Close when clicking overlay background (not links)
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                toggleMenu();
            }
        });

        // Close when clicking any link inside overlay
        overlay.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                toggleMenu();
            });
        });
    }

    // Close menu on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && overlay?.classList.contains('active')) {
            toggleMenu();
            hamburger?.focus();
        }
    });

    /* =====================================================
       🖥️ 3. DESKTOP DROPDOWN MENUS (Hover-Based)
       ===================================================== */
    function isMobile() {
        return window.innerWidth <= 991;
    }

    // Desktop dropdowns: show on hover, hide on leave
   // Desktop dropdowns (hover only)


    /* =====================================================
       📱 4. MOBILE DROPDOWN MENUS (Click-Based)
       ===================================================== */
    
    // Close all mobile dropdowns helper
    function closeAllMobileDropdowns(exceptElement) {
        document.querySelectorAll('.mobile-dropdown.active, .mobile-sub-dropdown.active')
            .forEach(el => {
                if (el !== exceptElement?.parentElement) {
                    el.classList.remove('active');
                }
            });
    }

    // Main mobile dropdowns (Products, Solutions)
    document.querySelectorAll('.mobile-dropbtn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            if (!isMobile()) return;
            e.preventDefault();
            e.stopPropagation();
            
            const parent = btn.parentElement;
            const isActive = parent.classList.toggle('active');
            
            // Close siblings
            if (isActive) {
                closeAllMobileDropdowns(btn);
            }
            
            // Animate arrow
            const arrow = btn.querySelector('.arrow');
            if (arrow) {
                arrow.style.transform = isActive ? 'rotate(180deg)' : '';
            }
        });
    });

    // Sub-mobile dropdowns (nested items)
    document.querySelectorAll('.mobile-sub-dropbtn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            if (!isMobile()) return;
            e.preventDefault();
            e.stopPropagation();
            
            const parent = btn.parentElement;
            parent.classList.toggle('active');
            
            // Animate arrow
            const arrow = btn.querySelector('.arrow');
            if (arrow) {
                arrow.style.transform = parent.classList.contains('active') 
                    ? 'rotate(180deg)' 
                    : '';
            }
        });
    });

    // Desktop sub-dropdowns (click to toggle)
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

    /* =====================================================
       💬 5. WHATSAPP CHAT WIDGET
       ===================================================== */
    const waBtn = document.getElementById("waBtn");
    const chatWidget = document.getElementById("chatWidget");
    const closeChat = document.getElementById("closeChat");

    if (waBtn && chatWidget && closeChat) {
        waBtn.addEventListener("click", () => {
            chatWidget.style.display = "block";
            waBtn.style.display = "none";
            
            // Animate widget entrance
            chatWidget.style.opacity = '0';
            chatWidget.style.transform = 'translateY(20px)';
            setTimeout(() => {
                chatWidget.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
                chatWidget.style.opacity = '1';
                chatWidget.style.transform = 'translateY(0)';
            }, 10);
        });

        closeChat.addEventListener("click", () => {
            chatWidget.style.opacity = '0';
            chatWidget.style.transform = 'translateY(20px)';
            setTimeout(() => {
                chatWidget.style.display = "none";
                waBtn.style.display = "flex";
            }, 300);
        });
    }

    /* =====================================================
       📋 6. EXPANDABLE PRODUCT LISTS
       ===================================================== */
    document.querySelectorAll('.toggle-list-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const targetId = this.getAttribute('aria-controls');
            const targetList = document.getElementById(targetId);
            if (!targetList) return;
            
            const isExpanded = this.getAttribute('aria-expanded') === 'true';
            
            // Toggle state
            targetList.hidden = isExpanded;
            this.setAttribute('aria-expanded', !isExpanded);
            
            // Animate arrow
            const icon = this.querySelector('i');
            if (icon) {
                icon.style.transform = isExpanded ? '' : 'rotate(180deg)';
            }
            
            // Smooth scroll if opening and not fully visible
            if (!isExpanded) {
                const rect = targetList.getBoundingClientRect();
                if (rect.bottom > window.innerHeight || rect.top < 0) {
                    targetList.scrollIntoView({ 
                        behavior: 'smooth', 
                        block: 'nearest' 
                    });
                }
            }
        });
    });

    /* =====================================================
       🎬 7. SCROLL ANIMATIONS (Intersection Observer)
       ===================================================== */
    
    // Utility: Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Animate product cards on scroll
    const productCards = document.querySelectorAll('.product-card');
    if (productCards.length > 0 && !prefersReducedMotion) {
        const cardObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('show');
                    cardObserver.unobserve(entry.target);
                }
            });
        }, { 
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        productCards.forEach(card => cardObserver.observe(card));
    } else if (productCards.length > 0) {
        // Fallback: show all cards immediately if reduced motion
        productCards.forEach(card => card.classList.add('show'));
    }

    // Animate sections and titles on scroll
    const animatedSections = document.querySelectorAll('.products, .legacy-person, .section-title');
    if (animatedSections.length > 0 && !prefersReducedMotion) {
        const sectionObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('show');
                    sectionObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        animatedSections.forEach(section => sectionObserver.observe(section));
    } else if (animatedSections.length > 0) {
        animatedSections.forEach(section => section.classList.add('show'));
    }

    /* =====================================================
       🔗 8. SMOOTH SCROLL FOR ANCHOR LINKS
       ===================================================== */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                
                // Close mobile menu if open
                if (overlay?.classList.contains('active')) {
                    toggleMenu();
                }
                
                // Calculate position with header offset
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    /* =====================================================
       🎨 9. HEADER SCROLL EFFECT
       ===================================================== */
    const mainHeader = document.querySelector('.main-header');
    
    if (mainHeader) {
        let lastScroll = 0;
        
        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;
            
            // Add shadow on scroll
            if (currentScroll > 50) {
                mainHeader.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.1)';
                mainHeader.style.background = 'rgba(255, 255, 255, 0.95)';
            } else {
                mainHeader.style.boxShadow = '0 2px 15px rgba(0,0,0,0.05)';
                mainHeader.style.background = 'rgba(255, 255, 255, 0.75)';
            }
            
            // Hide/show header on scroll direction (optional enhancement)
            // if (currentScroll > lastScroll && currentScroll > 100) {
            //     mainHeader.style.transform = 'translateY(-100%)';
            // } else {
            //     mainHeader.style.transform = 'translateY(0)';
            // }
            // lastScroll = currentScroll;
        }, { passive: true });
    }

    /* =====================================================
       ⌨️ 10. KEYBOARD NAVIGATION ENHANCEMENTS
       ===================================================== */
    
    // Make dropdown buttons keyboard accessible
    document.querySelectorAll('.dropbtn, .mobile-dropbtn, .sub-dropbtn, .mobile-sub-dropbtn').forEach(btn => {
        btn.setAttribute('tabindex', '0');
        btn.setAttribute('role', 'button');
        btn.setAttribute('aria-haspopup', 'true');
        
        btn.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                btn.click();
            }
        });
    });

    /* =====================================================
       📐 11. RESIZE HANDLER FOR RESPONSIVE BEHAVIOR
       ===================================================== */
document.querySelectorAll('.dropdown').forEach(dropdown => {
    const content = dropdown.querySelector('.dropdown-content');
    if (!content) return;

    dropdown.addEventListener('mouseenter', () => {
        if (isMobile()) return;
        dropdown.classList.add('open');
    });

    dropdown.addEventListener('mouseleave', () => {
        if (isMobile()) return;
        dropdown.classList.remove('open');
    });
});

    /* =====================================================
       🎯 12. LAZY LOAD IMAGES (Optional Enhancement)
       ===================================================== */
    if ('IntersectionObserver' in window) {
        const lazyImages = document.querySelectorAll('img[loading="lazy"]');
        
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                        img.classList.add('loaded');
                    }
                    imageObserver.unobserve(img);
                }
            });
        });
        
        lazyImages.forEach(img => imageObserver.observe(img));
    }

    /* =====================================================
       📊 13. ANALYTICS / TRACKING HOOKS (Optional)
       ===================================================== */
    // Example: Track product card clicks
    document.querySelectorAll('.product-card a').forEach(link => {
        link.addEventListener('click', (e) => {
            // Uncomment and customize for your analytics
            // analytics.track('Product Clicked', {
            //     product: link.closest('.product-card').querySelector('.product-title')?.textContent,
            //     category: link.closest('.product-card').querySelector('.product-category')?.textContent
            // });
        });
    });

    /* =====================================================
       ✅ 14. FINAL INITIALIZATION LOG
       ===================================================== */
    console.log('✨ Legacy Products Page initialized');
    
    // Expose utilities for debugging (remove in production)
    // window.legacyUtils = { toggleMenu, isMobile };
});

/* =====================================================
   🕐 MODERN TIMELINE INTERACTIONS
   ===================================================== */

document.addEventListener("DOMContentLoaded", function () {
    
    "use strict";

    // ===== Timeline Scroll Progress =====
    const timeline = document.querySelector('.timeline');
    const timelineItems = document.querySelectorAll('.timeline-item');
    const timelineHeader = document.querySelector('.timeline-header');
    
    // Animate header on load
    if (timelineHeader) {
        setTimeout(() => {
            timelineHeader.classList.add('show');
        }, 300);
    }
    
    // ===== Timeline Item Scroll Animation =====
    if (timelineItems.length > 0) {
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        
        const timelineObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('show');
                    // Don't unobserve if we want re-animation on scroll up
                    // timelineObserver.unobserve(entry.target);
                }
            });
        }, { 
            threshold: 0.15,
            rootMargin: '0px 0px -30px 0px'
        });
        
        timelineItems.forEach(item => timelineObserver.observe(item));
    }
    
    // ===== Timeline Progress Line Animation =====
    if (timeline && timelineItems.length > 0) {
        const progressObserver = new IntersectionObserver((entries) => {
            const visibleItems = entries.filter(e => e.isIntersecting);
            if (visibleItems.length > 0) {
                // Calculate progress based on visible item position
                const firstVisible = visibleItems[0].target;
                const itemIndex = Array.from(timelineItems).indexOf(firstVisible);
                const progress = Math.min(100, ((itemIndex + 1) / timelineItems.length) * 100);
                timeline.style.setProperty('--progress', `${progress}%`);
                
                // Trigger CSS transition via class
                if (progress >= 95) {
                    timeline.classList.add('progress-complete');
                }
            }
        }, { threshold: 0.5 });
        
        timelineItems.forEach(item => progressObserver.observe(item));
    }
    
    // ===== Click to Expand Timeline Details =====
    timelineItems.forEach(item => {
        const content = item.querySelector('.timeline-content');
        if (!content) return;
        
        content.addEventListener('click', (e) => {
            // Don't toggle if clicking a link inside
            if (e.target.closest('a')) return;
            
            const isActive = item.classList.contains('active');
            
            // Close all others
            timelineItems.forEach(i => {
                if (i !== item) i.classList.remove('active');
            });
            
            // Toggle current
            item.classList.toggle('active', !isActive);
            
            // Optional: scroll to show details on mobile
            if (!isActive && window.innerWidth <= 768) {
                setTimeout(() => {
                    item.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }, 300);
            }
        });
        
        // Keyboard accessibility
        content.setAttribute('tabindex', '0');
        content.setAttribute('role', 'button');
        content.setAttribute('aria-expanded', 'false');
        
        content.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                content.click();
            }
        });
    });
    
    // ===== Marker Hover Effect Enhancement =====
    const markers = document.querySelectorAll('.timeline-marker');
    markers.forEach(marker => {
        marker.setAttribute('tabindex', '0');
        marker.setAttribute('aria-label', 'View timeline details');
        
        marker.addEventListener('focus', () => {
            marker.parentElement.classList.add('active');
        });
        
        marker.addEventListener('blur', () => {
            marker.parentElement.classList.remove('active');
        });
    });
    
    // ===== Dynamic Icon Assignment (Optional) =====
    // Add icons based on content keywords
    const iconMap = {
        'Coin Pay': '📞',
        'Call Monitoring': '🎧',
        'Speed Governor': '🚗',
        'Vehicle Electronics': '🔧',
        'Connected': '🌐',
        'IoT': '📡'
    };
    
    document.querySelectorAll('.timeline-content h3').forEach(title => {
        const text = title.textContent;
        for (const [keyword, icon] of Object.entries(iconMap)) {
            if (text.includes(keyword)) {
                const iconEl = document.createElement('span');
                iconEl.className = 'timeline-icon';
                iconEl.textContent = icon;
                title.prepend(iconEl);
                break;
            }
        }
    });
    
    // ===== Parallax Effect on Markers (Subtle) =====
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            markers.forEach((marker, index) => {
                const rect = marker.getBoundingClientRect();
                if (rect.top < window.innerHeight && rect.bottom > 0) {
                    const speed = 0.1 + (index * 0.02);
                    marker.style.transform = `translateY(${scrolled * speed}px) scale(1)`;
                }
            });
        }, { passive: true });
    }
});