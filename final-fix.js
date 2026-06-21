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

    // Remove pricing-section and replace with new action buttons
    // The section starts with <section id="pricing-section"
    // We will slice from there until the next </section>
    
    let priceStart = content.indexOf('<section id="pricing-section"');
    if (priceStart !== -1) {
        let priceEnd = content.indexOf('</section>', priceStart) + 10;
        content = content.substring(0, priceStart) + actionHTML + content.substring(priceEnd);
    } else {
        // Fallback if pricing section not found
        if (!content.includes('id="btn-alugar"')) {
            content = content.replace(/(<\/div>\s*<\/section>)/, '$1\n' + actionHTML);
        }
    }

    // Remove calendar-section
    let calStart = content.indexOf('<section class="calendar-section" id="calendar-section"');
    if (calStart !== -1) {
        let calEnd = content.indexOf('</section>', calStart) + 10;
        content = content.substring(0, calStart) + content.substring(calEnd);
    }
    // Remove the comment before calendar
    content = content.replace(/<!-- ── CALENDAR SECTION ── -->\s*/, '');

    // Remove reviews-section
    let revStart = content.indexOf('<section class="reviews-section"');
    if (revStart !== -1) {
        let revEnd = content.indexOf('</section>', revStart) + 10;
        content = content.substring(0, revStart) + content.substring(revEnd);
    }
    // Remove the comment before reviews
    content = content.replace(/<!-- ── REVIEWS ── -->\s*/, '');

    // Remove RENTAL MODAL
    let modStart = content.indexOf('<div class="modal-overlay" id="rental-modal"');
    if (modStart !== -1) {
        // Modal ends with two </div> since it has <div class="modal"> inside
        // Just look for the comment <!-- Toast notification -->
        let modEnd = content.indexOf('<!-- Toast notification -->');
        if (modEnd !== -1) {
            content = content.substring(0, modStart) + content.substring(modEnd);
        }
    }
    content = content.replace(/<!-- ═══════════════════════════════════════════\s*RENTAL MODAL\s*════════════════════════════════════════════ -->\s*/, '');

    // Add scripts at the end if not present
    if (!content.includes('src="../js/game.js')) {
        content = content.replace('</body>', '    <script src="../js/data.js?v=2"></script>\n    <script src="../js/game.js?v=2"></script>\n</body>');
    }

    fs.writeFileSync(path.join(dir, file), content);
    console.log('Fixed functionality from ' + file);
});
