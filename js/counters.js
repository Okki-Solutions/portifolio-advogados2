/* ============================================
   CONTADORES ANIMADOS
   ============================================ */

function initCounters() {
    const counters = document.querySelectorAll('.indicador-numero');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const count = parseInt(el.dataset.count);
                if (!isNaN(count) && el.textContent === '0') {
                    animateCounter(el);
                }
                observer.unobserve(el);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => observer.observe(counter));
}

function animateCounter(el) {
    const target = parseInt(el.dataset.count);
    if (isNaN(target)) return;
    let current = 0;
    const increment = Math.ceil(target / 80); // 80 passos
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            el.textContent = target + (target > 100 ? '+' : '%');
            clearInterval(timer);
        } else {
            el.textContent = current;
        }
    }, 20);
}

// Exporta
window.initCounters = initCounters;
window.animateCounter = animateCounter;