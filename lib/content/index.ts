import { jsonContentProvider } from "./json-provider";
import type { ContentProvider } from "./types";

export type {
  Artwork,
  Collection,
  ContentImage,
  ContentProvider,
  JournalBlock,
  JournalPost,
  PortfolioContent,
  SiteContent,
} from "./types";

// The single integration seam: swap this adapter for a Supabase implementation
// of ContentProvider when the CMS is ready. Pages keep the same public functions.
const contentProvider: ContentProvider = jsonContentProvider;

export async function getSiteContent() {
  return contentProvider.getSiteContent();
}

export async function getArtworks() {
  return contentProvider.getArtworks();
}

export async function getArtworkBySlug(slug: string) {
  return contentProvider.getArtworkBySlug(slug);
}

export async function getJournalPosts() {
  return contentProvider.getJournalPosts();
}

export async function getJournalPostBySlug(slug: string) {
  return contentProvider.getJournalPostBySlug(slug);
}
