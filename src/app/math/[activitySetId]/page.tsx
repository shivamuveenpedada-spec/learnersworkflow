import Link from "next/link";
import { notFound } from "next/navigation";
import { getMathActivitySetById, mathActivitySets } from "@/content";
import { ActivityRunner } from "@/components/math/ActivityRunner";

export function generateStaticParams() {
  return mathActivitySets.map((set) => ({ activitySetId: set.id }));
}

export default async function MathActivityPage({
  params,
}: {
  params: Promise<{ activitySetId: string }>;
}) {
  const { activitySetId } = await params;
  const activitySet = getMathActivitySetById(activitySetId);
  if (!activitySet) notFound();

  return (
    <main className="mx-auto flex w-full max-w-2xl flex-1 flex-col gap-6 px-6 py-16">
      <Link href="/math" className="text-[var(--color-ink-soft)] hover:underline">
        ← All activities
      </Link>
      <h1 className="text-center font-display text-2xl font-extrabold text-[var(--color-ink)]">
        {activitySet.title}
      </h1>
      <ActivityRunner activitySet={activitySet} />
    </main>
  );
}
