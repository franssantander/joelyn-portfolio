# Artist Portfolio — UI Design Direction

## Overview

This document defines the visual direction for a personal portfolio and online art gallery focused on showcasing paintings and creative work.

The design should feel like a **modern digital art exhibition** rather than a traditional corporate portfolio, social platform, or SaaS dashboard.

The artwork should always receive the highest visual priority.

---

## 1. Design Personality

### Core Vibe

The interface should feel:

- Editorial
- Elegant
- Artistic
- Quiet
- Premium
- Personal
- Contemporary
- Gallery-inspired
- Warm and human

The visual language should resemble a curated exhibition catalogue or contemporary gallery website.

Avoid overly decorative UI elements. The website itself should support the artwork rather than compete with it.

### Design Principle

> Let the artwork create the color. Let the interface create the space.

The UI should use restrained colors, generous whitespace, subtle typography, and minimal interaction patterns.

---

## 2. Theme Strategy

The website supports both light and dark modes.

### Default Theme

**Light mode is the primary/default theme.**

The default experience should use a warm off-white background instead of pure white to create a softer gallery atmosphere.

### Theme Behavior

Recommended:

- Follow the user's system preference after the first visit.
- Default to light mode if no preference exists.
- Provide a manual theme toggle.
- Save the selected preference locally.

Possible values:

```ts
type Theme = "light" | "dark" | "system";
```

---

# 3. Color System

## Light Theme

### Background

```css
--background: #F6F3ED;
--surface: #FFFFFF;
--surface-muted: #EEEAE2;
```

The main background should feel closer to ivory, canvas, or warm museum walls than plain digital white.

### Text

```css
--foreground: #181714;
--foreground-muted: #6D6962;
--foreground-subtle: #98928A;
```

### Accent

Use a muted terracotta / burnt-clay tone sparingly.

```css
--accent: #A95439;
--accent-hover: #8E452F;
--accent-soft: #EBD8CF;
```

Good places for the accent:

- Small section labels
- Hover underline
- Active navigation state
- Small buttons
- Links
- Tiny visual details

Do not use the accent as a large background color throughout the site.

### Borders

```css
--border: #DED9D0;
--border-subtle: #E9E5DD;
```

---

## Dark Theme

The dark theme should still feel like an art gallery.

Avoid pure black.

### Background

```css
--background: #151513;
--surface: #1D1D1A;
--surface-muted: #25241F;
```

### Text

```css
--foreground: #F3EFE7;
--foreground-muted: #B8B2A9;
--foreground-subtle: #817C75;
```

### Accent

The terracotta accent becomes slightly brighter for contrast.

```css
--accent: #C87355;
--accent-hover: #DA8769;
--accent-soft: #37241D;
```

### Borders

```css
--border: #35332E;
--border-subtle: #292824;
```

### Dark Mode Rule

Do not modify or apply artificial filters to the paintings.

Artwork must remain visually accurate in both themes.

---

# 4. Typography

The typography should combine an elegant editorial serif with a clean modern sans-serif.

## Display / Heading Font

Recommended options:

### Option A — Cormorant Garamond

Elegant, artistic, and highly editorial.

```css
font-family: "Cormorant Garamond", serif;
```

Recommended usage:

- Hero heading
- Section headings
- Artwork titles
- Artist statements
- Quotes

Recommended weights:

```text
400 Regular
500 Medium
600 SemiBold
```

### Option B — Playfair Display

A slightly stronger and more classic alternative.

```css
font-family: "Playfair Display", serif;
```

## Interface / Body Font

Recommended: **Inter**

```css
font-family: "Inter", sans-serif;
```

Use Inter for:

- Navigation
- Paragraphs
- Labels
- Metadata
- Buttons
- Form fields
- Filters

Alternatives:

```text
Manrope
DM Sans
Geist
```

## Suggested Font Pair

```text
Headings: Cormorant Garamond
Body/UI: Inter
```

