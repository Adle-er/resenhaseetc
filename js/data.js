// ============================================================
// RESENHAS & ETC — CATÁLOGO DE DADOS
// ============================================================
// JOGOS DE TABULEIRO: possuem isRentable, affiliateLink, preços.
// DEMAIS CATEGORIAS (digital, quadrinhos, livros, filmes, blog):
//   são SOMENTE RESENHA / BLOG — sem preço, sem aluguel, sem afiliado.
//   Marque reviewOnly: true nesses itens.
// ============================================================

// ─── METADADOS DAS CATEGORIAS ───────────────────────────
const CATEGORIES = [
  { id: "todos", label: "Todos", icon: "🎲" },
  { id: "tabuleiro", label: "Jogos de tabuleiro", icon: "♟️" },
  { id: "digital", label: "Jogos digitais", icon: "🎮" },
  { id: "quadrinhos", label: "Quadrinhos", icon: "📚" },
  { id: "livros", label: "Livros", icon: "📖" },
  { id: "filmes", label: "Filmes / Séries", icon: "🎬" },
  { id: "etc", label: "Etecétera (Blog)", icon: "✨" },
];

// ─── POSTAGENS DO BLOG (ETECÉTERA) ──────────────────────
const BLOG_POSTS = [
  {
    id: "lancamentos-tabuleiro-2026",
    title: "Os Lançamentos de Jogos de Tabuleiro Mais Aguardados do Ano",
    category: "etc",
    blogCategory: "lancamentos",
    categoryLabel: "🚀 Lançamentos",
    date: "18 de Agosto, 2026",
    readTime: "5 min de leitura",
    author: "Equipe Resenhas & Etc",
    cover: "https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?auto=format&fit=crop&w=1200&q=80",
    tagline: "Confira a seleção imperdível dos maiores títulos e expansões de jogos de tabuleiro confirmados para o mercado nacional e internacional nesta temporada.",
    excerpt: "Confira a seleção imperdível dos maiores títulos e expansões de jogos de tabuleiro confirmados para o mercado nacional e internacional nesta temporada.",
    featured: true,
    featuredMain: true,
    isBlog: true,
    url: "/etc/lancamentos-tabuleiro-2026"
  }
];

// ─── DATAS BLOQUEADAS DE DEMONSTRAÇÃO ──────────────────
function getDemoBlockedDates(gameId) {
  const now = new Date();
  const m = now.getMonth();
  const y = now.getFullYear();
  const seeds = { catan: [3, 4, 5, 12, 13, 18, 25, 26], "ticket-to-ride": [7, 8, 14, 20, 21], pandemic: [1, 2, 9, 16, 22, 23], dixit: [10, 17, 24], coup: [6, 15] };
  const days = seeds[gameId] || [5, 6, 12, 19, 20];
  return days.map(d => `${y}-${String(m + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`);
}

// ─── CATÁLOGO DE RESENHAS E JOGOS ───────────────────────
const CATALOG = [
  {
    "id": "tiny-epic-dungeons",
    "title": "Tiny Epic Dungeons",
    "category": "tabuleiro",
    "tagline": "Tiny Epic Dungeons é um jogo cooperativo de exploração onde heróis destemidos correm contra o tempo. Explore masmorras aleatórias, enfrente monstros, desarme armadilhas e colete saques épicos para conseguir derrotar o chefe supremo antes que a tocha do seu grupo se apague.",
    "cover": "images/tiny-epic-dungeons.jpg",
    "coverDetail": "images/tiny-epic-dungeons.jpg",
    "rating": 4.0,
    "ageRating": "+14 anos",
    "marketPrice": 189.9,
    "rental7": 29.9,
    "rental15": 44.9,
    "affiliateLink": "#",
    "isRentable": true,
    "featured": true,
  },
  {
    "id": "metro-2033",
    "title": "Metro 2033",
    "category": "livros",
    "reviewOnly": true,
    "tagline": "Conheça a brilhante e claustrofóbica distopia pós-apocalíptica de Dmitriy Glukhovskiy. Acompanhe a jornada de Artyom pelos túneis do metrô de Moscou em uma jornada profunda que desafia a sobrevivência humana e um plot twist arrebatador. Vale mais a pena que o jogo? Descubra!",
    "cover": "images/metro-2033.jpg",
    "rating": 3.0,
    "featured": true,
  },
  {
    "id": "the-order-1886",
    "title": "The Order 1996",
    "category": "digital",
    "reviewOnly": true,
    "tagline": "The Order: 1886 é um game que tem um significado especial para mim. Foi o trailer dele que colocou uma ideia fixa na minha cabeça: “eu preciso de um PS4”. Mais tarde, assistindo às gameplays, tive a certeza de que o investimento valeria a pena. Isso porque o exclusivo da Sony consegue unir uma porção de elementos que me agradam e faz com que funcionem muito bem em conjunto.",
    "cover": "images/the-order-1886.jpg",
    "rating": 4.0,
    "featured": true,
  },
];
