import { Card } from "@/components/ui/Card";
import { GameCard } from "@/games/_shared/GameCard";

const games = [
  {
    href: "/games/tic-tac-toe",
    emoji: "❌",
    label: "Tic-Tac-Toe",
    description: "Beat the computer",
    colorVar: "--color-english",
    available: true,
  },
  {
    href: "/games/coloring-book",
    emoji: "🎨",
    label: "Coloring Book",
    description: "Pick a color, fill it in",
    colorVar: "--color-writing",
    available: true,
  },
  {
    href: "/games/color-flip",
    emoji: "⚫",
    label: "Color Flip",
    description: "Flip the board your way",
    colorVar: "--color-ink",
    available: true,
  },
  {
    href: "/games/dressing",
    emoji: "👕",
    label: "Dress Up",
    description: "Get ready for the day",
    colorVar: "--color-alphabet",
    available: true,
  },
  {
    href: "/games/sudoku",
    emoji: "🔢",
    label: "Sudoku",
    description: "Fill in the numbers",
    colorVar: "--color-math",
    available: false,
  },
  {
    href: "/games/chess",
    emoji: "♟️",
    label: "Chess",
    description: "Outsmart the computer",
    colorVar: "--color-science",
    available: false,
  },
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
            <GameCard
              key={game.href}
              href={game.href}
              emoji={game.emoji}
              label={game.label}
              description={game.description}
              colorVar={game.colorVar}
            />
          ) : (
            <Card key={game.href} className="flex flex-col items-center gap-2 opacity-60">
              <span
                className="flex h-16 w-16 items-center justify-center rounded-full text-3xl"
                style={{ backgroundColor: `color-mix(in srgb, var(${game.colorVar}) 30%, white)` }}
              >
                {game.emoji}
              </span>
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
