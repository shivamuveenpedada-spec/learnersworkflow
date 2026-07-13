"use client";

import { type ReactNode } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export function GameShell({
  title,
  instructions,
  onReplay,
  children,
}: {
  title: string;
  instructions: string;
  onReplay?: () => void;
  children: ReactNode;
}) {
  return (
    <main className="mx-auto flex w-full max-w-2xl flex-1 flex-col items-center gap-6 px-6 py-16">
      <Link href="/games" className="self-start text-[var(--color-ink-soft)] hover:underline">
        ← All games
      </Link>
      <h1 className="font-display text-2xl font-extrabold text-[var(--color-ink)]">{title}</h1>
      <p className="max-w-md text-center text-[var(--color-ink-soft)]">{instructions}</p>
      {children}
      {onReplay && (
        <Button variant="secondary" onClick={onReplay}>
          Play again
        </Button>
      )}
    </main>
  );
}
