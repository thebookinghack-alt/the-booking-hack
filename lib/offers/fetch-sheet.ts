import { createServerFn } from "@tanstack/react-start";
import { googleCsvExportUrl } from "./sheet";

/** Fetch CSV server-side: Google non espone CORS al browser. Nessuna API key. */
export const fetchSheetCsv = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => {
    const url = typeof data === "object" && data && "url" in data ? String((data as { url: unknown }).url ?? "") : "";
    return { url: url.trim() };
  })
  .handler(async ({ data }) => {
    const csvUrl = googleCsvExportUrl(data.url);
    if (!csvUrl) {
      return { ok: false as const, error: "Accetto solo URL https di Google Sheets (documento o “pubblica sul web” CSV)." };
    }
    const res = await fetch(csvUrl, { redirect: "follow", headers: { Accept: "text/csv,text/plain" } });
    if (!res.ok) {
      return {
        ok: false as const,
        error: `Google ha risposto ${res.status}. Pubblica il foglio: File → Condividi → Pubblica sul web → CSV, oppure “Chiunque con il link”.`,
      };
    }
    const csv = await res.text();
    if (!csv || csv.startsWith("<!DOCTYPE") || csv.includes("<html")) {
      return { ok: false as const, error: "La risposta non è un CSV. Controlla che il foglio sia pubblicato come CSV." };
    }
    return { ok: true as const, csv, from: csvUrl };
  });
