import { useEffect, useRef } from "react";
import { VENICE_POINTS } from "@/lib/content/venice-map";
import "leaflet/dist/leaflet.css";

export function VeniceMap() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let map: import("leaflet").Map | undefined;
    let cancelled = false;
    void import("leaflet").then((L) => {
      if (cancelled || !el) return;
      map = L.map(el, { scrollWheelZoom: false }).setView([45.437, 12.33], 12);
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }).addTo(map);
      const colors: Record<string, string> = {
        hotel: "#0f4c5c",
        bacaro: "#ff2fa3",
        base: "#111827",
        percorso: "#06b6d4",
      };
      VENICE_POINTS.forEach((pt) => {
        L.circleMarker([pt.lat, pt.lng], {
          radius: 10,
          color: "#111827",
          weight: 3,
          fillColor: colors[pt.kind] ?? "#fde047",
          fillOpacity: 1,
        })
          .addTo(map!)
          .bindPopup(`<strong>${pt.name}</strong><br/>${pt.blurb}`);
      });
    });
    return () => {
      cancelled = true;
      map?.remove();
    };
  }, []);

  return (
    <div>
      <div ref={ref} className="h-80 w-full rounded-xl border-3 border-ink bg-wash" role="region" aria-label="Mappa dei punti citati a Venezia" />
      <ul className="mt-3 grid gap-2 text-sm md:grid-cols-2">
        {VENICE_POINTS.map((p) => (
          <li key={p.id} className="rounded-md border-2 border-ink bg-surface p-3">
            <p className="font-bold">{p.name}</p>
            <p className="text-muted">{p.blurb}</p>
          </li>
        ))}
      </ul>
      <p className="mt-2 text-xs text-muted">OpenStreetMap · punti editoriali, non recensioni di attività.</p>
    </div>
  );
}
