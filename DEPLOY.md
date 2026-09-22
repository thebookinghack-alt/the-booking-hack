# The Booking Hack — GitHub e go-live

Questo progetto è **TanStack Start** con build **Vercel** (Nitro). Non è un sito HTML statico.

## Cosa caricare

Tutto il repo **tranne** `node_modules`, `artifacts`, `screenshots`, `.grok`. C’è già `.gitignore`.

## Percorso che funziona: GitHub → Vercel (consigliato)

1. GitHub → New repository → `the-booking-hack` (privato va bene).
2. Carica questi file (upload cartella o `git push`).
3. [vercel.com](https://vercel.com) → Add New → Project → importa il repo.
4. Build: `npm run build` · Output: lascia il default Vercel / Nitro.
5. Domini: `thebookinghack.com` + `www` → DNS come dice Vercel (A / CNAME).
6. HTTPS automatico.
7. Search Console → sitemap `https://thebookinghack.com/sitemap.xml`.

In iubenda hai già **Vercel**: non cambiare hosting se resti qui.

## Netlify: sconsigliato per questo stack

Netlify è ottimo per HTML/Astro statico. Qui c’è **SSR**. Un `netlify.toml` “publish: dist” **non** pubblica le pagine offerte/Venezia come Google le deve vedere.

Se insisti su Netlify: cambia il preset Nitro (da Vercel a Netlify) **e** in iubenda sostituisci Vercel con Netlify. Altrimenti la privacy mente. Non farlo “perché è più comodo”: per TBH Vercel è il binario già impostato.

## Dopo il primo deploy

- Footer: Privacy iubenda **67054229**, Cookie, **Utilizzo** (`/cookie`), **Termini** (`/termini`), Come guadagniamo.
- Banner iubenda: snippet `_iub.csConfiguration` in `<head>` (non i tag `<a> Privacy Policy`). Mandalo e lo integriamo.
- Desk e `/lancia` restano raggiungibili a mano, **noindex**, fuori dalla nav.
- Offerte: finché l’URL affiliato è placeholder, non pubblicare dal desk.

## Pagine legali in questo sito (non in iubenda)

| URL | Contenuto |
|---|---|
| `/termini` | T&C editoriali (non e-commerce) |
| `/cookie` | Utilizzo cookie, cosa c’è / cosa no |
| `/come-guadagniamo` | Booking affiliate, commissioni, newsletter |
