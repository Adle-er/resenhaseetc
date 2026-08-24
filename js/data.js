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
    id: "vazamentos-gta-vi",
    title: "Vazamentos de GTA 6: O que se sabe até o momento",
    category: "noticias",
    categoryLabel: "📰 Notícias",
    date: "23 de Agosto, 2026",
    readTime: "7 min de leitura",
    author: "Resenhas & Etc",
    cover: "https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?auto=format&fit=crop&w=1200&q=80",
    tagline: "Confira o resumo completo dos vazamentos de GTA 6, com vídeos do Cyberleek, reação da Take-Two e data da gameplay oficial.",
    excerpt: "Confira o resumo completo dos vazamentos de GTA 6, com vídeos do Cyberleek, reação da Take-Two e data da gameplay oficial.",
    featured: true,
    featuredMain: true,
    isBlog: true,
    url: "/etc/vazamentos-gta-vi"
  }
  // {
  //   id: "lancamentos-tabuleiro-2026",
  //   title: "Os Lançamentos de Jogos de Tabuleiro Mais Aguardados do Ano",
  //   category: "lancamentos",
  //   categoryLabel: "🚀 Lançamentos",
  //   date: "18 de Agosto, 2026",
  //   readTime: "5 min de leitura",
  //   author: "Equipe Resenhas & Etc",
  //   cover: "https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?auto=format&fit=crop&w=1200&q=80",
  //   tagline: "Confira a seleção imperdível dos maiores títulos e expansões de jogos de tabuleiro confirmados para o mercado nacional e internacional nesta temporada.",
  //   excerpt: "Confira a seleção imperdível dos maiores títulos e expansões de jogos de tabuleiro confirmados para o mercado nacional e internacional nesta temporada.",
  //   featured: true,
  //   isBlog: true,
  //   url: "/etc/lancamentos-tabuleiro-2026"
  // },
  // {
  //   id: "lancamentos-digitais-destaques",
  //   title: "Lançamentos Digitais: Games que Prometem Dominar os Consoles e PC",
  //   category: "lancamentos",
  //   categoryLabel: "🚀 Lançamentos",
  //   date: "15 de Agosto, 2026",
  //   readTime: "4 min de leitura",
  //   author: "Redação Games",
  //   cover: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80",
  //   tagline: "Uma visão geral dos jogos eletrônicos mais promissores lançados recentemente, abrangendo de grandes produções RPGs a títulos indie criativos.",
  //   excerpt: "Uma visão geral dos jogos eletrônicos mais promissores lançados recentemente, abrangendo de grandes produções RPGs a títulos indie criativos.",
  //   featured: true,
  //   isBlog: true,
  //   url: "/etc/lancamentos-digitais-destaques"
  // },
  // {
  //   id: "novidades-mercado-editorial",
  //   title: "Lançamentos Literários e Quadrinhos: O Que Ler a Seguir",
  //   category: "lancamentos",
  //   categoryLabel: "🚀 Lançamentos",
  //   date: "10 de Agosto, 2026",
  //   readTime: "6 min de leitura",
  //   author: "Curadoria de Livros & HQ",
  //   cover: "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=800&q=80",
  //   tagline: "Confira as obras literárias e graphic novels recém-chegadas às livrarias que estão dando o que falar entre leitores e críticos.",
  //   excerpt: "Confira as obras literárias e graphic novels recém-chegadas às livrarias que estão dando o que falar entre leitores e críticos.",
  //   featured: false,
  //   isBlog: true,
  //   url: "/etc/novidades-mercado-editorial"
  // },
  // {
  //   id: "bastidores-resenhas-etc",
  //   title: "Bem-vindo ao Etecétera: O Novo Espaço de Notícias e Artigos do Projeto",
  //   category: "noticias",
  //   categoryLabel: "📰 Notícias",
  //   date: "01 de Agosto, 2026",
  //   readTime: "3 min de leitura",
  //   author: "Resenhas & Etc",
  //   cover: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=800&q=80",
  //   tagline: "Apresentamos o nosso canal de blog oficial! Aqui você acompanhará notícias, coberturas de lançamentos e conteúdos especiais além das nossas resenhas.",
  //   excerpt: "Apresentamos o nosso canal de blog oficial! Aqui você acompanhará notícias, coberturas de lançamentos e conteúdos especiais além das nossas resenhas.",
  //   featured: false,
  //   isBlog: true,
  //   url: "/etc/bastidores-resenhas-etc"
  // }
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
    "tagline": "The Order: 1886 é um game que tem um significado especial para mim. Foi o trailer dele que colocou uma ideia fixa na minha cabeça: “eu preciso de um PS4”. Mais tarde, assistindo às gameplays, tive a certeza de que o investimento valeria a pena. Isso porque o exclusivo da Sony consegue unir uma porção de elements que me agradam e faz com que funcionem muito bem em conjunto.",
    "cover": "images/the-order-1886.jpg",
    "rating": 4.0,
    "featured": true,
  },
];
