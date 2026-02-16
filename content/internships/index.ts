// JesseGong/content/internships/index.ts

import type { InternshipEntry } from "../../lib/types";

import crossroads from "./crossroads-community-ministries";
import stem from "./stem-atlanta-women-inc";

// Newest -> oldest, based on the END date in `timeframe` (e.g., "Oct 2024 – May 2025").
// If an entry ends in "Present", it is treated as newest.
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

  // Split on en dash or hyphen variants
  const parts = tf.split(/–|—|-/).map((s) => s.trim());
  const end = (parts.length >= 2 ? parts[parts.length - 1] : tf).toLowerCase();

  if (end.includes("present") || end.includes("current")) {
    return { year: 9999, month: 12, present: true };
  }

  // Try: "May 2025"
  const m1 = end.match(/\b([a-z]+)\s+(20\d{2})\b/i);
  if (m1?.[1] && m1?.[2]) {
    const month = MONTHS[m1[1].toLowerCase()] ?? 0;
    const year = Number(m1[2]);
    return { year: Number.isFinite(year) ? year : 0, month, present: false };
  }

  // Fallback: any year in the string (month unknown)
  const m2 = end.match(/\b(20\d{2})\b/);
  if (m2?.[1]) {
    const year = Number(m2[1]);
    return { year: Number.isFinite(year) ? year : 0, month: 0, present: false };
  }

  return { year: 0, month: 0, present: false };
}

function compareByFinishDesc(a: InternshipEntry, b: InternshipEntry): number {
  const A = parseEndKey(a.timeframe);
  const B = parseEndKey(b.timeframe);

  if (A.year !== B.year) return B.year - A.year;
  if (A.month !== B.month) return B.month - A.month;
  return 0;
}

export const internships: InternshipEntry[] = [crossroads, stem].sort(compareByFinishDesc);

export default internships;
