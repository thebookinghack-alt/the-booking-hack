import { Link } from "@tanstack/react-router";
import { CATEGORY_PATH, type Offer } from "@/lib/offers/types";

export function OfferLink({
  offer,
  className,
  children,
  onClick,
}: {
  offer: Pick<Offer, "category" | "slug">;
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <Link
      to="/offerte/$category/$slug"
      params={{ category: CATEGORY_PATH[offer.category], slug: offer.slug }}
      className={className}
      onClick={onClick}
    >
      {children}
    </Link>
  );
}
