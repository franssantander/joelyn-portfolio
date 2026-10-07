import Link from "next/link";
import type { SiteContent } from "@/lib/content/types";
import { ArrowUpRight } from "lucide-react";
import { pageShell } from "@/lib/portfolio-styles";
import { cn } from "@/lib/utils";

export async function SiteFooter({ site }: { site: SiteContent }) {
  "use cache";
  return (
    <footer className={cn(pageShell, "border-t border-border pt-[38px] pb-[30px]")}>
      <div className="flex flex-wrap items-center justify-between gap-[25px] pb-[34px] md:flex-nowrap md:gap-[30px]">
        <Link className="inline-block font-serif text-[27px] leading-none font-medium tracking-[.09em] uppercase" href="/">
          {site.artist.name}<span className="text-accent">.</span>
        </Link>
        <p className="order-3 m-0 w-full text-[11px] text-muted-foreground md:order-none md:w-auto">Art, with a little room to breathe.</p>
        <Link className="ml-auto inline-flex items-center gap-[13px] text-[11px] hover:text-accent md:ml-0" href="/contact">
          Get in touch <ArrowUpRight size={16} strokeWidth={1.4} aria-hidden="true" />
        </Link>
      </div>
      <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-3 border-t border-border-subtle pt-[21px] text-[9px] text-muted-foreground">
        <span>© {new Date().getUTCFullYear()} {site.artist.name}</span>
        <div className="flex gap-[22px]">
          <Link className="hover:text-accent" href="/links">All links</Link>
          {site.socialLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-accent"
            >
              {link.label}
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          ))}
        </div>
        <span className="w-full lg:w-auto">
          Demo gallery · Original artists credited on each work.
        </span>
      </div>
    </footer>
  );
}
