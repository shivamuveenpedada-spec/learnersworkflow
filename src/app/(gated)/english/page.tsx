import Link from "next/link";
import Image from "next/image";
import { ebooks, tierLabels } from "@/content";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

export default function EnglishLibraryPage() {
  return (
    <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-8 px-6 py-16">
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="font-display text-3xl font-extrabold text-[var(--color-ink)] sm:text-4xl">
          Ebook library
        </h1>
        <p className="text-[var(--color-ink-soft)]">Pick a book to read!</p>
      </div>
      <div className="grid grid-cols-2 gap-5 sm:grid-cols-3">
        {ebooks.map((book) => (
          <Link key={book.id} href={`/english/${book.id}`}>
            <Card className="flex flex-col items-center gap-3 overflow-hidden p-0 transition-transform hover:-translate-y-1">
              <div className="relative aspect-[3/4] w-full">
                <Image src={book.coverImage.src} alt={book.coverImage.alt} fill className="object-cover" />
              </div>
              <div className="flex w-full flex-col items-center gap-2 px-3 pb-4">
                <span className="text-center font-display text-base font-bold leading-tight text-[var(--color-ink)]">
                  {book.title}
                </span>
                <div className="flex flex-wrap justify-center gap-1.5">
                  <Badge colorVar="--color-english">{tierLabels[book.tier]}</Badge>
                  <Badge>{book.pages.length} pages</Badge>
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </main>
  );
}
