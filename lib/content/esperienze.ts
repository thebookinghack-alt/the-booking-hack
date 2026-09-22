export type EditorialNote = {
  id: string;
  title: string;
  place: string;
  dateLabel: string;
  body: string;
  related: { href: string; label: string }[];
};

/** Prima persona, dichiaratamente editoriale. Nessun nome di terzi. */
export const EDITORIAL_NOTES: EditorialNote[] = [
  {
    id: "dorsoduro-notte",
    title: "Una notte a Dorsoduro senza la coda di San Marco",
    place: "Venezia",
    dateLabel: "Nota editoriale · bozza demo",
    body: "Quando consiglio Dorsoduro non è per snobismo: è perché la mattina puoi uscire e camminare senza dover decidere subito se sei in vacanza o in transito. L’hotel che tengo d’occhio in catalogo non è “il più bello di Venezia”. È quello da cui, se sbagli ristorante, non hai sbagliato la giornata. Questa non è una recensione di clienti: è quello che direi a un amico che arriva stanco dal treno.",
    related: [
      { href: "/offerte/venezia-dorsoduro", label: "Boutique hotel a Dorsoduro" },
      { href: "/venezia", label: "Guida Venezia" },
    ],
  },
  {
    id: "tokyo-diretto",
    title: "Il diretto Milano–Tokyo sotto i 450€",
    place: "Tokyo",
    dateLabel: "Nota editoriale · bozza demo",
    body: "Un error fare vero si riconosce da tre cose: il prezzo esce dal corridoio storico, la tratta non è un hop assurdo, e le condizioni non sono scritte in un font da 8 punti. Questo diretto lo terrei. Non lo comprerei al buio: bagaglio e cambio data restano il rischio. Lo pubblico perché, se i numeri tornano sul partner, è il tipo di volo che io prenderei.",
    related: [
      { href: "/offerte/tokyo-02", label: "Volo Milano → Tokyo" },
      { href: "/blog/come-leggiamo-un-error-fare", label: "Come leggo un error fare" },
    ],
  },
  {
    id: "mestre-arrivo",
    title: "Arrivare tardi e dormire a Mestre",
    place: "Mestre",
    dateLabel: "Nota editoriale · bozza demo",
    body: "Mestre non è un compromesso da copertina, è un compromesso da orario. Se il volo atterra a Treviso alle 23, pretendere un hotel “sul canale” è masochismo a pagamento. Dieci minuti di regionale la mattina dopo e sei in calle. Lo dico da chi fa check-in, non da influencer.",
    related: [
      { href: "/offerte/venezia-mestre", label: "Base a Mestre" },
      { href: "/blog/mestre-o-centro", label: "Mestre o centro" },
    ],
  },
];
