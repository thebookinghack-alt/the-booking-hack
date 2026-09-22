import type { DataAdapter, RuleSet } from "./types";

/** Config visibile: niente segreti nel frontend. */
export const APP_CONFIG = {
  adapter: "mock" as DataAdapter,
  siteUrl: "https://thebookinghack.com",
  demoMode: true,
  version: "V9",
  demoEditorHint: "Entra come editor demo",
  iubendaPrivacy: "https://www.iubenda.com/privacy-policy/67054229",
  iubendaCookie: "https://www.iubenda.com/privacy-policy/67054229/cookie-policy",
  analyticsEnabled: false,
  newsletterProvider: "none" as "none" | "buttondown" | "mailerlite",
};

export const DEFAULT_RULES: RuleSet = {
  minHackScore: { VOLI: 8.6, HOTEL: 8.2, PACCHETTI: 8.4, VENEZIA: 8.0 },
  minDiscountPct: { VOLI: 25, HOTEL: 20, PACCHETTI: 20, VENEZIA: 15 },
  maxLayoversHours: 5,
  minLocationHotel: 8,
  minConfidence: 80,
  maxHoursSinceVerify: 48,
  maxPublishDays: 7,
};

export const API_CONTRACT = [
  "GET /api/offers",
  "GET /api/offers/:id",
  "POST /api/pipeline/run",
  "PATCH /api/offers/:id",
  "POST /api/offers/:id/verify",
  "POST /api/offers/:id/publish",
  "GET /api/rules",
  "PATCH /api/rules",
  "POST /api/newsletter/subscribe",
  "POST /api/analytics/event",
] as const;

export const NEWSLETTER_SEGMENTS = ["Venezia", "Italia", "Europa", "Lungo raggio", "Hotel", "Error fare"] as const;
