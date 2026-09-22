import { APP_CONFIG } from "./config";
import { getSheetLive } from "./adapter-live";
import type { DataAdapter, Offer } from "./types";

export type AdapterStatus = {
  adapter: DataAdapter;
  connected: boolean;
  label: string;
  note: string;
};

const LABELS: Record<DataAdapter, AdapterStatus> = {
  mock: {
    adapter: "mock",
    connected: true,
    label: "Mock locale",
    note: "Catalogo demo + persistenza nel browser. Non è un database di produzione.",
  },
  sheets: {
    adapter: "sheets",
    connected: false,
    label: "Google Sheets / CSV",
    note: "Pubblica il foglio come CSV. Nessuna chiave nel frontend. Il fetch passa dal server.",
  },
  supabase: {
    adapter: "supabase",
    connected: false,
    label: "Supabase / PostgreSQL",
    note: "Da collegare: credenziali solo server-side.",
  },
  api: {
    adapter: "api",
    connected: false,
    label: "API voli/hotel",
    note: "Da collegare: nessun feed live in questa demo.",
  },
};

export type OfferAdapter = {
  id: DataAdapter;
  list(): Promise<Offer[]>;
  getBySlug(slug: string): Promise<Offer | undefined>;
  status(): AdapterStatus;
};

export function adapterStatus(): AdapterStatus {
  const sheet = getSheetLive();
  if (sheet.connected) {
    return {
      adapter: "sheets",
      connected: true,
      label: "Foglio collegato",
      note: `${sheet.count} righe da ${sheet.source}. Placeholder affiliato resta bloccante in pubblicazione.`,
    };
  }
  return LABELS[APP_CONFIG.adapter];
}

export function assertNoFakeLiveConnection() {
  if (APP_CONFIG.adapter !== "mock" && !getSheetLive().connected) {
    return {
      ok: false as const,
      message: `${LABELS[APP_CONFIG.adapter].label} non è collegato. Resta sul mock.`,
    };
  }
  return { ok: true as const, message: getSheetLive().connected ? "Foglio attivo" : "Mock attivo" };
}

/** Contratto: il frontend parla con un adapter, non con fetch inventate. */
export function getAdapter(): OfferAdapter {
  const id = getSheetLive().connected ? "sheets" : APP_CONFIG.adapter;
  return {
    id,
    async list() {
      const { SEED_OFFERS } = await import("./seed");
      return SEED_OFFERS;
    },
    async getBySlug(slug: string) {
      const { SEED_OFFERS } = await import("./seed");
      return SEED_OFFERS.find((o) => o.slug === slug || o.id === slug);
    },
    status: adapterStatus,
  };
}
