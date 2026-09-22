import { createFileRoute, Link, Navigate, notFound } from "@tanstack/react-router";
import { useMemo } from "react";
import { Breadcrumb } from "@/components/site/Breadcrumb";
import { DemoChip } from "@/components/site/DemoChip";
import { JsonLd } from "@/components/site/JsonLd";
import { FilterBar, PublicGrid } from "@/components/site/OfferCard";
import { CATEGORY_INTRO } from "@/lib/content/product";
import { findOffer, isCategorySeg, offerPath } from "@/lib/offers/paths";
import { SEED_OFFERS } from "@/lib/offers/seed";
import { publishedOffers, useDeskStore } from "@/lib/offers/store";
import { CATEGORY_LABEL, CATEGORY_PATH, PATH_CATEGORY } from "@/lib/offers/types";
import { breadcrumbJsonLd, itemListJsonLd, pageHead } from "@/lib/seo";

export const Route = createFileRoute("/offerte/$category/")({
  component: CategoryOrLegacy,
  head: ({ params }) => {
    const cat = PATH_CATEGORY[params.category];
    if (cat) {
      const intro = CATEGORY_INTRO[cat];
      return pageHead(`${intro.title} | The Booking Hack`, intro.description, `/offerte/${params.category}`);
    }
    const offer = SEED_OFFERS.find((o) => o.id === params.category || o.slug === params.category);
    if (offer) {
      return pageHead(`${offer.title} | The Booking Hack`, offer.verdict || offer.description, offerPath(offer), {
        noindex: offer.status !== "PUBBLICATO",
      });
    }
    return pageHead(
      "Offerta non trovata | The Booking Hack",
      "Questa pagina non esiste o il deal non è più pubblicato.",
      `/offerte/${params.category}`,
      { noindex: true },
    );
  },
});

function CategoryOrLegacy() {
  const { category } = Route.useParams();
  const offers = useDeskStore((s) => s.offers);

  if (isCategorySeg(category)) {
    return <CategoryListing categorySeg={category} />;
  }

  const offer = findOffer(offers, category);
  if (offer) {
    return (
      <Navigate to="/offerte/$category/$slug" params={{ category: CATEGORY_PATH[offer.category], slug: offer.slug }} replace />
    );
  }
  throw notFound();
}

function CategoryListing({ categorySeg }: { categorySeg: string }) {
  const cat = PATH_CATEGORY[categorySeg];
  if (!cat) throw notFound();
  const intro = CATEGORY_INTRO[cat];
  const all = useDeskStore((s) => s.offers);
  const pub = useMemo(() => publishedOffers(all).filter((o) => o.category === cat), [all, cat]);
  return (
    <main className="mx-auto w-[min(1100px,calc(100%-1.5rem))] py-8">
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Offerte", path: "/offerte" },
            { name: CATEGORY_LABEL[cat], path: `/offerte/${categorySeg}` },
          ]),
          itemListJsonLd(
            intro.title,
            `/offerte/${categorySeg}`,
            pub.map((o) => ({ name: o.title, path: offerPath(o) })),
          ),
        ]}
      />
      <Breadcrumb items={[{ label: "Home", to: "/" }, { label: "Offerte", to: "/offerte" }, { label: CATEGORY_LABEL[cat] }]} />
      <DemoChip />
      <p className="text-xs font-bold uppercase text-muted">{intro.kicker}</p>
      <h1 className="mt-2 font-display text-4xl md:text-5xl">{intro.title}</h1>
      <p className="mt-3 max-w-2xl text-muted">{intro.description}</p>
      <p className="mt-4 text-sm">
        <Link to="/offerte" className="font-bold underline">
          Tutte le offerte
        </Link>
      </p>
      <section className="mt-8">
        <FilterBar showDiscovery hideCategory />
        <PublicGrid category={cat} />
      </section>
    </main>
  );
}
