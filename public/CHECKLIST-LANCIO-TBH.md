# The Booking Hack — checklist lancio (spuntabile)

Usa questa pagina come to-do. Ordine: **iscrizioni oggi** → **iubenda** → **foglio** → **affiliati in attesa** → **tecnico** → **live**.  
Non spuntare “fatto” se è solo “account creato”: spunta **quando è usabile**.

Email di lavoro: `thebookinghack@gmail.com`  
Policy iubenda già esistente: https://www.iubenda.com/privacy-policy/16198169  
Sito previsto: https://thebookinghack.com

---

## 0. Ce l’hai già

- [x] Account Google (`thebookinghack@gmail.com`)
- [x] Policy iubenda n. 16198169 (da **modificare**, non ricreare)
- [x] Cookie policy iubenda collegata alla stessa
- [x] **Booking.com Affiliate** — registrato (verifica di avere un AID / Partner Hub, non solo un account ospite)
- [x] **Instagram**
- [x] **TikTok**
- [x] Demo V9 (Tag, desk, foglio, `/lancia`)
- [ ] Dominio `thebookinghack.com` (se non è tuo: registralo **oggi**)

**IG / TikTok da fare comunque:** avatar quadrato rosa **H**, bio con la promessa, link in bio = sito quando è live. Non Pixel TikTok/Meta.

---
---

## 1. Iscriviti OGGI (gratis, nessun contratto da aspettare)

Fai questi account **prima** di iubenda, così sai cosa dichiarare.

### Catalogo
- [ ] **Google Foglio** nuovo: “TBH catalogo live” — File → Importa → [`catalogo.csv`](/catalogo.csv)
- [ ] Pubblica sul web come CSV (File → Condividi → Pubblica sul web)

### Newsletter (scegline **uno**, non tre)
Consiglio: **Brevo** (ex Sendinblue, UE, double opt-in, piano free ok per partire).
- [ ] Account **Brevo** — https://www.brevo.com — stesso Gmail
- [ ] Abilita **double opt-in**
- [ ] Crea lista: `Newsletter TBH`
- [ ] Crea segmenti (anche vuoti): Venezia, Italia, Europa, Lungo raggio, Hotel, Error fare
- [ ] Form / API key da dare allo sviluppatore **dopo** il consenso iubenda
- [ ] **Non** iscriverti a Mailchimp, Klaviyo, ConvertKit (più cookie, più iubenda, poco senso ora)

Alternativa se Brevo ti sta stretto: MailerLite (stesso flusso). **Uno solo.**

### Canali dove manderai i deal (apri oggi, anche vuoti)
- [ ] **Telegram** — canale pubblico `The Booking Hack` (username tipo `@thebookinghack`). Tipo: canale, non gruppo. Bio: *Il bot cerca. Filippo verifica. Tu decidi se partire.*
- [ ] **Telegram BotFather** — crea un bot solo per *tuoi* alert desk (P1, non serve al live pubblico)
- [x] **Instagram** — già aperto. Allinea handle, avatar H, bio. Niente Pixel.
- [x] **TikTok** — già aperto. Stesso allineamento. Niente Pixel.
- [ ] **WhatsApp Channel** (Italia lo usa): “The Booking Hack” — opzionale ma utile
- [ ] **Non** aprire Facebook Page + Pixel oggi
- [ ] **Non** aprire X/Twitter se non ci stai dietro; uno o due canali vivi > cinque morti

### Misura (scegline **uno**)
Consiglio partenza: **Plausible** (EU, pochi cookie, iubenda più semplice) **oppure** niente analytics la prima settimana.
- [ ] Plausible — https://plausible.io — dominio thebookinghack.com  
  **oppure**
- [ ] Google Analytics 4 (solo se accetti più lavoro su iubenda: consenso + blocco preventivo)
- [ ] **Non** Hotjar, Meta Pixel, Google Ads, TikTok Pixel al lancio

### Search e hosting
- [ ] **Google Search Console** — https://search.google.com/search-console — proprietà dominio
- [ ] **Vercel** — https://vercel.com — account con lo stesso Gmail (deploy)
- [ ] **Cloudflare** (opzionale) — DNS + HTTPS se il dominio non sta già su Vercel

