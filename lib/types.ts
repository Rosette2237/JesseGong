// JesseGong/lib/types.ts

/** Site sections (tabs). */
export type SectionKey =
  | "research"
  | "projects"
  | "internships"
  | "leadership"
  | "awards"
  | "skills"
  | "interests";

/**
 * Use ISO date strings for reliable sorting and timeline behavior.
 * Recommended format: YYYY-MM-DD (e.g., "2025-08-15").
 */
export type ISODateString = string;

/** Basic image reference (served from /public). */
export type ContentImage = {
  /** Example: "/images/projects/gt-market-place.jpg" */
  src: string;
  alt: string;
};

/**
 * Link model used across the site.
 * - style is a UI hint: CardGrid will enforce (first=button, second=text link).
 */
export type LinkStyle = "button" | "link";

export type LinkKind =
  | "details"   // internal details page or section
  | "repo"      // GitHub repository
  | "demo"      // live demo
  | "paper"     // paper / write-up
  | "download"  // file download (e.g., CV)
  | "external"; // any other external URL

export type ContentLink = {
  label: string;
  href: string; // internal ("/projects#x" or "/projects/foo") or external ("https://...")
  kind?: LinkKind;
  style?: LinkStyle;
  openInNewTab?: boolean; // default behavior can be applied in UI helpers
};

/**
 * Chronology metadata to support sorting + timeline UIs.
 * Pick ONE kind per entry; UI can sort/group based on it.
 */
export type Chronology =
  | {
      kind: "index";
      /** Lower index = earlier in the timeline. */
      index: number;
    }
  | {
      kind: "date";
      start: ISODateString;
      end?: ISODateString;
    }
  | {
      kind: "year";
      year: number;
      /** Optional ordering within the year group (0,1,2...). */
      order?: number;
    };

/**
 * Canonical base entry fields you said should exist for every item.
 * This is your “single source of truth” schema for content/.
 */
export type BaseEntry = {
  section: SectionKey;

  /** Stable unique identifier (used for keys, anchors, etc.). */
  id: string;

  /** URL-safe slug used for anchors (#slug) and/or detail routes. */
  slug: string;

  title: string;
  description: string;
  timeframe: string; // display text (e.g., "Fall 2025", "May–Aug 2025")

  tags: string[];

  /** 1–2 links will be rendered in cards/lists. (We’ll enforce UI-side.) */
  links: ContentLink[];

  image?: ContentImage;

  /** Optional, but strongly recommended for timeline/list ordering. */
  chronology?: Chronology;

  /**
   * Optional longer detail text for future “expand” behaviors,
   * or for seeding a detail page.
   */
  details?: string;

  /**
   * Optional internal detail route if you want dedicated pages later:
   * e.g., "/projects/gt-market-place"
   */
  detailsHref?: string;
};

/** Section-specific specializations (add more fields later as needed). */
export type ResearchEntry = BaseEntry & {
  section: "research";
};

export type ProjectEntry = BaseEntry & {
  section: "projects";
};

export type InternshipEntry = BaseEntry & {
  section: "internships";

  /**
   * Useful for your “year segments” UI:
   * internships grouped by year, then ordered within year.
   */
  year?: number;
  sequenceInYear?: number;
};

export type LeadershipEntry = BaseEntry & {
  section: "leadership";
};

export type AwardsEntry = BaseEntry & {
  section: "awards";
};

export type SkillsEntry = BaseEntry & {
  section: "skills";
};

export type InterestsEntry = BaseEntry & {
  section: "interests";
};

export type AnyEntry =
  | ResearchEntry
  | ProjectEntry
  | InternshipEntry
  | LeadershipEntry
  | AwardsEntry
  | SkillsEntry
  | InterestsEntry;

/**
 * A lightweight “Card-ready” model (matches the fields your Card component expects).
 * Later, we’ll refactor Card.tsx to import these types instead of defining its own.
 */
export type CardModel = {
  title: string;
  description: string;
  timeframe: string;
  tags: string[];
  links: ContentLink[];
  image?: ContentImage;
};
