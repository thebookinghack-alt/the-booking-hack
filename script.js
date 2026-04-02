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

// Newsletter Form - Migliorato
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

    // Simulazione invio (puoi collegare Formspree in futuro)
    setTimeout(() => {
        alert(`Grazie! Ti abbiamo inviato una email di conferma a ${email}.\n\nRiceverai le migliori offerte direttamente nella tua inbox.`);
        e.target.reset();
        btn.textContent = originalText;
        btn.style.background = '';
        btn.disabled = false;
    }, 1500);
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            e.preventDefault();
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            // Chiudi menu mobile se aperto
            const navLinks = document.getElementById('navLinks');
            if (navLinks) navLinks.classList.remove('active');
        }
    });
});

// Header scroll effect
let lastScroll = 0;
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (!header) return;
    
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        header.style.boxShadow = '0 4px 20px rgba(0,0,0,0.1)';
    } else {
        header.style.boxShadow = 'none';
    }
    
    lastScroll = currentScroll;
});

// Initialize everything
document.addEventListener('DOMContentLoaded', () => {
    checkCookies();
    
    // Calcolatore (lo lasciamo attivo come era)
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
