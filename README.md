# Joelyn — Artist Portfolio & Gallery

A responsive, artwork-first portfolio built with Next.js 16.4, React, and self-hosted Cormorant Garamond and Inter. Its editorial design follows `artist-portfolio-ui-design-guidelines.md`.

All page and component styling uses Tailwind CSS 4 utility classes, including responsive layouts, typography, hover/focus states, dark mode, and reduced motion. Shared utility strings live in `lib/portfolio-styles.ts`; `app/globals.css` contains only Tailwind imports, theme tokens, shared base defaults, and animation definitions. A few unstyled semantic class names remain as browser-check hooks.

## Run locally

Use Node.js 20.9 or newer and npm:

```bash
npm ci
npm run dev
```

Open [localhost:3000](http://localhost:3000). To validate and serve production:

```bash
npm run lint
npx tsc --noEmit
npm run build
npm run start
```

Run commands with the same operating system that installed `node_modules`: Windows Node.js for Windows dependencies, or reinstall under WSL for a Linux toolchain.

No database or account is required. Optionally copy `.env.example` to `.env.local` and set `NEXT_PUBLIC_SITE_URL` to the site's real HTTPS origin before deployment for absolute social preview URLs. Vercel's production URL provides a fallback.

This uses standard Next.js output with prerendered content, Cache Components, and image optimization. Deploy with a compatible Next.js host or Node.js server; this is not an `output: "export"` build.

## Pages

| Route | Content |
| --- | --- |
| `/` | Featured painting, six selected works, artist introduction, commission invitation |
| `/works` | Gallery with All Works, Landscapes, Florals, and Figures filters |
| `/works/[slug]` | Artwork, original artist, details, credits, and email inquiry |
| `/about` | Sample biography, statement, and studio image |
| `/journal` | Three sample articles |
| `/journal/[slug]` | Article with structured text blocks |
| `/contact` | Commission and collaboration information with email links |
| `/links` | Shareable index of the main links |

Unknown routes and artwork/article slugs return a styled 404. First visits start in light mode; later visits follow the system unless the visitor saves Light, Dark, or System. Browser storage remembers the preference.

## Edit content

`content/portfolio.json` is the source of truth. The root contains `site`, `artworks`, and `journal`.

- Edit identity, biography, and page copy in `site.artist`, `site.home`, `site.pages`, and `site.journalIntro`. Newlines in the homepage heading provide intentional line breaks.
- Edit `site.navigation` for header links and `site.socialLinks` for optional profiles in the footer and `/links` page. Social profiles are initially empty.
- Replace `site.contact.email` and set `site.contact.isPlaceholder` to `false` when using a real address. `hello@example.com` is a demo placeholder and is not monitored.
- Give artworks unique IDs and slugs. Each `collectionId` must match a `site.collections` entry. Array order determines gallery order. Set `featuredArtworkSlug` and the six `selectedArtworkSlugs` to existing slugs.
- Store images under `public/artworks` or `public/studio`; use `/artworks/...` or `/studio/...` paths. Supply actual pixel dimensions, descriptive alt text, and source/license credit. Preserve the complete composition.
- Give journal posts unique slugs, ISO dates (`YYYY-MM-DD`), a category, an excerpt, and reading minutes. Article `body` contains ordered `paragraph`, `heading`, or `quote` blocks with plain `text`. The index shows the latest date first.

Rebuild production after editing JSON. The artwork and journal detail routes are generated from the JSON slugs at build time.

Joelyn is an editable demo identity; biography and journal writing are samples. The historic paintings belong to their credited original artists and are not works by Joelyn or offered for sale. The studio photograph is stock imagery. Replace samples with personal artwork, copy, and contact details when preparing the portfolio for real use.

## Future Supabase CMS

Pages read the asynchronous methods from `lib/content/index.ts`, with types and the provider contract in `lib/content/types.ts`:

```ts
getSiteContent(): Promise<SiteContent>
getArtworks(): Promise<Artwork[]>
getArtworkBySlug(slug: string): Promise<Artwork | null>
getJournalPosts(): Promise<JournalPost[]>
getJournalPostBySlug(slug: string): Promise<JournalPost | null>
```

The current `jsonContentProvider` implements `ContentProvider`. Add a server-only Supabase adapter later and replace the single `contentProvider` assignment in `lib/content/index.ts`. Keep returned types and methods unchanged so the pages continue to work.

Map site settings to `SiteContent`, collections to `Collection`, artwork rows to `Artwork`, and article rows to `JournalPost`. Retain stable slugs, ordering, structured text blocks, image dimensions, alt text, and credits. Public queries should return published records and `null` for missing slugs.

With Cache Components enabled, future public Supabase query functions can use `"use cache"`, a chosen `cacheLife` profile, and `cacheTag` values such as `portfolio`, `artworks`, and `journal`. Publishing actions can invalidate relevant tags. Keep the Supabase server client and privileged credentials on the server. Read the installed Next.js guides before implementing these version-specific APIs.

For Storage images, map uploaded files into `ContentImage` and configure `images.remotePatterns` for the exact Supabase project hostname and public bucket path. Add the publishing/revalidation strategy for newly created slugs alongside the CMS. Authentication, editing screens, Supabase packages, and database migrations are reserved for that future implementation.

## Image and font credits

Painting metadata comes from the [Art Institute of Chicago API](https://api.artic.edu/docs/). All nine records were verified as `is_public_domain: true`. Local files use public-domain museum reproductions hosted by Wikimedia Commons; each image's `credit.url` links to its exact file page, including provenance and license information. JSON descriptions are original sample writing.

| Artwork | Artist | Museum record |
| --- | --- | --- |
| Water Lily Pond, 1917–19 | Claude Monet | [AIC 97933](https://www.artic.edu/artworks/97933/water-lily-pond) |
| Stacks of Wheat (End of Summer), 1890–91 | Claude Monet | [AIC 64818](https://www.artic.edu/artworks/64818/stacks-of-wheat-end-of-summer) |
| The Poet's Garden, 1888 | Vincent van Gogh | [AIC 14586](https://www.artic.edu/artworks/14586/the-poet-s-garden) |
| Chrysanthemums, 1881–82 | Pierre-Auguste Renoir | [AIC 16617](https://www.artic.edu/artworks/16617/chrysanthemums) |
| Still Life with Flowers, 1905 | Odilon Redon | [AIC 110982](https://www.artic.edu/artworks/110982/still-life-with-flowers) |
| Roses in a Bowl, 1881 | Henri Fantin-Latour | [AIC 20534](https://www.artic.edu/artworks/20534/roses-in-a-bowl) |
| Self-Portrait, 1887 | Vincent van Gogh | [AIC 80607](https://www.artic.edu/artworks/80607/self-portrait) |
| Madame Roulin Rocking the Cradle (La berceuse), 1889 | Vincent van Gogh | [AIC 27949](https://www.artic.edu/artworks/27949/madame-roulin-rocking-the-cradle-la-berceuse) |
| Two Sisters (On the Terrace), 1881 | Pierre-Auguste Renoir | [AIC 14655](https://www.artic.edu/artworks/14655/two-sisters-on-the-terrace) |

`public/studio/paint-brushes.jpg` is [Assorted paint brushes by Steve A Johnson](https://unsplash.com/photos/assorted-paint-brushes-IDmD4iw9XvE), used under the [Unsplash License](https://unsplash.com/license). The same photo accompanies the studio journal entry.

Latin-subset variable fonts are self-hosted under `public/fonts` and loaded using `next/font/local`: `cormorant-garamond-latin-variable.woff2` (normal, weights 300–700) and `inter-latin-variable.woff2` (normal, weights 100–900). They total about 84 KB and were downloaded from the official [Google Fonts CSS API](https://fonts.googleapis.com/css2?family=Cormorant%20Garamond:wght@300..700&family=Inter:wght@100..900&display=swap) and `fonts.gstatic.com`; visitor browsers load only the local files.

[Cormorant Garamond](https://github.com/google/fonts/tree/main/ofl/cormorantgaramond) and [Inter](https://github.com/google/fonts/tree/main/ofl/inter) use the SIL Open Font License 1.1. Their `cormorant-garamond-OFL.txt` and `inter-OFL.txt` files retain copyright and license notices.
