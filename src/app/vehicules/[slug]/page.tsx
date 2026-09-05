import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { vehicles, getVehicleBySlug, getVehicleLabel } from "@/data/vehicles";
import { getReservationRepository } from "@/lib/reservations";
import { getBookedRanges } from "@/lib/availability";
import { formatEuros } from "@/lib/utils";
import { VehicleGallery } from "@/components/vehicles/VehicleGallery";
import { VehicleSpecs } from "@/components/vehicles/VehicleSpecs";
import { AvailabilityCalendar } from "@/components/vehicles/AvailabilityCalendar";
import { FadeIn } from "@/components/motion/FadeIn";

interface PageProps {
  params: { slug: string };
}

export function generateStaticParams() {
  return vehicles.map((vehicle) => ({ slug: vehicle.slug }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const vehicle = getVehicleBySlug(params.slug);
  if (!vehicle) return { title: "Véhicule" };
  return {
    title: getVehicleLabel(vehicle),
    description: vehicle.description,
  };
}

export default async function VehiclePage({ params }: PageProps) {
  const vehicle = getVehicleBySlug(params.slug);
  if (!vehicle) notFound();

  const reservations = await getReservationRepository().findByVehicle(vehicle.id);
  const bookedRanges = getBookedRanges(reservations);

  return (
    <article className="bg-ink px-5 pb-24 pt-28 md:px-8">
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[1.15fr_0.85fr]">
        <div>
          <FadeIn>
            <p className="text-[11px] uppercase tracking-luxury text-gold">
              <Link href="/#flotte" className="hover:text-gold-hover">
                Flotte
              </Link>
              <span className="text-ivory/30"> / </span>
              {vehicle.brand}
            </p>
            <h1 className="mt-3 font-serif text-4xl text-ivory md:text-6xl">{vehicle.model}</h1>
            <p className="mt-4 max-w-xl text-ivory/60">{vehicle.tagline}</p>
            <div className="mt-6 h-px w-16 bg-gold/70" />
          </FadeIn>
          <FadeIn delay={0.08} className="mt-8">
            <VehicleGallery
              images={vehicle.images}
              alt={getVehicleLabel(vehicle)}
              position={vehicle.imagePosition}
            />
          </FadeIn>
          <FadeIn delay={0.14} className="mt-10">
            <p className="text-[11px] uppercase tracking-luxury text-gold">Le véhicule</p>
            <p className="mt-3 max-w-2xl text-base leading-relaxed text-ivory/70">{vehicle.description}</p>
          </FadeIn>
          <FadeIn delay={0.2} className="mt-10">
            <p className="mb-4 text-[11px] uppercase tracking-luxury text-gold">Fiche technique</p>
            <VehicleSpecs specs={vehicle.specs} />
          </FadeIn>
        </div>

        <aside className="lg:sticky lg:top-28 lg:self-start">
          <FadeIn delay={0.1}>
            <p className="font-serif text-4xl text-ivory">
              {formatEuros(vehicle.pricePerDay)}
              <span className="ml-2 text-base text-ivory/45">/ jour</span>
            </p>
            <div className="mt-6">
              <AvailabilityCalendar vehicle={vehicle} bookedRanges={bookedRanges} />
            </div>
          </FadeIn>
        </aside>
      </div>
    </article>
  );
}
