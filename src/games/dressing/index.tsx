"use client";

import { useState } from "react";
import {
  DndContext,
  useDraggable,
  useDroppable,
  type DragEndEvent,
} from "@dnd-kit/core";
import { GameShell } from "@/games/_shared/GameShell";
import { dressingItems, slotLabels, type ClothingSlot } from "@/content/dressingItems";
import { cn } from "@/lib/cn";

function DraggableItem({
  id,
  emoji,
  label,
  selected,
  onSelect,
}: {
  id: string;
  emoji: string;
  label: string;
  selected: boolean;
  onSelect: () => void;
}) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({ id });

  return (
    <button
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      type="button"
      aria-label={`${label} — drag onto its spot, or select then choose a spot`}
      aria-pressed={selected}
      onClick={onSelect}
      style={
        transform
          ? { transform: `translate3d(${transform.x}px, ${transform.y}px, 0)` }
          : undefined
      }
      className={cn(
        "flex h-16 w-16 touch-none items-center justify-center rounded-2xl bg-white text-3xl shadow-[0_4px_0_0_rgba(0,0,0,0.1)]",
        isDragging && "z-10 opacity-70",
        selected && "ring-4 ring-[var(--color-alphabet)]"
      )}
    >
      {emoji}
    </button>
  );
}

function DroppableSlot({
  id,
  label,
  filledEmoji,
  onClick,
}: {
  id: ClothingSlot;
  label: string;
  filledEmoji?: string;
  onClick: () => void;
}) {
  const { setNodeRef, isOver } = useDroppable({ id });

  return (
    <div className="flex flex-col items-center gap-1">
      <button
        ref={setNodeRef}
        type="button"
        onClick={onClick}
        aria-label={`${label} spot${filledEmoji ? " (filled)" : ""}`}
        className={cn(
          "flex h-16 w-16 items-center justify-center rounded-2xl border-4 border-dashed text-3xl",
          isOver ? "border-[var(--color-alphabet)] bg-[var(--color-alphabet)]/20" : "border-[var(--color-ink)]/15",
          filledEmoji && "border-solid bg-white"
        )}
      >
        {filledEmoji ?? ""}
      </button>
      <span className="text-xs font-semibold text-[var(--color-ink-soft)]">{label}</span>
    </div>
  );
}

export function DressingGame() {
  const [placed, setPlaced] = useState<Partial<Record<ClothingSlot, string>>>({});
  const [bounce, setBounce] = useState<string | null>(null);
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);

  const remainingItems = dressingItems.filter((item) => placed[item.slot] !== item.id);
  const isComplete = dressingItems.every((item) => placed[item.slot] === item.id);

  function tryPlace(itemId: string, slot: ClothingSlot) {
    const item = dressingItems.find((i) => i.id === itemId);
    if (!item) return;
    if (item.slot === slot) {
      setPlaced((prev) => ({ ...prev, [slot]: item.id }));
      setSelectedItemId(null);
    } else {
      setBounce(itemId);
      setTimeout(() => setBounce(null), 300);
    }
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over) return;
    tryPlace(String(active.id), over.id as ClothingSlot);
  }

  function handleSlotClick(slot: ClothingSlot) {
    if (selectedItemId) tryPlace(selectedItemId, slot);
  }

  function reset() {
    setPlaced({});
    setSelectedItemId(null);
  }

  return (
    <GameShell
      title="Dress Up"
      instructions="Drag each item onto the matching spot — or tap an item, then tap its spot — to get ready for the day!"
      onReplay={reset}
    >
      <DndContext onDragEnd={handleDragEnd}>
        <div className="grid grid-cols-4 gap-3">
          <DroppableSlot
            id="head"
            label={slotLabels.head}
            filledEmoji={placed.head ? "🧢" : undefined}
            onClick={() => handleSlotClick("head")}
          />
          <DroppableSlot
            id="top"
            label={slotLabels.top}
            filledEmoji={placed.top ? "👕" : undefined}
            onClick={() => handleSlotClick("top")}
          />
          <DroppableSlot
            id="bottom"
            label={slotLabels.bottom}
            filledEmoji={placed.bottom ? "🩳" : undefined}
            onClick={() => handleSlotClick("bottom")}
          />
          <DroppableSlot
            id="feet"
            label={slotLabels.feet}
            filledEmoji={placed.feet ? "👟" : undefined}
            onClick={() => handleSlotClick("feet")}
          />
        </div>

        {isComplete ? (
          <p className="font-display text-xl font-bold text-[var(--color-ink)]">
            All ready for the day! 🎉
          </p>
        ) : (
          <div className="flex flex-wrap justify-center gap-3">
            {remainingItems.map((item) => (
              <div key={item.id} className={cn(bounce === item.id && "animate-bounce")}>
                <DraggableItem
                  id={item.id}
                  emoji={item.emoji}
                  label={item.label}
                  selected={selectedItemId === item.id}
                  onSelect={() => setSelectedItemId((prev) => (prev === item.id ? null : item.id))}
                />
              </div>
            ))}
          </div>
        )}
      </DndContext>
    </GameShell>
  );
}
