import { Hero } from "@/components/landing/Hero";
import { FleetSection } from "@/components/landing/FleetSection";
import { WhySection } from "@/components/landing/WhySection";
import { ReviewsSection } from "@/components/landing/ReviewsSection";
import { vehicles } from "@/data/vehicles";

export default function HomePage() {
  return (
    <>
      <Hero />
      <FleetSection vehicles={vehicles} />
      <WhySection />
      <ReviewsSection />
    </>
  );
}
