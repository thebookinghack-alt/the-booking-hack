// =============================================
// SCRIPT.JS - The Booking Hack
// Versione ottimizzata con Google Sheets
// =============================================

// Cookie Management
function acceptCookies() {
    localStorage.setItem('cookiesAccepted', 'true');
    const banner = document.getElementById('cookie-banner');
    if (banner) banner.classList.remove('show');
}

function checkCookies() {
    if (!localStorage.getItem('cookiesAccepted')) {
        const banner = document.getElementById('cookie-banner');
        if (banner) {
            setTimeout(() => {
                banner.classList.add('show');
            }, 1200);
        }
    }
}

// Mobile Menu
function toggleMenu() {
    const navLinks = document.getElementById('navLinks');
    if (navLinks) navLinks.classList.toggle('active');
}

// Calcolatore Risparmio (mantenuto come era)
function calculateSavings() {
    const destination = document.getElementById('destination').value;
    const nights = parseInt(document.getElementById('nights').value) || 3;
    const budget = parseInt(document.getElementById('budget').value) || 500;
   
    const multipliers = {
        'europa': 0.35,
        'usa': 0.30,
        'asia': 0.40,
        'italia': 0.25
    };
   
    const baseSaving = budget * (multipliers[destination] || 0.30);
    const hotelSaving = nights * 25;
    const flightSaving = destination === 'italia' ? 30 : 80;
   
    const totalSaving = Math.round(baseSaving + hotelSaving + flightSaving);
    const percentage = Math.round((totalSaving / budget) * 100);
   
    document.getElementById('savingsAmount').textContent = `€${totalSaving}`;
   
    const breakdown = document.getElementById('savingsBreakdown');
    breakdown.innerHTML = `
        <li><span>Sconto strategie:</span> <span>€${Math.round(baseSaving)}</span></li>
        <li><span>Risparmio hotel:</span> <span>€${hotelSaving}</span></li>
        <li><span>Risparmio volo:</span> <span>€${flightSaving}</span></li>
        <li style="border-top: 2px solid rgba(255,255,255,0.3); margin-top: 8px; padding-top: 12px; font-weight: 700;">
            <span>Totale (${percentage}%):</span> <span>€${totalSaving}</span>
        </li>
    `;
}

// Newsletter Form
function handleSubscribe(e) {
    e.preventDefault();
    const emailInput = e.target.querySelector('input[type="email"]');
    const email = emailInput ? emailInput.value.trim() : '';
    const btn = e.target.querySelector('button');
    
    if (!email) return;

    const originalText = btn.textContent;
    btn.textContent = '✓ Iscritto!';
    btn.style.background = '#10b981';
    btn.disabled = true;

    setTimeout(() => {
        alert(`Grazie! Ti abbiamo iscritto con successo.\n\nRiceverai le migliori offerte direttamente su ${email}.`);
        e.target.reset();
        btn.textContent = originalText;
        btn.style.background = '';
        btn.disabled = false;
    }, 1500);
}

// Caricamento Offerte da Google Sheets
async function loadOffersFromSheets() {
    const sheetUrl = 'https://script.google.com/macros/s/AKfycbypBEPKerz5NT_fJjAO68nzSpr-AqE4nB4qFFXYx7KNK54b-dtOmHDrzlbkBRP9QVoz/exec';
    
    try {
        const response = await fetch(sheetUrl);
        const data = await response.json();

        // Carica offerte nella Homepage
        const dealsGrid = document.getElementById('deals-grid');
        if (dealsGrid && data.homepage) {
            dealsGrid.innerHTML = '';
            data.homepage.forEach(deal => {
                const cardHTML = `
                    <div class="deal-card">
                        <img src="${deal.image}" alt="${deal.title}" style="width:100%; height:180px; object-fit:cover; border-radius:8px;">
                        <h4>${deal.title}</h4>
                        <div class="deal-price">
                            <span class="old-price">€${deal.originalPrice}</span>
                            <span class="new-price">€${deal.price}</span>
                        </div>
                        <a href="${deal.link}" target="_blank" class="btn-small">Vedi offerta</a>
                    </div>
                `;
                dealsGrid.innerHTML += cardHTML;
            });
        }

        // Carica offerte nella pagina Venezia
        const veneziaGrid = document.getElementById('venezia-grid');
        if (veneziaGrid && data.venezia) {
            veneziaGrid.innerHTML = '';
            data.venezia.forEach(deal => {
                const cardHTML = `
                    <div class="deal-card">
                        <img src="${deal.immagine}" alt="${deal.titolo}" style="width:100%; height:180px; object-fit:cover; border-radius:8px;">
                        <h4>${deal.titolo}</h4>
                        <p style="font-size:0.95rem; color:#555;">${deal.descrizione}</p>
                        <div class="deal-price">
                            <span class="old-price">${deal.prezzoOriginale}</span>
                            <span class="new-price">${deal.prezzo}</span>
                        </div>
                        <a href="${deal.linkAffiliazione}" target="_blank" class="btn-small">Vedi offerta</a>
                    </div>
                `;
                veneziaGrid.innerHTML += cardHTML;
            });
        }

    } catch (error) {
        console.log("Errore nel caricamento delle offerte da Google Sheets:", error);
    }
}

// Smooth scroll per i link interni
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            e.preventDefault();
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            const navLinks = document.getElementById('navLinks');
            if (navLinks) navLinks.classList.remove('active');
        }
    });
});

// Header scroll effect
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (!header) return;
    
    if (window.pageYOffset > 100) {
        header.style.boxShadow = '0 4px 20px rgba(0,0,0,0.1)';
    } else {
        header.style.boxShadow = 'none';
    }
});

// Inizializzazione
document.addEventListener('DOMContentLoaded', () => {
    checkCookies();
    
    // Carica offerte da Google Sheets
    loadOffersFromSheets();
    
    // Calcolatore in tempo reale
    if (typeof calculateSavings === 'function') {
        calculateSavings();
        ['destination', 'nights', 'budget'].forEach(id => {
            const el = document.getElementById(id);
            if (el) {
                el.addEventListener('change', calculateSavings);
                el.addEventListener('input', calculateSavings);
            }
        });
    }
});
