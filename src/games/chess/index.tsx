"use client";

import { useRef, useState } from "react";
import { Chess } from "chess.js";
import { Chessboard } from "react-chessboard";
import { GameShell } from "@/games/_shared/GameShell";
import { cn } from "@/lib/cn";
import { findBestMove, type ChessDifficulty } from "./logic";

const PLAYER_COLOR = "w";

export function ChessGame() {
  const gameRef = useRef(new Chess());
  const [fen, setFen] = useState(gameRef.current.fen());
  const [difficulty, setDifficulty] = useState<ChessDifficulty>("easy");
  const [thinking, setThinking] = useState(false);

  function statusText(): string {
    const game = gameRef.current;
    if (game.isCheckmate()) {
      return game.turn() === PLAYER_COLOR ? "Checkmate — the computer wins!" : "Checkmate — you win! 🎉";
    }
    if (game.isStalemate() || game.isDraw()) return "It's a draw!";
    if (thinking) return "Computer is thinking...";
    if (game.turn() === PLAYER_COLOR) return game.isCheck() ? "Your turn — you're in check!" : "Your turn (white)";
    return "Computer's turn";
  }

  function maybeAiMove() {
    const game = gameRef.current;
    if (game.isGameOver() || game.turn() === PLAYER_COLOR) return;
    setThinking(true);
    setTimeout(() => {
      const move = findBestMove(game.fen(), difficulty);
      if (move) {
        game.move(move);
        setFen(game.fen());
      }
      setThinking(false);
    }, 400);
  }

  function onPieceDrop({ sourceSquare, targetSquare }: { sourceSquare: string; targetSquare: string | null }) {
    if (!targetSquare || thinking) return false;
    const game = gameRef.current;
    if (game.turn() !== PLAYER_COLOR) return false;

    try {
      const move = game.move({ from: sourceSquare, to: targetSquare, promotion: "q" });
      if (!move) return false;
    } catch {
      return false;
    }

    setFen(game.fen());
    maybeAiMove();
    return true;
  }

  function newGame() {
    gameRef.current = new Chess();
    setFen(gameRef.current.fen());
    setThinking(false);
  }

  return (
    <GameShell
      title="Chess"
      instructions="You're white — drag a piece to move it. Try to checkmate the computer's king!"
      onReplay={newGame}
    >
      <div className="flex gap-2">
        {(["easy", "medium"] as ChessDifficulty[]).map((d) => (
          <button
            key={d}
            type="button"
            onClick={() => setDifficulty(d)}
            className={cn(
              "rounded-[var(--radius-pill)] px-3 py-1.5 text-sm font-bold capitalize shadow-[0_3px_0_0_rgba(0,0,0,0.08)]",
              d === difficulty ? "bg-[var(--color-science)] text-white" : "bg-white text-[var(--color-ink)]"
            )}
          >
            {d}
          </button>
        ))}
      </div>

      <p className="font-display text-lg font-bold text-[var(--color-ink)]">{statusText()}</p>

      <div className="w-full max-w-sm">
        <Chessboard
          options={{
            position: fen,
            onPieceDrop,
            boardOrientation: "white",
            allowDragging: !thinking && gameRef.current.turn() === PLAYER_COLOR,
          }}
        />
      </div>
    </GameShell>
  );
}
