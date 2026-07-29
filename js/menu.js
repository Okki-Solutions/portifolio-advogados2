/* ============================================
   MENU MOBILE
   ============================================ */

let menuOpen = false;

function initMenu() {
    const toggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (!toggle || !navMenu) return;

    toggle.addEventListener('click', function() {
        menuOpen = !menuOpen;
        this.classList.toggle('active');
        navMenu.classList.toggle('open');
        this.setAttribute('aria-expanded', menuOpen);
        document.body.style.overflow = menuOpen ? 'hidden' : '';
    });

    // Fecha menu ao clicar em um link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (menuOpen) {
                toggle.classList.remove('active');
                navMenu.classList.remove('open');
                toggle.setAttribute('aria-expanded', 'false');
                menuOpen = false;
                document.body.style.overflow = '';
            }
        });
    });

    // Fecha menu ao clicar fora (opcional)
    document.addEventListener('click', function(e) {
        if (menuOpen && !navMenu.contains(e.target) && !toggle.contains(e.target)) {
            toggle.classList.remove('active');
            navMenu.classList.remove('open');
            toggle.setAttribute('aria-expanded', 'false');
            menuOpen = false;
            document.body.style.overflow = '';
        }
    });
}

// Exporta para uso no script principal
window.initMenu = initMenu;