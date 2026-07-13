"use client";

import Link from "next/link";
import { ebooks } from "@/content";
import { useProgress } from "@/lib/useProgress";
import { Card } from "@/components/ui/Card";

export function ContinueStrip() {
  const { progress } = useProgress();

  const inProgress = Object.entries(progress.ebooks)
    .filter(([, p]) => !p.completed && p.lastPage > 0)
    .map(([bookId, p]) => ({ book: ebooks.find((b) => b.id === bookId), p }))
    .filter((entry): entry is { book: NonNullable<typeof entry.book>; p: typeof entry.p } => !!entry.book);

  if (inProgress.length === 0) return null;

  const { book, p } = inProgress[0];

  return (
    <Link href={`/english/${book.id}`} className="w-full max-w-md">
      <Card className="flex items-center justify-between gap-3 bg-[color-mix(in_srgb,var(--color-english)_10%,white)]">
        <div className="flex flex-col">
          <span className="text-xs font-semibold uppercase text-[var(--color-ink-soft)]">
            Continue reading
          </span>
          <span className="font-display font-bold text-[var(--color-ink)]">{book.title}</span>
        </div>
        <span className="text-sm text-[var(--color-ink-soft)]">
          Page {p.lastPage + 1} of {book.pages.length}
        </span>
      </Card>
    </Link>
  );
}
