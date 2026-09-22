import { useState } from "react";
import { Button } from "@/components/ui/button";
import { track } from "@/lib/offers/analytics";
import { APP_CONFIG, NEWSLETTER_SEGMENTS } from "@/lib/offers/config";

export function NewsletterForm({ featured }: { featured?: boolean }) {
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [error, setError] = useState("");
  const [ok, setOk] = useState("");

  function submit(e: React.FormEvent) {
    e.preventDefault();
    setOk("");
    track("newsletter_submitted");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Inserisci un’email valida.");
      return;
    }
    if (!consent) {
      setError("Serve il consenso al trattamento per la newsletter.");
      return;
    }
    track("newsletter_signup");
    if (APP_CONFIG.newsletterProvider === "none") {
      setError("");
      setOk("Provider newsletter non collegato (demo). Nessun dato è stato inviato.");
      return;
    }
    setError("");
    setOk(`Iscrizione registrata per ${email}.`);
  }

  return (
    <section
      className={`mt-10 rounded-xl border-3 border-ink p-5 md:p-8 ${featured ? "bg-ink text-surface" : "bg-surface"}`}
      aria-labelledby="nl-h"
    >
      <p className={`text-xs font-bold uppercase ${featured ? "text-yellow" : "text-muted"}`}>Inbox, non rumore</p>
      <h2 id="nl-h" className="mt-2 font-display text-3xl md:text-4xl">
        I migliori Hack arrivano in inbox.
      </h2>
      <p className={`mt-2 max-w-xl text-sm md:text-base ${featured ? "text-surface/80" : "text-muted"}`}>
        Non tutto quello che troviamo. Solo quello che vale la pena aprire. Double opt-in, disiscrizione e segmentazione in produzione — oggi il provider è spento.
      </p>
      <form className="mt-5 flex flex-col gap-3" onSubmit={submit} noValidate>
        <div>
          <label htmlFor="nl-email" className="text-sm font-semibold">
            Email
          </label>
          <input
            id="nl-email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onFocus={() => track("newsletter_started")}
            className="mt-1 min-h-11 w-full rounded-md border-3 border-ink bg-surface px-3 text-ink"
            aria-invalid={Boolean(error)}
            aria-describedby={error ? "nl-err" : undefined}
            required
          />
        </div>
        <label className="flex min-h-11 items-start gap-2 text-sm">
          <input type="checkbox" className="mt-1 size-5" checked={consent} onChange={(e) => setConsent(e.target.checked)} />
          Accetto il trattamento dei dati per ricevere le offerte, come da privacy policy.
        </label>
        <p className={`text-xs ${featured ? "text-surface/70" : "text-muted"}`}>
          Segmenti futuri (da collegare): {NEWSLETTER_SEGMENTS.join(" · ")}
        </p>
        {error ? (
          <p id="nl-err" className="text-sm font-semibold text-pink" role="alert">
            {error}
          </p>
        ) : null}
        {ok ? (
          <p className="text-sm font-semibold" role="status">
            {ok}
          </p>
        ) : null}
        <Button variant={featured ? "yellow" : "primary"} type="submit">
          Iscrivimi
        </Button>
      </form>
    </section>
  );
}
