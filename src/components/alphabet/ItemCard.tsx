import Image from "next/image";
import type { CategoryItem } from "@/content";
import { Card } from "@/components/ui/Card";
import { AudioPlayButton } from "@/components/ui/AudioPlayButton";

export function ItemCard({ item }: { item: CategoryItem }) {
  return (
    <Card className="flex flex-col items-center gap-3 p-4">
      <div className="relative h-28 w-28 overflow-hidden rounded-2xl">
        <Image src={item.image.src} alt={item.image.alt} fill className="object-cover" />
      </div>
      <span className="font-display text-lg font-bold text-[var(--color-ink)]">
        {item.name}
      </span>
      <AudioPlayButton audio={item.audio} label={`Play ${item.name}`} />
    </Card>
  );
}
