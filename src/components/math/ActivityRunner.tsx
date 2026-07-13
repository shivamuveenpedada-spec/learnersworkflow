"use client";

import { useState } from "react";
import Image from "next/image";
import type { MathActivitySet } from "@/content";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";
import { useProgress } from "@/lib/useProgress";

export function ActivityRunner({ activitySet }: { activitySet: MathActivitySet }) {
  const [index, setIndex] = useState(0);
  const [selectedChoiceId, setSelectedChoiceId] = useState<string | null>(null);
  const [stars, setStars] = useState(0);
  const [finished, setFinished] = useState(false);
  const { progress, update } = useProgress();

  const problem = activitySet.problems[index];
  const isLast = index === activitySet.problems.length - 1;

  function selectChoice(choiceId: string, isCorrect: boolean) {
    if (selectedChoiceId) return;
    setSelectedChoiceId(choiceId);
    if (isCorrect) setStars((s) => s + 1);
  }

  function next() {
    if (isLast) {
      setFinished(true);
      const previousBest = progress.math[activitySet.id]?.bestStars ?? 0;
      update((prev) => ({
        ...prev,
        math: {
          ...prev.math,
          [activitySet.id]: {
            bestStars: Math.max(previousBest, stars),
            completed: true,
          },
        },
      }));
      return;
    }
    setIndex((i) => i + 1);
    setSelectedChoiceId(null);
  }

  if (finished) {
    return (
      <Card className="flex flex-col items-center gap-4 text-center">
        <span className="text-5xl">🎉</span>
        <h2 className="font-display text-2xl font-bold text-[var(--color-ink)]">
          Great job!
        </h2>
        <p className="text-[var(--color-ink-soft)]">
          You earned {stars} / {activitySet.problems.length} stars.
        </p>
        <Button
          onClick={() => {
            setIndex(0);
            setSelectedChoiceId(null);
            setStars(0);
            setFinished(false);
          }}
        >
          Play again
        </Button>
      </Card>
    );
  }

  return (
    <Card className="flex flex-col items-center gap-6 text-center">
      <span className="text-sm font-semibold text-[var(--color-ink-soft)]">
        Question {index + 1} of {activitySet.problems.length}
      </span>
      <h2 className="font-display text-xl font-bold text-[var(--color-ink)]">
        {problem.prompt}
      </h2>

      {problem.promptImage && problem.promptItemCount ? (
        <div className="flex flex-wrap justify-center gap-2">
          {Array.from({ length: problem.promptItemCount }).map((_, i) => (
            <div key={i} className="relative h-14 w-14">
              <Image
                src={problem.promptImage!.src}
                alt={problem.promptImage!.alt}
                fill
                className="object-contain"
              />
            </div>
          ))}
        </div>
      ) : problem.promptImage ? (
        <div className="relative h-24 w-24">
          <Image
            src={problem.promptImage.src}
            alt={problem.promptImage.alt}
            fill
            className="object-contain"
          />
        </div>
      ) : null}

      <div className="flex flex-wrap justify-center gap-3">
        {problem.choices.map((choice) => {
          const isSelected = selectedChoiceId === choice.id;
          const showCorrect = selectedChoiceId && choice.isCorrect;
          const showWrong = isSelected && !choice.isCorrect;
          return (
            <button
              key={choice.id}
              type="button"
              onClick={() => selectChoice(choice.id, choice.isCorrect)}
              disabled={!!selectedChoiceId}
              className={cn(
                "flex h-16 w-16 items-center justify-center rounded-2xl font-display text-2xl font-bold shadow-[0_4px_0_0_rgba(0,0,0,0.1)] transition-transform disabled:pointer-events-none",
                showCorrect && "bg-[var(--color-games)] text-white",
                showWrong && "bg-[var(--color-english)] text-white",
                !selectedChoiceId && "bg-white text-[var(--color-ink)] hover:-translate-y-0.5"
              )}
            >
              {choice.label}
            </button>
          );
        })}
      </div>

      {selectedChoiceId && (
        <Button onClick={next}>{isLast ? "See results" : "Next"}</Button>
      )}
    </Card>
  );
}
