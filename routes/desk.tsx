import { createFileRoute, Link } from "@tanstack/react-router";
import {
  AlertTriangle,
  Bell,
  Bot,
  Check,
  CheckCircle2,
  ClipboardList,
  Circle,
  LineChart,
  Play,
  RotateCcw,
  Settings2,
  Shield,
  Table2,
  Trash2,
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet } from "@/components/ui/sheet";
import { SheetPanel } from "@/components/site/SheetPanel";
import { AGENT_SPECS } from "@/lib/offers/agents";
import { ANALYTICS_NOTE } from "@/lib/offers/analytics";
import { canApprove, checklistProgress, CHECKLIST_LABELS, missingChecks } from "@/lib/offers/checklist";
import { isPlaceholderAffiliate } from "@/lib/offers/affiliate";
import { API_CONTRACT, APP_CONFIG } from "@/lib/offers/config";
import { formatItDate } from "@/lib/offers/freshness";
import { adapterStatus } from "@/lib/offers/repository";
import { useDeskStore } from "@/lib/offers/store";
import {
  BLOCKING_KEYS,
  QUALITY_KEYS,
  type Category,
  type Offer,
  type PipelineStep,
  type ReviewChecklist,
  type RuleSet,
} from "@/lib/offers/types";
import { pageHead } from "@/lib/seo";
import { eur } from "@/lib/utils";

export const Route = createFileRoute("/desk")({
  component: DeskPage,
  head: () =>
    pageHead("Desk demo | The Booking Hack", "Back-office editoriale demo. Non è un login reale.", "/desk", { noindex: true }),
});

const TABS = [
  { id: "pipeline", label: "Pipeline", icon: Play },
  { id: "foglio", label: "Foglio", icon: Table2 },
  { id: "master", label: "Master", icon: ClipboardList },
  { id: "raw", label: "Grezzi", icon: Bot },
  { id: "rules", label: "Regole", icon: Settings2 },
  { id: "alerts", label: "Alert", icon: Bell },
  { id: "perf", label: "Perf", icon: LineChart },
] as const;

const STEPS: { id: PipelineStep; label: string }[] = [
  { id: "scout", label: "Scout" },
  { id: "clean", label: "Cleaner" },
  { id: "score", label: "Scoring" },
  { id: "editorial", label: "Editorial" },
  { id: "verify", label: "Verify" },
  { id: "briefing", label: "Briefing" },
];

const STATUS_ICON: Record<string, typeof CheckCircle2> = {
  PUBBLICATO: CheckCircle2,
  APPROVATO: Check,
  REVIEW: ClipboardList,
  DA_VERIFICARE: AlertTriangle,
  SCARTATO: Trash2,
  SCADUTO: AlertTriangle,
  CANDIDATO: Circle,
  RAW: Circle,
  ARCHIVIATO: Circle,
};

function DeskPage() {
  const authed = useDeskStore((s) => s.demoAuthed);
  const login = useDeskStore((s) => s.loginDemo);
  if (!authed) return <DemoLogin onEnter={login} />;
  return <DeskApp />;
}

function DemoLogin({ onEnter }: { onEnter: () => void }) {
  return (
    <main className="mx-auto max-w-md px-4 py-12">
      <span className="inline-block rounded-full border-2 border-ink bg-yellow px-3 py-1 text-xs font-bold uppercase">
        Demo editor — non è un login reale
      </span>
      <h1 className="mt-4 font-display text-4xl">Desk protetto (demo)</h1>
      <p className="mt-3 text-muted">
        In produzione serviranno sessione sicura, ruoli editor/admin e autorizzazioni server-side. Qui entri in modalità esplicita{" "}
        <strong>demo editor</strong>: nessuna password vera, nessun dato personale.
      </p>
      <Button variant="primary" className="mt-6 w-full" onClick={onEnter}>
        <Shield className="size-4" />
        {APP_CONFIG.demoEditorHint}
      </Button>
      <p className="mt-4 text-sm">
        <Link to="/" className="font-bold underline">
          Torna al sito pubblico
        </Link>
      </p>
    </main>
  );
}

