import Link from "next/link";
import { notFound } from "next/navigation";
import { categories, getItemsByLetter, getLettersWithItems } from "@/content";
import { ItemCard } from "@/components/alphabet/ItemCard";

export function generateStaticParams() {
  return getLettersWithItems().map((letter) => ({ letter }));
}

export default async function AlphabetLetterPage({
  params,
}: {
  params: Promise<{ letter: string }>;
}) {
  const { letter } = await params;
  const upper = letter.toUpperCase();
  const grouped = getItemsByLetter(upper);
  const hasAny = Object.values(grouped).some((items) => items.length > 0);

  if (!hasAny) {
    notFound();
  }

  return (
    <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-10 px-6 py-16">
      <div className="flex items-center justify-between">
        <Link href="/alphabet" className="text-[var(--color-ink-soft)] hover:underline">
          ← All letters
        </Link>
        <h1 className="font-display text-4xl font-extrabold text-[var(--color-ink)]">
          {upper}
        </h1>
        <span className="w-20" aria-hidden />
      </div>

      {categories.map((category) => {
        const items = grouped[category.id];
        if (items.length === 0) return null;
        return (
          <section key={category.id} className="flex flex-col gap-4">
            <h2 className="flex items-center gap-2 font-display text-xl font-bold text-[var(--color-ink)]">
              <span aria-hidden>{category.icon}</span> {category.label}
            </h2>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
              {items.map((item) => (
                <ItemCard key={item.id} item={item} />
              ))}
            </div>
          </section>
        );
      })}
    </main>
  );
}
