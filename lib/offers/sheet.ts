import { editorialChecklist, emptyChecklist, computeConfidence } from "./checklist";
import { isPlaceholderAffiliate } from "./affiliate";
import { computeHackScore } from "./score";
import type {
  Category,
  DiscoveryIntent,
  Offer,
  OfferStatus,
  OriginHub,
  PriceKind,
  ReviewChecklist,
} from "./types";

const CATEGORIES: Category[] = ["VOLI", "HOTEL", "PACCHETTI", "VENEZIA"];
const STATUSES: OfferStatus[] = [
  "RAW",
  "CANDIDATO",
  "REVIEW",
  "DA_VERIFICARE",
  "APPROVATO",
  "PUBBLICATO",
  "SCARTATO",
  "SCADUTO",
  "ARCHIVIATO",
];
const KINDS: PriceKind[] = ["andata_ritorno", "andata", "per_notte", "totale", "esperienza", "pacchetto"];
const INTENTS: DiscoveryIntent[] = ["weekend", "mare", "lungo_raggio", "hotel", "error_fare", "venezia"];
const HUBS: OriginHub[] = ["venezia", "milano", "bologna", "roma", "qualsiasi"];

export const SHEET_COLUMNS = [
  "id",
  "slug",
  "status",
  "category",
  "title",
  "badge",
  "destination",
  "origin",
  "price",
  "oldPrice",
  "priceKind",
  "priceScore",
  "locationScore",
  "valueScore",
  "verdict",
  "description",
  "warnings",
  "affiliateUrl",
  "imageUrl",
  "imageAlt",
  "verifiedAt",
  "expiresAt",
  "datesLabel",
  "durationLabel",
  "included",
  "baggage",
  "conditions",
  "discovery",
  "originHubs",
  "publishHome",
  "featuredRank",
  "notes",
] as const;

export type SheetParseResult = {
  offers: Offer[];
  errors: string[];
  skipped: number;
};

function splitCsvLine(line: string): string[] {
  const out: string[] = [];
  let cur = "";
  let q = false;
  for (let i = 0; i < line.length; i++) {
    const c = line[i];
    if (q) {
      if (c === '"') {
        if (line[i + 1] === '"') {
          cur += '"';
          i++;
        } else q = false;
      } else cur += c;
    } else if (c === '"') q = true;
    else if (c === ",") out.push(cur), (cur = "");
    else cur += c;
  }
  out.push(cur);
  return out.map((s) => s.trim());
}

export function parseCsv(text: string): Record<string, string>[] {
  const lines = text.replace(/^\uFEFF/, "").split(/\r?\n/).filter((l) => l.trim() && !l.startsWith("#"));
  if (!lines.length) return [];
  const headers = splitCsvLine(lines[0]!).map((h) => h.replace(/\s+/g, ""));
  return lines.slice(1).map((line) => {
    const cells = splitCsvLine(line);
    const row: Record<string, string> = {};
    headers.forEach((h, i) => {
      row[h] = cells[i] ?? "";
    });
    return row;
  });
}

function pick<T extends string>(v: string, allowed: T[], fallback: T): T {
  const n = v.trim().toUpperCase().replace(/ /g, "_");
  const hit = allowed.find((a) => a.toUpperCase() === n || a === v.trim());
  return hit ?? fallback;
}

function num(v: string, fallback = 0) {
  const n = Number(String(v).replace(",", "."));
  return Number.isFinite(n) ? n : fallback;
}

function list<T extends string>(v: string, allowed: T[]): T[] {
  return v
    .split(/[|;,/]/)
    .map((s) => s.trim())
    .filter(Boolean)
    .map((s) => allowed.find((a) => a === s || a.toUpperCase() === s.toUpperCase()))
    .filter((x): x is T => Boolean(x));
}

function yn(v: string) {
  return /^(1|true|si|sì|yes)$/i.test(v.trim());
}

function slugify(s: string) {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 60);
}

