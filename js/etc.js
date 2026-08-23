// ============================================================
// RESENHAS & ETC — BLOG / ETECÉTERA LOGIC (etc.js)
// ============================================================

const BLOG_POSTS = [
  {
    id: "lancamentos-tabuleiro-2026",
    title: "Os Lançamentos de Jogos de Tabuleiro Mais Aguardados do Ano",
    category: "lancamentos",
    categoryLabel: "🚀 Lançamentos",
    date: "18 de Agosto, 2026",
    readTime: "5 min de leitura",
    author: "Equipe Resenhas & Etc",
    cover: "https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?auto=format&fit=crop&w=1200&q=80",
    excerpt: "Confira a seleção imperdível dos maiores títulos e expansões de jogos de tabuleiro confirmados para o mercado nacional e internacional nesta temporada.",
    featured: true,
    content: `
      <p>O mercado de jogos de tabuleiro continua crescendo em um ritmo impressionante. Para este ano, tanto grandes editoras nacionais quanto desenvolvedoras independentes prepararam anúncios de tirar o fôlego.</p>
      
      <h3>O que vem por aí em Jogos de Tabuleiro?</h3>
      <p>Entre os destaques mais aguardados pelos boardgamers, temos expansões altamente solicitadas para jogos de estratégia, além de novas edições com componentes aprimorados e regras revisadas.</p>

      <ul>
        <li><strong>Eurogames de Alta Complexidade:</strong> Novos títulos focados em gestão de recursos e motor de pontos com mecânicas inovadoras.</li>
        <li><strong>Jogos Cooperativos & Dungeon Crawlers:</strong> Sucessores espirituais com campanhas imersivas e miniaturas detalhadas.</li>
        <li><strong>Jogos Rápidos e Party Games:</strong> Opções leves e acessíveis para reunir amigos e família.</li>
      </ul>

      <blockquote style="border-left: 4px solid var(--orange); padding-left: 1rem; margin: 1.5rem 0; font-style: italic; color: var(--text-secondary);">
        "O design moderno de jogos de tabuleiro encontrou um equilíbrio fantástico entre imersão temática e elegância nas regras."
      </blockquote>

      <p>Fique atento às nossas resenhas detalhadas conforme cada um desses lançamentos chegar ao nosso catálogo e serviço de aluguel!</p>
    `
  },
  {
    id: "lancamentos-digitais-destaques",
    title: "Lançamentos Digitais: Games que Prometem Dominar os Consoles e PC",
    category: "lancamentos",
    categoryLabel: "🚀 Lançamentos",
    date: "15 de Agosto, 2026",
    readTime: "4 min de leitura",
    author: "Redação Games",
    cover: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80",
    excerpt: "Uma visão geral dos jogos eletrônicos mais promissores lançados recentemente, abrangendo de grandes produções RPGs a títulos indie criativos.",
    featured: false,
    content: `
      <p>O universo dos games digitais segue entregando experiências memoráveis. Nos últimos meses, presenciamos lançamentos marcantes nas plataformas PlayStation, Xbox, Nintendo e PC.</p>

      <h3>Tendências dos Novos Lançamentos</h3>
      <p>Direções artísticas estilizadas, narrativas profundas e mecânicas refinadas continuam sendo os principais pilares dos jogos mais elogiados da temporada.</p>

      <p>Em breve publicaremos análises completas de cada um desses grandes lançamentos aqui no portal Resenhas & Etc.</p>
    `
  },
  {
    id: "novidades-mercado-editorial",
    title: "Lançamentos Literários e Quadrinhos: O Que Ler a Seguir",
    category: "lancamentos",
    categoryLabel: "🚀 Lançamentos",
    date: "10 de Agosto, 2026",
    readTime: "6 min de leitura",
    author: "Curadoria de Livros & HQ",
    cover: "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=800&q=80",
    excerpt: "Confira as obras literárias e graphic novels recém-chegadas às livrarias que estão dando o que falar entre leitores e críticos.",
    featured: false,
    content: `
      <p>Para os apaixonados por leitura, o semestre está repleto de novidades incríveis. De ficção científica claustrofóbica a romances gráficos premiados, há opções para todos os públicos.</p>
      
      <p>Nossa equipe já está preparando artigos individuais e resenhas profundas sobre os principais lançamentos do mês!</p>
    `
  },
  {
    id: "bastidores-resenhas-etc",
    title: "Bem-vindo ao Etecétera: O Novo Espaço de Notícias e Artigos do Projeto",
    category: "noticias",
    categoryLabel: "📰 Notícias",
    date: "01 de Agosto, 2026",
    readTime: "3 min de leitura",
    author: "Resenhas & Etc",
    cover: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=800&q=80",
    excerpt: "Apresentamos o nosso canal de blog oficial! Aqui você acompanhará notícias, coberturas de lançamentos e conteúdos especiais além das nossas resenhas.",
    featured: false,
    content: `
      <p>É com muita alegria que inauguramos a seção <strong>Etecétera</strong>!</p>
      <p>Além das nossas tradicionais resenhas de jogos de tabuleiro, games digitais, livros, quadrinhos e filmes, este espaço será dedicado a artigos mais dinâmicos, análises de lançamentos, guias de compras e novidades do projeto.</p>
    `
  }
];

