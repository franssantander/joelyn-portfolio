import { eyebrow as eyebrowStyle } from "@/lib/portfolio-styles";

export function PageHeading({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  children?: React.ReactNode;
}) {
  return (
    <header className="mb-[43px] max-w-[850px] animate-[gentle-entrance_650ms_ease_both] motion-reduce:animate-none md:mb-16">
      <p className={eyebrowStyle}>{eyebrow}</p>
      <h1 className="mb-[26px] max-w-[17ch] text-[clamp(3.2rem,11vw,5rem)] leading-[.98] tracking-[-.035em] md:text-[clamp(3.5rem,6.5vw,6.25rem)]">{title}</h1>
      {description && <p className="max-w-[51ch] text-[13px] leading-[1.85] text-muted-foreground md:text-sm">{description}</p>}
      {children}
    </header>
  );
}
