import { createFileRoute, notFound } from "@tanstack/react-router";
import { ExpiredOffer, OfferDetail } from "@/components/site/OfferDetail";
import { freshnessOf } from "@/lib/offers/freshness";
import { findOfferByPath, offerPath } from "@/lib/offers/paths";
import { SEED_OFFERS } from "@/lib/offers/seed";
import { useDeskStore } from "@/lib/offers/store";
import { PATH_CATEGORY } from "@/lib/offers/types";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/offerte/$category/$slug")({
  component: OfferByPath,
  head: ({ params }) => {
    const offer = findOfferByPath(SEED_OFFERS, params.category, params.slug);
    if (!offer) {
      return pageHead(
        "Deal non trovato | The Booking Hack",
        "Questo deal non è in catalogo.",
        `/offerte/${params.category}/${params.slug}`,
        { noindex: true },
      );
    }
    const expired = offer.status === "SCADUTO" || freshnessOf(offer) === "SCADUTO";
    const publicOk = offer.status === "PUBBLICATO";
    const baseTitle = offer.title.replace(/\s*\(scaduta\)\s*$/i, "");
    return pageHead(
      expired ? `${baseTitle} (scaduta) | The Booking Hack` : `${offer.title} | The Booking Hack`,
      offer.verdict || offer.description,
      offerPath(offer),
      { noindex: expired || !publicOk },
    );
  },
});

function OfferByPath() {
  const { category, slug } = Route.useParams();
  const offers = useDeskStore((s) => s.offers);
  const offer = findOfferByPath(offers, category, slug);
  if (!offer) throw notFound();
  const cat = PATH_CATEGORY[category];
  if (cat && offer.category !== cat) throw notFound();
  if (offer.status === "SCADUTO" || freshnessOf(offer) === "SCADUTO") return <ExpiredOffer offer={offer} />;
  if (offer.status !== "PUBBLICATO") throw notFound();
  return <OfferDetail offer={offer} />;
}
