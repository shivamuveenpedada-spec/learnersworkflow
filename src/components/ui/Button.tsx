import { type ButtonHTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/cn";

const buttonStyles = cva(
  "inline-flex items-center justify-center gap-2 rounded-[var(--radius-pill)] font-display font-semibold transition-transform active:scale-95 disabled:opacity-50 disabled:pointer-events-none",
  {
    variants: {
      variant: {
        primary:
          "bg-[var(--color-english)] text-white shadow-[0_5px_0_0_rgba(0,0,0,0.18)] hover:brightness-105 active:shadow-none active:translate-y-1",
        secondary:
          "bg-white text-[var(--color-ink)] border-2 border-[var(--color-ink)]/15 shadow-[0_4px_0_0_rgba(0,0,0,0.08)] hover:border-[var(--color-ink)]/30 active:shadow-none active:translate-y-1",
        ghost: "bg-transparent text-[var(--color-ink)] hover:bg-black/5",
      },
      size: {
        md: "h-12 px-6 text-base",
        lg: "h-14 px-8 text-lg",
        icon: "h-12 w-12",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonStyles> {}

export function Button({ className, variant, size, ...props }: ButtonProps) {
  return (
    <button className={cn(buttonStyles({ variant, size }), className)} {...props} />
  );
}
