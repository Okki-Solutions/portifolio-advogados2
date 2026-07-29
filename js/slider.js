/* ============================================
   DEPOIMENTOS SLIDER
   ============================================ */

let currentSlide = 0;
let slideInterval;

const depoimentosData = [
    {
        nome: 'Mariana Silva',
        avatar: '👩‍⚖️',
        estrelas: 5,
        texto: 'Atendimento impecável! A Dra. Ingrid resolveu meu caso com muita competência e empatia. Recomendo fortemente.'
    },
    {
        nome: 'Carlos Mendes',
        avatar: '👨‍💼',
        estrelas: 5,
        texto: 'Profissional extremamente dedicada e transparente. Me orientou em todas as etapas e alcançamos um excelente resultado.'
    },
    {
        nome: 'Fernanda Costa',
        avatar: '👩‍💻',
        estrelas: 5,
        texto: 'Sensibilidade e técnica andam juntas no trabalho da Dra. Ingrid. Me senti acolhida e segura durante todo o processo.'
    },
    {
        nome: 'Roberto Alves',
        avatar: '👨‍🏫',
        estrelas: 4,
        texto: 'Ótima experiência. A consultoria preventiva evitou problemas maiores. Agradeço pelo profissionalismo.'
    },
    {
        nome: 'Juliana Pereira',
        avatar: '👩‍🎓',
        estrelas: 5,
        texto: 'Resolveu meu divórcio com agilidade e discrição. Indico para todos os meus amigos.'
    },
    {
        nome: 'Paulo Henrique',
        avatar: '👨‍⚕️',
        estrelas: 5,
        texto: 'Excelente advogada, sempre disponível para esclarecer dúvidas. Resultado superou minhas expectativas.'
    }
];

function initSlider() {
    const track = document.getElementById('depoimentosTrack');
    const dotsContainer = document.getElementById('depoimentosDots');
    const prevBtn = document.getElementById('prevDepoimento');
    const nextBtn = document.getElementById('nextDepoimento');

    if (!track || !dotsContainer) return;

    // Renderiza cards
    depoimentosData.forEach((dep, index) => {
        const card = document.createElement('div');
        card.className = 'depoimento-card';
        card.innerHTML = `
            <div class="depoimento-avatar">${dep.avatar}</div>
            <div class="depoimento-nome">${dep.nome}</div>
            <div class="depoimento-estrelas">${'⭐'.repeat(dep.estrelas)}</div>
            <div class="depoimento-texto">"${dep.texto}"</div>
        `;
        track.appendChild(card);

        // Dots
        const dot = document.createElement('button');
        dot.className = 'slider-dot' + (index === 0 ? ' active' : '');
        dot.dataset.index = index;
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });

    // Ajusta largura dos cards
    updateCardWidth();

    // Eventos
    if (prevBtn) prevBtn.addEventListener('click', () => goToSlide(currentSlide - 1));
    if (nextBtn) nextBtn.addEventListener('click', () => goToSlide(currentSlide + 1));

    // Auto-play
    startAutoPlay();

    // Pausa no hover
    const slider = document.querySelector('.depoimentos-slider');
    slider.addEventListener('mouseenter', stopAutoPlay);
    slider.addEventListener('mouseleave', startAutoPlay);

    // Window resize
    window.addEventListener('resize', updateCardWidth);
}

function updateCardWidth() {
    const cards = document.querySelectorAll('.depoimento-card');
    if (!cards.length) return;
    // Calcula largura baseada no container
    const containerWidth = document.querySelector('.depoimentos-slider').clientWidth - 80;
    let cardsPerView = 3;
    if (window.innerWidth < 768) cardsPerView = 1;
    else if (window.innerWidth < 1024) cardsPerView = 2;

    const cardWidth = (containerWidth - (cardsPerView - 1) * 30) / cardsPerView;
    cards.forEach(card => {
        card.style.minWidth = cardWidth + 'px';
    });
    // Atualiza posição
    goToSlide(currentSlide, true);
}

function goToSlide(index, skipAnimation = false) {
    const track = document.getElementById('depoimentosTrack');
    const dots = document.querySelectorAll('.slider-dot');
    const total = depoimentosData.length;
    if (!track) return;

    // Loop infinito
    if (index < 0) index = total - 1;
    if (index >= total) index = 0;

    currentSlide = index;

    // Move track
    const cardWidth = track.querySelector('.depoimento-card')?.offsetWidth || 0;
    const gap = 30;
    const offset = -index * (cardWidth + gap);
    track.style.transform = `translateX(${offset}px)`;

    // Atualiza dots
    dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
    });
}

function startAutoPlay() {
    if (slideInterval) clearInterval(slideInterval);
    slideInterval = setInterval(() => {
        goToSlide(currentSlide + 1);
    }, 5000);
}

function stopAutoPlay() {
    if (slideInterval) {
        clearInterval(slideInterval);
        slideInterval = null;
    }
}

// Exporta
window.initSlider = initSlider;