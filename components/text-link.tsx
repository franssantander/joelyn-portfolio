import Link from "next/link";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

export function TextLink({
  href,
  children,
  className = "",
  direction = "forward",
  external = false,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
  direction?: "forward" | "back";
  external?: boolean;
}) {
  const isMail = href.startsWith("mailto:");
  const Icon = direction === "back" ? ArrowLeft : external ? ArrowUpRight : ArrowRight;
  const iconClassName = "shrink-0 transition-transform duration-250 ease-[ease] group-hover:translate-x-[3px] motion-reduce:transition-none";
  const content = (
    <>
      {direction === "back" && (
        <Icon className={iconClassName} size={17} strokeWidth={1.4} aria-hidden="true" />
      )}
      <span className="relative py-[5px] after:absolute after:bottom-0 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-accent after:transition-transform after:duration-250 after:ease-[ease] after:content-[''] group-hover:after:scale-x-100 motion-reduce:after:transition-none">{children}</span>
      {direction !== "back" && (
        <Icon className={iconClassName} size={17} strokeWidth={1.4} aria-hidden="true" />
      )}
      {external && !isMail && (
        <span className="sr-only"> (opens in a new tab)</span>
      )}
    </>
  );
  const classes = cn("text-link group inline-flex min-h-[38px] w-fit items-center gap-[19px] text-xs leading-normal", className);
  return external || isMail ? (
    <a
      href={href}
      className={classes}
      {...(external && !isMail
        ? { target: "_blank", rel: "noopener noreferrer" }
        : {})}
    >
      {content}
    </a>
  ) : (
    <Link href={href} className={classes}>{content}</Link>
  );
}
