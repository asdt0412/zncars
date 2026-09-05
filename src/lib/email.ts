import { formatDateFr, formatEuros } from "@/lib/utils";
import { siteConfig } from "@/lib/config";
import { getVehicleById, getVehicleLabel } from "@/data/vehicles";
import type { Reservation } from "@/types";

/**
 * Envoi d'e-mail de confirmation.
 * Maquette : log serveur. Brancher Resend / Nodemailer ici plus tard.
 */
export async function sendConfirmationEmail(reservation: Reservation) {
  const vehicle = getVehicleById(reservation.vehicleId);
  const subject = `Confirmation — ${siteConfig.name} ${reservation.id.slice(0, 8).toUpperCase()}`;
  const body = [
    `Bonjour ${reservation.customer.firstName},`,
    "",
    `Votre acompte a bien été reçu. La réservation est confirmée.`,
    "",
    vehicle ? `Véhicule : ${getVehicleLabel(vehicle)}` : null,
    `Du ${formatDateFr(reservation.startDate)} au ${formatDateFr(reservation.endDate)}`,
    `Total : ${formatEuros(reservation.totalAmount)}`,
    `Acompte réglé : ${formatEuros(reservation.depositAmount)}`,
    `Solde à la remise : ${formatEuros(reservation.remainingBalance)}`,
    "",
    `${siteConfig.name} — ${siteConfig.phone}`,
  ]
    .filter(Boolean)
    .join("\n");

  console.info("[email:mock]", {
    to: reservation.customer.email,
    subject,
    body,
  });

  return { delivered: false, provider: "mock" as const };
}