---

# 5. Typography Scale

## Hero

Desktop:

```css
font-size: clamp(4rem, 6vw, 7rem);
line-height: 0.95;
font-weight: 400;
letter-spacing: -0.03em;
```

Mobile:

```css
font-size: clamp(3rem, 12vw, 4.5rem);
```

## Section Heading

```css
font-size: clamp(2.5rem, 4vw, 4.5rem);
line-height: 1;
font-weight: 400;
```

## Artwork Title

```css
font-family: var(--font-serif);
font-size: 1.25rem;
font-weight: 500;
```

## Body Text

```css
font-size: 1rem;
line-height: 1.7;
```

Maximum readable width:

```css
max-width: 60ch;
```

## Eyebrow / Small Label

Example:

```text
SELECTED WORKS
PAINTER & DESIGNER
COMMISSIONS & COLLABORATIONS
```

Style:

```css
font-size: 0.7rem;
font-weight: 500;
letter-spacing: 0.18em;
text-transform: uppercase;
```

Use the accent color for selected labels.

---

# 6. Layout

## Maximum Width

Recommended desktop container:

```css
max-width: 1440px;
margin-inline: auto;
```

Content sections:

```css
padding-inline: clamp(1.25rem, 4vw, 5rem);
```

## Vertical Rhythm

Use generous spacing.

Recommended section spacing:

```css
padding-block: clamp(5rem, 10vw, 10rem);
```

Avoid stacking content too tightly. The site should feel intentionally spacious.

---

# 7. Header

The header should be minimal.

## Desktop Structure

```text
ARTIST NAME                   Works   About   Journal   Contact   Theme
```

### Left

Artist name or wordmark.

```css
letter-spacing: 0.2em;
text-transform: uppercase;
```

### Right

Navigation links.

Avoid:

- Filled navigation buttons
- Large menu backgrounds
- Heavy borders
- Excessive icons

### Header Height

```text
72–88px
```

### Behavior

Recommended:

- Static initially
- Optional sticky header after scroll
- Slight background blur only if needed
- Thin bottom border when sticky

---

# 8. Hero Section

The hero should prioritize one major artwork.

## Desktop Layout

Recommended:

```text
60–65% Artwork
35–40% Introduction
```

Example:

```text
┌───────────────────────────────┬─────────────────────┐
│                               │ PAINTER & DESIGNER  │
│                               │                     │
│                               │ Stories told        │
│       FEATURED PAINTING       │ through color       │
│                               │ and form.           │
│                               │                     │
│                               │ Explore the works → │
└───────────────────────────────┴─────────────────────┘
```

### Hero Artwork

Requirements:

- Large
- High resolution
- Minimal cropping
- No decorative frame
- No card container
- No shadow

Preferred:

```css
object-fit: cover;
```

For important work where composition must be preserved:

```css
object-fit: contain;
```

---

# 9. Selected Works

This section acts as the homepage gallery preview.

## Heading

```text
SELECTED WORKS

A collection of moments,
studies, and stories.
```

Keep the heading centered or slightly editorial.

## Gallery Layout

Avoid equal card grids when possible.

Prefer:

- Masonry layouts
- Editorial layouts
- Asymmetric compositions
- Mixed portrait and landscape formats

Example:

```text
┌────────────┐  ┌────────────────────┐  ┌─────────────┐
│            │  │                    │  │             │
│ Portrait   │  │ Landscape          │  │ Floral      │
│            │  │                    │  │             │
│            │  └────────────────────┘  │             │
│            │                           └─────────────┘
│            │  ┌────────────┐ ┌─────────────────────┐
│            │  │ Botanical  │ │ Abstract            │
└────────────┘  └────────────┘ └─────────────────────┘
```

---

# 10. Artwork Presentation

Artwork is the product.

Do not wrap artwork in dashboard-style cards.

## Artwork Item

