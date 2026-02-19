/**
 * ============================================
 * 🏛️ SCRIPT VENEZIA - TheBookingHack
 * ============================================
 * Logica della pagina: filtri, calcolatore, rendering offerte
 */

// ============================================
// 🎯 RENDER OFFERTE
// ============================================
function renderOfferte(filter = 'all') {
    const grid = document.getElementById('dealsGrid');
    const emptyState = document.getElementById('emptyState');
    
    if (!grid) return;
    
    // Filtra offerte
    let offerteFiltrate = VENEZIA_OFFERTE;
    if (filter !== 'all') {
        offerteFiltrate = VENEZIA_OFFERTE.filter(offerta => offerta.categoria === filter);
    }
    
    // Mostra/nascondi empty state
    if (offerteFiltrate.length === 0) {
        grid.innerHTML = '';
        emptyState.style.display = 'block';
        return;
    }
    emptyState.style.display = 'none';
    
    // Render card
    grid.innerHTML = offerteFiltrate.map(offerta => createCardHTML(offerta)).join('');
}

function createCardHTML(offerta) {
    // Calcola sconto percentuale
    const sconto = calcolaSconto(offerta.prezzo, offerta.prezzoOriginale);
    
    // Verifica se offerta è scaduta
    const isScaduta = offerta.scadenza && new Date(offerta.scadenza) < new Date();
    const scadenzaText = offerta.scadenza ? formattaScadenza(offerta.scadenza) : '';
    
    return `
        <article class="deal-card-venezia ${isScaduta ? 'scaduta' : ''}" data-category="${offerta.categoria}">
            ${offerta.badge ? `<span class="deal-badge-venezia">${offerta.badge}</span>` : ''}
            ${scadenzaText && !isScaduta ? `<span class="deal-scadenza">${scadenzaText}</span>` : ''}
            ${sconto > 0 ? `<span class="deal-sconto">-${sconto}%</span>` : ''}
            
            <div class="deal-image">
                <img src="${offerta.immagine}" alt="${offerta.titolo}" loading="lazy">
            </div>
            
            <div class="deal-content">
                <span class="deal-categoria">${getCategoriaIcon(offerta.categoria)} ${capitalize(offerta.categoria)}</span>
                <h3>${offerta.titolo}</h3>
                <p>${offerta.descrizione}</p>
                
                <div class="deal-footer">
                    <div class="deal-price-venezia">
                        <span class="old-price">${offerta.prezzoOriginale}</span>
                        <span class="new-price">${offerta.prezzo}</span>
                    </div>
                    <a href="${offerta.link}" 
                       class="btn-deal ${isScaduta ? 'disabled' : ''}" 
                       target="_blank" 
                       rel="noopener"
                       ${isScaduta ? 'onclick="return false;"' : ''}>
                        ${isScaduta ? 'Scaduta' : 'Vedi Offerta →'}
                    </a>
                </div>
            </div>
        </article>
    `;
}

function calcolaSconto(prezzo, prezzoOriginale) {
    const p = parseFloat(prezzo.replace(/[^0-9]/g, ''));
    const po = parseFloat(prezzoOriginale.replace(/[^0-9]/g, ''));
    if (!po || !p) return 0;
    return Math.round(((po - p) / po) * 100);
}

function formattaScadenza(dataString) {
    const scadenza = new Date(dataString);
    const oggi = new Date();
    const diffGiorni = Math.ceil((scadenza - oggi) / (1000 * 60 * 60 * 24));
    
    if (diffGiorni < 0) return 'Scaduta';
    if (diffGiorni === 0) return '⏰ Scade oggi!';
    if (diffGiorni === 1) return '⏰ Scade domani!';
    if (diffGiorni <= 7) return `⏰ Scade tra ${diffGiorni} giorni`;
    return '';
}

function getCategoriaIcon(categoria) {
    const icons = {
        food: '🍷',
        trasporti: '🚤',
        dormire: '🏨',
        attivita: '🎭'
    };
    return icons[categoria] || '📌';
}

