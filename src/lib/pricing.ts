import { getDepositRate } from "@/lib/config";

export function countRentalDays(startDate: string, endDate: string) {
  const start = new Date(`${startDate}T12:00:00`);
  const end = new Date(`${endDate}T12:00:00`);
  const diff = Math.round((end.getTime() - start.getTime()) / 86_400_000);
  // Une location compte au minimum une journée.
  return Math.max(1, diff);
}

export function computeRentalQuote(pricePerDay: number, startDate: string, endDate: string) {
  const days = countRentalDays(startDate, endDate);
  const totalAmount = days * pricePerDay;
  const depositRate = getDepositRate();
  const depositAmount = Math.round(totalAmount * depositRate * 100) / 100;
  const remainingBalance = Math.round((totalAmount - depositAmount) * 100) / 100;

  return {
    days,
    totalAmount,
    depositRate,
    depositAmount,
    remainingBalance,
  };
}
