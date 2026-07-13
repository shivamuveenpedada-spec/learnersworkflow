import { type HTMLAttributes } from "react";
import { cn } from "@/lib/cn";

export function Badge({
  className,
  colorVar,
  ...props
}: HTMLAttributes<HTMLSpanElement> & { colorVar?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-[var(--radius-pill)] px-2.5 py-1 text-xs font-bold",
        className
      )}
      style={
        colorVar
          ? {
              backgroundColor: `color-mix(in srgb, var(${colorVar}) 20%, white)`,
              color: `color-mix(in srgb, var(${colorVar}) 70%, black)`,
            }
          : { backgroundColor: "rgba(0,0,0,0.06)", color: "var(--color-ink-soft)" }
      }
      {...props}
    />
  );
}
