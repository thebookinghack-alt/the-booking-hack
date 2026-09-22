import { useState } from "react";
import { Button } from "@/components/ui/button";
import { setSheetLive } from "@/lib/offers/adapter-live";
import { fetchSheetCsv } from "@/lib/offers/fetch-sheet";
import { adapterStatus } from "@/lib/offers/repository";
import { csvToOffers, SHEET_COLUMNS } from "@/lib/offers/sheet";
import { useDeskStore } from "@/lib/offers/store";

export function SheetPanel() {
  const applySheet = useDeskStore((s) => s.applySheet);
  const sheetSource = useDeskStore((s) => s.sheetSource);
  const sheetLoadedAt = useDeskStore((s) => s.sheetLoadedAt);
  const adapter = adapterStatus();
  const [url, setUrl] = useState("");
  const [paste, setPaste] = useState("");
  const [msg, setMsg] = useState("");
  const [busy, setBusy] = useState(false);

  function applyCsv(csv: string, source: string) {
    const parsed = csvToOffers(csv);
    if (parsed.errors.length && !parsed.offers.length) {
      setMsg(parsed.errors.join(" · "));
      return;
    }
    const r = applySheet(parsed.offers, source);
    setSheetLive(r.ok, source, parsed.offers.length);
    setMsg(
      r.ok
        ? `${r.message}${parsed.errors.length ? ` Avvisi: ${parsed.errors.length}` : ""}`
        : r.message,
    );
  }

  async function loadTemplate() {
    setBusy(true);
    setMsg("");
    try {
      const res = await fetch("/catalogo.csv");
      const csv = await res.text();
      applyCsv(csv, "catalogo.csv (modello)");
    } catch {
      setMsg("Impossibile leggere /catalogo.csv");
    } finally {
      setBusy(false);
    }
  }

  async function loadGoogle() {
    setBusy(true);
    setMsg("");
    try {
      const res = await fetchSheetCsv({ data: { url } });
      if (!res.ok) setMsg(res.error);
      else applyCsv(res.csv, res.from);
    } catch (e) {
      setMsg(e instanceof Error ? e.message : "Fetch foglio fallito");
    } finally {
      setBusy(false);
    }
  }

  function onFile(f: File | undefined) {
    if (!f) return;
    const reader = new FileReader();
    reader.onload = () => applyCsv(String(reader.result ?? ""), f.name);
    reader.readAsText(f);
  }

  return (
    <div className="space-y-6">
      <div className="rounded-xl border-3 border-ink bg-surface p-5">
        <h2 className="font-display text-2xl">Catalogo da foglio</h2>
        <p className="mt-2 text-sm text-muted">
          Domani non tocchi il codice: una riga = un’offerta. Adapter ora: {adapter.label}. {adapter.note}
        </p>
        {sheetSource ? (
          <p className="mt-2 text-sm font-bold">
            Ultimo import: {sheetSource}
            {sheetLoadedAt ? ` · ${new Date(sheetLoadedAt).toLocaleString("it-IT")}` : ""}
          </p>
        ) : null}
        <ol className="mt-4 list-decimal space-y-1 pl-5 text-sm text-muted">
          <li>Apri Google Sheets → File → Importa → carica <a className="font-bold underline" href="/catalogo.csv" download>catalogo.csv</a></li>
          <li>Compila. status = PUBBLICATO solo dopo i 7 check bloccanti (a mano).</li>
          <li>File → Condividi → Pubblica sul web → foglio → CSV. Incolla l’URL qui sotto.</li>
          <li>In alternativa: esporta CSV e caricalo, o incolla le righe.</li>
        </ol>
        <p className="mt-3 text-xs text-muted">
          Nessuna API key. Il fetch di Google passa dal server (niente CORS). URL affiliato placeholder → Approva resta spento.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-xl border-3 border-ink bg-surface p-5">
          <h3 className="font-display text-lg">1. Modello demo</h3>
          <Button variant="primary" className="mt-3" disabled={busy} onClick={loadTemplate}>
            Carica catalogo.csv
          </Button>
        </div>
        <div className="rounded-xl border-3 border-ink bg-surface p-5">
          <h3 className="font-display text-lg">2. File CSV</h3>
          <input
            type="file"
            accept=".csv,text/csv"
            className="mt-3 block w-full text-sm"
            onChange={(e) => onFile(e.target.files?.[0])}
          />
        </div>
        <div className="rounded-xl border-3 border-ink bg-surface p-5 md:col-span-2">
          <h3 className="font-display text-lg">3. URL Google Sheets</h3>
          <div className="mt-3 flex flex-col gap-2 sm:flex-row">
            <input
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://docs.google.com/spreadsheets/d/…/export?format=csv"
              className="min-h-11 flex-1 rounded-md border-3 border-ink px-3"
            />
            <Button variant="primary" disabled={busy || !url.trim()} onClick={loadGoogle}>
              Importa foglio
            </Button>
          </div>
        </div>
        <div className="rounded-xl border-3 border-ink bg-surface p-5 md:col-span-2">
          <h3 className="font-display text-lg">4. Incolla CSV</h3>
          <textarea
            value={paste}
            onChange={(e) => setPaste(e.target.value)}
            rows={6}
            className="mt-3 w-full rounded-md border-3 border-ink p-3 font-mono text-xs"
            placeholder="id,slug,status,category,title,..."
          />
          <Button className="mt-2" disabled={!paste.trim()} onClick={() => applyCsv(paste, "incolla")}>
            Applica testo
          </Button>
        </div>
      </div>
      {msg ? <p className="rounded-md border-3 border-ink bg-yellow px-3 py-2 text-sm font-bold">{msg}</p> : null}

      <div className="rounded-xl border-3 border-ink bg-wash p-5">
        <h3 className="font-display text-lg">Colonne</h3>
        <p className="mt-1 text-xs text-muted">La prima riga deve coincidere (spazi ignorati). Obbligatori: title, price. status default CANDIDATO.</p>
        <p className="mt-2 break-all font-mono text-2xs">{SHEET_COLUMNS.join(", ")}</p>
      </div>
    </div>
  );
}
