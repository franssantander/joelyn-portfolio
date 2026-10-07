import type { Metadata } from "next";
import { CommissionSection } from "@/components/commission-section";
import { GalleryFilter } from "@/components/gallery-filter";
import { PageHeading } from "@/components/page-heading";
import { getArtworks, getSiteContent } from "@/lib/content";
import { imageCredit, pageShell, sectionSpace } from "@/lib/portfolio-styles";
import { cn } from "@/lib/utils";

export async function generateMetadata(): Promise<Metadata> {
  const [site, artworks] = await Promise.all([getSiteContent(), getArtworks()]);
  const image = artworks[0]?.image;
  return {
    title: "Works",
    description: site.pages.works.description,
    openGraph: {
      title: `Works | ${site.artist.name}`,
      description: site.pages.works.description,
      images: image ? [{ url: image.src, alt: image.alt, width: image.width, height: image.height }] : [],
    },
  };
}

export default async function WorksPage() {
  const [site, artworks] = await Promise.all([getSiteContent(), getArtworks()]);

  return (
    <>
      <div className={cn(pageShell, sectionSpace)}>
        <PageHeading
          eyebrow={site.pages.works.eyebrow}
          title={site.pages.works.title}
          description={site.pages.works.description}
        />
        <GalleryFilter artworks={artworks} collections={site.collections} />
        <p className={cn(imageCredit, "mt-4 mb-0")}>This demo gallery features public-domain paintings, credited to their original artists.</p>
      </div>
      <CommissionSection site={site} />
    </>
  );
}
