export type Disc = "B" | "W" | null;
export type Board = Disc[][]; // 8x8, board[row][col]

export const SIZE = 8;

const DIRECTIONS = [
  [-1, -1], [-1, 0], [-1, 1],
  [0, -1], [0, 1],
  [1, -1], [1, 0], [1, 1],
];

export function createInitialBoard(): Board {
  const board: Board = Array.from({ length: SIZE }, () => Array(SIZE).fill(null));
  board[3][3] = "W";
  board[3][4] = "B";
  board[4][3] = "B";
  board[4][4] = "W";
  return board;
}

function inBounds(r: number, c: number) {
  return r >= 0 && r < SIZE && c >= 0 && c < SIZE;
}

function opponent(player: Disc): Disc {
  return player === "B" ? "W" : "B";
}

// Cells that would be flipped if `player` plays at (row, col). Empty array = illegal move.
export function flipsForMove(board: Board, row: number, col: number, player: Disc): [number, number][] {
  if (board[row][col] !== null) return [];
  const allFlips: [number, number][] = [];

  for (const [dr, dc] of DIRECTIONS) {
    const lineFlips: [number, number][] = [];
    let r = row + dr;
    let c = col + dc;
    while (inBounds(r, c) && board[r][c] === opponent(player)) {
      lineFlips.push([r, c]);
      r += dr;
      c += dc;
    }
    if (inBounds(r, c) && board[r][c] === player && lineFlips.length > 0) {
      allFlips.push(...lineFlips);
    }
  }
  return allFlips;
}

export function legalMoves(board: Board, player: Disc): [number, number][] {
  const moves: [number, number][] = [];
  for (let r = 0; r < SIZE; r++) {
    for (let c = 0; c < SIZE; c++) {
      if (flipsForMove(board, r, c, player).length > 0) moves.push([r, c]);
    }
  }
  return moves;
}

export function applyMove(board: Board, row: number, col: number, player: Disc): Board {
  const flips = flipsForMove(board, row, col, player);
  const next = board.map((row) => [...row]);
  next[row][col] = player;
  for (const [r, c] of flips) next[r][c] = player;
  return next;
}

export function countDiscs(board: Board): { B: number; W: number } {
  let B = 0;
  let W = 0;
  for (const row of board) {
    for (const cell of row) {
      if (cell === "B") B++;
      if (cell === "W") W++;
    }
  }
  return { B, W };
}

export function isGameOver(board: Board): boolean {
  return legalMoves(board, "B").length === 0 && legalMoves(board, "W").length === 0;
}

// Static positional weights — corners are very strong, cells adjacent to an empty
// corner are risky (they let the opponent take the corner), edges are decent.
const WEIGHTS = [
  [100, -20, 10, 5, 5, 10, -20, 100],
  [-20, -50, -2, -2, -2, -2, -50, -20],
  [10, -2, 1, 1, 1, 1, -2, 10],
  [5, -2, 1, 1, 1, 1, -2, 5],
  [5, -2, 1, 1, 1, 1, -2, 5],
  [10, -2, 1, 1, 1, 1, -2, 10],
  [-20, -50, -2, -2, -2, -2, -50, -20],
  [100, -20, 10, 5, 5, 10, -20, 100],
];

function heuristic(board: Board, player: Disc): number {
  let score = 0;
  for (let r = 0; r < SIZE; r++) {
    for (let c = 0; c < SIZE; c++) {
      if (board[r][c] === player) score += WEIGHTS[r][c];
      else if (board[r][c] === opponent(player)) score -= WEIGHTS[r][c];
    }
  }
  const mobility = legalMoves(board, player).length - legalMoves(board, opponent(player)).length;
  return score + mobility * 3;
}

function minimax(
  board: Board,
  depth: number,
  maximizing: boolean,
  ai: Disc,
  alpha: number,
  beta: number
): number {
  const current = maximizing ? ai : opponent(ai);
  const moves = legalMoves(board, current);

  if (depth === 0 || (moves.length === 0 && legalMoves(board, opponent(current)).length === 0)) {
    return heuristic(board, ai);
  }

  if (moves.length === 0) {
    // Pass turn.
    return minimax(board, depth - 1, !maximizing, ai, alpha, beta);
  }

  if (maximizing) {
    let best = -Infinity;
    for (const [r, c] of moves) {
      const next = applyMove(board, r, c, current);
      best = Math.max(best, minimax(next, depth - 1, false, ai, alpha, beta));
      alpha = Math.max(alpha, best);
      if (beta <= alpha) break;
    }
    return best;
  } else {
    let best = Infinity;
    for (const [r, c] of moves) {
      const next = applyMove(board, r, c, current);
      best = Math.min(best, minimax(next, depth - 1, true, ai, alpha, beta));
      beta = Math.min(beta, best);
      if (beta <= alpha) break;
    }
    return best;
  }
}

// Depth 3 is a deliberately shallow, beatable difficulty appropriate for kids.
export function bestMove(board: Board, ai: Disc, depth = 3): [number, number] | null {
  const moves = legalMoves(board, ai);
  if (moves.length === 0) return null;

  let bestScore = -Infinity;
  let move = moves[0];
  for (const [r, c] of moves) {
    const next = applyMove(board, r, c, ai);
    const score = minimax(next, depth - 1, false, ai, -Infinity, Infinity);
    if (score > bestScore) {
      bestScore = score;
      move = [r, c];
    }
  }
  return move;
}