function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

// ============================================
// 🔘 FILTRI
// ============================================
function filterDeals(category) {
    // Aggiorna bottoni attivi
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.filter === category) {
            btn.classList.add('active');
        }
    });
    
    // Render offerte filtrate
    renderOfferte(category);
    
    // Traccia evento
    if (typeof trackEvent !== 'undefined') {
        trackEvent('filter_used', { category });
    }
}

// ============================================
// 🧮 CALCOLATORE VENEZIA
// ============================================
function calcolaVenezia() {
    const nights = parseInt(document.getElementById('veneziaNights')?.value) || 2;
    const people = parseInt(document.getElementById('veneziaPeople')?.value) || 2;
    const stagione = document.getElementById('veneziaStagione')?.value || 'media';
    
    const prezzi = VENEZIA_PREZZI;
    
    // Calcoli
    const hotelCost = prezzi.hotel[stagione] * nights;
    const foodCost = prezzi.food[stagione] * nights * people;
    const trasportiCost = prezzi.trasporti.vaporetto * people + prezzi.trasporti.gondola * people;
    const attivitaCost = prezzi.attivita.min * people;
    
    const totalBase = hotelCost + foodCost + trasportiCost + attivitaCost;
    
    // Risparmio con offerte (stima)
    const risparmioHotel = hotelCost * 0.35;  // 35% sconto medio
    const risparmioFood = foodCost * 0.20;    // 20% sconto medio
    const risparmioTrasporti = 10;            // Pass scontato
    const risparmioAttivita = attivitaCost * 0.30;  // 30% sconto medio
    
    const totaleRisparmio = Math.round(risparmioHotel + risparmioFood + risparmioTrasporti + risparmioAttivita);
    const totaleConOfferte = totalBase - totaleRisparmio;
    
    // Aggiorna UI
    const totalEl = document.getElementById('veneziaTotal');
    const savingsEl = document.getElementById('veneziaSavings');
    const breakdownEl = document.getElementById('veneziaBreakdown');
    
    if (totalEl) {
        animateCounter(totalEl, 0, totaleConOfferte, 800, '€');
    }
    
    if (savingsEl) {
        savingsEl.textContent = '€' + totaleRisparmio.toLocaleString('it-IT');
    }
    
    if (breakdownEl) {
        breakdownEl.innerHTML = `
            <li><span>🏨 Hotel (${nights} notti)</span><span>€${hotelCost}</span></li>
            <li><span>🍝 Cibo (${nights} giorni × ${people} persone)</span><span>€${foodCost}</span></li>
            <li><span>🚤 Trasporti</span><span>€${trasportiCost}</span></li>
            <li><span>🎭 Attività base</span><span>€${attivitaCost}</span></li>
            <li class="total-line">
                <span>Totale senza offerte</span>
                <span class="strike">€${totalBase}</span>
            </li>
            <li class="savings-line">
                <span>💰 Con le nostre offerte</span>
                <span>€${totaleConOfferte}</span>
            </li>
        `;
    }
}

// Animazione contatore
function animateCounter(element, start, end, duration, prefix = '') {
    const startTime = performance.now();
    
    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easeOut = 1 - Math.pow(1 - progress, 3);
        const current = Math.round(start + (end - start) * easeOut);
        
        element.textContent = prefix + current.toLocaleString('it-IT');
        
        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }
    
    requestAnimationFrame(update);
}

// ============================================
// 📱 MOBILE MENU (override per venezia)
// ============================================
function toggleMenu() {
    const navLinks = document.getElementById('navLinks');
    if (navLinks) {
        navLinks.classList.toggle('show');
    }
}

// ============================================
// 🚀 INIZIALIZZAZIONE
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    // Render offerte iniziali
    renderOfferte('all');
    
    // Calcola prezzi iniziali
    calcolaVenezia();
    
    // Cookie banner
    if (typeof initCookieBanner !== 'undefined') {
        initCookieBanner();
    }
    
    console.log('🏛️ Venezia page loaded - The Booking Hack');
});
