import Link from "next/link";
import { traceItems } from "@/content";
import { Card } from "@/components/ui/Card";

export default function WritingPickerPage() {
  return (
    <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-8 px-6 py-16">
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="font-display text-3xl font-extrabold text-[var(--color-ink)] sm:text-4xl">
          Handwriting practice
        </h1>
        <p className="text-[var(--color-ink-soft)]">
          Pick a letter or word to trace with your finger or mouse.
        </p>
      </div>
      <div className="grid grid-cols-3 gap-4 sm:grid-cols-5">
        {traceItems.map((item) => (
          <Link key={item.id} href={`/writing/${item.id}`}>
            <Card className="flex aspect-square flex-col items-center justify-center transition-transform hover:-translate-y-1">
              <span className="font-display text-2xl font-bold text-[var(--color-writing)]">
                {item.value}
              </span>
            </Card>
          </Link>
        ))}
      </div>
    </main>
  );
}
