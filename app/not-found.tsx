import { PageHeading } from "@/components/page-heading";
import { TextLink } from "@/components/text-link";
import { getSiteContent } from "@/lib/content";
import { pageShell, sectionSpace } from "@/lib/portfolio-styles";
import { cn } from "@/lib/utils";

export default async function NotFound() {
  const site = await getSiteContent();

  return (
    <div className={cn(pageShell, sectionSpace, "min-h-[65vh]")}>
      <PageHeading eyebrow={site.pages.notFound.eyebrow} title={site.pages.notFound.title} description={site.pages.notFound.description} />
      <TextLink className="mr-[35px]" href="/works">Explore the works</TextLink>
      <TextLink className="mr-[35px]" href="/">Return home</TextLink>
    </div>
  );
}