export function rowToOffer(row: Record<string, string>, index: number): { offer?: Offer; error?: string } {
  const title = row.title?.trim();
  if (!title) return { error: `Riga ${index + 2}: manca title` };
  const category = pick(row.category || "VOLI", CATEGORIES, "VOLI");
  const status = pick(row.status || "CANDIDATO", STATUSES, "CANDIDATO");
  const id = row.id?.trim() || `sheet-${index + 1}`;
  const slug = row.slug?.trim() || slugify(title);
  const price = num(row.price);
  if (price <= 0) return { error: `Riga ${index + 2} (${id}): prezzo non valido` };
  const affiliateUrl = row.affiliateUrl?.trim() || "https://example.com/PLACEHOLDER";
  const published = status === "PUBBLICATO";
  const checklist: ReviewChecklist = published ? editorialChecklist() : emptyChecklist();
  checklist.affiliateUrlValid = !isPlaceholderAffiliate(affiliateUrl);
  const priceScore = Math.min(10, Math.max(1, num(row.priceScore, 7)));
  const locationScore = Math.min(10, Math.max(1, num(row.locationScore, 7)));
  const valueScore = Math.min(10, Math.max(1, num(row.valueScore, 7)));
  const offer: Offer = {
    id,
    slug,
    status,
    category,
    title,
    badge: row.badge?.trim() || "CITY BREAK",
    destination: row.destination?.trim() || title,
    origin: row.origin?.trim() || "—",
    price,
    oldPrice: row.oldPrice ? num(row.oldPrice) : null,
    currency: "EUR",
    priceKind: pick(row.priceKind || "totale", KINDS, "totale"),
    priceScore,
    locationScore,
    valueScore,
    hackScore: computeHackScore(priceScore, locationScore, valueScore),
    confidence: 0,
    verdict: row.verdict?.trim() || "",
    description: row.description?.trim() || "",
    reasons: [],
    warnings: row.warnings ? row.warnings.split("|").map((s) => s.trim()).filter(Boolean) : [],
    sourceName: row.sourceName?.trim() || "Foglio",
    sourceUrl: row.sourceUrl?.trim() || "",
    affiliateUrl,
    imageUrl: row.imageUrl?.trim() || "https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1200&q=80",
    imageAlt: row.imageAlt?.trim() || title,
    availability: published ? "Verificato" : "Da verificare",
    verifiedAt: row.verifiedAt?.trim() || "",
    expiresAt: row.expiresAt?.trim() || null,
    publishedAt: published ? row.publishedAt?.trim() || new Date().toISOString().slice(0, 10) : null,
    updatedAt: new Date().toISOString(),
    datesLabel: row.datesLabel?.trim() || null,
    durationLabel: row.durationLabel?.trim() || null,
    included: row.included?.trim() || null,
    conditions: row.conditions?.trim() || null,
    baggage: row.baggage?.trim() || null,
    cancellation: row.cancellation?.trim() || null,
    publishHome: row.publishHome ? yn(row.publishHome) : published,
    featuredRank: num(row.featuredRank, 99),
    createdBy: "foglio",
    notes: row.notes?.trim() || "",
    rejectReason: "",
    checklist,
    sourceReliability: 7,
    discovery: list(row.discovery || "", INTENTS),
    originHubs: list(row.originHubs || "qualsiasi", HUBS),
    flight: null,
    hotel: null,
  };
  offer.confidence = computeConfidence(offer);
  return { offer };
}

export function csvToOffers(text: string): SheetParseResult {
  const rows = parseCsv(text);
  const offers: Offer[] = [];
  const errors: string[] = [];
  let skipped = 0;
  rows.forEach((row, i) => {
    if (Object.values(row).every((v) => !v)) {
      skipped += 1;
      return;
    }
    const r = rowToOffer(row, i);
    if (r.error) errors.push(r.error);
    else if (r.offer) offers.push(r.offer);
  });
  return { offers, errors, skipped };
}

export function googleCsvExportUrl(raw: string): string | null {
  let url: URL;
  try {
    url = new URL(raw.trim());
  } catch {
    return null;
  }
  if (url.protocol !== "https:") return null;
  if (url.hostname !== "docs.google.com") return null;
  if (!url.pathname.includes("/spreadsheets/")) return null;
  if (url.searchParams.get("output") === "csv" || url.searchParams.get("format") === "csv") return url.toString();
  if (url.pathname.includes("/pub")) {
    url.searchParams.set("output", "csv");
    return url.toString();
  }
  const id = url.pathname.match(/\/spreadsheets\/d\/([a-zA-Z0-9-_]+)/)?.[1];
  if (!id) return null;
  const gid = url.searchParams.get("gid") || "0";
  return `https://docs.google.com/spreadsheets/d/${id}/export?format=csv&gid=${gid}`;
}
