import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "relative inline-flex items-center justify-center gap-2 whitespace-nowrap cursor-pointer disabled:pointer-events-none min-h-11 px-6 transition-[transform,color,border-color,background-color] duration-300 ease-out",
  {
    variants: {
      variant: {
        gold: "btn-gold",
        solid: "btn-gold-solid",
        outline: "btn-outline",
        ghost: "bg-transparent text-ivory/70 hover:text-gold",
        ivory: "border border-ivory/70 bg-transparent text-ivory hover:bg-ivory hover:text-ink",
      },
      size: {
        default: "h-11 text-[11px] font-medium uppercase tracking-[0.22em]",
        lg: "h-12 px-10 text-[11px] font-medium uppercase tracking-[0.26em]",
        sm: "h-10 px-5 text-[10px] font-medium uppercase tracking-[0.2em]",
        icon: "h-11 w-11 p-0",
      },
    },
    defaultVariants: {
      variant: "gold",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
