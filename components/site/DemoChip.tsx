import { APP_CONFIG } from "@/lib/offers/config";
import type { ReactNode } from "react";

export function DemoChip({ children }: { children?: ReactNode }) {
  return (
    <p className="mb-3 inline-flex items-center rounded-full border-2 border-ink bg-yellow px-3 py-1 text-xs font-bold uppercase">
      {children ?? `Demo ${APP_CONFIG.version} · dati mock · URL reali`}
    </p>
  );
}
