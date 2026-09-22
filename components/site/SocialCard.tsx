import { HackTag } from "@/components/site/BrandMark";
import { freshnessCopy, freshnessOf } from "@/lib/offers/freshness";
import type { Offer } from "@/lib/offers/types";
import { eur } from "@/lib/utils";

/** Template visivo per Instagram/Telegram/newsletter. Generazione file: da collegare. */
export function SocialCard({ offer }: { offer: Offer }) {
  const dest = offer.destination.split(",")[0] ?? offer.destination;
  const fresh = freshnessCopy(freshnessOf(offer), offer.verifiedAt).short;
  return (
    <div className="max-w-sm rounded-xl border-3 border-ink bg-yellow p-5 text-ink shadow-card">
      <p className="flex items-center gap-2 font-display text-sm font-bold tracking-tight">
        THE BOOKING <HackTag className="text-xs shadow-none" />
      </p>
      <p className="mt-3 font-display text-4xl leading-none uppercase">{dest}</p>
      <p className="mt-3 font-display text-5xl text-pink">{eur(offer.price)}</p>
      <p className="mt-4 text-sm font-bold">Hack Score {offer.hackScore}</p>
      <p className="mt-1 text-xs font-bold uppercase">{fresh}</p>
      <p className="mt-4 text-2xs uppercase text-muted">Template social · generazione automatica da collegare</p>
    </div>
  );
}
