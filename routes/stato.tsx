import { createFileRoute, Link } from "@tanstack/react-router";
import { API_CONTRACT, APP_CONFIG } from "@/lib/offers/config";
import { adapterStatus } from "@/lib/offers/repository";
import { ANALYTICS_NOTE } from "@/lib/offers/analytics";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/stato")({
  component: StatoPage,
  head: () =>
    pageHead(
      "Stato V9 | The Booking Hack",
      "Roadmap tecnica: funzionante in demo, mock, da collegare, P0 prima del live.",
      "/stato",
      { noindex: true },
    ),
});

function StatoPage() {
  const adapter = adapterStatus();
  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <Link to="/" className="text-sm font-bold">
        ← Home
      </Link>
      <p className="mt-4 text-xs font-bold uppercase text-muted">Roadmap tecnica · noindex</p>
      <h1 className="mt-2 font-display text-4xl">V9 — da demo a product spec</h1>
      <p className="mt-3 text-muted">
        Adapter: {adapter.label}. {adapter.note} Versione {APP_CONFIG.version}. I dati restano mock, etichettati. L'architettura è pronta per collegare i tubi.
      </p>

      <h2 className="mt-8 font-display text-2xl">Funzionante nella demo</h2>
      <ul className="mt-2 list-disc pl-5 text-muted">
        <li>URL reali: /offerte, /offerte/voli/milano-tokyo, /venezia/dove-dormire, /venezia/48-ore, /metodo, /newsletter, /blog/come-funziona-hack-score</li>
        <li>Redirect dai vecchi /offerte/:id verso il path canonico categoria/slug</li>
        <li>Title, description, canonical, Open Graph, JSON-LD (Organization, WebSite, Offer, Article, Breadcrumb, ItemList)</li>
        <li>Sitemap e robots (Disallow /desk /stato). Pagine scadute: visibili, noindex</li>
        <li>Hack Score 40/30/30 con breakdown; Confidence con disclaimer; freshness VERIFICATO → DA RICONTROLLARE → SCADUTO</li>
        <li>Discovery layer (intent + hub di partenza) senza diventare un aggregatore</li>
        <li>Scheda deal: prezzo/per cosa/quando/da dove/incluso/limiti + CTA sticky + share + template social card</li>
        <li>Desk: pipeline, master, grezzi, regole, alert, performance (mock metrics). I bot non pubblicano</li>
        <li>Checklist 12 punti, 7 bloccanti. Placeholder affiliato blocca approve/publish</li>
        <li>Transizioni di stato coerenti, incluso ARCHIVIATO</li>
        <li>Newsletter con consenso; provider spento, nessun falso successo</li>
        <li>Venezia come secondo pilastro + mappa OSM</li>
      </ul>

      <h2 className="mt-8 font-display text-2xl">Mock</h2>
      <ul className="mt-2 list-disc pl-5 text-muted">
        <li>Catalogo (Tokyo, Lisbona, Budapest, Venezia, Barcellona in review, Marrakech candidato, Atene scaduta)</li>
        <li>Scout pool, pipeline, briefing, audit seed</li>
        <li>Foto Unsplash etichettate “stock da sostituire”</li>
        <li>Metriche desk: struttura funnel visibile, valori “—” o conteggi locali del catalogo demo</li>
        <li>Template social card (nessun file PNG generato)</li>
      </ul>

      <h2 className="mt-8 font-display text-2xl">Da collegare</h2>
      <ul className="mt-2 list-disc pl-5 text-muted">
        <li>API voli / hotel / pacchetti</li>
        <li>Affiliate network (URL reali; oggi PLACEHOLDER)</li>
        <li>Database (SheetsAdapter: CSV / Google pubblicato — tab Desk → Foglio. Supabase/API restano da collegare)</li>
        <li>Newsletter provider (double opt-in, GDPR, segmenti, unsubscribe)</li>
        <li>{ANALYTICS_NOTE} Eventi già nominati: page_view, deal_view, filter_used, affiliate_click, share, newsletter, scroll_depth</li>
        <li>Auth reale con ruoli editor/admin (il desk resta “Demo editor — non è un login reale”)</li>
        <li>CMS/editor, cron/job, social (IG/TikTok/Telegram), generazione OG per deal</li>
      </ul>
      <p className="mt-3 text-sm text-muted">Contratto API previsto:</p>
      <ul className="mt-1 list-disc pl-5 font-mono text-xs text-muted">
        {API_CONTRACT.map((x) => (
          <li key={x}>{x}</li>
        ))}
      </ul>

      <h2 className="mt-8 font-display text-2xl">P0 prima del live</h2>
      <ol className="mt-2 list-decimal pl-5 text-muted">
        <li>Fonte dati reale + persistenza server</li>
        <li>Link affiliati veri (senza di questi il Publisher resta chiuso)</li>
        <li>Autenticazione server-side, ruoli, CSRF, sessioni</li>
        <li>Foto proprie al posto delle stock</li>
        <li>Provider newsletter + iubenda/consent analytics</li>
        <li>Redirect 301 in produzione per eventuali URL vecchi</li>
      </ol>

      <h2 className="mt-8 font-display text-2xl">P1 dopo il live</h2>
      <ul className="mt-2 list-disc pl-5 text-muted">
        <li>Segmentazione newsletter (Venezia, Italia, Europa, lungo raggio, hotel, error fare)</li>
        <li>Social card generate per deal</li>
        <li>Dashboard performance con dati reali (visite → deal view → click → commissione)</li>
        <li>Espansione guide Venezia (bacari, sestieri, 24/72 ore)</li>
        <li>Esperienze verificate quando esistono, con nome e data veri</li>
      </ul>

      <h2 className="mt-8 font-display text-2xl">P2</h2>
      <ul className="mt-2 list-disc pl-5 text-muted">
        <li>CDN/caching immagini proprie</li>
        <li>Alert Telegram/email reali</li>
        <li>Multi-editor e code review a quattro occhi</li>
      </ul>

      <p className="mt-8">
        <Link to="/lancia" className="font-bold underline">
          Lancio: foglio + iubenda
        </Link>
        {" · "}
        <Link to="/desk" className="font-bold underline">
          Apri il desk demo
        </Link>
        {" · "}
        <Link to="/metodo" className="font-bold underline">
          Metodo
        </Link>
      </p>
    </main>
  );
}
