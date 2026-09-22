import { create } from "zustand";
import { persist } from "zustand/middleware";
import { setSheetLive } from "./adapter-live";
import { track } from "./analytics";
import * as bots from "./bots";
import { canApprove, canPublish, computeConfidence } from "./checklist";
import { DEFAULT_RULES } from "./config";
import { SEED_OFFERS } from "./seed";
import type {
  AlertItem,
  AuditEvent,
  BotLog,
  DiscoveryIntent,
  Offer,
  OfferStatus,
  OriginHub,
  PipelineStep,
  RawCandidate,
  ReviewChecklist,
  RuleSet,
  SortKey,
} from "./types";

type DeskState = {
  offers: Offer[];
  raw: RawCandidate[];
  rules: RuleSet;
  logs: BotLog[];
  alerts: AlertItem[];
  audit: AuditEvent[];
  running: PipelineStep;
  favorites: string[];
  demoAuthed: boolean;
  demoRole: "editor" | "admin";
  filter: string;
  sort: SortKey;
  query: string;
  intent: DiscoveryIntent | "tutti";
  originHub: OriginHub;
  toast: string;
  scout: () => void;
  clean: () => void;
  score: () => void;
  editorial: () => void;
  verify: () => void;
  expire: () => void;
  publishReady: () => { ok: boolean; message: string };
  pipeline: () => Promise<void>;
  setStatus: (id: string, status: OfferStatus, reason?: string) => { ok: boolean; message: string };
  toggleCheck: (id: string, key: keyof ReviewChecklist) => void;
  approve: (id: string) => { ok: boolean; message: string };
  reject: (id: string, reason: string) => void;
  archive: (id: string) => void;
  toggleFavorite: (id: string) => void;
  setRules: (rules: RuleSet) => void;
  loginDemo: () => void;
  logoutDemo: () => void;
  setFilter: (v: string) => void;
  setSort: (v: SortKey) => void;
  setQuery: (v: string) => void;
  setIntent: (v: DiscoveryIntent | "tutti") => void;
  setOriginHub: (v: OriginHub) => void;
  pushToast: (v: string) => void;
  clearToast: () => void;
  reset: () => void;
  applySheet: (incoming: Offer[], source: string) => { ok: boolean; message: string };
  sheetSource: string;
  sheetLoadedAt: string;
};

function audit(offerId: string, field: string, from: string, to: string): AuditEvent {
  return {
    id: `aud-${Date.now()}-${Math.random().toString(36).slice(2, 5)}`,
    at: new Date().toISOString(),
    offerId,
    field,
    from,
    to,
    actor: "demo-editor",
  };
}

const SEED_AUDIT: AuditEvent[] = [
  {
    id: "seed-tokyo",
    at: "2026-08-24T08:12:00.000Z",
    offerId: "tokyo-02",
    field: "status",
    from: "APPROVATO",
    to: "PUBBLICATO",
    actor: "filippo",
  },
  {
    id: "seed-dorso",
    at: "2026-08-25T09:40:00.000Z",
    offerId: "venezia-dorsoduro",
    field: "status",
    from: "APPROVATO",
    to: "PUBBLICATO",
    actor: "filippo",
  },
];

