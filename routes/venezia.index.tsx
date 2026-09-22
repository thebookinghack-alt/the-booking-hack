import { createFileRoute, Link } from "@tanstack/react-router";
import { Breadcrumb } from "@/components/site/Breadcrumb";
import { JsonLd } from "@/components/site/JsonLd";
import { PublicGrid } from "@/components/site/OfferCard";
import { VeniceMap } from "@/components/site/VeniceMap";
import { VeniceSubnav } from "@/components/site/VeniceSubnav";
import { breadcrumbJsonLd, pageHead } from "@/lib/seo";

export const Route = createFileRoute("/venezia/")({
  component: VenicePage,
  head: () =>
    pageHead(
      "Venezia, guida di un local | The Booking Hack",
      "Hotel, itinerari, mappa e basi a Venezia consigliati da chi lavora in reception. Firma umana, poca automazione.",
      "/venezia",
    ),
});

const NOTES = [
  {
    title: "Dove dormire",
    href: "/venezia/dove-dormire" as const,
    body: "Se è la prima volta, Dorsoduro o Cannaregio. San Marco è comodo e rumoroso. Mestre ha senso se arrivi tardi o resti due notti strette: 10 minuti di treno, prezzo onesto.",
  },
  {
    title: "48 ore",
    href: "/venezia/48-ore" as const,
    body: "Cammina. Un bacaro, non un menù fotografico. Un’isola o la città, non entrambi. Niente tre isole nello stesso pomeriggio.",
  },
  {
    title: "Cosa eviterei",
    href: "/esperienze" as const,
    body: "Menu fotografici a Rialto, hotel “vista canale” al piano terra umido, e qualsiasi itinerario che pretenda di fare Burano, Murano e San Marco nello stesso pomeriggio.",
  },
];

function VenicePage() {
  return (
    <main className="mx-auto w-[min(1100px,calc(100%-1.5rem))] py-8">
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Venezia", path: "/venezia" }])} />
      <Breadcrumb items={[{ label: "Home", to: "/" }, { label: "Venezia" }]} />
      <VeniceSubnav />
      <p className="mb-2 text-xs font-bold uppercase tracking-wide text-venice">Secondo pilastro</p>
      <h1 className="font-display text-4xl tracking-tight md:text-5xl">Venezia, vista da chi ci lavora</h1>
      <p className="mt-3 max-w-2xl text-muted">
        Qui l'automazione è minima: hotel, itinerari e basi che consiglierei a un amico. Firma umana.
      </p>
      <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
        {NOTES.map((n) => (
          <article key={n.title} className="rounded-xl border-3 border-ink bg-surface p-5">
            <h2 className="font-display text-2xl">
              <Link to={n.href} className="underline-offset-4 hover:underline">
                {n.title}
              </Link>
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-muted">{n.body}</p>
          </article>
        ))}
      </div>
      <h2 className="mt-10 font-display text-3xl">Mappa dei punti citati</h2>
      <p className="mb-4 mt-2 text-sm text-muted">Leaflet + OpenStreetMap. Pin editoriali, non recensioni di locali.</p>
      <VeniceMap />
      <p className="mt-4 text-sm">
        <Link to="/venezia/dove-dormire" className="font-bold underline">
          Dove dormire
        </Link>
        {" · "}
        <Link to="/venezia/48-ore" className="font-bold underline">
          48 ore
        </Link>
        {" · "}
        <Link to="/esperienze" className="font-bold underline">
          Provato da Filippo
        </Link>
      </p>
      <h2 className="mt-10 font-display text-3xl">Pick della settimana</h2>
      <p className="mb-4 mt-2 text-sm text-muted">Solo offerte Venezia in stato PUBBLICATO.</p>
      <PublicGrid category="VENEZIA" />
    </main>
  );
}
