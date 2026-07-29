/* ============================================
   SCROLL REVEAL (animações ao rolar)
   ============================================ */

function observeReveal() {
    const elements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Se for um contador, ativa
                if (entry.target.classList.contains('indicador-numero')) {
                    const count = parseInt(entry.target.dataset.count);
                    if (!isNaN(count) && entry.target.textContent === '0') {
                        animateCounter(entry.target);
                    }
                }
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });

    elements.forEach(el => observer.observe(el));

    // Também observa os indicadores que podem não ter a classe reveal
    document.querySelectorAll('.indicador-numero').forEach(el => {
        if (!el.classList.contains('reveal')) {
            observer.observe(el);
        }
    });
}

// Adiciona classes reveal aos elementos (pode ser feito no HTML também)
document.addEventListener('DOMContentLoaded', function() {
    // Adiciona reveal a alguns elementos automaticamente
    document.querySelectorAll('.area-card, .diferencial-item, .timeline-item, .depoimento-card, .faq-item, .info-item, .contato-extra-item')
        .forEach((el, i) => {
            if (!el.classList.contains('reveal') && !el.classList.contains('reveal-left') && 
                !el.classList.contains('reveal-right') && !el.classList.contains('reveal-scale')) {
                // Aplica delay baseado no índice
                el.classList.add('reveal');
                el.style.transitionDelay = (i * 0.08) + 's';
            }
        });
});

// Exporta
window.initScrollReveal = observeReveal;