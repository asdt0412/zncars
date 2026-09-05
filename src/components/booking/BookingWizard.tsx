"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import type { DateRange } from "react-day-picker";
import { CalendarDays, Loader2 } from "lucide-react";
import { getVehicleById, getVehicleLabel } from "@/data/vehicles";
import { siteConfig } from "@/lib/config";
import { computeRentalQuote } from "@/lib/pricing";
import { formatEuros, toIsoDate } from "@/lib/utils";
import {
  createEmptyDraft,
  isValidEmail,
  loadDraft,
  saveDraft,
  type BookingDraft,
} from "@/lib/booking";
import type { PickupLocationId } from "@/types";
import { BookingProgress } from "@/components/booking/BookingProgress";
import { Button } from "@/components/ui/button";
import { VehiclePicker } from "@/components/vehicles/VehiclePicker";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface BookingWizardProps {
  initialVehicleId?: string;
  initialStart?: string;
  initialEnd?: string;
}

export function BookingWizard({ initialVehicleId, initialStart, initialEnd }: BookingWizardProps) {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [draft, setDraft] = useState<BookingDraft>(createEmptyDraft);
  const [hydrated, setHydrated] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const stored = loadDraft();
    setDraft({
      ...stored,
      vehicleId: initialVehicleId || stored.vehicleId,
      startDate: initialStart || stored.startDate,
      endDate: initialEnd || stored.endDate,
    });
    setHydrated(true);
  }, [initialVehicleId, initialStart, initialEnd]);

  useEffect(() => {
    if (hydrated) saveDraft(draft);
  }, [draft, hydrated]);

  const vehicle = getVehicleById(draft.vehicleId);
  const quote =
    vehicle && draft.startDate && draft.endDate
      ? computeRentalQuote(vehicle.pricePerDay, draft.startDate, draft.endDate)
      : null;

  const range: DateRange | undefined = useMemo(() => {
    if (!draft.startDate) return undefined;
    return {
      from: new Date(`${draft.startDate}T12:00:00`),
      to: draft.endDate ? new Date(`${draft.endDate}T12:00:00`) : undefined,
    };
  }, [draft.startDate, draft.endDate]);

  function update<K extends keyof BookingDraft>(key: K, value: BookingDraft[K]) {
    setDraft((current) => ({ ...current, [key]: value }));
  }

  function validateStep(current: number) {
    const nextErrors: Record<string, string> = {};

    if (current === 1) {
      if (!draft.vehicleId) nextErrors.vehicleId = "Choisissez un véhicule.";
      if (!draft.startDate || !draft.endDate) nextErrors.dates = "Indiquez les dates de location.";
      if (draft.pickupLocation === "address" && draft.customAddress.trim().length < 8) {
        nextErrors.customAddress = "Précisez une adresse complète.";
      }
    }

    if (current === 2) {
      if (draft.customer.firstName.trim().length < 2) nextErrors.firstName = "Prénom requis.";
      if (draft.customer.lastName.trim().length < 2) nextErrors.lastName = "Nom requis.";
      if (!isValidEmail(draft.customer.email)) nextErrors.email = "E-mail invalide.";
      if (draft.customer.phone.replace(/\s/g, "").length < 8) nextErrors.phone = "Téléphone requis.";
      if (draft.customer.licenseNumber.trim().length < 5) {
        nextErrors.licenseNumber = "Numéro de permis requis.";
      }
    }

    setErrors(nextErrors);
    const first = Object.keys(nextErrors)[0];
    if (first) {
      document.getElementById(first)?.focus();
    }
    return Object.keys(nextErrors).length === 0;
  }

  function next() {
    if (!validateStep(step)) return;
    setFormError(null);
    setStep((value) => Math.min(3, value + 1));
  }

  async function payDeposit() {
    if (!validateStep(1) || !validateStep(2) || !quote) return;
    setSubmitting(true);
    setFormError(null);

    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(draft),
      });
      const payload = (await response.json()) as {
        url?: string;
        error?: string;
      };

      if (!response.ok || !payload.url) {
        setFormError(payload.error ?? "Impossible de créer le paiement.");
        return;
      }

      router.push(payload.url);
    } catch {
      setFormError("Une erreur réseau est survenue. Réessayez.");
    } finally {
      setSubmitting(false);
    }
  }

  if (!hydrated) {
    return <div className="min-h-40 animate-pulse bg-ink-soft" aria-hidden />;
  }

  return (
    <div className="space-y-10">
      <BookingProgress current={step} />

      {formError ? (
        <p role="alert" className="border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
          {formError}
        </p>
      ) : null}

      {step === 1 ? (
        <div className="grid gap-6">
          <fieldset>
            <Label htmlFor="vehicleId">Véhicule</Label>
            <VehiclePicker
              id="vehicleId"
              value={draft.vehicleId}
              onChange={(value) => update("vehicleId", value)}
              placeholder="Sélectionner"
            />
            {errors.vehicleId ? <FieldError id="vehicleId-error">{errors.vehicleId}</FieldError> : null}
          </fieldset>

          <fieldset>
            <Label id="dates-label">Dates de retrait et restitution</Label>
            <Popover>
              <PopoverTrigger asChild>
                <button
                  type="button"
                  id="dates"
                  aria-labelledby="dates-label"
                  className="flex h-12 w-full cursor-pointer items-center justify-between border border-ivory/15 bg-ink-soft px-4 text-left capitalize"
                >
                  <span className={range?.from ? "text-ivory" : "text-ivory/40"}>
                    {range?.from && range.to
                      ? `${format(range.from, "d MMMM yyyy", { locale: fr })} — ${format(range.to, "d MMMM yyyy", { locale: fr })}`
                      : "Choisir une période"}
                  </span>
                  <CalendarDays className="h-4 w-4 text-ivory/40" aria-hidden />
                </button>
              </PopoverTrigger>
              <PopoverContent align="start">
                <Calendar
                  mode="range"
                  selected={range}
                  onSelect={(nextRange) => {
                    update("startDate", nextRange?.from ? toIsoDate(nextRange.from) : "");
                    update("endDate", nextRange?.to ? toIsoDate(nextRange.to) : "");
                  }}
                  disabled={{ before: new Date() }}
                />
              </PopoverContent>
            </Popover>
            {errors.dates ? <FieldError>{errors.dates}</FieldError> : null}
          </fieldset>

          <fieldset>
            <Label htmlFor="pickup">Lieu de retrait</Label>
            <Select
              value={draft.pickupLocation}
              onValueChange={(value) => update("pickupLocation", value as PickupLocationId)}
            >
              <SelectTrigger id="pickup">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {siteConfig.pickupLocations.map((location) => (
                  <SelectItem key={location.id} value={location.id}>
                    {location.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </fieldset>

          {draft.pickupLocation === "address" ? (
            <fieldset>
              <Label htmlFor="customAddress">Adresse de livraison</Label>
              <Input
                id="customAddress"
                value={draft.customAddress}
                autoComplete="street-address"
                onChange={(event) => update("customAddress", event.target.value)}
                placeholder="Numéro, rue, code postal, ville"
              />
              {errors.customAddress ? <FieldError>{errors.customAddress}</FieldError> : null}
            </fieldset>
          ) : null}
        </div>
      ) : null}

      {step === 2 ? (
        <div className="grid gap-6 sm:grid-cols-2">
          <Field
            id="firstName"
            label="Prénom"
            value={draft.customer.firstName}
            autoComplete="given-name"
            error={errors.firstName}
            onChange={(firstName) =>
              update("customer", { ...draft.customer, firstName })
            }
          />
          <Field
            id="lastName"
            label="Nom"
            value={draft.customer.lastName}
            autoComplete="family-name"
            error={errors.lastName}
            onChange={(lastName) => update("customer", { ...draft.customer, lastName })}
          />
          <Field
            id="email"
            label="E-mail"
            type="email"
            value={draft.customer.email}
            autoComplete="email"
            error={errors.email}
            onChange={(email) => update("customer", { ...draft.customer, email })}
          />
          <Field
            id="phone"
            label="Téléphone"
            type="tel"
            value={draft.customer.phone}
            autoComplete="tel"
            error={errors.phone}
            onChange={(phone) => update("customer", { ...draft.customer, phone })}
          />
          <Field
            id="licenseNumber"
            label="N° de permis"
            value={draft.customer.licenseNumber}
            error={errors.licenseNumber}
            onChange={(licenseNumber) =>
              update("customer", { ...draft.customer, licenseNumber })
            }
          />
          <Field
            id="licenseCountry"
            label="Pays de délivrance"
            value={draft.customer.licenseCountry}
            onChange={(licenseCountry) =>
              update("customer", { ...draft.customer, licenseCountry })
            }
          />
        </div>
      ) : null}

      {step === 3 && vehicle && quote ? (
        <div className="space-y-6 border border-ivory/10 bg-ink-soft p-6">
          <h2 className="font-serif text-3xl text-ivory">{getVehicleLabel(vehicle)}</h2>
          <dl className="space-y-3 text-sm text-ivory/70">
            <Row label="Période" value={`${format(range!.from!, "d MMMM yyyy", { locale: fr })} — ${format(range!.to!, "d MMMM yyyy", { locale: fr })} (${quote.days} j)`} />
            <Row
              label="Retrait"
              value={
                draft.pickupLocation === "address"
                  ? draft.customAddress
                  : siteConfig.pickupLocations.find((item) => item.id === draft.pickupLocation)?.label ?? ""
              }
            />
            <Row label="Conducteur" value={`${draft.customer.firstName} ${draft.customer.lastName}`} />
            <Row label="Permis" value={draft.customer.licenseNumber} />
          </dl>
          <div className="space-y-2 border-t border-ivory/10 pt-5">
            <Row label="Total" value={formatEuros(quote.totalAmount)} emphasize />
            <Row
              label={`Acompte (${Math.round(quote.depositRate * 100)} %)`}
              value={formatEuros(quote.depositAmount)}
            />
            <Row label="Solde sur place" value={formatEuros(quote.remainingBalance)} />
          </div>
          <p className="text-xs leading-relaxed text-ivory/45">
            L&apos;acompte est encaissé aujourd&apos;hui. Le solde est dû à la remise du véhicule, par carte ou espèces.
          </p>
        </div>
      ) : null}

      <div className="flex flex-col gap-3 sm:flex-row sm:justify-between">
        {step > 1 ? (
          <Button type="button" variant="outline" onClick={() => setStep((value) => value - 1)}>
            Retour
          </Button>
        ) : (
          <span />
        )}
        {step < 3 ? (
          <Button type="button" onClick={next}>
            Continuer
          </Button>
        ) : (
          <Button type="button" size="lg" onClick={payDeposit} disabled={submitting}>
            {submitting ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden /> : null}
            Payer l&apos;acompte
          </Button>
        )}
      </div>
    </div>
  );
}

function Field({
  id,
  label,
  value,
  onChange,
  type = "text",
  autoComplete,
  error,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  autoComplete?: string;
  error?: string;
}) {
  return (
    <div>
      <Label htmlFor={id}>{label}</Label>
      <Input
        id={id}
        type={type}
        value={value}
        autoComplete={autoComplete}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        onChange={(event) => onChange(event.target.value)}
      />
      {error ? <FieldError id={`${id}-error`}>{error}</FieldError> : null}
    </div>
  );
}

function FieldError({ children, id }: { children: string; id?: string }) {
  return (
    <p id={id} role="alert" className="mt-2 text-sm text-red-300">
      {children}
    </p>
  );
}

function Row({ label, value, emphasize }: { label: string; value: string; emphasize?: boolean }) {
  return (
    <div className="flex items-start justify-between gap-4">
      <dt className="text-ivory/45">{label}</dt>
      <dd className={emphasize ? "font-medium text-ivory" : "text-right text-ivory"}>{value}</dd>
    </div>
  );
}
