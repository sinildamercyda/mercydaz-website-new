// DOM Elements
const openModalBtn = document.getElementById('open-modal-btn');
const modalTriggerBtn = document.getElementById('modal-trigger-btn');
const modal = document.getElementById('modal-specs');
const closeButtons = document.querySelectorAll('[data-close-button]');
const modalOverlay = document.querySelector('.modal-overlay');

// Open Modal
function openModal() {
  modal.classList.add('active');
  document.body.style.overflow = 'hidden'; 
}

// Close Modal
function closeModal() {
  modal.classList.remove('active');
  document.body.style.overflow = '';    
}

// Event Listeners
openModalBtn?.addEventListener('click', openModal);
modalTriggerBtn?.addEventListener('click', openModal);

closeButtons.forEach(button => {
  button.addEventListener('click', closeModal);
});

modalOverlay?.addEventListener('click', closeModal);

// Close on ESC
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && modal.classList.contains('active')) {
    closeModal();
  }
});

// Intersection Observer for Scroll Animations
const observerOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('appear');
    }
  });
}, observerOptions);

// Observe all fade-in sections
document.querySelectorAll('.section').forEach(section => {
  section.classList.add('fade-in');
  observer.observe(section);
});

// Optional: Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      window.scrollTo({
        top: target.offsetTop - 80,
        behavior: 'smooth'
      });
    }
  });
});

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
