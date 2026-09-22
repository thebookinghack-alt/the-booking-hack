import { createFileRoute, Link } from "@tanstack/react-router";
import { Breadcrumb } from "@/components/site/Breadcrumb";
import { DemoChip } from "@/components/site/DemoChip";
import { JsonLd } from "@/components/site/JsonLd";
import { HackScoreMeter } from "@/components/site/ScoreHint";
import { articleJsonLd, breadcrumbJsonLd, pageHead } from "@/lib/seo";
import { CONFIDENCE_DISCLAIMER } from "@/lib/offers/freshness";

export const Route = createFileRoute("/metodo")({
  component: MethodPage,
  head: () =>
    pageHead(
      "Come funziona l'Hack Score | The Booking Hack",
      "40% prezzo, 30% location, 30% valore. Punteggio editoriale, non recensione e non garanzia. Confidence misura completezza e freschezza dei controlli.",
      "/metodo",
    ),
});

function MethodPage() {
  return (
    <main className="editorial mx-auto w-[min(720px,calc(100%-1.5rem))] py-8">
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Metodo", path: "/metodo" },
          ]),
          articleJsonLd({
            headline: "Come funziona l'Hack Score",
            description: "Metodo editoriale 40/30/30 e Confidence Score.",
            path: "/metodo",
            datePublished: "2026-08-20",
          }),
        ]}
      />
      <Breadcrumb items={[{ label: "Home", to: "/" }, { label: "Metodo" }]} />
      <DemoChip>Metodo editoriale · non recensioni</DemoChip>
      <h1 className="mt-2 font-display text-4xl md:text-5xl">Come scegliamo (e come no)</h1>
      <p className="mt-3 text-lg text-muted">
        The Booking Hack non vince perché ha più offerte. Vince perché trova meno cose, ma migliori.
      </p>

      <div className="mt-8">
        <HackScoreMeter score={9.4} price={10} location={9} value={9} />
      </div>

      <div className="prose-editorial">
        <h2>Hack Score: 40 / 30 / 30</h2>
        <p>
          Il punteggio è editoriale. Lo calcolo io, sempre con gli stessi pesi: 40% prezzo, 30% location, 30% valore. Non è una media recensioni. Non è un voto degli utenti. Non è una garanzia che il prezzo esista ancora quando clicchi.
        </p>
        <ul>
          <li>
            <strong>Prezzo</strong> — quanto costa rispetto a un riferimento onesto, non rispetto a una tariffa gonfiata.
          </li>
          <li>
            <strong>Posizione</strong> — a Venezia, Dorsoduro e Mestre non sono intercambiabili. In un city break, 40 minuti dal centro di notte non è “design”.
          </li>
          <li>
            <strong>Valore</strong> — cosa è incluso, bagaglio, scali, cancellazione. Un 39€ di solo sedile può perdere contro un pacchetto da 129€.
          </li>
        </ul>
        <h2>Confidence, non probabilità</h2>
        <p>
          Il Confidence Score (0–100) misura completezza + freschezza + qualità della verifica. Non misura la probabilità che il prezzo esista ancora.
        </p>
        <p>{CONFIDENCE_DISCLAIMER}</p>
        <h2>Freshness</h2>
        <p>
          Un travel deal non è un articolo evergreen. Stati visibili: Controllo recente → Da ricontrollare → Offerta scaduta. Mai “100% sicuro”.
        </p>
        <h2>I bot non pubblicano</h2>
        <p>
          Scout → Cleaner → Scoring → Editorial → Verify → Briefing. Poi Human approval. Poi Publisher, a mano. Se manca un controllo bloccante, se la Confidence è sotto soglia, se l’URL affiliato è placeholder, non si pubblica.
        </p>
      </div>
      <p className="mt-8 text-sm">
        <Link to="/blog/$slug" params={{ slug: "come-funziona-hack-score" }} className="font-bold underline">
          Articolo lungo sul metodo
        </Link>
        {" · "}
        <Link to="/chi-siamo" className="font-bold underline">
          Criteri editoriali
        </Link>
        {" · "}
        <Link to="/come-guadagniamo" className="font-bold underline">
          Come guadagniamo
        </Link>
      </p>
    </main>
  );
}
