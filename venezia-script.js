/**
 * ============================================
 * 🏛️ SCRIPT VENEZIA - TheBookingHack
 * Versione 2.3 - GA4 Ready
 * ============================================
 */

function renderOfferte(filter = 'all') {
    const grid = document.getElementById('dealsGrid');
    const emptyState = document.getElementById('emptyState');
    if (!grid) return;

    let offerteFiltrate = VENEZIA_OFFERTE;
    if (filter !== 'all') {
        offerteFiltrate = VENEZIA_OFFERTE.filter(o => o.categoria === filter);
    }

    if (offerteFiltrate.length === 0) {
        grid.innerHTML = '';
        emptyState.style.display = 'block';
        return;
    }
    emptyState.style.display = 'none';
    grid.innerHTML = offerteFiltrate.map(o => createCardHTML(o)).join('');
}

function createCardHTML(offerta) {
    const sconto = calcolaSconto(offerta.prezzo, offerta.prezzoOriginale);
    const isScaduta = offerta.scadenza && new Date(offerta.scadenza) < new Date();

    return `
        <article class="deal-card-venezia ${isScaduta ? 'scaduta' : ''}">
            ${offerta.badge ? `<span class="deal-badge-venezia">${offerta.badge}</span>` : ''}
            ${sconto > 0 ? `<span class="deal-sconto">-${sconto}%</span>` : ''}
            <div class="deal-image">
                <img src="${offerta.immagine}" alt="${offerta.titolo}" loading="lazy">
            </div>
            <div class="deal-content">
                <span class="deal-categoria">${getCategoriaIcon(offerta.categoria)} ${capitalize(offerta.categoria)}</span>
                <h3>${offerta.titolo}</h3>
                <p>${offerta.descrizione}</p>
                <div class="deal-price-row">
                    <span class="old-price">${offerta.prezzoOriginale}</span>
                    <span class="new-price">${offerta.prezzo}</span>
                </div>
                <a href="${offerta.link}" class="btn-deal ${isScaduta ? 'disabled' : ''}" target="_blank" rel="noopener">
                    ${isScaduta ? 'Scaduta' : 'Vedi Offerta →'}
                </a>
            </div>
        </article>
    `;
}

function calcolaSconto(p, po) {
    const prezzo = parseFloat(p.replace(/[^0-9]/g, ''));
    const originale = parseFloat(po.replace(/[^0-9]/g, ''));
    if (!originale || !prezzo) return 0;
    return Math.round(((originale - prezzo) / originale) * 100);
}

function getCategoriaIcon(cat) {
    const icons = { food: '🍷', trasporti: '🚤', dormire: '🏨', attivita: '🎭' };
    return icons[cat] || '📌';
}

function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

function filterDeals(category) {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.toggle('active', b.dataset.filter === category));
    renderOfferte(category);
    trackEvent('filter_used', { category });
}

function calcolaVenezia() {
    // (mantengo la logica originale del calcolatore Venezia)
    const nights = parseInt(document.getElementById('veneziaNights')?.value) || 2;
    const people = parseInt(document.getElementById('veneziaPeople')?.value) || 2;
    const stagione = document.getElementById('veneziaStagione')?.value || 'media';
    
    const prezzi = VENEZIA_PREZZI;
    const hotelCost = prezzi.hotel[stagione] * nights;
    const foodCost = prezzi.food[stagione] * nights * people;
    const trasportiCost = prezzi.trasporti.vaporetto * people + prezzi.trasporti.gondola * people;
    const attivitaCost = prezzi.attivita.min * people;
    
    const totalBase = hotelCost + foodCost + trasportiCost + attivitaCost;
    const totaleRisparmio = Math.round(hotelCost * 0.35 + foodCost * 0.20 + 10 + attivitaCost * 0.30);
    const totaleConOfferte = totalBase - totaleRisparmio;

    const totalEl = document.getElementById('veneziaTotal');
    if (totalEl) animateCounter(totalEl, 0, totaleConOfferte, 800, '€');

    document.getElementById('veneziaSavings').textContent = '€' + totaleRisparmio;
    // ... (breakdown HTML invariato)
}

function animateCounter(element, start, end, duration, prefix = '') {
  const startTime = performance.now();
  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const ease = 1 - Math.pow(1 - progress, 3);
    const current = Math.round(start + (end - start) * ease);
    element.textContent = prefix + current.toLocaleString('it-IT');
    if (progress < 1) requestAnimationFrame(update);
  }
  requestAnimationFrame(update);
}

function toggleMenu() {
  const navLinks = document.getElementById('navLinks');
  if (navLinks) navLinks.classList.toggle('show');
}

// INIZIALIZZAZIONE
document.addEventListener('DOMContentLoaded', () => {
    renderOfferte('all');
    calcolaVenezia();
    console.log('🏛️ Venezia page loaded with GA4');
});
