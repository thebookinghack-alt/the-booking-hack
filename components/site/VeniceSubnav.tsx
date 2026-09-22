import { Link, useRouterState } from "@tanstack/react-router";
import { VENICE_NAV } from "@/lib/content/venice-guides";

export function VeniceSubnav() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  return (
    <nav className="chip-scroll mb-6" aria-label="Sezioni Venezia">
      {VENICE_NAV.map((l) => {
        const active = pathname === l.to;
        return (
          <Link
            key={l.to}
            to={l.to as "/venezia"}
            className={`inline-flex min-h-11 shrink-0 items-center rounded-full border-2 border-ink px-4 text-xs font-bold uppercase ${active ? "bg-venice text-surface" : "bg-surface text-ink"}`}
            aria-current={active ? "page" : undefined}
          >
            {l.label}
          </Link>
        );
      })}
    </nav>
  );
}
