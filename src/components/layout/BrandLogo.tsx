import Image from "next/image";
import { cn } from "@/lib/utils";

export function BrandLogo({
  className,
  priority = false,
}: {
  className?: string;
  priority?: boolean;
}) {
  return (
    <Image
      src="/logo-zn-cars.png"
      alt="ZN Cars Lyon"
      width={121}
      height={77}
      priority={priority}
      unoptimized
      className={cn("h-10 w-auto bg-transparent md:h-12", className)}
    />
  );
}
