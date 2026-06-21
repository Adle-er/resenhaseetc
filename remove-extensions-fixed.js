const fs = require('fs');
const path = require('path');

const rootDir = process.cwd();

// 1. Create vercel.json
const vercelConfig = {
  "cleanUrls": true
};
fs.writeFileSync(path.join(rootDir, 'vercel.json'), JSON.stringify(vercelConfig, null, 2), 'utf8');
console.log('✓ Created vercel.json with cleanUrls: true');

// 2. Helper to find all HTML files
function getHtmlFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    if (file === 'node_modules' || file === '.git' || file === '.gemini' || file === '.system_generated') {
      return;
    }
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat && stat.isDirectory()) {
      results = results.concat(getHtmlFiles(filePath));
    } else if (file.endsWith('.html')) {
      results.push(filePath);
    }
  });
  return results;
}

const htmlFiles = getHtmlFiles(rootDir);

// 3. Process HTML files
htmlFiles.forEach(filePath => {
  let content = fs.readFileSync(filePath, 'utf8');
  let original = content;

  // Determine file depth for relative homepage links
  const relPath = path.relative(rootDir, filePath);
  const normalizedRelPath = relPath.replace(/\\/g, '/');
  const parts = normalizedRelPath.split('/');
  const depth = parts.length - 1;
  const homepageReplacement = depth > 0 ? '../'.repeat(depth) : '/';

  // Replace links
  // index.html at root level -> /
  // ../index.html -> ../ (or repeat depending on depth)
  content = content.replace(/href="index\.html"/g, `href="${homepageReplacement}"`);
  content = content.replace(/href="\.\.\/index\.html"/g, `href="${depth > 1 ? '../'.repeat(depth) : '../'}"`);
  
  // sobre.html -> sobre
  content = content.replace(/href="sobre\.html"/g, 'href="sobre"');
  content = content.replace(/href="\.\.\/sobre\.html"/g, 'href="../sobre"');
  content = content.replace(/href="\/sobre\.html"/g, 'href="/sobre"');

  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✓ Removed extensions in links for ${relPath}`);
  }
});

// 4. Process js/app.js
const appJsPath = path.join(rootDir, 'js', 'app.js');
if (fs.existsSync(appJsPath)) {
  let content = fs.readFileSync(appJsPath, 'utf8');
  let original = content;

  // Replace dynamic page routing link
  content = content.replace(/`\/\${slug}\/\${item\.id}\.html`/g, '`/${slug}/${item.id}`');

  if (content !== original) {
    fs.writeFileSync(appJsPath, content, 'utf8');
    console.log('✓ Updated card navigation links in js/app.js');
  }
}

console.log('Clean URLs configuration complete!');
