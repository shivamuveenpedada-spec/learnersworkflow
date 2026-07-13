"use client";

import { useState } from "react";
import Link from "next/link";
import type { DifficultyTier, MathActivitySet, MathActivityType } from "@/content";
import { tierLabels } from "@/content";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/cn";

const typeIcons: Record<MathActivityType, string> = {
  counting: "🔢",
  addition: "➕",
  subtraction: "➖",
};

const tierOrder: DifficultyTier[] = ["preschool", "earlyElementary", "elementary"];

export function MathPicker({ activitySets }: { activitySets: MathActivitySet[] }) {
  const [filter, setFilter] = useState<DifficultyTier | "all">("all");

  const filtered =
    filter === "all" ? activitySets : activitySets.filter((set) => set.tier === filter);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap justify-center gap-2">
        <button
          type="button"
          onClick={() => setFilter("all")}
          className={cn(
            "rounded-[var(--radius-pill)] px-4 py-2 text-sm font-bold shadow-[0_3px_0_0_rgba(0,0,0,0.08)] transition-transform hover:-translate-y-0.5",
            filter === "all" ? "bg-[var(--color-math)] text-white" : "bg-white text-[var(--color-ink)]"
          )}
        >
          All levels
        </button>
        {tierOrder.map((tier) => (
          <button
            key={tier}
            type="button"
            onClick={() => setFilter(tier)}
            className={cn(
              "rounded-[var(--radius-pill)] px-4 py-2 text-sm font-bold shadow-[0_3px_0_0_rgba(0,0,0,0.08)] transition-transform hover:-translate-y-0.5",
              filter === tier ? "bg-[var(--color-math)] text-white" : "bg-white text-[var(--color-ink)]"
            )}
          >
            {tierLabels[tier]}
          </button>
        ))}
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {filtered.map((set) => (
          <Link key={set.id} href={`/math/${set.id}`}>
            <Card className="flex items-center gap-4 transition-transform hover:-translate-y-1">
              <span
                className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl text-3xl"
                style={{ backgroundColor: "var(--color-math)" }}
              >
                {typeIcons[set.type]}
              </span>
              <div className="flex flex-col gap-1.5">
                <span className="font-display text-lg font-bold text-[var(--color-ink)]">
                  {set.title}
                </span>
                <div className="flex flex-wrap gap-1.5">
                  <Badge colorVar="--color-math">{tierLabels[set.tier]}</Badge>
                  <Badge>{set.problems.length} problems</Badge>
                </div>
              </div>
            </Card>
          </Link>
        ))}
        {filtered.length === 0 && (
          <p className="col-span-full text-center text-[var(--color-ink-soft)]">
            No activities at this level yet — more coming soon!
          </p>
        )}
      </div>
    </div>
  );
}
