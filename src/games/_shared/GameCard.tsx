import Link from "next/link";
import { Card } from "@/components/ui/Card";

export function GameCard({
  href,
  emoji,
  label,
}: {
  href: string;
  emoji: string;
  label: string;
}) {
  return (
    <Link href={href}>
      <Card className="flex flex-col items-center gap-2 transition-transform hover:-translate-y-1">
        <span className="text-4xl">{emoji}</span>
        <span className="font-display text-base font-bold text-[var(--color-ink)]">{label}</span>
      </Card>
    </Link>
  );
}
