/**
 * THE BOOKING HACK - Script Unificato
 * Versione 2.3 - GA4 + Iubenda Ready
 */

const CONFIG = {
  FORMSPREE_ENDPOINT: 'https://formspree.io/f/YOUR_FORM_ID', // ← Cambia con il tuo
  
  SAVINGS_RATES: {
    europa: { hotel: 0.25, voli: 0.20, bundle: 0.35 },
    usa: { hotel: 0.30, voli: 0.25, bundle: 0.40 },
    asia: { hotel: 0.35, voli: 0.30, bundle: 0.45 },
    italia: { hotel: 0.20, voli: 0.15, bundle: 0.30 }
  },
  
  NIGHTLY_RATES: {
    europa: 120,
    usa: 180,
    asia: 80,
    italia: 100
  }
};

// ============================================
// MOBILE MENU
function toggleMenu() {
  const navLinks = document.getElementById('navLinks');
  if (navLinks) navLinks.classList.toggle('show');
}

function initMobileMenu() {
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      const menu = document.getElementById('navLinks');
      if (menu) menu.classList.remove('show');
    });
  });
}

// ============================================
// CALCOLATORE RISPARMIO
function calculateSavings() {
  const destination = document.getElementById('destination')?.value || 'europa';
  const nights = parseInt(document.getElementById('nights')?.value) || 3;
  const budget = parseInt(document.getElementById('budget')?.value) || 500;
  
  const rates = CONFIG.SAVINGS_RATES[destination] || CONFIG.SAVINGS_RATES.europa;
  const nightlyRate = CONFIG.NIGHTLY_RATES[destination] || CONFIG.NIGHTLY_RATES.europa;
  
  const hotelCost = nights * nightlyRate;
  const flightCost = budget * 0.4;
  const hotelSavings = Math.round(hotelCost * rates.hotel);
  const flightSavings = Math.round(flightCost * rates.voli);
  const bundleExtraSavings = Math.round((hotelCost + flightCost) * (rates.bundle - Math.max(rates.hotel, rates.voli)) * 0.3);
  
  const totalSavings = hotelSavings + flightSavings + bundleExtraSavings;
  
  const savingsAmount = document.getElementById('savingsAmount');
  const savingsBreakdown = document.getElementById('savingsBreakdown');
  
  if (savingsAmount) animateCounter(savingsAmount, 0, totalSavings, 1000, '€');
  
  if (savingsBreakdown) {
    savingsBreakdown.innerHTML = `
      <li><span>🏨 Hotel</span><span>€${hotelSavings}</span></li>
      <li><span>✈️ Voli</span><span>€${flightSavings}</span></li>
      <li><span>💎 Bundle extra</span><span>€${bundleExtraSavings}</span></li>
      <li style="border-top:2px solid rgba(255,255,255,0.3);margin-top:0.5rem;padding-top:0.5rem;font-weight:700;">
        <span>Totale risparmio</span><span>€${totalSavings}</span>
      </li>
    `;
  }
  
  trackEvent('calculator_used', { destination, nights, budget, savings: totalSavings });
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

// ============================================
// FORM NEWSLETTER
async function handleSubscribe(event) {
  event.preventDefault();
  const form = event.target;
  const emailInput = form.querySelector('input[type="email"]');
  const submitBtn = form.querySelector('button');
  const email = emailInput?.value?.trim();

  if (!email) return showNotification('Inserisci un email valida', 'error');

  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.textContent = 'Iscrizione in corso...';
  }

  try {
    if (CONFIG.FORMSPREE_ENDPOINT.includes('YOUR_FORM_ID')) {
      await new Promise(r => setTimeout(r, 1200));
      showNotification('✅ Iscrizione completata!', 'success');
    } else {
      const res = await fetch(CONFIG.FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source: 'newsletter' })
      });
      if (res.ok) showNotification('✅ Iscrizione completata!', 'success');
    }
    form.reset();
    trackEvent('newsletter_subscribe');
  } catch (e) {
    showNotification('❌ Errore durante l\'iscrizione', 'error');
  } finally {
    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.textContent = 'Iscriviti Gratis';
    }
  }
}

// ============================================
// NOTIFICHE
function showNotification(message, type = 'info') {
  const notif = document.createElement('div');
  notif.style.cssText = `position:fixed;top:90px;right:20px;padding:1rem 1.5rem;border-radius:8px;color:white;z-index:10000;animation:slideIn 0.3s; background:${type==='success'?'#10b981':type==='error'?'#ef4444':'#0ea5e9'};`;
  notif.innerHTML = `<span>${message}</span><button onclick="this.parentElement.remove()" style="margin-left:10px;background:none;border:none;color:white;cursor:pointer;">✕</button>`;
  document.body.appendChild(notif);
  setTimeout(() => notif.remove(), 5000);
}

// ============================================
// GA4 TRACKING
function trackEvent(eventName, data = {}) {
  if (typeof gtag !== 'undefined') {
    gtag('event', eventName, data);
  }
  console.log('[GA4]', eventName, data);
}

// ============================================
// INIZIALIZZAZIONE
document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  calculateSavings();
  console.log('🚀 The Booking Hack - v2.3 Loaded with GA4 + Iubenda');
});
