import type { Category } from "./types";

export type ScoutTemplate = {
  hash: string;
  category: Category;
  origin: string;
  destination: string;
  title: string;
  price: number;
  oldPrice: number;
  locationScore: number;
  imageUrl: string;
  imageAlt: string;
  source: string;
};

export const SCOUT_POOL: ScoutTemplate[] = [
  {
    hash: "mxp-nrt",
    category: "VOLI",
    origin: "Milano",
    destination: "Tokyo, Giappone",
    title: "Milano → Tokyo",
    price: 429,
    oldPrice: 790,
    locationScore: 9,
    imageUrl: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Tokyo",
    source: "feed-voli",
  },
  {
    hash: "vce-bcn",
    category: "VOLI",
    origin: "Venezia",
    destination: "Barcellona, Spagna",
    title: "Venezia → Barcellona",
    price: 47,
    oldPrice: 112,
    locationScore: 8,
    imageUrl: "https://images.unsplash.com/photo-1583422409516-2895a77efded?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Barcellona",
    source: "feed-voli",
  },
  {
    hash: "blq-lis",
    category: "VOLI",
    origin: "Bologna",
    destination: "Lisbona, Portogallo",
    title: "Bologna → Lisbona",
    price: 68,
    oldPrice: 140,
    locationScore: 9,
    imageUrl: "https://images.unsplash.com/photo-1555881400-74d7acaacd8b?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Lisbona",
    source: "feed-voli",
  },
  {
    hash: "fco-jfk",
    category: "VOLI",
    origin: "Roma",
    destination: "New York, USA",
    title: "Roma → New York",
    price: 338,
    oldPrice: 540,
    locationScore: 8,
    imageUrl: "https://images.unsplash.com/photo-1485871981521-5b1fd3805eee?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "New York",
    source: "feed-voli",
  },
  {
    hash: "tsf-ath",
    category: "VOLI",
    origin: "Treviso",
    destination: "Atene, Grecia",
    title: "Treviso → Atene",
    price: 39,
    oldPrice: 98,
    locationScore: 8,
    imageUrl: "https://images.unsplash.com/photo-1555993539-1732b0258235?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Atene",
    source: "feed-voli",
  },
  {
    hash: "hotel-crete",
    category: "HOTEL",
    origin: "—",
    destination: "Chania, Grecia",
    title: "Hotel vista mare a Creta",
    price: 142,
    oldPrice: 214,
    locationScore: 9,
    imageUrl: "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Creta",
    source: "feed-hotel",
  },
  {
    hash: "hotel-amalfi",
    category: "PACCHETTI",
    origin: "Milano",
    destination: "Amalfi, Italia",
    title: "Fuga in Costiera",
    price: 239,
    oldPrice: 330,
    locationScore: 10,
    imageUrl: "https://images.unsplash.com/photo-1533104816931-20fa691ff6ca?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Costiera Amalfitana",
    source: "feed-pacchetti",
  },
  {
    hash: "hotel-zanzibar",
    category: "PACCHETTI",
    origin: "Milano",
    destination: "Zanzibar, Tanzania",
    title: "Relax a Zanzibar",
    price: 799,
    oldPrice: 1090,
    locationScore: 10,
    imageUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Zanzibar",
    source: "feed-pacchetti",
  },
];
