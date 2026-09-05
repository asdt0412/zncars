import type { Vehicle } from "@/types";

/**
 * Flotte fictive cohérente avec un loueur lyonnais de prestige.
 * Les photos Unsplash servent de placeholders cinématiques.
 * Remplacer plus tard par un fetch Prisma : `prisma.vehicle.findMany()`.
 */
export const vehicles: Vehicle[] = [
  {
    id: "audi-rs5",
    slug: "audi-rs5",
    brand: "Audi",
    model: "RS5 Sportback",
    tagline: "Le coupé cinq portes, sans détour",
    description:
      "V6 biturbo, quattro, ligne basse. L'RS5 Sportback est la voiture de ceux qui veulent arriver à Lyon déjà en avance.",
    pricePerDay: 390,
    available: true,
    category: "sport",
    specs: {
      powerHp: 450,
      transmission: "Automatique 8 rapports",
      fuel: "Essence",
      seats: 5,
      acceleration: "3,9 s (0-100)",
      drivetrain: "Quattro",
    },
    imagePosition: "center",
    images: [
      "/flotte/audi-rs5.png",
      "/flotte/audi-rs5-2.png",
      "/flotte/audi-rs5-3.png",
    ],
  },
  {
    id: "mercedes-cla-45",
    slug: "mercedes-cla-45",
    brand: "Mercedes-AMG",
    model: "CLA 45",
    tagline: "Jaune soleil, quatre cylindres en colère",
    description:
      "421 chevaux, 4MATIC+, calandre Panamericana. La CLA 45 AMG traverse Lyon comme une fusée compacte — précise, sonore, impossible à rater.",
    pricePerDay: 420,
    available: true,
    category: "sport",
    specs: {
      powerHp: 421,
      transmission: "DCT 8 rapports",
      fuel: "Essence",
      seats: 5,
      acceleration: "4,0 s (0-100)",
      drivetrain: "4MATIC+",
    },
    imagePosition: "center 58%",
    images: [
      "/flotte/mercedes-cla-45.png",
      "/flotte/mercedes-cla-45-2.png",
      "/flotte/mercedes-cla-45-3.png",
    ],
  },
  {
    id: "bmw-m5",
    slug: "bmw-m5-g90",
    brand: "BMW",
    model: "M5 G90",
    tagline: "La berline qui impose le silence",
    description:
      "Nouvelle génération, calandre lumineuse, plus de 700 chevaux. La M5 G90 traverse Lyon comme si la ville s'écartait.",
    pricePerDay: 620,
    available: true,
    category: "berline",
    specs: {
      powerHp: 727,
      transmission: "Automatique 8 rapports",
      fuel: "Hybride essence",
      seats: 5,
      acceleration: "3,5 s (0-100)",
      drivetrain: "xDrive",
    },
    imagePosition: "center 58%",
    images: [
      "/flotte/bmw-m5-g90.png",
      "/flotte/bmw-m5-g90.png",
      "/flotte/bmw-m5-g90.png",
    ],
  },
  {
    id: "bmw-m3",
    slug: "bmw-m3-touring",
    brand: "BMW",
    model: "M3 Touring",
    tagline: "Le break qui n'a rien d'un compromis",
    description:
      "510 chevaux, cinq places et un coffre qui assume le week-end. La M3 Touring est l'exception utile : départ de Lyon le vendredi, Alpes le samedi.",
    pricePerDay: 470,
    available: true,
    category: "sport",
    specs: {
      powerHp: 510,
      transmission: "Automatique 8 rapports",
      fuel: "Essence",
      seats: 5,
      acceleration: "3,6 s (0-100)",
      drivetrain: "xDrive",
    },
    imagePosition: "62% 68%",
    images: [
      "/flotte/bmw-m3-touring.png",
      "/flotte/bmw-m3-touring-2.png",
      "/flotte/bmw-m3-touring-3.png",
    ],
  },
  {
    id: "audi-r8",
    slug: "audi-r8",
    brand: "Audi",
    model: "R8",
    tagline: "Le V10 Audi, en vert émeraude",
    description:
      "V10 atmosphérique, quattro, ligne rasante. L'R8 est la supercar qui traverse Lyon sans demander la permission — plaque ZNCARS, présence totale.",
    pricePerDay: 990,
    available: true,
    category: "sport",
    specs: {
      powerHp: 620,
      transmission: "S tronic 7 rapports",
      fuel: "Essence",
      seats: 2,
      acceleration: "3,1 s (0-100)",
      drivetrain: "Quattro",
    },
    imagePosition: "center",
    images: [
      "/flotte/audi-r8.png",
      "/flotte/audi-r8-2.png",
      "/flotte/audi-r8-3.png",
    ],
  },
  {
    id: "audi-rs3",
    slug: "audi-rs3-8y",
    brand: "Audi",
    model: "RS3 8Y",
    tagline: "Cinq cylindres, format berline",
    description:
      "400 chevaux, quattro, sonorité inimitable. L'RS3 8Y est la plus nerveuse des berlines ZN Cars — parfaite pour Lyon et la sortie d'autoroute.",
    pricePerDay: 290,
    available: true,
    category: "berline",
    specs: {
      powerHp: 400,
      transmission: "S tronic 7 rapports",
      fuel: "Essence",
      seats: 5,
      acceleration: "3,8 s (0-100)",
      drivetrain: "Quattro",
    },
    imagePosition: "center 62%",
    images: [
      "/flotte/audi-rs3-8y.png",
      "/flotte/audi-rs3-2.png",
      "/flotte/audi-rs3-3.png",
    ],
  },
];

export function getVehicleBySlug(slug: string) {
  return vehicles.find((vehicle) => vehicle.slug === slug);
}

export function getVehicleById(id: string) {
  return vehicles.find((vehicle) => vehicle.id === id);
}

export function getVehicleLabel(vehicle: Vehicle) {
  return `${vehicle.brand} ${vehicle.model}`;
}
