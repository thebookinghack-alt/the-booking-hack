import { APP_CONFIG } from "@/lib/offers/config";
import { offerPath } from "@/lib/offers/paths";
import type { Offer } from "@/lib/offers/types";

export function canonical(path: string) {
  return `${APP_CONFIG.siteUrl}${path.startsWith("/") ? path : `/${path}`}`;
}

export function pageHead(
  title: string,
  description: string,
  path: string,
  opts?: { noindex?: boolean; ogType?: "website" | "article" },
) {
  const url = canonical(path);
  const meta: Array<Record<string, string>> = [
    { title },
    { name: "description", content: description },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:url", content: url },
    { property: "og:type", content: opts?.ogType ?? "website" },
    { property: "og:locale", content: "it_IT" },
    { property: "og:site_name", content: "The Booking Hack" },
    { property: "og:image", content: canonical("/og.jpg") },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
  ];
  if (opts?.noindex) meta.push({ name: "robots", content: "noindex, nofollow" });
  return {
    meta,
    links: [{ rel: "canonical", href: url }],
  };
}

export function orgJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "The Booking Hack",
    url: APP_CONFIG.siteUrl,
    description: "Filtro editoriale di travel deal. Il bot cerca. Filippo verifica. Tu decidi se partire.",
    founder: { "@type": "Person", name: "Filippo", jobTitle: "Revenue / reception, Venezia" },
    areaServed: "IT",
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "The Booking Hack",
    url: APP_CONFIG.siteUrl,
    inLanguage: "it-IT",
    description: "Non pubblichiamo tutto quello che troviamo. Pubblichiamo solo quello che riteniamo davvero interessante.",
    publisher: { "@type": "Organization", name: "The Booking Hack" },
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: canonical(it.path),
    })),
  };
}

export function itemListJsonLd(name: string, path: string, items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name,
    url: canonical(path),
    numberOfItems: items.length,
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      url: canonical(it.path),
    })),
  };
}

export function offerJsonLd(offer: Offer) {
  const path = offerPath(offer);
  const expired = offer.status === "SCADUTO";
  return {
    "@context": "https://schema.org",
    "@graph": [
      breadcrumbJsonLd([
        { name: "Home", path: "/" },
        { name: "Offerte", path: "/offerte" },
        { name: offer.title, path },
      ]),
      {
        "@type": "Offer",
        name: offer.title,
        description: offer.verdict || offer.description,
        url: canonical(path),
        price: offer.price,
        priceCurrency: "EUR",
        availability: expired ? "https://schema.org/SoldOut" : "https://schema.org/LimitedAvailability",
        image: offer.imageUrl,
        seller: { "@type": "Organization", name: "The Booking Hack" },
      },
    ],
  };
}

export function articleJsonLd(input: {
  headline: string;
  description: string;
  path: string;
  datePublished: string;
  image?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: input.headline,
    description: input.description,
    inLanguage: "it-IT",
    datePublished: input.datePublished,
    url: canonical(input.path),
    image: input.image,
    author: { "@type": "Person", name: "Filippo" },
    publisher: { "@type": "Organization", name: "The Booking Hack", url: APP_CONFIG.siteUrl },
  };
}
