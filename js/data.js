// ============================================================
// RESENHAS & ETC — CATÁLOGO DE DADOS
// ============================================================
// JOGOS DE TABULEIRO: possuem isRentable, affiliateLink, preços.
// DEMAIS CATEGORIAS (digital, quadrinhos, livros, filmes):
//   são SOMENTE RESENHA — sem preço, sem aluguel, sem afiliado.
//   Marque reviewOnly: true nesses itens.
// ============================================================
//
// CAMPOS DE IMAGEM:
//   cover        → imagem exibida nos cards do index.html
//   coverDetail  → imagem exibida na página individual do jogo
//                  (se omitido, usa cover como fallback)
// ============================================================


// ─── METADADOS DAS CATEGORIAS ───────────────────────────
const CATEGORIES = [
  { id: "todos", label: "Todos", icon: "🎲" },
  { id: "tabuleiro", label: "Jogos de tabuleiro", icon: "♟️" },
  { id: "digital", label: "Jogos digitais", icon: "🎮" },
  { id: "quadrinhos", label: "Quadrinhos", icon: "📚" },
  { id: "livros", label: "Livros", icon: "📖" },
  { id: "filmes", label: "Filmes", icon: "🎬" },
];

// ─── CONFIGURAÇÃO DO GOOGLE CALENDAR ───────────────────
const GOOGLE_CALENDAR_CONFIG = {
  apiKey: "SUA_API_KEY_AQUI",
  calendarId: "SEU_CALENDAR_ID_AQUI",
  demoMode: true,
};

// ─── DATAS BLOQUEADAS DE DEMONSTRAÇÃO ──────────────────
function getDemoBlockedDates(gameId) {
  const now = new Date();
  const m = now.getMonth();
  const y = now.getFullYear();
  const seeds = { catan: [3, 4, 5, 12, 13, 18, 25, 26], "ticket-to-ride": [7, 8, 14, 20, 21], pandemic: [1, 2, 9, 16, 22, 23], dixit: [10, 17, 24], coup: [6, 15] };
  const days = seeds[gameId] || [5, 6, 12, 19, 20];
  return days.map(d => `${y}-${String(m + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`);
}


