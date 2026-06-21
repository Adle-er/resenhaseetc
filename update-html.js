const fs = require('fs');
const path = require('path');
const dir = 'jogos-tabuleiro';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

const actionHTML = `
                <!-- ── ACTIONS (COMPRAR / ALUGAR) ── -->
                <section class="actions-section" style="margin-top: 2rem; display: flex; gap: 1rem; align-items: center; flex-wrap: wrap;">
                    <button class="btn-primary" id="btn-alugar" style="background-color: var(--secondary); border:none; cursor: pointer;">📅 Alugar</button>
                    <a href="#" class="btn-primary" id="btn-buy" target="_blank" rel="noopener noreferrer">🛒 Ver onde comprar</a>
                </section>
`;

files.forEach(file => {
    let content = fs.readFileSync(path.join(dir, file), 'utf8');
    
    if (!content.includes('id="btn-alugar"')) {
        content = content.replace(/(<div class="detail-synopsis" id="detail-synopsis">[\s\S]*?<\/div>)/, '$1\n' + actionHTML);
    }

    if (!content.includes('src="../js/game.js')) {
        content = content.replace('</body>', '    <script src="../js/data.js?v=2"></script>\n    <script src="../js/game.js?v=2"></script>\n</body>');
    }

    fs.writeFileSync(path.join(dir, file), content);
    console.log('Updated ' + file);
});
