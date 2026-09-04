// ============================================================
// RESENHAS & ETC — GERADOR INTERATIVO DE NOTÍCIAS (scripts/gerar-noticia.js)
// ============================================================
// Uso: node scripts/gerar-noticia.js
// ============================================================

const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');
const readline = require('readline');

const ROOT_DIR = path.resolve(__dirname, '..');

const SOURCES = [
  {
    name: 'Sucumba Games (Jogos Digitais)',
    type: 'rss',
    url: 'https://sucumbagames.com.br/feed/',
    category: 'noticias',
    categoryLabel: '📰 Notícias'
  },
  {
    name: 'Inserir Link Direto de Notícia',
    type: 'custom',
    category: 'noticias',
    categoryLabel: '📰 Notícias'
  }
];

function fetchUrl(urlStr) {
  return new Promise((resolve, reject) => {
    const url = new URL(urlStr);
    const client = url.protocol === 'https:' ? https : http;
    const req = client.get(urlStr, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,text/xml,*/*;q=0.8',
        'Accept-Language': 'pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7'
      }
    }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        let redirectUrl = res.headers.location;
        if (!redirectUrl.startsWith('http')) {
          redirectUrl = new URL(redirectUrl, urlStr).toString();
        }
        return resolve(fetchUrl(redirectUrl));
      }
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve({ statusCode: res.statusCode, body: data }));
    });
    req.on('error', reject);
  });
}

function cleanText(str) {
  if (!str) return '';
  return str
    .replace(/<!\[CDATA\[(.*?)\]\]>/gs, '$1')
    .replace(/<[^>]+>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, ' ')
    .trim();
}

function slugify(text) {
  return text
    .toString()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9 -]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

function parseRss(xmlData) {
  const items = [];
  const itemMatches = [...xmlData.matchAll(/<item>(.*?)<\/item>/gs)];

  for (const match of itemMatches) {
    const itemXml = match[1];
    const titleMatch = itemXml.match(/<title>(.*?)<\/title>/s);
    const linkMatch = itemXml.match(/<link>(.*?)<\/link>/s);
    const pubDateMatch = itemXml.match(/<pubDate>(.*?)<\/pubDate>/s);
    const descMatch = itemXml.match(/<description>(.*?)<\/description>/s);
    const contentMatch = itemXml.match(/<content:encoded>(.*?)<\/content:encoded>/s);
    
    let image = '';
    const imgMatch = itemXml.match(/<media:content[^>]+url=["']([^"']+)["']/i) ||
                     itemXml.match(/<og:image[^>]+content=["']([^"']+)["']/i) ||
                     (contentMatch && contentMatch[1].match(/<img[^>]+src=["']([^"']+)["']/i)) ||
                     (descMatch && descMatch[1].match(/<img[^>]+src=["']([^"']+)["']/i));
    if (imgMatch) image = imgMatch[1];

    if (titleMatch && linkMatch) {
      items.push({
        title: cleanText(titleMatch[1]),
        link: cleanText(linkMatch[1]),
        pubDate: pubDateMatch ? cleanText(pubDateMatch[1]) : '',
        description: descMatch ? cleanText(descMatch[1]) : '',
        contentHtml: contentMatch ? contentMatch[1] : (descMatch ? descMatch[1] : ''),
        image: image || 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1200&q=80'
      });
    }
  }
  return items;
}

// Scrape Full Article Body and Embedded YouTube Videos from Page URL
async function scrapeFullArticle(url) {
  try {
    const res = await fetchUrl(url);
    const html = res.body;

    // Extract Paragraphs
    let paragraphs = [...html.matchAll(/<p[^>]*>([\s\S]*?)<\/p>/gi)]
      .map(m => cleanText(m[1]))
      .filter(p => p.length > 25 && 
                   !p.includes('sucumbapromo') && 
                   !p.includes('Quer pagar mais barato') && 
                   !p.includes('Todos os direitos') && 
                   !p.startsWith('Por Posted by') &&
                   !p.includes('Editado em'));

    // Extract YouTube Iframe embeds
    const videoMatches = [...html.matchAll(/<iframe[^>]+src=["']([^"']+)["']/gi)]
      .map(m => m[1])
      .filter(src => src.includes('youtube.com') || src.includes('youtu.be'));

    // Extract OG Cover Image if missing
    let ogImage = '';
    const ogMatch = html.match(/<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']+)["']/i);
    if (ogMatch) ogImage = ogMatch[1];

    return {
      paragraphs,
      videoUrl: videoMatches.length > 0 ? videoMatches[0] : null,
      ogImage
    };
  } catch (e) {
    console.error('  ⚠️ Erro ao extrair página inteira:', e.message);
    return { paragraphs: [], videoUrl: null, ogImage: '' };
  }
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function askQuestion(query) {
  return new Promise(resolve => rl.question(query, resolve));
}

async function main() {
  console.log('\n==================================================');
  console.log('  📰 GERADOR INTERATIVO DE NOTÍCIAS — RESENHAS & ETC');
  console.log('==================================================\n');

  console.log('Selecione a fonte de notícias:');
  SOURCES.forEach((src, idx) => {
    console.log(`  [${idx + 1}] ${src.name}`);
  });

  const sourceAns = await askQuestion('\nDigite o número da opção (ex: 1): ');
  const selectedIdx = parseInt(sourceAns.trim(), 10) - 1;

  if (isNaN(selectedIdx) || selectedIdx < 0 || selectedIdx >= SOURCES.length) {
    console.log('Opção inválida. Operação cancelada.');
    rl.close();
    return;
  }

  const selectedSource = SOURCES[selectedIdx];
  let articleToProcess = null;

  if (selectedSource.type === 'rss') {
    console.log(`\n⏳ Buscando notícias de ${selectedSource.name}...`);
    try {
      const res = await fetchUrl(selectedSource.url);
      const items = parseRss(res.body);

      if (items.length === 0) {
        console.log('Nenhuma notícia encontrada na fonte RSS.');
        rl.close();
        return;
      }

      console.log(`\nNotícias recentes encontradas:\n`);
      items.slice(0, 10).forEach((item, i) => {
        console.log(`  [${i + 1}] ${item.title}`);
      });

      const itemAns = await askQuestion('\nDigite o número da matéria que deseja publicar: ');
      const itemIdx = parseInt(itemAns.trim(), 10) - 1;

      if (isNaN(itemIdx) || itemIdx < 0 || itemIdx >= Math.min(items.length, 10)) {
        console.log('Seleção inválida. Operação cancelada.');
        rl.close();
        return;
      }

      articleToProcess = items[itemIdx];

    } catch (e) {
      console.error('Erro ao buscar notícias:', e.message);
      rl.close();
      return;
    }

  } else if (selectedSource.type === 'custom') {
    const customUrl = await askQuestion('\nDigite a URL da notícia (ex: https://...): ');
    const customTitle = await askQuestion('Digite o título da notícia: ');
    const customDesc = await askQuestion('Digite um resumo/subtítulo: ');
    const customImage = await askQuestion('Digite a URL da imagem de capa (deixe em branco para usar padrão): ');

    if (!customTitle.trim()) {
      console.log('Título obrigatório. Operação cancelada.');
      rl.close();
      return;
    }

    articleToProcess = {
      title: customTitle.trim(),
      link: customUrl.trim(),
      description: customDesc.trim(),
      image: customImage.trim() || 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1200&q=80',
      pubDate: new Date().toLocaleDateString('pt-BR')
    };
  }

  if (!articleToProcess) {
    console.log('Nenhuma matéria selecionada.');
    rl.close();
    return;
  }

  console.log(`\n==================================================`);
  console.log(`  PROCESSANDO MATÉRIA COMO ORIGINAL DO RESENHAS & ETC:`);
  console.log(`  Título: ${articleToProcess.title}`);
  console.log(`==================================================\n`);

  // Scrape full page content and video embeds
  let fullArticleData = { paragraphs: [], videoUrl: null, ogImage: '' };
  if (articleToProcess.link) {
    console.log(`⏳ Extraindo conteúdo completo e vídeos da matéria original...`);
    fullArticleData = await scrapeFullArticle(articleToProcess.link);
  }

  if (fullArticleData.ogImage && (!articleToProcess.image || articleToProcess.image.includes('unsplash'))) {
    articleToProcess.image = fullArticleData.ogImage;
  }

  // Generate Slug and File Name
  const slug = slugify(articleToProcess.title);
  const htmlFileName = `${slug}.html`;
  const htmlFilePath = path.join(ROOT_DIR, 'etc', htmlFileName);

  const formattedDate = new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' });
  const categoryLabel = selectedSource.categoryLabel || '📰 Notícias';
  const category = selectedSource.category || 'noticias';

  // Build Article Paragraphs HTML
  let articleBodyHtml = '';
  if (fullArticleData.paragraphs.length > 0) {
    articleBodyHtml = fullArticleData.paragraphs.map((p, idx) => {
      if (idx === 0) {
        return `<p style="font-size: 1.2rem; font-weight: 600; color: var(--text); margin-bottom: 1.5rem; line-height: 1.6;">${p}</p>`;
      }
      return `<p style="margin-bottom: 1.5rem;">${p}</p>`;
    }).join('\n        ');
  } else {
    articleBodyHtml = `
        <p style="font-size: 1.2rem; font-weight: 600; color: var(--text); margin-bottom: 1.5rem; line-height: 1.6;">
          ${articleToProcess.description || articleToProcess.title}
        </p>
        <p>Acompanhe em primeira mão todos os detalhes e desdobramentos desta grande novidade no universo dos games e cultura pop, trazidos pela equipe do <strong>Resenhas & Etc</strong>.</p>
    `;
  }

  // Build Video Embed HTML if YouTube Video exists
  let videoEmbedHtml = '';
  if (fullArticleData.videoUrl) {
    videoEmbedHtml = `
      <div class="video-embed-container" style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; max-width: 100%; margin: 2.5rem 0; border-radius: var(--radius); box-shadow: var(--shadow-md); background: #000;">
        <iframe src="${fullArticleData.videoUrl}" title="${articleToProcess.title}" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: 0;" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
      </div>
    `;
  }

  // Build Complete HTML Content
  const htmlContent = `<!DOCTYPE html>
<html lang="pt-BR">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${articleToProcess.title} — Etecétera | Resenhas & Etc</title>
  <meta name="description" content="${(articleToProcess.description || articleToProcess.title).replace(/"/g, '&quot;')}">
  <link rel="stylesheet" href="../css/style.css?v=2">
  <link rel="icon" type="image/png" href="../images/icone.png">
</head>

<body>

  <!-- ═══════════════════════════════════════════
       HERO BANNER
  ════════════════════════════════════════════ -->
  <section class="banner-section"
    style="position: relative; background: url('../bg-banner.jpg') center/cover no-repeat; border-bottom: 1px solid var(--border); height: 380px; display: flex; align-items: center; justify-content: center; padding: 2rem;">
    <a href="/">
      <img src="../logo-banner.png" alt="Logo Resenhas e Etc"
        style="max-width: 100%; max-height: 100%; object-fit: contain;">
    </a>
  </section>

  <!-- ═══════════════════════════════════════════
       MAIN NAVIGATION
  ════════════════════════════════════════════ -->
  <nav class="main-nav" role="navigation" aria-label="Navegação Principal">
    <ul class="nav-menu">
      <li><a href="/">Início</a></li>
      <li class="dropdown">
        <a href="javascript:void(0)" class="no-pointer">Resenhas ▾</a>
        <ul class="dropdown-menu">
          <li><a href="/resenhas/livros">Livros</a></li>
          <li><a href="/resenhas/jogos">Jogos</a></li>
          <li><a href="/resenhas/quadrinhos">Quadrinhos</a></li>
          <li><a href="/resenhas/filmes-series">Filmes/Séries</a></li>
        </ul>
      </li>
      <li class="dropdown">
        <a href="/jogos-tabuleiro">Jogos de tabuleiro ▾</a>
        <ul class="dropdown-menu">
          <li><a href="/jogos-tabuleiro">Catálogo</a></li>
          <li><a href="javascript:void(0)" onclick="alert('Página em construção!')">Como funciona</a></li>
          <li><a href="javascript:void(0)" onclick="alert('Página em construção!')">Alugar agora</a></li>
          <li><a href="javascript:void(0)" onclick="alert('Página em construção!')">Planos</a></li>
        </ul>
      </li>
      <li><a href="/sobre">Sobre</a></li>
      <li><a href="/etc" style="color: var(--orange); font-weight: 700;">Etecétera</a></li>
    </ul>
  </nav>

  <!-- ═══════════════════════════════════════════
       MAIN CONTENT
  ════════════════════════════════════════════ -->
  <main class="main-content" style="max-width: 900px; margin: 0 auto; padding: 2.5rem 1rem 5rem;">
    
    <!-- Breadcrumbs -->
    <nav aria-label="Breadcrumb" style="margin-bottom: 2rem;">
      <ol style="display: flex; gap: 0.5rem; list-style: none; padding: 0; font-size: 0.9rem; color: var(--text-muted);">
        <li><a href="/" style="color: var(--orange);">Início</a></li>
        <li>/</li>
        <li><a href="/etc" style="color: var(--orange);">Etecétera</a></li>
        <li>/</li>
        <li class="active" aria-current="page" style="color: var(--text); font-weight: 600;">${articleToProcess.title.substring(0, 30)}...</li>
      </ol>
    </nav>

    <!-- Article Header -->
    <article class="blog-article-full">
      <header class="blog-article-header" style="margin-bottom: 2rem;">
        <span class="blog-badge" style="display: inline-block; background: var(--orange); color: var(--white); font-size: 0.85rem; font-weight: 700; padding: 0.3rem 0.8rem; border-radius: var(--radius-sm); margin-bottom: 1rem;">
          ${categoryLabel}
        </span>
        <h1 style="font-size: 2.2rem; font-weight: 800; color: var(--text); line-height: 1.25; margin-bottom: 1rem;">
          ${articleToProcess.title}
        </h1>
        <div class="blog-article-meta" style="display: flex; gap: 1.5rem; font-size: 0.9rem; color: var(--text-secondary); border-bottom: 1px solid var(--border); padding-bottom: 1.2rem; margin-bottom: 2rem;">
          <span>📅 ${formattedDate}</span>
          <span>✍️ Por Resenhas & Etc</span>
          <span>⏱️ 4 min de leitura</span>
        </div>
      </header>

      <!-- Cover Image -->
      <div style="margin-bottom: 2.5rem; border-radius: var(--radius); overflow: hidden; box-shadow: var(--shadow);">
        <img src="${articleToProcess.image}" alt="${articleToProcess.title}" style="width: 100%; max-height: 480px; object-fit: cover; display: block;">
      </div>

      <!-- Article Body -->
      <div class="blog-article-body" style="font-size: 1.1rem; line-height: 1.8; color: var(--text);">
        ${articleBodyHtml}

        ${videoEmbedHtml}
      </div>

      <!-- Back to Blog Button -->
      <div style="margin-top: 4rem; padding-top: 2rem; border-top: 1px solid var(--border); display: flex; justify-content: space-between; align-items: center;">
        <a href="/etc" style="display: inline-flex; align-items: center; gap: 0.5rem; background: var(--grey-0); color: var(--text); padding: 0.75rem 1.5rem; border-radius: var(--radius-sm); font-weight: 700; text-decoration: none; border: 1px solid var(--border);">
          ← Voltar para o Etecétera
        </a>
      </div>
    </article>
  </main>

  <!-- ═══════════════════════════════════════════
       FOOTER
  ════════════════════════════════════════════ -->
  <footer class="footer">
    <div class="footer-inner">
      <div class="footer-col brand-col">
        <div class="footer-logo">Resenhas & Etc</div>
        <p class="footer-desc">Seu guia definitivo para resenhas de livros, jogos, quadrinhos e muito mais.</p>
      </div>
      <div class="footer-col">
        <h4>Navegação</h4>
        <ul>
          <li><a href="/">Início</a></li>
          <li><a href="/resenhas/livros">Livros</a></li>
          <li><a href="/resenhas/jogos">Jogos</a></li>
          <li><a href="/resenhas/quadrinhos">Quadrinhos</a></li>
          <li><a href="/resenhas/filmes-series">Filmes/Séries</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h4>Institucional</h4>
        <ul>
          <li><a href="/sobre">Sobre nós</a></li>
          <li><a href="/etc">Blog Etecétera</a></li>
        </ul>
      </div>
    </div>
    <div class="footer-bottom">
      <span>© 2026 Resenhas & Etc. Todos os direitos reservados.</span>
      <span>Feito com 🎲 para amantes de jogos e cultura</span>
    </div>
  </footer>

  <script src="../js/nav.js?v=2"></script>
</body>

</html>
`;

  // Write HTML File
  fs.writeFileSync(htmlFilePath, htmlContent, 'utf8');
  console.log(`\n✅ Página criada com sucesso: etc/${htmlFileName}`);

  // Update js/data.js and js/etc.js
  const postEntry = {
    id: slug,
    title: articleToProcess.title,
    category: category,
    categoryLabel: categoryLabel,
    date: formattedDate,
    readTime: "4 min de leitura",
    author: "Resenhas & Etc",
    cover: articleToProcess.image,
    tagline: (fullArticleData.paragraphs[0] || articleToProcess.description || articleToProcess.title),
    excerpt: (fullArticleData.paragraphs[0] || articleToProcess.description || articleToProcess.title),
    featured: false,
    isBlog: true,
    url: `/etc/${slug}`
  };

  updateDataJs(postEntry);
  updateEtcJs(postEntry);
  updateSitemap(slug);

  console.log('\n🎉 Notícia publicada originalmente como Resenhas & Etc com vídeo embutido com sucesso!');
  rl.close();
}

function updateDataJs(entry) {
  const dataPath = path.join(ROOT_DIR, 'js', 'data.js');
  let content = fs.readFileSync(dataPath, 'utf8');

  // Check if entry already exists
  if (content.includes(`id: "${entry.id}"`)) {
    console.log('ℹ️ Registro já existe no js/data.js.');
    return;
  }

  const marker = 'const BLOG_POSTS = [';
  if (content.includes(marker)) {
    const entryString = `  {\n    id: "${entry.id}",\n    title: "${entry.title.replace(/"/g, '\\"')}",\n    category: "${entry.category}",\n    categoryLabel: "${entry.categoryLabel}",\n    date: "${entry.date}",\n    readTime: "${entry.readTime}",\n    author: "${entry.author}",\n    cover: "${entry.cover}",\n    tagline: "${entry.tagline.replace(/"/g, '\\"')}",\n    excerpt: "${entry.excerpt.replace(/"/g, '\\"')}",\n    featured: false,\n    isBlog: true,\n    url: "${entry.url}"\n  },`;
    
    content = content.replace(marker, `${marker}\n${entryString}`);
    fs.writeFileSync(dataPath, content, 'utf8');
    console.log('✅ js/data.js atualizado.');
  }
}

function updateEtcJs(entry) {
  const etcPath = path.join(ROOT_DIR, 'js', 'etc.js');
  let content = fs.readFileSync(etcPath, 'utf8');

  if (content.includes(`id: "${entry.id}"`)) {
    console.log('ℹ️ Registro já existe no js/etc.js.');
    return;
  }

  const marker = 'window.BLOG_POSTS = [';
  if (content.includes(marker)) {
    const entryString = `    {\n      id: "${entry.id}",\n      title: "${entry.title.replace(/"/g, '\\"')}",\n      category: "${entry.category}",\n      categoryLabel: "${entry.categoryLabel}",\n      date: "${entry.date}",\n      readTime: "${entry.readTime}",\n      author: "${entry.author}",\n      cover: "${entry.cover}",\n      excerpt: "${entry.excerpt.replace(/"/g, '\\"')}",\n      featured: false,\n      url: "${entry.url}"\n    },`;
    
    content = content.replace(marker, `${marker}\n${entryString}`);
    fs.writeFileSync(etcPath, content, 'utf8');
    console.log('✅ js/etc.js atualizado.');
  }
}

function updateSitemap(slug) {
  const sitemapPath = path.join(ROOT_DIR, 'sitemap.xml');
  if (!fs.existsSync(sitemapPath)) return;

  let content = fs.readFileSync(sitemapPath, 'utf8');
  if (content.includes(`/etc/${slug}`)) {
    console.log('ℹ️ URL já existe no sitemap.xml.');
    return;
  }

  const today = new Date().toISOString().split('T')[0];
  const urlEntry = `  <url>\n    <loc>https://www.resenhaseetc.com.br/etc/${slug}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>0.8</priority>\n  </url>\n</urlset>`;

  if (content.includes('</urlset>')) {
    content = content.replace('</urlset>', urlEntry);
    fs.writeFileSync(sitemapPath, content, 'utf8');
    console.log('✅ sitemap.xml atualizado.');
  }
}

main().catch(err => {
  console.error('Erro na execução do script:', err);
  rl.close();
});
