import { MapPinned, Headphones, UserPlus, CalendarCheck } from "lucide-react";
import { FadeIn } from "@/components/motion/FadeIn";

const items = [
  {
    icon: MapPinned,
    title: "Livraison",
    text: "Aéroport Saint-Exupéry, Part-Dieu, ou l'adresse de votre choix dans le Grand Lyon.",
  },
  {
    icon: Headphones,
    title: "Assistance 24/7",
    text: "Une ligne directe, des interlocuteurs à Lyon, pas un centre d'appels anonyme.",
  },
  {
    icon: UserPlus,
    title: "2e conducteur",
    text: "Inclus, sous réserve d'un permis valide de plus de deux ans.",
  },
  {
    icon: CalendarCheck,
    title: "Annulation flexible",
    text: "Acompte remboursable jusqu'à 48 h avant le retrait, hors week-ends fériés.",
  },
];

export function WhySection() {
  return (
    <section id="pourquoi" className="border-y border-ivory/10 bg-ink-soft px-5 pt-8 pb-20 md:px-8 md:py-24">
      <div className="mx-auto max-w-6xl">
        <FadeIn>
          <p className="text-[11px] uppercase tracking-luxury text-gold">Pourquoi ZN Cars</p>
          <h2 className="mt-3 max-w-xl font-serif text-4xl text-ivory md:text-5xl">
            Le luxe, c&apos;est de ne rien avoir à demander.
          </h2>
        </FadeIn>

        <div className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item, index) => (
            <FadeIn key={item.title} delay={index * 0.06}>
              <item.icon className="h-5 w-5 text-gold" aria-hidden />
              <h3 className="mt-5 font-serif text-2xl text-ivory">{item.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-ivory/60">{item.text}</p>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
