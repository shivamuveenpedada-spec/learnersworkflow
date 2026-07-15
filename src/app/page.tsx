import Image from "next/image";
import { SubjectTile } from "@/components/ui/SubjectTile";
import { ContinueStrip } from "@/components/ui/ContinueStrip";
import { FeaturedCard } from "@/components/ui/FeaturedCard";
import { AuthNav } from "@/components/auth/AuthNav";
import { ebooks, mathActivitySets, scienceTopics } from "@/content";

const tiles = [
  { href: "/english", emoji: "📖", label: "English", colorVar: "--color-english" },
  { href: "/math", emoji: "🔢", label: "Math", colorVar: "--color-math" },
  { href: "/science", emoji: "🔬", label: "Science", colorVar: "--color-science" },
  { href: "/writing", emoji: "✏️", label: "Writing", colorVar: "--color-writing" },
  { href: "/phonics", emoji: "🔤", label: "Phonics", colorVar: "--color-phonics" },
  { href: "/alphabet", emoji: "🐝", label: "Alphabet", colorVar: "--color-alphabet" },
  { href: "/games", emoji: "🎲", label: "Games", colorVar: "--color-games" },
];

const badges = [
  { emoji: "🚫", label: "No ads. Ever." },
  { emoji: "👩‍🏫", label: "Made by a teacher" },
  { emoji: "🎉", label: "Free for families" },
];

const featured = [
  {
    href: `/english/${ebooks[0].id}`,
    imageSrc: ebooks[0].coverImage.src,
    imageAlt: ebooks[0].coverImage.alt,
    title: ebooks[0].title,
    badge: "Ebook",
    colorVar: "--color-english",
  },
  {
    href: `/math/${mathActivitySets[0].id}`,
    imageSrc: "/images/placeholder/math-star.svg",
    imageAlt: "Counting practice",
    title: mathActivitySets[0].title,
    badge: "Math game",
    colorVar: "--color-math",
  },
  {
    href: `/science/${scienceTopics[0].id}`,
    imageSrc: scienceTopics[0].heroImage.src,
    imageAlt: scienceTopics[0].heroImage.alt,
    title: scienceTopics[0].title,
    badge: "Science",
    colorVar: "--color-science",
  },
  {
    href: "/games/tic-tac-toe",
    imageSrc: "/images/placeholder/math-ball.svg",
    imageAlt: "Tic-Tac-Toe",
    title: "Tic-Tac-Toe",
    badge: "Game",
    colorVar: "--color-games",
  },
  {
    href: "/alphabet/A",
    imageSrc: "/images/generated/fruit-apple.png",
    imageAlt: "Letter A",
    title: "Letter A: Apple",
    badge: "Alphabet",
    colorVar: "--color-alphabet",
  },
];

export default function Home() {
  return (
    <>
      <main className="mx-auto flex w-full max-w-4xl flex-1 flex-col items-center gap-10 px-6 pt-16 pb-24">
        <div className="flex w-full justify-end">
          <AuthNav />
        </div>
        <div className="flex flex-col items-center gap-4 text-center">
          <span
            aria-hidden
            className="relative flex h-24 w-24 items-center justify-center overflow-hidden rounded-full shadow-[0_6px_0_0_rgba(0,0,0,0.15)]"
            style={{ backgroundColor: "var(--color-alphabet)" }}
          >
            <Image
              src="/images/generated/mascot-fox.png"
              alt=""
              fill
              priority
              className="object-cover"
            />
          </span>
          <h1 className="font-display text-4xl font-extrabold text-[var(--color-ink)] sm:text-5xl">
            LearnersWorkflow
          </h1>
          <p className="max-w-md text-lg text-[var(--color-ink-soft)]">
            Read, count, trace, and play — pick something fun below!
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2">
            {badges.map((badge) => (
              <span
                key={badge.label}
                className="flex items-center gap-1.5 rounded-[var(--radius-pill)] bg-white px-3 py-1.5 text-sm font-semibold text-[var(--color-ink)] shadow-[0_3px_0_0_rgba(0,0,0,0.08)]"
              >
                <span aria-hidden>{badge.emoji}</span>
                {badge.label}
              </span>
            ))}
          </div>
        </div>

        <ContinueStrip />

        <div className="grid w-full grid-cols-2 gap-5 sm:grid-cols-3">
          {tiles.map((tile) => (
            <SubjectTile key={tile.href} {...tile} />
          ))}
        </div>

        <section className="flex w-full flex-col gap-3">
          <h2 className="font-display text-xl font-bold text-[var(--color-ink)]">
            Featured for you
          </h2>
          <div className="-mx-6 flex gap-4 overflow-x-auto px-6 pb-2">
            {featured.map((item) => (
              <FeaturedCard key={item.href} {...item} />
            ))}
          </div>
        </section>

        <a
          href="/about"
          className="text-sm font-semibold text-[var(--color-ink-soft)] underline underline-offset-4 hover:text-[var(--color-ink)]"
        >
          About the founder
        </a>
      </main>

      <div
        aria-hidden
        className="relative h-16 w-full overflow-hidden"
        style={{ backgroundColor: "var(--color-grass)" }}
      >
        <div
          className="absolute inset-x-0 top-0 h-3"
          style={{ backgroundColor: "var(--color-grass-dark)", opacity: 0.25 }}
        />
      </div>
    </>
  );
}
