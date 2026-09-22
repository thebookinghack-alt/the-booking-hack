import * as Popover from "@radix-ui/react-popover";
import { Info } from "lucide-react";
import { CONFIDENCE_DISCLAIMER, confidenceCaption } from "@/lib/offers/freshness";

export function ScoreHint({
  score,
  confidence,
  breakdown,
}: {
  score: number;
  confidence?: number;
  breakdown?: { price: number; location: number; value: number };
}) {
  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        <button
          type="button"
          className="inline-flex min-h-11 items-center gap-1 text-left text-xs font-bold"
          aria-label="Come calcoliamo Hack Score e Confidence"
        >
          Hack Score {score}
          {confidence != null ? ` · Conf ${confidence}` : ""}
          <Info className="size-4" aria-hidden />
        </button>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content
          sideOffset={8}
          className="z-50 w-80 rounded-md border-3 border-ink bg-surface p-4 text-sm shadow-offset"
        >
          <p className="font-display text-base">Valutazione editoriale interna</p>
          <p className="mt-1 text-muted">
            Hack Score {score}/10 — 40% prezzo, 30% location, 30% valore. Non è una recensione, non è un voto utenti, non è una garanzia.
          </p>
          {breakdown ? (
            <ul className="mt-3 grid grid-cols-3 gap-2 text-center">
              <li className="rounded-md border-2 border-ink bg-cream p-2">
                <p className="text-2xs font-bold uppercase text-muted">Prezzo</p>
                <p className="font-display text-lg">{breakdown.price}/10</p>
              </li>
              <li className="rounded-md border-2 border-ink bg-cream p-2">
                <p className="text-2xs font-bold uppercase text-muted">Posizione</p>
                <p className="font-display text-lg">{breakdown.location}/10</p>
              </li>
              <li className="rounded-md border-2 border-ink bg-cream p-2">
                <p className="text-2xs font-bold uppercase text-muted">Valore</p>
                <p className="font-display text-lg">{breakdown.value}/10</p>
              </li>
            </ul>
          ) : null}
          {confidence != null ? (
            <p className="mt-3 text-muted">
              Confidence {confidence}/100 — {confidenceCaption(confidence)} {CONFIDENCE_DISCLAIMER}
            </p>
          ) : (
            <p className="mt-3 text-muted">{CONFIDENCE_DISCLAIMER}</p>
          )}
          <Popover.Close className="mt-3 inline-flex min-h-11 items-center font-bold underline">
            Ho capito
          </Popover.Close>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}

export function HackScoreMeter({
  score,
  price,
  location,
  value,
}: {
  score: number;
  price: number;
  location: number;
  value: number;
}) {
  return (
    <div className="rounded-xl border-3 border-ink bg-cream p-4">
      <p className="font-display text-2xl">Hack Score {score}</p>
      <p className="text-xs text-muted">Punteggio editoriale · 40% prezzo · 30% posizione · 30% valore</p>
      <dl className="mt-3 grid grid-cols-3 gap-2 text-center">
        <div className="rounded-md border-2 border-ink bg-surface p-2">
          <dt className="text-2xs font-bold uppercase text-muted">Prezzo</dt>
          <dd className="font-display text-xl">{price}/10</dd>
        </div>
        <div className="rounded-md border-2 border-ink bg-surface p-2">
          <dt className="text-2xs font-bold uppercase text-muted">Posizione</dt>
          <dd className="font-display text-xl">{location}/10</dd>
        </div>
        <div className="rounded-md border-2 border-ink bg-surface p-2">
          <dt className="text-2xs font-bold uppercase text-muted">Valore</dt>
          <dd className="font-display text-xl">{value}/10</dd>
        </div>
      </dl>
    </div>
  );
}
