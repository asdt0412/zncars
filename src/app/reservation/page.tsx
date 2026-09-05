import type { Metadata } from "next";
import { BookingWizard } from "@/components/booking/BookingWizard";

export const metadata: Metadata = {
  title: "Réserver",
  description: "Réservez un véhicule ZN Cars Lyon et réglez l'acompte en ligne.",
};

interface PageProps {
  searchParams: {
    vehicule?: string;
    debut?: string;
    fin?: string;
    cancelled?: string;
  };
}

export default function ReservationPage({ searchParams }: PageProps) {
  return (
    <section className="bg-ink px-5 pb-24 pt-28 md:px-8">
      <div className="mx-auto max-w-3xl">
        <p className="text-[11px] uppercase tracking-luxury text-gold">Réservation</p>
        <h1 className="mt-3 font-serif text-4xl text-ivory md:text-5xl">Votre séjour au volant</h1>
        <p className="mt-4 text-ivory/55">
          Quatre étapes. L&apos;acompte est prélevé maintenant, le solde à la remise des clés.
        </p>
        {searchParams.cancelled ? (
          <p role="status" className="mt-6 border border-ivory/15 px-4 py-3 text-sm text-ivory/70">
            Paiement annulé. Votre créneau n&apos;est pas confirmé.
          </p>
        ) : null}
        <div className="mt-10">
          <BookingWizard
            initialVehicleId={searchParams.vehicule}
            initialStart={searchParams.debut}
            initialEnd={searchParams.fin}
          />
        </div>
      </div>
    </section>
  );
}
