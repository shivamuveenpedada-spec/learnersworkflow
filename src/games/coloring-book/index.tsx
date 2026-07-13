"use client";

import { useState } from "react";
import { GameShell } from "@/games/_shared/GameShell";
import { coloringPages } from "@/content/coloringPages";
import { cn } from "@/lib/cn";

const PALETTE = [
  "#FF5D73",
  "#2F9BFF",
  "#A259FF",
  "#00C2FF",
  "#FFC93C",
  "#00D9A3",
  "#FF9F45",
  "#FFFFFF",
];

export function ColoringBook() {
  const [pageIndex, setPageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState(PALETTE[0]);
  const [fills, setFills] = useState<Record<string, string>>({});

  const page = coloringPages[pageIndex];

  function selectPage(index: number) {
    setPageIndex(index);
    setFills({});
  }

  function fillRegion(regionId: string) {
    setFills((prev) => ({ ...prev, [regionId]: selectedColor }));
  }

  return (
    <GameShell
      title="Coloring Book"
      instructions="Tap a color, then tap a part of the picture to fill it in!"
      onReplay={() => setFills({})}
    >
      <div className="flex gap-2">
        {coloringPages.map((p, i) => (
          <button
            key={p.id}
            type="button"
            onClick={() => selectPage(i)}
            className={cn(
              "rounded-[var(--radius-pill)] px-3 py-1.5 text-sm font-bold shadow-[0_3px_0_0_rgba(0,0,0,0.08)]",
              i === pageIndex ? "bg-[var(--color-writing)] text-white" : "bg-white text-[var(--color-ink)]"
            )}
          >
            {p.title}
          </button>
        ))}
      </div>

      <div className="w-full max-w-xs overflow-hidden rounded-3xl bg-white shadow-md">
        <svg viewBox={page.viewBox} className="w-full touch-none">
          {page.regions.map((region) => (
            <path
              key={region.id}
              d={region.d}
              fill={fills[region.id] ?? "#F3F3F3"}
              stroke="#2B2140"
              strokeWidth={3}
              strokeLinejoin="round"
              onClick={() => fillRegion(region.id)}
              className="cursor-pointer"
            />
          ))}
          <path d={page.outline} fill="none" stroke="#2B2140" strokeWidth={3} strokeLinecap="round" />
        </svg>
      </div>

      <div className="flex flex-wrap justify-center gap-2">
        {PALETTE.map((color) => (
          <button
            key={color}
            type="button"
            aria-label={`Choose color ${color}`}
            onClick={() => setSelectedColor(color)}
            className={cn(
              "h-10 w-10 rounded-full shadow-[0_3px_0_0_rgba(0,0,0,0.15)] transition-transform hover:-translate-y-0.5",
              selectedColor === color && "ring-4 ring-[var(--color-ink)]/40"
            )}
            style={{ backgroundColor: color, border: color === "#FFFFFF" ? "2px solid #ddd" : "none" }}
          />
        ))}
      </div>
    </GameShell>
  );
}
