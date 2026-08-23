// ============================================================
// RESENHAS & ETC — HOMEPAGE LOGIC (app.js)
// ============================================================

document.addEventListener('DOMContentLoaded', () => {

    const urlParams = new URLSearchParams(window.location.search);
    let currentCategory = urlParams.get('cat') || 'todos';
    let searchQuery = '';

    // ── SEARCH ────────────────────────────────────────────
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
        searchInput.addEventListener('input', e => {
            searchQuery = e.target.value.toLowerCase().trim();
            renderContent();
        });
    }

    // ── MAIN RENDER ───────────────────────────────────────
    function renderContent() {
        const mainArea = document.getElementById('main-area');
        mainArea.innerHTML = '';

        // Combine CATALOG items and BLOG_POSTS items
        const allItems = (typeof BLOG_POSTS !== 'undefined') ? [...BLOG_POSTS, ...CATALOG] : CATALOG;

        let filtered = allItems.filter(item => {
            const matchCat = currentCategory === 'todos' || item.category === currentCategory;
            const matchSearch = !searchQuery ||
                item.title.toLowerCase().includes(searchQuery) ||
                (item.tagline && item.tagline.toLowerCase().includes(searchQuery)) ||
                (item.excerpt && item.excerpt.toLowerCase().includes(searchQuery)) ||
                (item.description && item.description.toLowerCase().includes(searchQuery));
            return matchCat && matchSearch;
        });

        if (filtered.length === 0) {
            mainArea.innerHTML = `
        <div class="empty-state">
          <div class="empty-icon">🔍</div>
          <p>Nenhum resultado encontrado para <strong>"${searchQuery}"</strong>.<br>Tente outro termo ou categoria.</p>
        </div>
      `;
            return;
        }

        // Featured section (only on 'todos' without search)
        if (currentCategory === 'todos' && !searchQuery) {
            renderFeatured(mainArea, allItems);
        }

        // Grouped sections by category
        if (currentCategory === 'todos' && !searchQuery) {
            CATEGORIES.filter(c => c.id !== 'todos').forEach(cat => {
                const items = filtered.filter(g => g.category === cat.id);
                if (items.length > 0) {
                    renderSection(mainArea, cat, items);
                }
            });
        } else {
            // Single grid for filtered/searched results
            const wrapper = document.createElement('div');
            const grid = createCardGrid(filtered);
            wrapper.appendChild(grid);
            mainArea.appendChild(wrapper);
        }

        // Scroll to top on category change
        document.querySelector('.main-content').scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    // ── FEATURED BLOCK ────────────────────────────────────
    function renderFeatured(container, items) {
        const featured = items.filter(g => g.featured);
        if (featured.length === 0) return;

        const main = featured.find(g => g.featuredMain) || featured[0];
        const sides = featured.filter(g => g.id !== main.id).slice(0, 3);

        const section = document.createElement('div');
        section.innerHTML = `
      <div class="section-header">
        <h2 class="section-title">Em destaque</h2>
      </div>
    `;

        const grid = document.createElement('div');
        grid.className = 'featured-grid';

        // Main featured card
        const mainCard = document.createElement('div');
        mainCard.className = 'featured-card';
        mainCard.onclick = () => goToGame(main);
        
        let mainBriefDesc = main.tagline || main.excerpt || '';
        if (!mainBriefDesc && main.description) {
            const firstParagraph = main.description.split('\n')[0];
            mainBriefDesc = firstParagraph.length > 150 ? firstParagraph.substring(0, 150) + '...' : firstParagraph;
        }

        const mainBadge = main.categoryLabel || getCatLabel(main.category);
        const mainMetaRating = main.rating ? `⭐ ${main.rating}` : (main.readTime || 'Última Postagem');

        mainCard.innerHTML = `
      <img src="${main.cover}" alt="${main.title}" class="featured-thumb" loading="lazy">
      <div class="featured-info">
        <div class="featured-meta">
          <span class="featured-badge">${mainBadge}</span>
          <span>${mainMetaRating}</span>
          ${main.isRentable ? '<span>Disponível para aluguel</span>' : ''}
        </div>
        <h2 class="featured-title">${main.title}</h2>
        <p class="featured-desc">${mainBriefDesc}</p>
        <span class="btn-featured">${main.isBlog ? 'Ler artigo' : 'Ver completo'} <span>→</span></span>
      </div>
    `;
        grid.appendChild(mainCard);

        // Side cards
        if (sides.length > 0) {
            const sideCol = document.createElement('div');
            sideCol.className = 'featured-side';
            sides.forEach(item => {
                const sideCard = document.createElement('div');
                sideCard.className = 'featured-side-card';
                sideCard.onclick = () => goToGame(item);
                
                let sideBriefDesc = item.tagline || item.excerpt || '';
                if (!sideBriefDesc && item.description) {
                    const firstParagraph = item.description.split('\n')[0];
                    sideBriefDesc = firstParagraph.length > 150 ? firstParagraph.substring(0, 150) + '...' : firstParagraph;
                }

                const sideBadge = item.categoryLabel || getCatLabel(item.category);
                const sideMetaRating = item.rating ? `⭐ ${item.rating}` : (item.date || 'Postagem');

                sideCard.innerHTML = `
            <img src="${item.cover}" alt="${item.title}" class="featured-side-thumb" loading="lazy">
            <div class="featured-side-info">
              <span class="featured-side-badge">${sideBadge}</span>
              <div class="featured-side-title">${item.title}</div>
              <p class="featured-side-desc">${sideBriefDesc}</p>
              <span style="font-size:0.75rem;color:var(--primary-light);margin-top:0.4rem;display:block;">${sideMetaRating} — Ler mais →</span>
            </div>
          `;
                sideCol.appendChild(sideCard);
            });
            grid.appendChild(sideCol);
        }

        section.appendChild(grid);
        container.appendChild(section);
    }

    // ── SECTION WITH CARDS ────────────────────────────────
    function renderSection(container, cat, items) {
        const urlSlugs = {
            'tabuleiro': 'jogos',
            'digital': 'jogos',
            'livros': 'livros',
            'quadrinhos': 'quadrinhos',
            'filmes': 'filmes-series',
            'etc': 'etc'
        };

        const slug = urlSlugs[cat.id] || cat.id;
        
        let sectionUrl = `/resenhas/${slug}`;
        if (cat.id === 'tabuleiro') {
            sectionUrl = `/jogos-tabuleiro`;
        } else if (cat.id === 'etc') {
            sectionUrl = `/etc`;
        }

        const section = document.createElement('div');
        section.innerHTML = `
      <div class="section-header">
        <h2 class="section-title">${cat.icon} ${cat.label}</h2>
        <a href="${sectionUrl}" class="section-link" style="text-decoration: none;">Ver todos →</a>
      </div>
    `;
        section.appendChild(createCardGrid(items));
        container.appendChild(section);
    }

    // ── CARD GRID ─────────────────────────────────────────
    function createCardGrid(items) {
        const grid = document.createElement('div');
        grid.className = 'cards-grid';
        items.forEach(item => {
            grid.appendChild(createCard(item));
        });
        return grid;
    }

    // ── SINGLE CARD ───────────────────────────────────────
    function createCard(item) {
        const card = document.createElement('div');
        card.className = 'game-card';
        card.onclick = () => goToGame(item);
        card.setAttribute('role', 'button');
        card.setAttribute('tabindex', '0');
        card.setAttribute('aria-label', `Ver detalhes de ${item.title}`);
        card.onkeydown = (e) => { if (e.key === 'Enter') goToGame(item); };

        const stars = item.rating ? `${renderStars(item.rating)} ${item.rating}` : (item.date || 'Postagem');
        let priceStr = item.isBlog ? 'Artigo Blog' : 'Resenha';
        if (item.isRentable && item.rental7) {
            priceStr = `Aluguel a partir de R$ ${item.rental7.toFixed(2).replace('.', ',')}`;
        } else if (item.marketPrice) {
            priceStr = `R$ ${item.marketPrice.toFixed(2).replace('.', ',')}`;
        }

        let cardBriefDesc = item.tagline || item.excerpt || '';
        if (!cardBriefDesc && item.description) {
            const firstParagraph = item.description.split('\n')[0];
            cardBriefDesc = firstParagraph.length > 150 ? firstParagraph.substring(0, 150) + '...' : firstParagraph;
        }

        const badgeLabel = item.categoryLabel || getCatLabel(item.category);

        card.innerHTML = `
      <div class="card-cover-wrap">
        <img src="${item.cover}" alt="${item.title}" class="card-cover" loading="lazy">
        <span class="card-badge">${badgeLabel}</span>
        ${item.isRentable ? '<span class="card-rentable-badge">Aluguel</span>' : ''}
      </div>
      <div class="card-body">
        <div class="card-title">${item.title}</div>
        <p class="card-tagline">${cardBriefDesc}</p>
        <div class="card-meta">
          <span class="card-rating">${stars}</span>
          <span class="card-price">${priceStr}</span>
        </div>
        <button class="btn-card">${item.isBlog ? 'Ler artigo' : 'Ver completo'}</button>
      </div>
    `;
        return card;
    }

    // ── HELPERS ───────────────────────────────────────────
    function goToGame(item) {
        if (item.isBlog || item.url) {
            window.location.href = item.url || `/etc/${item.id}`;
            return;
        }

        const categorySlugs = {
            tabuleiro: 'jogos-tabuleiro',
            digital: 'jogos-digitais',
            quadrinhos: 'quadrinhos',
            livros: 'livros',
            filmes: 'filmes-series'
        };
        const slug = categorySlugs[item.category] || item.category;
        
        if (item.category === 'tabuleiro') {
            window.location.href = `/${slug}/${item.id}`;
        } else {
            window.location.href = `/resenhas/${slug}/${item.id}`;
        }
    }

    function getCatLabel(catId) {
        const c = CATEGORIES.find(c => c.id === catId);
        return c ? c.label : catId;
    }

    function renderStars(rating) {
        const full = Math.floor(rating);
        const half = rating % 1 >= 0.5;
        let s = '';
        for (let i = 0; i < full; i++) s += '★';
        if (half) s += '½';
        return s;
    }

    // Expose for inline onclick
    window.filterCategory = (catId) => {
        currentCategory = catId;
        renderContent();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // ── INITIALIZE DATA ───────────────────────────────────
    function init() {
        try {
            // CATALOG & BLOG_POSTS are globally available from js/data.js
            
            // ── HERO ACTIVE STATS ─────────────────────────────────
            const boardGamesCount = CATALOG.filter(g => g.category === 'tabuleiro').length;
            const rentableCount = CATALOG.filter(g => g.isRentable).length;
            const totalCount = CATALOG.length + (typeof BLOG_POSTS !== 'undefined' ? BLOG_POSTS.length : 0);
            const statEl = document.querySelectorAll('.hero-stat-num');
            if (statEl.length >= 3) {
                statEl[0].textContent = totalCount + '+';
                statEl[1].textContent = boardGamesCount;
                statEl[2].textContent = rentableCount;
            }

            // ── INITIAL RENDER ────────────────────────────────────
            renderContent();
        } catch (err) {
            console.error('Erro ao carregar o catálogo:', err);
            document.getElementById('main-area').innerHTML = `
                <div class="empty-state">
                    <p>Erro ao carregar os dados. Certifique-se de que os arquivos JS estão carregados.</p>
                </div>
            `;
        }
    }

    init();
});