export const useDeskStore = create<DeskState>()(
  persist(
    (set, get) => ({
      offers: SEED_OFFERS,
      raw: [],
      rules: DEFAULT_RULES,
      logs: [],
      alerts: [],
      audit: SEED_AUDIT,
      running: "idle",
      favorites: [],
      demoAuthed: false,
      demoRole: "editor",
      filter: "TUTTE",
      sort: "recent",
      query: "",
      intent: "tutti",
      originHub: "qualsiasi",
      toast: "",
      sheetSource: "",
      sheetLoadedAt: "",
      scout: () => {
        const hashes = new Set(get().raw.map((r) => r.hash));
        const ids = new Set(get().offers.map((o) => o.id));
        const res = bots.scout(hashes, ids);
        set({ raw: [...res.candidates, ...get().raw], logs: [res.log, ...get().logs].slice(0, 50) });
      },
      clean: () => {
        const res = bots.clean(
          get().raw.filter((r) => r.parseStatus === "ok"),
          get().offers,
        );
        set({
          offers: [...res.offers, ...get().offers],
          raw: res.leftover,
          logs: [res.log, ...get().logs].slice(0, 50),
        });
      },
      score: () => {
        const res = bots.scoreOffers(get().offers, get().rules);
        set({ offers: res.next, logs: [res.log, ...get().logs].slice(0, 50) });
      },
      editorial: () => {
        const res = bots.editorialize(get().offers);
        set({ offers: res.next, logs: [res.log, ...get().logs].slice(0, 50) });
      },
      verify: () => {
        const res = bots.verifyPass(get().offers);
        set({ offers: res.next, logs: [res.log, ...get().logs].slice(0, 50) });
      },
      expire: () => {
        const res = bots.expireOffers(get().offers);
        set({ offers: res.next, logs: [res.log, ...get().logs].slice(0, 50) });
      },
      publishReady: () => {
        const ready = get().offers.filter((o) => o.status === "APPROVATO");
        let published = 0;
        const blocked: string[] = [];
        const next = get().offers.map((o) => {
          if (o.status !== "APPROVATO") return o;
          const gate = canPublish(o, get().rules.minConfidence);
          if (!gate.ok) {
            blocked.push(`${o.title}: ${gate.reason}`);
            return o;
          }
          published += 1;
          return {
            ...o,
            status: "PUBBLICATO" as const,
            publishHome: true,
            verifiedAt: new Date().toISOString(),
            publishedAt: new Date().toISOString().slice(0, 10),
            updatedAt: new Date().toISOString(),
            availability: "Verificato",
          };
        });
        set({
          offers: next,
          logs: [
            {
              id: `log-${Date.now()}`,
              at: new Date().toISOString(),
              bot: "publisher-01",
              action: "pubblica",
              read: ready.length,
              saved: published,
              errors: blocked.length,
              message: published ? `Pubblicate ${published}.` : blocked[0] || "Niente da pubblicare.",
            },
            ...get().logs,
          ].slice(0, 50),
          toast: published ? `Pubblicate ${published} offerte.` : blocked[0] || "Niente da pubblicare.",
        });
        track("publish", { count: published });
        return { ok: published > 0, message: published ? `Pubblicate ${published} offerte.` : blocked[0] || "Niente da pubblicare." };
      },
      pipeline: async () => {
        track("pipeline_run");
        const steps: PipelineStep[] = ["scout", "clean", "score", "editorial", "verify"];
        for (const step of steps) {
          set({ running: step });
          await new Promise((r) => setTimeout(r, 380));
          if (step === "scout") get().scout();
          if (step === "clean") get().clean();
          if (step === "score") get().score();
          if (step === "editorial") get().editorial();
          if (step === "verify") get().verify();
        }
        set({ running: "briefing" });
        await new Promise((r) => setTimeout(r, 280));
        get().expire();
        const alerts = bots.briefing(get().offers, get().raw);
        set({ running: "idle", alerts: [...alerts, ...get().alerts].slice(0, 30), toast: "Pipeline completata. Nessuna pubblicazione automatica." });
      },
      setStatus: (id, status, reason) => {
        const o = get().offers.find((x) => x.id === id);
        if (!o) return { ok: false, message: "Offerta non trovata" };
        const allowed = canTransition(o.status, status);
        if (!allowed) return { ok: false, message: `Transizione ${o.status} → ${status} non consentita` };
        set({
          offers: get().offers.map((x) => (x.id === id ? { ...x, status, rejectReason: reason ?? x.rejectReason } : x)),
          audit: [audit(id, "status", o.status, status), ...get().audit].slice(0, 80),
        });
        return { ok: true, message: `Stato: ${status}` };
      },
      toggleCheck: (id, key) => {
        const prev = get().offers.find((o) => o.id === id);
        set({
          offers: get().offers.map((o) => {
            if (o.id !== id) return o;
            const checklist = { ...o.checklist, [key]: !o.checklist[key] };
            const next = { ...o, checklist };
            next.confidence = computeConfidence(next);
            return next;
          }),
          audit: [audit(id, `checklist.${key}`, String(prev?.checklist[key]), "toggle"), ...get().audit].slice(0, 80),
        });
      },
      approve: (id) => {
        const o = get().offers.find((x) => x.id === id);
        if (!o) return { ok: false, message: "Offerta non trovata" };
        const gate = canApprove(o, get().rules.minConfidence);
        if (!gate.ok) {
          get().pushToast(gate.reason);
          return { ok: false, message: gate.reason };
        }
        get().setStatus(id, "APPROVATO");
        track("approve", { id });
        get().pushToast("Approvata. Lancia Publisher per metterla online.");
        return { ok: true, message: "Approvata. Lancia Publisher per metterla online." };
      },
      reject: (id, reason) => {
        get().setStatus(id, "SCARTATO", reason || "Scartata da desk");
        get().pushToast("Offerta scartata (motivazione salvata).");
      },
      archive: (id) => {
        const r = get().setStatus(id, "ARCHIVIATO");
        get().pushToast(r.ok ? "Archiviata." : r.message);
      },
      toggleFavorite: (id) => {
        const fav = get().favorites;
        const next = fav.includes(id) ? fav.filter((x) => x !== id) : [...fav, id];
        set({ favorites: next });
        track("save", { id });
      },
      setRules: (rules) => set({ rules, audit: [audit("rules", "rules", "update", "update"), ...get().audit].slice(0, 80) }),
      loginDemo: () => set({ demoAuthed: true }),
      logoutDemo: () => set({ demoAuthed: false }),
      setFilter: (v) => {
        set({ filter: v });
        track("filter_used", { v });
        track("filter", { v });
      },
      setSort: (v) => set({ sort: v }),
      setQuery: (v) => {
        set({ query: v });
        if (v.trim()) {
          track("search_used", { q: v.slice(0, 40) });
          track("search", { q: v.slice(0, 40) });
        }
      },
      setIntent: (v) => {
        set({ intent: v });
        track("filter_used", { intent: v });
      },
      setOriginHub: (v) => {
        set({ originHub: v });
        track("filter_used", { origin: v });
      },
      pushToast: (v) => set({ toast: v }),
      clearToast: () => set({ toast: "" }),
      applySheet: (incoming, source) => {
        if (!incoming.length) return { ok: false, message: "Nessuna riga valida nel foglio." };
        const incomingIds = new Set(incoming.map((o) => o.id));
        const keepLocal = get().offers.filter(
          (o) => !incomingIds.has(o.id) && o.status !== "PUBBLICATO" && o.status !== "SCADUTO",
        );
        setSheetLive(true, source, incoming.length);
        set({
          offers: [...incoming, ...keepLocal],
          sheetSource: source,
          sheetLoadedAt: new Date().toISOString(),
          toast: `Foglio applicato: ${incoming.length} righe. I candidati locali restano.`,
          audit: [audit("sheet", "catalog", get().sheetSource || "mock", source), ...get().audit].slice(0, 80),
        });
        return { ok: true, message: `Importate ${incoming.length} offerte dal foglio.` };
      },
      reset: () => {
        setSheetLive(false);
        set({
          offers: SEED_OFFERS,
          raw: [],
          rules: DEFAULT_RULES,
          logs: [],
          alerts: [],
          audit: SEED_AUDIT,
          running: "idle",
          favorites: [],
          filter: "TUTTE",
          sort: "recent",
          query: "",
          intent: "tutti",
          originHub: "qualsiasi",
          toast: "Dati demo ripristinati.",
          sheetSource: "",
          sheetLoadedAt: "",
        });
      },
    }),
    {
      name: "tbh-desk-v9",
      skipHydration: true,
      partialize: (s) => {
        const { running, toast, ...rest } = s;
        void running;
        void toast;
        return { ...rest, running: "idle" as const, toast: "" };
      },
    },
  ),
);

