import type { HTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center border px-2.5 py-1 text-[10px] uppercase tracking-[0.16em]",
  {
    variants: {
      variant: {
        available: "border-gold/40 bg-gold/10 text-gold",
        muted: "border-ivory/15 bg-ink-raised text-ivory/70",
        outline: "border-ivory/20 text-ivory/80",
      },
    },
    defaultVariants: {
      variant: "available",
    },
  },
);

export function Badge({
  className,
  variant,
  ...props
}: HTMLAttributes<HTMLDivElement> & VariantProps<typeof badgeVariants>) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}
