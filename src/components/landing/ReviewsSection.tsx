import { FadeIn } from "@/components/motion/FadeIn";
import { reviews } from "@/data/reviews";

export function ReviewsSection() {
  return (
    <section id="avis" className="bg-ink px-5 py-24 md:px-8">
      <div className="mx-auto max-w-6xl">
        <FadeIn>
          <p className="text-[11px] uppercase tracking-luxury text-gold">Ils ont conduit</p>
          <h2 className="mt-3 font-serif text-4xl text-ivory md:text-5xl">Parole de clients</h2>
        </FadeIn>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {reviews.map((review, index) => (
            <FadeIn key={review.id} delay={index * 0.06}>
              <blockquote className="flex h-full flex-col border border-ivory/10 bg-ink-soft p-6">
                <p className="flex-1 font-serif text-xl leading-relaxed text-ivory">
                  “{review.quote}”
                </p>
                <footer className="mt-8 text-sm text-ivory/50">
                  <cite className="not-italic text-ivory/80">{review.name}</cite>
                  {" · "}
                  {review.city}
                  <div className="mt-1 text-xs tracking-wide text-gold/80">{review.vehicle}</div>
                </footer>
              </blockquote>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
