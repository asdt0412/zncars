import { NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";
import { getReservationRepository } from "@/lib/reservations";
import { sendConfirmationEmail } from "@/lib/email";

export const runtime = "nodejs";

/**
 * Webhook Stripe : passe la réservation en "confirmée" après paiement de l'acompte.
 * Configurer l'URL /api/webhooks/stripe dans le dashboard Stripe.
 */
export async function POST(request: Request) {
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!secret) {
    return NextResponse.json({ error: "Webhook non configuré." }, { status: 501 });
  }

  const signature = request.headers.get("stripe-signature");
  if (!signature) {
    return NextResponse.json({ error: "Signature absente." }, { status: 400 });
  }

  const payload = await request.text();
  const stripe = getStripe();

  let event;
  try {
    event = stripe.webhooks.constructEvent(payload, signature, secret);
  } catch {
    return NextResponse.json({ error: "Signature invalide." }, { status: 400 });
  }

  if (event.type !== "checkout.session.completed") {
    return NextResponse.json({ received: true });
  }

  const session = event.data.object;
  const reservationId = session.metadata?.reservationId;
  const repo = getReservationRepository();

  const reservation = reservationId
    ? await repo.findById(reservationId)
    : session.id
      ? await repo.findByStripeSession(session.id)
      : null;

  if (!reservation) {
    return NextResponse.json({ error: "Réservation inconnue." }, { status: 404 });
  }

  if (reservation.status === "confirmed") {
    return NextResponse.json({ received: true, alreadyConfirmed: true });
  }

  const paymentIntent =
    typeof session.payment_intent === "string" ? session.payment_intent : session.payment_intent?.id;

  const confirmed = await repo.confirm(reservation.id, paymentIntent);
  if (confirmed) {
    await sendConfirmationEmail(confirmed);
  }

  return NextResponse.json({ received: true });
}
