"use client";

import { useEffect } from "react";
import { clearDraft } from "@/lib/booking";

/** Nettoie le brouillon une fois la réservation confirmée. */
export function ClearBookingDraft() {
  useEffect(() => {
    clearDraft();
  }, []);

  return null;
}
