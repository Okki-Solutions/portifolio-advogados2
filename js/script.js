/* ============================================
   SCRIPT PRINCIPAL - INICIALIZAÇÕES
   ============================================ */

document.addEventListener('DOMContentLoaded', function() {
    // Inicializa módulos
    initMenu();
    initSlider();
    initCounters();
    initScrollReveal();
    initFaq();
    initForm();
    initNavbarScroll();
    initRippleButtons();
    initParallax();

    // Atualiza indicadores ao carregar
    setTimeout(() => {
        document.querySelectorAll('.indicador-numero').forEach(el => {
            if (el.dataset.count) {
                animateCounter(el);
            }
        });
    }, 300);
});

// ============================================
// SCROLL NAVBAR
// ============================================
function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 60) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// ============================================
// RIPPLE BUTTONS
// ============================================
function initRippleButtons() {
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const ripple = document.createElement('span');
            ripple.className = 'ripple';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            this.appendChild(ripple);
            setTimeout(() => ripple.remove(), 600);
        });
    });
}

// ============================================
// PARALLAX SUAVE (HERO)
// ============================================
function initParallax() {
    const heroImage = document.querySelector('.hero-image');
    if (!heroImage) return;
    window.addEventListener('mousemove', function(e) {
        const x = (e.clientX / window.innerWidth - 0.5) * 8;
        const y = (e.clientY / window.innerHeight - 0.5) * 8;
        heroImage.style.transform = `translate(${x}px, ${y}px)`;
    });
}

// ============================================
// SCROLL REVEAL (chamado do scroll.js)
// ============================================
function initScrollReveal() {
    // A função principal está em scroll.js
    // Apenas garantimos que o observer seja ativado
    if (typeof observeReveal === 'function') {
        observeReveal();
    }
}