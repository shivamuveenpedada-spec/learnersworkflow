"use client";

import { useEffect, useState } from "react";
import { GameShell } from "@/games/_shared/GameShell";
import { cn } from "@/lib/cn";
import {
  EMPTY_BOARD,
  bestMove,
  checkWinner,
  isDraw,
  type Board,
} from "./logic";

export function TicTacToe() {
  const [board, setBoard] = useState<Board>(EMPTY_BOARD);
  const [turn, setTurn] = useState<"X" | "O">("X");

  const winner = checkWinner(board);
  const draw = isDraw(board);

  useEffect(() => {
    if (turn === "O" && !winner && !draw) {
      const timer = setTimeout(() => {
        const move = bestMove(board, "O");
        if (move !== -1) {
          setBoard((prev) => {
            const next = [...prev];
            next[move] = "O";
            return next;
          });
          setTurn("X");
        }
      }, 400);
      return () => clearTimeout(timer);
    }
  }, [turn, board, winner, draw]);

  function playerMove(i: number) {
    if (board[i] || winner || draw || turn !== "X") return;
    const next = [...board];
    next[i] = "X";
    setBoard(next);
    setTurn("O");
  }

  function reset() {
    setBoard(EMPTY_BOARD);
    setTurn("X");
  }

  const status = winner
    ? winner === "X"
      ? "You win! 🎉"
      : "The computer wins!"
    : draw
      ? "It's a draw!"
      : turn === "X"
        ? "Your turn (X)"
        : "Computer is thinking...";

  return (
    <GameShell
      title="Tic-Tac-Toe"
      instructions="You're X. Get three in a row to win!"
      onReplay={reset}
    >
      <p className="font-display text-lg font-bold text-[var(--color-ink)]">{status}</p>
      <div className="grid grid-cols-3 gap-2">
        {board.map((cell, i) => (
          <button
            key={i}
            type="button"
            onClick={() => playerMove(i)}
            disabled={!!cell || !!winner || draw}
            className={cn(
              "flex h-20 w-20 items-center justify-center rounded-2xl bg-white font-display text-4xl font-extrabold shadow-[0_4px_0_0_rgba(0,0,0,0.08)]",
              cell === "X" && "text-[var(--color-english)]",
              cell === "O" && "text-[var(--color-math)]"
            )}
          >
            {cell}
          </button>
        ))}
      </div>
    </GameShell>
  );
}
