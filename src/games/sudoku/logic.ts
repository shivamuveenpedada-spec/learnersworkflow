import { getSudoku } from "sudoku-gen";

export type SudokuDifficulty = "easy" | "medium" | "hard" | "expert";
export type Cell = number | null; // null = empty
export type Grid = Cell[][]; // 9x9, grid[row][col]

export interface SudokuPuzzle {
  puzzle: Grid;
  solution: Grid;
  givens: boolean[][]; // true = pre-filled clue, not editable
}

// The sudoku-gen package returns 81-char strings using digits 1-9 and '-' for blanks.
// This adapter isolates that shape from the rest of the app.
function sequenceToGrid(sequence: string): Grid {
  const grid: Grid = [];
  for (let r = 0; r < 9; r++) {
    const row: Cell[] = [];
    for (let c = 0; c < 9; c++) {
      const char = sequence[r * 9 + c];
      row.push(char === "-" ? null : Number(char));
    }
    grid.push(row);
  }
  return grid;
}

export function generatePuzzle(difficulty: SudokuDifficulty = "easy"): SudokuPuzzle {
  const { puzzle, solution } = getSudoku(difficulty);
  const puzzleGrid = sequenceToGrid(puzzle);
  const solutionGrid = sequenceToGrid(solution);
  const givens = puzzleGrid.map((row) => row.map((cell) => cell !== null));
  return { puzzle: puzzleGrid, solution: solutionGrid, givens };
}

export function isGridComplete(grid: Grid): boolean {
  return grid.every((row) => row.every((cell) => cell !== null));
}

export function findConflicts(grid: Grid): Set<string> {
  const conflicts = new Set<string>();

  function markIfConflict(cells: [number, number][]) {
    const seen = new Map<number, [number, number][]>();
    for (const [r, c] of cells) {
      const value = grid[r][c];
      if (value === null) continue;
      const existing = seen.get(value) ?? [];
      existing.push([r, c]);
      seen.set(value, existing);
    }
    for (const positions of seen.values()) {
      if (positions.length > 1) {
        for (const [r, c] of positions) conflicts.add(`${r},${c}`);
      }
    }
  }

  for (let r = 0; r < 9; r++) {
    markIfConflict(Array.from({ length: 9 }, (_, c) => [r, c]));
  }
  for (let c = 0; c < 9; c++) {
    markIfConflict(Array.from({ length: 9 }, (_, r) => [r, c]));
  }
  for (let boxRow = 0; boxRow < 3; boxRow++) {
    for (let boxCol = 0; boxCol < 3; boxCol++) {
      const cells: [number, number][] = [];
      for (let r = 0; r < 3; r++) {
        for (let c = 0; c < 3; c++) {
          cells.push([boxRow * 3 + r, boxCol * 3 + c]);
        }
      }
      markIfConflict(cells);
    }
  }

  return conflicts;
}
