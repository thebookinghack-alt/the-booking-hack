import { Heart, SlidersHorizontal } from "lucide-react";
import { useMemo, useState } from "react";
import { CoverImage } from "@/components/site/CoverImage";
import { DiscoveryBar } from "@/components/site/DiscoveryBar";
import { FreshnessBadge } from "@/components/site/FreshnessBadge";
import { OfferLink } from "@/components/site/OfferLink";
import { ScoreHint } from "@/components/site/ScoreHint";
import { Button } from "@/components/ui/button";
import { Sheet } from "@/components/ui/sheet";
import { track } from "@/lib/offers/analytics";
import { PRICE_KIND_LABEL, type Offer, type SortKey } from "@/lib/offers/types";
import { applyDiscovery, publishedOffers, sortOffers, useDeskStore } from "@/lib/offers/store";
import { eur } from "@/lib/utils";

const badgeClass: Record<string, string> = {
  "ERROR FARE": "bg-pink text-ink",
  "FLASH DEAL": "bg-yellow text-ink",
  "WEEKEND HACK": "bg-lime text-ink",
  "VENEZIA PICK": "bg-venice text-surface",
  "CITY BREAK": "bg-cyan text-ink",
  "HIDDEN GEM": "bg-lime text-ink",
  "HOTEL DROP": "bg-cyan text-ink",
  "SMART ROUTE": "bg-cyan text-ink",
};

const CHIPS = ["TUTTE", "VOLI", "HOTEL", "PACCHETTI", "VENEZIA"] as const;
const SORTS: { id: SortKey; label: string }[] = [
  { id: "recent", label: "Più recenti" },
  { id: "score", label: "Hack Score" },
  { id: "price", label: "Prezzo più basso" },
  { id: "expiry", label: "In scadenza" },
];

function factLine(offer: Offer) {
  const bits = [offer.durationLabel, offer.datesLabel].filter(Boolean);
  return bits.join(" · ");
}

export function OfferCard({ offer }: { offer: Offer }) {
  const fav = useDeskStore((s) => s.favorites.includes(offer.id));
  const toggle = useDeskStore((s) => s.toggleFavorite);
  const warning = offer.warnings[0];
  const route = offer.origin !== "—" ? `${offer.origin} → ${offer.destination.split(",")[0]}` : offer.destination;
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-xl border-3 border-ink bg-surface shadow-card">
      <OfferLink
        offer={offer}
        className="relative block aspect-video overflow-hidden border-b-3 border-ink bg-wash"
        onClick={() => {
          track("deal_view", { id: offer.id });
          track("offer_open", { id: offer.id });
        }}
      >
        <span className={`absolute top-3 left-0 z-10 border-3 border-ink px-3 py-1 text-xs font-bold uppercase ${badgeClass[offer.badge] ?? "bg-yellow text-ink"}`}>
          {offer.badge}
        </span>
        <CoverImage src={offer.imageUrl} alt={offer.imageAlt} width={800} height={450} className="size-full" sizes="(max-width: 640px) 100vw, 33vw" showStock={false} />
      </OfferLink>
      <div className="flex flex-1 flex-col gap-1 p-4">
        <div className="flex items-start justify-between gap-2">
          <p className="text-xs font-bold uppercase tracking-wide text-muted">{offer.category}</p>
          <FreshnessBadge offer={offer} />
        </div>
        <h3 className="font-display text-xl leading-tight">
          <OfferLink offer={offer}>{route}</OfferLink>
        </h3>
        {factLine(offer) ? <p className="text-xs text-muted">{factLine(offer)}</p> : null}
        <div className="mt-1">
          <ScoreHint
            score={offer.hackScore}
            confidence={offer.confidence}
            breakdown={{ price: offer.priceScore, location: offer.locationScore, value: offer.valueScore }}
          />
        </div>
        {warning ? <p className="text-xs font-semibold text-pink">{warning}</p> : null}
        <div className="mt-auto flex items-end justify-between border-t-2 border-dashed border-wash pt-3">
          <div>
            {offer.oldPrice && offer.oldPrice > offer.price ? (
              <p className="text-xs text-muted line-through">{eur(offer.oldPrice)}</p>
            ) : null}
            <p className="font-display text-2xl text-pink">{eur(offer.price)}</p>
            <p className="text-2xs uppercase text-muted">{PRICE_KIND_LABEL[offer.priceKind]}</p>
          </div>
          <div className="flex items-center gap-1">
            <button
              type="button"
              className="inline-flex size-11 items-center justify-center"
              aria-label={fav ? "Rimuovi dai preferiti" : "Salva"}
              onClick={() => toggle(offer.id)}
            >
              <Heart className={`size-5 ${fav ? "fill-pink text-pink" : "text-ink"}`} />
            </button>
            <OfferLink offer={offer} className="font-display text-sm font-bold underline underline-offset-4">
              Scopri l'hack
            </OfferLink>
          </div>
        </div>
      </div>
    </article>
  );
}

