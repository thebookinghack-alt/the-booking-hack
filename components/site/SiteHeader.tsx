import { Link } from "@tanstack/react-router";
import { BrandMark } from "@/components/site/BrandMark";
import { Menu, X } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";

const LINKS: { to: string; label: string; accent?: "venice" | "desk" }[] = [
  { to: "/offerte", label: "Offerte" },
  { to: "/venezia", label: "Venezia", accent: "venice" },
  { to: "/metodo", label: "Metodo" },
  { to: "/blog", label: "Blog" },
  { to: "/newsletter", label: "Newsletter" },
  { to: "/come-guadagniamo", label: "Trasparenza" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const id = useId();
  const panel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
      if (e.key === "Tab" && panel.current) {
        const nodes = panel.current.querySelectorAll<HTMLElement>("a,button");
        if (!nodes.length) return;
        const first = nodes[0];
        const last = nodes[nodes.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    panel.current?.querySelector<HTMLElement>("button,a")?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-40 border-b-3 border-ink bg-surface">
      <div className="mx-auto flex h-14 w-[min(1100px,calc(100%-1.5rem))] items-center justify-between gap-3 md:h-16">
        <BrandMark />
        <nav className="hidden items-center gap-3 text-xs font-bold uppercase tracking-wide xl:flex">
          {LINKS.map((l) => (
            <Link
              key={l.to}
              to={l.to as "/"}
              className={
                l.accent === "venice"
                  ? "rounded-full border-2 border-venice bg-cream px-3 py-1 text-venice"
                  : l.accent === "desk"
                    ? "rounded-md border-3 border-ink bg-yellow px-3 py-2"
                    : undefined
              }
            >
              {l.label}
            </Link>
          ))}
        </nav>
        <button
          type="button"
          className="inline-flex size-11 items-center justify-center rounded-md border-3 border-ink bg-yellow xl:hidden"
          aria-expanded={open}
          aria-controls={id}
          aria-label={open ? "Chiudi menu" : "Apri menu"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>
      {open ? (
        <div className="fixed inset-0 z-50 xl:hidden" role="dialog" aria-modal="true" aria-label="Menu">
          <button type="button" className="absolute inset-0 bg-ink/50" aria-label="Chiudi" onClick={() => setOpen(false)} />
          <div ref={panel} id={id} className="absolute inset-x-0 top-0 border-b-3 border-ink bg-surface p-4">
            <div className="mb-3 flex items-center justify-between">
              <BrandMark compact />
              <button
                type="button"
                className="inline-flex size-11 items-center justify-center rounded-md border-3 border-ink bg-yellow"
                aria-label="Chiudi menu"
                onClick={() => setOpen(false)}
              >
                <X className="size-5" />
              </button>
            </div>
            <nav className="flex flex-col gap-1">
              {LINKS.map((l) => (
                <Link
                  key={l.to}
                  to={l.to as "/"}
                  className="flex min-h-11 items-center rounded-md px-3 font-display font-bold"
                  onClick={() => setOpen(false)}
                >
                  {l.label}
                </Link>
              ))}
              <Link to="/chi-siamo" className="flex min-h-11 items-center rounded-md px-3 font-display font-bold" onClick={() => setOpen(false)}>
                Chi siamo
              </Link>
              <Link to="/esperienze" className="flex min-h-11 items-center rounded-md px-3 font-display font-bold" onClick={() => setOpen(false)}>
                Provato da Filippo
              </Link>
            </nav>
          </div>
        </div>
      ) : null}
    </header>
  );
}
