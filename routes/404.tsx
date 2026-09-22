import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/404")({
  component: NotFound,
  head: () =>
    pageHead("Pagina non trovata | The Booking Hack", "Questa pagina non esiste, o il deal non è più pubblicato.", "/404", {
      noindex: true,
    }),
});

export function NotFound() {
  return (
    <main className="mx-auto max-w-lg px-4 py-16 text-center">
      <p className="text-xs font-bold uppercase">Pagina non trovata</p>
      <h1 className="mt-2 font-display text-4xl">Questa pagina è partita senza di noi</h1>
      <p className="mt-3 text-muted">
        Se cercavi un deal, può essere scaduto o non ancora pubblicato. Non nascondiamo i buchi con risultati inventati.
      </p>
      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
        <Button variant="primary" asChild>
          <Link to="/offerte">Vedi i deal attivi</Link>
        </Button>
        <Button asChild>
          <Link to="/venezia">Venezia</Link>
        </Button>
      </div>
      <p className="mt-6 text-sm">
        <Link to="/" className="font-bold underline">
          Home
        </Link>
        {" · "}
        <Link to="/blog" className="font-bold underline">
          Blog
        </Link>
        {" · "}
        <Link to="/newsletter" className="font-bold underline">
          Newsletter
        </Link>
      </p>
    </main>
  );
}
