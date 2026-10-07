"use client";

import { useState } from "react";
import { ArtworkCard } from "@/components/artwork-card";
import type { Artwork, SiteContent } from "@/lib/content/types";
import { artworkGrid } from "@/lib/portfolio-styles";
import { cn } from "@/lib/utils";

type GalleryFilterProps = {
  artworks: Artwork[];
  collections: SiteContent["collections"];
};

export function GalleryFilter({ artworks, collections }: GalleryFilterProps) {
  const [collection, setCollection] = useState("all");
  const visibleArtworks = collection === "all"
    ? artworks
    : artworks.filter((artwork) => artwork.collectionId === collection);

  return (
    <section aria-label="Artwork gallery">
      <h2 className="sr-only">Artwork collection</h2>
      <div className="filter-bar mb-9 flex items-end justify-between gap-2.5 border-b border-border pb-[18px] sm:items-center sm:gap-5">
        <div className="filter-options flex flex-wrap gap-x-[22px] gap-y-0 sm:gap-x-[27px] sm:gap-y-2.5" role="group" aria-label="Filter by collection">
          {[{ id: "all", label: "All works" }, ...collections].map((item) => (
            <button
              className="filter-button min-h-10 border-0 border-b border-transparent bg-transparent px-0 py-[3px] text-[11px] text-muted-foreground hover:border-accent hover:text-accent aria-pressed:border-accent aria-pressed:text-accent sm:text-[12px]"
              key={item.id}
              type="button"
              aria-pressed={collection === item.id}
              aria-controls="works-gallery"
              onClick={() => setCollection(item.id)}
            >
              {item.label}
            </button>
          ))}
        </div>
        <p className="filter-count m-0 pb-[11px] text-[9px] whitespace-nowrap text-muted-foreground sm:pb-0 sm:text-[10px]" aria-live="polite" aria-atomic="true">
          {visibleArtworks.length} {visibleArtworks.length === 1 ? "work" : "works"}
        </p>
      </div>
      <div className={cn("artwork-grid", artworkGrid)} id="works-gallery">
        {visibleArtworks.map((artwork, index) => (
          <ArtworkCard artwork={artwork} index={index} key={artwork.id} />
        ))}
      </div>
      {visibleArtworks.length === 0 && (
        <p className="py-20 text-muted-foreground">New works for this collection are coming soon.</p>
      )}
    </section>
  );
}
