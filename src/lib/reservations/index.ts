import { JsonReservationStore } from "@/lib/reservations/json-store";
import type { ReservationRepository } from "@/lib/reservations/repository";

/**
 * Point d'entrée unique.
 * Pour brancher Prisma : créer `prisma-store.ts` puis
 * `return new PrismaReservationStore()` ici.
 */
let repository: ReservationRepository | null = null;

export function getReservationRepository(): ReservationRepository {
  if (!repository) {
    repository = new JsonReservationStore();
  }
  return repository;
}

export type { ReservationRepository } from "@/lib/reservations/repository";
