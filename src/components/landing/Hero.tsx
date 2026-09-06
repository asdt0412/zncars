"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { SearchBar } from "@/components/landing/SearchBar";
import { siteConfig } from "@/lib/config";

const HERO_VIDEO = "/hero-3.mp4";

export function Hero() {
  const reduceMotion = useReducedMotion();
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.defaultMuted = true;
    video.muted = true;
    video.playsInline = true;
    video.setAttribute("playsinline", "");
    video.setAttribute("webkit-playsinline", "");

    const play = () => {
      video.muted = true;
      void video.play().catch(() => undefined);
    };

    play();
    video.addEventListener("loadeddata", play);
    video.addEventListener("canplay", play);
    video.addEventListener("canplaythrough", play);
    document.addEventListener("visibilitychange", play);
    window.addEventListener("pageshow", play);
    window.addEventListener("touchstart", play, { passive: true, once: true });
    window.addEventListener("pointerdown", play, { once: true });

    return () => {
      video.removeEventListener("loadeddata", play);
      video.removeEventListener("canplay", play);
      video.removeEventListener("canplaythrough", play);
      document.removeEventListener("visibilitychange", play);
      window.removeEventListener("pageshow", play);
      window.removeEventListener("touchstart", play);
      window.removeEventListener("pointerdown", play);
    };
  }, []);

  return (
    <section className="relative min-h-dvh">
      <div className="absolute inset-0 overflow-hidden bg-ink">
        <video
          ref={videoRef}
          className="absolute left-1/2 top-1/2 h-full w-full min-h-full min-w-full -translate-x-1/2 -translate-y-1/2 object-cover object-center"
          src={HERO_VIDEO}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          disablePictureInPicture
          disableRemotePlayback
          controls={false}
          aria-label="Porsche ZN Cars Lyon"
          {...{ "webkit-playsinline": "true", "x5-playsinline": "true" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/50 via-ink/30 to-ink" />
        <div className="grain-overlay animate-grain" />
      </div>

      <div className="relative mx-auto flex min-h-dvh max-w-6xl flex-col items-center justify-center px-5 pb-10 pt-28 text-center md:px-8">
        <div className="flex w-full max-w-3xl flex-col items-center">
          <motion.p
            initial={reduceMotion ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="text-[11px] uppercase tracking-luxury text-gold"
          >
            Lyon · Prestige & sport
          </motion.p>
          <motion.h1
            initial={reduceMotion ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="mt-4 font-serif text-5xl leading-[1.05] text-ivory text-balance md:text-7xl"
          >
            {siteConfig.tagline}
          </motion.h1>
          <motion.p
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-6 max-w-md text-base leading-relaxed text-ivory/70"
          >
            Une flotte choisie, un acompte en ligne, le solde à la remise des clés.
          </motion.p>
          <motion.div
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-8"
          >
            <Button asChild size="lg" variant="solid">
              <Link href="/reservation">Réserver</Link>
            </Button>
          </motion.div>

          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.55 }}
            className="mt-10 w-full md:mt-12"
          >
            <SearchBar />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
