import type { CreateReservationInput, Reservation, ReservationStatus } from "@/types";

export type ReservationRecordInput = CreateReservationInput & {
  totalAmount: number;
  depositRate: number;
  depositAmount: number;
  remainingBalance: number;
  expiresAt?: string;
};

/**
 * Contrat unique d'accès aux réservations.
 * Aujourd'hui : implémentation JSON (maquette).
 * Demain : remplacer par PrismaReservationRepository sans toucher aux routes API.
 */
export interface ReservationRepository {
  list(): Promise<Reservation[]>;
  findById(id: string): Promise<Reservation | null>;
  findByStripeSession(sessionId: string): Promise<Reservation | null>;
  findByVehicle(vehicleId: string): Promise<Reservation[]>;
  create(input: ReservationRecordInput): Promise<Reservation>;
  /** Crée la réservation seulement si le créneau est libre (verrou inclus). */
  createIfAvailable(
    input: ReservationRecordInput,
  ): Promise<{ ok: true; reservation: Reservation } | { ok: false; reason: "overlap" }>;
  attachStripeSession(id: string, stripeSessionId: string): Promise<Reservation | null>;
  confirm(id: string, stripePaymentIntentId?: string): Promise<Reservation | null>;
  updateStatus(id: string, status: ReservationStatus): Promise<Reservation | null>;
}
