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
});

// Initialize animations
function initAnimations() {
    // Animate elements on scroll
    const animateElements = document.querySelectorAll('.animate-on-scroll');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1
    });
    
    animateElements.forEach(element => {
        observer.observe(element);
    });
    
    // Add additional animations for hero section
    const heroTitle = document.querySelector('.animated-title');
    const productName = document.querySelector('.product-name');
    const productDesc = document.querySelector('.product-description');
    const ctaButtons = document.querySelector('.cta-buttons');
    
    if (heroTitle) {
        setTimeout(() => {
            heroTitle.style.opacity = '1';
            heroTitle.style.transform = 'translateY(0)';
        }, 300);
    }
    
    if (productName) {
        setTimeout(() => {
            productName.style.opacity = '1';
            productName.style.transform = 'translateY(0)';
        }, 500);
    }
    
    if (productDesc) {
        setTimeout(() => {
            productDesc.style.opacity = '1';
            productDesc.style.transform = 'translateY(0)';
        }, 700);
    }
    
    if (ctaButtons) {
        setTimeout(() => {
            ctaButtons.style.opacity = '1';
            ctaButtons.style.transform = 'translateY(0)';
        }, 900);
    }
}

// Initialize mobile menu
function initMobileMenu() {
    const hamburgerBtn = document.getElementById('hamburgerBtn');
    const mobileOverlay = document.getElementById('mobileOverlay');
    const navMenu = document.getElementById('navMenu');
    
    if (hamburgerBtn && mobileOverlay) {
        hamburgerBtn.addEventListener('click', function() {
            mobileOverlay.style.display = 'block';
            document.body.style.overflow = 'hidden';
        });
        
        // Close mobile menu when clicking outside
        mobileOverlay.addEventListener('click', function(e) {
            if (e.target === mobileOverlay) {
                mobileOverlay.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
        
        // Close mobile menu when clicking on links
        const mobileLinks = document.querySelectorAll('.mobile-links a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileOverlay.style.display = 'none';
                document.body.style.overflow = 'auto';
            });
        });
    }
    
    // Handle dropdown menus
    const dropdowns = document.querySelectorAll('.dropdown');
    dropdowns.forEach(dropdown => {
        dropdown.addEventListener('mouseenter', function() {
            const dropdownContent = this.querySelector('.dropdown-content');
            if (dropdownContent) {
                dropdownContent.style.display = 'block';
            }
        });
        
        dropdown.addEventListener('mouseleave', function() {
            const dropdownContent = this.querySelector('.dropdown-content');
            if (dropdownContent) {
                dropdownContent.style.display = 'none';
            }
        });
    });
    
    // Handle sub-dropdowns
    const subDropdowns = document.querySelectorAll('.sub-dropdown');
    subDropdowns.forEach(subDropdown => {
        const subDropbtn = subDropdown.querySelector('.sub-dropbtn');
        const subDropdownContent = subDropdown.querySelector('.sub-dropdown-content');
        
        if (subDropbtn && subDropdownContent) {
            subDropbtn.addEventListener('click', function(e) {
                e.preventDefault();
                const isVisible = subDropdownContent.style.display === 'block';
                
                // Hide all other sub-dropdowns
                document.querySelectorAll('.sub-dropdown-content').forEach(content => {
                    content.style.display = 'none';
                });
                
                // Toggle current sub-dropdown
                subDropdownContent.style.display = isVisible ? 'none' : 'block';
            });
        }
    });
}

// Initialize WhatsApp chat widget
function initWhatsAppWidget() {
    const waBtn = document.getElementById('waBtn');
    const chatWidget = document.getElementById('chatWidget');
    const closeChat = document.getElementById('closeChat');
    
    if (waBtn && chatWidget && closeChat) {
        waBtn.addEventListener('click', function() {
            chatWidget.style.display = 'block';
            setTimeout(() => {
                chatWidget.style.opacity = '1';
                chatWidget.style.transform = 'translateY(0)';
            }, 10);
        });
        
        closeChat.addEventListener('click', function() {
            chatWidget.style.opacity = '0';
            chatWidget.style.transform = 'translateY(20px)';
            setTimeout(() => {
                chatWidget.style.display = 'none';
            }, 300);
        });
        
        // Close chat widget when clicking outside
        document.addEventListener('click', function(e) {
            if (chatWidget.style.display === 'block' && !chatWidget.contains(e.target) && e.target !== waBtn) {
                chatWidget.style.opacity = '0';
                chatWidget.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    chatWidget.style.display = 'none';
                }, 300);
            }
        });
    }
}

// Initialize back to top button
function initBackToTop() {
    const backToTop = document.getElementById('backToTop');
    
    if (backToTop) {
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                backToTop.style.display = 'flex';
            } else {
                backToTop.style.display = 'none';
            }
        });
        
        backToTop.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

// Initialize scroll effects
function initScrollEffects() {
    // Add scroll animations to sections
    const sections = document.querySelectorAll('section');
    
    window.addEventListener('scroll', function() {
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            
            if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
                section.style.opacity = '1';
                section.style.transform = 'translateY(0)';
            }
        });
    });
    
    // Add parallax effect to hero section
    const heroSection = document.querySelector('.hero-section');
    if (heroSection) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const opacity = 1 - (scrolled * 0.0005);
            heroSection.style.opacity = opacity > 0 ? opacity : 0;
        });
    }
}

// Initialize cursor effects
function initCursorEffects() {
    // Create custom cursor elements
    const cursorDot = document.createElement('div');
    const cursorOutline = document.createElement('div');
    
    cursorDot.className = 'cursor-dot';
    cursorOutline.className = 'cursor-outline';
    
    document.body.appendChild(cursorDot);
    document.body.appendChild(cursorOutline);
    
    // Track mouse movement
    document.addEventListener('mousemove', function(e) {
        const mouseX = e.clientX;
        const mouseY = e.clientY;
        
        cursorDot.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
        cursorOutline.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
    });
    
    // Change cursor style on interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .dropdown, .sub-dropdown, .feature-card, .benefit-card, .product-image');
    
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            cursorDot.style.transform = `translate(${event.clientX}px, ${event.clientY}px) scale(1.5)`;
            cursorOutline.style.transform = `translate(${event.clientX}px, ${event.clientY}px) scale(1.5)`;
        });
        
        element.addEventListener('mouseleave', function() {
            cursorDot.style.transform = `translate(${event.clientX}px, ${event.clientY}px) scale(1)`;
            cursorOutline.style.transform = `translate(${event.clientX}px, ${event.clientY}px) scale(1)`;
        });
    });
}

// Add smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});