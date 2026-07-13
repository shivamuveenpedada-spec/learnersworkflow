"use client";

import { useState } from "react";
import Image from "next/image";
import type { ScienceTopic } from "@/content";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { AudioPlayButton } from "@/components/ui/AudioPlayButton";
import { cn } from "@/lib/cn";

export function TopicExplorer({ topic }: { topic: ScienceTopic }) {
  const [factIndex, setFactIndex] = useState(0);
  const [showQuiz, setShowQuiz] = useState(false);
  const [selectedChoiceId, setSelectedChoiceId] = useState<string | null>(null);

  const fact = topic.facts[factIndex];
  const isLastFact = factIndex === topic.facts.length - 1;

  function next() {
    if (isLastFact) {
      if (topic.quiz) setShowQuiz(true);
      return;
    }
    setFactIndex((i) => i + 1);
  }

  if (showQuiz && topic.quiz) {
    return (
      <Card className="flex flex-col items-center gap-6 text-center">
        <span className="text-4xl">🔬</span>
        <h2 className="font-display text-xl font-bold text-[var(--color-ink)]">
          {topic.quiz.prompt}
        </h2>
        <div className="flex flex-wrap justify-center gap-3">
          {topic.quiz.choices.map((choice) => {
            const isSelected = selectedChoiceId === choice.id;
            const showCorrect = selectedChoiceId && choice.isCorrect;
            const showWrong = isSelected && !choice.isCorrect;
            return (
              <button
                key={choice.id}
                type="button"
                disabled={!!selectedChoiceId}
                onClick={() => setSelectedChoiceId(choice.id)}
                className={cn(
                  "rounded-2xl px-5 py-3 font-display text-lg font-bold shadow-[0_4px_0_0_rgba(0,0,0,0.1)] disabled:pointer-events-none",
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
          <p className="font-semibold text-[var(--color-ink)]">
            {topic.quiz.choices.find((c) => c.id === selectedChoiceId)?.isCorrect
              ? "Correct! Great job! 🎉"
              : "Nice try! Keep exploring."}
          </p>
        )}
      </Card>
    );
  }

  return (
    <Card className="flex flex-col items-center gap-6 text-center">
      <span className="text-sm font-semibold text-[var(--color-ink-soft)]">
        Fact {factIndex + 1} of {topic.facts.length}
      </span>
      <div className="relative h-40 w-40 overflow-hidden rounded-2xl">
        <Image src={fact.image.src} alt={fact.image.alt} fill className="object-cover" />
      </div>
      <p className="max-w-sm text-lg font-semibold text-[var(--color-ink)]">{fact.text}</p>
      <div className="flex items-center gap-4">
        {fact.audio && <AudioPlayButton audio={fact.audio} label="Read this fact aloud" />}
        <Button onClick={next}>{isLastFact ? (topic.quiz ? "Take the quiz" : "Done!") : "Next fact"}</Button>
      </div>
    </Card>
  );
}
