"use client";

import { useRouter } from "next/navigation";
import { useMemo, useState, type FormEvent } from "react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import type { DateRange } from "react-day-picker";
import { CalendarDays } from "lucide-react";
import { vehicles } from "@/data/vehicles";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { VehiclePicker } from "@/components/vehicles/VehiclePicker";
import { toIsoDate } from "@/lib/utils";

export function SearchBar() {
  const router = useRouter();
  const [vehicleId, setVehicleId] = useState<string>("");
  const [range, setRange] = useState<DateRange | undefined>();

  const dateLabel = useMemo(() => {
    if (!range?.from) return "Choisir les dates";
    if (!range.to) return format(range.from, "d MMM", { locale: fr });
    return `${format(range.from, "d MMM", { locale: fr })} — ${format(range.to, "d MMM", { locale: fr })}`;
  }, [range]);

  function onSubmit(event: FormEvent) {
    event.preventDefault();
    const params = new URLSearchParams();
    if (vehicleId) params.set("vehicule", vehicleId);
    if (range?.from) params.set("debut", toIsoDate(range.from));
    if (range?.to) params.set("fin", toIsoDate(range.to));

    if (vehicleId && range?.from && range?.to) {
      router.push(`/reservation?${params.toString()}`);
      return;
    }

    if (vehicleId) {
      const vehicle = vehicles.find((item) => item.id === vehicleId);
      router.push(vehicle ? `/vehicules/${vehicle.slug}` : "/#flotte");
      return;
    }

    router.push("/#flotte");
  }

  return (
    <form
      onSubmit={onSubmit}
      className="grid w-full gap-4 border border-ivory/10 bg-ink/85 p-4 shadow-2xl backdrop-blur-md md:grid-cols-3 md:items-end md:p-5"
    >
      <div>
        <Label htmlFor="search-vehicle">Véhicule</Label>
        <VehiclePicker
          id="search-vehicle"
          value={vehicleId}
          onChange={setVehicleId}
          includeAll
          placeholder="Toute la flotte"
        />
      </div>

      <div>
        <Label id="search-dates-label">Retrait / restitution</Label>
        <Popover>
          <PopoverTrigger asChild>
            <button
              type="button"
              aria-labelledby="search-dates-label"
              className="flex h-12 w-full cursor-pointer items-center justify-between border border-ivory/15 bg-ink-soft px-4 text-left text-base text-ivory hover:border-ivory/30"
            >
              <span className={range?.from ? "capitalize" : "text-ivory/40"}>{dateLabel}</span>
              <CalendarDays className="h-4 w-4 text-ivory/50" aria-hidden />
            </button>
          </PopoverTrigger>
          <PopoverContent align="start">
            <Calendar
              mode="range"
              selected={range}
              onSelect={setRange}
              disabled={{ before: new Date() }}
              numberOfMonths={1}
            />
          </PopoverContent>
        </Popover>
      </div>

      <div>
        <Label className="invisible max-md:hidden" aria-hidden>
          Rechercher
        </Label>
        <Button type="submit" size="lg" className="h-12 w-full px-6">
          Rechercher
        </Button>
      </div>
    </form>
  );
}
