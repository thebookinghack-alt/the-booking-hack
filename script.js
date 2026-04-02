/**
 * THE BOOKING HACK - Script Unificato
 * Versione 2.0 - Ottimizzato
 * 
 * Funzionalità:
 * - Cookie banner GDPR-compliant
 * - Mobile menu toggle
 * - Calcolatore risparmio
 * - Formspree integration (form reale)
 * - Lazy loading immagini
 * - Smooth scroll
 */

// ============================================
// CONFIGURAZIONE
// ============================================
const CONFIG = {
  // Sostituisci con il tuo endpoint Formspree
  // Iscriviti gratis su: https://formspree.io/
  FORMSPREE_ENDPOINT: 'https://formspree.io/f/YOUR_FORM_ID',
  
  // Tassi di risparmio per destinazione
  SAVINGS_RATES: {
    europa: { hotel: 0.25, voli: 0.20, bundle: 0.35 },
    usa: { hotel: 0.30, voli: 0.25, bundle: 0.40 },
    asia: { hotel: 0.35, voli: 0.30, bundle: 0.45 },
    italia: { hotel: 0.20, voli: 0.15, bundle: 0.30 }
  },
  
  // Costi medi per notte
  NIGHTLY_RATES: {
    europa: 120,
    usa: 180,
    asia: 80,
    italia: 100
  }
};

// ============================================
// COOKIE BANNER - GDPR Compliant
// ============================================
function initCookieBanner() {
  const banner = document.getElementById('cookie-banner');
  const accepted = localStorage.getItem('cookiesAccepted');
  
  if (!accepted && banner) {
    // Mostra banner dopo 1 secondo
    setTimeout(() => {
      banner.classList.add('show');
    }, 1000);
  }
}

function acceptCookies() {
  const banner = document.getElementById('cookie-banner');
  localStorage.setItem('cookiesAccepted', 'true');
  localStorage.setItem('cookiesAcceptedDate', new Date().toISOString());
  
  if (banner) {
    banner.classList.remove('show');
    setTimeout(() => {
      banner.style.display = 'none';
    }, 300);
  }
  
  // Attiva Google Analytics se presente
  if (typeof gtag !== 'undefined') {
    gtag('consent', 'update', {
      'analytics_storage': 'granted',
      'ad_storage': 'granted'
    });
  }
}

// ============================================
// MOBILE MENU
// ============================================
function toggleMenu() {
  const navLinks = document.getElementById('navLinks');
  if (navLinks) {
    navLinks.classList.toggle('show');
  }
}

// Chiudi menu quando si clicca su un link
function initMobileMenu() {
  const navLinks = document.querySelectorAll('.nav-links a');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      const menu = document.getElementById('navLinks');
      if (menu) {
        menu.classList.remove('show');
      }
    });
  });
}

// ============================================
// CALCOLATORE RISPARMIO
// ============================================
function calculateSavings() {
  const destination = document.getElementById('destination')?.value || 'europa';
  const nights = parseInt(document.getElementById('nights')?.value) || 3;
  const budget = parseInt(document.getElementById('budget')?.value) || 500;
  
  const rates = CONFIG.SAVINGS_RATES[destination] || CONFIG.SAVINGS_RATES.europa;
  const nightlyRate = CONFIG.NIGHTLY_RATES[destination] || CONFIG.NIGHTLY_RATES.europa;
  
  // Calcoli
  const hotelCost = nights * nightlyRate;
  const flightCost = budget * 0.4; // Stima 40% volo
  const otherCost = budget - hotelCost - flightCost;
  
  const hotelSavings = Math.round(hotelCost * rates.hotel);
  const flightSavings = Math.round(flightCost * rates.voli);
  const bundleExtraSavings = Math.round((hotelCost + flightCost) * (rates.bundle - Math.max(rates.hotel, rates.voli)) * 0.3);
  
  const totalSavings = hotelSavings + flightSavings + bundleExtraSavings;
  const savingsPercent = Math.round((totalSavings / budget) * 100);
  
  // Aggiorna UI
  const savingsAmount = document.getElementById('savingsAmount');
  const savingsBreakdown = document.getElementById('savingsBreakdown');
  
  if (savingsAmount) {
    // Animazione contatore
    animateCounter(savingsAmount, 0, totalSavings, 1000, '€');
  }
  
  if (savingsBreakdown) {
    savingsBreakdown.innerHTML = `
      <li>
        <span>🏨 Hotel (${Math.round(rates.hotel * 100)}% di sconto)</span>
        <span>€${hotelSavings}</span>
      </li>
      <li>
        <span>✈️ Voli (${Math.round(rates.voli * 100)}% di sconto)</span>
        <span>€${flightSavings}</span>
      </li>
      <li>
        <span>💎 Bundle extra</span>
        <span>€${bundleExtraSavings}</span>
      </li>
      <li style="border-top: 2px solid rgba(255,255,255,0.3); margin-top: 0.5rem; padding-top: 0.5rem; font-weight: 700;">
        <span>Totale risparmio (${savingsPercent}%)</span>
        <span>€${totalSavings}</span>
      </li>
    `;
  }
  
  // Traccia evento
  trackEvent('calculator_used', {
    destination,
    nights,
    budget,
    savings: totalSavings
  });
}