const TRANSITIONS: Record<OfferStatus, OfferStatus[]> = {
  RAW: ["CANDIDATO", "SCARTATO"],
  CANDIDATO: ["REVIEW", "DA_VERIFICARE", "SCARTATO"],
  REVIEW: ["DA_VERIFICARE", "APPROVATO", "SCARTATO", "CANDIDATO"],
  DA_VERIFICARE: ["REVIEW", "APPROVATO", "SCARTATO"],
  APPROVATO: ["PUBBLICATO", "DA_VERIFICARE", "SCARTATO"],
  PUBBLICATO: ["SCADUTO", "DA_VERIFICARE", "ARCHIVIATO"],
  SCARTATO: ["ARCHIVIATO", "CANDIDATO"],
  SCADUTO: ["ARCHIVIATO", "DA_VERIFICARE"],
  ARCHIVIATO: [],
};

function canTransition(from: OfferStatus, to: OfferStatus) {
  if (from === to) return true;
  return TRANSITIONS[from]?.includes(to) ?? false;
}

export function publishedOffers(offers: Offer[]) {
  return offers
    .filter((o) => o.status === "PUBBLICATO")
    .sort((a, b) => a.featuredRank - b.featuredRank || b.hackScore - a.hackScore);
}

export function sortOffers(list: Offer[], sort: SortKey) {
  const copy = [...list];
  if (sort === "score") copy.sort((a, b) => b.hackScore - a.hackScore);
  else if (sort === "price") copy.sort((a, b) => a.price - b.price);
  else if (sort === "expiry")
    copy.sort((a, b) => (a.expiresAt || "9999").localeCompare(b.expiresAt || "9999"));
  else copy.sort((a, b) => (b.verifiedAt || "").localeCompare(a.verifiedAt || ""));
  return copy;
}

export function applyDiscovery(list: Offer[], intent: DiscoveryIntent | "tutti", originHub: OriginHub) {
  return list.filter((o) => {
    if (intent !== "tutti" && !(o.discovery ?? []).includes(intent)) return false;
    if (originHub !== "qualsiasi" && !(o.originHubs ?? ["qualsiasi"]).includes(originHub) && !(o.originHubs ?? []).includes("qualsiasi"))
      return false;
    return true;
  });
}
