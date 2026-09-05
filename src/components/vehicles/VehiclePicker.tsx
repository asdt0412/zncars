"use client";

import { useState } from "react";
import { Check, ChevronDown } from "lucide-react";
import { vehicles, getVehicleLabel } from "@/data/vehicles";
import { formatEuros } from "@/lib/utils";
import { cn } from "@/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { VehiclePhoto } from "@/components/vehicles/VehiclePhoto";
import type { Vehicle } from "@/types";

function Thumb({ vehicle, className }: { vehicle: Vehicle; className?: string }) {
  return (
    <div className={cn("relative shrink-0 overflow-hidden bg-ink", className)}>
      <VehiclePhoto
        src={vehicle.images[0]}
        alt=""
        sizes="80px"
        position={vehicle.imagePosition ?? "center"}
      />
    </div>
  );
}

export function VehiclePicker({
  value,
  onChange,
  includeAll = false,
  id,
  placeholder = "Sélectionner",
}: {
  value: string;
  onChange: (id: string) => void;
  includeAll?: boolean;
  id?: string;
  placeholder?: string;
}) {
  const [open, setOpen] = useState(false);
  const selected = vehicles.find((vehicle) => vehicle.id === value);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          type="button"
          id={id}
          aria-label="Sélectionner un véhicule"
          aria-expanded={open}
          className={cn(
            "flex h-12 w-full cursor-pointer items-center gap-3 border bg-ink-soft px-3 text-left transition-colors duration-300",
            open ? "border-gold" : "border-ivory/15 hover:border-gold/50",
          )}
        >
          {selected ? (
            <>
              <Thumb vehicle={selected} className="h-8 w-12" />
              <span className="min-w-0 flex-1">
                <span className="block truncate text-[10px] uppercase tracking-[0.16em] text-gold">
                  {selected.brand}
                </span>
                <span className="block truncate text-sm text-ivory">{selected.model}</span>
              </span>
            </>
          ) : (
            <span className="flex-1 px-1 text-sm text-ivory/40">{placeholder}</span>
          )}
          <ChevronDown
            className={cn("h-4 w-4 shrink-0 text-gold/70 transition-transform duration-300", open && "rotate-180")}
            aria-hidden
          />
        </button>
      </PopoverTrigger>
      <PopoverContent
        align="start"
        className="w-[var(--radix-popover-trigger-width)] min-w-[20rem] border-gold/25 bg-ink p-1.5 shadow-[0_24px_60px_rgba(0,0,0,0.55)]"
      >
        <div className="max-h-80 overflow-y-auto">
          {includeAll ? (
            <button
              type="button"
              onClick={() => {
                onChange("");
                setOpen(false);
              }}
              className={cn(
                "flex w-full cursor-pointer items-center justify-between px-3 py-2.5 text-left transition-colors duration-200",
                !value ? "bg-gold/10 text-gold" : "text-ivory/70 hover:bg-ivory/5 hover:text-ivory",
              )}
            >
              <span className="text-[11px] uppercase tracking-[0.18em]">Toute la flotte</span>
              {!value ? <Check className="h-3.5 w-3.5" strokeWidth={1.5} /> : null}
            </button>
          ) : null}
          {vehicles.map((vehicle) => {
            const active = vehicle.id === value;
            return (
              <button
                key={vehicle.id}
                type="button"
                onClick={() => {
                  onChange(vehicle.id);
                  setOpen(false);
                }}
                className={cn(
                  "flex w-full cursor-pointer items-center gap-3 px-2 py-2 text-left transition-colors duration-200",
                  active ? "bg-gold/10" : "hover:bg-ivory/5",
                )}
              >
                <Thumb vehicle={vehicle} className="h-12 w-[4.25rem]" />
                <span className="min-w-0 flex-1">
                  <span className="block text-[10px] uppercase tracking-[0.16em] text-gold">
                    {vehicle.brand}
                  </span>
                  <span className="block truncate text-sm text-ivory">{vehicle.model}</span>
                  <span className="mt-0.5 block text-[11px] text-ivory/40">
                    {vehicle.specs.powerHp} CV
                  </span>
                </span>
                <span className="shrink-0 text-right">
                  <span className="block text-sm tabular-nums text-ivory">
                    {formatEuros(vehicle.pricePerDay)}
                  </span>
                  <span className="block text-[10px] uppercase tracking-[0.12em] text-ivory/35">
                    / jour
                  </span>
                </span>
                {active ? (
                  <Check className="h-3.5 w-3.5 shrink-0 text-gold" strokeWidth={1.5} />
                ) : (
                  <span className="w-3.5 shrink-0" aria-hidden />
                )}
                <span className="sr-only">{getVehicleLabel(vehicle)}</span>
              </button>
            );
          })}
        </div>
      </PopoverContent>
    </Popover>
  );
}
