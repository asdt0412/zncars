"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { SearchBar } from "@/components/landing/SearchBar";
import { siteConfig } from "@/lib/config";

const HERO_POSTER =
  "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=2400&q=80";

export function Hero() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative min-h-dvh">
      <div className="absolute inset-0 overflow-hidden bg-ink">
        {reduceMotion ? (
          <div
            className="h-full w-full"
            style={{
              backgroundImage: `url(${HERO_POSTER})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
            role="img"
            aria-label="Porsche ZN Cars Lyon"
          />
        ) : (
          <video
            className="absolute left-1/2 top-1/2 h-full w-full min-h-full min-w-full -translate-x-1/2 -translate-y-1/2 object-cover object-center"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            poster={HERO_POSTER}
            aria-label="Porsche ZN Cars Lyon"
          >
            <source src="/hero-3.mp4" type="video/mp4" />
          </video>
        )}
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