let currentCategory = 'todos';

document.addEventListener('DOMContentLoaded', () => {
  renderBlogPage();
});

function renderBlogPage() {
  const container = document.getElementById('blog-container');
  if (!container) return;

  container.innerHTML = '';

  // Filter posts based on currentCategory
  const filtered = currentCategory === 'todos'
    ? BLOG_POSTS
    : BLOG_POSTS.filter(post => post.category === currentCategory);

  if (filtered.length === 0) {
    container.innerHTML = `
      <div class="empty-state" style="text-align: center; padding: 4rem 1rem;">
        <div style="font-size: 3rem; margin-bottom: 1rem;">🔍</div>
        <p style="color: var(--text-secondary); font-size: 1.1rem;">Nenhum artigo encontrado para a categoria selecionada.</p>
      </div>
    `;
    return;
  }

  // Highlighted / Featured Post (if category is 'todos' or 'lancamentos')
  const featuredPost = filtered.find(p => p.featured) || (currentCategory === 'lancamentos' ? filtered[0] : null);

  if (featuredPost && currentCategory !== 'noticias') {
    const featuredHTML = createFeaturedPostCard(featuredPost);
    container.appendChild(featuredHTML);
  }

  // Grid for remaining posts
  const remaining = featuredPost ? filtered.filter(p => p.id !== featuredPost.id) : filtered;

  if (remaining.length > 0) {
    const sectionHeader = document.createElement('div');
    sectionHeader.className = 'section-header';
    sectionHeader.style.margin = '2.5rem 0 1.5rem';
    sectionHeader.innerHTML = `
      <h2 class="section-title" style="font-size: 1.6rem; font-weight: 800; color: var(--text);">
        ${currentCategory === 'lancamentos' ? '🚀 Mais Lançamentos & Destaques' : '📰 Últimas Publicações'}
      </h2>
    `;
    container.appendChild(sectionHeader);

    const grid = document.createElement('div');
    grid.className = 'blog-grid';
    remaining.forEach(post => {
      grid.appendChild(createPostCard(post));
    });
    container.appendChild(grid);
  }
}

function createFeaturedPostCard(post) {
  const wrapper = document.createElement('div');
  wrapper.className = 'blog-featured-card';
  wrapper.onclick = () => openArticleModal(post.id);

  wrapper.innerHTML = `
    <div class="blog-featured-cover-wrap">
      <img src="${post.cover}" alt="${post.title}" class="blog-featured-cover" loading="lazy">
      <span class="blog-badge">${post.categoryLabel}</span>
    </div>
    <div class="blog-featured-content">
      <div class="blog-meta">
        <span>📅 ${post.date}</span>
        <span>⏱️ ${post.readTime}</span>
      </div>
      <h2 class="blog-featured-title">${post.title}</h2>
      <p class="blog-featured-excerpt">${post.excerpt}</p>
      <div class="blog-author-row">
        <span class="blog-author-name">Por ${post.author}</span>
        <span class="btn-read-more">Ler artigo completo →</span>
      </div>
    </div>
  `;
  return wrapper;
}

function createPostCard(post) {
  const card = document.createElement('div');
  card.className = 'blog-card';
  card.onclick = () => openArticleModal(post.id);

  card.innerHTML = `
    <div class="blog-card-cover-wrap">
      <img src="${post.cover}" alt="${post.title}" class="blog-card-cover" loading="lazy">
      <span class="blog-badge">${post.categoryLabel}</span>
    </div>
    <div class="blog-card-body">
      <div class="blog-meta" style="font-size: 0.8rem; margin-bottom: 0.5rem; color: var(--text-muted); display: flex; gap: 0.8rem;">
        <span>📅 ${post.date}</span>
        <span>⏱️ ${post.readTime}</span>
      </div>
      <h3 class="blog-card-title">${post.title}</h3>
      <p class="blog-card-excerpt">${post.excerpt}</p>
      <div style="margin-top: 1rem; display: flex; justify-content: space-between; align-items: center;">
        <span style="font-size: 0.82rem; font-weight: 600; color: var(--text-secondary);">${post.author}</span>
        <span class="btn-read-link">Ler mais →</span>
      </div>
    </div>
  `;
  return card;
}

