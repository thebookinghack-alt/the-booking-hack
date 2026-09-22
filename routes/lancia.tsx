import { createFileRoute, Link } from "@tanstack/react-router";
import { HackTag } from "@/components/site/BrandMark";
import { APP_CONFIG } from "@/lib/offers/config";
import { SHEET_COLUMNS } from "@/lib/offers/sheet";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/lancia")({
  component: LanciaPage,
  head: () =>
    pageHead(
      "Lancio: foglio + iubenda | The Booking Hack",
      "Come pubblicare dal foglio e configurare iubenda domani mattina. Pagina operativa, noindex.",
      "/lancia",
      { noindex: true },
    ),
});

function LanciaPage() {
  return (
    <main className="mx-auto w-[min(760px,calc(100%-1.5rem))] py-8">
      <p className="text-xs font-bold uppercase text-muted">Operativo · noindex</p>
      <h1 className="mt-2 font-display text-4xl leading-tight">
        Domani mattina: foglio, poi <HackTag className="align-middle text-xl" /> iubenda
      </h1>
      <p className="mt-3 text-muted">
        Due P0 che non richiedono un CMS. Il catalogo esce dal codice; la privacy la chiudi tu sul conto iubenda (io non ci entro).
      </p>
      <p className="mt-3 text-sm">
        Checklist completa da spuntare (iscrizioni + iubenda + affiliati):{" "}
        <a className="font-bold underline" href="/CHECKLIST-LANCIO-TBH.md" download>
          scarica CHECKLIST-LANCIO-TBH.md
        </a>
      </p>

      <section className="mt-10">
        <h2 className="font-display text-2xl">A · Foglio (30–40 min)</h2>
        <ol className="mt-3 list-decimal space-y-3 pl-5 text-sm">
          <li>
            Scarica il modello:{" "}
            <a className="font-bold underline" href="/catalogo.csv" download>
              catalogo.csv
            </a>
          </li>
          <li>Google Sheets → File → Importa → carica il CSV. Prima riga = intestazioni, non toccarla.</li>
          <li>
            Compila 3–6 offerte <strong>vere</strong> che firmeresti. Se l’affiliato non c’è, lascia il placeholder: il desk non pubblicherà.
          </li>
          <li>status: CANDIDATO o REVIEW finché non hai verificato. PUBBLICATO solo a checklist chiusa.</li>
          <li>File → Condividi → Pubblica sul web → questo foglio → CSV. Copia il link.</li>
          <li>
            Desk demo → tab <strong>Foglio</strong> → incolla l’URL → Importa. In alternativa carica il CSV dal computer.
          </li>
        </ol>
        <p className="mt-3 break-all font-mono text-2xs text-muted">{SHEET_COLUMNS.join(", ")}</p>
        <p className="mt-3">
          <Link className="font-bold underline" to="/desk">
            Apri il desk → Foglio
          </Link>
        </p>
      </section>

      <section className="mt-12">
        <h2 className="font-display text-2xl">B · iubenda — clic per clic</h2>
        <p className="mt-2 text-sm text-muted">
          Policy già esistente:{" "}
          <a className="font-bold underline" href={APP_CONFIG.iubendaPrivacy} target="_blank" rel="noopener noreferrer">
            16198169
          </a>
          . Domani non crearne una nuova: <strong>modificala</strong>.
        </p>

        <h3 className="mt-6 font-display text-xl">1. Entra</h3>
        <ol className="mt-2 list-decimal space-y-2 pl-5 text-sm">
          <li>iubenda.com → login con lo stesso account della policy 16198169.</li>
          <li>Dashboard → il sito The Booking Hack (o crea “sito web” se manca, stesso dominio che userai in live).</li>
          <li>Apri Privacy Policy → Edit / Generatore.</li>
        </ol>

        <h3 className="mt-6 font-display text-xl">2. Titolare</h3>
        <ul className="mt-2 list-disc space-y-1 pl-5 text-sm">
          <li>Titolare: Filippo Scalabrin (persona fisica, non società se non ce l’hai).</li>
          <li>Email: thebookinghack@gmail.com</li>
          <li>Indirizzo: Venezia / Mestre — quello vero che userai nelle fatture affiliato.</li>
          <li>Paese: Italia. Lingua: italiano (inglese dopo, non oggi).</li>
        </ul>

        <h3 className="mt-6 font-display text-xl">3. Cosa fa il sito (finalità)</h3>
        <p className="mt-2 text-sm">Seleziona SOLO queste. Se iubenda propone altro, no.</p>
        <ul className="mt-2 list-disc space-y-1 pl-5 text-sm">
          <li>Fornire il sito / hosting</li>
          <li>Contatto e newsletter (email)</li>
          <li>Statistiche (solo se attivi analytics <em>dopo</em> il banner)</li>
          <li>Marketing affiliato / link sponsorizzati</li>
          <li>Visualizzazione contenuti da piattaforme esterne (font, immagini)</li>
        </ul>

        <h3 className="mt-6 font-display text-xl">4. Servizi da TENERE o AGGIUNGERE</h3>
        <ul className="mt-2 list-disc space-y-1 pl-5 text-sm">
          <li>Hosting: Vercel (o Netlify, quello che userai). Non “hosting generico” se puoi nominare il provider.</li>
          <li>Google Fonts — sì, Outfit/Inter dal CDN. Base giuridica: legittimo interesse o consenso (il banner copre i cookie; i font spesso partono subito: valuta self-host dopo).</li>
          <li>Unsplash / immagini di terzi — sì, finché usi stock.</li>
          <li>Newsletter: <strong>nessuno</strong> finché provider = none. Quando colleghi Brevo/MailerLite, aggiungi quel servizio + double opt-in.</li>
          <li>Reti affiliate: Awin, TradeTracker, Booking Affiliate, Amazon Associates — aggiungi <em>solo quelli firmati</em>. Oggi zero: non dichiarare Skyscanner se non c’è il contratto.</li>
          <li>iubenda (cookie solution) — sì, si auto-dichiara.</li>
        </ul>

        <h3 className="mt-6 font-display text-xl">5. Servizi da TOGLIERE (se ci sono ancora)</h3>
        <ul className="mt-2 list-disc space-y-1 pl-5 text-sm">
          <li>Facebook, Instagram Pixel, Meta Remarketing</li>
          <li>Google Ads / Floodlight / remarketing</li>
          <li>GitHub, Google Drive, YouTube widget se non li usi</li>
          <li>Hotjar, Intercom, chatbot</li>
          <li>Qualsiasi “advertising” IAB TCF — non ti serve, sei un sito editoriale piccolo</li>
        </ul>

        <h3 className="mt-6 font-display text-xl">6. Cookie banner (Privacy Controls and Cookie Solution)</h3>
        <ol className="mt-2 list-decimal space-y-2 pl-5 text-sm">
          <li>Attiva Cookie Policy (si genera dalla privacy).</li>
          <li>Banner: GDPR + ePrivacy. Italia / UE.</li>
          <li>
            <strong>Blocco preventivo</strong> ON. Niente analytics prima del consenso.
          </li>
          <li>Categorie: Necessari | Misurazione | Marketing. Preferenze se servono i font via cookie (di solito no).</li>
          <li>TCF IAB: <strong>OFF</strong>.</li>
          <li>Pulsanti: Accetta / Rifiuta / Personalizza. Rifiuta deve essere visibile come Accetta (Garante).</li>
          <li>Lingua: italiano. Posizione: basso. Stile: puoi lasciare default iubenda; non forzare il giallo del sito se il contrasto cade.</li>
          <li>Copia lo snippet. Incollalo nell’head HTML in produzione — <strong>non in questa demo</strong> finché analytics è spento. Il footer ha già i link policy.</li>
        </ol>

        <h3 className="mt-6 font-display text-xl">7. Termini e condizioni</h3>
        <p className="mt-2 text-sm">
          Genera Terms (sito informativo + affiliate disclosure). Non vendiamo biglietti noi. Clausola: i prezzi sono del partner, possono sparire, non siamo agenzia di viaggi.
        </p>

        <h3 className="mt-6 font-display text-xl">8. Newsletter (quando colleghi il provider)</h3>
        <ul className="mt-2 list-disc space-y-1 pl-5 text-sm">
          <li>Finalità: invio deal selezionati, non profilazione avanzata.</li>
          <li>Double opt-in ON.</li>
          <li>Checkbox consenso già nel form (non pre-spuntata).</li>
          <li>Informativa: link alla privacy nella riga del consenso.</li>
          <li>Conservazione: finché l’utente non si disiscrive + tempi di legge.</li>
        </ul>

        <h3 className="mt-6 font-display text-xl">9. Checklist di chiusura (stampa questa)</h3>
        <ul className="mt-2 list-disc space-y-1 pl-5 text-sm">
          <li>☐ Titolare e email corretti</li>
          <li>☐ Niente Facebook/Ads/TCF</li>
          <li>☐ Solo affiliati firmati</li>
          <li>☐ Newsletter dichiarata solo se il provider è acceso</li>
          <li>☐ Banner: rifiuta visibile, blocco preventivo</li>
          <li>☐ Cookie policy + privacy + terms in footer</li>
          <li>☐ Snippet banner solo sul dominio live HTTPS</li>
        </ul>
      </section>

      <p className="mt-10 text-sm">
        <Link className="font-bold underline" to="/stato">
          Stato V9
        </Link>
        {" · "}
        <Link className="font-bold underline" to="/desk">
          Desk
        </Link>
        {" · "}
        <Link className="font-bold underline" to="/come-guadagniamo">
          Trasparenza
        </Link>
      </p>
    </main>
  );
}
