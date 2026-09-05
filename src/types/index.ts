export type PickupLocationId = "airport" | "partdieu" | "address";

export type ReservationStatus =
  | "pending_payment"
  | "confirmed"
  | "cancelled"
  | "completed";

export interface VehicleSpecs {
  powerHp: number;
  transmission: string;
  fuel: string;
  seats: number;
  acceleration: string;
  drivetrain: string;
}

export interface Vehicle {
  id: string;
  slug: string;
  brand: string;
  model: string;
  tagline: string;
  description: string;
  pricePerDay: number;
  available: boolean;
  category: "suv" | "sport" | "berline";
  specs: VehicleSpecs;
  images: string[];
  /** Cadrage CSS (ex. "center 70%") pour recentrer la voiture dans le cadre. */
  imagePosition?: string;
}

export interface CustomerInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  licenseNumber: string;
  licenseCountry: string;
}

export interface Reservation {
  id: string;
  vehicleId: string;
  startDate: string;
  endDate: string;
  pickupLocation: PickupLocationId;
  customAddress?: string;
  customer: CustomerInfo;
  /** Montant total de la location (EUR). */
  totalAmount: number;
  /** Taux d'acompte appliqué (ex. 0.3). */
  depositRate: number;
  /** Acompte dû / payé (EUR). */
  depositAmount: number;
  /** Solde à régler à la remise du véhicule (EUR). */
  remainingBalance: number;
  status: ReservationStatus;
  stripeSessionId?: string;
  stripePaymentIntentId?: string;
  /** Les réservations en attente expirent pour libérer le créneau. */
  expiresAt?: string;
  createdAt: string;
  confirmedAt?: string;
}

export interface CreateReservationInput {
  vehicleId: string;
  startDate: string;
  endDate: string;
  pickupLocation: PickupLocationId;
  customAddress?: string;
  customer: CustomerInfo;
}
