import { emptyChecklist, computeConfidence, isPlaceholderAffiliate } from "./checklist";
import { SCOUT_POOL } from "./catalog";
import { computeHackScore, priceScoreFromDiscount } from "./score";
import type { AlertItem, BotLog, Offer, RawCandidate, RuleSet } from "./types";

function uid(prefix: string) {
  return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`;
}
function nowIso() {
  return new Date().toISOString();
}
function log(bot: string, action: string, read: number, saved: number, errors: number, message: string): BotLog {
  return { id: uid("log"), at: nowIso(), bot, action, read, saved, errors, message };
}

export function offerHash(category: string, origin: string, dest: string, source: string) {
  return `${category}|${origin}|${dest}|${source}`.toLowerCase();
}

export function scout(existingHashes: Set<string>, existingIds: Set<string>) {
  const shuffled = [...SCOUT_POOL].sort(() => Math.random() - 0.5);
  const picked = shuffled.filter((t) => !existingHashes.has(t.hash) && !existingIds.has(t.hash)).slice(0, 5);
  const candidates: RawCandidate[] = picked.map((t) => ({
    id: uid("raw"),
    collectedAt: nowIso(),
    source: t.source,
    rawTitle: t.title,
    price: t.price + Math.round((Math.random() - 0.4) * 20),
    oldPrice: t.oldPrice,
    origin: t.origin,
    destination: t.destination,
    category: t.category,
    link: "https://example.com/PLACEHOLDER-replace-with-real-affiliate-link",
    imageUrl: t.imageUrl,
    imageAlt: t.imageAlt,
    hash: t.hash,
    parseStatus: "ok" as const,
  }));
  return {
    candidates,
    log: log("scout-01", "raccolta", SCOUT_POOL.length, candidates.length, 0, `Salvati ${candidates.length} candidati grezzi (mock feed).`),
  };
}

export function blankOffer(partial: Partial<Offer> & Pick<Offer, "id" | "category" | "title" | "destination">): Offer {
  const base: Offer = {
    slug: partial.id,
    status: "CANDIDATO",
    origin: "—",
    price: 0,
    oldPrice: null,
    currency: "EUR",
    priceKind: "totale",
    priceScore: 0,
    locationScore: 8,
    valueScore: 0,
    hackScore: 0,
    confidence: 0,
    verdict: "",
    description: "",
    reasons: [],
    warnings: [],
    sourceName: "mock",
    sourceUrl: "",
    affiliateUrl: "https://example.com/PLACEHOLDER-replace-with-real-affiliate-link",
    imageUrl: "",
    imageAlt: "",
    availability: "Da verificare",
    verifiedAt: "",
    expiresAt: null,
    publishedAt: null,
    updatedAt: null,
    datesLabel: null,
    durationLabel: null,
    included: null,
    conditions: null,
    baggage: null,
    cancellation: null,
    publishHome: false,
    featuredRank: 0,
    createdBy: "bot-cleaner",
    notes: "",
    rejectReason: "",
    checklist: emptyChecklist(),
    sourceReliability: 6,
    badge: "SMART ROUTE",
    discovery: [],
    originHubs: ["qualsiasi"],
    flight: null,
    hotel: null,
    ...partial,
  };
  base.confidence = computeConfidence(base);
  return base;
}

export function clean(raw: RawCandidate[], master: Offer[]) {
  const hashes = new Set(master.map((o) => o.id));
  const leftover: RawCandidate[] = [];
  const offers: Offer[] = [];
  let dups = 0;
  for (const r of raw) {
    const h = offerHash(r.category, r.origin, r.destination, r.source);
    if (hashes.has(r.hash) || master.some((m) => offerHash(m.category, m.origin, m.destination, m.sourceName) === h)) {
      leftover.push({ ...r, parseStatus: "dup" });
      dups += 1;
      continue;
    }
    const tpl = SCOUT_POOL.find((t) => t.hash === r.hash);
    const originHubs =
      r.origin === "Venezia" ? (["venezia"] as const) : r.origin === "Milano" ? (["milano"] as const) : r.origin === "Bologna" ? (["bologna"] as const) : r.origin === "Roma" ? (["roma"] as const) : (["qualsiasi"] as const);
    offers.push(
      blankOffer({
        id: r.hash,
        slug: r.hash,
        category: r.category,
        title: r.rawTitle,
        badge: r.category === "VOLI" ? "CITY BREAK" : r.category === "HOTEL" ? "HOTEL DROP" : "WEEKEND HACK",
        destination: r.destination,
        origin: r.origin,
        price: r.price,
        oldPrice: r.oldPrice,
        priceKind: r.category === "VOLI" ? "andata_ritorno" : r.category === "HOTEL" ? "per_notte" : "pacchetto",
        locationScore: tpl?.locationScore ?? 8,
        sourceName: r.source,
        sourceUrl: r.link,
        affiliateUrl: r.link,
        imageUrl: r.imageUrl,
        imageAlt: r.imageAlt,
        originHubs: [...originHubs],
        discovery: r.category === "HOTEL" ? ["hotel"] : r.category === "VENEZIA" ? ["venezia"] : [],
        checklist: { ...emptyChecklist(), imageAltOk: Boolean(r.imageAlt) },
        notes: "Normalizzato da raw_candidates",
      }),
    );
    hashes.add(r.hash);
  }
  return {
    offers,
    leftover,
    log: log("cleaner-01", "normalizza", raw.length, offers.length, dups, `Candidati puliti ${offers.length}, duplicati ${dups}.`),
  };
}

export function scoreOffers(offers: Offer[], rules: RuleSet) {
  let saved = 0;
  const next = offers.map((o) => {
    if (o.status !== "CANDIDATO" && o.status !== "REVIEW" && o.status !== "DA_VERIFICARE") return o;
    const priceScore = priceScoreFromDiscount(o.price, o.oldPrice);
    const valueScore = Math.min(10, Math.max(6, priceScore - 1 + (o.category === "PACCHETTI" ? 1 : 0)));
    const hackScore = computeHackScore(priceScore, o.locationScore, valueScore);
    const min = rules.minHackScore[o.category];
    const lowConf = computeConfidence(o) < rules.minConfidence;
    saved += 1;
    let status = o.status;
    if (hackScore >= min && !lowConf) status = "REVIEW";
    else if (lowConf) status = "DA_VERIFICARE";
    const nextO = { ...o, priceScore, valueScore, hackScore, status, notes: lowConf ? "Confidence bassa → DA_VERIFICARE" : hackScore >= min ? "Sopra soglia → REVIEW" : "Sotto soglia" };
    nextO.confidence = computeConfidence(nextO);
    return nextO;
  });
  return { next, log: log("scoring-01", "score", offers.length, saved, 0, "Hack Score 40/30/30 e Confidence aggiornati.") };
}

export function editorialize(offers: Offer[]) {
  let n = 0;
  const next = offers.map((o) => {
    if (o.status !== "REVIEW" && o.status !== "CANDIDATO" && o.status !== "DA_VERIFICARE") return o;
    if (o.verdict) return o;
    n += 1;
    const drop = o.oldPrice ? Math.round(((o.oldPrice - o.price) / o.oldPrice) * 100) : 0;
    const badge =
      o.category === "VOLI" && drop >= 40 ? "ERROR FARE" : o.category === "VENEZIA" ? "VENEZIA PICK" : drop >= 30 ? "FLASH DEAL" : "SMART ROUTE";
    const nextO: Offer = {
      ...o,
      badge,
      verdict: `Qui il prezzo è interessante (${drop}% sul riferimento). Lo terrei d'occhio, ma controlla le condizioni.`,
      description: `${o.origin !== "—" ? `${o.origin} → ` : ""}${o.destination}. Selezione editoriale: non il numero più basso.`,
      reasons: [
        drop ? `Sconto circa ${drop}% sul riferimento` : "Prezzo in linea, da valutare",
        o.locationScore >= 9 ? "Posizione valutata bene" : "Location da confermare",
        "Condizioni da verificare sul partner",
      ],
      warnings: ["Bozza AI — da rifinire", isPlaceholderAffiliate(o.affiliateUrl) ? "Affiliate URL da collegare" : ""].filter(Boolean),
      notes: "Bozza Editorial Agent",
      checklist: { ...o.checklist, copyReviewed: false },
    };
    nextO.confidence = computeConfidence(nextO);
    return nextO;
  });
  return { next, log: log("editorial-01", "copy", offers.length, n, 0, `Bozze scritte per ${n} offerte.`) };
}

