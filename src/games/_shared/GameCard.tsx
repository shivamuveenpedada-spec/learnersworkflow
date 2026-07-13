import Link from "next/link";

export function GameCard({
  href,
  emoji,
  label,
  description,
  colorVar = "--color-games",
}: {
  href: string;
  emoji: string;
  label: string;
  description?: string;
  colorVar?: string;
}) {
  return (
    <Link
      href={href}
      className="flex flex-col items-center gap-2 rounded-[var(--radius-card)] border-4 p-5 text-center shadow-[0_6px_0_0_rgba(0,0,0,0.1)] transition-transform hover:-translate-y-1"
      style={{
        backgroundColor: `color-mix(in srgb, var(${colorVar}) 18%, white)`,
        borderColor: `var(${colorVar})`,
      }}
    >
      <span
        className="flex h-16 w-16 items-center justify-center rounded-full text-3xl shadow-[0_3px_0_0_rgba(0,0,0,0.15)]"
        style={{ backgroundColor: `var(${colorVar})` }}
      >
        {emoji}
      </span>
      <span className="font-display text-base font-bold text-[var(--color-ink)]">{label}</span>
      {description && (
        <span className="text-xs text-[var(--color-ink-soft)]">{description}</span>
      )}
    </Link>
  );
}
