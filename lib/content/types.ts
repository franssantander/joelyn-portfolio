export interface ContentImage {
  src: string;
  alt: string;
  width: number;
  height: number;
  credit?: { label: string; url: string; license: string };
}

export interface Artwork {
  id: string;
  slug: string;
  title: string;
  artist: string;
  medium: string;
  year: string;
  dimensions: string;
  description: string;
  collectionId: string;
  image: ContentImage;
}

export interface Collection {
  id: string;
  label: string;
}

export interface JournalBlock {
  type: "paragraph" | "heading" | "quote";
  text: string;
}

export interface JournalPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  readingMinutes: number;
  image: ContentImage;
  body: JournalBlock[];
}

export interface SiteContent {
  artist: {
    name: string;
    role: string;
    intro: string;
    bio: string[];
    statement: string;
    studioImage: ContentImage;
  };
  navigation: { label: string; href: string }[];
  collections: Collection[];
  home: {
    eyebrow: string;
    heading: string;
    description: string;
    featuredArtworkSlug: string;
    selectedArtworkSlugs: string[];
    worksHeading: string;
    aboutHeading: string;
    commissionHeading: string;
    commissionDescription: string;
  };
  contact: {
    email: string;
    isPlaceholder: boolean;
    intro: string;
    commissionInfo: string;
    collaborationInfo: string;
  };
  socialLinks: { label: string; href: string }[];
  journalIntro: string;
  pages: Record<
    "works" | "about" | "journal" | "contact" | "links" | "notFound",
    { eyebrow: string; title: string; description: string }
  >;
}

export interface PortfolioContent {
  site: SiteContent;
  artworks: Artwork[];
  journal: JournalPost[];
}

/** The public, read-only interface shared by the JSON and future CMS adapters. */
export interface ContentProvider {
  getSiteContent(): Promise<SiteContent>;
  getArtworks(): Promise<Artwork[]>;
  getArtworkBySlug(slug: string): Promise<Artwork | null>;
  getJournalPosts(): Promise<JournalPost[]>;
  getJournalPostBySlug(slug: string): Promise<JournalPost | null>;
}