```text
[ ARTWORK ]

Artwork Title
OIL ON CANVAS, 2026
```

Recommended metadata:

- Artwork title
- Medium
- Year

Optional:

- Dimensions
- Collection

Do not display too much information directly on the homepage.

## Artwork Hover

Keep interactions subtle.

Recommended:

```css
transform: scale(1.01);
transition: 300ms ease;
```

Possible hover effects:

- Very subtle zoom
- Slight image brightness adjustment
- Underline artwork title
- Cursor change

Avoid:

- Large overlays
- Heavy gradient overlays
- Animated badges
- Like buttons
- Social engagement counters

---

# 11. Artwork Detail Page

Suggested layout:

```text
                         ARTWORK

                    [ LARGE IMAGE ]

                        Title

                       Artist

                Oil on Canvas · 2026

                      Description

                Medium / Dimensions
```

The artwork should remain centered and dominant.

Add generous whitespace around the painting.

---

# 12. Artist / About Section

Homepage example:

```text
┌───────────────────────────┬──────────────────────┐
│                           │                      │
│    ARTIST IN STUDIO       │ Behind the canvas   │
│                           │                      │
│                           │ Short biography...   │
│                           │                      │
│                           │ About the artist →   │
└───────────────────────────┴──────────────────────┘
```

Use a candid image rather than a corporate profile picture when possible.

Good imagery:

- Painting at an easel
- Working in studio
- Preparing materials
- Close-up of hands painting
- Creative environment

---

# 13. Calls to Action

Buttons should not dominate the experience.

Primary CTAs:

```text
Explore the works →
View all works →
About the artist →
Let's talk
```

Prefer text links for most navigation.

## Primary Button

Light theme:

```css
background: #A95439;
color: #FFFFFF;
```

Dark theme:

```css
background: #C87355;
color: #151513;
```

Shape:

```css
border-radius: 0;
```

or at most:

```css
border-radius: 2px;
```

Avoid highly rounded pill buttons unless required by the brand.

---

# 14. Links

Use understated text links.

Example:

```text
Explore the works →
```

The underline can animate from left to right on hover.

---

# 15. Dark Mode Experience

Dark mode should feel like viewing paintings in a dim exhibition room.

### Preserve

- Warm undertones
- Editorial typography
- Generous spacing
- Artwork accuracy
- Subtle visual hierarchy

### Do Not

- Use pure black everywhere
- Turn every section into a card
- Add neon accents
- Add glowing shadows
- Darken artwork automatically

Example:

```css
html.dark {
  --background: #151513;
  --foreground: #F3EFE7;
}
```

---

# 16. Theme Toggle

Recommended icon behavior:

```text
Light Mode → Moon icon
Dark Mode → Sun icon
```

Keep it small and integrated into navigation.

Accessibility:

```html
<button aria-label="Switch to dark theme">
```

---

# 17. Responsive Design

Suggested breakpoints:

```text
Desktop: 1280px+
Laptop: 1024px–1279px
Tablet: 768px–1023px
Mobile: <768px
```

## Mobile Hero

Stack content:

```text
ARTIST NAME
────────────

[ FEATURED PAINTING ]

PAINTER & DESIGNER

Stories told
through color
and form.

Explore the works →
```

Do not shrink the desktop layout into a cramped two-column layout.

## Mobile Gallery

Prefer one column, or an intentionally controlled two-column masonry layout on larger phones.

Artwork should remain large enough to appreciate.

---

# 18. Motion

Animation should be restrained.

### Initial Page Load

```text
Opacity: 0 → 1
Translate Y: 12px → 0
Duration: 500–700ms
```

### Artwork Reveal

Use staggered fade-in effects.

### Image Hover

```text
Scale: 1 → 1.015
Duration: 300–500ms
```

### Page Transitions

Subtle fade only.

Avoid:

- Excessive parallax
- Fast animations
- Bouncing elements
- Large page transitions
- Continuous motion