export function verifyPass(offers: Offer[]) {
  let n = 0;
  const next = offers.map((o) => {
    if (o.status === "PUBBLICATO" || o.status === "SCARTATO" || o.status === "SCADUTO" || o.status === "ARCHIVIATO") return o;
    n += 1;
    const missing = Object.entries(o.checklist).filter(([, v]) => !v).length;
    return { ...o, notes: missing ? `Verification Agent: mancano ${missing} check` : "Checklist completa, attende Filippo" };
  });
  return { next, log: log("verify-01", "gap", offers.length, n, 0, "Controlli mancanti segnalati. Nessuna pubblicazione automatica.") };
}

export function expireOffers(offers: Offer[]) {
  const now = Date.now();
  let n = 0;
  const next = offers.map((o) => {
    if (!o.expiresAt || o.status === "SCARTATO" || o.status === "ARCHIVIATO") return o;
    if (new Date(o.expiresAt).getTime() < now && o.status !== "SCADUTO") {
      n += 1;
      return { ...o, status: "SCADUTO" as const };
    }
    return o;
  });
  return { next, log: log("expiry-01", "scadenza", offers.length, n, 0, `Marcate scadute: ${n}.`) };
}

export function briefing(offers: Offer[], candidates: RawCandidate[]): AlertItem[] {
  const review = offers.filter((o) => o.status === "REVIEW" || o.status === "DA_VERIFICARE");
  const top = [...review].sort((a, b) => b.hackScore - a.hackScore).slice(0, 5);
  const approved = offers.filter((o) => o.status === "APPROVATO");
  const missingAff = offers.filter(
    (o) => (o.status === "PUBBLICATO" || o.status === "APPROVATO") && isPlaceholderAffiliate(o.affiliateUrl),
  );
  const incomplete = offers
    .filter((o) => o.status === "REVIEW" || o.status === "DA_VERIFICARE" || o.status === "APPROVATO")
    .filter((o) => Object.values(o.checklist).some((v) => !v));
  const expired = offers.filter((o) => o.status === "SCADUTO");
  const recheck = offers.filter((o) => o.status === "PUBBLICATO" && o.expiresAt);
  const threshold = offers.filter((o) => o.status === "REVIEW" && o.hackScore >= 9);

  const items: AlertItem[] = [
    {
      id: uid("al"),
      at: nowIso(),
      kind: "briefing",
      title: "Briefing mattina",
      body: `${candidates.length} grezzi. ${review.length} da rivedere.\n${top.map((o) => `• ${o.title} — HS ${o.hackScore} · Conf ${o.confidence}`).join("\n") || "Nessun candidato."}`,
    },
  ];
  if (threshold.length) {
    items.push({
      id: uid("al"),
      at: nowIso(),
      kind: "threshold",
      title: "Sopra soglia alta",
      body: threshold.map((o) => `${o.title} · HS ${o.hackScore}`).join("\n"),
    });
  }
  if (recheck.length) {
    items.push({
      id: uid("al"),
      at: nowIso(),
      kind: "recheck",
      title: "Offerte da ricontrollare",
      body: recheck.map((o) => `${o.title} · entro ${o.expiresAt}`).join("\n"),
    });
  }
  if (expired.length) {
    items.push({
      id: uid("al"),
      at: nowIso(),
      kind: "expiry",
      title: "Scadute",
      body: expired.map((o) => o.title).join("\n"),
    });
  }
  if (approved.length) {
    items.push({
      id: uid("al"),
      at: nowIso(),
      kind: "approved_unpublished",
      title: "Approvate non ancora pubblicate",
      body: `${approved.length} in coda Publisher (passo manuale).`,
    });
  }
  if (missingAff.length) {
    items.push({
      id: uid("al"),
      at: nowIso(),
      kind: "missing_affiliate",
      title: "Affiliate da collegare",
      body: missingAff.map((o) => o.title).join("\n"),
    });
  }
  if (incomplete.length) {
    items.push({
      id: uid("al"),
      at: nowIso(),
      kind: "incomplete_checklist",
      title: "Checklist incompleta",
      body: incomplete.map((o) => o.title).join("\n"),
    });
  }
  return items;
}
