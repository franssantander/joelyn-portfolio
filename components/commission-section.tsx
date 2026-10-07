import type { SiteContent } from "@/lib/content/types";
import { TextLink } from "@/components/text-link";
import { eyebrow, pageShell, sectionSpace, sectionTitle } from "@/lib/portfolio-styles";
import { cn } from "@/lib/utils";

export function CommissionSection({ site }: { site: SiteContent }) {
  return (
    <section
      className={cn(pageShell, sectionSpace, "border-t border-border")}
      aria-labelledby="commission-title"
    >
      <p className={eyebrow}>Commissions &amp; collaborations</p>
      <div className="grid grid-cols-1 items-end gap-[25px] md:grid-cols-[1.4fr_1fr] md:gap-[7%] lg:gap-[10%]">
        <h2 id="commission-title" className={cn(sectionTitle, "max-w-[22ch]")}>
          {site.home.commissionHeading}
        </h2>
        <div className="max-w-[46ch] pb-[3px] md:max-w-[39ch]">
          <p className="text-[13px] text-muted-foreground">{site.home.commissionDescription}</p>
          <TextLink className="mt-[13px]" href="/contact">Let&apos;s talk</TextLink>
        </div>
      </div>
    </section>
  );
}
