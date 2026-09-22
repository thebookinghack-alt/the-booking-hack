import { freshnessCopy, freshnessOf, relativeVerified } from "@/lib/offers/freshness";
import type { Offer } from "@/lib/offers/types";
import { cn } from "@/lib/utils";

export function FreshnessBadge({ offer, className }: { offer: Offer; className?: string }) {
  const state = freshnessOf(offer);
  const copy = freshnessCopy(state, offer.verifiedAt);
  const cls =
    state === "VERIFICATO"
      ? "bg-lime text-ink"
      : state === "DA_RICONTROLLARE"
        ? "bg-yellow text-ink"
        : "bg-wash text-muted";
  return (
    <span className={cn("inline-flex items-center rounded-full border-2 border-ink px-2.5 py-0.5 text-2xs font-bold uppercase", cls, className)}>
      {state === "VERIFICATO" ? relativeVerified(offer.verifiedAt) : copy.short}
    </span>
  );
}
