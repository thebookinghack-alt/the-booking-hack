import { Link } from "@tanstack/react-router";
import { ChevronDown } from "lucide-react";
import { Breadcrumb } from "@/components/site/Breadcrumb";
import { CoverImage } from "@/components/site/CoverImage";
import { AffiliateDisclosure } from "@/components/site/Disclosure";
import { FreshnessBadge } from "@/components/site/FreshnessBadge";
import { JsonLd } from "@/components/site/JsonLd";
import { HackScoreMeter, ScoreHint } from "@/components/site/ScoreHint";
import { ShareBar } from "@/components/site/ShareBar";
import { SocialCard } from "@/components/site/SocialCard";
import { Button } from "@/components/ui/button";
import { BLOG_POSTS } from "@/lib/content/blog";
import { track } from "@/lib/offers/analytics";
import { isPlaceholderAffiliate } from "@/lib/offers/checklist";
import { CONFIDENCE_DISCLAIMER, confidenceCaption, formatItDate, freshnessCopy, freshnessOf } from "@/lib/offers/freshness";
import { categoryPath, offerPath } from "@/lib/offers/paths";
import { CATEGORY_LABEL, PRICE_KIND_LABEL, type Offer } from "@/lib/offers/types";
import { offerJsonLd } from "@/lib/seo";
import { eur } from "@/lib/utils";

function Accordion({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <details className="border-b border-wash py-3">
      <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between font-display font-bold">
        {title}
        <ChevronDown className="size-4" />
      </summary>
      <div className="pt-2 text-sm text-muted">{children}</div>
    </details>
  );
}

export function ExpiredOffer({ offer }: { offer: Offer }) {
  const path = offerPath(offer);
  return (
    <main className="mx-auto w-[min(720px,calc(100%-1.5rem))] py-10">
      <Breadcrumb
        items={[
          { label: "Home", to: "/" },
          { label: "Offerte", to: "/offerte" },
          { label: offer.title },
        ]}
      />
      <p className="text-xs font-bold uppercase text-muted">Offerta scaduta</p>
      <h1 className="mt-2 font-display text-4xl">{offer.title}</h1>
      <p className="mt-3 text-muted">
        Un travel deal non è un articolo evergreen. Questo prezzo non è più in pubblicazione — può essere sparito dal partner.
      </p>
      <p className="mt-2 text-sm text-muted">
        Ultimo controllo: {formatItDate(offer.verifiedAt)}. Scadenza dataset: {offer.expiresAt || "—"}.
      </p>
      <Button variant="primary" className="mt-6" asChild>
        <Link to="/offerte">Vedi i deal attivi</Link>
      </Button>
      <p className="mt-4 text-xs text-muted">Scheda canonica (noindex): {path}</p>
    </main>
  );
}

