import Link from "next/link";
import { notFound } from "next/navigation";
import { ebooks, getEbookById } from "@/content";
import { EbookReader } from "@/components/ebook/EbookReader";

export function generateStaticParams() {
  return ebooks.map((book) => ({ bookId: book.id }));
}

export default async function EbookPage({
  params,
}: {
  params: Promise<{ bookId: string }>;
}) {
  const { bookId } = await params;
  const book = getEbookById(bookId);
  if (!book) notFound();

  return (
    <main className="mx-auto flex w-full max-w-2xl flex-1 flex-col gap-6 px-6 py-16">
      <Link href="/english" className="self-start text-[var(--color-ink-soft)] hover:underline">
        ← Library
      </Link>
      <h1 className="text-center font-display text-2xl font-extrabold text-[var(--color-ink)]">
        {book.title}
      </h1>
      <EbookReader book={book} />
    </main>
  );
}
