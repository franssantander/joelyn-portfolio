import type { Metadata } from "next";
import { PageHeading } from "@/components/page-heading";
import { TextLink } from "@/components/text-link";
import { getSiteContent } from "@/lib/content";
import { eyebrow, imageCredit, pageShell, sectionSpace } from "@/lib/portfolio-styles";
import { cn } from "@/lib/utils";

export async function generateMetadata(): Promise<Metadata> {
  const site = await getSiteContent();
  return {
    title: "Contact",
    description: site.pages.contact.description,
    openGraph: {
      title: `Contact | ${site.artist.name}`,
      description: site.pages.contact.description,
      images: [{ url: site.artist.studioImage.src, alt: site.artist.studioImage.alt, width: site.artist.studioImage.width, height: site.artist.studioImage.height }],
    },
  };
}

export default async function ContactPage() {
  const site = await getSiteContent();

  return (
    <div className={cn(pageShell, sectionSpace)}>
      <PageHeading eyebrow={site.pages.contact.eyebrow} title={site.pages.contact.title} description={site.pages.contact.description} />
      <div className="grid grid-cols-1 gap-[43px] border-t border-border pt-8 md:grid-cols-2 md:gap-[10%] md:pt-[45px]">
        <div>
          <p className={eyebrow}>Say hello</p>
          <a className="inline-block max-w-full font-serif text-[clamp(2rem,3.4vw,3.2rem)] leading-[1.2] wrap-anywhere hover:text-accent" href={`mailto:${site.contact.email}`}>{site.contact.email}</a>
          {site.contact.isPlaceholder && <p className={cn(imageCredit, "max-w-[43ch]")}>This demo contact address is a placeholder and is not monitored.</p>}
        </div>
        <div>
          <section>
            <h2 className="mb-[19px] text-[36px]">Commissions</h2>
            <p className="max-w-[50ch] text-[13px] text-muted-foreground">{site.contact.commissionInfo}</p>
            <TextLink className="mt-3" href={`mailto:${site.contact.email}?subject=${encodeURIComponent("Commission inquiry")}`} external>Ask about a commission</TextLink>
          </section>
          <section className="mt-[55px] border-t border-border pt-[35px]">
            <h2 className="mb-[19px] text-[36px]">Collaborations</h2>
            <p className="max-w-[50ch] text-[13px] text-muted-foreground">{site.contact.collaborationInfo}</p>
            <TextLink className="mt-3" href={`mailto:${site.contact.email}?subject=${encodeURIComponent("Collaboration inquiry")}`} external>Share your idea</TextLink>
          </section>
        </div>
      </div>
    </div>
  );
}
