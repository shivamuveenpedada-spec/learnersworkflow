import { mathActivitySets } from "@/content";
import { MathPicker } from "@/components/math/MathPicker";

export default function MathPickerPage() {
  return (
    <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-8 px-6 py-16">
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="font-display text-3xl font-extrabold text-[var(--color-ink)] sm:text-4xl">
          Math practice
        </h1>
        <p className="text-[var(--color-ink-soft)]">Pick a level and an activity to try!</p>
      </div>
      <MathPicker activitySets={mathActivitySets} />
    </main>
  );
}
