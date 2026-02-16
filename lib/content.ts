// JesseGong/lib/content.ts

import type { AnyEntry, ContentCollectionKey } from "./types";

import researchIndex from "../content/research";
import projectsIndex from "../content/projects";
import internshipsIndex from "../content/internships";
import leadershipIndex from "../content/leadership";
import awardsIndex from "../content/awards";

/**
 * Central content API:
 * - Source of truth lives in /content/**.
 * - This module re-sorts defensively (per your requirement).
 */

// -------------------------
// Sorting helpers
// -------------------------

const MONTHS: Record<string, number> = {
  jan: 1,
  january: 1,
  feb: 2,
  february: 2,
  mar: 3,
  march: 3,
  apr: 4,
  april: 4,
  may: 5,
  jun: 6,
  june: 6,
  jul: 7,
  july: 7,
  aug: 8,
  august: 8,
  sep: 9,
  sept: 9,
  september: 9,
  oct: 10,
  october: 10,
  nov: 11,
  november: 11,
  dec: 12,
  december: 12,
};

type EndKey = { year: number; month: number; present: boolean };

function parseEndKey(timeframe: string): EndKey {
  const tf = (timeframe ?? "").trim();

  // Split on common dash variants: en dash, em dash, hyphen
  const parts = tf.split(/–|—|-/).map((s) => s.trim());
  const end = (parts.length >= 2 ? parts[parts.length - 1] : tf).toLowerCase();

  if (end.includes("present") || end.includes("current")) {
    return { year: 9999, month: 12, present: true };
  }

  // "May 2025"
  const m1 = end.match(/\b([a-z]+)\s+(20\d{2})\b/i);
  if (m1?.[1] && m1?.[2]) {
    const month = MONTHS[m1[1].toLowerCase()] ?? 0;
    const year = Number(m1[2]);
    return { year: Number.isFinite(year) ? year : 0, month, present: false };
  }

  // fallback: just a year
  const m2 = end.match(/\b(20\d{2})\b/);
  if (m2?.[1]) {
    const year = Number(m2[1]);
    return { year: Number.isFinite(year) ? year : 0, month: 0, present: false };
  }

  return { year: 0, month: 0, present: false };
}

function compareByFinishDesc(a: AnyEntry, b: AnyEntry): number {
  const A = parseEndKey(a.timeframe);
  const B = parseEndKey(b.timeframe);

  if (A.year !== B.year) return B.year - A.year;
  if (A.month !== B.month) return B.month - A.month;

  // Stable tie-breakers
  if (a.title !== b.title) return a.title.localeCompare(b.title);
  return a.id.localeCompare(b.id);
}

function sortEntries<T extends AnyEntry>(arr: T[]): T[] {
  return [...arr].sort(compareByFinishDesc);
}

// -------------------------
// Content registry
// -------------------------

const contentRegistry: Record<ContentCollectionKey, AnyEntry[]> = {
  research: sortEntries(researchIndex as AnyEntry[]),
  projects: sortEntries(projectsIndex as AnyEntry[]),
  internships: sortEntries(internshipsIndex as AnyEntry[]),

  leadership: sortEntries(leadershipIndex as AnyEntry[]),
  awards: sortEntries(awardsIndex as AnyEntry[]),

  // Still not through lib/content.ts (custom data)
  skills: [],
  interests: [],
};

// -------------------------
// Public API
// -------------------------

export function getEntries<K extends ContentCollectionKey>(collection: K): AnyEntry[] {
  return [...(contentRegistry[collection] ?? [])];
}

export function getEntryBySlug<K extends ContentCollectionKey>(
  collection: K,
  slug: string
): AnyEntry | undefined {
  return (contentRegistry[collection] ?? []).find((e) => e.slug === slug);
}

export function getStaticParams<K extends ContentCollectionKey>(collection: K): Array<{ slug: string }> {
  return (contentRegistry[collection] ?? []).map((e) => ({ slug: e.slug }));
}
