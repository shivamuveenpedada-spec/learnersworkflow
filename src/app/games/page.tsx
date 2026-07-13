import { Card } from "@/components/ui/Card";
import { GameCard } from "@/games/_shared/GameCard";

const games = [
  { href: "/games/tic-tac-toe", emoji: "❌", label: "Tic-Tac-Toe", available: true },
  { href: "/games/coloring-book", emoji: "🎨", label: "Coloring Book", available: false },
  { href: "/games/color-flip", emoji: "⚫", label: "Color Flip", available: false },
  { href: "/games/dressing", emoji: "👕", label: "Dress Up", available: false },
  { href: "/games/sudoku", emoji: "🔢", label: "Sudoku", available: false },
  { href: "/games/chess", emoji: "♟️", label: "Chess", available: false },
];

export default function GamesHubPage() {
  return (
    <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-8 px-6 py-16">
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="font-display text-3xl font-extrabold text-[var(--color-ink)] sm:text-4xl">
          Games
        </h1>
        <p className="text-[var(--color-ink-soft)]">Pick a game to play!</p>
      </div>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
        {games.map((game) =>
          game.available ? (
            <GameCard key={game.href} href={game.href} emoji={game.emoji} label={game.label} />
          ) : (
            <Card key={game.href} className="flex flex-col items-center gap-2 opacity-50">
              <span className="text-4xl">{game.emoji}</span>
              <span className="font-display text-base font-bold text-[var(--color-ink)]">
                {game.label}
              </span>
              <span className="text-xs text-[var(--color-ink-soft)]">Coming soon</span>
            </Card>
          )
        )}
      </div>
    </main>
  );
}
