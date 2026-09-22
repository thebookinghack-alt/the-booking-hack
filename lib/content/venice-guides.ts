export const VENICE_NAV = [
  { to: "/venezia", label: "Panoramica" },
  { to: "/venezia/dove-dormire", label: "Dove dormire" },
  { to: "/venezia/48-ore", label: "48 ore" },
] as const;

export const SLEEP_ZONES = [
  {
    id: "dorsoduro",
    title: "Dorsoduro",
    body: "Se è la prima volta e vuoi camminare senza il rumore di San Marco, parti da qui. Accademie, Zattere, campi più calmi. Non è la zona più economica: è quella che ti fa capire la città senza la folla da crociera.",
  },
  {
    id: "cannaregio",
    title: "Cannaregio",
    body: "Vivi come un veneziano che deve fare la spesa. Strada Nova è trafficata; due calli più in là no. Comodo per la stazione. Buon compromesso tra vita vera e vicinanza al resto.",
  },
  {
    id: "san-marco",
    title: "San Marco",
    body: "Comodo e rumoroso. Ha senso se resti una notte, arrivi tardi, o hai poca autonomia a piedi. Non pagare “vista canale” al piano terra umido. La piazza la vedi comunque.",
  },
  {
    id: "mestre",
    title: "Mestre",
    body: "Dieci minuti di treno, prezzo onesto, senso se arrivi tardi o resti due notti strette. Non è “Venezia false”: è la base di chi ci lavora. Non prenderla se sogni di affacciarti su un rio al risveglio.",
  },
] as const;

export const FORTY_EIGHT = [
  {
    title: "Arrivo",
    body: "Se atterri a Marco Polo, Alilaguna o bus+treno. Se atterri a Treviso, bus per Mestre/Venezia. Non il taxi acqueo “perché è la prima volta”: è markup su stanchezza.",
  },
  {
    title: "Giorno 1 — cammina, non colleziona",
    body: "Dorsoduro o Cannaregio al mattino. Un bacaro a pranzo, non un menù fotografico a Rialto. Pomeriggio: un museo o niente. La sera, cicchetti. San Marco dopo le 19, quando i gruppi se ne vanno.",
  },
  {
    title: "Giorno 2 — un’isola o il resto della città",
    body: "O Burano, o la città. Non entrambi. Murano in 40 minuti da turista stanco non vale il vaporetto. Se resti in città: Arsenale, via Garibaldi, o semplicemente perdersi a est.",
  },
  {
    title: "Errori da evitare",
    body: "Tre isole in un pomeriggio. Hotel “vista canale” al piano terra. Comprare il vaporetto per ogni spostamento. Credere che Mestre e Dorsoduro siano intercambiabili.",
  },
] as const;
