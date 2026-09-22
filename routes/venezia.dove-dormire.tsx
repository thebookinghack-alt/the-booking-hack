import { createFileRoute, Link } from "@tanstack/react-router";
import { Breadcrumb } from "@/components/site/Breadcrumb";
import { JsonLd } from "@/components/site/JsonLd";
import { PublicGrid } from "@/components/site/OfferCard";
import { VeniceSubnav } from "@/components/site/VeniceSubnav";
import { SLEEP_ZONES } from "@/lib/content/venice-guides";
import { articleJsonLd, breadcrumbJsonLd, pageHead } from "@/lib/seo";

export const Route = createFileRoute("/venezia/dove-dormire")({
  component: SleepPage,
  head: () =>
    pageHead(
      "Dove dormire a Venezia | The Booking Hack",
      "Dorsoduro, Cannaregio, San Marco, Mestre: dove ha senso dormire secondo chi lavora in hotel. Non un ranking di Booking.",
      "/venezia/dove-dormire",
    ),
});

function SleepPage() {
  return (
    <main className="mx-auto w-[min(800px,calc(100%-1.5rem))] py-8">
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Venezia", path: "/venezia" },
            { name: "Dove dormire", path: "/venezia/dove-dormire" },
          ]),
          articleJsonLd({
            headline: "Dove dormire a Venezia",
            description: "Zone e basi consigliate da chi lavora in reception.",
            path: "/venezia/dove-dormire",
            datePublished: "2026-08-25",
          }),
        ]}
      />
      <Breadcrumb
        items={[
          { label: "Home", to: "/" },
          { label: "Venezia", to: "/venezia" },
          { label: "Dove dormire" },
        ]}
      />
      <VeniceSubnav />
      <p className="text-xs font-bold uppercase text-venice">Venezia vista da chi ci lavora</p>
      <h1 className="mt-2 font-display text-4xl md:text-5xl">Dove dormire</h1>
      <p className="mt-3 text-muted">
        Non è un elenco di hotel. È dove ha senso posare la valigia, a seconda di come viaggi. I pick pubblicati stanno sotto.
      </p>
      <div className="mt-8 space-y-4">
        {SLEEP_ZONES.map((z) => (
          <article key={z.id} className="rounded-xl border-3 border-ink bg-surface p-5">
            <h2 className="font-display text-2xl">{z.title}</h2>
            <p className="mt-2 text-muted">{z.body}</p>
          </article>
        ))}
      </div>
      <p className="mt-6 text-sm">
        <Link to="/blog/$slug" params={{ slug: "mestre-o-centro" }} className="font-bold underline">
          Mestre o centro: come lo decido
        </Link>
      </p>
      <h2 className="mt-10 font-display text-3xl">Pick in pubblicazione</h2>
      <p className="mb-4 mt-2 text-sm text-muted">Solo categoria Venezia, stato PUBBLICATO. Dati mock.</p>
      <PublicGrid category="VENEZIA" />
    </main>
  );
}