const CATALOG = [
  {
    "id": "tiny-epic-dungeons",
    "title": "Tiny Epic Dungeons",
    "category": "tabuleiro",
    "tagline": "Tiny Epic Dungeons é um jogo cooperativo de exploração onde heróis destemidos correm contra o tempo. Explore masmorras aleatórias, enfrente monstros, desarme armadilhas e colete saques épicos para conseguir derrotar o chefe supremo antes que a tocha do seu grupo se apague.",
    "cover": "images/tiny-epic-dungeons.jpg",
    "coverDetail": "images/resenha-tiny-epic-dungeons.jpg",
    "rating": 4.0,
    "ageRating": "+14 anos",
    "marketPrice": 189.9,
    "rental7": 29.9,
    "rental15": 44.9,
    "affiliateLink": "#",
    "isRentable": true,
    "featured": true,
    "featuredMain": true,
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
    "id": "vinte-mil-leguas",
    "title": "Vinte Mil Léguas Submarinas",
    "category": "livros",
    "reviewOnly": true,
    "tagline": "A aventura clássica de Júlio Verne pelos oceanos.",
    "cover": "https://images.unsplash.com/photo-1529473814998-077b4fec6770?w=400&h=550&fit=crop&q=80",
    "rating": 4.7,
  },
  {
    "id": "2001-odisseia",
    "title": "2001: Uma Odisseia no Espaço",
    "category": "filmes",
    "reviewOnly": true,
    "tagline": "A obra-prima de Kubrick que definiu a ficção científica.",
    "cover": "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=400&h=550&fit=crop&q=80",
    "rating": 4.9,
  },
  {
    "id": "everything-everywhere",
    "title": "Tudo em Todo Lugar ao Mesmo Tempo",
    "category": "filmes",
    "reviewOnly": true,
    "tagline": "Multiverso, kung fu e amor familiar em uma aventura insana.",
    "cover": "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=400&h=550&fit=crop&q=80",
    "rating": 4.8,
  },
  {
    "id": "hades",
    "title": "Hades",
    "category": "digital",
    "reviewOnly": true,
    "tagline": "Fuja do submundo grego em roguelike premiado.",
    "cover": "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400&h=550&fit=crop&q=80",
    "rating": 4.8,
  },
  {
    "id": "hollow-knight",
    "title": "Hollow Knight",
    "category": "digital",
    "reviewOnly": true,
    "tagline": "Explore um reino subterrâneo de insetos em decadência.",
    "cover": "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=550&fit=crop&q=80",
    "rating": 4.9,
  },
  {
    "id": "stardew-valley",
    "title": "Stardew Valley",
    "category": "digital",
    "reviewOnly": true,
    "tagline": "Construa sua fazenda, faça amigos e encontre amor.",
    "cover": "https://images.unsplash.com/photo-1560253023-3ec5d502959f?w=400&h=550&fit=crop&q=80",
    "rating": 4.9,
  },
  {
    "id": "coup",
    "title": "Coup",
    "category": "tabuleiro",
    "tagline": "Engane, blefe e elimine seus adversários no futuro distópico.",
    "cover": "https://images.unsplash.com/photo-1596066190600-3af9aadaaea1?w=400&h=550&fit=crop&q=80",
    "rating": 4.5,
    "ageRating": "+10 anos",
    "marketPrice": 99.0,
    "rental7": 14.9,
    "rental15": 24.9,
    "affiliateLink": "#",
    "isRentable": true,
  },
  {
    "id": "dixit",
    "title": "Dixit",
    "category": "tabuleiro",
    "tagline": "Conte histórias com ilustrações surreais e deslumbrantes.",
    "cover": "https://images.unsplash.com/photo-1605870445919-838d190e8e1b?w=400&h=550&fit=crop&q=80",
    "rating": 4.6,
    "ageRating": "+8 anos",
    "marketPrice": 249.9,
    "rental7": 34.9,
    "rental15": 54.9,
    "affiliateLink": "#",
    "isRentable": true,
  },
  {
    "id": "pandemic",
    "title": "Pandemic",
    "category": "tabuleiro",
    "tagline": "Coopere para salvar o mundo de quatro doenças mortais.",
    "cover": "https://images.unsplash.com/photo-1514536040517-c18bf0f0e5cb?w=400&h=550&fit=crop&q=80",
    "rating": 4.9,
    "ageRating": "+8 anos",
    "marketPrice": 299.9,
    "rental7": 39.9,
    "rental15": 59.9,
    "affiliateLink": "#",
    "isRentable": true,
  },
  {
    "id": "scythe",
    "title": "Scythe",
    "category": "tabuleiro",
    "tagline": "A dieselpunk board game",
    "cover": "https://cf.geekdo-images.com/7k_nOxclgoHjl86W8Y60Yw__itemrep/img/S9f-7pG9zYv-576f7-i-86-6-8-0/fit-in/400x400/filters:strip_icc()/pic2740445.jpg",
    "rating": 4.9,
    "ageRating": "+14 anos",
    "marketPrice": 599.9,
    "rental7": 79.9,
    "rental15": 119.9,
    "affiliateLink": "#",
    "isRentable": true,
  },
  {
    "id": "ticket-to-ride",
    "title": "Ticket to Ride",
    "category": "tabuleiro",
    "tagline": "Construa ferrovias e conecte cidades em todo o mundo.",
    "cover": "https://images.unsplash.com/photo-1632516643720-e7f5d7d6ecc9?w=400&h=550&fit=crop&q=80",
    "rating": 4.7,
    "ageRating": "+8 anos",
    "marketPrice": 329.9,
    "rental7": 44.9,
    "rental15": 69.9,
    "affiliateLink": "#",
    "isRentable": true,
  },
  {
    "id": "saga",
    "title": "Saga — Vol. 1",
    "category": "quadrinhos",
    "reviewOnly": true,
    "tagline": "Sci-fi épico sobre amor, guerra e família no espaço.",
    "cover": "https://images.unsplash.com/photo-1608613304810-2d4dd52511a2?w=400&h=550&fit=crop&q=80",
    "rating": 4.9,
  },
  {
    "id": "watchmen",
    "title": "Watchmen",
    "category": "quadrinhos",
    "reviewOnly": true,
    "tagline": "A graphic novel que redefiniu os super-heróis.",
    "cover": "https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=400&h=550&fit=crop&q=80",
    "rating": 5.0,
  }
];
