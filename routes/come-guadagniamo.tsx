import { createFileRoute, Link } from "@tanstack/react-router";
import { Breadcrumb } from "@/components/site/Breadcrumb";
import { JsonLd } from "@/components/site/JsonLd";
import { APP_CONFIG } from "@/lib/offers/config";
import { breadcrumbJsonLd, pageHead } from "@/lib/seo";

export const Route = createFileRoute("/come-guadagniamo")({
  component: EarnPage,
  head: () =>
    pageHead(
      "Come guadagniamo | The Booking Hack",
      "Il sito è gratuito. Su alcune offerte riceviamo una commissione affiliato, senza costo extra per te. L’Hack Score non cambia.",
      "/come-guadagniamo",
    ),
});

function EarnPage() {
  return (
    <main className="editorial mx-auto max-w-2xl px-4 py-12">
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Come guadagniamo", path: "/come-guadagniamo" }])} />
      <Breadcrumb items={[{ label: "Home", to: "/" }, { label: "Come guadagniamo" }]} />
      <h1 className="mt-2 font-display text-4xl">Come guadagniamo</h1>
      <div className="prose-editorial">
        <p>Il sito è gratuito. Su alcune offerte riceviamo una commissione se prenoti tramite i nostri link, senza costo extra per te.</p>
        <p>Questo non influenza l'Hack Score. Non vendiamo i tuoi dati. Non fingiamo recensioni utente. Lo stesso vale per gli articoli del blog: se un pezzo cita un'offerta, la disclosure è visibile.</p>
        <h2>Stato affiliati in V9</h2>
        <p>
          Account <strong>Booking.com Affiliate</strong> già attivo. I link in demo possono essere
          ancora placeholder (“Da collegare”): il desk non pubblica un URL finto. Quando l’AID è nel
          foglio, il click esce su Booking.com. Possiamo ricevere una commissione, senza costo extra
          per te. Non entra nell’Hack Score.
        </p>
        <p>
          Dopo il click, Booking.com tratta i dati (click ID / cookie propri) secondo la sua
          informativa:{" "}
          <a href="https://www.booking.com/content/privacy.html" target="_blank" rel="noopener noreferrer">
            booking.com/content/privacy
          </a>
          . Su questo sito non installiamo un Pixel Booking prima del consenso.
        </p>
        <h2>Newsletter</h2>
        <p>
          Se ti iscrivi trattiamo email e, se li indichi, hub / interessi. Base: consenso (checkbox
          non pre-spuntata). Revoca: link in fondo alle mail o{" "}
          <a href="mailto:thebookinghack@gmail.com">thebookinghack@gmail.com</a>. Lista non venduta.
          Provider di invio ancora spento: niente falso “iscrizione ok”. Quando collegheremo Brevo
          (UE, double opt-in) aggiorneremo questa pagina. La clausola “mailing list” non è nel piano
          iubenda Essentials: sta qui, di proposito.
        </p>
        <h2>Foto e mappa</h2>
        <p>
          Copertine: Unsplash, etichettate stock da sostituire. Mappa Venezia: Leaflet + riquadri
          OpenStreetMap (già in iubenda). Font: Google Fonts. Hosting: Vercel.
        </p>
        <h2>Cookie e desk</h2>
        <p>
          Analytics spenti. Il banner iubenda va sul dominio HTTPS live (blocco preventivo, Rifiuta
          visibile). Il desk è un editor demo, non un login pubblico.
        </p>
      </div>
      <p className="mt-6 text-sm">
        <a className="font-bold underline" href={APP_CONFIG.iubendaPrivacy} target="_blank" rel="noopener noreferrer">
          Privacy
        </a>
        {" · "}
        <a className="font-bold underline" href={APP_CONFIG.iubendaCookie} target="_blank" rel="noopener noreferrer">
          Cookie
        </a>
        {" · "}
        <Link to="/blog/$slug" params={{ slug: "come-guadagniamo-senza-trucchi" }} className="font-bold underline">
          Articolo sulla trasparenza
        </Link>
      </p>
    </main>
  );
}
