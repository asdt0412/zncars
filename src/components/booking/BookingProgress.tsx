import { cn } from "@/lib/utils";

const steps = ["Dates & lieu", "Vos coordonnées", "Récapitulatif", "Acompte"];

export function BookingProgress({ current }: { current: number }) {
  return (
    <ol className="flex flex-wrap items-center gap-3" aria-label="Progression de la réservation">
      {steps.map((label, index) => {
        const step = index + 1;
        const active = step === current;
        const done = step < current;
        return (
          <li key={label} className="flex items-center gap-3 text-[11px] uppercase tracking-[0.16em]">
            <span
              className={cn(
                "inline-flex h-7 w-7 items-center justify-center border",
                active && "border-gold bg-gold text-ink",
                done && "border-gold/50 text-gold",
                !active && !done && "border-ivory/20 text-ivory/40",
              )}
              aria-current={active ? "step" : undefined}
            >
              {step}
            </span>
            <span className={cn(active ? "text-ivory" : "text-ivory/40")}>{label}</span>
            {index < steps.length - 1 ? <span className="hidden h-px w-8 bg-ivory/15 sm:block" /> : null}
          </li>
        );
      })}
    </ol>
  );
}
