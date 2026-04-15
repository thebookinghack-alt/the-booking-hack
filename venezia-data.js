/**
 * ============================================
 * 🏛️ DATI OFFERTE VENEZIA - TheBookingHack
 * ============================================
 * 
 * ✅ TUTTI I DATI INVENTATI SONO STATI RIMOSSI
 * Usa Google Sheets per aggiungere le tue offerte reali
 * (vedi GUIDA_SHEETS.md o TEMPLATE_SHEETS.md)
 */

const VENEZIA_OFFERTE = [
    // ← Inserisci qui le tue offerte reali dal foglio Google
];

// ============================================
// 📊 DATI CALCOLATORE VENEZIA (mantenuti perché generici)
const VENEZIA_PREZZI = {
    hotel: { bassa: 45, media: 70, alta: 120 },
    food: { bassa: 25, media: 35, alta: 50 },
    trasporti: { vaporetto: 25, gondola: 15 },
    attivita: { min: 15, max: 40 }
};

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { VENEZIA_OFFERTE, VENEZIA_PREZZI };
}
