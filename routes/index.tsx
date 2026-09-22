import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo } from "react";
import { CoverImage } from "@/components/site/CoverImage";
import { DemoChip } from "@/components/site/DemoChip";
import { HackTag } from "@/components/site/BrandMark";
import { JsonLd } from "@/components/site/JsonLd";
import { NewsletterForm } from "@/components/site/NewsletterForm";
import { FilterBar, OfferCard, PublicGrid } from "@/components/site/OfferCard";
import { OfferLink } from "@/components/site/OfferLink";
import { ProcessStrip } from "@/components/site/ProcessStrip";
import { Button } from "@/components/ui/button";
import { BLOG_POSTS } from "@/lib/content/blog";
import { SITE_STATS } from "@/lib/content/stats";
import { orgJsonLd, pageHead, websiteJsonLd } from "@/lib/seo";
import { publishedOffers, useDeskStore } from "@/lib/offers/store";
import { eur } from "@/lib/utils";

export const Route = createFileRoute("/")({
  component: Home,
  head: () =>
    pageHead(
      "The Booking Hack | Deal viaggio selezionati",
      "Il bot cerca. Filippo verifica. Tu decidi se partire. Error fare, hotel e Venezia vista da chi ci lavora.",
      "/",
    ),
});

function Home() {
  const all = useDeskStore((s) => s.offers);
  const offers = useMemo(() => publishedOffers(all), [all]);
  const featured = offers.find((o) => o.publishHome) ?? offers[0];
  const best = offers.slice(0, 3);
  const venice = offers.filter((o) => o.category === "VENEZIA").slice(0, 3);
  const posts = BLOG_POSTS.slice(0, 3);

  return (
    <main className="mx-auto w-[min(1100px,calc(100%-1.5rem))] py-6 md:py-8">
      <JsonLd data={[orgJsonLd(), websiteJsonLd()]} />
      <DemoChip />
      <section className="grid items-center gap-6 rounded-xl border-3 border-ink bg-yellow p-5 md:grid-cols-[1fr_320px] md:p-10">
        <div>
          <p className="mb-3 flex flex-wrap items-center gap-2 text-xs font-bold uppercase tracking-wide">
            Deal selezionati, non aggregati
          </p>
          <h1 className="font-display text-4xl leading-[0.95] tracking-tight md:text-6xl">
            ABBIAMO TROVATO UN{" "}
            <HackTag className="align-middle text-2xl md:text-4xl" />
            .
            <br />
            TU DEVI SOLO PARTIRE.
          </h1>
          <p className="mt-3 max-w-xl text-base text-muted md:text-lg">
            Il bot cerca. Filippo verifica. Tu decidi se partire. Pubblichiamo solo quello che consiglierei a un amico.
          </p>
          <div className="mt-5 flex flex-col gap-3 sm:flex-row">
            <Button variant="primary" asChild>
              <a href="#offerte">Vedi i deal di oggi</a>
            </Button>
            <Button variant="ghost" asChild>
              <Link to="/newsletter">I migliori in inbox</Link>
            </Button>
          </div>
          <p className="mt-3">
            <Link to="/venezia" className="text-sm font-bold underline">
              Guida locale Venezia
            </Link>
            {" · "}
            <Link to="/metodo" className="text-sm font-bold underline">
              Come scegliamo
            </Link>
          </p>
        </div>
        {featured ? (
          <OfferLink offer={featured} className="overflow-hidden rounded-xl border-3 border-ink bg-surface">
            <CoverImage
              src={featured.imageUrl}
              alt={featured.imageAlt}
              width={640}
              height={360}
              className="h-40 md:h-44"
              sizes="320px"
              priority
              showStock={false}
            />
            <div className="p-4">
              <p className="text-xs font-bold uppercase text-muted">{featured.badge}</p>
              <h2 className="font-display text-xl">{featured.title}</h2>
              <p className="mt-1 font-display text-3xl text-pink">{eur(featured.price)}</p>
              <p className="text-xs font-bold">Hack Score {featured.hackScore} · editoriale, non recensioni</p>
            </div>
          </OfferLink>
        ) : null}
      </section>

      <ProcessStrip />

      <section className="mt-10">
        <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-xs font-bold uppercase text-muted">Selezione, non inventario</p>
            <h2 className="font-display text-3xl md:text-4xl">I migliori del momento</h2>
          </div>
          <Link to="/offerte" className="font-bold underline">
            Catalogo completo
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {best.map((o) => (
            <OfferCard key={o.id} offer={o} />
          ))}
        </div>
      </section>

      <section id="offerte" className="scroll-mt-16 pt-10">
        <h2 className="mb-2 font-display text-4xl">Cosa stai cercando?</h2>
        <p className="mb-4 text-sm text-muted">
          Discovery, non un motore di ricerca. Filtra la selezione pubblicata — non inventiamo risultati.
        </p>
        <FilterBar showDiscovery />
        <PublicGrid />
      </section>

      <section className="mt-12 rounded-xl border-3 border-ink bg-surface p-5 md:p-8">
        <h2 className="font-display text-3xl">Come scegliamo</h2>
        <p className="mt-2 max-w-2xl text-muted">
          Hack Score 40% prezzo · 30% location · 30% valore. Confidence = completezza e freschezza dei controlli, non una garanzia sul prezzo. I bot non pubblicano.
        </p>
        <p className="mt-4">
          <Link to="/metodo" className="font-bold underline">
            Il metodo
          </Link>
          {" · "}
          <Link to="/chi-siamo" className="font-bold underline">
            Criteri editoriali
          </Link>
          {" · "}
          <Link to="/desk" className="font-bold underline">
            Desk demo
          </Link>
        </p>
      </section>

      <section className="mt-8 rounded-xl border-3 border-ink bg-venice p-5 text-surface md:p-8">
        <div className="mb-5 flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="mb-2 text-xs font-bold uppercase">Secondo pilastro</p>
            <h2 className="font-display text-3xl">Venezia, vista da chi ci lavora</h2>
            <p className="mt-2 max-w-xl text-sm text-surface/80">Hotel, Mestre vs centro, 48 ore. Poca automazione, firma umana.</p>
          </div>
          <Button variant="yellow" asChild>
            <Link to="/venezia">Tutta la sezione + mappa</Link>
          </Button>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {venice.map((o) => (
            <OfferCard key={o.id} offer={o} />
          ))}
        </div>
        <p className="mt-4 text-sm">
          <Link to="/venezia/dove-dormire" className="font-bold underline">
            Dove dormire
          </Link>
          {" · "}
          <Link to="/venezia/48-ore" className="font-bold underline">
            48 ore
          </Link>
        </p>
      </section>

      <NewsletterForm featured />

      <section className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-3">
        <TrustCard t="Sito gratuito" d="Nessun costo extra se prenoti dal link. Commissione affiliato, quando c'è, è visibile." to="/come-guadagniamo" />
        <TrustCard t="Niente recensioni fake" d="Le esperienze verificate restano vuote finché non sono reali. Firma di Filippo." to="/esperienze" />
        <TrustCard t="Processo visibile" d="Checklist, Confidence, freshness. I bot non pubblicano. Il desk è una demo editor." to="/stato" />
      </section>

      <section className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-4">
        <HomeStat k="Offerte pubblicate" v={String(SITE_STATS.publishedOffers)} />
        <HomeStat k="Destinazioni" v={String(SITE_STATS.destinations)} />
        <HomeStat k="Pick Venezia" v={String(SITE_STATS.venicePicks)} />
        <HomeStat k="Ultimo controllo" v={SITE_STATS.lastVerifiedLabel} />
      </section>
      <p className="mt-2 text-xs text-muted">{SITE_STATS.note}</p>

      <section className="mt-12">
        <div className="mb-4 flex items-end justify-between gap-4">
          <h2 className="font-display text-3xl">Dal blog</h2>
          <Link to="/blog" className="font-bold underline">
            Tutti gli articoli
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {posts.map((p) => (
            <article key={p.slug} className="rounded-xl border-3 border-ink bg-surface p-4">
              <p className="text-xs font-bold uppercase text-muted">{p.dateLabel}</p>
              <h3 className="mt-2 font-display text-xl">
                <Link to="/blog/$slug" params={{ slug: p.slug }}>
                  {p.title}
                </Link>
              </h3>
              <p className="mt-2 text-sm text-muted">{p.description}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

function HomeStat({ k, v }: { k: string; v: string }) {
  return (
    <div className="rounded-xl border-3 border-ink bg-surface p-4">
      <p className="text-xs font-bold uppercase text-muted">{k}</p>
      <p className="font-display text-xl md:text-2xl">{v}</p>
    </div>
  );
}

function TrustCard({ t, d, to }: { t: string; d: string; to: "/come-guadagniamo" | "/esperienze" | "/stato" }) {
  return (
    <article className="rounded-xl border-3 border-ink bg-surface p-5">
      <h3 className="font-display text-xl">{t}</h3>
      <p className="mt-2 text-sm text-muted">{d}</p>
      <Link to={to} className="mt-3 inline-block font-bold underline">
        Leggi
      </Link>
    </article>
  );
}
