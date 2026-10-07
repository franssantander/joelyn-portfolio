import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { TextLink } from "@/components/text-link";
import { getArtworkBySlug, getArtworks, getSiteContent } from "@/lib/content";
import { detailBottom, eyebrow, imageCredit, pageShell, prose, sectionSpace } from "@/lib/portfolio-styles";
import { cn } from "@/lib/utils";

type ArtworkPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const artworks = await getArtworks();
  return artworks.map((artwork) => ({ slug: artwork.slug }));
}

export async function generateMetadata({ params }: ArtworkPageProps): Promise<Metadata> {
  const { slug } = await params;
  const artwork = await getArtworkBySlug(slug);
  if (!artwork) notFound();

  return {
    title: artwork.title,
    description: artwork.description,
    openGraph: {
      title: `${artwork.title} — ${artwork.artist}`,
      description: artwork.description,
      images: [{ url: artwork.image.src, alt: artwork.image.alt, width: artwork.image.width, height: artwork.image.height }],
    },
  };
}

export default async function ArtworkPage({ params }: ArtworkPageProps) {
  const { slug } = await params;
  const [artwork, site, artworks] = await Promise.all([
    getArtworkBySlug(slug),
    getSiteContent(),
    getArtworks(),
  ]);
  if (!artwork) notFound();

  const collection = site.collections.find((item) => item.id === artwork.collectionId);
  const nextArtwork = artworks[(artworks.findIndex((item) => item.slug === slug) + 1) % artworks.length];
  const inquiryHref = `mailto:${site.contact.email}?subject=${encodeURIComponent(`Artwork inquiry: ${artwork.title}`)}`;

  return (
    <article className={cn("detail-page", pageShell, sectionSpace, "pt-[52px]")}>
      <div className="mb-[35px] flex items-center justify-between gap-5 md:mb-[50px]">
        <TextLink href="/works" direction="back">All works</TextLink>
        <p className={cn(eyebrow, "m-0")}>{collection?.label ?? "Artwork"}</p>
      </div>
      <figure className="text-center">
        <Image
          className="detail-image mx-auto max-h-[80vh] w-auto max-w-full object-contain"
          src={artwork.image.src}
          alt={artwork.image.alt}
          width={artwork.image.width}
          height={artwork.image.height}
          sizes="(max-width: 768px) 92vw, 80vw"
          preload
        />
        {artwork.image.credit && (
          <figcaption className={cn(imageCredit, "mt-5")}>
            <a href={artwork.image.credit.url} target="_blank" rel="noreferrer">{artwork.image.credit.label}</a>
            {" · "}{artwork.image.credit.license}
          </figcaption>
        )}
      </figure>
      <div className="mx-auto mt-[45px] max-w-[800px] text-center md:mt-[70px]">
        <p className={cn(eyebrow, "justify-center")}>A closer look</p>
        <h1 className="mb-4 text-[46px] tracking-[-0.025em] md:text-[clamp(3rem,5.5vw,5rem)]">{artwork.title}</h1>
        <p className="mb-[30px] text-[14px] text-muted-foreground">{artwork.artist}</p>
        <dl className="mt-8 mb-11 flex flex-wrap justify-center gap-x-[25px] gap-y-5 border-y border-border py-[25px] md:gap-x-[42px] md:gap-y-[22px] [&_dt]:mb-2 [&_dt]:text-[9px] [&_dt]:tracking-[0.14em] [&_dt]:text-muted-foreground [&_dt]:uppercase [&_dd]:m-0 [&_dd]:text-[12px]">
          <div><dt>Medium</dt><dd>{artwork.medium}</dd></div>
          <div><dt>Year</dt><dd>{artwork.year}</dd></div>
          <div><dt>Dimensions</dt><dd>{artwork.dimensions}</dd></div>
        </dl>
        <p className={cn(prose, "mx-auto")}>{artwork.description}</p>
        <p className={imageCredit}>Public-domain demo artwork by {artwork.artist}.</p>
        <TextLink className="mt-[25px]" href={inquiryHref} external>Start a conversation about this work</TextLink>
        {site.contact.isPlaceholder && <p className={cn(imageCredit, "max-w-[43ch]")}>The demo contact address is a placeholder and is not monitored.</p>}
      </div>
      <div className={detailBottom}>
        <TextLink href="/works" direction="back">Back to the gallery</TextLink>
        {nextArtwork && nextArtwork.slug !== artwork.slug && (
          <TextLink href={`/works/${nextArtwork.slug}`}>Next work: {nextArtwork.title}</TextLink>
        )}
      </div>
    </article>
  );
}
