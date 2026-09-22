import { APP_CONFIG } from "./config";

export type AnalyticsEvent =
  | "page_view"
  | "deal_view"
  | "filter_used"
  | "search_used"
  | "newsletter_started"
  | "newsletter_submitted"
  | "affiliate_click"
  | "share_clicked"
  | "outbound_click"
  | "scroll_depth"
  | "offer_open"
  | "filter"
  | "search"
  | "save"
  | "share"
  | "newsletter_signup"
  | "approve"
  | "publish"
  | "pipeline_run";

/** Analytics spenti di default. Nessun dato personale, nessun pixel finto. */
export function track(event: AnalyticsEvent, payload?: Record<string, string | number | boolean>) {
  if (!APP_CONFIG.analyticsEnabled) return;
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent("tbh:track", { detail: { event, payload, at: Date.now() } }));
}

export const ANALYTICS_NOTE = "Analytics non collegato — demo.";