export function OfferDetail({ offer }: { offer: Offer }) {
  const placeholder = isPlaceholderAffiliate(offer.affiliateUrl);
  const relatedPosts = BLOG_POSTS.filter((p) => p.relatedOffers.includes(offer.slug) || p.relatedOffers.includes(offer.id)).slice(0, 3);
  const path = offerPath(offer);
  const fresh = freshnessOf(offer);
  const copy = freshnessCopy(fresh, offer.verifiedAt);
  const route = offer.origin !== "—" ? `${offer.origin} → ${offer.destination}` : offer.destination;

  function clickOut() {
    track("affiliate_click", { id: offer.id });
    track("outbound_click", { id: offer.id });
  }

  return (
    <main className="mx-auto w-[min(1100px,calc(100%-1.5rem))] pb-28 pt-6 lg:pb-10">
      <JsonLd data={offerJsonLd(offer)} />
      <Breadcrumb
        items={[
          { label: "Home", to: "/" },
          { label: "Offerte", to: "/offerte" },
          { label: CATEGORY_LABEL[offer.category], to: categoryPath(offer.category) },
          { label: offer.title },
        ]}
      />
      <div className="grid items-start gap-8 lg:grid-cols-[2fr_0.9fr]">
        <div>
          <CoverImage
            src={offer.imageUrl}
            alt={offer.imageAlt}
            width={1200}
            height={675}
            className="aspect-video rounded-xl border-3 border-ink"
            sizes="(max-width: 1000px) 100vw, 700px"
            priority
          />
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <p className="text-xs font-bold uppercase text-muted">{offer.badge}</p>
            <FreshnessBadge offer={offer} />
          </div>
          <h1 className="mt-2 font-display text-3xl leading-tight md:text-4xl">{offer.title}</h1>
          <p className="text-muted">{route}</p>
          <dl className="mt-4 grid grid-cols-2 gap-2 text-sm md:grid-cols-3">
            <Fact k="Quanto" v={eur(offer.price)} />
            <Fact k="Per cosa" v={PRICE_KIND_LABEL[offer.priceKind]} />
            {offer.datesLabel ? <Fact k="Quando" v={offer.datesLabel} /> : null}
            {offer.origin !== "—" ? <Fact k="Da dove" v={offer.origin} /> : null}
            {offer.included ? <Fact k="Incluso" v={offer.included} /> : null}
            {offer.baggage ? <Fact k="Bagaglio" v={offer.baggage} /> : null}
          </dl>
          <p className="mt-3 text-xs text-muted">
            {copy.detail} Ultimo controllo: {formatItDate(offer.verifiedAt)}.
          </p>
          <div className="mt-3">
            <ScoreHint
              score={offer.hackScore}
              confidence={offer.confidence}
              breakdown={{ price: offer.priceScore, location: offer.locationScore, value: offer.valueScore }}
            />
          </div>
          {offer.verdict ? <blockquote className="my-5 border-l-4 border-pink bg-surface p-4 italic">{offer.verdict}</blockquote> : null}

          <h2 className="mt-6 font-display text-2xl">Perché lo consideriamo un Hack</h2>
          <ul className="mt-2 list-disc pl-5 text-muted">
            {offer.reasons.map((r) => (
              <li key={r}>{r}</li>
            ))}
          </ul>
          <p className="mt-3 text-muted">{offer.description}</p>

          <div className="mt-5">
            <HackScoreMeter score={offer.hackScore} price={offer.priceScore} location={offer.locationScore} value={offer.valueScore} />
            <p className="mt-2 text-xs text-muted">
              Confidence {offer.confidence}/100 — {confidenceCaption(offer.confidence)} {CONFIDENCE_DISCLAIMER}
            </p>
          </div>

          <div className="mt-6">
            <h2 className="font-display text-2xl">Condividi</h2>
            <div className="mt-3">
              <ShareBar title={offer.title} path={path} />
            </div>
            <div className="mt-4">
              <SocialCard offer={offer} />
            </div>
          </div>
          <div className="mt-6">
            <Accordion title="Condizioni">
              {offer.conditions || "Prezzi e disponibilità cambiano. Verifica sempre sul sito del partner prima di prenotare."}
            </Accordion>
            {offer.baggage || offer.flight?.baggage ? (
              <Accordion title="Bagaglio">{offer.baggage || offer.flight?.baggage}</Accordion>
            ) : null}
            {offer.datesLabel || offer.flight?.dates || offer.hotel?.dates ? (
              <Accordion title="Date">{offer.datesLabel || offer.flight?.dates || offer.hotel?.dates}</Accordion>
            ) : null}
            <Accordion title="Cancellazione">
              {offer.cancellation || offer.hotel?.cancellation || "Per gli hotel verifica se la tariffa è rimborsabile. Per i voli, di solito no."}
            </Accordion>
            {offer.flight ? (
              <Accordion title="Dettagli volo">
                {[
                  offer.flight.airportFrom && offer.flight.airportTo ? `${offer.flight.airportFrom} → ${offer.flight.airportTo}` : null,
                  offer.flight.direct === true ? "Diretto" : offer.flight.direct === false ? "Con scalo" : null,
                  offer.flight.duration,
                  offer.flight.tripType === "AR" ? "Andata e ritorno" : offer.flight.tripType === "SOLO_ANDATA" ? "Solo andata" : null,
                  offer.flight.airline,
                ]
                  .filter(Boolean)
                  .join(" · ") || "Campi volo incompleti nel dataset mock."}
              </Accordion>
            ) : null}
            {offer.hotel ? (
              <Accordion title="Dettagli hotel">
                {[
                  offer.hotel.property,
                  offer.hotel.area,
                  offer.hotel.nights ? `${offer.hotel.nights} notti` : null,
                  offer.hotel.pricePerNight ? `${eur(offer.hotel.pricePerNight)} a notte` : null,
                  offer.hotel.board,
                  offer.hotel.officialRating != null ? `Stelle ufficiali ${offer.hotel.officialRating}` : null,
                ]
                  .filter(Boolean)
                  .join(" · ") || "Campi hotel incompleti nel dataset mock."}
              </Accordion>
            ) : null}
            <Accordion title="Come calcoliamo il punteggio">
              Hack Score editoriale: 40% prezzo, 30% location, 30% valore. Non è una media recensioni. Confidence misura completezza e freschezza dei controlli, non la probabilità che il prezzo esista ancora.
            </Accordion>
            <Accordion title="Come verifichiamo">
              Checklist di 12 punti, di cui 7 bloccanti. I bot non pubblicano. Filippo approva, poi il Publisher (passo manuale) mette online.
            </Accordion>
            <Accordion title="Commissione affiliata">
              Possiamo ricevere una commissione se prenoti dal link, senza costo extra per te. Non entra nell'Hack Score. In demo il link è ancora placeholder.
            </Accordion>
          </div>
          {relatedPosts.length ? (
            <section className="mt-8">
              <h2 className="font-display text-2xl">Dal blog</h2>
              <ul className="mt-2 space-y-2">
                {relatedPosts.map((p) => (
                  <li key={p.slug}>
                    <Link to="/blog/$slug" params={{ slug: p.slug }} className="font-bold underline">
                      {p.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}
        </div>
        <aside className="hidden rounded-xl border-3 border-ink bg-surface p-5 lg:sticky lg:top-20 lg:block">
          {offer.oldPrice ? <p className="text-muted line-through">{eur(offer.oldPrice)}</p> : null}
          <p className="font-display text-5xl text-pink">{eur(offer.price)}</p>
          <p className="text-xs font-bold uppercase text-muted">{PRICE_KIND_LABEL[offer.priceKind]}</p>
          <p className="mt-3 text-sm">{route}</p>
          {offer.durationLabel ? <p className="text-sm text-muted">{offer.durationLabel}</p> : null}
          {offer.datesLabel ? <p className="text-sm text-muted">{offer.datesLabel}</p> : null}
          {offer.baggage ? <p className="mt-2 text-sm">{offer.baggage}</p> : null}
          <p className="mt-3 text-sm font-bold">Hack Score {offer.hackScore}</p>
          <p className="text-xs text-muted">
            Prezzo {offer.priceScore}/10 · Posizione {offer.locationScore}/10 · Valore {offer.valueScore}/10
          </p>
          <p className="mt-2 text-sm">
            Confidence {offer.confidence}/100 <span className="rounded bg-cream px-1 text-xs font-bold">Demo</span>
          </p>
          <p className="text-xs text-muted">{confidenceCaption(offer.confidence)}</p>
          <p className="mt-2 text-xs text-muted">Ultimo controllo {formatItDate(offer.verifiedAt)}.</p>
          <Button variant="primary" className="mt-5 w-full" asChild>
            <a href={offer.affiliateUrl} rel="sponsored nofollow noopener" onClick={clickOut}>
              Vedi l'offerta
            </a>
          </Button>
          <p className="mt-2 text-xs text-muted">
            {placeholder ? "Link partner: Da collegare (demo)." : "Link affiliato."} Possiamo ricevere una commissione, senza costo extra per te.
          </p>
        </aside>
      </div>
      <div className="mt-8 lg:hidden">
        <AffiliateDisclosure compact />
      </div>

      <div className="fixed inset-x-0 bottom-0 z-30 border-t-3 border-ink bg-surface p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] lg:hidden">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="font-display text-2xl text-pink">{eur(offer.price)}</p>
            <p className="text-xs text-muted">Possibile commissione affiliato</p>
          </div>
          <Button variant="primary" asChild>
            <a href={offer.affiliateUrl} rel="sponsored nofollow noopener" onClick={clickOut}>
              Vedi l'offerta
            </a>
          </Button>
        </div>
      </div>
    </main>
  );
}

function Fact({ k, v }: { k: string; v: string }) {
  return (
    <div className="rounded-md border-2 border-ink bg-surface px-3 py-2">
      <dt className="text-2xs font-bold uppercase text-muted">{k}</dt>
      <dd className="font-semibold">{v}</dd>
    </div>
  );
}
