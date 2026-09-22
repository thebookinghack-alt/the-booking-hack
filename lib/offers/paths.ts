import { CATEGORY_PATH, PATH_CATEGORY, type Category, type Offer } from "./types";

export function categoryPath(category: Category) {
  return `/offerte/${CATEGORY_PATH[category]}`;
}

export function offerPath(offer: Pick<Offer, "category" | "slug">) {
  return `/offerte/${CATEGORY_PATH[offer.category]}/${offer.slug}`;
}

export function offerMatches(offer: Pick<Offer, "id" | "slug">, key: string) {
  return offer.id === key || offer.slug === key;
}

export function findOffer(offers: Offer[], key: string) {
  return offers.find((o) => offerMatches(o, key));
}

export function findOfferByPath(offers: Offer[], categorySeg: string, slug: string) {
  const cat = PATH_CATEGORY[categorySeg];
  return offers.find((o) => o.slug === slug && (!cat || o.category === cat));
}

export function isCategorySeg(seg: string): seg is (typeof CATEGORY_PATH)[Category] {
  return Boolean(PATH_CATEGORY[seg]);
}
