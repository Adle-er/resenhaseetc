const fs = require('fs');
const path = require('path');
const { SitemapStream, streamToPromise } = require('sitemap');

// 1. Array com todas as suas resenhas, notícias e páginas de jogos individuais
const posts = [
  { url: '/etc/vazamentos-gta-vi', date: '2026-08-23' },
  { url: '/resenhas/jogos-digitais/the-order-1886', date: '2026-08-23' }, // Você pode ajustar esta data para o dia real da postagem
  { url: '/jogos-tabuleiro/tiny-epic-dungeons', date: '2026-08-23' } // Você pode ajustar esta data
];

async function generate() {
  const smStream = new SitemapStream({ hostname: 'https://www.resenhaseetc.com.br' });

  // 2. Páginas Fixas e Categorias (Estrutura do site)
  smStream.write({ url: '/', changefreq: 'daily', priority: 1.0 });
  smStream.write({ url: '/sobre', changefreq: 'monthly', priority: 0.5 });
  
  // Blog / Etecétera
  smStream.write({ url: '/etc', changefreq: 'daily', priority: 0.9 });
  smStream.write({ url: '/etc/lancamentos', changefreq: 'weekly', priority: 0.8 });
  smStream.write({ url: '/etc/noticias', changefreq: 'weekly', priority: 0.8 });

  // Categorias de Resenhas
  smStream.write({ url: '/resenhas/jogos', changefreq: 'weekly', priority: 0.8 });
  smStream.write({ url: '/resenhas/livros', changefreq: 'weekly', priority: 0.8 });
  smStream.write({ url: '/resenhas/quadrinhos', changefreq: 'weekly', priority: 0.8 });
  smStream.write({ url: '/resenhas/filmes-series', changefreq: 'weekly', priority: 0.8 });

  // Categorias de Tabuleiro
  smStream.write({ url: '/jogos-tabuleiro', changefreq: 'weekly', priority: 0.8 });

  // 3. Páginas Dinâmicas (Mapeia o array de posts automaticamente)
  posts.forEach((post) => {
    smStream.write({
      url: post.url,
      lastmod: post.date,
      changefreq: 'weekly',
      priority: 0.8,
    });
  });

  smStream.end();

  // Gera o arquivo final
  const sitemapXml = await streamToPromise(smStream);
  fs.writeFileSync(path.join(__dirname, 'sitemap.xml'), sitemapXml.toString());
  console.log('✅ sitemap.xml atualizado com todas as URLs do projeto!');
}

generate();