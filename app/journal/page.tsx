import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageHeading } from "@/components/page-heading";
import { TextLink } from "@/components/text-link";
import { getJournalPosts, getSiteContent } from "@/lib/content";
import { journalMeta, pageShell, sectionSpace } from "@/lib/portfolio-styles";
import { cn } from "@/lib/utils";

export async function generateMetadata(): Promise<Metadata> {
  const [site, posts] = await Promise.all([getSiteContent(), getJournalPosts()]);
  const image = posts[0]?.image;
  return {
    title: "Journal",
    description: site.pages.journal.description,
    openGraph: {
      title: `Journal | ${site.artist.name}`,
      description: site.pages.journal.description,
      images: image ? [{ url: image.src, alt: image.alt, width: image.width, height: image.height }] : [],
    },
  };
}

export default async function JournalPage() {
  const [site, posts] = await Promise.all([getSiteContent(), getJournalPosts()]);

  return (
    <div className={cn(pageShell, sectionSpace)}>
      <PageHeading eyebrow={site.pages.journal.eyebrow} title={site.pages.journal.title} description={site.pages.journal.description} />
      <div className="grid grid-cols-1 gap-x-9 gap-y-[45px] sm:grid-cols-2 sm:gap-y-12 lg:grid-cols-3">
        {posts.map((post) => (
          <article key={post.slug}>
            <Link href={`/journal/${post.slug}`} aria-label={`Read ${post.title}`} className="group block overflow-hidden">
              <Image className="aspect-[4/3] w-full bg-muted object-contain transition-transform duration-[450ms] ease-[ease] group-hover:scale-[1.012]" src={post.image.src} alt={post.image.alt} width={post.image.width} height={post.image.height} sizes="(max-width: 640px) 92vw, (max-width: 1024px) 46vw, 30vw" />
            </Link>
            <div className="pt-[23px]">
              <p className={journalMeta}><span>{post.category}</span><span>{post.readingMinutes} min read</span></p>
              <h2 className="mb-4 text-[36px] leading-[1.1] sm:text-[34px]"><Link href={`/journal/${post.slug}`}>{post.title}</Link></h2>
              <p className="text-[13px] leading-[1.85] text-muted-foreground sm:text-[12px]">{post.excerpt}</p>
              <TextLink className="mt-2.5" href={`/journal/${post.slug}`}>Read the story</TextLink>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