function DeskApp() {
  const [tab, setTab] = useState<(typeof TABS)[number]["id"]>("pipeline");
  const store = useDeskStore();
  const counts = {
    pub: store.offers.filter((o) => o.status === "PUBBLICATO").length,
    review: store.offers.filter((o) => o.status === "REVIEW" || o.status === "DA_VERIFICARE").length,
    cand: store.offers.filter((o) => o.status === "CANDIDATO").length,
    raw: store.raw.length,
  };

  return (
    <main className="mx-auto w-[min(1100px,calc(100%-1.5rem))] pb-24 pt-6 md:pb-10">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="text-xs font-bold uppercase tracking-wide text-muted">Back-office · ruolo {store.demoRole}</p>
        <span className="rounded-full border-2 border-ink bg-yellow px-3 py-1 text-xs font-bold">DEMO EDITOR</span>
      </div>
      <h1 className="mt-2 font-display text-3xl md:text-4xl">Desk — revisione umana</h1>
      <p className="mt-2 max-w-2xl text-muted">I bot non pubblicano. Tu verifichi la checklist, poi Publisher.</p>

      <div className="mt-5 grid grid-cols-2 gap-3 md:grid-cols-4">
        <Stat label="Pubblicate" value={counts.pub} />
        <Stat label="Da rivedere" value={counts.review} />
        <Stat label="Candidati" value={counts.cand} />
        <Stat label="Grezzi" value={counts.raw} />
      </div>

      <div className="mt-5 hidden flex-wrap gap-2 md:flex">
        {TABS.map((t) => (
          <button
            key={t.id}
            type="button"
            className={`inline-flex min-h-11 items-center gap-2 rounded-full border-2 border-ink px-4 text-xs font-bold uppercase ${tab === t.id ? "bg-ink text-surface" : "bg-surface"}`}
            onClick={() => setTab(t.id)}
          >
            <t.icon className="size-4" />
            {t.label}
          </button>
        ))}
      </div>

      <div className="mt-6">
        {tab === "pipeline" ? <Pipeline /> : null}
        {tab === "foglio" ? <SheetPanel /> : null}
        {tab === "master" ? <Master /> : null}
        {tab === "raw" ? <Raw /> : null}
        {tab === "rules" ? <RulesView /> : null}
        {tab === "alerts" ? <Alerts /> : null}
        {tab === "perf" ? <Performance /> : null}
      </div>

      <nav className="fixed inset-x-0 bottom-0 z-30 flex overflow-x-auto border-t-3 border-ink bg-surface md:hidden" aria-label="Sezioni desk">
        {TABS.map((t) => (
          <button
            key={t.id}
            type="button"
            className={`flex min-h-14 min-w-16 flex-1 flex-col items-center justify-center gap-0.5 text-2xs font-bold uppercase ${tab === t.id ? "bg-yellow" : ""}`}
            onClick={() => setTab(t.id)}
          >
            <t.icon className="size-5" />
            {t.label}
          </button>
        ))}
      </nav>
    </main>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-xl border-3 border-ink bg-surface p-4">
      <p className="text-xs font-bold uppercase text-muted">{label}</p>
      <p className="font-display text-3xl">{value}</p>
    </div>
  );
}

