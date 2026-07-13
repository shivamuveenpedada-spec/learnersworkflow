import { Chess, type Move } from "chess.js";

export type ChessDifficulty = "easy" | "medium";

const PIECE_VALUES: Record<string, number> = { p: 100, n: 320, b: 330, r: 500, q: 900, k: 0 };

// Encourages central control / development — deliberately simple, no endgame tables.
const PAWN_TABLE = [
  0, 0, 0, 0, 0, 0, 0, 0,
  50, 50, 50, 50, 50, 50, 50, 50,
  10, 10, 20, 30, 30, 20, 10, 10,
  5, 5, 10, 25, 25, 10, 5, 5,
  0, 0, 0, 20, 20, 0, 0, 0,
  5, -5, -10, 0, 0, -10, -5, 5,
  5, 10, 10, -20, -20, 10, 10, 5,
  0, 0, 0, 0, 0, 0, 0, 0,
];

function squareIndex(square: string, color: "w" | "b"): number {
  const file = square.charCodeAt(0) - "a".charCodeAt(0);
  const rank = Number(square[1]) - 1;
  const row = color === "w" ? 7 - rank : rank;
  return row * 8 + file;
}

function evaluateBoard(chess: Chess, aiColor: "w" | "b"): number {
  const board = chess.board();
  let score = 0;

  for (const row of board) {
    for (const cell of row) {
      if (!cell) continue;
      let value = PIECE_VALUES[cell.type];
      if (cell.type === "p") value += PAWN_TABLE[squareIndex(cell.square, cell.color)] * 0.5;
      score += cell.color === aiColor ? value : -value;
    }
  }
  return score;
}

function minimax(
  chess: Chess,
  depth: number,
  alpha: number,
  beta: number,
  maximizing: boolean,
  aiColor: "w" | "b"
): number {
  if (depth === 0 || chess.isGameOver()) {
    return evaluateBoard(chess, aiColor);
  }

  const moves = chess.moves({ verbose: true }) as Move[];

  if (maximizing) {
    let best = -Infinity;
    for (const move of moves) {
      chess.move(move);
      best = Math.max(best, minimax(chess, depth - 1, alpha, beta, false, aiColor));
      chess.undo();
      alpha = Math.max(alpha, best);
      if (beta <= alpha) break;
    }
    return best;
  } else {
    let best = Infinity;
    for (const move of moves) {
      chess.move(move);
      best = Math.min(best, minimax(chess, depth - 1, alpha, beta, true, aiColor));
      chess.undo();
      beta = Math.min(beta, best);
      if (beta <= alpha) break;
    }
    return best;
  }
}

// "easy" plays a mostly-random legal move (occasionally grabs a free capture) so young
// kids can win; "medium" does a shallow depth-2 search — still very beatable, not a
// tuned engine.
export function findBestMove(fen: string, difficulty: ChessDifficulty): Move | null {
  const chess = new Chess(fen);
  const moves = chess.moves({ verbose: true }) as Move[];
  if (moves.length === 0) return null;

  if (difficulty === "easy") {
    const captures = moves.filter((m) => m.captured);
    if (captures.length > 0 && Math.random() < 0.6) {
      return captures[Math.floor(Math.random() * captures.length)];
    }
    return moves[Math.floor(Math.random() * moves.length)];
  }

  const aiColor = chess.turn();
  let bestScore = -Infinity;
  let bestMoves: Move[] = [];
  for (const move of moves) {
    chess.move(move);
    const score = minimax(chess, 2, -Infinity, Infinity, false, aiColor);
    chess.undo();
    if (score > bestScore) {
      bestScore = score;
      bestMoves = [move];
    } else if (score === bestScore) {
      bestMoves.push(move);
    }
  }
  return bestMoves[Math.floor(Math.random() * bestMoves.length)];
}
