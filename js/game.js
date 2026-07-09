// Executa imediatamente, já que o script fica no final do body
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initRentalLogic);
} else {
    initRentalLogic();
}

function initRentalLogic() {
    // Inicializa a galeria de imagens e lightbox
    initLightbox();

    // 1. Deduzir qual jogo estamos vendo a partir do nome do arquivo
    const pathParts = window.location.pathname.split('/');
    let filename = pathParts[pathParts.length - 1] || '';
    let gameId = filename.replace('.html', '');

    console.log('[game.js] pathname:', window.location.pathname);
    console.log('[game.js] gameId detectado:', gameId);

    if (!gameId || gameId === 'index') {
        const params = new URLSearchParams(window.location.search);
        gameId = params.get('id');
        console.log('[game.js] gameId via query param:', gameId);
    }

    if (typeof CATALOG === 'undefined') {
        console.error('[game.js] CATALOG não encontrado. Verifique se data.js está carregado.');
        return;
    }

    console.log('[game.js] CATALOG carregado, total de itens:', CATALOG.length);

    const game = CATALOG.find(g => g.id === gameId);
    if (!game) {
        console.error('[game.js] Jogo "' + gameId + '" não encontrado no CATALOG. IDs disponíveis:', CATALOG.map(g => g.id));
        return;
    }

    console.log('[game.js] Jogo encontrado:', game.title, '| isRentable:', game.isRentable);

    // ── Atualiza a imagem cover automaticamente a partir do data.js ──
    // coverDetail  → imagem da página individual do jogo
    // cover        → fallback (também usado nos cards do index)
    const detailImage = game.coverDetail || game.cover;
    if (detailImage) {
        const coverEl = document.getElementById('detail-cover');
        if (coverEl) {
            // O HTML está em jogos-tabuleiro/, então caminhos relativos precisam de ../
            const coverPath = detailImage.startsWith('http')
                ? detailImage
                : '../' + detailImage;
            coverEl.src = coverPath;
            coverEl.alt = game.title;
        }
    }

    // Atualiza o link de afiliado, se existir
    const btnBuy = document.getElementById('btn-buy');
    if (btnBuy && game.affiliateLink && game.affiliateLink !== '#') {
        btnBuy.href = game.affiliateLink;
    }

    const btnAlugar = document.getElementById('btn-alugar');
    console.log('[game.js] btn-alugar encontrado:', btnAlugar);
    if (!btnAlugar) {
        console.error('[game.js] Botão #btn-alugar NÃO encontrado no HTML!');
        return;
    }

    if (!game.isRentable) {
        btnAlugar.style.display = 'none'; // Esconde se não for alugável
        return;
    }

    // 2. Criar e injetar o Modal no body
    const modalHTML = `
    <div class="modal-overlay" id="rental-modal">
        <div class="modal">
            <button id="close-modal" style="position:absolute; top:1rem; right:1rem; background:transparent; border:none; font-size:1.5rem; cursor:pointer; color:var(--text);">&times;</button>
            <h2 style="margin-top:0;">Alugar ${game.title}</h2>
            
            <p>Selecione o pacote:</p>
            <div style="display:flex; gap:1rem; margin-bottom:1.5rem;">
                <button id="pkg-7" class="btn-pkg" style="flex:1; padding:1rem; border:2px solid var(--border); border-radius:8px; background:transparent; cursor:pointer; color:var(--text);">
                    <strong>7 dias</strong><br><span style="color:var(--primary)">R$ ${game.rental7.toFixed(2).replace('.', ',')}</span>
                </button>
                <button id="pkg-15" class="btn-pkg" style="flex:1; padding:1rem; border:2px solid var(--border); border-radius:8px; background:transparent; cursor:pointer; color:var(--text);">
                    <strong>15 dias</strong><br><span style="color:var(--primary)">R$ ${game.rental15.toFixed(2).replace('.', ',')}</span>
                </button>
            </div>

            <div id="calendar-area" style="display:none;">
                <p>Selecione a data de início:</p>
                <!-- Calendário super simples -->
                <input type="date" id="rental-date" style="width:100%; padding:0.75rem; border-radius:8px; border:1px solid var(--border); background:var(--bg); color:var(--text); font-size:1rem; margin-bottom:1.5rem;">
                
                <button id="btn-confirm-whatsapp" class="btn-primary" style="width:100%; padding:1rem; border-radius:8px; font-weight:bold; cursor:pointer; font-size:1.1rem;">
                    Verificar disponibilidade
                </button>
            </div>
        </div>
    </div>
    <style>
        .btn-pkg.selected { border-color: var(--primary) !important; background: rgba(var(--primary-rgb, 107, 122, 255), 0.1) !important; }
    </style>
    `;

    document.body.insertAdjacentHTML('beforeend', modalHTML);

    const modal = document.getElementById('rental-modal');
    const closeBtn = document.getElementById('close-modal');
    const pkg7 = document.getElementById('pkg-7');
    const pkg15 = document.getElementById('pkg-15');
    const calendarArea = document.getElementById('calendar-area');
    const rentalDate = document.getElementById('rental-date');
    const btnConfirm = document.getElementById('btn-confirm-whatsapp');

    // Impede data passada
    const today = new Date().toISOString().split('T')[0];
    rentalDate.setAttribute('min', today);

    let selectedDays = 0;

    btnAlugar.addEventListener('click', () => {
        modal.classList.add('open');
        document.body.style.overflow = 'hidden';
    });

    function closeModal() {
        modal.classList.remove('open');
        document.body.style.overflow = '';
    }

    closeBtn.addEventListener('click', closeModal);

    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });

    pkg7.addEventListener('click', () => {
        selectedDays = 7;
        pkg7.classList.add('selected');
        pkg15.classList.remove('selected');
        calendarArea.style.display = 'block';
    });

    pkg15.addEventListener('click', () => {
        selectedDays = 15;
        pkg15.classList.add('selected');
        pkg7.classList.remove('selected');
        calendarArea.style.display = 'block';
    });

    btnConfirm.addEventListener('click', () => {
        if (!rentalDate.value) {
            alert("Por favor, selecione uma data de início.");
            return;
        }

        // Formatar a data para DD/MM/AAAA
        const [year, month, day] = rentalDate.value.split('-');
        const dataFormatada = `${day}/${month}/${year}`;
        const diasStr = selectedDays === 7 ? "7 dias" : "15 dias";

        // Mensagem: "Olá, estou no site do Resenhas e ETC e gostaria de estar alugando o jogo $nomedojogo por $diaslocacao a partir do dia $iniciolocacao"
        const message = `Olá, estou no site do Resenhas e ETC e gostaria de estar alugando o jogo *${game.title}* por *${diasStr}* a partir do dia *${dataFormatada}*.`;
        
        const phoneNumber = "5511977661127";
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
        
        window.open(whatsappUrl, '_blank');
        modal.style.display = 'none';
    });
}

