// Shared design primitives are literal Tailwind utilities so they remain
// discoverable by Tailwind's compiler and reusable across routed pages.
export const pageShell = "mx-auto w-full max-w-[1440px] px-gutter";
export const sectionSpace = "py-[clamp(4.5rem,8vw,7.5rem)]";
export const eyebrow = "mb-6 flex items-center gap-2.5 text-[10px] font-medium leading-normal tracking-[0.17em] text-accent uppercase";
export const sectionTitle = "mb-0 font-serif text-[clamp(2.75rem,8vw,3.6rem)] font-normal leading-[1.05] tracking-[-0.025em] whitespace-pre-line md:text-[clamp(2.75rem,4.6vw,4.5rem)]";
export const artworkGrid = "grid grid-cols-1 items-start gap-y-[45px] sm:grid-cols-2 sm:gap-x-8 sm:gap-y-[50px] lg:grid-cols-3 lg:gap-x-[clamp(24px,3.4vw,49px)]";
export const imageCredit = "mt-4 text-[10px] leading-[1.8] text-muted-foreground [&_a]:underline [&_a]:underline-offset-3";
export const prose = "max-w-[60ch] text-[15px] leading-[1.9] text-muted-foreground";
export const detailBottom = "mt-[65px] flex flex-wrap justify-between gap-6 border-t border-border pt-[30px] md:mt-[90px]";
export const journalMeta = "mb-[19px] flex flex-wrap gap-x-[22px] gap-y-2.5 text-[10px] tracking-[0.08em] text-muted-foreground uppercase sm:text-[9px]";
export const iconButton = "flex size-10 cursor-pointer items-center justify-center border-0 bg-transparent p-0 text-foreground";
export const wordmark = "inline-block font-serif text-[27px] font-medium leading-none tracking-[0.09em] uppercase md:text-[30px]";
