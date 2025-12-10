// Mobile Navigation Toggle
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        const icon = navToggle.querySelector('i');
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-times');
    });

    // Close menu on link click
    document.querySelectorAll('#navMenu a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            const icon = navToggle.querySelector('i');
            icon.classList.add('fa-bars');
            icon.classList.remove('fa-times');
        });
    });
}

// Hero Animation on Load
document.addEventListener('DOMContentLoaded', () => {
    const heroH1 = document.querySelector('.hero h1');
    const heroP = document.querySelector('.hero p');
    const heroBtn = document.querySelector('.hero .btn');

    if (heroH1) setTimeout(() => { heroH1.style.cssText = 'opacity:1; transform:translateY(0); transition:opacity 0.8s ease, transform 0.8s ease'; }, 300);
    if (heroP)  setTimeout(() => { heroP.style.cssText  = 'opacity:1; transform:translateY(0); transition:opacity 0.8s ease 0.2s, transform 0.8s ease 0.2s'; }, 500);
    if (heroBtn) setTimeout(() => { heroBtn.style.cssText = 'opacity:1; transform:translateY(0); transition:opacity 0.8s ease 0.4s, transform 0.8s ease 0.4s'; }, 700);

    // Product Card Animation on Scroll
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const productObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('appear');
                productObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.product-card').forEach(card => {
        productObserver.observe(card);
    });

    // Footer animation
    const footer = document.querySelector('footer');
    if (footer) {
        const footerObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    footer.classList.add('appear');
                    footerObserver.unobserve(footer);
                }
            });
        }, { threshold: 0.1 });

        footerObserver.observe(footer);
    }
});

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const target = document.querySelector(targetId);
        if (target) {
            const offset = 80; // Account for fixed header
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Optional: Add to wishlist functionality
document.addEventListener('click', function(e) {
    if (e.target.closest('.btn-add')) {
        const btn = e.target.closest('button');
        const icon = btn.querySelector('i');
        if (icon.classList.contains('far')) {
            icon.classList.remove('far');
            icon.classList.add('fas');
            btn.innerHTML = '<i class="fas fa-heart"></i> Added';
            btn.style.background = '#fee2e2';
            btn.style.color = '#ef4444';
            
            setTimeout(() => {
                btn.innerHTML = '<i class="far fa-heart"></i> Wishlist';
                btn.style.background = '';
                btn.style.color = '';
                icon.classList.remove('fas');
                icon.classList.add('far');
            }, 1500);
        }
    }
});