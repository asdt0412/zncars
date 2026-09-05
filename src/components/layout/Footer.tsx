import Link from "next/link";
import { InstagramIcon, SnapchatIcon } from "@/components/icons/BrandIcons";
import { BrandLogo } from "@/components/layout/BrandLogo";
import { siteConfig } from "@/lib/config";

export function Footer() {
  return (
    <footer className="border-t border-ivory/10 bg-ink">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 py-16 md:grid-cols-3 md:px-8">
        <div>
          <BrandLogo className="h-14 w-auto md:h-16" />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-ivory/55">
            Location de véhicules de prestige et sportifs. Lyon, et nulle part ailleurs.
          </p>
        </div>

        <div>
          <p className="text-[11px] uppercase tracking-[0.2em] text-gold">Contact</p>
          <address className="mt-4 not-italic text-sm leading-7 text-ivory/70">
            {siteConfig.address}
            <br />
            <a className="transition-colors hover:text-gold" href={`tel:${siteConfig.phoneHref}`}>
              {siteConfig.phone}
            </a>
            <br />
            <a className="transition-colors hover:text-gold" href={`mailto:${siteConfig.email}`}>
              {siteConfig.email}
            </a>
          </address>
        </div>

        <div>
          <p className="text-[11px] uppercase tracking-[0.2em] text-gold">Réseaux</p>
          <ul className="mt-4 space-y-3 text-sm text-ivory/70">
            <li>
              <a
                href={siteConfig.instagram.href}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 transition-colors hover:text-gold"
              >
                <InstagramIcon className="h-4 w-4" />
                Instagram {siteConfig.instagram.handle}
              </a>
            </li>
            <li>
              <a
                href={siteConfig.snapchat.href}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 transition-colors hover:text-gold"
              >
                <SnapchatIcon className="h-4 w-4" />
                Snapchat {siteConfig.snapchat.handle}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-ivory/10">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-5 py-6 text-xs text-ivory/40 md:flex-row md:items-center md:justify-between md:px-8">
          <p>© {new Date().getFullYear()} {siteConfig.name}. Tous droits réservés.</p>
          <div className="flex gap-6">
            <Link href="/mentions-legales" className="hover:text-ivory">
              Mentions légales
            </Link>
            <Link href="/cgv" className="hover:text-ivory">
              CGV
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
