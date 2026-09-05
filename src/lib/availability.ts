import type { Reservation } from "@/types";

const BLOCKING_STATUSES = new Set(["pending_payment", "confirmed"]);

/** Deux plages se chevauchent si elles partagent au moins un jour (bornes incluses). */
export function datesOverlap(
  startA: string,
  endA: string,
  startB: string,
  endB: string,
) {
  return startA <= endB && startB <= endA;
}

export function isReservationBlocking(reservation: Reservation, now = new Date()) {
  if (!BLOCKING_STATUSES.has(reservation.status)) {
    return false;
  }

  if (reservation.status === "pending_payment" && reservation.expiresAt) {
    return new Date(reservation.expiresAt) > now;
  }

  return true;
}

export function getBookedRanges(reservations: Reservation[], now = new Date()) {
  return reservations
    .filter((reservation) => isReservationBlocking(reservation, now))
    .map((reservation) => ({
      start: reservation.startDate,
      end: reservation.endDate,
    }));
}

export function hasOverlap(
  reservations: Reservation[],
  startDate: string,
  endDate: string,
  ignoreId?: string,
) {
  return reservations.some(
    (reservation) =>
      reservation.id !== ignoreId &&
      isReservationBlocking(reservation) &&
      datesOverlap(startDate, endDate, reservation.startDate, reservation.endDate),
  );
}

/** Liste les jours ISO occupés, pour désactiver le calendrier. */
export function expandBookedDays(ranges: { start: string; end: string }[]) {
  const days = new Set<string>();

  for (const range of ranges) {
    const cursor = new Date(`${range.start}T12:00:00`);
    const last = new Date(`${range.end}T12:00:00`);

    while (cursor <= last) {
      const year = cursor.getFullYear();
      const month = String(cursor.getMonth() + 1).padStart(2, "0");
      const day = String(cursor.getDate()).padStart(2, "0");
      days.add(`${year}-${month}-${day}`);
      cursor.setDate(cursor.getDate() + 1);
    }
  }

  return days;
}
