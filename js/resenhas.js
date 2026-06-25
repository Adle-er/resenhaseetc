// ============================================================
// RESENHAS & ETC — CATEGORY LISTINGS LOGIC (resenhas.js)
// ============================================================

document.addEventListener('DOMContentLoaded', () => {
    // 1. Detect which page we are on based on the body data-category attribute
    const bodyEl = document.querySelector('body[data-category]');
    if (!bodyEl) {
        console.warn('[resenhas.js] Atributo data-category não encontrado no body.');
        return;
    }
    
    const pageCategory = bodyEl.getAttribute('data-category'); // 'livros', 'jogos', 'quadrinhos', 'filmes-series'
    console.log('[resenhas.js] Categoria da página:', pageCategory);

    if (typeof CATALOG === 'undefined') {
        console.error('[resenhas.js] CATALOG não encontrado. Verifique se data.js está carregado.');
        return;
    }

    const gridContainer = document.getElementById('category-grid-container');
    if (!gridContainer) {
        console.error('[resenhas.js] Elemento #category-grid-container não encontrado.');
        return;
    }

    renderCategoryContent(pageCategory, gridContainer);
});

function renderCategoryContent(category, container) {
    container.innerHTML = '';

    if (category === 'jogos') {
        // Render games with digital and board games separated
        const boardGames = CATALOG.filter(item => item.category === 'tabuleiro');
        const digitalGames = CATALOG.filter(item => item.category === 'digital');

        // Section for Board Games
        if (boardGames.length > 0) {
            const secBoard = document.createElement('section');
            secBoard.className = 'category-section';
            secBoard.style.marginBottom = '3rem';
            secBoard.innerHTML = `
                <div class="section-header" style="margin-bottom: 1.5rem;">
                    <h2 class="section-title">♟️ Jogos de Tabuleiro</h2>
                </div>
            `;
            const grid = createCardGrid(boardGames);
            secBoard.appendChild(grid);
            container.appendChild(secBoard);
        }

        // Section for Digital Games
        if (digitalGames.length > 0) {
            const secDigital = document.createElement('section');
            secDigital.className = 'category-section';
            secDigital.innerHTML = `
                <div class="section-header" style="margin-bottom: 1.5rem;">
                    <h2 class="section-title">🎮 Jogos Digitais</h2>
                </div>
            `;
            const grid = createCardGrid(digitalGames);
            secDigital.appendChild(grid);
            container.appendChild(secDigital);
        }
    } else {
        // Standard single category rendering
        // Map pageCategory to data.js category slugs
        const categoryMap = {
            'livros': 'livros',
            'quadrinhos': 'quadrinhos',
            'filmes-series': 'filmes'
        };
        const catId = categoryMap[category] || category;
        const items = CATALOG.filter(item => item.category === catId);

        if (items.length === 0) {
            container.innerHTML = `
                <div class="empty-state">
                    <p>Nenhuma resenha disponível nesta categoria no momento.</p>
                </div>
            `;
            return;
        }

        const grid = createCardGrid(items);
        container.appendChild(grid);
    }
}

function createCardGrid(items) {
    const grid = document.createElement('div');
    grid.className = 'cards-grid';
    items.forEach(item => {
        grid.appendChild(createCard(item));
    });
    return grid;
}

function createCard(item) {
    const card = document.createElement('div');
    card.className = 'game-card';
    card.onclick = () => goToGame(item);
    card.setAttribute('role', 'button');
    card.setAttribute('tabindex', '0');
    card.setAttribute('aria-label', `Ver detalhes de ${item.title}`);
    card.onkeydown = (e) => { if (e.key === 'Enter') goToGame(item); };

    const stars = renderStars(item.rating);
    let priceStr = 'Resenha';
    if (item.isRentable && item.rental7) {
        priceStr = `Aluguel a partir de R$ ${item.rental7.toFixed(2).replace('.', ',')}`;
    } else if (item.marketPrice) {
        priceStr = `R$ ${item.marketPrice.toFixed(2).replace('.', ',')}`;
    }

    let cardBriefDesc = item.tagline || '';

    // Fix cover path to be relative to root since pages are in a subdirectory
    const coverPath = item.cover.startsWith('http') ? item.cover : '../' + item.cover;

    card.innerHTML = `
      <div class="card-cover-wrap">
        <img src="${coverPath}" alt="${item.title}" class="card-cover" loading="lazy">
        <span class="card-badge">${getCatLabel(item.category)}</span>
        ${item.isRentable ? '<span class="card-rentable-badge">Aluguel</span>' : ''}
      </div>
      <div class="card-body">
        <div class="card-title">${item.title}</div>
        <p class="card-tagline">${cardBriefDesc}</p>
        <div class="card-meta">
          <span class="card-rating">${stars} ${item.rating}</span>
          <span class="card-price">${priceStr}</span>
        </div>
        <button class="btn-card">Ver completo</button>
      </div>
    `;
    return card;
}

function goToGame(item) {
    const categorySlugs = {
        tabuleiro: 'jogos-tabuleiro',
        digital: 'jogos-digitais',
        quadrinhos: 'quadrinhos',
        livros: 'livros',
        filmes: 'filmes'
    };
    const slug = categorySlugs[item.category] || item.category;
    window.location.href = `/${slug}/${item.id}`;
}

function getCatLabel(catId) {
    const categories = {
        'todos': 'Todos',
        'tabuleiro': 'Jogos de tabuleiro',
        'digital': 'Jogos digitais',
        'quadrinhos': 'Quadrinhos',
        'livros': 'Livros',
        'filmes': 'Filmes'
    };
    return categories[catId] || catId;
}

function renderStars(rating) {
    const full = Math.floor(rating);
    const half = rating % 1 >= 0.5;
    let s = '';
    for (let i = 0; i < full; i++) s += '★';
    if (half) s += '½';
    return s;
}
