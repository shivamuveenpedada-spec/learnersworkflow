export type Player = "X" | "O";
export type Cell = Player | null;
export type Board = Cell[];

export const EMPTY_BOARD: Board = Array(9).fill(null);

const LINES = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

export function checkWinner(board: Board): Player | null {
  for (const [a, b, c] of LINES) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }
  return null;
}

export function isDraw(board: Board): boolean {
  return board.every((cell) => cell !== null) && !checkWinner(board);
}

export function isGameOver(board: Board): boolean {
  return checkWinner(board) !== null || isDraw(board);
}

// Exhaustive minimax — a 3x3 board makes a full search cheap and gives perfect play.
function minimax(board: Board, player: Player, ai: Player): number {
  const winner = checkWinner(board);
  if (winner === ai) return 1;
  if (winner && winner !== ai) return -1;
  if (isDraw(board)) return 0;

  const scores: number[] = [];
  for (let i = 0; i < board.length; i++) {
    if (board[i] === null) {
      const next = [...board];
      next[i] = player;
      const nextPlayer: Player = player === "X" ? "O" : "X";
      scores.push(minimax(next, nextPlayer, ai));
    }
  }
  return player === ai ? Math.max(...scores) : Math.min(...scores);
}

export function bestMove(board: Board, ai: Player): number {
  const human: Player = ai === "X" ? "O" : "X";
  let bestScore = -Infinity;
  let move = -1;
  for (let i = 0; i < board.length; i++) {
    if (board[i] === null) {
      const next = [...board];
      next[i] = ai;
      const score = minimax(next, human, ai);
      if (score > bestScore) {
        bestScore = score;
        move = i;
      }
    }
  }
  return move;
}
