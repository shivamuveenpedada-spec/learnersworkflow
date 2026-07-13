"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import type { Ebook } from "@/content";
import { Button } from "@/components/ui/Button";
import { useProgress } from "@/lib/useProgress";
import { withBasePath } from "@/lib/basePath";

export function EbookReader({ book }: { book: Ebook }) {
  const [pageIndex, setPageIndex] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);
  const touchStartX = useRef<number | null>(null);
  const { progress, update } = useProgress();
  const hasResumed = useRef(false);

  const page = book.pages[pageIndex];
  const isFirst = pageIndex === 0;
  const isLast = pageIndex === book.pages.length - 1;

  useEffect(() => {
    if (hasResumed.current) return;
    const saved = progress.ebooks[book.id];
    if (saved && saved.lastPage > 0 && !saved.completed) {
      setPageIndex(Math.min(saved.lastPage, book.pages.length - 1));
    }
    hasResumed.current = true;
  }, [progress, book.id, book.pages.length]);

  useEffect(() => {
    update((prev) => ({
      ...prev,
      ebooks: {
        ...prev.ebooks,
        [book.id]: {
          lastPage: pageIndex,
          completed: pageIndex === book.pages.length - 1,
        },
      },
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageIndex, book.id]);

  function goTo(next: number) {
    if (next < 0 || next >= book.pages.length) return;
    audioRef.current?.pause();
    setPageIndex(next);
  }

  function onKeyDown(e: React.KeyboardEvent) {
    if (e.key === "ArrowRight") goTo(pageIndex + 1);
    if (e.key === "ArrowLeft") goTo(pageIndex - 1);
  }

  function onTouchStart(e: React.TouchEvent) {
    touchStartX.current = e.touches[0].clientX;
  }

  function onTouchEnd(e: React.TouchEvent) {
    if (touchStartX.current === null) return;
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(delta) > 50) {
      goTo(delta < 0 ? pageIndex + 1 : pageIndex - 1);
    }
    touchStartX.current = null;
  }

  return (
    <div
      tabIndex={0}
      onKeyDown={onKeyDown}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      className="flex flex-col items-center gap-6 outline-none"
    >
      <div className="relative aspect-[4/3] w-full max-w-lg overflow-hidden rounded-3xl bg-white shadow-md">
        <Image
          src={page.illustration.src}
          alt={page.illustration.alt}
          fill
          priority={pageIndex === 0}
          className="object-cover"
        />
      </div>

      <p className="max-w-md text-center text-xl font-semibold text-[var(--color-ink)]">
        {page.text}
      </p>

      <div className="flex items-center gap-4">
        <Button variant="secondary" onClick={() => goTo(pageIndex - 1)} disabled={isFirst}>
          ← Back
        </Button>

        {page.audio && (
          <button
            type="button"
            aria-label="Read this page aloud"
            onClick={() => audioRef.current?.play().catch(() => {})}
            className="flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-md active:scale-90"
          >
            <audio ref={audioRef} src={withBasePath(page.audio.src)} preload="none" />
            <span aria-hidden className="text-2xl">
              🔊
            </span>
          </button>
        )}

        <Button onClick={() => goTo(pageIndex + 1)} disabled={isLast}>
          Next →
        </Button>
      </div>

      <div className="flex gap-1.5" aria-hidden>
        {book.pages.map((p, i) => (
          <span
            key={p.pageNumber}
            className="h-2 w-2 rounded-full"
            style={{
              backgroundColor:
                i === pageIndex ? "var(--color-english)" : "color-mix(in srgb, var(--color-english) 25%, white)",
            }}
          />
        ))}
      </div>
    </div>
  );
}
