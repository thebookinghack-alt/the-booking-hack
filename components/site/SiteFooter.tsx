import { Link } from "@tanstack/react-router";
import { BrandMark } from "@/components/site/BrandMark";
import { APP_CONFIG } from "@/lib/offers/config";
import { ANALYTICS_NOTE } from "@/lib/offers/analytics";

export function SiteFooter() {
  return (
    <footer className="border-t-3 border-ink bg-surface">
      <div className="mx-auto flex w-[min(1100px,calc(100%-1.5rem))] flex-col gap-4 py-6 text-sm md:flex-row md:items-start md:justify-between">
        <div>
          <BrandMark />
          <p className="mt-3 text-muted">
            © {new Date().getFullYear()} · {APP_CONFIG.version} demo · Venezia
          </p>
        </div>
        <nav className="flex flex-wrap gap-x-4 gap-y-2" aria-label="Piedipagina">
          <Link to="/offerte" className="font-semibold">
            Offerte
          </Link>
          <Link to="/venezia" className="font-semibold">
            Venezia
          </Link>
          <Link to="/metodo" className="font-semibold">
            Metodo
          </Link>
          <Link to="/newsletter" className="font-semibold">
            Newsletter
          </Link>
          <Link to="/chi-siamo" className="font-semibold">
            Chi siamo
          </Link>
          <Link to="/come-guadagniamo" className="font-semibold">
            Come guadagniamo
          </Link>
          <Link to="/blog" className="font-semibold">
            Blog
          </Link>
          <Link to="/esperienze" className="font-semibold">
            Provato da Filippo
          </Link>
          <a href={APP_CONFIG.iubendaPrivacy} target="_blank" rel="noopener noreferrer" className="font-semibold">
            Privacy
          </a>
          <a href={APP_CONFIG.iubendaCookie} target="_blank" rel="noopener noreferrer" className="font-semibold">
            Cookie
          </a>
          <Link to="/cookie" className="font-semibold">
            Utilizzo
          </Link>
          <Link to="/termini" className="font-semibold">
            Termini
          </Link>
        </nav>
      </div>
      <p className="mx-auto w-[min(1100px,calc(100%-1.5rem))] pb-6 text-xs text-muted">
        Instagram e TikTok: account aperti, niente Pixel. Telegram da aprire. {ANALYTICS_NOTE}{" "}
        Affiliate: Booking.com. Desk editoriale non è in nav pubblica.
      </p>
    </footer>
  );
}
