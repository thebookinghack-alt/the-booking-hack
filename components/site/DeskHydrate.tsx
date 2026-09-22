import { useRouterState } from "@tanstack/react-router";
import { useEffect } from "react";
import { setSheetLive } from "@/lib/offers/adapter-live";
import { track } from "@/lib/offers/analytics";
import { useDeskStore } from "@/lib/offers/store";

export function DeskHydrate() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    void useDeskStore.persist.rehydrate().then(() => {
      const s = useDeskStore.getState();
      if (s.sheetSource) setSheetLive(true, s.sheetSource, s.offers.length);
    });
  }, []);

  useEffect(() => {
    track("page_view", { path: pathname });
    const seen = new Set<number>();
    const onScroll = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      if (h <= 0) return;
      const pct = (window.scrollY / h) * 100;
      for (const mark of [50, 90]) {
        if (pct >= mark && !seen.has(mark)) {
          seen.add(mark);
          track("scroll_depth", { pct: mark, path: pathname });
        }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  return null;
}
