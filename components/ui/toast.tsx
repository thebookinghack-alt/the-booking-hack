import { useEffect } from "react";
import { useDeskStore } from "@/lib/offers/store";

export function ToastHost() {
  const toast = useDeskStore((s) => s.toast);
  const clearToast = useDeskStore((s) => s.clearToast);

  useEffect(() => {
    if (!toast) return;
    const t = window.setTimeout(clearToast, 4200);
    return () => window.clearTimeout(t);
  }, [toast, clearToast]);

  if (!toast) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="pointer-events-none fixed inset-x-0 z-50 flex justify-center px-3"
      style={{ bottom: "max(5.75rem, calc(env(safe-area-inset-bottom) + 4.75rem))" }}
    >
      <p className="pointer-events-auto max-w-md rounded-md border-3 border-ink bg-yellow px-4 py-3 text-sm font-semibold shadow-offset">
        {toast}
      </p>
    </div>
  );
}
