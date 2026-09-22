export type MapPoint = {
  id: string;
  name: string;
  lat: number;
  lng: number;
  kind: "hotel" | "bacaro" | "base" | "percorso";
  blurb: string;
};

export const VENICE_POINTS: MapPoint[] = [
  {
    id: "dorsoduro",
    name: "Dorsoduro — base a piedi",
    lat: 45.4308,
    lng: 12.3266,
    kind: "hotel",
    blurb: "Campi più calmi, Accademia e Zattere. Buona prima volta se non vuoi San Marco in camera.",
  },
  {
    id: "rialto-bacari",
    name: "Bacari dietro Rialto",
    lat: 45.4381,
    lng: 12.3358,
    kind: "bacaro",
    blurb: "Cicchetti lontano dalla foto del ponte. Un giro, non un tour da 4 ore.",
  },
  {
    id: "cannaregio",
    name: "Cannaregio — sera senza coda",
    lat: 45.4445,
    lng: 12.326,
    kind: "percorso",
    blurb: "Strada Nova va evitata all’ora di punta. Dietro, verso il ghetto, si cammina.",
  },
  {
    id: "mestre",
    name: "Mestre FS — 10 minuti",
    lat: 45.4825,
    lng: 12.2319,
    kind: "base",
    blurb: "Ha senso se arrivi tardi o conti il budget. Non è “Venezia falsa”: è la porta regionale.",
  },
];
