import type { Metadata } from "next";
import Image from "next/image";
import { CommissionSection } from "@/components/commission-section";
import { PageHeading } from "@/components/page-heading";
import { TextLink } from "@/components/text-link";
import { getSiteContent } from "@/lib/content";
import { eyebrow, imageCredit, pageShell, prose, sectionSpace } from "@/lib/portfolio-styles";
import { cn } from "@/lib/utils";

export async function generateMetadata(): Promise<Metadata> {
  const site = await getSiteContent();
  return {
    title: "About",
    description: site.pages.about.description,
    openGraph: {
      title: `About ${site.artist.name}`,
      description: site.pages.about.description,
      images: [{ url: site.artist.studioImage.src, alt: site.artist.studioImage.alt, width: site.artist.studioImage.width, height: site.artist.studioImage.height }],
    },
  };
}

export default async function AboutPage() {
  const site = await getSiteContent();
  const image = site.artist.studioImage;

  return (
    <>
      <div className={cn(pageShell, sectionSpace)}>
        <PageHeading eyebrow={site.pages.about.eyebrow} title={site.pages.about.title} description={site.pages.about.description} />
        <div className="grid grid-cols-1 items-start gap-[43px] md:grid-cols-[1.1fr_1fr] md:gap-[clamp(45px,7vw,100px)]">
          <figure>
            <Image className="w-full" src={image.src} alt={image.alt} width={image.width} height={image.height} sizes="(max-width: 768px) 92vw, 48vw" />
            {image.credit && (
              <figcaption className={imageCredit}>
                <a href={image.credit.url} target="_blank" rel="noreferrer">{image.credit.label}</a>
                {" · "}{image.credit.license}
              </figcaption>
            )}
          </figure>
          <div>
            <p className={eyebrow}>{site.artist.role}</p>
            <h2 className="mb-6 text-[58px]">{site.artist.name}</h2>
            <div className={prose}>{site.artist.bio.map((paragraph, index) => <p key={index}>{paragraph}</p>)}</div>
            <TextLink className="mt-4" href="/works">Step into the gallery</TextLink>
          </div>
        </div>
        <div className="mx-auto mt-[70px] max-w-[890px] border-t border-border pt-12 text-center md:mt-[115px]">
          <p className={cn(eyebrow, "justify-center")}>Artist statement</p>
          <blockquote className="mb-8 font-serif text-[clamp(2.1rem,3.5vw,3.2rem)] leading-[1.25] italic">{site.artist.statement}</blockquote>
          <TextLink href="/contact">Let’s make something meaningful</TextLink>
        </div>
      </div>
      <CommissionSection site={site} />
    </>
  );
}
