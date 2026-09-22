import { PROCESS_STEPS } from "@/lib/content/product";

export function ProcessStrip() {
  return (
    <section className="mt-8" aria-labelledby="process-h">
      <h2 id="process-h" className="font-display text-2xl md:text-3xl">
        Il bot cerca. Filippo verifica. Tu decidi se partire.
      </h2>
      <p className="mt-2 max-w-2xl text-sm text-muted">
        Discovery automatica + filtro algoritmico + verifica umana + distribuzione editoriale. Non pubblichiamo tutto quello che troviamo.
      </p>
      <ol className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {PROCESS_STEPS.map((s) => (
          <li key={s.k} className="rounded-xl border-3 border-ink bg-surface p-4">
            <p className="text-xs font-bold uppercase text-pink">{s.k}</p>
            <p className="mt-1 font-display text-lg">{s.t}</p>
            <p className="mt-1 text-sm text-muted">{s.d}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
