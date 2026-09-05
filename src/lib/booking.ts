import type { CustomerInfo, PickupLocationId } from "@/types";

export interface BookingDraft {
  vehicleId: string;
  startDate: string;
  endDate: string;
  pickupLocation: PickupLocationId;
  customAddress: string;
  customer: CustomerInfo;
}

export const emptyCustomer: CustomerInfo = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  licenseNumber: "",
  licenseCountry: "France",
};

export function createEmptyDraft(): BookingDraft {
  return {
    vehicleId: "",
    startDate: "",
    endDate: "",
    pickupLocation: "airport",
    customAddress: "",
    customer: emptyCustomer,
  };
}

const STORAGE_KEY = "zn-cars-booking";

export function loadDraft(): BookingDraft {
  if (typeof window === "undefined") return createEmptyDraft();
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    return raw ? ({ ...createEmptyDraft(), ...JSON.parse(raw) } as BookingDraft) : createEmptyDraft();
  } catch {
    return createEmptyDraft();
  }
}

export function saveDraft(draft: BookingDraft) {
  sessionStorage.setItem(STORAGE_KEY, JSON.stringify(draft));
}

export function clearDraft() {
  sessionStorage.removeItem(STORAGE_KEY);
}

export function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}
