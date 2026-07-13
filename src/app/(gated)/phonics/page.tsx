import { phonicsLetters } from "@/content";
import { PhonicsExplorer } from "@/components/phonics/PhonicsExplorer";

export default function PhonicsPage() {
  return (
    <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-8 px-6 py-16">
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="font-display text-3xl font-extrabold text-[var(--color-ink)] sm:text-4xl">
          Phonics sounds
        </h1>
        <p className="text-[var(--color-ink-soft)]">
          Tap a letter to hear its sound and see some example words.
        </p>
      </div>
      <PhonicsExplorer letters={phonicsLetters} />
    </main>
  );
}
