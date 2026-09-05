import { NextResponse } from "next/server";
import { getVehicleById, getVehicleLabel } from "@/data/vehicles";
import { computeRentalQuote } from "@/lib/pricing";
import { getSiteUrl } from "@/lib/config";
import { getReservationRepository } from "@/lib/reservations";
import { isStripeConfigured, getStripe } from "@/lib/stripe";
import { sendConfirmationEmail } from "@/lib/email";
import { isValidEmail } from "@/lib/booking";
import type { CreateReservationInput, PickupLocationId } from "@/types";

const PICKUP_IDS: PickupLocationId[] = ["airport", "partdieu", "address"];

function isIsoDate(value: unknown): value is string {
  return typeof value === "string" && /^\d{4}-\d{2}-\d{2}$/.test(value);
}

function parseBody(body: unknown): CreateReservationInput | { error: string } {
  if (!body || typeof body !== "object") {
    return { error: "Requête invalide." };
  }

  const data = body as Record<string, unknown>;
  const customer = data.customer as Record<string, unknown> | undefined;
  const pickupLocation = data.pickupLocation;

  if (typeof data.vehicleId !== "string") return { error: "Véhicule manquant." };
  if (!isIsoDate(data.startDate) || !isIsoDate(data.endDate)) {
    return { error: "Dates invalides." };
  }
  if (data.startDate > data.endDate) return { error: "La date de fin précède le début." };
  if (!PICKUP_IDS.includes(pickupLocation as PickupLocationId)) {
    return { error: "Lieu de retrait invalide." };
  }
  if (
    !customer ||
    typeof customer.firstName !== "string" ||
    typeof customer.lastName !== "string" ||
    typeof customer.email !== "string" ||
    typeof customer.phone !== "string" ||
    typeof customer.licenseNumber !== "string" ||
    typeof customer.licenseCountry !== "string"
  ) {
    return { error: "Coordonnées incomplètes." };
  }
  if (!isValidEmail(customer.email)) return { error: "E-mail invalide." };
  if (pickupLocation === "address" && typeof data.customAddress !== "string") {
    return { error: "Adresse de livraison manquante." };
  }

  return {
    vehicleId: data.vehicleId,
    startDate: data.startDate,
    endDate: data.endDate,
    pickupLocation: pickupLocation as PickupLocationId,
    customAddress: typeof data.customAddress === "string" ? data.customAddress : undefined,
    customer: {
      firstName: customer.firstName.trim(),
      lastName: customer.lastName.trim(),
      email: customer.email.trim(),
      phone: customer.phone.trim(),
      licenseNumber: customer.licenseNumber.trim(),
      licenseCountry: customer.licenseCountry.trim(),
    },
  };
}

export async function POST(request: Request) {
  const parsed = parseBody(await request.json().catch(() => null));
  if ("error" in parsed) {
    return NextResponse.json({ error: parsed.error }, { status: 400 });
  }

  const vehicle = getVehicleById(parsed.vehicleId);
  if (!vehicle || !vehicle.available) {
    return NextResponse.json({ error: "Ce véhicule n'est pas disponible." }, { status: 404 });
  }

  const quote = computeRentalQuote(vehicle.pricePerDay, parsed.startDate, parsed.endDate);
  const expiresAt = new Date(Date.now() + 30 * 60 * 1000).toISOString();
  const repo = getReservationRepository();

  const created = await repo.createIfAvailable({
    ...parsed,
    ...quote,
    expiresAt,
  });

  if (!created.ok) {
    return NextResponse.json(
      { error: "Ce véhicule est déjà réservé sur ces dates." },
      { status: 409 },
    );
  }

  const reservation = created.reservation;
  const siteUrl = getSiteUrl();

  // Mode démo : sans clés Stripe, on confirme l'acompte et on envoie l'e-mail mock.
  if (!isStripeConfigured()) {
    const confirmed = await repo.confirm(reservation.id);
    if (confirmed) {
      await sendConfirmationEmail(confirmed);
    }
    return NextResponse.json({
      url: `${siteUrl}/reservation/confirmation?reservationId=${reservation.id}`,
      demo: true,
    });
  }

  const stripe = getStripe();
  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    locale: "fr",
    customer_email: reservation.customer.email,
    success_url: `${siteUrl}/reservation/confirmation?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${siteUrl}/reservation?cancelled=1`,
    metadata: {
      reservationId: reservation.id,
    },
    line_items: [
      {
        quantity: 1,
        price_data: {
          currency: "eur",
          unit_amount: Math.round(reservation.depositAmount * 100),
          product_data: {
            name: `Acompte — ${getVehicleLabel(vehicle)}`,
            description: `Solde de ${reservation.remainingBalance.toFixed(2)} € à régler à la remise du véhicule.`,
          },
        },
      },
    ],
  });

  if (!session.url) {
    return NextResponse.json({ error: "Session Stripe introuvable." }, { status: 502 });
  }

  await repo.attachStripeSession(reservation.id, session.id);

  return NextResponse.json({ url: session.url, reservationId: reservation.id });
}
