import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <section className="flex min-h-dvh flex-col items-center justify-center bg-ink px-5 text-center">
      <p className="text-[11px] uppercase tracking-luxury text-gold">404</p>
      <h1 className="mt-4 font-serif text-4xl text-ivory">Page introuvable</h1>
      <Button asChild className="mt-8">
        <Link href="/">Retour à l&apos;accueil</Link>
      </Button>
    </section>
  );
}
