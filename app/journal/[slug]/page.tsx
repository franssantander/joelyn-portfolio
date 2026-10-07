import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { TextLink } from "@/components/text-link";
import { getJournalPostBySlug, getJournalPosts, getSiteContent } from "@/lib/content";
import { detailBottom, eyebrow, imageCredit, journalMeta, pageShell, prose, sectionSpace } from "@/lib/portfolio-styles";
import { cn } from "@/lib/utils";

type JournalPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const posts = await getJournalPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: JournalPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getJournalPostBySlug(slug);
  if (!post) notFound();

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt,
      publishedTime: post.date,
      images: [{ url: post.image.src, alt: post.image.alt, width: post.image.width, height: post.image.height }],
    },
  };
}

export default async function JournalArticlePage({ params }: JournalPageProps) {
  const { slug } = await params;
  const [post, site] = await Promise.all([getJournalPostBySlug(slug), getSiteContent()]);
  if (!post) notFound();

  const displayDate = new Intl.DateTimeFormat("en", { month: "long", day: "numeric", year: "numeric", timeZone: "UTC" }).format(new Date(post.date));

  return (
    <article className={cn(pageShell, sectionSpace)}>
      <TextLink href="/journal" direction="back">Back to the journal</TextLink>
      <header className="mx-auto mt-11 mb-[50px] max-w-[900px] text-center md:mt-[60px]">
        <p className={cn(eyebrow, "justify-center")}>{post.category}</p>
        <h1 className="mb-7 text-[clamp(3rem,10vw,4.5rem)] tracking-[-0.03em] md:text-[clamp(3.5rem,6vw,6rem)]">{post.title}</h1>
        <p className="mx-auto mt-0 mb-[27px] max-w-[53ch] text-[14px] text-muted-foreground">{post.excerpt}</p>
        <p className={cn(journalMeta, "justify-center")}><time dateTime={post.date}>{displayDate}</time><span>{post.readingMinutes} min read</span><span>By {site.artist.name}</span></p>
      </header>
      <figure className="mx-auto max-w-[980px] text-center">
        <Image className="mx-auto max-h-[72vh] w-auto object-contain" src={post.image.src} alt={post.image.alt} width={post.image.width} height={post.image.height} sizes="(max-width: 768px) 92vw, 80vw" preload />
        {post.image.credit && (
          <figcaption className={imageCredit}>
            <a href={post.image.credit.url} target="_blank" rel="noreferrer">{post.image.credit.label}</a>
            {" · "}{post.image.credit.license}
          </figcaption>
        )}
      </figure>
      <div className={cn("article-body", prose, "mx-auto mt-[43px] max-w-[650px] text-[14px] md:mt-[65px] md:text-[15px] leading-[1.9]")}>
        {post.body.map((block, index) => {
          if (block.type === "heading") return <h2 className="mt-12 mb-[22px] text-[38px] text-foreground" key={index}>{block.text}</h2>;
          if (block.type === "quote") return <blockquote className="my-10 border-l border-accent pl-7 font-serif text-[29px] leading-[1.3] text-foreground italic md:text-[32px]" key={index}>{block.text}</blockquote>;
          return <p className="mb-7" key={index}>{block.text}</p>;
        })}
      </div>
      <div className={detailBottom}><TextLink href="/journal" direction="back">More from the journal</TextLink><TextLink href="/works">Explore the works</TextLink></div>
    </article>
  );
}
