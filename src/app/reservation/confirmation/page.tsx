import type { Metadata } from "next";
import Link from "next/link";
import { getReservationRepository } from "@/lib/reservations";
import { getVehicleById, getVehicleLabel } from "@/data/vehicles";
import { siteConfig } from "@/lib/config";
import { formatDateFr, formatEuros } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ClearBookingDraft } from "@/components/booking/ClearBookingDraft";

export const metadata: Metadata = {
  title: "Réservation confirmée",
};

interface PageProps {
  searchParams: {
    session_id?: string;
    reservationId?: string;
  };
}

export default async function ConfirmationPage({ searchParams }: PageProps) {
  const repo = getReservationRepository();
  const reservation = searchParams.reservationId
    ? await repo.findById(searchParams.reservationId)
    : searchParams.session_id
      ? await repo.findByStripeSession(searchParams.session_id)
      : null;

  if (!reservation) {
    return (
      <section className="bg-ink px-5 pb-24 pt-28 md:px-8">
        <div className="mx-auto max-w-xl">
          <h1 className="font-serif text-4xl text-ivory">Réservation introuvable</h1>
          <p className="mt-4 text-ivory/60">
            Si vous venez de payer, patientez quelques secondes puis actualisez cette page.
          </p>
          <Button asChild className="mt-8">
            <Link href="/reservation">Retour à la réservation</Link>
          </Button>
        </div>
      </section>
    );
  }

  const vehicle = getVehicleById(reservation.vehicleId);
  const location =
    reservation.pickupLocation === "address"
      ? reservation.customAddress
      : siteConfig.pickupLocations.find((item) => item.id === reservation.pickupLocation)?.label;

  return (
    <section className="bg-ink px-5 pb-24 pt-28 md:px-8">
      <ClearBookingDraft />
      <div className="mx-auto max-w-2xl">
        <p className="text-[11px] uppercase tracking-luxury text-gold">
          {reservation.status === "confirmed" ? "Confirmée" : "En attente de paiement"}
        </p>
        <h1 className="mt-3 font-serif text-4xl text-ivory md:text-5xl">À très vite à Lyon</h1>
        <p className="mt-4 text-ivory/60">
          Un e-mail de confirmation a été envoyé à {reservation.customer.email}.
        </p>

        <dl className="mt-10 space-y-4 border border-ivory/10 bg-ink-soft p-6 text-sm">
          <Row label="Référence" value={reservation.id.slice(0, 8).toUpperCase()} />
          <Row label="Véhicule" value={vehicle ? getVehicleLabel(vehicle) : reservation.vehicleId} />
          <Row
            label="Dates"
            value={`${formatDateFr(reservation.startDate)} → ${formatDateFr(reservation.endDate)}`}
          />
          <Row label="Retrait" value={location ?? "—"} />
          <Row label="Total" value={formatEuros(reservation.totalAmount)} />
          <Row label="Acompte" value={formatEuros(reservation.depositAmount)} />
          <Row label="Solde sur place" value={formatEuros(reservation.remainingBalance)} />
        </dl>

        <p className="mt-8 text-sm text-ivory/50">
          Une question ? {siteConfig.phone} · {siteConfig.email}
        </p>
        <Button asChild variant="outline" className="mt-8">
          <Link href="/">Retour à l&apos;accueil</Link>
        </Button>
      </div>
    </section>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-6 border-b border-ivory/8 pb-3 last:border-0 last:pb-0">
      <dt className="text-ivory/40">{label}</dt>
      <dd className="text-right text-ivory">{value}</dd>
    </div>
  );
}
