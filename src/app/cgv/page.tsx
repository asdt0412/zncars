import type { Metadata } from "next";
import { getDepositRate } from "@/lib/config";

export const metadata: Metadata = {
  title: "Conditions générales",
};

export default function CgvPage() {
  const depositPercent = Math.round(getDepositRate() * 100);

  return (
    <article className="bg-ink px-5 pb-24 pt-28 md:px-8">
      <div className="mx-auto max-w-2xl space-y-6 text-sm leading-relaxed text-ivory/65">
        <h1 className="font-serif text-4xl text-ivory">Conditions générales de location</h1>
        <p>
          La réservation est ferme après encaissement de l&apos;acompte ({depositPercent} % du montant
          total). Le solde est exigible à la remise du véhicule.
        </p>
        <p>
          Conducteur : 23 ans minimum, permis depuis plus de deux ans. Un second conducteur est
          inclus aux mêmes conditions.
        </p>
        <p>
          Annulation : acompte remboursable jusqu&apos;à 48 heures avant le retrait, hors week-ends et
          jours fériés. Au-delà, l&apos;acompte reste acquis.
        </p>
        <p>
          Franchise, caution et limitations kilométriques sont précisées au contrat remis le jour du
          départ.
        </p>
      </div>
    </article>
  );
}
