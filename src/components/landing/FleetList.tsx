import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { VehiclePhoto } from "@/components/vehicles/VehiclePhoto";
import { formatEuros } from "@/lib/utils";
import { getVehicleLabel } from "@/data/vehicles";
import type { Vehicle } from "@/types";

export function FleetList({ vehicles }: { vehicles: Vehicle[] }) {
  return (
    <ul className="divide-y divide-ivory/10 border-t border-ivory/10 md:hidden">
      {vehicles.map((vehicle, index) => (
        <li key={vehicle.id}>
          <Link
            href={`/vehicules/${vehicle.slug}`}
            className="flex items-center gap-4 px-5 py-4"
            aria-label={`${getVehicleLabel(vehicle)}, ${vehicle.specs.powerHp} CV, ${formatEuros(vehicle.pricePerDay)} par jour`}
          >
            <div className="relative h-36 w-48 shrink-0 border border-gold bg-ink p-px">
              <div className="relative h-full w-full overflow-hidden">
                <VehiclePhoto
                  src={vehicle.images[0]}
                  alt={`${getVehicleLabel(vehicle)} — vue trois-quarts`}
                  sizes="192px"
                  position={vehicle.imagePosition ?? "center"}
                  priority={index < 2}
                  className="object-cover"
                />
              </div>
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-[11px] uppercase tracking-[0.18em] text-gold">{vehicle.brand}</p>
              <h3 className="mt-1 truncate text-xl leading-tight text-ivory">{vehicle.model}</h3>
              <div className="mt-2 flex items-baseline justify-between gap-3 text-sm">
                <span className="text-ivory/55">{vehicle.specs.powerHp} CV</span>
                <span className="tabular-nums text-ivory">
                  {formatEuros(vehicle.pricePerDay)}
                  <span className="text-ivory/40"> / jour</span>
                </span>
              </div>
            </div>
            <ChevronRight
              className="h-4 w-4 shrink-0 text-ivory/30"
              strokeWidth={1.25}
              aria-hidden
            />
          </Link>
        </li>
      ))}
    </ul>
  );
}
