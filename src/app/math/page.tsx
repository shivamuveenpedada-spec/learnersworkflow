import Link from "next/link";
import { mathActivitySets } from "@/content";
import { Card } from "@/components/ui/Card";

export default function MathPickerPage() {
  return (
    <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-8 px-6 py-16">
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="font-display text-3xl font-extrabold text-[var(--color-ink)] sm:text-4xl">
          Math practice
        </h1>
        <p className="text-[var(--color-ink-soft)]">Pick an activity to try!</p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        {mathActivitySets.map((set) => (
          <Link key={set.id} href={`/math/${set.id}`}>
            <Card className="flex flex-col gap-2 transition-transform hover:-translate-y-1">
              <span className="font-display text-lg font-bold text-[var(--color-ink)]">
                {set.title}
              </span>
              <span className="text-sm text-[var(--color-ink-soft)]">
                {set.problems.length} problems · {set.tier}
              </span>
            </Card>
          </Link>
        ))}
      </div>
    </main>
  );
}
