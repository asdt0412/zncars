/**
 * Configuration métier centralisée.
 * Prête à être alimentée par des variables d'environnement / une DB.
 */
export const siteConfig = {
  name: "ZN Cars Lyon",
  tagline: "L'exception se conduit à Lyon",
  description:
    "Location de véhicules de prestige et sportifs à Lyon. Livraison, assistance 24/7 et acompte en ligne.",
  city: "Lyon",
  address: "28 rue de Bonnel, 69003 Lyon",
  phone: "04 78 42 19 60",
  phoneHref: "+33478421960",
  email: "contact@zncarslyon.fr",
  instagram: {
    handle: "@zncarslyon",
    href: "https://www.instagram.com/zncarslyon",
  },
  snapchat: {
    handle: "RoyalCars69",
    href: "https://www.snapchat.com/add/RoyalCars69",
  },
  pickupLocations: [
    {
      id: "airport" as const,
      label: "Aéroport Lyon-Saint-Exupéry",
      hint: "Livraison au terminal 1 ou 2",
    },
    {
      id: "partdieu" as const,
      label: "Lyon Part-Dieu",
      hint: "Gare et centre d'affaires",
    },
    {
      id: "address" as const,
      label: "Adresse de votre choix",
      hint: "Lyon et proche couronne",
    },
  ],
};

/** Taux d'acompte configurable (30 % par défaut). */
export function getDepositRate() {
  const raw = process.env.NEXT_PUBLIC_DEPOSIT_RATE ?? "0.30";
  const rate = Number.parseFloat(raw);
  if (Number.isNaN(rate) || rate <= 0 || rate >= 1) {
    return 0.3;
  }
  return rate;
}

export function getSiteUrl() {
  return process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
}