---

# 19. Accessibility

Minimum requirements:

- WCAG AA text contrast
- Keyboard navigation
- Visible focus state
- Descriptive artwork alt text
- Proper heading hierarchy
- Reduced motion support
- Semantic links and buttons

Example:

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

# 20. Image Handling

Artwork quality is critical.

Recommended formats:

```text
AVIF
WebP
JPEG fallback
```

If using Next.js:

```tsx
import Image from "next/image";
```

Use responsive sizing.

Example:

```tsx
<Image
  src={artwork.image}
  alt={artwork.alt}
  width={1600}
  height={2000}
  sizes="(max-width: 768px) 100vw, 50vw"
/>
```

Avoid aggressive compression that damages brush texture.

---

# 21. Suggested Homepage Structure

```text
Home
│
├── Header
│   ├── Artist Name
│   ├── Works
│   ├── About
│   ├── Journal
│   ├── Contact
│   └── Theme Toggle
│
├── Hero
│   ├── Featured Painting
│   ├── Painter & Designer
│   ├── Main Statement
│   └── Explore Works
│
├── Selected Works
│   ├── Gallery Introduction
│   ├── Artwork Grid
│   └── View All Works
│
├── About Preview
│   ├── Studio Image
│   ├── Artist Story
│   └── About Artist
│
├── Commission CTA
│   ├── Message
│   └── Contact Button
│
└── Footer
    ├── Artist Name
    ├── Email
    ├── Social Links
    └── Copyright
```

---

# 22. Tailwind Theme Direction

Example CSS variables:

```css
:root {
  --background: 42 31% 95%;
  --foreground: 45 8% 9%;

  --surface: 0 0% 100%;
  --muted: 40 17% 91%;
  --muted-foreground: 39 6% 41%;

  --accent: 14 49% 44%;
  --accent-foreground: 0 0% 100%;

  --border: 39 15% 84%;
}

.dark {
  --background: 60 5% 8%;
  --foreground: 42 33% 93%;

  --surface: 60 5% 11%;
  --muted: 48 8% 14%;
  --muted-foreground: 38 8% 69%;

  --accent: 15 50% 56%;
  --accent-foreground: 60 5% 8%;

  --border: 48 8% 20%;
}
```

---

# 23. Suggested Tailwind Font Setup

```ts
// tailwind.config.ts

theme: {
  extend: {
    fontFamily: {
      serif: ["var(--font-cormorant)", "serif"],
      sans: ["var(--font-inter)", "sans-serif"],
    },
  },
}
```

Using Next.js:

```tsx
import {
  Cormorant_Garamond,
  Inter
} from "next/font/google";

const serif = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant",
});

const sans = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});
```

---

# 24. UI Rules

## Do

- Let artwork dominate
- Use whitespace generously
- Keep navigation minimal
- Use editorial typography
- Preserve artwork aspect ratios
- Use high-resolution images
- Keep animations subtle
- Use natural, warm neutral colors
- Make the portfolio feel personal

## Avoid

- Dashboard-style cards
- Glassmorphism
- Strong gradients
- Heavy shadows
- Excessive rounded corners
- Social-media-like counters
- Likes and follower metrics
- Large colorful UI backgrounds
- Too many CTAs
- Dense layouts
- Decorative elements competing with paintings

---

# 25. Brand Statement

> A quiet digital gallery where the artist's work speaks first.

Alternative:

> The interface should disappear enough for the artwork to become the experience.

---

# 26. Final Visual Direction

```text
Fine Art Gallery
       +
Editorial Magazine
       +
Personal Artist Portfolio
       =
Digital Exhibition
```

The website is not meant to impress through complicated UI.

It should impress through:

1. The artist's work
2. Composition
3. Typography
4. Storytelling
5. Restraint
6. Attention to detail

The final experience should make visitors feel like they are entering the artist's own curated space—not simply browsing another portfolio template.
