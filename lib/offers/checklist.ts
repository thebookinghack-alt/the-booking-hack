import { BLOCKING_KEYS, CHECKLIST_LABELS, QUALITY_KEYS, type Offer, type ReviewChecklist } from "./types";
import { isPlaceholderAffiliate as placeholderTest } from "./affiliate";
import { freshnessOf } from "./freshness";

export { CHECKLIST_LABELS };
export { isPlaceholderAffiliate } from "./affiliate";

export function emptyChecklist(): ReviewChecklist {
  return {
    priceVerified: false,
    availabilityVerified: false,
    datesVerified: false,
    durationVerified: false,
    baggageVerified: false,
    cancellationVerified: false,
    partnerLinkWorking: false,
    affiliateUrlValid: false,
    imageAltOk: false,
    copyReviewed: false,
    disclosureReady: false,
    expiresSet: false,
  };
}

export function editorialChecklist(): ReviewChecklist {
  return {
    ...emptyChecklist(),
    priceVerified: true,
    availabilityVerified: true,
    datesVerified: true,
    durationVerified: true,
    baggageVerified: true,
    cancellationVerified: true,
    partnerLinkWorking: true,
    affiliateUrlValid: false,
    imageAltOk: true,
    copyReviewed: true,
    disclosureReady: true,
    expiresSet: true,
  };
}

export function checklistProgress(c: ReviewChecklist) {
  const keys = Object.keys(c) as (keyof ReviewChecklist)[];
  const done = keys.filter((k) => c[k]).length;
  return { done, total: keys.length, complete: done === keys.length };
}

export function blockingProgress(c: ReviewChecklist) {
  const done = BLOCKING_KEYS.filter((k) => c[k]).length;
  return { done, total: BLOCKING_KEYS.length, complete: done === BLOCKING_KEYS.length };
}

export function qualityProgress(c: ReviewChecklist) {
  const done = QUALITY_KEYS.filter((k) => c[k]).length;
  return { done, total: QUALITY_KEYS.length, complete: done === QUALITY_KEYS.length };
}

export function missingChecks(c: ReviewChecklist, kind?: "blocking" | "quality") {
  const keys = kind === "blocking" ? BLOCKING_KEYS : kind === "quality" ? QUALITY_KEYS : (Object.keys(c) as (keyof ReviewChecklist)[]);
  return keys.filter((k) => !c[k]).map((k) => CHECKLIST_LABELS[k]);
}

export function computeConfidence(offer: Pick<Offer, "checklist" | "verifiedAt" | "affiliateUrl" | "sourceReliability">) {
  const { done, total } = checklistProgress(offer.checklist);
  let score = Math.round((done / total) * 70);
  score += Math.round((offer.sourceReliability / 10) * 15);
  if (offer.verifiedAt) {
    const hours = (Date.now() - new Date(offer.verifiedAt).getTime()) / 36e5;
    if (hours <= 24) score += 15;
    else if (hours <= 48) score += 8;
    else if (hours <= 72) score += 4;
  }
  if (placeholderTest(offer.affiliateUrl)) score = Math.min(score, 72);
  return Math.max(0, Math.min(100, score));
}

export function canApprove(offer: Offer, minConfidence: number) {
  const blocking = blockingProgress(offer.checklist);
  const missing = missingChecks(offer.checklist, "blocking");
  if (!blocking.complete) return { ok: false, reason: `Manca un controllo bloccante (${missing[0]})` };
  if (offer.confidence < minConfidence) return { ok: false, reason: `Confidence ${offer.confidence} sotto soglia ${minConfidence}` };
  if (placeholderTest(offer.affiliateUrl)) return { ok: false, reason: "URL affiliato ancora placeholder — badge Da collegare" };
  return { ok: true, reason: "" };
}

export function canPublish(offer: Offer, minConfidence: number) {
  if (offer.status !== "APPROVATO") return { ok: false, reason: "Solo le offerte APPROVATO possono essere pubblicate" };
  if (freshnessOf(offer) === "SCADUTO") return { ok: false, reason: "Verifica scaduta: non si pubblica un deal scaduto" };
  const essential = !offer.title || !offer.destination || !offer.price;
  if (essential) return { ok: false, reason: "Dati essenziali mancanti (titolo, destinazione o prezzo)" };
  return canApprove(offer, minConfidence);
}
