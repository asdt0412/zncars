"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import type { DateRange } from "react-day-picker";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { expandBookedDays } from "@/lib/availability";
import { computeRentalQuote } from "@/lib/pricing";
import { formatEuros, toIsoDate } from "@/lib/utils";
import type { Vehicle } from "@/types";

export function AvailabilityCalendar({
  vehicle,
  bookedRanges,
}: {
  vehicle: Vehicle;
  bookedRanges: { start: string; end: string }[];
}) {
  const router = useRouter();
  const [range, setRange] = useState<DateRange | undefined>();
  const bookedDays = useMemo(() => expandBookedDays(bookedRanges), [bookedRanges]);

  const quote =
    range?.from && range?.to
      ? computeRentalQuote(vehicle.pricePerDay, toIsoDate(range.from), toIsoDate(range.to))
      : null;

  function reserve() {
    if (!range?.from || !range.to) return;
    const params = new URLSearchParams({
      vehicule: vehicle.id,
      debut: toIsoDate(range.from),
      fin: toIsoDate(range.to),
    });
    router.push(`/reservation?${params.toString()}`);
  }

  return (
    <div className="border border-ivory/10 bg-ink-soft p-5">
      <p className="text-[11px] uppercase tracking-[0.18em] text-gold">Disponibilité</p>
      <p className="mt-2 text-sm text-ivory/55">Sélectionnez vos dates de retrait et de restitution.</p>

      <div className="mt-4 overflow-x-auto">
        <Calendar
          mode="range"
          selected={range}
          onSelect={setRange}
          disabled={[
            { before: new Date() },
            (date) => bookedDays.has(toIsoDate(date)),
          ]}
          numberOfMonths={1}
        />
      </div>

      {quote ? (
        <p className="mt-4 text-sm text-ivory/70">
          {quote.days} jour{quote.days > 1 ? "s" : ""} · {formatEuros(quote.totalAmount)} · acompte{" "}
          {formatEuros(quote.depositAmount)}
        </p>
      ) : null}

      <Button
        type="button"
        size="lg"
        className="mt-5 w-full"
        disabled={!range?.from || !range.to}
        onClick={reserve}
      >
        Réserver avec acompte
      </Button>
    </div>
  );
}
