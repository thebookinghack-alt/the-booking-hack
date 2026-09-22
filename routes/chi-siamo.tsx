import { createFileRoute, Link } from "@tanstack/react-router";
import { Breadcrumb } from "@/components/site/Breadcrumb";
import { CoverImage } from "@/components/site/CoverImage";
import { JsonLd } from "@/components/site/JsonLd";
import { SITE_STATS } from "@/lib/content/stats";
import { breadcrumbJsonLd, orgJsonLd, pageHead } from "@/lib/seo";

export const Route = createFileRoute("/chi-siamo")({
  component: AboutPage,
  head: () =>
    pageHead(
      "Chi siamo | The Booking Hack",
      "Filippo, Venezia: reception e revenue. Criteri editoriali in chiaro. I bot cercano, pubblica solo ciò che consiglierebbe a un amico.",
      "/chi-siamo",
    ),
});

function AboutPage() {
  return (
    <main className="editorial mx-auto w-[min(720px,calc(100%-1.5rem))] py-8">
      <JsonLd data={[orgJsonLd(), breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Chi siamo", path: "/chi-siamo" }])]} />
      <Breadcrumb items={[{ label: "Home", to: "/" }, { label: "Chi siamo" }]} />
      <p className="text-xs font-bold uppercase text-muted">Editoriale</p>
      <h1 className="mt-2 font-display text-4xl md:text-5xl">Chi siamo</h1>
      <CoverImage
        src="https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?auto=format&fit=crop&w=1200&q=80"
        alt="Canale veneziano — foto stock di copertina, non un ritratto"
        className="mt-6 aspect-video rounded-xl border-3 border-ink"
        sizes="(max-width: 720px) 100vw, 720px"
      />
      <p className="mt-2 text-xs text-muted">Ritratto personale: da caricare. Qui una stock di Venezia, etichettata come tale.</p>

      <div className="prose-editorial">
        <p>
          Sono Filippo. Vivo e lavoro a Venezia, in reception e sul revenue di una guest house. Non sono un aggregatore e non ho un team di “travel expert” in stock photo. Ho un mestiere: capire se un prezzo, una posizione e un rischio valgono il click.
        </p>
        <h2>Come scelgo</h2>
        <ul>
          <li>Pubblico solo stato PUBBLICATO, dopo checklist.</li>
          <li>Hack Score fisso: 40% prezzo, 30% location, 30% valore.</li>
          <li>La commissione affiliato non entra nel punteggio.</li>
          <li>Venezia è il secondo pilastro: poca automazione, firma umana.</li>
          <li>Niente recensioni inventate. Le esperienze verificate restano vuote finché non sono reali.</li>
        </ul>
        <h2>Cosa non sono</h2>
        <p>
          Non sono Booking, non sono un profilo che spara 40 codici sconto al giorno, non sono un blog che nasconde l’advertorial. Sono un filtro piccolo. I numeri sotto sono quelli veri della demo, anche se sono piccoli.
        </p>
      </div>

      <dl className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-4">
        <Stat k="Offerte in home" v={String(SITE_STATS.publishedOffers)} />
        <Stat k="Destinazioni" v={String(SITE_STATS.destinations)} />
        <Stat k="Pick Venezia" v={String(SITE_STATS.venicePicks)} />
        <Stat k="Ultimo controllo" v={SITE_STATS.lastVerifiedLabel} />
      </dl>
      <p className="mt-3 text-xs text-muted">{SITE_STATS.note}</p>

      <p className="mt-8">
        <Link to="/come-guadagniamo" className="font-bold underline">
          Come guadagniamo
        </Link>
        {" · "}
        <Link to="/esperienze" className="font-bold underline">
          Provato da Filippo
        </Link>
      </p>
    </main>
  );
}

function Stat({ k, v }: { k: string; v: string }) {
  return (
    <div className="rounded-xl border-3 border-ink bg-surface p-3">
      <dt className="text-xs font-bold uppercase text-muted">{k}</dt>
      <dd className="font-display text-xl">{v}</dd>
    </div>
  );
}