// ─── GALERIA DE IMAGENS & LIGHTBOX ───
function initLightbox() {
    const thumbs = document.querySelectorAll('.gallery-thumb');
    if (thumbs.length === 0) return;

    console.log('[game.js] Inicializando lightbox para', thumbs.length, 'thumbnails');

    // Cria o overlay do lightbox se ele não existir
    let overlay = document.getElementById('lightbox-overlay');
    if (!overlay) {
        overlay = document.createElement('div');
        overlay.id = 'lightbox-overlay';
        overlay.className = 'lightbox-overlay';
        overlay.innerHTML = `
            <div class="lightbox-content">
                <button class="lightbox-close" aria-label="Fechar">&times;</button>
                <img class="lightbox-img" src="" alt="Imagem ampliada">
                <div class="lightbox-caption"></div>
            </div>
        `;
        document.body.appendChild(overlay);

        const closeBtn = overlay.querySelector('.lightbox-close');

        // Fechar ao clicar no overlay ou no botão fechar
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay || e.target === closeBtn) {
                overlay.classList.remove('open');
                document.body.style.overflow = '';
            }
        });

        // Fechar ao pressionar Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && overlay.classList.contains('open')) {
                overlay.classList.remove('open');
                document.body.style.overflow = '';
            }
        });
    }

    const lightboxImg = overlay.querySelector('.lightbox-img');
    const lightboxCaption = overlay.querySelector('.lightbox-caption');

    thumbs.forEach(thumb => {
        // Acessibilidade
        thumb.setAttribute('role', 'button');
        thumb.setAttribute('tabindex', '0');

        const openLightbox = () => {
            const fullSrc = thumb.getAttribute('data-full') || thumb.src;
            lightboxImg.src = fullSrc;
            lightboxCaption.textContent = thumb.alt || '';
            overlay.classList.add('open');
            document.body.style.overflow = 'hidden'; // Impede rolagem da página
        };

        thumb.addEventListener('click', openLightbox);
        thumb.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                openLightbox();
            }
        });
    });
}
