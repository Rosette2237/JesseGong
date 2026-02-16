// JesseGong/lib/types.ts

export type ContentCollectionKey =
  | "research"
  | "projects"
  | "internships"
  | "leadership"
  | "awards"
  | "skills"
  | "interests";

/** Used for cards, logos, and backgrounds (paths should be under /public). */
export type ImageAsset = {
  /** Example: "/images/logos/crossroads.png" */
  src: string;
  alt?: string;
};

export type LinkStyle = "button" | "link";

/** Keep flexible; you can standardize later without blocking builds. */
export type LinkKind =
  | "details"
  | "repo"
  | "demo"
  | "paper"
  | "slides"
  | "website"
  | "other"
  | (string & {});

/** A link shown on cards/detail pages. */
export type ContentLink = {
  label: string;
  href: string;
  kind?: LinkKind;
  openInNewTab?: boolean;
  /** Optional: some pages compute this (e.g., primary button + secondary link) */
  style?: LinkStyle;
};

/**
 * Optional chronological metadata to support timelines/grouping.
 * (Your pages already infer year from timeframe if this is missing.)
 */
export type Chronology =
  | {
      kind: "year";
      year: number;
      /** Higher = newer within the same year group */
      order?: number;
    }
  | {
      kind: "date";
      /** ISO date string, e.g. "2026-01-15" */
      date: string;
    };

/**
 * Base fields shared across all collections.
 * Keep these stable because many components rely on them.
 */
export type BaseEntry = {
  id: string;
  /** Used for dynamic routes: /internships/[slug], /projects/[slug], etc. */
  slug: string;

  title: string;

  /** Short description shown on list/timeline cards */
  description: string;

  /** Human-readable time range, e.g. "May 2025 – Aug 2025" */
  timeframe: string;

  /** Tags/stack labels (can be empty array if none yet) */
  tags: string[];

  /** Links shown on cards/detail pages (can be empty array, but your design prefers 1–2) */
  links: ContentLink[];

  /**
   * Primary image:
   * - projects: background or hero image
   * - internships: company logo (required by InternshipEntry override)
   * - research: optional hero image
   */
  image?: ImageAsset;

  /**
   * Long-form text used by detail pages (optional; can be filled later).
   * Your detail pages currently fall back to description if this is missing.
   */
  details?: string;

  /**
   * Optional explicit details route override.
   * If omitted, pages assume `/<collection>/${slug}`.
   */
  detailsHref?: string;

  chronology?: Chronology;
};

/**
 * Internship entries (REQUIRED fields per your instruction).
 * Separate from other sections for now.
 */
export type InternshipEntry = BaseEntry & {
  // Override: require logo image
  image: ImageAsset;

  company: string;
  position: string;
  location: string;

  /** Bullet list used on detail page and optionally on the timeline card */
  responsibilities: string[];

  /** Impact/results list */
  outcomes: string[];

  /**
   * Additional images (optional alt per image, but array itself is REQUIRED).
   * Example use: photos, screenshots, offer letter snippet, etc.
   */
  images: ImageAsset[];
};

/**
 * Other sections (kept separate for now).
 * You can refine these later when their detail-page schemas stabilize.
 */
export type ResearchEntry = BaseEntry;
export type ProjectEntry = BaseEntry;
export type LeadershipEntry = BaseEntry;
export type AwardEntry = BaseEntry;
export type SkillEntry = BaseEntry;
export type InterestEntry = BaseEntry;

/** Convenience union used by generic components/pages that don’t care about collection-specific fields. */
export type AnyEntry =
  | ResearchEntry
  | ProjectEntry
  | InternshipEntry
  | LeadershipEntry
  | AwardEntry
  | SkillEntry
  | InterestEntry;
