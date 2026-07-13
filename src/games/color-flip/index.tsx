"use client";

import { useEffect, useState } from "react";
import { GameShell } from "@/games/_shared/GameShell";
import { cn } from "@/lib/cn";
import {
  applyMove,
  bestMove,
  countDiscs,
  createInitialBoard,
  isGameOver,
  legalMoves,
  type Board,
  type Disc,
} from "./logic";

const PLAYER: Disc = "B";
const AI: Disc = "W";

export function ColorFlip() {
  const [board, setBoard] = useState<Board>(createInitialBoard);
  const [turn, setTurn] = useState<Disc>(PLAYER);

  const gameOver = isGameOver(board);
  const { B, W } = countDiscs(board);
  const playerMoves = legalMoves(board, PLAYER);
  const validMoveSet = new Set(playerMoves.map(([r, c]) => `${r},${c}`));

  useEffect(() => {
    if (gameOver) return;
    if (turn === PLAYER && legalMoves(board, PLAYER).length === 0) {
      const timer = setTimeout(() => setTurn(AI), 500);
      return () => clearTimeout(timer);
    }
    if (turn === AI) {
      const timer = setTimeout(() => {
        const move = bestMove(board, AI);
        if (move) {
          setBoard((prev) => applyMove(prev, move[0], move[1], AI));
        }
        setTurn(PLAYER);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [turn, board, gameOver]);

  function playerMove(row: number, col: number) {
    if (turn !== PLAYER || gameOver) return;
    if (!validMoveSet.has(`${row},${col}`)) return;
    setBoard((prev) => applyMove(prev, row, col, PLAYER));
    setTurn(AI);
  }

  function reset() {
    setBoard(createInitialBoard());
    setTurn(PLAYER);
  }

  const status = gameOver
    ? B > W
      ? "You win! 🎉"
      : B < W
        ? "The computer wins!"
        : "It's a tie!"
    : turn === PLAYER
      ? "Your turn (black)"
      : "Computer is thinking...";

  return (
    <GameShell
      title="Color Flip"
      instructions="Place a black disc to trap white discs between two of yours — they flip to your color!"
      onReplay={reset}
    >
      <div className="flex items-center gap-4 font-display font-bold text-[var(--color-ink)]">
        <span className="flex items-center gap-1.5">
          <span className="h-4 w-4 rounded-full bg-black" /> {B}
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-4 w-4 rounded-full border border-black/20 bg-white" /> {W}
        </span>
      </div>
      <p className="font-display text-lg font-bold text-[var(--color-ink)]">{status}</p>

      <div className="grid grid-cols-8 gap-0.5 rounded-2xl bg-[var(--color-games)] p-2 shadow-md">
        {board.map((rowCells, r) =>
          rowCells.map((cell, c) => (
            <button
              key={`${r}-${c}`}
              type="button"
              onClick={() => playerMove(r, c)}
              disabled={gameOver || turn !== PLAYER}
              className={cn(
                "flex h-8 w-8 items-center justify-center rounded-sm sm:h-9 sm:w-9",
                "bg-[color-mix(in_srgb,var(--color-games)_60%,black)]"
              )}
            >
              {cell && (
                <span
                  className={cn(
                    "h-6 w-6 rounded-full sm:h-7 sm:w-7",
                    cell === "B" ? "bg-black" : "bg-white"
                  )}
                />
              )}
              {!cell && validMoveSet.has(`${r},${c}`) && turn === PLAYER && (
                <span className="h-2 w-2 rounded-full bg-white/50" />
              )}
            </button>
          ))
        )}
      </div>
    </GameShell>
  );
}
