import { createFileRoute } from "@tanstack/react-router";
import { Breadcrumb } from "@/components/site/Breadcrumb";
import { DemoChip } from "@/components/site/DemoChip";
import { JsonLd } from "@/components/site/JsonLd";
import { NewsletterForm } from "@/components/site/NewsletterForm";
import { ANALYTICS_NOTE } from "@/lib/offers/analytics";
import { APP_CONFIG } from "@/lib/offers/config";
import { breadcrumbJsonLd, pageHead } from "@/lib/seo";

export const Route = createFileRoute("/newsletter")({
  component: NewsletterPage,
  head: () =>
    pageHead(
      "Newsletter | The Booking Hack",
      "I migliori Hack arrivano in inbox. Non tutto quello che troviamo. Solo quello che vale la pena aprire.",
      "/newsletter",
    ),
});

function NewsletterPage() {
  return (
    <main className="mx-auto w-[min(720px,calc(100%-1.5rem))] py-8">
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Newsletter", path: "/newsletter" }])} />
      <Breadcrumb items={[{ label: "Home", to: "/" }, { label: "Newsletter" }]} />
      <DemoChip>
        Provider newsletter: {APP_CONFIG.newsletterProvider === "none" ? "non collegato" : APP_CONFIG.newsletterProvider}
      </DemoChip>
      <h1 className="sr-only">Newsletter The Booking Hack</h1>
      <NewsletterForm featured />
      <p className="mt-4 text-xs text-muted">{ANALYTICS_NOTE}</p>
    </main>
  );
}
