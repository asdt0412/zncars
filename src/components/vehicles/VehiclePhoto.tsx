import Image from "next/image";
import { cn } from "@/lib/utils";

/** Photo véhicule : toujours entière et centrée, fond sombre. */
export function VehiclePhoto({
  src,
  alt,
  className,
  priority = false,
  sizes,
  position = "center",
}: {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
  sizes: string;
  position?: string;
}) {
  return (
    <Image
      src={src}
      alt={alt}
      fill
      priority={priority}
      sizes={sizes}
      className={cn("object-cover object-center", className)}
      style={{ objectPosition: position }}
    />
  );
}