// Animazione contatore
function animateCounter(element, start, end, duration, prefix = '') {
  const startTime = performance.now();
  
  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    
    // Easing ease-out
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
// FORMSPREE INTEGRATION - Form Reale
// ============================================
async function handleSubscribe(event) {
  event.preventDefault();
  
  const form = event.target;
  const emailInput = form.querySelector('input[type="email"]');
  const submitBtn = form.querySelector('button[type="submit"]');
  const email = emailInput?.value?.trim();
  
  if (!email) {
    showNotification('Inserisci un indirizzo email valido', 'error');
    return;
  }
  
  // Validazione email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    showNotification('Formato email non valido', 'error');
    return;
  }
  
  // Disabilita bottone durante invio
  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.textContent = 'Iscrizione in corso...';
  }
  
  try {
    // Se hai configurato Formspree
    if (CONFIG.FORMSPREE_ENDPOINT.includes('YOUR_FORM_ID')) {
      // Demo mode - simula successo
      await simulateFormSubmit();
      showNotification('✅ Iscrizione completata! Controlla la tua email.', 'success');
    } else {
      // Formspree reale
      const response = await fetch(CONFIG.FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          email: email,
          source: 'newsletter_homepage',
          date: new Date().toISOString()
        })
      });
      
      if (response.ok) {
        showNotification('✅ Iscrizione completata! Controlla la tua email.', 'success');
        trackEvent('newsletter_subscribe', { email: email.substring(0, 3) + '***' });
      } else {
        throw new Error('Errore server');
      }
    }
    
    // Reset form
    form.reset();
    
    // Salva in localStorage per tracciare
    const subscribers = JSON.parse(localStorage.getItem('subscribers') || '[]');
    subscribers.push({
      email: email.substring(0, 3) + '***',
      date: new Date().toISOString()
    });
    localStorage.setItem('subscribers', JSON.stringify(subscribers));
    
  } catch (error) {
    console.error('Errore iscrizione:', error);
    showNotification('❌ Errore durante l\'iscrizione. Riprova.', 'error');
  } finally {
    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.textContent = 'Iscriviti Gratis';
    }
  }
}

// Simula invio form per demo
function simulateFormSubmit() {
  return new Promise(resolve => setTimeout(resolve, 1500));
}

// ============================================
// NOTIFICHE
// ============================================
function showNotification(message, type = 'info') {
  // Rimuovi notifiche esistenti
  const existing = document.querySelector('.notification');
  if (existing) existing.remove();
  
  const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;
  notification.innerHTML = `
    <span>${message}</span>
    <button onclick="this.parentElement.remove()">✕</button>
  `;
  
  // Stili inline per semplicità
  notification.style.cssText = `
    position: fixed;
    top: 90px;
    right: 20px;
    padding: 1rem 1.5rem;
    border-radius: 8px;
    color: white;
    font-weight: 500;
    display: flex;
    align-items: center;
    gap: 1rem;
    z-index: 10000;
    animation: slideIn 0.3s ease;
    max-width: 400px;
    background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#2563eb'};
    box-shadow: 0 10px 25px rgba(0,0,0,0.2);
  `;
  
  document.body.appendChild(notification);
  
  // Auto-remove dopo 5 secondi
  setTimeout(() => {
    if (notification.parentElement) {
      notification.style.animation = 'slideOut 0.3s ease forwards';
      setTimeout(() => notification.remove(), 300);
    }
  }, 5000);
}

