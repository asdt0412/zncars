"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { siteConfig } from "@/lib/config";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { BrandLogo } from "@/components/layout/BrandLogo";
import { InstagramIcon, SnapchatIcon } from "@/components/icons/BrandIcons";

const navLinks = [
  { href: "/#flotte", label: "La flotte" },
  { href: "/#pourquoi", label: "L'expérience" },
  { href: "/#avis", label: "Avis" },
];

function BurgerIcon({ open }: { open: boolean }) {
  return (
    <span className="relative block h-3.5 w-5" aria-hidden>
      <span
        className={cn(
          "absolute inset-x-0 top-0 h-px origin-center bg-current transition-[top,transform] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
          open && "top-1/2 -translate-y-1/2 rotate-45",
        )}
      />
      <span
        className={cn(
          "absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-current transition-opacity duration-200",
          open && "opacity-0",
        )}
      />
      <span
        className={cn(
          "absolute inset-x-0 bottom-0 h-px origin-center bg-current transition-[bottom,top,transform] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
          open && "bottom-auto top-1/2 -translate-y-1/2 -rotate-45",
        )}
      />
    </span>
  );
}

export function Header() {
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const reservationActive = pathname.startsWith("/reservation");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const main = document.getElementById("contenu");
    const footer = document.querySelector("footer");
    if (open) {
      main?.setAttribute("inert", "");
      footer?.setAttribute("inert", "");
    } else {
      main?.removeAttribute("inert");
      footer?.removeAttribute("inert");
    }
    return () => {
      document.body.style.overflow = "";
      main?.removeAttribute("inert");
      footer?.removeAttribute("inert");
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    const onResize = () => {
      if (window.matchMedia("(min-width: 768px)").matches) setOpen(false);
    };

    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, [open]);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-40 transition-colors duration-300",
          open ? "bg-ink" : scrolled ? "bg-ink/90 backdrop-blur-md" : "bg-transparent",
        )}
      >
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 md:h-20 md:px-8">
          <Link
            href="/"
            className="group flex items-center gap-3"
            onClick={() => setOpen(false)}
          >
            <BrandLogo priority />
            <span className="text-[11px] uppercase tracking-luxury text-gold">Cars Lyon</span>
          </Link>

          <nav className="hidden items-center gap-8 md:flex" aria-label="Navigation principale">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-[12px] uppercase tracking-[0.16em] text-ivory/70 transition-colors duration-200 hover:text-gold"
              >
                {link.label}
              </Link>
            ))}
            <Button asChild size="lg" variant="solid">
              <Link href="/reservation">Réserver</Link>
            </Button>
          </nav>

          <button
            type="button"
            className="inline-flex h-11 w-11 cursor-pointer items-center justify-center text-ivory transition-colors duration-200 hover:text-gold md:hidden"
            aria-expanded={open}
            aria-controls="menu-mobile"
            aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
            onClick={() => setOpen((value) => !value)}
          >
            <BurgerIcon open={open} />
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open ? (
          <motion.div
            id="menu-mobile"
            role="dialog"
            aria-modal="true"
            aria-label="Menu de navigation"
            className="fixed inset-0 z-30 flex flex-col overflow-y-auto overscroll-contain bg-ink md:hidden"
            initial={reduceMotion ? { opacity: 1 } : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduceMotion ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.28, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="h-16 shrink-0" />

            <nav
              className="flex flex-1 flex-col justify-center px-6 py-8"
              aria-label="Navigation mobile"
            >
              <ul className="space-y-1">
                {navLinks.map((link, index) => (
                  <li key={link.href}>
                    <motion.div
                      initial={reduceMotion ? false : { opacity: 0, y: 18 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.4,
                        delay: reduceMotion ? 0 : 0.08 + index * 0.06,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                    >
                      <Link
                        href={link.href}
                        onClick={() => setOpen(false)}
                        className="group flex min-h-14 items-baseline gap-5 py-3 text-ivory transition-colors duration-200 hover:text-gold"
                      >
                        <span className="w-6 text-[11px] tracking-[0.18em] text-gold/70">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <span className="text-[2rem] leading-none tracking-tight sm:text-[2.4rem]">
                          {link.label}
                        </span>
                      </Link>
                    </motion.div>
                  </li>
                ))}
              </ul>
            </nav>

            <motion.div
              className="mt-auto border-t border-ivory/10 px-6 pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-6"
              initial={reduceMotion ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.35,
                delay: reduceMotion ? 0 : 0.28,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <Button asChild size="lg" variant="solid" className="w-full">
                <Link
                  href="/reservation"
                  onClick={() => setOpen(false)}
                  aria-current={reservationActive ? "page" : undefined}
                >
                  Réserver
                </Link>
              </Button>

              <div className="mt-6 flex items-start justify-between gap-6">
                <address className="not-italic text-sm leading-6 text-ivory/55">
                  <a
                    href={`tel:${siteConfig.phoneHref}`}
                    className="block text-ivory/80 transition-colors hover:text-gold"
                  >
                    {siteConfig.phone}
                  </a>
                  <span className="block">{siteConfig.address}</span>
                </address>

                <div className="flex gap-3">
                  <a
                    href={siteConfig.instagram.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Instagram ZN Cars Lyon"
                    className="inline-flex h-11 w-11 items-center justify-center text-ivory/70 transition-colors hover:text-gold"
                  >
                    <InstagramIcon className="h-4 w-4" />
                  </a>
                  <a
                    href={siteConfig.snapchat.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Snapchat ZN Cars Lyon"
                    className="inline-flex h-11 w-11 items-center justify-center text-ivory/70 transition-colors hover:text-gold"
                  >
                    <SnapchatIcon className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
