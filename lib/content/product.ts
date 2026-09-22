import type { Category } from "@/lib/offers/types";

export const CATEGORY_INTRO: Record<Category, { title: string; kicker: string; description: string }> = {
  VOLI: {
    title: "Voli selezionati",
    kicker: "Non un motore di ricerca",
    description:
      "Error fare e tratte che valgono il click, dopo checklist. Il bot porta candidati. Filippo decide cosa pubblicare.",
  },
  HOTEL: {
    title: "Hotel selezionati",
    kicker: "Posizione prima del gimmick",
    description:
      "Strutture dove la location e il prezzo stanno insieme. Niente 2.000 risultati: solo pick che terrei per un amico.",
  },
  PACCHETTI: {
    title: "Pacchetti selezionati",
    kicker: "Quando il fai-da-te perde",
    description:
      "Weekend e soggiorni in cui il pacchetto batte assemblare volo + hotel da soli. Condizioni sempre da leggere sul partner.",
  },
  VENEZIA: {
    title: "Venezia, pick da chi ci lavora",
    kicker: "Secondo pilastro",
    description:
      "Hotel, basi e esperienze a Venezia e Mestre. Poca automazione, firma umana. Non è un portale turistico.",
  },
};

export const PROCESS_STEPS = [
  { k: "01", t: "Il bot cerca", d: "Scout raccoglie candidati da feed mock. Non pubblica." },
  { k: "02", t: "L'algoritmo filtra", d: "Cleaner, scoring 40/30/30, soglie. Resta poco." },
  { k: "03", t: "Filippo verifica", d: "Checklist da 12 punti. Senza i bloccanti non si approva." },
  { k: "04", t: "Tu decidi se partire", d: "Vedi prezzo, limiti, freshness. Poi clicchi il partner." },
] as const;
