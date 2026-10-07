import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { getSiteContent } from "@/lib/content";
import { eyebrow, pageShell, sectionSpace } from "@/lib/portfolio-styles";
import { cn } from "@/lib/utils";

export async function generateMetadata(): Promise<Metadata> {
  const site = await getSiteContent();
  return {
    title: "Links",
    description: site.pages.links.description,
    openGraph: {
      title: `${site.artist.name} | Links`,
      description: site.pages.links.description,
      images: [{ url: site.artist.studioImage.src, alt: site.artist.studioImage.alt, width: site.artist.studioImage.width, height: site.artist.studioImage.height }],
    },
  };
}

export default async function LinksPage() {
  const site = await getSiteContent();
  const links = [
    ...site.navigation.map((link) => ({ ...link, external: false })),
    ...site.socialLinks.map((link) => ({ ...link, external: true })),
  ];

  return (
    <div className={cn("links-page", pageShell, sectionSpace, "max-w-[790px]")}>
      <div className="mb-[53px] text-center">
        <p className={cn(eyebrow, "justify-center")}>{site.pages.links.eyebrow}</p>
        <h1 className="mb-[18px] text-[68px] md:text-[88px]">{site.pages.links.title}</h1>
        <p className="text-[13px] text-muted-foreground">{site.pages.links.description}</p>
      </div>
      <ol className="m-0 list-none border-t border-border p-0">
        {links.map((item, index) => (
          <li key={item.href}>
            <Link className="group flex items-center gap-[29px] border-b border-border py-[27px] hover:text-accent" href={item.href} prefetch={item.external ? false : undefined} {...(item.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
              <span className="text-[10px] text-muted-foreground" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
              <span className="font-serif text-[34px] leading-[1.1] sm:text-[38px]">{item.label}</span>
              <ArrowUpRight className="ml-auto stroke-1 transition-transform duration-250 ease-[ease] group-hover:translate-x-[3px] group-hover:-translate-y-[3px]" size={24} aria-hidden="true" />
              {item.external && <span className="sr-only"> (opens in a new tab)</span>}
            </Link>
          </li>
        ))}
      </ol>
    </div>
  );
}
