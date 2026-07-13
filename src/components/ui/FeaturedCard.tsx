import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/Badge";

export function FeaturedCard({
  href,
  imageSrc,
  imageAlt,
  title,
  badge,
  colorVar,
}: {
  href: string;
  imageSrc: string;
  imageAlt: string;
  title: string;
  badge: string;
  colorVar: string;
}) {
  return (
    <Link href={href} className="w-40 shrink-0 sm:w-48">
      <div className="flex flex-col gap-2 rounded-[var(--radius-card)] bg-white p-3 shadow-[0_6px_0_0_rgba(0,0,0,0.08)] transition-transform hover:-translate-y-1">
        <div className="relative aspect-square w-full overflow-hidden rounded-2xl">
          <Image src={imageSrc} alt={imageAlt} fill className="object-cover" />
        </div>
        <span className="font-display text-sm font-bold leading-tight text-[var(--color-ink)]">
          {title}
        </span>
        <Badge colorVar={colorVar}>{badge}</Badge>
      </div>
    </Link>
  );
}
