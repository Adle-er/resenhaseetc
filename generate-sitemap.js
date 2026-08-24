const fs = require('fs');
const path = require('path');
const { SitemapStream, streamToPromise } = require('sitemap');

// Importe ou defina seu array de posts aqui
const posts = [
  { url: '/etc/vazamentos-gta-vi', date: '2026-08-23' },
  // Adicione suas matérias aqui ou importe direto do seu arquivo de dados
];

async function generate() {
  const smStream = new SitemapStream({ hostname: 'https://www.resenhaseetc.com.br' });

  // 1. Páginas Estáticas
  smStream.write({ url: '/', changefreq: 'daily', priority: 1.0 });
  smStream.write({ url: '/etc', changefreq: 'daily', priority: 0.9 });
  smStream.write({ url: '/jogos-tabuleiro', changefreq: 'weekly', priority: 0.8 });
  smStream.write({ url: '/sobre', changefreq: 'monthly', priority: 0.5 });
  smStream.write({ url: '/resenhas/jogos', changefreq: 'weekly', priority: 0.8 });
  smStream.write({ url: '/resenhas/livros', changefreq: 'weekly', priority: 0.8 });
  smStream.write({ url: '/resenhas/quadrinhos', changefreq: 'weekly', priority: 0.8 });
  smStream.write({ url: '/resenhas/filmes-series', changefreq: 'weekly', priority: 0.8 });

  // 2. Páginas Dinâmicas (Mapeia o array de posts automaticamente)
  posts.forEach((post) => {
    smStream.write({
      url: post.url,
      lastmod: post.date,
      changefreq: 'weekly',
      priority: 0.8,
    });
  });

  smStream.end();

  // Gera o arquivo na pasta public ou raiz
  const sitemapXml = await streamToPromise(smStream);
  fs.writeFileSync(path.join(__dirname, 'sitemap.xml'), sitemapXml.toString());
  console.log('✅ sitemap.xml gerado com sucesso!');
}

generate();