export function EmptyDeals({ query }: { query?: string }) {
  return (
    <div className="rounded-xl border-3 border-ink bg-surface p-6">
      <h3 className="font-display text-2xl">{query ? "Nessun risultato per questa ricerca" : "Nessun deal per questi filtri"}</h3>
      <p className="mt-2 text-sm text-muted">
        Non forziamo i numeri: se oggi è vuoto, è vuoto. Prova un altro filtro, o torna alla selezione completa.
      </p>
    </div>
  );
}

export function PublicGrid({ category }: { category?: Offer["category"] }) {
  const all = useDeskStore((s) => s.offers);
  const filter = useDeskStore((s) => s.filter);
  const sort = useDeskStore((s) => s.sort);
  const query = useDeskStore((s) => s.query) ?? "";
  const intent = useDeskStore((s) => s.intent);
  const originHub = useDeskStore((s) => s.originHub);
  const list = useMemo(() => {
    let pub = publishedOffers(all);
    if (category) pub = pub.filter((o) => o.category === category);
    else if (filter !== "TUTTE") pub = pub.filter((o) => o.category === filter);
    pub = applyDiscovery(pub, intent, originHub);
    const q = query.trim().toLowerCase();
    if (q) {
      pub = pub.filter((o) => `${o.title} ${o.destination} ${o.origin} ${o.badge}`.toLowerCase().includes(q));
    }
    return sortOffers(pub, sort);
  }, [all, category, filter, sort, query, intent, originHub]);
  if (!list.length) return <EmptyDeals query={query} />;
  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
      {list.map((o) => (
        <OfferCard key={o.id} offer={o} />
      ))}
    </div>
  );
}

export function FilterBar({ hideSort, showDiscovery, hideCategory }: { hideSort?: boolean; showDiscovery?: boolean; hideCategory?: boolean }) {
  const filter = useDeskStore((s) => s.filter);
  const setFilter = useDeskStore((s) => s.setFilter);
  const sort = useDeskStore((s) => s.sort);
  const setSort = useDeskStore((s) => s.setSort);
  const query = useDeskStore((s) => s.query) ?? "";
  const setQuery = useDeskStore((s) => s.setQuery);
  const [sheet, setSheet] = useState(false);
  return (
    <div className="mb-5">
      {showDiscovery ? (
        <div className="mb-4">
          <DiscoveryBar />
        </div>
      ) : null}
      <label className="mb-3 block">
        <span className="sr-only">Cerca destinazione</span>
        <input
          type="search"
          className="min-h-11 w-full rounded-md border-3 border-ink bg-surface px-3"
          placeholder="Cerca città o tratta…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </label>
      <button type="button" className="mb-3 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-md border-3 border-ink bg-surface font-display text-sm font-bold md:hidden" onClick={() => setSheet(true)}>
        <SlidersHorizontal className="size-4" /> Filtri e ordine
      </button>
      {hideCategory ? null : (
        <>
          <p className="mb-2 text-xs font-bold uppercase text-muted md:hidden">Scorri i filtri →</p>
          <div className="chip-scroll" role="tablist" aria-label="Filtri categoria">
            {CHIPS.map((c) => (
              <button
                key={c}
                type="button"
                className={`min-h-11 shrink-0 rounded-full border-2 border-ink px-4 text-xs font-bold uppercase ${filter === c ? "bg-ink text-surface" : "bg-surface"}`}
                aria-pressed={filter === c}
                onClick={() => setFilter(c)}
              >
                {c}
              </button>
            ))}
          </div>
        </>
      )}
      {hideSort ? null : (
        <label className="mt-3 hidden items-center gap-2 text-sm md:flex">
          <span className="font-semibold">Ordina</span>
          <select className="min-h-11 flex-1 rounded-md border-3 border-ink bg-surface px-3" value={sort} onChange={(e) => setSort(e.target.value as SortKey)}>
            {SORTS.map((s) => (
              <option key={s.id} value={s.id}>
                {s.label}
              </option>
            ))}
          </select>
        </label>
      )}
      <Sheet open={sheet} onOpenChange={setSheet} title="Filtri e ordine">
        {hideCategory ? null : (
          <>
            <p className="text-sm text-muted">Categoria</p>
            <div className="mt-2 grid grid-cols-2 gap-2">
              {CHIPS.map((c) => (
                <button
                  key={c}
                  type="button"
                  className={`min-h-11 rounded-md border-2 border-ink text-xs font-bold ${filter === c ? "bg-ink text-surface" : "bg-surface"}`}
                  onClick={() => setFilter(c)}
                >
                  {c}
                </button>
              ))}
            </div>
          </>
        )}
        <p className="mt-4 text-sm text-muted">Ordine</p>
        <div className="mt-2 grid gap-2">
          {SORTS.map((s) => (
            <button
              key={s.id}
              type="button"
              className={`min-h-11 rounded-md border-2 border-ink text-sm font-bold ${sort === s.id ? "bg-ink text-surface" : "bg-surface"}`}
              onClick={() => {
                setSort(s.id);
                setSheet(false);
              }}
            >
              {s.label}
            </button>
          ))}
        </div>
      </Sheet>
    </div>
  );
}
