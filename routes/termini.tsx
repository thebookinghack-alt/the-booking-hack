import { createFileRoute, Link } from "@tanstack/react-router";
import { Breadcrumb } from "@/components/site/Breadcrumb";
import { JsonLd } from "@/components/site/JsonLd";
import { APP_CONFIG } from "@/lib/offers/config";
import { breadcrumbJsonLd, pageHead } from "@/lib/seo";

export const Route = createFileRoute("/termini")({
  component: TerminiPage,
  head: () =>
    pageHead(
      "Termini e condizioni | The Booking Hack",
      "Sito editoriale, non agenzia. Prezzi del partner, commissioni affiliate, offerte che scadono. Legge italiana.",
      "/termini",
    ),
});

function TerminiPage() {
  return (
    <main className="editorial mx-auto max-w-2xl px-4 py-12">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Termini", path: "/termini" },
        ])}
      />
      <Breadcrumb items={[{ label: "Home", to: "/" }, { label: "Termini" }]} />
      <p className="mt-2 text-xs font-bold uppercase text-muted">Ultimo aggiornamento: 22 settembre 2026</p>
      <h1 className="mt-2 font-display text-4xl">Termini e condizioni</h1>
      <div className="prose-editorial">
        <h2>1. Titolare</h2>
        <p>
          The Booking Hack è un sito di Filippo Scalabrin, via Luigi Cadorna 5B, 30173 Venezia
          (Mestre). Email:{" "}
          <a href="mailto:thebookinghack@gmail.com">thebookinghack@gmail.com</a>.
        </p>

        <h2>2. Cos’è questo sito</h2>
        <p>
          È un sito <strong>editoriale</strong>: selezioniamo e commentiamo offerte di viaggio. Non
          siamo un’agenzia di viaggi, un tour operator, un intermediario autorizzato né un
          aggregatore di prenotazioni. Non concludiamo contratti di trasporto o soggiorno. Non
          incassiamo il prezzo del viaggio.
        </p>

        <h2>3. Offerte</h2>
        <p>
          Prezzi, date, bagagli, tasse e disponibilità sono del <strong>partner</strong> (in questa
          fase, per gli hotel, Booking.com) e possono cambiare o sparire dopo la pubblicazione. Lo
          stato in pagina (verificato / da ricontrollare / scaduto) è un controllo editoriale, non
          una garanzia. Un’offerta scaduta resta visibile per onestà, senza finta disponibilità.
        </p>
        <p>
          L’Hack Score è un giudizio nostro (prezzo, posizione, valore). Non è una certificazione e
          non sostituisce le condizioni del vettore o della struttura.
        </p>

        <h2>4. Link affiliati</h2>
        <p>
          “Vai all’offerta” ti porta sul sito del partner. Possiamo ricevere una commissione se
          prenoti, senza costo extra per te. I link sono contrassegnati (sponsored / nofollow).
          Dettaglio: <Link to="/come-guadagniamo">Come guadagniamo</Link>.
        </p>

        <h2>5. Uso del sito</h2>
        <p>
          Puoi leggere, condividere i link pubblici e iscriverti alla newsletter. Non puoi copiare
          il catalogo per farne un aggregatore, spacciarti per The Booking Hack, o usare i contenuti
          in modo illecito. I marchi dei partner restano dei partner.
        </p>

        <h2>6. Newsletter</h2>
        <p>
          Iscrizione solo con consenso. Niente vendita della lista. Revoca in ogni mail o a{" "}
          <a href="mailto:thebookinghack@gmail.com">thebookinghack@gmail.com</a>. Finché il provider
          di invio è spento, il form non finge un successo.
        </p>

        <h2>7. Responsabilità</h2>
        <p>
          Non rispondiamo di: variazioni di prezzo dopo il click; overbooking; scioperi; visti;
          assicurazioni; bagagli; errori del partner; danni da un viaggio prenotato altrove. Il
          contratto di viaggio, se lo concludi, è tra te e il partner. Verifica sempre sul loro sito
          prima di pagare.
        </p>

        <h2>8. Privacy e cookie</h2>
        <p>
          <a href={APP_CONFIG.iubendaPrivacy} target="_blank" rel="noopener noreferrer">
            Privacy
          </a>
          ,{" "}
          <a href={APP_CONFIG.iubendaCookie} target="_blank" rel="noopener noreferrer">
            Cookie (iubenda)
          </a>
          , <Link to="/cookie">come usiamo i cookie</Link>. Titolare: stesso di questi Termini.
        </p>

        <h2>9. Legge e foro</h2>
        <p>
          Legge italiana. Foro di Venezia, salvo i diritti inderogabili del consumatore residente in
          UE.
        </p>

        <h2>10. Modifiche</h2>
        <p>
          Possiamo aggiornare questi termini. La data in cima vale come versione. L’uso del sito
          dopo la modifica vale come accettazione, per quanto consentito.
        </p>
      </div>
    </main>
  );
}
