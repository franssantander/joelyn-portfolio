import Image from "next/image";
import Link from "next/link";
import { ArrowDown } from "lucide-react";
import { ArtworkCard } from "@/components/artwork-card";
import { CommissionSection } from "@/components/commission-section";
import { TextLink } from "@/components/text-link";
import { getArtworks, getSiteContent } from "@/lib/content";
import { artworkGrid, eyebrow, pageShell, sectionSpace, sectionTitle } from "@/lib/portfolio-styles";
import { cn } from "@/lib/utils";

export default async function Home() {
  const [site, artworks] = await Promise.all([getSiteContent(), getArtworks()]);
  const featured =
    artworks.find((work) => work.slug === site.home.featuredArtworkSlug) ??
    artworks[0];
  const selected = site.home.selectedArtworkSlugs.flatMap((slug) => {
    const work = artworks.find((artwork) => artwork.slug === slug);
    return work ? [work] : [];
  });
  return (
    <>
      <section className={cn(pageShell, "hero grid grid-cols-1 pt-[22px] md:grid-cols-[1.4fr_1fr] md:gap-x-9 md:pt-11 lg:gap-x-[clamp(40px,6vw,86px)] min-[1441px]:pt-[65px]")} aria-labelledby="hero-title">
        {featured && (
          <figure className="hero-artwork animate-gentle-entrance self-center motion-reduce:animate-none">
            <Link
              href={`/works/${featured.slug}`}
              className="block"
              aria-label={`View ${featured.title}`}
            >
              <Image
                className="w-full object-contain"
                src={featured.image.src}
                alt={featured.image.alt}
                width={featured.image.width}
                height={featured.image.height}
                sizes="(max-width: 767px) 100vw, 60vw"
                preload
              />
            </Link>
            <figcaption className="mt-[13px] flex flex-wrap justify-between gap-x-[15px] gap-y-1.5 text-[10px] text-muted-foreground">
              <span className="text-foreground">{featured.title}</span>
              <span>{featured.artist} · {featured.year}</span>
            </figcaption>
          </figure>
        )}
        <div className="hero-intro max-w-[580px] animate-gentle-entrance self-center pt-[45px] [animation-delay:100ms] motion-reduce:animate-none md:max-w-none md:pt-0 md:pb-5">
          <p className={cn(eyebrow, "mb-[27px]")}>
            <span className="size-[5px] rounded-full bg-accent" aria-hidden="true" />
            {site.home.eyebrow}
          </p>
          <h1 id="hero-title" className="mb-[25px] text-[clamp(3.3rem,11.5vw,5.4rem)] leading-[0.96] tracking-[-0.035em] md:text-[clamp(3.2rem,6.6vw,4.5rem)] lg:text-[clamp(4rem,6.25vw,6.1rem)]">
            {site.home.heading.split("\n").map((line, index) => (
              <span
                key={index}
                className={cn("block", index === 1 && "italic")}
              >
                {line}{" "}
              </span>
            ))}
          </h1>
          <p className="mb-[25px] max-w-[38ch] text-[13px] leading-[1.85] text-muted-foreground md:max-w-[33ch]">{site.home.description}</p>
          <TextLink href="/works">Explore the works</TextLink>
        </div>
        <div className="col-span-full mt-[34px] flex items-center justify-between border-b border-border pt-[18px] pb-[26px] text-[9px] text-muted-foreground md:mt-[54px] md:text-[10px]">
          <span className="max-sm:max-w-[29ch]">A quiet space for art &amp; the stories behind it.</span>
          <a href="#selected-works" className="flex size-[38px] items-center justify-center text-foreground" aria-label="Scroll to selected works">
            <ArrowDown size={16} strokeWidth={1.3} />
          </a>
        </div>
      </section>
      <section
        id="selected-works"
        className={cn(pageShell, sectionSpace)}
        aria-labelledby="selected-title"
      >
        <div className="mb-9 flex flex-col items-start justify-between gap-[21px] md:mb-[53px] md:flex-row md:items-end md:gap-8">
          <div>
            <p className={eyebrow}>Selected works</p>
            <h2 id="selected-title" className={sectionTitle}>
              {site.home.worksHeading}
            </h2>
          </div>
          <TextLink className="mb-1 shrink-0" href="/works">View all works</TextLink>
        </div>
        <div className={cn("artwork-grid", artworkGrid)}>
          {selected.map((artwork, index) => (
            <ArtworkCard key={artwork.id} artwork={artwork} index={index} />
          ))}
        </div>
      </section>
      <section
        className={cn(pageShell, sectionSpace, "grid grid-cols-1 items-center gap-[43px] border-t border-border md:grid-cols-[1.05fr_1fr] md:gap-[50px] lg:gap-[clamp(45px,9vw,128px)]")}
        aria-labelledby="home-about-title"
      >
        <figure>
          <Image
            className="w-full"
            src={site.artist.studioImage.src}
            alt={site.artist.studioImage.alt}
            width={site.artist.studioImage.width}
            height={site.artist.studioImage.height}
            sizes="(max-width: 767px) 100vw, 50vw"
          />
          <figcaption className="mt-[14px] text-[10px] text-muted-foreground">
            A little glimpse into the creative process.
          </figcaption>
        </figure>
        <div className="max-w-[54ch] md:max-w-none">
          <p className={eyebrow}>Behind the canvas</p>
          <h2 id="home-about-title" className={cn(sectionTitle, "mb-[27px]")}>
            {site.home.aboutHeading}
          </h2>
          <p className="mb-[25px] max-w-[42ch] text-[13px] leading-[1.9] text-muted-foreground">{site.artist.intro}</p>
          <TextLink href="/about">About the artist</TextLink>
          <span className="mt-7 block w-fit -rotate-6 font-serif text-[42px] text-accent italic md:mt-[42px]" aria-hidden="true">
            {site.artist.name}
          </span>
        </div>
      </section>
      <CommissionSection site={site} />
    </>
  );
}
