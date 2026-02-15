// JesseGong/lib/content.ts

import type {
  AnyEntry,
  BaseEntry,
  CardModel,
  ContentLink,
  SectionKey,
} from "./types";

/**
 * Slugify rule (auto-slug from title).
 * Keep this as the single source of truth so URLs remain stable.
 */
export function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/@/g, " at ")
    .replace(/&/g, " and ")
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

type RawEntryInput = Omit<BaseEntry, "id" | "slug" | "detailsHref"> & {
  /** Optional override; default is slugify(title). */
  slug?: string;
  /** Optional override; default is `${section}-${slug}`. */
  id?: string;
  /** Optional override; default is `/${section}/${slug}`. */
  detailsHref?: string;
};

function makeEntry(raw: RawEntryInput): AnyEntry {
  const slug = raw.slug ?? slugify(raw.title);
  const id = raw.id ?? `${raw.section}-${slug}`;
  const detailsHref = raw.detailsHref ?? `/${raw.section}/${slug}`;

  return {
    ...raw,
    id,
    slug,
    detailsHref,
  } as AnyEntry;
}

/** Utility: sort newest -> oldest when (and only when) year exists. */
function sortByYearDesc<T extends { year?: number; sequenceInYear?: number }>(
  arr: T[]
): T[] {
  return [...arr].sort((a, b) => {
    const ay = a.year ?? -1;
    const by = b.year ?? -1;
    if (by !== ay) return by - ay;
    const ao = a.sequenceInYear ?? 0;
    const bo = b.sequenceInYear ?? 0;
    return bo - ao;
  });
}

/* -------------------------------------------------------------------------- */
/*  Content: keep arrays already ordered newest -> oldest per your rules       */
/* -------------------------------------------------------------------------- */

const RESEARCH_RAW: RawEntryInput[] = [
  {
    section: "research",
    title: "AI4Science @ GT",
    description: "Short description coming soon.",
    timeframe: "TBD",
    tags: ["AI", "Science"],
    links: [
      { label: "Details", href: "/research/ai4science-at-gt", kind: "details" },
      { label: "GitHub", href: "https://github.com/Rosette2237", kind: "repo", openInNewTab: true },
    ] as ContentLink[],
  },
  {
    section: "research",
    title: "Neuron-Level Interpretability",
    description: "Short description coming soon.",
    timeframe: "TBD",
    tags: ["Interpretability", "Deep Learning"],
    links: [
      { label: "Details", href: "/research/neuron-level-interpretability", kind: "details" },
      { label: "GitHub", href: "https://github.com/Rosette2237", kind: "repo", openInNewTab: true },
    ] as ContentLink[],
  },
  {
    section: "research",
    title: "ISyE Summer Undergraduate Research Scholars Program",
    description: "Short description coming soon.",
    timeframe: "TBD",
    tags: ["ISyE", "Research"],
    links: [
      { label: "Details", href: "/research/isye-summer-undergraduate-research-scholars-program", kind: "details" },
      { label: "GitHub", href: "https://github.com/Rosette2237", kind: "repo", openInNewTab: true },
    ] as ContentLink[],
  },
];

const PROJECTS_RAW: RawEntryInput[] = [
  {
    section: "projects",
    title: "GT Market Place",
    description: "Short description coming soon.",
    timeframe: "TBD",
    tags: ["Web", "Full-Stack"],
    links: [
      { label: "Details", href: "/projects/gt-market-place", kind: "details" },
      { label: "GitHub", href: "https://github.com/Rosette2237", kind: "repo", openInNewTab: true },
    ] as ContentLink[],
  },
  {
    section: "projects",
    title: "Sign Sync",
    description: "Short description coming soon.",
    timeframe: "TBD",
    tags: ["Product", "UX"],
    links: [
      { label: "Details", href: "/projects/sign-sync", kind: "details" },
      { label: "GitHub", href: "https://github.com/Rosette2237", kind: "repo", openInNewTab: true },
    ] as ContentLink[],
  },
  {
    section: "projects",
    title: "Deep Learning Based Stock Prediction",
    description: "Short description coming soon.",
    timeframe: "TBD",
    tags: ["Deep Learning", "Finance"],
    links: [
      { label: "Details", href: "/projects/deep-learning-based-stock-prediction", kind: "details" },
      { label: "GitHub", href: "https://github.com/Rosette2237", kind: "repo", openInNewTab: true },
    ] as ContentLink[],
  },
];

