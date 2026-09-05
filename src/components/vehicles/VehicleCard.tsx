"use client";

import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { VehiclePhoto } from "@/components/vehicles/VehiclePhoto";
import { formatEuros } from "@/lib/utils";
import { getVehicleLabel } from "@/data/vehicles";
import type { Vehicle } from "@/types";

export function VehicleCard({ vehicle, index = 0 }: { vehicle: Vehicle; index?: number }) {
  return (
    <Link
      href={`/vehicules/${vehicle.slug}`}
      className="group block"
      style={{ transitionDelay: `${index * 40}ms` }}
    >
      <article className="overflow-hidden border border-ivory/10 bg-ink-soft">
        <div className="relative aspect-[5/4] overflow-hidden bg-ink">
          <VehiclePhoto
            src={vehicle.images[0]}
            alt={`${getVehicleLabel(vehicle)} — vue trois-quarts`}
            sizes="(max-width: 1024px) 50vw, 33vw"
            position={vehicle.imagePosition ?? "center 62%"}
            className="transition-transform duration-500 ease-out group-hover:scale-[1.03]"
          />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-ink/50 to-transparent" />
          <Badge className="absolute left-4 top-4">
            {vehicle.available ? "Disponible" : "Indisponible"}
          </Badge>
        </div>
        <div className="space-y-3 p-5">
          <p className="text-[11px] uppercase tracking-[0.2em] text-gold">{vehicle.brand}</p>
          <h3 className="text-2xl text-ivory">{vehicle.model}</h3>
          <div className="flex items-end justify-between text-sm text-ivory/60">
            <span>{vehicle.specs.powerHp} CV</span>
            <span className="tabular-nums text-ivory">
              {formatEuros(vehicle.pricePerDay)}
              <span className="text-ivory/45"> / jour</span>
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}
