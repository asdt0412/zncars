import type { VehicleSpecs as Specs } from "@/types";

const rows: { key: keyof Specs; label: string }[] = [
  { key: "powerHp", label: "Puissance" },
  { key: "transmission", label: "Transmission" },
  { key: "fuel", label: "Carburant" },
  { key: "seats", label: "Places" },
  { key: "acceleration", label: "0-100" },
  { key: "drivetrain", label: "Motricité" },
];

export function VehicleSpecs({ specs }: { specs: Specs }) {
  return (
    <dl className="divide-y divide-ivory/10 border-y border-ivory/10">
      {rows.map((row) => (
        <div key={row.key} className="flex items-center justify-between py-4">
          <dt className="text-[11px] uppercase tracking-[0.16em] text-ivory/40">{row.label}</dt>
          <dd className="tabular-nums text-ivory">
            {row.key === "powerHp" ? `${specs.powerHp} CV` : specs[row.key]}
          </dd>
        </div>
      ))}
    </dl>
  );
}
