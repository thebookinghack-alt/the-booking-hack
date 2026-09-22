import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo } from "react";
import { Breadcrumb } from "@/components/site/Breadcrumb";
import { DemoChip } from "@/components/site/DemoChip";
import { JsonLd } from "@/components/site/JsonLd";
import { FilterBar, PublicGrid } from "@/components/site/OfferCard";
import { CATEGORY_INTRO } from "@/lib/content/product";
import { offerPath } from "@/lib/offers/paths";
import { publishedOffers, useDeskStore } from "@/lib/offers/store";
import { CATEGORY_PATH, type Category } from "@/lib/offers/types";
import { breadcrumbJsonLd, itemListJsonLd, pageHead, websiteJsonLd } from "@/lib/seo";

export const Route = createFileRoute("/offerte/")({
  component: OffersIndex,
  head: () =>
    pageHead(
      "Offerte selezionate | The Booking Hack",
      "Voli, hotel e pacchetti curati. Non un aggregatore: solo deal che superano scoring, checklist e verifica umana.",
      "/offerte",
    ),
});

const CATS: Category[] = ["VOLI", "HOTEL", "PACCHETTI", "VENEZIA"];

function OffersIndex() {
  const all = useDeskStore((s) => s.offers);
  const pub = useMemo(() => publishedOffers(all), [all]);
  return (
    <main className="mx-auto w-[min(1100px,calc(100%-1.5rem))] py-8">
      <JsonLd
        data={[
          websiteJsonLd(),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Offerte", path: "/offerte" },
          ]),
          itemListJsonLd(
            "Offerte pubblicate",
            "/offerte",
            pub.map((o) => ({ name: o.title, path: offerPath(o) })),
          ),
        ]}
      />
      <Breadcrumb items={[{ label: "Home", to: "/" }, { label: "Offerte" }]} />
      <DemoChip />
      <h1 className="font-display text-4xl md:text-5xl">Offerte selezionate</h1>
      <p className="mt-3 max-w-2xl text-muted">
        Non pubblichiamo tutto quello che troviamo. Pubblichiamo solo quello che riteniamo davvero interessante. I prezzi sono mock, etichettati come demo.
      </p>
      <nav className="mt-5 flex flex-wrap gap-2" aria-label="Categorie">
        {CATS.map((c) => (
          <Link
            key={c}
            to="/offerte/$category"
            params={{ category: CATEGORY_PATH[c] }}
            className="inline-flex min-h-11 items-center rounded-full border-2 border-ink bg-surface px-4 text-xs font-bold uppercase"
          >
            {CATEGORY_INTRO[c].title}
          </Link>
        ))}
      </nav>
      <section className="mt-8">
        <FilterBar showDiscovery />
        <PublicGrid />
      </section>
    </main>
  );
}
