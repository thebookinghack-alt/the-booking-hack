import { createFileRoute, Link } from "@tanstack/react-router";
import { Breadcrumb } from "@/components/site/Breadcrumb";
import { APP_CONFIG } from "@/lib/offers/config";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/cookie")({
  component: CookiePage,
  head: () =>
    pageHead(
      "Cookie e tracciamento | The Booking Hack",
      "Cosa carica questo sito, cosa no, e dove sta l’informativa iubenda. Niente Pixel, niente ads.",
      "/cookie",
    ),
});

function CookiePage() {
  return (
    <main className="editorial mx-auto max-w-2xl px-4 py-12">
      <Breadcrumb items={[{ label: "Home", to: "/" }, { label: "Cookie" }]} />
      <p className="mt-2 text-xs font-bold uppercase text-muted">Allineato alla policy iubenda 67054229</p>
      <h1 className="mt-2 font-display text-4xl">Cookie e utilizzo</h1>
      <div className="prose-editorial">
        <p>
          Informativa completa:{" "}
          <a href={APP_CONFIG.iubendaCookie} target="_blank" rel="noopener noreferrer">
            Cookie policy iubenda
          </a>
          . Qui, in chiaro, cosa c’è sul sito.
        </p>
        <h2>Cosa usiamo</h2>
        <ul>
          <li>
            <strong>Necessari</strong> — far funzionare il sito (hosting{" "}
            <strong>Vercel</strong>, preferenza del banner quando sarà live).
          </li>
          <li>
            <strong>Esperienza</strong> — <strong>Google Fonts</strong> (Outfit, Inter);
            mappa Venezia con <strong>OpenStreetMap</strong> / Leaflet (IP verso i tile OSM).
          </li>
          <li>
            <strong>Contatto</strong> — se ti iscrivi: email (+ hub/interessi se li indichi).
            Consenso, checkbox non pre-spuntata. Provider di invio ancora spento.
          </li>
        </ul>
        <h2>Cosa non usiamo</h2>
        <p>
          Niente Google Analytics, Tag Manager, Ads, Pixel Facebook/TikTok, Hotjar, TCF IAB. Account
          Instagram o TikTok ≠ tracciamento sul sito.
        </p>
        <h2>Affiliati</h2>
        <p>
          Il click “Vai all’offerta” esce su <strong>Booking.com</strong>. Lì possono partire cookie
          del partner. Prima del click non installiamo un Pixel Booking.{" "}
          <Link to="/come-guadagniamo">Come guadagniamo</Link>.
        </p>
        <h2>Foto</h2>
        <p>Copertine da Unsplash, etichettate stock, da sostituire con foto proprie.</p>
        <h2>Banner</h2>
        <p>
          Sul dominio HTTPS live: banner iubenda con Accetta e Rifiuta allo stesso peso, blocco
          preventivo, niente TCF. Lo snippet non è ancora in pagina: si mette in head al go-live.
        </p>
        <p>
          <Link to="/termini">Termini</Link>
          {" · "}
          <a href={APP_CONFIG.iubendaPrivacy} target="_blank" rel="noopener noreferrer">
            Privacy
          </a>
        </p>
      </div>
    </main>
  );
}
