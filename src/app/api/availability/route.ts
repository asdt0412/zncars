import { NextResponse } from "next/server";
import { getReservationRepository } from "@/lib/reservations";
import { getBookedRanges, hasOverlap } from "@/lib/availability";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const vehicleId = searchParams.get("vehicleId");
  const startDate = searchParams.get("start");
  const endDate = searchParams.get("end");

  if (!vehicleId) {
    return NextResponse.json({ error: "vehicleId requis." }, { status: 400 });
  }

  const reservations = await getReservationRepository().findByVehicle(vehicleId);
  const ranges = getBookedRanges(reservations);

  if (startDate && endDate) {
    return NextResponse.json({
      available: !hasOverlap(reservations, startDate, endDate),
      ranges,
    });
  }

  return NextResponse.json({ ranges });
}
