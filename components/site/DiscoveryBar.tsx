import { INTENT_LABEL, ORIGIN_LABEL, type DiscoveryIntent, type OriginHub } from "@/lib/offers/types";
import { useDeskStore } from "@/lib/offers/store";

const INTENTS: (DiscoveryIntent | "tutti")[] = ["tutti", "weekend", "mare", "lungo_raggio", "hotel", "error_fare", "venezia"];
const ORIGINS: OriginHub[] = ["qualsiasi", "venezia", "milano", "bologna"];

export function DiscoveryBar({ compact }: { compact?: boolean }) {
  const intent = useDeskStore((s) => s.intent);
  const setIntent = useDeskStore((s) => s.setIntent);
  const originHub = useDeskStore((s) => s.originHub);
  const setOriginHub = useDeskStore((s) => s.setOriginHub);

  return (
    <div className="space-y-3">
      <div>
        <p className="mb-2 text-xs font-bold uppercase text-muted">{compact ? "Cosa cerchi" : "Cosa stai cercando?"}</p>
        <div className="chip-scroll" role="list">
          {INTENTS.map((id) => (
            <button
              key={id}
              type="button"
              className={`min-h-11 shrink-0 rounded-full border-2 border-ink px-4 text-xs font-bold uppercase ${intent === id ? "bg-ink text-surface" : "bg-surface"}`}
              aria-pressed={intent === id}
              onClick={() => setIntent(id)}
            >
              {INTENT_LABEL[id]}
            </button>
          ))}
        </div>
      </div>
      <div>
        <p className="mb-2 text-xs font-bold uppercase text-muted">Da dove vuoi partire?</p>
        <div className="chip-scroll" role="list">
          {ORIGINS.map((id) => (
            <button
              key={id}
              type="button"
              className={`min-h-11 shrink-0 rounded-full border-2 border-ink px-4 text-xs font-bold uppercase ${originHub === id ? "bg-ink text-surface" : "bg-surface"}`}
              aria-pressed={originHub === id}
              onClick={() => setOriginHub(id)}
            >
              {ORIGIN_LABEL[id]}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
