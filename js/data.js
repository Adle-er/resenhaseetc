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
// Preencha após obter as credenciais do Google Cloud Console
const GOOGLE_CALENDAR_CONFIG = {
  apiKey: "SUA_API_KEY_AQUI",          // Obtenha em: console.cloud.google.com
  calendarId: "SEU_CALENDAR_ID_AQUI", // Ex: seu-email@gmail.com
  // Para ativar: substitua os valores acima e remova o modo demo abaixo
  demoMode: true, // false = usa Google Calendar real
};

// ─── DATAS BLOQUEADAS DE DEMONSTRAÇÃO ──────────────────
// Usadas quando demoMode = true (sem API Key real)
function getDemoBlockedDates(gameId) {
  const now = new Date();
  const m = now.getMonth();
  const y = now.getFullYear();
  // Bloqueia alguns dias do mês atual como demonstração
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
    "tagline": "A épica saga de ficção científica que inspirou gerações.",
    "cover": "images/metro-2033.jpg",
    "rating": 4.9,
    "playTime": "~20 horas de leitura",
    "ageRating": "+14 anos",
    "featured": true,
  },
];
