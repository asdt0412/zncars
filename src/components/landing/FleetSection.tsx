import { FadeIn } from "@/components/motion/FadeIn";
import { FleetList } from "@/components/landing/FleetList";
import { VehicleCard } from "@/components/vehicles/VehicleCard";
import type { Vehicle } from "@/types";

export function FleetSection({ vehicles }: { vehicles: Vehicle[] }) {
  return (
    <section id="flotte" className="scroll-mt-20 bg-ink pb-0 pt-16 md:px-8 md:pb-24 md:pt-20">
      <div className="mx-auto max-w-6xl">
        <FadeIn className="px-5 md:px-0">
          <p className="text-[11px] uppercase tracking-luxury text-gold">La flotte</p>
          <h2 className="mt-3 text-3xl leading-tight text-ivory md:text-5xl">
            Six silhouettes. Aucun compromis.
          </h2>
        </FadeIn>

        <div className="mt-8 md:hidden">
          <FleetList vehicles={vehicles} />
        </div>

        <div className="mt-14 hidden grid-cols-2 gap-6 md:grid lg:grid-cols-3">
          {vehicles.map((vehicle, index) => (
            <FadeIn key={vehicle.id} delay={index * 0.05}>
              <VehicleCard vehicle={vehicle} index={index} />
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
