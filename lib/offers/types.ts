export type Category = "VOLI" | "HOTEL" | "PACCHETTI" | "VENEZIA";

export type OfferStatus =
  | "RAW"
  | "CANDIDATO"
  | "REVIEW"
  | "DA_VERIFICARE"
  | "APPROVATO"
  | "PUBBLICATO"
  | "SCARTATO"
  | "SCADUTO"
  | "ARCHIVIATO";

export type DataAdapter = "mock" | "sheets" | "supabase" | "api";

export type PriceKind = "andata_ritorno" | "andata" | "per_notte" | "totale" | "esperienza" | "pacchetto";

export type FreshnessState = "VERIFICATO" | "DA_RICONTROLLARE" | "SCADUTO";

export type DiscoveryIntent = "weekend" | "mare" | "lungo_raggio" | "hotel" | "error_fare" | "venezia";

export type OriginHub = "venezia" | "milano" | "bologna" | "roma" | "qualsiasi";

export type ChecklistKind = "blocking" | "quality";

export type ReviewChecklist = {
  priceVerified: boolean;
  availabilityVerified: boolean;
  datesVerified: boolean;
  durationVerified: boolean;
  baggageVerified: boolean;
  cancellationVerified: boolean;
  partnerLinkWorking: boolean;
  affiliateUrlValid: boolean;
  imageAltOk: boolean;
  copyReviewed: boolean;
  disclosureReady: boolean;
  expiresSet: boolean;
};

export const CHECKLIST_LABELS: Record<keyof ReviewChecklist, string> = {
  priceVerified: "Prezzo verificato",
  availabilityVerified: "Disponibilità verificata",
  datesVerified: "Date/orari verificati",
  durationVerified: "Durata e scali (voli)",
  baggageVerified: "Bagaglio e tariffe",
  cancellationVerified: "Condizioni / cancellazione",
  partnerLinkWorking: "Link partner funzionante",
  affiliateUrlValid: "URL affiliato reale (non placeholder)",
  imageAltOk: "Immagine + alt text",
  copyReviewed: "Copy editoriale controllato",
  disclosureReady: "Disclosure affiliato prevista",
  expiresSet: "Scadenza / riesame compilata",
};

export const CHECKLIST_KIND: Record<keyof ReviewChecklist, ChecklistKind> = {
  priceVerified: "blocking",
  availabilityVerified: "blocking",
  datesVerified: "blocking",
  cancellationVerified: "blocking",
  affiliateUrlValid: "blocking",
  expiresSet: "blocking",
  partnerLinkWorking: "blocking",
  durationVerified: "quality",
  baggageVerified: "quality",
  imageAltOk: "quality",
  copyReviewed: "quality",
  disclosureReady: "quality",
};

export const BLOCKING_KEYS = (Object.keys(CHECKLIST_KIND) as (keyof ReviewChecklist)[]).filter(
  (k) => CHECKLIST_KIND[k] === "blocking",
);

export const QUALITY_KEYS = (Object.keys(CHECKLIST_KIND) as (keyof ReviewChecklist)[]).filter(
  (k) => CHECKLIST_KIND[k] === "quality",
);

export type FlightFacts = {
  airline: string | null;
  airportFrom: string | null;
  airportTo: string | null;
  tripType: "AR" | "SOLO_ANDATA" | null;
  direct: boolean | null;
  duration: string | null;
  stops: number | null;
  baggage: string | null;
  dates: string | null;
  flexibleDates: boolean | null;
};

export type HotelFacts = {
  property: string | null;
  area: string | null;
  officialRating: number | null;
  board: string | null;
  cancellation: string | null;
  nights: number | null;
  pricePerNight: number | null;
  dates: string | null;
};

