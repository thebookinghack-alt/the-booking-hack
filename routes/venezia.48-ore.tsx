import { createFileRoute, Link } from "@tanstack/react-router";
import { Breadcrumb } from "@/components/site/Breadcrumb";
import { JsonLd } from "@/components/site/JsonLd";
import { VeniceMap } from "@/components/site/VeniceMap";
import { VeniceSubnav } from "@/components/site/VeniceSubnav";
import { FORTY_EIGHT } from "@/lib/content/venice-guides";
import { articleJsonLd, breadcrumbJsonLd, pageHead } from "@/lib/seo";

export const Route = createFileRoute("/venezia/48-ore")({
  component: FortyEightPage,
  head: () =>
    pageHead(
      "Venezia in 48 ore | The Booking Hack",
      "Un itinerario onesto: cammina, un'isola o la città, niente tre isole in un pomeriggio. Firma di chi ci lavora.",
      "/venezia/48-ore",
    ),
});

function FortyEightPage() {
  return (
    <main className="mx-auto w-[min(800px,calc(100%-1.5rem))] py-8">
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Venezia", path: "/venezia" },
            { name: "48 ore", path: "/venezia/48-ore" },
          ]),
          articleJsonLd({
            headline: "Venezia in 48 ore",
            description: "Itinerario locale, pochi spostamenti, niente collezione di isole.",
            path: "/venezia/48-ore",
            datePublished: "2026-08-22",
          }),
        ]}
      />
      <Breadcrumb
        items={[
          { label: "Home", to: "/" },
          { label: "Venezia", to: "/venezia" },
          { label: "48 ore" },
        ]}
      />
      <VeniceSubnav />
      <p className="text-xs font-bold uppercase text-venice">Itinerario</p>
      <h1 className="mt-2 font-display text-4xl md:text-5xl">Venezia in 48 ore</h1>
      <p className="mt-3 text-muted">
        Non è una checklist da influencer. È quello che direi a un amico che ha due giorni e non vuole odiarmi al lunedì.
      </p>
      <ol className="mt-8 space-y-4">
        {FORTY_EIGHT.map((s, i) => (
          <li key={s.title} className="rounded-xl border-3 border-ink bg-surface p-5">
            <p className="text-xs font-bold uppercase text-pink">0{i + 1}</p>
            <h2 className="mt-1 font-display text-2xl">{s.title}</h2>
            <p className="mt-2 text-muted">{s.body}</p>
          </li>
        ))}
      </ol>
      <h2 className="mt-10 font-display text-3xl">Punti sulla mappa</h2>
      <p className="mb-4 mt-2 text-sm text-muted">Pin editoriali, non recensioni di locali.</p>
      <VeniceMap />
      <p className="mt-6 text-sm">
        <Link to="/blog/$slug" params={{ slug: "venezia-48-ore" }} className="font-bold underline">
          Versione lunga sul blog
        </Link>
        {" · "}
        <Link to="/venezia/dove-dormire" className="font-bold underline">
          Dove dormire
        </Link>
      </p>
    </main>
  );
}
