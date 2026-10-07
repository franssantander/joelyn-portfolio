import type { Metadata } from "next";
import localFont from "next/font/local";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { themeInitializationScript } from "@/lib/theme";
import { getArtworks, getSiteContent } from "@/lib/content";
import "./globals.css";

const serif = localFont({
  src: "../public/fonts/cormorant-garamond-latin-variable.woff2",
  variable: "--font-cormorant",
  weight: "300 700",
  display: "swap",
});
const sans = localFont({
  src: "../public/fonts/inter-latin-variable.woff2",
  variable: "--font-inter",
  weight: "100 900",
  display: "swap",
});
export const ensureStatic = "navigation";

export async function generateMetadata(): Promise<Metadata> {
  const [site, artworks] = await Promise.all([getSiteContent(), getArtworks()]);
  const preview =
    artworks.find((artwork) => artwork.slug === site.home.featuredArtworkSlug)?.image ??
    site.artist.studioImage;
  const origin =
    process.env.NEXT_PUBLIC_SITE_URL ||
    (process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : "http://localhost:3000");
  return {
    metadataBase: new URL(origin),
    title: {
      default: `${site.artist.name} — Art & Stories`,
      template: `%s — ${site.artist.name}`,
    },
    description: site.artist.intro,
    applicationName: `${site.artist.name} Portfolio`,
    openGraph: {
      title: `${site.artist.name} — Art & Stories`,
      description: site.artist.intro,
      type: "website",
      images: [
        {
          url: preview.src,
          width: preview.width,
          height: preview.height,
          alt: preview.alt,
        },
      ],
    },
    twitter: { card: "summary_large_image" },
  };
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const site = await getSiteContent();
  return (
    <html
      lang="en"
      className={`${serif.variable} ${sans.variable} [color-scheme:light] dark:[color-scheme:dark]`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitializationScript }} />
      </head>
      <body className="has-[dialog[open]]:overflow-hidden">
        <a href="#main-content" className="fixed top-3 left-3 z-[100] -translate-y-[180%] bg-foreground px-[18px] py-2.5 text-background focus:translate-y-0">Skip to content</a>
        <SiteHeader name={site.artist.name} navigation={site.navigation} />
        <main id="main-content" className="min-h-[60vh]">{children}</main>
        <SiteFooter site={site} />
      </body>
    </html>
  );
}
