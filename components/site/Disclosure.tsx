import { Link } from "@tanstack/react-router";

export function AffiliateDisclosure({ compact }: { compact?: boolean }) {
  if (compact) {
    return (
      <p className="text-xs text-muted">
        Possibile commissione affiliato, senza costo extra. I link in demo sono da collegare.{" "}
        <Link to="/come-guadagniamo" className="font-bold underline">
          Trasparenza
        </Link>
      </p>
    );
  }
  return (
    <aside className="rounded-xl border-3 border-ink bg-wash p-4 text-sm">
      <p className="font-bold">Disclosure affiliato</p>
      <p className="mt-1 text-muted">
        Se prenoti tramite i nostri link, possiamo ricevere una commissione senza costo extra per te. Non influenza l’Hack Score. In questa demo i link partner sono placeholder.
      </p>
    </aside>
  );
}
