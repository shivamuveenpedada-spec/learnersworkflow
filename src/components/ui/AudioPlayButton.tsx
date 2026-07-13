"use client";

import { useRef } from "react";
import type { AudioAsset } from "@/content";
import { cn } from "@/lib/cn";

export function AudioPlayButton({
  audio,
  className,
  label = "Play sound",
}: {
  audio: AudioAsset;
  className?: string;
  label?: string;
}) {
  const ref = useRef<HTMLAudioElement>(null);

  return (
    <button
      type="button"
      aria-label={label}
      onClick={() => {
        ref.current?.play().catch(() => {});
      }}
      className={cn(
        "flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-md transition-transform active:scale-90",
        className
      )}
    >
      <audio ref={ref} src={audio.src} preload="none" />
      <span aria-hidden className="text-2xl">
        🔊
      </span>
    </button>
  );
}
