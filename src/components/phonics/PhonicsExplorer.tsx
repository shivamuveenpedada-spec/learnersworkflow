"use client";

import { useState } from "react";
import Image from "next/image";
import { ALPHABET, type PhonicsLetter } from "@/content";
import { Card } from "@/components/ui/Card";
import { AudioPlayButton } from "@/components/ui/AudioPlayButton";
import { cn } from "@/lib/cn";

export function PhonicsExplorer({ letters }: { letters: PhonicsLetter[] }) {
  const available = new Set(letters.map((l) => l.letter));
  const [selected, setSelected] = useState<string>(letters[0]?.letter ?? "A");
  const current = letters.find((l) => l.letter === selected);

  return (
    <div className="flex flex-col gap-8">
      <div className="grid grid-cols-6 gap-2 sm:grid-cols-9">
        {ALPHABET.map((letter) => {
          const isAvailable = available.has(letter);
          const isSelected = letter === selected;
          return (
            <button
              key={letter}
              type="button"
              disabled={!isAvailable}
              onClick={() => setSelected(letter)}
              className={cn(
                "flex aspect-square items-center justify-center rounded-xl font-display text-lg font-bold transition-transform",
                isAvailable
                  ? "text-white hover:-translate-y-0.5"
                  : "text-[var(--color-ink)]/25"
              )}
              style={{
                backgroundColor: isAvailable
                  ? "var(--color-phonics)"
                  : "color-mix(in srgb, var(--color-phonics) 12%, white)",
                outline: isSelected ? "3px solid var(--color-ink)" : "none",
              }}
            >
              {letter}
            </button>
          );
        })}
      </div>

      {current && (
        <Card className="flex flex-col items-center gap-6">
          <div className="flex items-center gap-4">
            <span className="font-display text-5xl font-extrabold text-[var(--color-ink)]">
              {current.letter}
            </span>
            <AudioPlayButton audio={current.sound} label={`Play the ${current.letter} sound`} />
          </div>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
            {current.exampleWords.map((word) => (
              <div key={word.word} className="flex flex-col items-center gap-2">
                <div className="relative h-20 w-20 overflow-hidden rounded-2xl">
                  <Image src={word.image.src} alt={word.image.alt} fill className="object-cover" />
                </div>
                <span className="font-semibold text-[var(--color-ink)]">{word.word}</span>
                <AudioPlayButton audio={word.audio} label={`Play ${word.word}`} />
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
}
