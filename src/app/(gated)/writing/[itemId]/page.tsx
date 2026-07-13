import Link from "next/link";
import { notFound } from "next/navigation";
import { getTraceItemById, traceItems } from "@/content";
import { LetterTracer } from "@/components/tracer/LetterTracer";

export function generateStaticParams() {
  return traceItems.map((item) => ({ itemId: item.id }));
}

export default async function WritingItemPage({
  params,
}: {
  params: Promise<{ itemId: string }>;
}) {
  const { itemId } = await params;
  const item = getTraceItemById(itemId);
  if (!item) notFound();

  return (
    <main className="mx-auto flex w-full max-w-2xl flex-1 flex-col items-center gap-6 px-6 py-16">
      <Link href="/writing" className="self-start text-[var(--color-ink-soft)] hover:underline">
        ← All letters &amp; words
      </Link>
      <h1 className="font-display text-2xl font-extrabold text-[var(--color-ink)]">
        Trace &ldquo;{item.value}&rdquo;
      </h1>
      <LetterTracer itemId={item.id} value={item.value} />
    </main>
  );
}
