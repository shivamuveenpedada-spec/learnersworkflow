"use client";

import { useMemo, useState } from "react";
import { GameShell } from "@/games/_shared/GameShell";
import { cn } from "@/lib/cn";
import {
  findConflicts,
  generatePuzzle,
  isGridComplete,
  type Grid,
  type SudokuDifficulty,
} from "./logic";

const DIFFICULTIES: SudokuDifficulty[] = ["easy", "medium", "hard"];

export function Sudoku() {
  const [difficulty, setDifficulty] = useState<SudokuDifficulty>("easy");
  const [puzzleData, setPuzzleData] = useState(() => generatePuzzle("easy"));
  const [grid, setGrid] = useState<Grid>(puzzleData.puzzle);
  const [selected, setSelected] = useState<[number, number] | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const conflicts = useMemo(() => findConflicts(grid), [grid]);

  function newPuzzle(nextDifficulty: SudokuDifficulty) {
    const data = generatePuzzle(nextDifficulty);
    setPuzzleData(data);
    setGrid(data.puzzle);
    setSelected(null);
    setMessage(null);
    setDifficulty(nextDifficulty);
  }

  function selectCell(r: number, c: number) {
    if (puzzleData.givens[r][c]) return;
    setSelected([r, c]);
    setMessage(null);
  }

  function enterNumber(value: number | null) {
    if (!selected) return;
    const [r, c] = selected;
    setGrid((prev) => {
      const next = prev.map((row) => [...row]);
      next[r][c] = value;
      return next;
    });
  }

  function checkAnswer() {
    if (!isGridComplete(grid)) {
      setMessage("Fill in every square first!");
      return;
    }
    if (conflicts.size === 0) {
      setMessage("You solved it! 🎉");
    } else {
      setMessage("A few numbers don't match yet — check the highlighted squares.");
    }
  }

  return (
    <GameShell
      title="Sudoku"
      instructions="Fill every row, column, and 3x3 box with the numbers 1-9, no repeats!"
      onReplay={() => newPuzzle(difficulty)}
    >
      <div className="flex gap-2">
        {DIFFICULTIES.map((d) => (
          <button
            key={d}
            type="button"
            onClick={() => newPuzzle(d)}
            className={cn(
              "rounded-[var(--radius-pill)] px-3 py-1.5 text-sm font-bold capitalize shadow-[0_3px_0_0_rgba(0,0,0,0.08)]",
              d === difficulty ? "bg-[var(--color-math)] text-white" : "bg-white text-[var(--color-ink)]"
            )}
          >
            {d}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-9 gap-[2px] rounded-2xl bg-[var(--color-ink)]/20 p-1 shadow-md">
        {grid.map((row, r) =>
          row.map((cell, c) => {
            const isGiven = puzzleData.givens[r][c];
            const isSelected = selected?.[0] === r && selected?.[1] === c;
            const isConflict = conflicts.has(`${r},${c}`);
            const thickRight = c === 2 || c === 5;
            const thickBottom = r === 2 || r === 5;
            return (
              <button
                key={`${r}-${c}`}
                type="button"
                onClick={() => selectCell(r, c)}
                className={cn(
                  "flex h-8 w-8 items-center justify-center text-base font-bold sm:h-9 sm:w-9",
                  isGiven ? "bg-[var(--color-ink)]/10 text-[var(--color-ink)]" : "bg-white text-[var(--color-math)]",
                  isSelected && "outline outline-2 outline-[var(--color-math)]",
                  isConflict && "bg-[var(--color-english)]/20 text-[var(--color-english)]",
                  thickRight && "mr-[2px]",
                  thickBottom && "mb-[2px]"
                )}
              >
                {cell ?? ""}
              </button>
            );
          })
        )}
      </div>

      <div className="grid grid-cols-5 gap-2">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
          <button
            key={n}
            type="button"
            onClick={() => enterNumber(n)}
            disabled={!selected}
            className="flex h-10 w-10 items-center justify-center rounded-xl bg-white font-display text-lg font-bold text-[var(--color-ink)] shadow-[0_3px_0_0_rgba(0,0,0,0.08)] disabled:opacity-40"
          >
            {n}
          </button>
        ))}
        <button
          type="button"
          onClick={() => enterNumber(null)}
          disabled={!selected}
          aria-label="Clear cell"
          className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-lg font-bold text-[var(--color-english)] shadow-[0_3px_0_0_rgba(0,0,0,0.08)] disabled:opacity-40"
        >
          ✕
        </button>
      </div>

      <button
        type="button"
        onClick={checkAnswer}
        className="rounded-[var(--radius-pill)] bg-[var(--color-games)] px-6 py-2.5 font-display font-bold text-white shadow-[0_4px_0_0_rgba(0,0,0,0.12)]"
      >
        Check my answer
      </button>
      {message && <p className="font-semibold text-[var(--color-ink)]">{message}</p>}
    </GameShell>
  );
}
