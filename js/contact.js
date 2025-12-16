document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contactForm');
    const submitBtn = document.getElementById('submitBtn');
    const successMessage = document.getElementById('successMessage');
    const hamburgerBtn = document.getElementById('hamburgerBtn');
    const mobileOverlay = document.getElementById('mobileOverlay');

    // Set year in footer
    document.getElementById('year').textContent = new Date().getFullYear();

    // Set min date to today
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('date').min = today;

    // Mobile menu toggle
    hamburgerBtn.addEventListener('click', () => {
        mobileOverlay.classList.toggle('active');
        hamburgerBtn.setAttribute('aria-expanded', mobileOverlay.classList.contains('active'));
    });

    // Close overlay when clicking link
    document.querySelectorAll('.mobile-links a').forEach(link => {
        link.addEventListener('click', () => {
            mobileOverlay.classList.remove('active');
            hamburgerBtn.setAttribute('aria-expanded', 'false');
        });
    });

    // Close overlay on ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && mobileOverlay.classList.contains('active')) {
            mobileOverlay.classList.remove('active');
            hamburgerBtn.setAttribute('aria-expanded', 'false');
        }
    });

    // Form submission
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        clearErrors();

        let isValid = true;

        // Name
        const name = document.getElementById('name').value.trim();
        if (!name) {
            showError('name', 'Name is required.');
            isValid = false;
        }

        // Email
        const email = document.getElementById('email').value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email) {
            showError('email', 'Email is required.');
            isValid = false;
        } else if (!emailRegex.test(email)) {
            showError('email', 'Please enter a valid email address.');
            isValid = false;
        }

        // Phone (optional but validated if present)
        const phone = document.getElementById('phone').value.trim();
        if (phone && !/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/.test(phone.replace(/\D/g, ''))) {
            showError('phone', 'Please enter a valid phone number (e.g., 123-456-7890).');
            isValid = false;
        }

        // Date
        const dateInput = document.getElementById('date').value;
        if (!dateInput) {
            showError('date', 'Please select a contact date.');
            isValid = false;
        }

        // Message
        const message = document.getElementById('message').value.trim();
        if (!message) {
            showError('message', 'Message is required.');
            isValid = false;
        } else if (message.length < 10) {
            showError('message', 'Message must be at least 10 characters.');
            isValid = false;
        }

        if (isValid) {
            submitBtn.disabled = true;
            const originalText = submitBtn.querySelector('span').textContent;
            submitBtn.querySelector('span').textContent = 'Sending...';

            // Simulate API call
            setTimeout(() => {
                form.reset();
                successMessage.classList.remove('hidden');
                submitBtn.disabled = false;
                submitBtn.querySelector('span').textContent = originalText;

                // Auto-hide success
                setTimeout(() => {
                    successMessage.classList.add('hidden');
                }, 5000);
            }, 800);
        }
    });

    // Focus/blur animations
    document.querySelectorAll('input, textarea').forEach(el => {
        el.addEventListener('focus', () => {
            el.parentElement.style.transform = 'translateY(-3px)';
        });
        el.addEventListener('blur', () => {
            el.parentElement.style.transform = '';
        });
    });

    // Helper functions
    function showError(fieldId, message) {
        const errorSpan = document.getElementById(`${fieldId}Error`);
        errorSpan.textContent = message;
    }

    function clearErrors() {
        document.querySelectorAll('.error').forEach(el => el.textContent = '');
    }


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
});