import type { Metadata } from "next";
import { siteConfig } from "@/lib/config";

export const metadata: Metadata = {
  title: "Mentions légales",
};

export default function MentionsLegalesPage() {
  return (
    <article className="bg-ink px-5 pb-24 pt-28 md:px-8">
      <div className="mx-auto max-w-2xl space-y-6 text-sm leading-relaxed text-ivory/65">
        <h1 className="font-serif text-4xl text-ivory">Mentions légales</h1>
        <p>
          {siteConfig.name} — location de véhicules de prestige. Siège : {siteConfig.address}.
          Contact : {siteConfig.email} · {siteConfig.phone}.
        </p>
        <p>
          Directeur de la publication : l&apos;exploitant du site. Hébergement : selon le déploiement
          (Vercel ou infrastructure équivalente).
        </p>
        <p>
          Les photographies de la flotte sont des visuels d&apos;illustration. Les véhicules réellement
          livrés peuvent présenter des écarts de teinte ou d&apos;équipement.
        </p>
        <p>
          Conformément au RGPD, vous pouvez demander l&apos;accès, la rectification ou la suppression de
          vos données à {siteConfig.email}.
        </p>
      </div>
    </article>
  );
}