const INTERNSHIPS_RAW: RawEntryInput[] = [
  {
    section: "internships",
    title: "Crossroads Community Ministries",
    description: "Short description coming soon.",
    timeframe: "TBD",
    tags: ["Service", "Operations"],
    links: [
      { label: "Details", href: "/internships/crossroads-community-ministries", kind: "details" },
      { label: "GitHub", href: "https://github.com/Rosette2237", kind: "repo", openInNewTab: true },
    ] as ContentLink[],
    // Fill these in later for year grouping:
    // year: 2025,
    // sequenceInYear: 1,
  },
  {
    section: "internships",
    title: "STEM Atlanta Women, Inc.",
    description: "Short description coming soon.",
    timeframe: "TBD",
    tags: ["Education", "Community"],
    links: [
      { label: "Details", href: "/internships/stem-atlanta-women-inc", kind: "details" },
      { label: "GitHub", href: "https://github.com/Rosette2237", kind: "repo", openInNewTab: true },
    ] as ContentLink[],
    // year: 2024,
    // sequenceInYear: 0,
  },
];

/* -------------------------------------------------------------------------- */
/*  Public exports                                                            */
/* -------------------------------------------------------------------------- */

export const research = RESEARCH_RAW.map(makeEntry);
export const projects = PROJECTS_RAW.map(makeEntry);
export const internships = INTERNSHIPS_RAW.map(makeEntry);

// Empty placeholders for now (you’ll add later in content/ or here)
export const leadership: AnyEntry[] = [];
export const awards: AnyEntry[] = [];
export const skills: AnyEntry[] = [];
export const interests: AnyEntry[] = [];

export const bySection: Record<SectionKey, AnyEntry[]> = {
  research,
  projects,
  internships,
  leadership,
  awards,
  skills,
  interests,
};

/**
 * For Navbar dropdowns: single source of truth derived from content.
 * Caps at 5 items as you requested.
 */
export const navDropdowns: Partial<
  Record<SectionKey, Array<{ label: string; href: string }>>
> = {
  research: research.slice(0, 5).map((e) => ({ label: e.title, href: e.detailsHref ?? `/research/${e.slug}` })),
  projects: projects.slice(0, 5).map((e) => ({ label: e.title, href: e.detailsHref ?? `/projects/${e.slug}` })),
  internships: internships.slice(0, 5).map((e) => ({ label: e.title, href: e.detailsHref ?? `/internships/${e.slug}` })),
};

/* -------------------------------------------------------------------------- */
/*  Helpers for pages + static generation                                     */
/* -------------------------------------------------------------------------- */

export function getEntries(section: SectionKey): AnyEntry[] {
  // Arrays are already authored newest -> oldest per your rules.
  // Internships: if you later set year/sequenceInYear, we’ll return year-sorted.
  if (section === "internships") return sortByYearDesc(bySection.internships);
  return bySection[section];
}

export function getEntryBySlug(section: SectionKey, slug: string): AnyEntry | undefined {
  return bySection[section].find((e) => e.slug === slug);
}

export function getSlugs(section: SectionKey): string[] {
  return bySection[section].map((e) => e.slug);
}

/**
 * For generateStaticParams() in /app/<section>/[slug]/page.tsx
 * Return shape: [{ slug: "..." }, ...]
 */
export function getStaticParams(section: SectionKey): Array<{ slug: string }> {
  return getSlugs(section).map((slug) => ({ slug }));
}

/** Convert an entry to the Card component’s expected fields. */
export function toCardModel(entry: AnyEntry): CardModel {
  return {
    title: entry.title,
    description: entry.description,
    timeframe: entry.timeframe,
    tags: entry.tags,
    links: entry.links,
    image: entry.image,
  };
}
