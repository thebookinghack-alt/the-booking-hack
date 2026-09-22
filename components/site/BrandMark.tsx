import { Link } from "@tanstack/react-router";

/** Lockup D · Tag: wordmark + HACK as the same pink label used on deal cards. */
export function HackTag({ className = "" }: { className?: string }) {
  return (
    <span
      className={`inline-flex -rotate-2 items-center border-3 border-ink bg-pink px-2 py-0.5 font-display font-bold leading-none tracking-tight text-ink shadow-[3px_3px_0_#111827] ${className}`}
    >
      HACK
    </span>
  );
}

export function BrandMark({ compact = false }: { compact?: boolean }) {
  if (compact) {
    return (
      <Link to="/" className="inline-flex min-h-11 items-center no-underline" aria-label="The Booking Hack — home">
        <span className="grid size-9 place-items-center rounded-md border-3 border-ink bg-pink shadow-[3px_3px_0_#111827] font-display text-base font-bold">
          H
        </span>
      </Link>
    );
  }

  return (
    <Link to="/" className="flex min-h-11 items-center gap-2 no-underline" aria-label="The Booking Hack — home">
      <span className="font-display text-[13px] font-bold tracking-tight whitespace-nowrap sm:text-[15px] md:text-xl">THE BOOKING</span>
      <HackTag className="text-[13px] md:text-base" />
    </Link>
  );
}
