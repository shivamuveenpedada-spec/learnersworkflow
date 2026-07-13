"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/Button";
import { useProgress } from "@/lib/useProgress";

export function LetterTracer({ itemId, value }: { itemId: string; value: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const drawingRef = useRef(false);
  const [hasInk, setHasInk] = useState(false);
  const { update } = useProgress();

  function getContext() {
    const canvas = canvasRef.current;
    if (!canvas) return null;
    return canvas.getContext("2d");
  }

  function resizeCanvas() {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const dpr = window.devicePixelRatio || 1;
    const rect = container.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    canvas.style.width = `${rect.width}px`;
    canvas.style.height = `${rect.height}px`;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.scale(dpr, dpr);
      ctx.lineJoin = "round";
      ctx.lineCap = "round";
      ctx.lineWidth = 14;
      ctx.strokeStyle = "#9b5de5";
    }
  }

  useEffect(() => {
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    return () => window.removeEventListener("resize", resizeCanvas);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  function clear() {
    const ctx = getContext();
    const canvas = canvasRef.current;
    if (!ctx || !canvas) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setHasInk(false);
  }

  function pointerDown(e: React.PointerEvent<HTMLCanvasElement>) {
    const canvas = canvasRef.current;
    const ctx = getContext();
    if (!canvas || !ctx) return;
    canvas.setPointerCapture(e.pointerId);
    drawingRef.current = true;
    const rect = canvas.getBoundingClientRect();
    ctx.beginPath();
    ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top);
    if (!hasInk) {
      update((prev) => ({
        ...prev,
        writing: { ...prev.writing, [itemId]: { practiced: true } },
      }));
    }
    setHasInk(true);
  }

  function pointerMove(e: React.PointerEvent<HTMLCanvasElement>) {
    if (!drawingRef.current) return;
    const canvas = canvasRef.current;
    const ctx = getContext();
    if (!canvas || !ctx) return;
    const rect = canvas.getBoundingClientRect();
    ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top);
    ctx.stroke();
  }

  function pointerUp() {
    drawingRef.current = false;
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <div
        ref={containerRef}
        className="relative h-64 w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-inner"
      >
        {/* Practice-paper guide lines */}
        <div className="pointer-events-none absolute inset-0 flex flex-col justify-between py-6">
          <div className="border-t-2 border-dashed border-[var(--color-ink)]/15" />
          <div className="border-t-2 border-dashed border-[var(--color-ink)]/15" />
          <div className="border-t-4 border-[var(--color-ink)]/25" />
        </div>
        {/* Ghost guide glyph */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 flex items-center justify-center font-display text-[8rem] font-extrabold leading-none text-[var(--color-ink)]/20"
        >
          {value}
        </div>
        <canvas
          ref={canvasRef}
          className="absolute inset-0 touch-none"
          onPointerDown={pointerDown}
          onPointerMove={pointerMove}
          onPointerUp={pointerUp}
          onPointerCancel={pointerUp}
        />
      </div>
      <div className="flex gap-3">
        <Button variant="secondary" onClick={clear} disabled={!hasInk}>
          Clear
        </Button>
      </div>
    </div>
  );
}
