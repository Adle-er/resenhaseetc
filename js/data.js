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
    "description": "Tiny Epic Dungeons prova que tamanho não é documento no mundo dos board games. Se você procura a experiência completa de um dungeon crawler, mas não tem uma mesa gigantesca ou três horas livres, este jogo é pra você!\n\nMuitos jogos de masmorra assustam pelo excesso de regras e manuais que parecem enciclopédias. Tiny Epic Dungeons vai na contramão: o fluxo de jogo é lógico e altamente intuitivo. Em poucos turnos, você já decorou a dinâmica de movimentação, combate e gerenciamento de tempo.\n\nÉ o tipo de jogo fácil de colocar na mesa e explicar para novos jogadores sem perder a noite inteira na explicação.\n\nAlém disso, se você curte jogar sozinho, encontrou um prato cheio. O modo solo de Tiny Epic Dungeons não parece uma adaptação de última hora; ele é redondo, desafiador e imersivo.\n\nComo o jogo roda de forma fluida e a 'mesa' se adapta perfeitamente, a jornada é ágil, tensa na medida certa e altamente recompensadora. Você comanda um grupo de heróis contra o relógio, o que garante decisões estratégicas a cada segundo.\n\n<h2>Variedade de heróis</h2>\n\nDe 'tiny' temos só o nome, a quantidade de personagens do jogo impressiona, cada herói possui com habilidades únicas, atributos bem definidos e, miniaturas lindíssimas. Essa variedade permite que você teste diferentes sinergias de equipe a cada partida. Jogar com um guerreiro focado em dano bruto é totalmente diferente de montar uma estratégia baseada em magias e agilidade.<h2>Rejogabilidade infinita com mapas dinâmicos</h2>\n\nE, na minha opinião, aqui está o maior trunfo de Tiny Epic Dungeons, com a exploração às cegas, o mapa nunca será o mesmo:\n\n<ul><li><b>Exploração aleatória</b>: A masmorra são é reveladas conforme você avança pelas salas.</li><li><b>Cenários imprevisíveis</b>: Em uma partida, o covil do chefe pode estar logo na esquina; em outra, você precisará andar em círculos (e a tocha se apagando).</li><li><b>Perigo constante</b>: Goblins e lacaios surgem em locais inesperados, forçando você a mudar de tática em tempo real e, além disso, armadilhas também podem não só te dar dano, como também fazer você perder o seu precioso tempo.</li></ul>\n\nEssa imprevisibilidade garante que nenhuma partida seja igual à anterior, elevando o fator de rejogabilidade ao nível máximo.",
    "cover": "images/tiny-epic-dungeons.jpg",
    "coverDetail": "images/resenha-tiny-epic-dungeons.jpg",
    "rating": 4.0, 
    "players": "1–4 jogadores",
    "playTime": "30–60 min",
    "ageRating": "+14 anos",
    "marketPrice": 189.9,
    "rental7": 29.9,
    "rental15": 44.9,
    "affiliateLink": "#",
    "isRentable": true,
    "featured": true,
    "featuredMain": true,
    "reviews": [
      {
        "author": "Lucas M.",
        "date": "Jan 2026",
        "rating": 5,
        "text": "Jogo incrível! Cada partida é diferente. Ótima dinâmica de negociação com amigos."
      },
      {
        "author": "Fernanda R.",
        "date": "Dez 2025",
        "rating": 5,
        "text": "Clássico dos jogos de tabuleiro. Família adorou e não para de pedir pra jogar!"
      },
      {
        "author": "Pedro A.",
        "date": "Nov 2025",
        "rating": 4,
        "text": "Muito bom, mas pode arrastar em grupos maiores. Vale muito a pena."
      }
    ]
  },
  {
    "id": "ticket-to-ride",
    "title": "Ticket to Ride",
    "category": "tabuleiro",
    "tagline": "Construa ferrovias e conecte cidades em todo o mundo.",
    "description": "Ticket to Ride é um jogo de estratégia temático de ferrovias onde os jogadores coletam cartas de vagões e reivindicam rotas ferroviárias através de um mapa. Simples de aprender, mas profundo o suficiente para divertir por horas.",
    "cover": "https://images.unsplash.com/photo-1632516643720-e7f5d7d6ecc9?w=400&h=550&fit=crop&q=80",
    "coverDetail": "https://images.unsplash.com/photo-1632516643720-e7f5d7d6ecc9?w=400&h=550&fit=crop&q=80",
    "rating": 4.7,
    "players": "2–5 jogadores",
    "playTime": "45–75 min",
    "ageRating": "+8 anos",
    "marketPrice": 229.9,
    "rental7": 34.9,
    "rental15": 54.9,
    "affiliateLink": "#",
    "isRentable": true,
    "featured": true,
    "reviews": [
      {
        "author": "Ana P.",
        "date": "Fev 2026",
        "rating": 5,
        "text": "Perfeito para família. Meus filhos de 9 anos entendem e adoram!"
      },
      {
        "author": "Rodrigo S.",
        "date": "Jan 2026",
        "rating": 4,
        "text": "Excelente jogo. O componente físico (trens de plástico) é muito bonito."
      }
    ]
  },
  {
    "id": "pandemic",
    "title": "Pandemic",
    "category": "tabuleiro",
    "tagline": "Coopere para salvar o mundo de quatro doenças mortais.",
    "description": "Pandemic é um clássico cooperativo onde os jogadores assumem papéis de especialistas em saúde e devem trabalhar juntos para conter e erradicar quatro doenças que se espalharam pelo globo. Alta tensão e decisões difíceis a cada rodada.",
    "cover": "https://images.unsplash.com/photo-1514536040517-c18bf0f0e5cb?w=400&h=550&fit=crop&q=80",
    "coverDetail": "https://images.unsplash.com/photo-1514536040517-c18bf0f0e5cb?w=400&h=550&fit=crop&q=80",
    "rating": 4.9,
    "players": "2–4 jogadores",
    "playTime": "45–60 min",
    "ageRating": "+8 anos",
    "marketPrice": 179.9,
    "rental7": 27.9,
    "rental15": 42.9,
    "affiliateLink": "#",
    "isRentable": true,
    "featured": true,
    "reviews": [
      {
        "author": "Marcos B.",
        "date": "Mar 2026",
        "rating": 5,
        "text": "Jogo cooperativo de altíssima qualidade. Cada partida é única e tensa."
      },
      {
        "author": "Juliana C.",
        "date": "Jan 2026",
        "rating": 5,
        "text": "Incrível poder jogar em equipe. Todo mundo trabalhando junto!"
      }
    ]
  },
  {
    "id": "dixit",
    "title": "Dixit",
    "category": "tabuleiro",
    "tagline": "Conte histórias com ilustrações surreais e deslumbrantes.",
    "description": "Dixit é um jogo de imaginação e contos. O narrador descreve uma de suas cartas com uma frase, palavra ou som e os outros jogadores escolhem de seu baralho a carta que melhor se encaixa na descrição. Arte belíssima, diversão garantida.",
    "cover": "https://images.unsplash.com/photo-1605870445919-838d190e8e1b?w=400&h=550&fit=crop&q=80",
    "coverDetail": "https://images.unsplash.com/photo-1605870445919-838d190e8e1b?w=400&h=550&fit=crop&q=80",
    "rating": 4.6,
    "players": "3–6 jogadores",
    "playTime": "30–45 min",
    "ageRating": "+6 anos",
    "marketPrice": 149.9,
    "rental7": 22.9,
    "rental15": 34.9,
    "affiliateLink": "#",
    "isRentable": true,
    "reviews": [
      {
        "author": "Sofia H.",
        "date": "Fev 2026",
        "rating": 5,
        "text": "As ilustrações são de tirar o fôlego. Jogo perfeito para grupos criativos."
      }
    ]
  },
  {
    "id": "coup",
    "title": "Coup",
    "category": "tabuleiro",
    "tagline": "Engane, blefe e elimine seus adversários no futuro distópico.",
    "description": "Coup é um jogo de blefe e deducação rápido e intenso ambientado em uma sociedade distópica. Cada jogador possui dois influentes, e deve blefar, confrontar e eliminar os adversários para ser o último de pé.",
    "cover": "https://images.unsplash.com/photo-1596066190600-3af9aadaaea1?w=400&h=550&fit=crop&q=80",
    "coverDetail": "https://images.unsplash.com/photo-1596066190600-3af9aadaaea1?w=400&h=550&fit=crop&q=80",
    "rating": 4.5,
    "players": "2–6 jogadores",
    "playTime": "15 min",
    "ageRating": "+10 anos",
    "marketPrice": 79.9,
    "rental7": 14.9,
    "rental15": 22.9,
    "affiliateLink": "#",
    "isRentable": true,
    "reviews": [
      {
        "author": "Carlos L.",
        "date": "Mar 2026",
        "rating": 5,
        "text": "Impossível jogar só uma vez. Rapidíssimo e viciante!"
      }
    ]
  },
  {
    "id": "hollow-knight",
    "title": "Hollow Knight",
    "category": "digital",
    "reviewOnly": true,
    "tagline": "Explore um reino subterrâneo de insetos em decadência.",
    "description": "Hollow Knight é um metroidvania desafiador e belíssimo desenvolvido pela Team Cherry. Explore o vasto e misterioso mundo de Hallownest, derrotando inimigos e descobrindo segredos em cada canto desse reino de insetos.",
    "cover": "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=550&fit=crop&q=80",
    "rating": 4.9,
    "players": "1 jogador",
    "playTime": "40–60 horas",
    "ageRating": "+10 anos",
    "featured": true,
    "reviews": [
      {
        "author": "Thiago M.",
        "date": "Jan 2026",
        "rating": 5,
        "text": "Um dos melhores jogos indie de todos os tempos. Arte, trilha sonora e gameplay perfeitos."
      },
      {
        "author": "Amanda L.",
        "date": "Dez 2025",
        "rating": 5,
        "text": "Difícil, mas completamente recompensador. Uma obra de arte."
      }
    ]
  },
  {
    "id": "stardew-valley",
    "title": "Stardew Valley",
    "category": "digital",
    "reviewOnly": true,
    "tagline": "Construa sua fazenda, faça amigos e encontre amor.",
    "description": "Stardew Valley é um RPG de fazenda criado por um único desenvolvedor. Herde a fazenda do seu avô, cultive colheitas, crie animais, mine minérios, construa relacionamentos com os moradores e descubra os segredos do Vale.",
    "cover": "https://images.unsplash.com/photo-1560253023-3ec5d502959f?w=400&h=550&fit=crop&q=80",
    "rating": 4.9,
    "players": "1–4 jogadores",
    "playTime": "80–200 horas",
    "ageRating": "+10 anos",
    "reviews": [
      {
        "author": "Nathalia G.",
        "date": "Fev 2026",
        "rating": 5,
        "text": "Jogo relaxante e viciante ao mesmo tempo. Horas passam voando!"
      }
    ]
  },
  {
    "id": "hades",
    "title": "Hades",
    "category": "digital",
    "reviewOnly": true,
    "tagline": "Fuja do submundo grego em roguelike premiado.",
    "description": "Hades é um roguelike da Supergiant Games onde você joga como Zagreus, filho do Deus Hades, tentando escapar do mundo dos mortos. Com narrativa brilhante, combate fluido e trilha sonora incrível, ganhou inúmeros prêmios.",
    "cover": "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400&h=550&fit=crop&q=80",
    "rating": 4.8,
    "players": "1 jogador",
    "playTime": "60–100 horas",
    "ageRating": "+16 anos",
    "reviews": [
      {
        "author": "Rafael B.",
        "date": "Mar 2026",
        "rating": 5,
        "text": "Narrativa e gameplay se integram de forma magistral. Obra-prima do gênero."
      }
    ]
  },
  {
    "id": "saga",
    "title": "Saga — Vol. 1",
    "category": "quadrinhos",
    "reviewOnly": true,
    "tagline": "Sci-fi épico sobre amor, guerra e família no espaço.",
    "description": "Saga é uma graphic novel de ficção científica escrita por Brian K. Vaughan e ilustrada por Fiona Staples. A história de Marko e Alana, de raças inimigas, que fogem juntos com seu bebê recém-nascido em um universo em guerra. Adulto, imaginativo e emocionante.",
    "cover": "https://images.unsplash.com/photo-1608613304810-2d4dd52511a2?w=400&h=550&fit=crop&q=80",
    "rating": 4.9,
    "playTime": "~3 horas de leitura",
    "ageRating": "+18 anos",
    "featured": true,
    "reviews": [
      {
        "author": "Bruna A.",
        "date": "Jan 2026",
        "rating": 5,
        "text": "A melhor HQ que já li. Arte deslumbrante e narrativa emocionante."
      }
    ]
  },
  {
    "id": "watchmen",
    "title": "Watchmen",
    "category": "quadrinhos",
    "reviewOnly": true,
    "tagline": "A graphic novel que redefiniu os super-heróis.",
    "description": "Watchmen, de Alan Moore e Dave Gibbons, é considerada a graphic novel mais influente de todos os tempos. Em uma América alternativa anos 1980, um grupo de super-heróis aposentados se reúne após um de seus membros ser assassinado.",
    "cover": "https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=400&h=550&fit=crop&q=80",
    "rating": 5,
    "playTime": "~8 horas de leitura",
    "ageRating": "+16 anos",
    "reviews": [
      {
        "author": "Diego F.",
        "date": "Fev 2026",
        "rating": 5,
        "text": "Literatura elevada em forma de quadrinhos. Uma obra absolutamente única."
      }
    ]
  },
  {
    "id": "duna",
    "title": "Duna",
    "category": "livros",
    "reviewOnly": true,
    "tagline": "A épica saga de ficção científica que inspirou gerações.",
    "description": "Duna, de Frank Herbert, é um dos romances de ficção científica mais influentes já escritos. Ambientado no planeta desértico Arrakis, único produtor da especiaria mais valiosa do universo, segue Paul Atreides em sua jornada épica pelo poder e profecia.",
    "cover": "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&h=550&fit=crop&q=80",
    "rating": 4.9,
    "playTime": "~20 horas de leitura",
    "ageRating": "+14 anos",
    "featured": true,
    "reviews": [
      {
        "author": "Letícia M.",
        "date": "Jan 2026",
        "rating": 5,
        "text": "Difícil de entrar no começo, mas quando engata é impossível parar. Obra-prima."
      }
    ]
  },
  {
    "id": "vinte-mil-leguas",
    "title": "Vinte Mil Léguas Submarinas",
    "category": "livros",
    "reviewOnly": true,
    "tagline": "A aventura clássica de Júlio Verne pelos oceanos.",
    "description": "Um dos mais famosos romances de Júlio Verne. O professor Aronnax embarca involuntariamente numa aventura subaquática a bordo do submarino Nautilus comandado pelo misterioso Capitão Nemo, explorando os mistérios do fundo do oceano.",
    "cover": "https://images.unsplash.com/photo-1529473814998-077b4fec6770?w=400&h=550&fit=crop&q=80",
    "rating": 4.7,
    "playTime": "~12 horas de leitura",
    "ageRating": "+12 anos",
    "reviews": [
      {
        "author": "Felipe O.",
        "date": "Dez 2025",
        "rating": 5,
        "text": "Clássico absoluto que nunca envelhece. Leitura fundamental."
      }
    ]
  },
  {
    "id": "2001-odisseia",
    "title": "2001: Uma Odisseia no Espaço",
    "category": "filmes",
    "reviewOnly": true,
    "tagline": "A obra-prima de Kubrick que definiu a ficção científica.",
    "description": "Dirigido por Stanley Kubrick em 1968, este épico de ficção científica explora a evolução humana, tecnologia e o contato com inteligência extraterrestre. Visualmente revolucionário, continua sendo um dos filmes mais importantes já realizados.",
    "cover": "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=400&h=550&fit=crop&q=80",
    "rating": 4.9,
    "playTime": "2h 29min",
    "ageRating": "Livre",
    "featured": true,
    "reviews": [
      {
        "author": "Paulo C.",
        "date": "Jan 2026",
        "rating": 5,
        "text": "Impossível não se impressionar mesmo depois de 50+ anos. Arte pura."
      }
    ]
  },
  {
    "id": "everything-everywhere",
    "title": "Tudo em Todo Lugar ao Mesmo Tempo",
    "category": "filmes",
    "reviewOnly": true,
    "tagline": "Multiverso, kung fu e amor familiar em uma aventura insana.",
    "description": "Vencedor de 7 Oscars, o filme acompanha Evelyn Wang, uma imigrante chinesa presa a uma vida monótona que descobre que deve conectar-se com versões paralelas de si mesma para salvar o multiverso. Caótico, emocionante e genial.",
    "cover": "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=400&h=550&fit=crop&q=80",
    "rating": 4.8,
    "playTime": "2h 19min",
    "ageRating": "+14 anos",
    "reviews": [
      {
        "author": "Camila W.",
        "date": "Mar 2026",
        "rating": 5,
        "text": "Chorei e ri ao mesmo tempo. Experiência cinematográfica única e inesquecível."
      }
    ]
  },
  {
    "title": "Scythe",
    "category": "tabuleiro",
    "tagline": "A dieselpunk board game",
    "description": "Scythe is a board game for 1-5 players set in an alternate-history 1920s period. It is a game of farming and war, broken hearts and rusted gears, innovation and valor.",
    "cover": "https://cf.geekdo-images.com/7k_nOxclgoHjl86W8Y60Yw__itemrep/img/S9f-7pG9zYv-576f7-i-86-6-8-0/fit-in/400x400/filters:strip_icc()/pic2740445.jpg",
    "rating": 4.9,
    "players": "1-5 jogadores",
    "playTime": "90-115 min",
    "ageRating": "+14 anos",
    "reviewOnly": false,
    "isRentable": true,
    "marketPrice": 450,
    "rental7": 45,
    "rental15": 80,
    "affiliateLink": "https://www.ludopedia.com.br/jogo/scythe",
    "id": "scythe"
  }
];
