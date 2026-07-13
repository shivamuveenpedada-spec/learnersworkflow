import Link from "next/link";

export function SubjectTile({
  href,
  emoji,
  label,
  colorVar,
}: {
  href: string;
  emoji: string;
  label: string;
  colorVar: string;
}) {
  return (
    <Link
      href={href}
      className="group flex flex-col items-center justify-center gap-3 rounded-[var(--radius-card)] border-4 p-8 text-center shadow-[0_8px_0_0_rgba(0,0,0,0.12)] transition-transform hover:-translate-y-1.5 hover:rotate-1 active:translate-y-0 active:shadow-none"
      style={{
        backgroundColor: `color-mix(in srgb, var(${colorVar}) 22%, white)`,
        borderColor: `var(${colorVar})`,
      }}
    >
      <span
        className="flex h-20 w-20 items-center justify-center rounded-full text-4xl shadow-[0_4px_0_0_rgba(0,0,0,0.15)] transition-transform group-hover:scale-110 group-hover:-rotate-6"
        style={{ backgroundColor: `var(${colorVar})` }}
      >
        {emoji}
      </span>
      <span className="font-display text-xl font-extrabold text-[var(--color-ink)]">
        {label}
      </span>
    </Link>
  );
}
