import { createFileRoute, Link } from "@tanstack/react-router";
import { Breadcrumb } from "@/components/site/Breadcrumb";
import { AffiliateDisclosure } from "@/components/site/Disclosure";
import { JsonLd } from "@/components/site/JsonLd";
import { EDITORIAL_NOTES } from "@/lib/content/esperienze";
import { articleJsonLd, breadcrumbJsonLd, pageHead } from "@/lib/seo";

export const Route = createFileRoute("/esperienze")({
  component: EsperienzePage,
  head: () =>
    pageHead(
      "Provato da Filippo | The Booking Hack",
      "Note in prima persona, dichiaratamente editoriali. Nessuna recensione di clienti fittizia. Le esperienze verificate arriveranno quando saranno reali.",
      "/esperienze",
    ),
});

function EsperienzePage() {
  return (
    <main className="editorial mx-auto w-[min(720px,calc(100%-1.5rem))] py-8">
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Provato da Filippo", path: "/esperienze" },
          ]),
          ...EDITORIAL_NOTES.map((n) =>
            articleJsonLd({
              headline: n.title,
              description: n.body.slice(0, 160),
              path: "/esperienze",
              datePublished: "2026-08-25",
            }),
          ),
        ]}
      />
      <Breadcrumb items={[{ label: "Home", to: "/" }, { label: "Provato da Filippo" }]} />
      <p className="text-xs font-bold uppercase text-muted">Editoriale · non recensioni</p>
      <h1 className="mt-2 font-display text-4xl">Provato da Filippo</h1>
      <p className="mt-3 text-muted">
        Racconti in prima persona. Non sono recensioni di terzi, non hanno nomi inventati, non hanno stelle. Se un giorno raccoglieremo esperienze verificate di lettori, staranno sotto — vuote, finché non saranno vere.
      </p>

      <div className="mt-8 space-y-6">
        {EDITORIAL_NOTES.map((n) => (
          <article key={n.id} className="rounded-xl border-3 border-ink bg-surface p-5">
            <p className="text-xs font-bold uppercase text-muted">
              {n.place} · {n.dateLabel}
            </p>
            <h2 className="mt-2 font-display text-2xl">{n.title}</h2>
            <p className="mt-3 leading-relaxed">{n.body}</p>
            <ul className="mt-4 space-y-1 text-sm">
              {n.related.map((r) => (
                <li key={r.href}>
                  <Link to={r.href as "/"} className="font-bold underline">
                    {r.label}
                  </Link>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>

      <section className="mt-10 rounded-xl border-3 border-dashed border-ink bg-wash p-5">
        <h2 className="font-display text-2xl">Esperienze verificate dei lettori</h2>
        <p className="mt-2 text-muted">
          In arrivo — prime esperienze verificate. Nessun nome, foto o citazione finché non è di una persona reale, con data e verifica.
        </p>
      </section>
      <div className="mt-6">
        <AffiliateDisclosure />
      </div>
    </main>
  );
}
