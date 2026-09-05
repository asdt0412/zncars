"use client";

import { useCallback, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { VehiclePhoto } from "@/components/vehicles/VehiclePhoto";

export function VehicleGallery({
  images,
  alt,
  position,
}: {
  images: string[];
  alt: string;
  position?: string;
}) {
  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState(0);
  const reduceMotion = useReducedMotion();
  const touchStartX = useRef<number | null>(null);

  const goTo = useCallback(
    (index: number, dir = 1) => {
      const next = ((index % images.length) + images.length) % images.length;
      setDirection(dir);
      setActive(next);
    },
    [images.length],
  );

  const step = useCallback(
    (delta: number) => {
      goTo(active + delta, delta);
    },
    [active, goTo],
  );

  return (
    <div>
      <div
        className="group relative aspect-[4/3] overflow-hidden bg-ink"
        tabIndex={0}
        onKeyDown={(event) => {
          if (event.key === "ArrowLeft") {
            event.preventDefault();
            step(-1);
          }
          if (event.key === "ArrowRight") {
            event.preventDefault();
            step(1);
          }
        }}
        onTouchStart={(event) => {
          touchStartX.current = event.touches[0]?.clientX ?? null;
        }}
        onTouchEnd={(event) => {
          if (touchStartX.current == null) return;
          const dx = (event.changedTouches[0]?.clientX ?? 0) - touchStartX.current;
          if (Math.abs(dx) > 40) step(dx < 0 ? 1 : -1);
          touchStartX.current = null;
        }}
        aria-roledescription="carousel"
        aria-label={`Photos ${alt}`}
      >
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={images[active]}
            custom={direction}
            initial={reduceMotion ? { opacity: 1 } : { opacity: 0, x: direction * 48 }}
            animate={{ opacity: 1, x: 0 }}
            exit={reduceMotion ? { opacity: 1 } : { opacity: 0, x: direction * -48 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0"
          >
            <VehiclePhoto
              src={images[active]}
              alt={`${alt} — photo ${active + 1} sur ${images.length}`}
              priority={active === 0}
              sizes="(max-width: 1024px) 100vw, 60vw"
              position={position ?? "center 62%"}
            />
          </motion.div>
        </AnimatePresence>
        <div className="grain-overlay opacity-[0.08]" />

        {images.length > 1 ? (
          <>
            <button
              type="button"
              onClick={() => step(-1)}
              aria-label="Photo précédente"
              className="btn-nav absolute left-3 top-1/2 z-10 -translate-y-1/2 md:left-5"
            >
              <ChevronLeft className="h-4 w-4" strokeWidth={1.25} />
            </button>
            <button
              type="button"
              onClick={() => step(1)}
              aria-label="Photo suivante"
              className="btn-nav absolute right-3 top-1/2 z-10 -translate-y-1/2 md:right-5"
            >
              <ChevronRight className="h-4 w-4" strokeWidth={1.25} />
            </button>
            <p
              className="pointer-events-none absolute bottom-3 right-3 z-10 text-[11px] uppercase tracking-[0.2em] text-ivory/75"
              aria-live="polite"
            >
              {String(active + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}
            </p>
          </>
        ) : null}
      </div>

      <div className="mt-3 grid grid-cols-3 gap-3">
        {images.map((image, index) => (
          <button
            key={`${image}-${index}`}
            type="button"
            onClick={() => goTo(index, index > active ? 1 : -1)}
            aria-label={`Voir la photo ${index + 1}`}
            aria-pressed={active === index}
            className={cn(
              "relative aspect-[4/3] cursor-pointer overflow-hidden border bg-ink transition-all duration-300",
              active === index ? "border-gold opacity-100" : "border-transparent opacity-55 hover:opacity-100",
            )}
          >
            <VehiclePhoto
              src={image}
              alt=""
              sizes="200px"
              position={position ?? "center 62%"}
            />
          </button>
        ))}
      </div>
    </div>
  );
}
