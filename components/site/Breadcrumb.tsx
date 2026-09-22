import { Link } from "@tanstack/react-router";

export type Crumb = { label: string; to?: string; params?: Record<string, string> };

export function Breadcrumb({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Percorso" className="mb-4 text-sm text-muted">
      <ol className="flex flex-wrap items-center gap-1">
        {items.map((it, i) => (
          <li key={`${it.label}-${i}`} className="flex items-center gap-1">
            {i > 0 ? <span aria-hidden="true">›</span> : null}
            {it.to && i < items.length - 1 ? (
              <Link to={it.to as "/"} className="font-bold text-ink">
                {it.label}
              </Link>
            ) : (
              <span className={i === items.length - 1 ? "text-ink" : ""}>{it.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