function Pipeline() {
  const running = useDeskStore((s) => s.running);
  const logs = useDeskStore((s) => s.logs);
  const [openLog, setOpenLog] = useState(false);
  const [confirmPipe, setConfirmPipe] = useState(false);
  const [confirmPub, setConfirmPub] = useState(false);
  const [confirmReset, setConfirmReset] = useState(false);
  const pipeline = useDeskStore((s) => s.pipeline);
  const publishReady = useDeskStore((s) => s.publishReady);
  const reset = useDeskStore((s) => s.reset);
  const logout = useDeskStore((s) => s.logoutDemo);
  const adapter = adapterStatus();
  const busy = running !== "idle";
  const order = STEPS.map((s) => s.id);
  const currentIdx = busy ? order.indexOf(running) : -1;

  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <div className="rounded-xl border-3 border-ink bg-surface p-5">
        <h2 className="font-display text-2xl">Agent (mock feed)</h2>
        <p className="mt-1 text-sm text-muted">
          Adapter: {adapter.label}. {adapter.note}
        </p>
        <ol className="mt-4 space-y-2">
          {STEPS.map((s, i) => {
            const done = busy && currentIdx > i;
            const active = running === s.id;
            return (
              <li
                key={s.id}
                className={`flex min-h-11 items-center gap-3 rounded-md border-2 border-ink px-3 text-sm font-bold ${active ? "bg-yellow" : done ? "bg-lime" : "bg-wash"}`}
              >
                {done ? <CheckCircle2 className="size-4" /> : active ? <Play className="size-4" /> : <Circle className="size-4" />}
                <span>
                  {i + 1}. {s.label}
                </span>
                {active ? <span className="ml-auto text-xs uppercase">in corso</span> : null}
                {done ? <span className="ml-auto text-xs uppercase">ok</span> : null}
              </li>
            );
          })}
          <li className="flex min-h-11 items-center gap-3 rounded-md border-2 border-dashed border-ink px-3 text-sm font-bold">
            <Shield className="size-4" />
            7. Human approval
            <span className="ml-auto text-xs uppercase">manuale</span>
          </li>
          <li className="flex min-h-11 items-center gap-3 rounded-md border-2 border-dashed border-ink px-3 text-sm font-bold">
            <Check className="size-4" />
            8. Publisher
            <span className="ml-auto text-xs uppercase">manuale</span>
          </li>
        </ol>
        <p className="mt-3 text-xs text-muted">I bot si fermano al briefing. Nessuna pubblicazione automatica.</p>
        <div className="mt-4 flex flex-col gap-2">
          <Button variant="primary" disabled={busy} onClick={() => setConfirmPipe(true)}>
            <Play className="size-4" /> Lancia pipeline
          </Button>
          <Button variant="yellow" disabled={busy} onClick={() => setConfirmPub(true)}>
            Publisher
          </Button>
          <Button onClick={() => setConfirmReset(true)}>
            <RotateCcw className="size-4" /> Reset dati demo
          </Button>
          <Button onClick={logout}>Esci dal desk</Button>
        </div>
      </div>
      <div className="rounded-xl border-3 border-ink bg-ink p-5 text-surface">
        <button type="button" className="flex min-h-11 w-full items-center justify-between font-display text-xl" onClick={() => setOpenLog((v) => !v)}>
          Log bot <span className="text-sm font-sans">{openLog ? "chiudi" : "apri"}</span>
        </button>
        {openLog ? (
          <div className="mt-3 max-h-72 space-y-3 overflow-auto text-sm">
            {logs.length === 0 ? <p>Nessuna corsa.</p> : null}
            {logs.map((l) => (
              <div key={l.id} className="border-b border-white/10 pb-2">
                <p className="font-bold">
                  {l.bot} · {l.action}
                </p>
                <p className="text-xs opacity-80">{l.message}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="mt-2 text-sm opacity-80">Chiuso per default sul telefono.</p>
        )}
        <h3 className="mt-6 font-display text-lg">Contratto agent</h3>
        <ul className="mt-2 space-y-2 text-xs opacity-90">
          {AGENT_SPECS.map((a) => (
            <li key={a.id}>
              <strong>{a.name}</strong> — {a.output}. {a.publishes ? "Può pubblicare solo con gate." : "Non pubblica."}
            </li>
          ))}
        </ul>
      </div>

      <Sheet open={confirmPipe} onOpenChange={setConfirmPipe} title="Lanciare la pipeline?" description="Scout userà candidati mock. Non pubblica nulla da sola.">
        <div className="flex gap-2">
          <Button
            variant="primary"
            onClick={() => {
              setConfirmPipe(false);
              void pipeline();
            }}
          >
            Conferma
          </Button>
          <Button onClick={() => setConfirmPipe(false)}>Annulla</Button>
        </div>
      </Sheet>
      <Sheet
        open={confirmPub}
        onOpenChange={setConfirmPub}
        title="Lanciare il Publisher?"
        description="Pubblica solo le APPROVATO che passano checklist bloccante, Confidence e URL affiliato reale."
      >
        <div className="flex gap-2">
          <Button
            variant="primary"
            onClick={() => {
              setConfirmPub(false);
              publishReady();
            }}
          >
            Pubblica
          </Button>
          <Button onClick={() => setConfirmPub(false)}>Annulla</Button>
        </div>
      </Sheet>
      <Sheet open={confirmReset} onOpenChange={setConfirmReset} title="Reset dati demo?" description="Perdi modifiche locali (checklist, pipeline, regole).">
        <div className="flex gap-2">
          <Button
            variant="primary"
            onClick={() => {
              setConfirmReset(false);
              reset();
            }}
          >
            Conferma reset
          </Button>
          <Button onClick={() => setConfirmReset(false)}>Annulla</Button>
        </div>
      </Sheet>
    </div>
  );
}

function Master() {
  const offers = useDeskStore((s) => s.offers);
  const [status, setStatus] = useState<string>("TUTTI");
  const [openId, setOpenId] = useState<string | null>(null);
  const list = offers.filter((o) => (status === "TUTTI" ? true : o.status === status));
  return (
    <div>
      <div className="chip-scroll mb-4">
        {(["TUTTI", "REVIEW", "DA_VERIFICARE", "CANDIDATO", "APPROVATO", "PUBBLICATO", "SCADUTO", "SCARTATO", "ARCHIVIATO"] as const).map((s) => (
          <button
            key={s}
            type="button"
            className={`min-h-11 shrink-0 rounded-full border-2 border-ink px-4 text-xs font-bold ${status === s ? "bg-ink text-surface" : "bg-surface"}`}
            onClick={() => setStatus(s)}
          >
            {s}
          </button>
        ))}
      </div>
      {list.length === 0 ? <p className="text-muted">Nessuna offerta in questo stato.</p> : null}
      <div className="grid grid-cols-1 gap-3">
        {list.map((o) => (
          <ReviewCard key={o.id} offer={o} onOpen={() => setOpenId(o.id)} />
        ))}
      </div>
      {openId ? <ReviewSheet offerId={openId} onClose={() => setOpenId(null)} /> : null}
    </div>
  );
}

function ReviewCard({ offer, onOpen }: { offer: Offer; onOpen: () => void }) {
  const approve = useDeskStore((s) => s.approve);
  const reject = useDeskStore((s) => s.reject);
  const archive = useDeskStore((s) => s.archive);
  const [ask, setAsk] = useState(false);
  const { done, total } = checklistProgress(offer.checklist);
  const Icon = STATUS_ICON[offer.status] ?? Circle;
  return (
    <article className="flex gap-3 rounded-xl border-3 border-ink bg-surface p-3">
      <img src={offer.imageUrl} alt="" className="size-20 shrink-0 rounded-md object-cover" />
      <div className="min-w-0 flex-1">
        <p className="flex items-center gap-1 text-xs font-bold uppercase text-muted">
          <Icon className="size-3.5" aria-hidden />
          {offer.category} · {offer.status}
        </p>
        <h3 className="font-display text-lg leading-tight">{offer.title}</h3>
        <p className="truncate text-sm text-muted">
          {offer.origin !== "—" ? `${offer.origin} → ` : ""}
          {offer.destination}
        </p>
        <p className="mt-1 font-display text-xl text-pink">{eur(offer.price)}</p>
        <p className="text-xs">
          HS {offer.hackScore} · Conf {offer.confidence} · checklist {done}/{total}
        </p>
        <p className="text-xs text-muted">
          Fonte {offer.sourceName} · ver. {offer.verifiedAt || "—"}
        </p>
        <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-5">
          <Button className="min-h-11 px-2 text-xs" onClick={onOpen}>
            Verifica
          </Button>
          <Button variant="yellow" className="min-h-11 px-2 text-xs" onClick={() => approve(offer.id)}>
            <Check className="size-4" /> Approva
          </Button>
          <Button className="min-h-11 px-2 text-xs" onClick={() => setAsk(true)}>
            <Trash2 className="size-4" /> Scarta
          </Button>
          <Button className="min-h-11 px-2 text-xs" onClick={() => archive(offer.id)}>
            Archivia
          </Button>
        </div>
      </div>
      <Sheet open={ask} onOpenChange={setAsk} title="Scartare questa offerta?" description="Lo stato diventa SCARTATO e resta la motivazione interna.">
        <div className="flex gap-2">
          <Button
            variant="primary"
            onClick={() => {
              reject(offer.id, "Scartata da desk");
              setAsk(false);
            }}
          >
            Conferma
          </Button>
          <Button onClick={() => setAsk(false)}>Annulla</Button>
        </div>
      </Sheet>
    </article>
  );
}

function CheckGroup({
  title,
  kind,
  offer,
  keys,
  toggle,
}: {
  title: string;
  kind: string;
  offer: Offer;
  keys: (keyof ReviewChecklist)[];
  toggle: (id: string, key: keyof ReviewChecklist) => void;
}) {
  return (
    <div className="mt-4">
      <p className="text-xs font-bold uppercase text-muted">
        {title} · {kind}
      </p>
      <ul className="mt-2 space-y-2">
        {keys.map((k) => (
          <li key={k}>
            <label className="flex min-h-11 items-center gap-3">
              <input type="checkbox" className="size-5" checked={offer.checklist[k]} onChange={() => toggle(offer.id, k)} />
              <span>{CHECKLIST_LABELS[k]}</span>
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
}

function ReviewSheet({ offerId, onClose }: { offerId: string; onClose: () => void }) {
  const offer = useDeskStore((s) => s.offers.find((o) => o.id === offerId));
  const toggle = useDeskStore((s) => s.toggleCheck);
  const approve = useDeskStore((s) => s.approve);
  const rules = useDeskStore((s) => s.rules);
  if (!offer) return null;
  const { done, total } = checklistProgress(offer.checklist);
  const missingBlock = missingChecks(offer.checklist, "blocking");
  const gate = canApprove(offer, rules.minConfidence);
  return (
    <Sheet open onOpenChange={(v) => !v && onClose()} title={offer.title} description={`Checklist ${done}/{total} · Confidence ${offer.confidence}`}>
      {!gate.ok ? (
        <p className="mb-3 flex items-start gap-2 text-sm font-semibold">
          <AlertTriangle className="mt-0.5 size-4 shrink-0" /> {gate.reason}
        </p>
      ) : (
        <p className="mb-3 text-sm font-semibold">Pronta per APPROVATO. Publisher resta un passo a parte.</p>
      )}
      <dl className="grid grid-cols-2 gap-2 text-xs">
        <div>
          <dt className="font-bold uppercase text-muted">Fonte</dt>
          <dd>{offer.sourceName}</dd>
        </div>
        <div>
          <dt className="font-bold uppercase text-muted">Prezzo</dt>
          <dd>{eur(offer.price)}</dd>
        </div>
        <div>
          <dt className="font-bold uppercase text-muted">Ultima verifica</dt>
          <dd>{formatItDate(offer.verifiedAt)}</dd>
        </div>
        <div>
          <dt className="font-bold uppercase text-muted">Scadenza</dt>
          <dd>{offer.expiresAt || "—"}</dd>
        </div>
        <div>
          <dt className="font-bold uppercase text-muted">Hack Score</dt>
          <dd>{offer.hackScore}</dd>
        </div>
        <div>
          <dt className="font-bold uppercase text-muted">Stato</dt>
          <dd>{offer.status}</dd>
        </div>
      </dl>
      <p className="mt-3 break-all text-xs text-muted">
        Affiliate URL: {offer.affiliateUrl} {isPlaceholderAffiliate(offer.affiliateUrl) ? "· Da collegare" : ""}
      </p>
      <CheckGroup title="Bloccanti" kind="senza questi non si approva" offer={offer} keys={BLOCKING_KEYS} toggle={toggle} />
      <CheckGroup title="Qualitativi" kind="copy, immagine, alt, editorial" offer={offer} keys={QUALITY_KEYS} toggle={toggle} />
      {missingBlock.length ? <p className="mt-3 text-sm text-muted">Manca (bloccante): {missingBlock.join(", ")}</p> : null}
      <Button
        variant="primary"
        className="mt-4 w-full"
        onClick={() => {
          const r = approve(offer.id);
          if (r.ok) onClose();
        }}
      >
        Approva
      </Button>
    </Sheet>
  );
}

function Raw() {
  const raw = useDeskStore((s) => s.raw);
  return (
    <div className="rounded-xl border-3 border-ink bg-surface p-5">
      <h2 className="font-display text-2xl">Candidati grezzi</h2>
      <p className="text-sm text-muted">RAW non va mai sul sito.</p>
      {raw.length === 0 ? <p className="mt-4">Vuoto. Lancia Scout dalla pipeline.</p> : null}
      <ul className="mt-4 space-y-2">
        {raw.map((r) => (
          <li key={r.id} className="border-b border-wash py-2 text-sm">
            <b>{r.rawTitle}</b> · {eur(r.price)} · {r.parseStatus}
          </li>
        ))}
      </ul>
    </div>
  );
}

function RulesView() {
  const rules = useDeskStore((s) => s.rules);
  const setRules = useDeskStore((s) => s.setRules);
  const cats: Category[] = ["VOLI", "HOTEL", "PACCHETTI", "VENEZIA"];
  function num(value: number, write: (v: number) => RuleSet, label: string) {
    return (
      <label className="flex min-h-11 items-center justify-between gap-3 border-b border-wash py-2">
        <span>{label}</span>
        <input
          type="number"
          className="min-h-11 w-24 rounded-md border-3 border-ink px-2"
          value={value}
          onChange={(e) => setRules(write(Number(e.target.value)))}
        />
      </label>
    );
  }
  return (
    <div className="rounded-xl border-3 border-ink bg-surface p-5">
      <h2 className="font-display text-2xl">Regole configurabili</h2>
      <p className="text-sm text-muted">Niente soglie sparse nel codice. Adapter: {APP_CONFIG.adapter}.</p>
      <div className="mt-4 space-y-1 text-sm">
        {cats.map((c) =>
          num(rules.minHackScore[c], (v) => ({ ...rules, minHackScore: { ...rules.minHackScore, [c]: v } }), `Min Hack Score ${c}`),
        )}
        {cats.map((c) =>
          num(rules.minDiscountPct[c], (v) => ({ ...rules, minDiscountPct: { ...rules.minDiscountPct, [c]: v } }), `Sconto min ${c} %`),
        )}
        {num(rules.maxLayoversHours, (v) => ({ ...rules, maxLayoversHours: v }), "Max ore scali / durata")}
        {num(rules.minLocationHotel, (v) => ({ ...rules, minLocationHotel: v }), "Min location hotel")}
        {num(rules.minConfidence, (v) => ({ ...rules, minConfidence: v }), "Min Confidence")}
        {num(rules.maxHoursSinceVerify, (v) => ({ ...rules, maxHoursSinceVerify: v }), "Max ore da verifica")}
        {num(rules.maxPublishDays, (v) => ({ ...rules, maxPublishDays: v }), "Durata max pubblicazione (giorni)")}
      </div>
      <h3 className="mt-6 font-display text-lg">Contratto API (da collegare)</h3>
      <ul className="mt-2 list-disc pl-5 text-sm text-muted">
        {API_CONTRACT.map((x) => (
          <li key={x}>{x}</li>
        ))}
      </ul>
    </div>
  );
}

function Alerts() {
  const alerts = useDeskStore((s) => s.alerts);
  const audit = useDeskStore((s) => s.audit);
  const [openAudit, setOpenAudit] = useState(false);
  return (
    <div className="space-y-4">
      <div className="rounded-xl border-3 border-ink bg-yellow p-5">
        <h2 className="font-display text-2xl">Alert</h2>
        <p className="text-sm text-muted">Adapter Telegram/email mock finché non ci sono credenziali server-side.</p>
        {alerts.length === 0 ? <p className="mt-4">Nessun alert. Lancia la pipeline.</p> : null}
        <ul className="mt-4 space-y-3">
          {alerts.map((a) => (
            <li key={a.id} className="rounded-md border-3 border-ink bg-surface p-4">
              <p className="text-xs font-bold uppercase">{a.kind}</p>
              <p className="font-bold">{a.title}</p>
              <pre className="mt-2 font-sans text-sm whitespace-pre-wrap text-muted">{a.body}</pre>
            </li>
          ))}
        </ul>
      </div>
      <div className="rounded-xl border-3 border-ink bg-surface p-5">
        <button type="button" className="flex min-h-11 w-full items-center justify-between font-display text-xl" onClick={() => setOpenAudit((v) => !v)}>
          Audit log — chi ha approvato cosa <span className="text-sm font-sans">{openAudit ? "chiudi" : "apri"}</span>
        </button>
        {openAudit ? (
          <ul className="mt-3 max-h-80 space-y-2 overflow-auto text-sm">
            {audit.length === 0 ? <li className="text-muted">Vuoto. Cambia uno stato o una checklist.</li> : null}
            {audit.map((e) => (
              <li key={e.id} className="border-b border-wash py-2">
                <span className="font-mono text-xs text-muted">{e.at.replace("T", " ").slice(0, 16)}</span>
                <br />
                <span className="font-bold">{e.actor}</span> · {e.offerId} · {e.field} {e.from} → {e.to}
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-2 text-sm text-muted">Apri per vedere attore, timestamp, offerta. Seed: pubblicazioni firmate da Filippo. I bot non compaiono come publisher.</p>
        )}
      </div>
    </div>
  );
}

function Performance() {
  const offers = useDeskStore((s) => s.offers);
  const logs = useDeskStore((s) => s.logs);
  const pub = offers.filter((o) => o.status === "PUBBLICATO").length;
  const funnel = [
    { k: "Visite", v: "—" },
    { k: "Utenti", v: "—" },
    { k: "Deal view", v: "—" },
    { k: "Affiliate click", v: "—" },
    { k: "CTR", v: "—" },
    { k: "Conversion rate", v: "—" },
    { k: "Revenue", v: "—" },
    { k: "Revenue / visitor", v: "—" },
    { k: "Iscritti newsletter", v: "—" },
  ];
  return (
    <div className="space-y-4">
      <div className="rounded-xl border-3 border-ink bg-yellow p-5">
        <p className="text-xs font-bold uppercase">Mock metrics</p>
        <h2 className="mt-1 font-display text-2xl">Performance</h2>
        <p className="mt-2 text-sm text-muted">
          {ANALYTICS_NOTE} Qui non inventiamo traffico. I trattini sono il funnel di produzione. I numeri sotto sono conteggi del catalogo demo, non KPI di business.
        </p>
      </div>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
        {funnel.map((m) => (
          <div key={m.k} className="rounded-xl border-3 border-ink bg-surface p-4">
            <p className="text-xs font-bold uppercase text-muted">{m.k}</p>
            <p className="font-display text-3xl">{m.v}</p>
            <p className="text-2xs uppercase text-muted">Da collegare</p>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
        <div className="rounded-xl border-3 border-ink bg-surface p-4">
          <p className="text-xs font-bold uppercase text-muted">Pubblicate (demo)</p>
          <p className="font-display text-3xl">{pub}</p>
        </div>
        <div className="rounded-xl border-3 border-ink bg-surface p-4">
          <p className="text-xs font-bold uppercase text-muted">Corse pipeline (sessione)</p>
          <p className="font-display text-3xl">{logs.filter((l) => l.bot.includes("scout") || l.action === "pubblica").length}</p>
        </div>
        <div className="rounded-xl border-3 border-ink bg-surface p-4">
          <p className="text-xs font-bold uppercase text-muted">Top deal (demo)</p>
          <p className="font-display text-xl">
            {offers
              .filter((o) => o.status === "PUBBLICATO")
              .slice()
              .sort((a, b) => b.hackScore - a.hackScore)[0]?.title ?? "—"}
          </p>
        </div>
      </div>
    </div>
  );
}
