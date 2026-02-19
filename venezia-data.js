/**
 * ============================================
 * 🏛️ DATI OFFERTE VENEZIA - TheBookingHack
 * ============================================
 * 
 * 🎯 COME AGGIUNGERE/MODIFICARE UN'OFFERTA:
 * 
 * 1. Copia un blocco esistente tra le parentesi graffe { }
 * 2. Modifica i valori:
 *    - id: codice univoco (es. 'food-1')
 *    - titolo: nome dell'offerta
 *    - descrizione: breve spiegazione
 *    - prezzo: prezzo scontato (es. "22€")
 *    - prezzoOriginale: prezzo pieno (es. "45€")
 *    - immagine: URL immagine (usa Unsplash o simili)
 *    - link: link affiliato
 *    - categoria: una tra: 'food', 'trasporti', 'dormire', 'attivita'
 *    - badge: etichetta opzionale (es. "🔥 Più Prenotato")
 *    - scadenza: data scadenza opzionale (formato: "2025-03-01")
 * 
 * 3. Salva il file e ricarica la pagina!
 * 
 * ============================================
 */

const VENEZIA_OFFERTE = [
    // ============================================
    // 🍷 FOOD - Bacari e Ristoranti
    // ============================================
    {
        id: 'food-1',
        titolo: 'Cicchetti Tour ai Bacari Storici',
        descrizione: 'Giro dei 3 migliori bacari storici con 6 cicchetti + 3 ombre di vino inclusi',
        prezzo: '22€',
        prezzoOriginale: '45€',
        immagine: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=600&q=80',
        link: 'https://www.getyourguide.it/venezia-l17/',
        categoria: 'food',
        badge: '🔥 Più Prenotato',
        scadenza: '2025-12-31'
    },
    {
        id: 'food-2',
        titolo: 'Cena Vista Canale al Tramonto',
        descrizione: 'Menu fisso 3 portate pesce fresco con tavolo riservato sul canale',
        prezzo: '35€',
        prezzoOriginale: '65€',
        immagine: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&q=80',
        link: 'https://www.thefork.it/',
        categoria: 'food',
        badge: '💎 Romantico',
        scadenza: '2025-10-31'
    },
    {
        id: 'food-3',
        titolo: 'Spritz & Aperitivo in Piazza',
        descrizione: 'Aperitivo completo con spritz, stuzzichini e vista Piazza San Marco',
        prezzo: '12€',
        prezzoOriginale: '25€',
        immagine: 'https://images.unsplash.com/photo-1572116469696-31de0f17cc34?w=600&q=80',
        link: '#',
        categoria: 'food',
        badge: '🍹 Best Seller'
    },
    {
        id: 'food-4',
        titolo: 'Cooking Class: Fai i Tuoi Cicchetti',
        descrizione: 'Lezione di 2 ore con chef locale, prepari e mangi i tuoi cicchetti + vino',
        prezzo: '49€',
        prezzoOriginale: '89€',
        immagine: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&q=80',
        link: '#',
        categoria: 'food'
    },

    // ============================================
    // 🚤 TRASPORTI - Gondole e Vaporetti
    // ============================================
    {
        id: 'trasporti-1',
        titolo: 'Pass Vaporetto 72h Illimitato',
        descrizione: 'Abbonamento ACTV valido 72 ore per tutte le linee vaporetto + bus',
        prezzo: '18€',
        prezzoOriginale: '40€',
        immagine: 'https://images.unsplash.com/photo-1534113414509-0eec2bfb493f?w=600&q=80',
        link: 'https://www.veneziaunica.it/',
        categoria: 'trasporti',
        badge: '⚡ Essenziale'
    },
    {
        id: 'trasporti-2',
        titolo: 'Gondola Condivisa 30min Canal Grande',
        descrizione: 'Giro in gondola condiviso con altri 5 passeggeri, sconto del 60%',
        prezzo: '15€',
        prezzoOriginale: '35€',
        immagine: 'https://images.unsplash.com/photo-1514890547357-a9ee288728e0?w=600&q=80',
        link: '#',
        categoria: 'trasporti',
        badge: '🛶 Must Do'
    },
    {
        id: 'trasporti-3',
        titolo: 'Traghetto Gondola (Solo Veneziati)',
        descrizione: 'Attraversa il Canal Grande come un vero veneziano per soli 2€',
        prezzo: '2€',
        prezzoOriginale: '80€ (gondola privata)',
        immagine: 'https://images.unsplash.com/photo-1520175480921-4edfa2983e0f?w=600&q=80',
        link: '#',
        categoria: 'trasporti',
        badge: '💡 Secret Tip'
    },
    {
        id: 'trasporti-4',
        titolo: 'Transfer Aeroporto ↔ Centro',
        descrizione: 'Bus navetta diretto Aeroporto Marco Polo - Piazzale Roma',
        prezzo: '8€',
        prezzoOriginale: '15€',
        immagine: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=600&q=80',
        link: '#',
        categoria: 'trasporti'
    },

    // ============================================
    // 🏨 DORMIRE - Hotel e Ostelli
    // ============================================
    {
        id: 'dormire-1',
        titolo: 'Hotel 3★ a 5min da San Marco',
        descrizione: 'Camera doppia con colazione inclusa, posizione strategica centro storico',
        prezzo: '57€',
        prezzoOriginale: '120€',
        immagine: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&q=80',
        link: 'https://www.booking.com/city/it/venice.html',
        categoria: 'dormire',
        badge: '🏆 Best Value'
    },
    {
        id: 'dormire-2',
        titolo: 'Ostello Giudecca Vista Laguna',
        descrizione: 'Posto letto in dormitorio misto, colazione inclusa, vista spettacolare',
        prezzo: '24€',
        prezzoOriginale: '45€',
        immagine: 'https://images.unsplash.com/photo-1520277739336-7bf67edfa768?w=600&q=80',
        link: '#',
        categoria: 'dormire',
        badge: '🎒 Backpacker'
    },
    {
        id: 'dormire-3',
        titolo: 'B&B Canal View con Terrazza',
        descrizione: 'Camera matrimoniale con vista canale e terrazza privata per colazione',
        prezzo: '89€',
        prezzoOriginale: '160€',
        immagine: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=600&q=80',
        link: '#',
        categoria: 'dormire',
        badge: '🌅 Vista Canale'
    },
    {
        id: 'dormire-4',
        titolo: 'Appartamento Intero per 4 Persone',
        descrizione: 'Casa vacanze completa con cucina, ideale per famiglie o gruppi',
        prezzo: '120€',
        prezzoOriginale: '200€',
        immagine: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=600&q=80',
        link: 'https://www.airbnb.it/venice-italy/stays',
        categoria: 'dormire'
    },

    // ============================================
    // 🎭 ATTIVITÀ - Tour e Esperienze
    // =========================================
    {
        id: 'attivita-1',
        titolo: 'Tour Isole: Murano + Burano + Torcello',
        descrizione: 'Escursione guidata di 6 ore con trasporto in motoscafo incluso',
        prezzo: '19€',
        prezzoOriginale: '40€',
        immagine: 'https://images.unsplash.com/photo-1559128010-7c1ad6e1b6a5?w=600&q=80',
        link: '#',
        categoria: 'attivita',
        badge: '🏝️ Top Rated'
    },
    {
        id: 'attivita-2',
        titolo: 'Palazzo Ducale Skip-the-Line',
        descrizione: 'Biglietto salta-fila con audioguida in italiano inclusa',
        prezzo: '16€',
        prezzoOriginale: '30€',
        immagine: 'https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?w=600&q=80',
        link: '#',
        categoria: 'attivita',
        badge: '🎨 Cultura'
    },
    {
        id: 'attivita-3',
        titolo: 'Tour Segreti Venezia con Guida',
        descrizione: 'Percorso fuori dai percorsi turistici con storie e aneddoti locali',
        prezzo: '25€',
        prezzoOriginale: '50€',
        immagine: 'https://images.unsplash.com/photo-1514890547357-a9ee288728e0?w=600&q=80',
        link: '#',
        categoria: 'attivita',
        badge: '🗝️ Hidden Gems'
    },
    {
        id: 'attivita-4',
        titolo: 'Carnival Mask Workshop',
        descrizione: 'Crea la tua maschera veneziana con maestro artigiano locale',
        prezzo: '35€',
        prezzoOriginale: '65€',
        immagine: 'https://images.unsplash.com/photo-1578321272176-b7bbc0679853?w=600&q=80',
        link: '#',
        categoria: 'attivita',
        badge: '🎭 Carnevale'
    },
    {
        id: 'attivita-5',
        titolo: 'Sunset Kayak in Laguna',
        descrizione: 'Escursione in kayak al tramonto con guida certificata',
        prezzo: '45€',
        prezzoOriginale: '80€',
        immagine: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600&q=80',
        link: '#',
        categoria: 'attivita',
        badge: '🌅 Avventura'
    }
];

// ============================================
// 📊 DATI CALCOLATORE VENEZIA
// ============================================
const VENEZIA_PREZZI = {
    hotel: {
        bassa: 45,      // €/notte
        media: 70,
        alta: 120
    },
    food: {
        bassa: 25,      // €/giorno
        media: 35,
        alta: 50
    },
    trasporti: {
        vaporetto: 25,  // Pass 72h
        gondola: 15     // Condivisa
    },
    attivita: {
        min: 15,
        max: 40
    }
};

// Esporta per uso in altri file (se necessario)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { VENEZIA_OFFERTE, VENEZIA_PREZZI };
}
