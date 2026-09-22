import { DEFAULT_RULES } from "./config";
import type { FreshnessState, Offer } from "./types";

export function hoursSince(iso: string, now = Date.now()) {
  if (!iso) return Number.POSITIVE_INFINITY;
  const t = new Date(iso).getTime();
  if (Number.isNaN(t)) return Number.POSITIVE_INFINITY;
  return (now - t) / 36e5;
}

export function freshnessOf(offer: Pick<Offer, "status" | "verifiedAt" | "expiresAt">, maxHours = DEFAULT_RULES.maxHoursSinceVerify, now = Date.now()): FreshnessState {
  if (offer.status === "SCADUTO") return "SCADUTO";
  if (offer.expiresAt) {
    const exp = new Date(offer.expiresAt).getTime();
    if (!Number.isNaN(exp) && exp < now) return "SCADUTO";
  }
  if (!offer.verifiedAt) return "DA_RICONTROLLARE";
  if (hoursSince(offer.verifiedAt, now) > maxHours) return "DA_RICONTROLLARE";
  return "VERIFICATO";
}

export function formatItDate(iso: string) {
  if (!iso) return "—";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("it-IT", { day: "numeric", month: "long", year: "numeric" });
}

export function relativeVerified(iso: string, now = Date.now()) {
  const h = hoursSince(iso, now);
  if (!iso || !Number.isFinite(h)) return "Non ancora verificato";
  if (h < 18) return "Verificato oggi";
  if (h < 42) return "Verificato ieri";
  const days = Math.max(2, Math.floor(h / 24));
  return `Verificato ${days} giorni fa`;
}

export function freshnessCopy(state: FreshnessState, verifiedAt: string) {
  if (state === "SCADUTO") {
    return { short: "Offerta scaduta", detail: "Il prezzo può essere sparito. Non è più in pubblicazione." };
  }
  if (state === "DA_RICONTROLLARE") {
    return {
      short: "Da ricontrollare",
      detail: verifiedAt
        ? `Ultimo controllo ${formatItDate(verifiedAt)}. Non è una garanzia sul prezzo attuale.`
        : "Manca un controllo recente. Non è una garanzia sul prezzo.",
    };
  }
  return {
    short: "Controllo recente",
    detail: `${relativeVerified(verifiedAt)}. Il Confidence misura completezza e freschezza dei controlli, non la probabilità che il prezzo esista ancora.`,
  };
}

export function confidenceCaption(score: number) {
  if (score >= 90) return "Controllo recente e checklist completa.";
  if (score >= 80) return "Verifica buona, qualche punto qualitativo aperto.";
  if (score >= 60) return "Dati parziali o verifica non recente.";
  return "Verifica incompleta: non pubblicabile.";
}

export const CONFIDENCE_DISCLAIMER =
  "Il Confidence Score misura quanto sono completi e recenti i controlli editoriali. Non garantisce che il prezzo sia ancora disponibile al momento della prenotazione.";
