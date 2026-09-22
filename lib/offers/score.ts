import type { Offer } from "./types";

export function computeHackScore(price: number, location: number, value: number) {
  return Math.round((price * 0.4 + location * 0.3 + value * 0.3) * 10) / 10;
}

export function priceScoreFromDiscount(price: number, oldPrice: number | null) {
  if (!oldPrice || oldPrice <= price) return 6;
  const pct = ((oldPrice - price) / oldPrice) * 100;
  if (pct >= 45) return 10;
  if (pct >= 35) return 9;
  if (pct >= 25) return 8;
  if (pct >= 15) return 7;
  return 6;
}

export function discountPct(offer: Pick<Offer, "price" | "oldPrice">) {
  if (!offer.oldPrice || offer.oldPrice <= offer.price) return 0;
  return Math.round(((offer.oldPrice - offer.price) / offer.oldPrice) * 100);
}
