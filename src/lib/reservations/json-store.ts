import { randomUUID } from "crypto";
import { promises as fs } from "fs";
import path from "path";
import type { Reservation } from "@/types";
import { hasOverlap } from "@/lib/availability";
import type { ReservationRecordInput, ReservationRepository } from "@/lib/reservations/repository";

const STORE_PATH = path.join(process.cwd(), "data", "reservations.json");

/** Filet d'écriture pour éviter deux réservations simultanées sur le même fichier. */
let writeQueue: Promise<unknown> = Promise.resolve();

function withLock<T>(fn: () => Promise<T>) {
  const run = writeQueue.then(fn, fn);
  writeQueue = run.then(
    () => undefined,
    () => undefined,
  );
  return run;
}

async function ensureStore() {
  await fs.mkdir(path.dirname(STORE_PATH), { recursive: true });
  try {
    await fs.access(STORE_PATH);
  } catch {
    await fs.writeFile(STORE_PATH, "[]", "utf8");
  }
}

async function readAll(): Promise<Reservation[]> {
  await ensureStore();
  const raw = await fs.readFile(STORE_PATH, "utf8");
  return JSON.parse(raw) as Reservation[];
}

async function writeAll(reservations: Reservation[]) {
  await ensureStore();
  await fs.writeFile(STORE_PATH, JSON.stringify(reservations, null, 2), "utf8");
}

export class JsonReservationStore implements ReservationRepository {
  async list() {
    return readAll();
  }

  async findById(id: string) {
    const reservations = await readAll();
    return reservations.find((item) => item.id === id) ?? null;
  }

  async findByStripeSession(sessionId: string) {
    const reservations = await readAll();
    return reservations.find((item) => item.stripeSessionId === sessionId) ?? null;
  }

  async findByVehicle(vehicleId: string) {
    const reservations = await readAll();
    return reservations.filter((item) => item.vehicleId === vehicleId);
  }

  async create(input: ReservationRecordInput) {
    return withLock(async () => {
      const reservations = await readAll();
      const reservation: Reservation = {
        id: randomUUID(),
        vehicleId: input.vehicleId,
        startDate: input.startDate,
        endDate: input.endDate,
        pickupLocation: input.pickupLocation,
        customAddress: input.customAddress,
        customer: input.customer,
        totalAmount: input.totalAmount,
        depositRate: input.depositRate,
        depositAmount: input.depositAmount,
        remainingBalance: input.remainingBalance,
        status: "pending_payment",
        expiresAt: input.expiresAt,
        createdAt: new Date().toISOString(),
      };

      reservations.push(reservation);
      await writeAll(reservations);
      return reservation;
    });
  }

  async createIfAvailable(input: ReservationRecordInput) {
    return withLock(async () => {
      const reservations = await readAll();
      const vehicleReservations = reservations.filter((item) => item.vehicleId === input.vehicleId);

      if (hasOverlap(vehicleReservations, input.startDate, input.endDate)) {
        return { ok: false as const, reason: "overlap" as const };
      }

      const reservation: Reservation = {
        id: randomUUID(),
        vehicleId: input.vehicleId,
        startDate: input.startDate,
        endDate: input.endDate,
        pickupLocation: input.pickupLocation,
        customAddress: input.customAddress,
        customer: input.customer,
        totalAmount: input.totalAmount,
        depositRate: input.depositRate,
        depositAmount: input.depositAmount,
        remainingBalance: input.remainingBalance,
        status: "pending_payment",
        expiresAt: input.expiresAt,
        createdAt: new Date().toISOString(),
      };

      reservations.push(reservation);
      await writeAll(reservations);
      return { ok: true as const, reservation };
    });
  }

  async attachStripeSession(id: string, stripeSessionId: string) {
    return withLock(async () => {
      const reservations = await readAll();
      const index = reservations.findIndex((item) => item.id === id);
      if (index === -1) return null;
      reservations[index] = { ...reservations[index], stripeSessionId };
      await writeAll(reservations);
      return reservations[index];
    });
  }

  async confirm(id: string, stripePaymentIntentId?: string) {
    return withLock(async () => {
      const reservations = await readAll();
      const index = reservations.findIndex((item) => item.id === id);
      if (index === -1) return null;
      reservations[index] = {
        ...reservations[index],
        status: "confirmed",
        stripePaymentIntentId,
        confirmedAt: new Date().toISOString(),
        expiresAt: undefined,
      };
      await writeAll(reservations);
      return reservations[index];
    });
  }

  async updateStatus(id: string, status: Reservation["status"]) {
    return withLock(async () => {
      const reservations = await readAll();
      const index = reservations.findIndex((item) => item.id === id);
      if (index === -1) return null;
      reservations[index] = { ...reservations[index], status };
      await writeAll(reservations);
      return reservations[index];
    });
  }
}
