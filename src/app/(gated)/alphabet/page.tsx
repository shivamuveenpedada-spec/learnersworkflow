import Link from "next/link";
import { ALPHABET, getLettersWithItems } from "@/content";

export default function AlphabetPickerPage() {
  const active = new Set(getLettersWithItems());

  return (
    <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-8 px-6 py-16">
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="font-display text-3xl font-extrabold text-[var(--color-ink)] sm:text-4xl">
          Pick a letter
        </h1>
        <p className="text-[var(--color-ink-soft)]">
          Click a letter to see animals, fruits, and colors that start with it!
        </p>
      </div>
      <div className="grid grid-cols-4 gap-3 sm:grid-cols-6">
        {ALPHABET.map((letter) => {
          const isActive = active.has(letter);
          return isActive ? (
            <Link
              key={letter}
              href={`/alphabet/${letter}`}
              className="flex aspect-square items-center justify-center rounded-2xl font-display text-2xl font-extrabold text-white shadow-[0_4px_0_0_rgba(0,0,0,0.1)] transition-transform hover:-translate-y-0.5"
              style={{ backgroundColor: "var(--color-alphabet)" }}
            >
              {letter}
            </Link>
          ) : (
            <span
              key={letter}
              aria-disabled
              className="flex aspect-square items-center justify-center rounded-2xl font-display text-2xl font-extrabold text-[var(--color-ink)]/30"
              style={{ backgroundColor: "color-mix(in srgb, var(--color-alphabet) 12%, white)" }}
            >
              {letter}
            </span>
          );
        })}
      </div>
    </main>
  );
}