function filterBlogCategory(category, btnElement) {
  currentCategory = category;

  // Update active pill styling
  const pills = document.querySelectorAll('.blog-category-pill');
  pills.forEach(p => p.classList.remove('active'));
  if (btnElement) {
    btnElement.classList.add('active');
  }

  renderBlogPage();
}

function openArticleModal(postId) {
  const post = BLOG_POSTS.find(p => p.id === postId);
  if (!post) return;

  // Remove existing modal if any
  const existing = document.getElementById('blog-article-modal');
  if (existing) existing.remove();

  const modal = document.createElement('div');
  modal.id = 'blog-article-modal';
  modal.className = 'modal-overlay open';
  modal.style.position = 'fixed';
  modal.style.top = '0';
  modal.style.left = '0';
  modal.style.width = '100%';
  modal.style.height = '100%';
  modal.style.background = 'rgba(0, 0, 0, 0.7)';
  modal.style.backdropFilter = 'blur(8px)';
  modal.style.zIndex = '9999';
  modal.style.display = 'flex';
  modal.style.justifyContent = 'center';
  modal.style.alignItems = 'center';
  modal.style.padding = '1.5rem';

  modal.innerHTML = `
    <div class="modal" style="background: var(--white); border-radius: var(--radius-lg); max-width: 800px; width: 100%; max-height: 90vh; overflow-y: auto; padding: 2.5rem; position: relative; box-shadow: var(--shadow-lg);">
      <button onclick="closeArticleModal()" style="position: absolute; top: 1.2rem; right: 1.2rem; background: var(--grey-1); border: none; font-size: 1.4rem; width: 36px; height: 36px; border-radius: 50%; cursor: pointer; color: var(--text); display: flex; align-items: center; justify-content: center; transition: var(--transition);">&times;</button>
      
      <div style="display: flex; gap: 0.8rem; align-items: center; margin-bottom: 1rem; flex-wrap: wrap;">
        <span class="blog-badge" style="position: static;">${post.categoryLabel}</span>
        <span style="font-size: 0.85rem; color: var(--text-muted);">📅 ${post.date}</span>
        <span style="font-size: 0.85rem; color: var(--text-muted);">⏱️ ${post.readTime}</span>
      </div>

      <h1 style="font-size: 2rem; font-weight: 800; color: var(--text); margin-bottom: 1.2rem; line-height: 1.25;">${post.title}</h1>
      
      <div style="font-size: 0.95rem; color: var(--text-secondary); margin-bottom: 1.5rem; border-bottom: 1px solid var(--border); padding-bottom: 1rem;">
        Por <strong>${post.author}</strong>
      </div>

      <img src="${post.cover}" alt="${post.title}" style="width: 100%; max-height: 400px; object-fit: cover; border-radius: var(--radius); margin-bottom: 2rem;">

      <div class="article-body-content" style="font-size: 1.1rem; line-height: 1.8; color: var(--text);">
        ${post.content}
      </div>

      <div style="margin-top: 3rem; padding-top: 1.5rem; border-top: 1px solid var(--border); display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem;">
        <button onclick="closeArticleModal()" class="btn-primary" style="background: var(--orange); color: var(--white); padding: 0.6rem 1.5rem; border-radius: 50px; font-weight: 700;">Voltar ao Blog</button>
        <span style="color: var(--text-muted); font-size: 0.9rem;">Compartilhe esse lançamento! 🚀</span>
      </div>
    </div>
  `;

  document.body.appendChild(modal);
  document.body.style.overflow = 'hidden';

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeArticleModal();
  });
}

function closeArticleModal() {
  const modal = document.getElementById('blog-article-modal');
  if (modal) {
    modal.remove();
    document.body.style.overflow = 'auto';
  }
}

// Expose functions to global window scope for inline onclicks
window.filterBlogCategory = filterBlogCategory;
window.openArticleModal = openArticleModal;
window.closeArticleModal = closeArticleModal;