### Foto
- [ ] Cartella Drive “TBH foto proprie” (Venezia tue, destinazioni tue o licenza)
- [ ] Finché usi Unsplash: restano etichettate stock; in iubenda tieni “immagini di terzi”

---

## 2. Iscriviti OGGI ma **aspettano approvazione** (affiliati)

Manda le domande **oggi**. Il sito può andare online con CTA “da collegare” **nascoste**: meglio aspettare **un** link vero prima di pubblicare offerte. Il desk blocca i placeholder, ed è giusto.

Priorità Italia / travel:

| Rete | A cosa serve | Iscriviti | Note |
|---|---|---|---|
| **Awin** | Voli/OTA/hotel vari | https://www.awin.com/it (Publisher) | La più utile. Sito + traffico “in partenza” |
| **Booking.com Affiliate** | Hotel + Venezia | già registrato | In iubenda: **sì**. In foglio: URL con AID. |
| **Amazon Associates IT** | Qualche tool/bagaglio, non il core | https://affiliate-program.amazon.it | Facile, commissioni piccole |
| **TradeTracker** | Extra OTA | https://tradetracker.com | Secondario |
| **eDreams / Go Voyages affiliate** | Pacchetti | sito publisher eDreams | Dopo Awin |
| **Kiwi.com affiliates** | Voli | kiwi affiliates | Dopo Awin |

- [x] Booking Affiliate — già registrato
- [ ] Awin — domanda inviata
- [ ] Amazon IT — domanda inviata
- [ ] TradeTracker — solo se Awin tarda
- [ ] **Non** Skyscanner “white label” (non sei un aggregatore)
- [ ] **Non** dichiarare in iubenda reti che **non** hai firmato

Quando arriva l’OK: un URL reale per offerta, via foglio, colonna `affiliateUrl`. Poi Desk → Approva.

---

## 3. iubenda — da flaggare in dashboard (modifica 16198169)

Non creare un secondo sito/policy. Entra, Edit, spunta qui sotto **dopo** aver fatto la sezione 1.

### 3.1 Titolare
- [ ] Titolare: Filippo Scalabrin (persona fisica, se non hai società)
- [ ] Email: thebookinghack@gmail.com
- [ ] Indirizzo vero (Venezia/Mestre) — quello delle fatture affiliato
- [ ] Paese: Italia · lingua policy: italiano

### 3.2 Finalità (SÌ)
- [ ] Fornire il sito / hosting
- [ ] Newsletter / contatto email
- [ ] Statistiche **solo se** hai scelto GA4 o Plausible
- [ ] Marketing affiliato / link sponsorizzati
- [ ] Contenuti da piattaforme esterne (font, immagini)

### 3.3 Servizi da TENERE o AGGIUNGERE
- [ ] Hosting: **Vercel** (o Netlify, quello vero)
- [ ] **Google Fonts** (Outfit/Inter) — o poi self-host e lo togli
- [ ] Immagini di terzi / Unsplash (finché stock)
- [ ] **iubenda** Cookie Solution (si auto-dichiara)
- [ ] Newsletter: **Brevo** (o MailerLite) — **solo dopo** account creato. Se ancora none: non dichiararlo
- [ ] Affiliate: **Booking.com Affiliate Partner** (già firmato — **dichiaralo**). Poi Awin/Amazon solo dopo l’ok
- [ ] Analytics: Plausible **oppure** GA4 — quello che hai acceso, non entrambi

### 3.4 Servizi da TOGLIERE se ci sono ancora
- [ ] Facebook / Instagram Pixel / Meta Remarketing
- [ ] Google Ads / Floodlight
- [ ] IAB TCF
- [ ] GitHub, Google Drive, YouTube widget se non li usi sul sito
- [ ] Hotjar, Intercom, chatbot
- [ ] Qualsiasi advertising “generico”

