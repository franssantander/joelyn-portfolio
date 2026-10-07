import portfolio from "@/content/portfolio.json";
import type {
  ContentProvider,
  JournalPost,
  PortfolioContent,
} from "./types";

// JSON imports widen string literals, so structured article blocks receive their
// union type here. All other fields are checked against the content contract.
const content: PortfolioContent = {
  ...portfolio,
  journal: portfolio.journal as JournalPost[],
};

/** Local content is bundled at build time and requires no external service. */
export const jsonContentProvider: ContentProvider = {
  async getSiteContent() {
    return content.site;
  },
  async getArtworks() {
    return content.artworks;
  },
  async getArtworkBySlug(slug) {
    return content.artworks.find((artwork) => artwork.slug === slug) ?? null;
  },
  async getJournalPosts() {
    return [...content.journal].sort((a, b) => b.date.localeCompare(a.date));
  },
  async getJournalPostBySlug(slug) {
    return content.journal.find((post) => post.slug === slug) ?? null;
  },
};