// ============================================
// LAZY LOADING IMMAGINI
// ============================================
function initLazyLoading() {
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          if (img.dataset.src) {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
            img.classList.add('loaded');
          }
          observer.unobserve(img);
        }
      });
    }, {
      rootMargin: '50px 0px',
      threshold: 0.01
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
      imageObserver.observe(img);
    });
  } else {
    // Fallback per browser vecchi
    document.querySelectorAll('img[data-src]').forEach(img => {
      img.src = img.dataset.src;
    });
  }
}

// ============================================
// SMOOTH SCROLL
// ============================================
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const headerOffset = 80;
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
        
        // Aggiorna URL
        history.pushState(null, null, href);
      }
    });
  });
}

// ============================================
// HEADER SCROLL EFFECT
// ============================================
function initHeaderScroll() {
  const header = document.querySelector('.header');
  let lastScroll = 0;
  
  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
      header.style.boxShadow = '0 4px 20px rgba(0,0,0,0.1)';
    } else {
      header.style.boxShadow = 'none';
    }
    
    lastScroll = currentScroll;
  }, { passive: true });
}

// ============================================
// ANALYTICS TRACKING (semplificato)
// ============================================
function trackEvent(eventName, data = {}) {
  // Google Analytics 4
  if (typeof gtag !== 'undefined') {
    gtag('event', eventName, data);
  }
  
  // Facebook Pixel
  if (typeof fbq !== 'undefined') {
    fbq('trackCustom', eventName, data);
  }
  
  // Console log per debug
  console.log('[Track]', eventName, data);
}

// ============================================
// DEALS COUNTDOWN TIMER
// ============================================
function initDealCountdowns() {
  const urgentDeals = document.querySelectorAll('.deal-card.urgent');
  
  urgentDeals.forEach(deal => {
    const badge = deal.querySelector('.deal-badge');
    if (!badge) return;
    
    // Imposta scadenza a 4 ore da ora
    let timeLeft = 4 * 60 * 60; // secondi
    
    const updateTimer = () => {
      const hours = Math.floor(timeLeft / 3600);
      const minutes = Math.floor((timeLeft % 3600) / 60);
      
      badge.textContent = `🔥 Scade tra ${hours}h ${minutes}m`;
      
      if (timeLeft > 0) {
        timeLeft--;
      } else {
        badge.textContent = '⏰ Scaduto';
        badge.style.background = '#6b7280';
        deal.classList.remove('urgent');
      }
    };
    
    updateTimer();
    setInterval(updateTimer, 60000); // Aggiorna ogni minuto
  });
}

// ============================================
// INIZIALIZZAZIONE
// ============================================
document.addEventListener('DOMContentLoaded', () => {
  // Cookie banner
  initCookieBanner();
  
  // Mobile menu
  initMobileMenu();
  
  // Lazy loading
  initLazyLoading();
  
  // Smooth scroll
  initSmoothScroll();
  
  // Header scroll effect
  initHeaderScroll();
  
  // Deal countdowns
  initDealCountdowns();
  
  // Calcola risparmio iniziale
  calculateSavings();
  
  console.log('🚀 The Booking Hack - v2.0 Loaded');
});

// ============================================
// CSS ANIMATIONS (injected)
// ============================================
const style = document.createElement('style');
style.textContent = `
  @keyframes slideIn {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
  
  @keyframes slideOut {
    from {
      transform: translateX(0);
      opacity: 1;
    }
    to {
      transform: translateX(100%);
      opacity: 0;
    }
  }
  
  img[data-src] {
    opacity: 0;
    transition: opacity 0.3s;
  }
  
  img.loaded {
    opacity: 1;
  }
`;
document.head.appendChild(style);
