import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Artwork } from "@/lib/content/types";

export function ArtworkCard({
  artwork,
}: {
  artwork: Artwork;
  index?: number;
}) {
  return (
    <article
      className="artwork-card pt-0 sm:max-lg:even:pt-[58px] lg:[&:nth-child(3n+2)]:pt-[76px] lg:[&:nth-child(3n+3)]:pt-[25px]"
    >
      <Link href={`/works/${artwork.slug}`} className="group block">
        <div className="overflow-hidden">
          <Image
            className="w-full object-contain transition-transform duration-[450ms] ease-[ease] group-hover:scale-[1.012] motion-reduce:transition-none"
            src={artwork.image.src}
            alt={artwork.image.alt}
            width={artwork.image.width}
            height={artwork.image.height}
            sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 33vw"
          />
        </div>
        <div className="mt-[19px] flex items-start justify-between gap-3">
          <h3 className="mb-[7px] text-[28px] leading-[1.15] decoration-accent decoration-1 underline-offset-[5px] group-hover:underline sm:text-[25px]">{artwork.title}</h3>
          <ArrowUpRight className="mt-1 shrink-0 text-muted-foreground" size={18} strokeWidth={1.2} aria-hidden="true" />
        </div>
        <p className="mb-0 text-[10px] leading-[1.8] tracking-[0.07em] text-muted-foreground uppercase sm:text-[9px]">
          {artwork.medium} <span className="px-[5px]" aria-hidden="true">·</span> {artwork.year}
        </p>
      </Link>
    </article>
  );
}
