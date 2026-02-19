document.addEventListener("DOMContentLoaded", function () {

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