### 3.5 Cookie banner (Privacy Controls and Cookie Solution)
- [ ] Cookie Policy generata dalla privacy
- [ ] GDPR + ePrivacy, Italia/UE
- [ ] **Blocco preventivo ON**
- [ ] TCF IAB **OFF**
- [ ] Pulsanti: Accetta / **Rifiuta visibile** / Personalizza (Garante)
- [ ] Categorie: Necessari | Misurazione (se analytics) | Marketing (se affiliati tracciano cookie — spesso il click è solo link in uscita)
- [ ] Lingua italiano
- [ ] Snippet copiato — **incollare solo sul dominio HTTPS live**, non in demo
- [ ] Link Privacy + Cookie + (Terms) in footer — in demo ci sono già i due iubenda

### 3.6 Terms
- [ ] Genera Terms: sito informativo, **non** agenzia viaggi, prezzi del partner, possono sparire, disclosure commissioni

### 3.7 Newsletter in iubenda
- [ ] Finalità: invio deal selezionati, non profilazione
- [ ] Double opt-in dichiarato
- [ ] Conservazione: fino a disiscrizione + obblighi di legge
- [ ] Checkbox nel form **non** pre-spuntata (già in demo)

### 3.8 Chiusura iubenda
- [ ] Anteprima policy: niente Facebook/Ads
- [ ] Stesso titolare ovunque
- [ ] Pubblica / Save
- [ ] URL policy resta `…/privacy-policy/16198169` (aggiorna se iubenda ne crea uno nuovo — meglio di no)

---

## 4. Foglio (30–40 min, dopo o in parallelo a iubenda)

- [ ] Import `catalogo.csv` in Google Sheets
- [ ] 3–6 offerte **vere** che firmeresti (non 40)
- [ ] `status` = CANDIDATO/REVIEW finché non verifichi
- [ ] `affiliateUrl` vero **solo** se il network ha approvato; senno placeholder e non pubblicare
- [ ] File → Pubblica sul web → CSV
- [ ] Desk demo → Foglio → Importa URL (o carica CSV)
- [ ] Checklist 7 bloccanti a mano, poi Approva

---

## 5. Prima del bottone “sito visibile”

- [ ] Deploy Vercel + dominio + HTTPS
- [ ] Redirect www ↔ apex
- [ ] Search Console verifica + sitemap `https://thebookinghack.com/sitemap.xml`
- [ ] robots: Allow / ; Disallow `/desk` `/stato` `/lancia`
- [ ] Togliere “Desk demo” dalla nav pubblica
- [ ] Snippet iubenda in head
- [ ] Brevo collegato al form (niente falso “iscrizione ok” se il provider è spento)
- [ ] Almeno **una** offerta con link affiliato reale **oppure** lancia solo Venezia + metodo + newsletter (onesto)
- [ ] Foto profilo social = favicon H rosa
- [ ] Pagina Trasparenza allineata alle reti **effettive**
- [ ] 301 vecchi URL se ne esistono sul dominio

---

## 6. Giorno 0 (live)

- [ ] Homepage, Tokyo/una offerta vera, un scaduto di prova, Venezia, newsletter
- [ ] Banner: Accetta e Rifiuta visibili su telefono
- [ ] Click affiliato: `rel="sponsored nofollow"` e apre il partner
- [ ] Iscrizione newsletter: mail di conferma Brevo
- [ ] Telegram: primo post che punta al sito, non il contrario
- [ ] Search Console: richiesta indicizzazione home + `/metodo` + `/venezia`

---

## 7. Non fare (anche se te lo dicono)

- Pixel Facebook “così si scala”
- TCF IAB
- Skyscanner clone / centinaia di offerte
- Secondo account iubenda
- Tre tool newsletter
- Login desk in chiaro in produzione senza auth vera
- Dichiarare Awin in privacy prima dell’ok

---

## Sequenza consigliata (questa settimana)

1. Brevo + Telegram canale + Search Console + Vercel + Foglio (45 min)  
2. Awin + Amazon domande (10 min) — Booking già fatto  
3. iubenda: **aggiungi Booking.com Affiliate Partner**, togli Pixel/Ads/TCF (40 min)  
4. Una offerta hotel con link Booking reale nel foglio (puoi pubblicare hotel prima dei voli)  
5. IG/TikTok: avatar H + bio; niente pixel  
6. Deploy + banner
