import { type HTMLAttributes } from "react";
import { cn } from "@/lib/cn";

export function Card({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "rounded-[var(--radius-card)] bg-[var(--color-card)] shadow-[0_6px_0_0_rgba(0,0,0,0.06)] p-6",
        className
      )}
      {...props}
    />
  );
}
