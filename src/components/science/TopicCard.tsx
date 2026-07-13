import Link from "next/link";
import Image from "next/image";
import type { ScienceTopic } from "@/content";
import { tierLabels } from "@/content";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

export function TopicCard({ topic }: { topic: ScienceTopic }) {
  return (
    <Link href={`/science/${topic.id}`}>
      <Card className="flex flex-col gap-3 overflow-hidden p-0 transition-transform hover:-translate-y-1">
        <div className="relative aspect-[16/10] w-full">
          <Image src={topic.heroImage.src} alt={topic.heroImage.alt} fill className="object-cover" />
        </div>
        <div className="flex flex-col gap-2 px-4 pb-4">
          <span className="font-display text-lg font-bold text-[var(--color-ink)]">
            {topic.title}
          </span>
          <div className="flex flex-wrap items-center gap-2">
            <Badge colorVar="--color-science">{tierLabels[topic.tier]}</Badge>
            <Badge>{topic.facts.length} fun facts</Badge>
          </div>
          <div className="flex gap-2">
            {topic.previewImages.map((img) => (
              <div key={img.src} className="relative h-12 w-12 overflow-hidden rounded-lg">
                <Image src={img.src} alt={img.alt} fill className="object-cover" />
              </div>
            ))}
          </div>
        </div>
      </Card>
    </Link>
  );
}