export type Offer = {
  id: string;
  slug: string;
  status: OfferStatus;
  category: Category;
  title: string;
  badge: string;
  destination: string;
  origin: string;
  price: number;
  oldPrice: number | null;
  currency: "EUR";
  priceKind: PriceKind;
  priceScore: number;
  locationScore: number;
  valueScore: number;
  hackScore: number;
  confidence: number;
  verdict: string;
  description: string;
  reasons: string[];
  warnings: string[];
  sourceName: string;
  sourceUrl: string;
  affiliateUrl: string;
  imageUrl: string;
  imageAlt: string;
  availability: string;
  verifiedAt: string;
  expiresAt: string | null;
  publishedAt: string | null;
  updatedAt: string | null;
  datesLabel: string | null;
  durationLabel: string | null;
  included: string | null;
  conditions: string | null;
  baggage: string | null;
  cancellation: string | null;
  publishHome: boolean;
  featuredRank: number;
  createdBy: string;
  notes: string;
  rejectReason: string;
  checklist: ReviewChecklist;
  sourceReliability: number;
  discovery: DiscoveryIntent[];
  originHubs: OriginHub[];
  flight: FlightFacts | null;
  hotel: HotelFacts | null;
};

export type RawCandidate = {
  id: string;
  collectedAt: string;
  source: string;
  rawTitle: string;
  price: number;
  oldPrice: number | null;
  origin: string;
  destination: string;
  category: Category;
  link: string;
  imageUrl: string;
  imageAlt: string;
  hash: string;
  parseStatus: "ok" | "dup" | "error";
};

export type RuleSet = {
  minHackScore: Record<Category, number>;
  minDiscountPct: Record<Category, number>;
  maxLayoversHours: number;
  minLocationHotel: number;
  minConfidence: number;
  maxHoursSinceVerify: number;
  maxPublishDays: number;
};

export type BotLog = {
  id: string;
  at: string;
  bot: string;
  action: string;
  read: number;
  saved: number;
  errors: number;
  message: string;
};

export type AlertKind =
  | "briefing"
  | "threshold"
  | "recheck"
  | "expiry"
  | "pipeline_error"
  | "approved_unpublished"
  | "missing_affiliate"
  | "incomplete_checklist";

export type AlertItem = {
  id: string;
  at: string;
  title: string;
  body: string;
  kind: AlertKind;
};

export type PipelineStep = "idle" | "scout" | "clean" | "score" | "editorial" | "verify" | "briefing";

export type AuditEvent = {
  id: string;
  at: string;
  offerId: string;
  field: string;
  from: string;
  to: string;
  actor: string;
};

export type SortKey = "recent" | "score" | "price" | "expiry";

export const CATEGORY_PATH: Record<Category, string> = {
  VOLI: "voli",
  HOTEL: "hotel",
  PACCHETTI: "pacchetti",
  VENEZIA: "venezia",
};

export const PATH_CATEGORY: Record<string, Category> = {
  voli: "VOLI",
  hotel: "HOTEL",
  pacchetti: "PACCHETTI",
  venezia: "VENEZIA",
};

export const CATEGORY_LABEL: Record<Category, string> = {
  VOLI: "Voli",
  HOTEL: "Hotel",
  PACCHETTI: "Pacchetti",
  VENEZIA: "Venezia",
};

export const PRICE_KIND_LABEL: Record<PriceKind, string> = {
  andata_ritorno: "A/R",
  andata: "Solo andata",
  per_notte: "A notte",
  totale: "Totale soggiorno",
  esperienza: "Esperienza",
  pacchetto: "Pacchetto",
};

export const INTENT_LABEL: Record<DiscoveryIntent | "tutti", string> = {
  tutti: "Tutti",
  weekend: "Weekend",
  mare: "Mare",
  lungo_raggio: "Lungo raggio",
  hotel: "Hotel",
  error_fare: "Error fare",
  venezia: "Venezia",
};

export const ORIGIN_LABEL: Record<OriginHub, string> = {
  venezia: "Venezia",
  milano: "Milano",
  bologna: "Bologna",
  roma: "Roma",
  qualsiasi: "Qualsiasi",
};
