"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { ThemeControl } from "@/components/theme-control";
import { eyebrow, iconButton, pageShell, wordmark } from "@/lib/portfolio-styles";
import { cn } from "@/lib/utils";

export function SiteHeader({
  name,
  navigation,
}: {
  name: string;
  navigation: { label: string; href: string }[];
}) {
  const pathname = usePathname();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const active = (href: string) => pathname === href || pathname.startsWith(`${href}/`);
  return (
    <header className={cn(pageShell, "flex h-20 items-center justify-between md:h-22")}>
      <Link href="/" className={wordmark} aria-label={`${name}, home`}>
        {name}<span className="text-accent">.</span>
      </Link>
      <div className="flex items-center gap-2.5 md:gap-[31px]">
        <nav className="hidden items-center gap-[33px] md:flex" aria-label="Main navigation">
          {navigation.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={active(link.href) ? "page" : undefined}
              className="relative py-2.5 text-[12px] after:absolute after:right-0 after:bottom-0.5 after:left-0 after:h-px after:origin-left after:scale-x-0 after:bg-accent after:transition-transform after:duration-250 after:ease-[ease] after:content-[''] hover:after:scale-x-100 aria-[current=page]:text-accent aria-[current=page]:after:scale-x-100 motion-reduce:after:transition-none"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="md:border-l md:border-border md:pl-6"><ThemeControl /></div>
        <button
          className={cn(iconButton, "mobile-menu-trigger md:hidden")}
          type="button"
          ref={triggerRef}
          onClick={() => dialogRef.current?.showModal()}
          aria-label="Open navigation menu"
          aria-haspopup="dialog"
        >
          <Menu size={21} strokeWidth={1.3} />
        </button>
      </div>
      <dialog
        className="mobile-menu fixed inset-0 m-0 h-full max-h-none w-full max-w-none border-0 bg-background p-0 text-foreground backdrop:bg-[#18171466]"
        ref={dialogRef}
        aria-label="Navigation menu"
        onClose={() => triggerRef.current?.focus()}
        onClick={(event) => {
          if (event.target === dialogRef.current) dialogRef.current.close();
        }}
      >
        <div className="px-gutter pb-12">
          <div className="mb-14 flex h-20 items-center justify-between md:h-22">
            <span className={wordmark}>
              {name}<span className="text-accent">.</span>
            </span>
            <button
              type="button"
              className={iconButton}
              onClick={() => dialogRef.current?.close()}
              aria-label="Close navigation menu"
              autoFocus
            >
              <X size={23} strokeWidth={1.3} />
            </button>
          </div>
          <p className={eyebrow}>Take a look around</p>
          <nav className="mb-[42px]" aria-label="Mobile navigation">
            {navigation.map((link, index) => (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active(link.href) ? "page" : undefined}
                onNavigate={() => dialogRef.current?.close()}
                className="flex items-center gap-[22px] border-b border-border py-5 font-serif text-[44px] leading-[1.1] aria-[current=page]:text-accent"
              >
                <span className="font-sans text-[10px] text-muted-foreground">0{index + 1}</span>
                <span>{link.label}</span>
                <ArrowUpRight className="ml-auto" size={24} strokeWidth={1} aria-hidden="true" />
              </Link>
            ))}
          </nav>
          <Link
            href="/links"
            className="text-link group inline-flex min-h-[38px] w-fit items-center gap-[19px] text-xs leading-normal"
            onNavigate={() => dialogRef.current?.close()}
          >
            All links <ArrowUpRight className="shrink-0 transition-transform duration-250 ease-[ease] group-hover:translate-x-[3px] motion-reduce:transition-none" size={16} strokeWidth={1.4} aria-hidden="true" />
          </Link>
        </div>
      </dialog>
    </header>
  );
}
