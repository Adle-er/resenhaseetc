// ============================================================
// RESENHAS & ETC — BLOG / ETECÉTERA LOGIC (etc.js)
// ============================================================

const BLOG_POSTS = [
  {
    id: "vazamentos-gta-vi",
    title: "Vazamentos de GTA 6: O que se sabe até o momento",
    category: "noticias",
    categoryLabel: "📰 Notícias",
    date: "23 de Agosto, 2026",
    readTime: "7 min de leitura",
    author: "Resenhas & Etc",
    cover: "https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?auto=format&fit=crop&w=1200&q=80",
    excerpt: "Confira o resumo completo dos vazamentos de GTA 6, com vídeos do Cyberleek, reação da Take-Two e data da gameplay oficial.",
    featured: true    
  }  
];

document.addEventListener('DOMContentLoaded', () => {
  const bodyEl = document.querySelector('body[data-category]');
  const pageCategory = bodyEl ? bodyEl.getAttribute('data-category') : 'todos';
  renderBlogPage(pageCategory);
});

function renderBlogPage(category) {
  const container = document.getElementById('blog-container');
  if (!container) return;

  container.innerHTML = '';

  // Filter posts based on category
  const filtered = (category === 'todos' || !category)
    ? BLOG_POSTS
    : BLOG_POSTS.filter(post => post.category === category);

  if (filtered.length === 0) {
    container.innerHTML = `
      <div class="empty-state" style="text-align: center; padding: 4rem 1rem;">
        <div style="font-size: 3rem; margin-bottom: 1rem;">🔍</div>
        <p style="color: var(--text-secondary); font-size: 1.1rem;">Nenhum artigo encontrado nesta categoria no momento.</p>
      </div>
    `;
    return;
  }

  // Highlighted / Featured Post
  const featuredPost = filtered.find(p => p.featured) || (category === 'lancamentos' ? filtered[0] : null);

  if (featuredPost && category !== 'noticias') {
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
        ${category === 'lancamentos' ? '🚀 Mais Lançamentos & Destaques' : '📰 Publicações'}
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

function goToPost(postId) {
  window.location.href = `/etc/${postId}`;
}

function createFeaturedPostCard(post) {
  const wrapper = document.createElement('div');
  wrapper.className = 'blog-featured-card';
  wrapper.onclick = () => goToPost(post.id);

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
        <a href="/etc/${post.id}" class="btn-read-more" onclick="event.stopPropagation();">Ler artigo completo →</a>
      </div>
    </div>
  `;
  return wrapper;
}

function createPostCard(post) {
  const card = document.createElement('div');
  card.className = 'blog-card';
  card.onclick = () => goToPost(post.id);

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
        <a href="/etc/${post.id}" class="btn-read-link" onclick="event.stopPropagation();">Ler mais →</a>
      </div>
    </div>
  `;
  return card;
}

window.goToPost = goToPost;
