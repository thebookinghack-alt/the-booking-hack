# The Booking Hack — V9

Filtro editoriale di travel deal + guida Venezia. Dati **mock**, etichettati. Adapter: mock (Sheets/Supabase/API da collegare).

Promessa: *il bot cerca, Filippo verifica, tu decidi se partire.* Non un aggregatore.

## Auth

Il **Desk demo** non è un login. Sessione locale (“Entra come editor demo”). Prima del live: autenticazione server-side, ruoli editor/admin. Auth piattaforma **OFF** — il catalogo pubblico è condiviso.

## SEO

URL reali: `/offerte/voli/milano-tokyo`, `/venezia/dove-dormire`, `/metodo`, `/newsletter`. Title, description, canonical, Open Graph, JSON-LD, sitemap, robots (`Disallow: /desk`, `/stato`). Deal scaduti: visibili, noindex. I vecchi `/offerte/:id` reindirizzano al path canonico.

## P0 prima del live

1. Fonte dati reale
2. Link affiliati veri
3. Login reale
4. Foto proprie
5. Newsletter provider + analytics con consenso
