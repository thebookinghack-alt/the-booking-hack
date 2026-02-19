# 📊 GUIDA GOOGLE SHEETS - Modifica Offerte da Telefono

Questa guida ti spiega come gestire le offerte di Venezia direttamente da **telefono o tablet**, senza toccare codice!

---

## 🎯 Cosa puoi fare

| Azione | Come si fa | Tempo |
|--------|-----------|-------|
| Aggiungere offerta | Compila riga su Sheets | 2 min |
| Modificare prezzo | Cambia cella su Sheets | 30 sec |
| Rimuovere offerta | Cancella riga su Sheets | 10 sec |
| Cambiare immagine | Aggiorna URL su Sheets | 1 min |

---

## 📱 SETUP INIZIALE (da fare una sola volta)

### Step 1: Crea il Foglio Google

1. Vai su [sheets.google.com](https://sheets.google.com) dal telefono
2. Crea nuovo foglio: **"Offerte Venezia TBH"**
3. Condividi in modalità **"Chiunque con il link può visualizzare"**

### Step 2: Struttura del Foglio

Crea queste colonne (riga 1 = intestazioni):

| A | B | C | D | E | F | G | H | I |
|---|---|---|---|---|---|---|---|---|
| id | titolo | descrizione | prezzo | prezzo_originale | immagine | link | categoria | badge |

### Step 3: Aggiungi una riga di esempio

| id | titolo | descrizione | prezzo | prezzo_originale | immagine | link | categoria | badge |
|---|---|---|---|---|---|---|---|---|
| food-99 | Nuova Offerta Test | Descrizione dell'offerta | 25€ | 50€ | https://images.unsplash.com/... | https://... | food | 🔥 Nuovo |

---

## 📋 CATEGORIE VALIDE

Usa ESATTAMENTE questi valori nella colonna **categoria**:

| Categoria | Emoji | Descrizione |
|-----------|-------|-------------|
| `food` | 🍷 | Ristoranti, bacari, aperitivi |
| `trasporti` | 🚤 | Vaporetti, gondole, transfer |
| `dormire` | 🏨 | Hotel, ostelli, B&B |
| `attivita` | 🎭 | Tour, musei, esperienze |

---

## 🎨 BADGE OPZIONALI

Puoi lasciare vuoto o usare questi:

| Badge | Significato |
|-------|-------------|
| 🔥 Più Prenotato | Offerta popolare |
| ⚡ Flash | Offerta a tempo limitato |
| 💎 Best Value | Miglior rapporto qualità/prezzo |
| 🏆 Top Rated | Più votata dagli utenti |
| 💡 Secret Tip | Consiglio insider |
| 🎒 Backpacker | Per viaggiatori low budget |
| 🌅 Vista Canale | Con vista canale |
| 🎭 Carnevale | Relativo al Carnevale |
| 🏝️ Top Rated | Isole più votate |
| 🎨 Cultura | Musei e arte |
| 🗝️ Hidden Gems | Luoghi nascosti |
| 🌅 Avventura | Attività sportive |

---

## 🖼️ IMMAGINI

### Dove trovare immagini gratuite:
1. [Unsplash.com](https://unsplash.com) - Cerca "venice" o "venezia"
2. Copia l'URL dell'immagine
3. Incolla nella colonna **immagine**

### Formato URL corretto:
```
https://images.unsplash.com/photo-XXXXXX?w=600&q=80
```

---

## 🔗 LINK AFFILIAZIONE

### Per Booking.com:
1. Vai su [booking.com/affiliate](https://www.booking.com/affiliate-program.html)
2. Crea link per struttura specifica
3. Incolla nella colonna **link**

### Per GetYourGuide:
1. Vai su [getyourguide.it](https://www.getyourguide.it/affiliate/)
2. Trova tour/attività
3. Copia link affiliato

### Per altri:
- Lascia `#` se non hai ancora il link
- Aggiorna quando lo hai

---

## 📲 MODIFICARE DA TELEFONO

### App Google Sheets (consigliata)
1. Scarica **"Google Fogli"** da App Store/Play Store
2. Accedi con lo stesso account
3. Trova il foglio "Offerte Venezia TBH"
4. Modifica direttamente!

### Da Browser Mobile
1. Apri Chrome/Safari
2. Vai a sheets.google.com
3. Accedi
4. Modifica in modalità desktop se necessario

---

## ⚡ PUBBLICARE LE MODIFICHE

### Opzione A: Manuale (subito)
1. Modifica su Sheets
2. Copia i dati
3. Incolla in `venezia-data.js`
4. Ricarica sito

### Opzione B: Automatica (avanzata)
Richiede configurazione API - chiedimi se vuoi questa opzione!

---

## 📝 ESEMPIO COMPLETO

Aggiungi questa riga al tuo foglio:

| Campo | Valore |
|-------|--------|
| id | food-100 |
| titolo | Aperitivo in Riva degli Schiavoni |
| descrizione | Spritz + stuzzichini con vista laguna |
| prezzo | 15€ |
| prezzo_originale | 28€ |
| immagine | https://images.unsplash.com/photo-1572116469696-31de0f17cc34?w=600&q=80 |
| link | # |
| categoria | food |
| badge | 🍹 Aperitivo |

---

## ❓ FAQ

**Q: Posso usare immagini dal mio telefono?**
A: Sì, carica su Imgur o Google Drive e copia il link pubblico.

**Q: Cosa succede se sbaglio la categoria?**
A: L'offerta non apparirà nei filtri. Usa solo: food, trasporti, dormire, attivita.

**Q: Posso mettere più badge?**
A: No, solo uno per offerta. Scegli il più rilevante.

**Q: Devo mettere sempre il prezzo originale?**
A: Sì, serve per calcolare lo sconto % mostrato sulla card.

---

## 🆘 SUPPORTO

Se hai problemi:
1. Verifica che la categoria sia scritta correttamente
2. Controlla che l'URL immagine funzioni
3. Assicurati che il prezzo abbia il simbolo €

---

**Hai finito!** 🎉 Ora puoi gestire tutte le offerte da telefono in pochi secondi!
