"use client";

// JesseGong/app/projects/page.tsx

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

import SectionHeader from "../../components/SectionHeader";
import { getEntries } from "../../lib/content";
import { withBasePath } from "../../lib/site";
import type { AnyEntry, ContentLink } from "../../lib/types";

type Year = number;

const YEARS: Year[] = [2026, 2025, 2024, 2023, 2022, 2021]; // newest -> oldest (left -> right)
const DEFAULT_YEAR: Year = 2026;

function isExternalHref(href: string): boolean {
  return href.startsWith("http://") || href.startsWith("https://") || href.startsWith("mailto:");
}

function inferYear(entry: AnyEntry): Year | null {
  // Preferred: chronology.kind === "year"
  const c: any = (entry as any).chronology;
  if (c?.kind === "year" && typeof c.year === "number") return c.year;

  // Fallback: parse a 20xx year in timeframe string
  const tf = entry.timeframe ?? "";
  const m = tf.match(/\b(20\d{2})\b/);
  if (m?.[1]) return Number(m[1]);

  return null;
}

function inferOrderInYear(entry: AnyEntry): number {
  // Optional: chronology.order (bigger = newer)
  const c: any = (entry as any).chronology;
  if (c?.kind === "year" && typeof c.order === "number") return c.order;

  // Fallback: keep stable but deterministic
  return 0;
}

function buildYearGroups(entries: AnyEntry[]) {
  const groups = new Map<Year, AnyEntry[]>();
  YEARS.forEach((y) => groups.set(y, []));

  for (const e of entries) {
    const year = inferYear(e) ?? DEFAULT_YEAR;
    if (!groups.has(year)) groups.set(year, []);
    groups.get(year)!.push(e);
  }

  // Sort within each year newest -> oldest (left -> right)
  for (const y of YEARS) {
    const arr = groups.get(y) ?? [];
    arr.sort((a, b) => inferOrderInYear(b) - inferOrderInYear(a));
    groups.set(y, arr);
  }

  return groups;
}

function pickInitialYear(groups: Map<Year, AnyEntry[]>): Year {
  // Requirement: land on 2026 group, expanded, if it exists.
  const y = DEFAULT_YEAR;
  if ((groups.get(y) ?? []).length > 0) return y;

  // Otherwise pick the newest year that has any projects
  for (const yr of YEARS) {
    if ((groups.get(yr) ?? []).length > 0) return yr;
  }
  return DEFAULT_YEAR;
}

function normalizeLinksForSlide(entry: AnyEntry): {
  primary?: { label: string; href: string; external: boolean };
  secondary?: { label: string; href: string; external: boolean };
} {
  // Primary: "View details" (internal)
  const detailsHref = entry.detailsHref ?? `/projects/${entry.slug}`;

  // Secondary: pick first external link that is NOT "Details"
  const external = (entry.links ?? []).find((l) => {
    if (!l?.href) return false;
    if (l.kind === "details") return false;
    return isExternalHref(l.href);
  });

  return {
    primary: { label: "View details", href: detailsHref, external: false },
    secondary: external
      ? { label: external.label ?? "Repo", href: external.href, external: true }
      : undefined,
  };
}

export default function ProjectsPage() {
  const entries = useMemo(() => getEntries("projects"), []);
  const groups = useMemo(() => buildYearGroups(entries), [entries]);

  const [activeYear, setActiveYear] = useState<Year>(() => pickInitialYear(groups));
  const [activeIndex, setActiveIndex] = useState<number>(0);

  // Whenever year changes, reset to newest project in that year
  useEffect(() => {
    setActiveIndex(0);
  }, [activeYear]);

  const yearProjects = groups.get(activeYear) ?? [];
  const activeEntry = yearProjects[activeIndex];

  // Move older (to the right in time: 2026 -> 2025 -> ...)
  const goNext = () => {
    const currArr = groups.get(activeYear) ?? [];
    const nextIdx = activeIndex + 1;
    if (nextIdx < currArr.length) {
      setActiveIndex(nextIdx);
      return;
    }
    // move to next older year with projects
    const startPos = YEARS.indexOf(activeYear);
    for (let i = startPos + 1; i < YEARS.length; i++) {
      const y = YEARS[i];
      const arr = groups.get(y) ?? [];
      if (arr.length > 0) {
        setActiveYear(y);
        // index resets to 0 via useEffect
        return;
      }
    }
  };

  // Move newer (to the left in time)
  const goPrev = () => {
    const currArr = groups.get(activeYear) ?? [];
    const prevIdx = activeIndex - 1;
    if (prevIdx >= 0) {
      setActiveIndex(prevIdx);
      return;
    }
    // move to next newer year with projects
    const startPos = YEARS.indexOf(activeYear);
    for (let i = startPos - 1; i >= 0; i--) {
      const y = YEARS[i];
      const arr = groups.get(y) ?? [];
      if (arr.length > 0) {
        setActiveYear(y);
        // go to the oldest within that newer year? your rule: newest->oldest left->right
        // if we are moving "prev" (newer), landing at that year's last item feels natural.
        setActiveIndex(Math.max(0, arr.length - 1));
        return;
      }
    }
  };

  // Page content: if no projects at all
  const hasAny = YEARS.some((y) => (groups.get(y) ?? []).length > 0);

  return (
    <div className="w-full">
      <SectionHeader
        eyebrow="Projects"
        title="Projects"
        description="Selected projects grouped by year. Use the timeline to navigate."
        variant="tab"
      />

      {!hasAny ? (
        <div className="mt-10 rounded-xl border border-slate-200 bg-white p-8 text-sm text-slate-700">
          Coming in future
        </div>
      ) : (
        <section className="mt-10">
          {/* HERO / SLIDE */}
          <div
            className={[
              "relative overflow-hidden rounded-2xl border border-slate-200",
              "min-h-[78vh]",
            ].join(" ")}
          >
            {/* Background image */}
            {activeEntry?.image?.src ? (
              <img
                src={withBasePath(activeEntry.image.src)}
                alt={activeEntry.image.alt ?? activeEntry.title}
                className="absolute inset-0 h-full w-full object-cover"
                loading="lazy"
              />
            ) : (
              <div className="absolute inset-0 bg-slate-900" />
            )}

            {/* Dark overlay (keeps text readable on images) */}
            <div className="absolute inset-0 bg-slate-950/60" />

            {/* Content */}
            <div className="relative z-10 flex h-full flex-col justify-between p-6 md:p-10">
              <div className="grid gap-10 md:grid-cols-[1.2fr_0.8fr]">
                {/* Left: text */}
                <div className="max-w-2xl">
                  <p className="text-sm text-slate-200">
                    <span className="font-medium">{activeYear}</span>
                    <span className="mx-2 text-slate-400">|</span>
                    <span className="text-slate-300">{activeEntry?.timeframe ?? "TBD"}</span>
                  </p>

                  <h2 className="mt-4 font-heading text-4xl font-semibold tracking-tight text-white md:text-5xl">
                    {activeEntry?.title ?? "Project"}
                  </h2>

                  <p className="mt-5 text-base leading-relaxed text-slate-200">
                    {activeEntry?.description ?? "Description coming soon."}
                  </p>

                  {/* Buttons: primary btn-sweep + secondary link-sweep */}
                  {activeEntry ? (
                    <div className="mt-7 flex flex-wrap items-center gap-4">
                      {(() => {
                        const { primary, secondary } = normalizeLinksForSlide(activeEntry);
                        return (
                          <>
                            {primary ? (
                              <Link href={withBasePath(primary.href)} className="btn-sweep">
                                {primary.label}
                              </Link>
                            ) : null}

                            {secondary ? (
                              <a
                                href={secondary.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="link-sweep text-sm text-white"
                              >
                                {secondary.label}
                              </a>
                            ) : null}
                          </>
                        );
                      })()}
                    </div>
                  ) : null}

                  {/* Tech stack (tags) */}
                  {activeEntry?.tags?.length ? (
                    <div className="mt-7">
                      <p className="text-xs font-semibold uppercase tracking-wider text-slate-200">
                        Tech Stack
                      </p>
                      <ul className="mt-2 flex flex-wrap gap-2">
                        {activeEntry.tags.map((t) => (
                          <li
                            key={t}
                            className="rounded-full border border-white/15 bg-white/10 px-2.5 py-1 text-xs font-medium text-slate-100"
                          >
                            {t}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : null}
                </div>

                {/* Right: reserved space for future “image collage / expand panel” */}
                <div className="hidden md:block">
                  <div className="h-full rounded-2xl border border-white/10 bg-white/5 p-6">
                    <p className="text-xs font-semibold uppercase tracking-wider text-slate-200">
                      Highlights
                    </p>
                    <ul className="mt-3 space-y-3 text-sm text-slate-200">
                      <li>Coming soon.</li>
                      <li>Coming soon.</li>
                      <li>Coming soon.</li>
                    </ul>

                    <div className="mt-6">
                      <span className="text-xs text-slate-300">Expand</span>
                      <span className="ml-2 text-slate-200">+</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* TIMELINE (bottom) */}
              <div className="mt-10">
                <div className="flex items-center justify-between gap-6">
                  {/* Year groups */}
                  <div className="min-w-0 flex-1 overflow-x-auto">
                    <div className="flex min-w-max items-end gap-6 pr-2">
                      {YEARS.map((y) => {
                        const isActive = y === activeYear;
                        const arr = groups.get(y) ?? [];
                        const count = arr.length;

                        return (
                          <div key={y} className="min-w-[120px]">
                            <button
                              type="button"
                              onClick={() => {
                                if (count === 0) return;
                                setActiveYear(y);
                              }}
                              className={[
                                "w-full text-left",
                                "transition-colors",
                                count === 0 ? "cursor-not-allowed opacity-50" : "cursor-pointer",
                              ].join(" ")}
                              aria-label={`Select year ${y}`}
                            >
                              <div className="flex items-center justify-between">
                                <span
                                  className={[
                                    "text-sm font-semibold",
                                    isActive ? "text-white" : "text-slate-200",
                                  ].join(" ")}
                                >
                                  {y}
                                </span>
                                {/* Active marker */}
                                <span
                                  className={[
                                    "ml-3 inline-block h-1.5 w-1.5 rounded-full",
                                    isActive ? "bg-[var(--accent-fill)]" : "bg-white/25",
                                  ].join(" ")}
                                />
                              </div>
                            </button>

                            {/* Expanded dashed sub-timeline */}
                            {isActive ? (
                              <div className="mt-3">
                                <div className="relative h-8">
                                  {/* dashed line */}
                                  <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 border-t border-dashed border-white/30" />
                                  {/* dots */}
                                  <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 flex items-center justify-between">
                                    {arr.map((proj, idx) => {
                                      const dotActive = idx === activeIndex;
                                      return (
                                        <button
                                          key={proj.id}
                                          type="button"
                                          onClick={() => setActiveIndex(idx)}
                                          className="group relative"
                                          aria-label={`Select ${proj.title}`}
                                          title={proj.title}
                                        >
                                          <span
                                            className={[
                                              "block h-3 w-3 rounded-full border transition-transform",
                                              dotActive
                                                ? "border-transparent bg-[var(--accent-fill)]"
                                                : "border-white/50 bg-slate-950/10 group-hover:border-white/80",
                                            ].join(" ")}
                                          />
                                        </button>
                                      );
                                    })}
                                  </div>
                                </div>

                                {/* Active title hint */}
                                <p className="mt-2 line-clamp-1 text-xs text-slate-200">
                                  {activeEntry?.title ?? ""}
                                </p>
                              </div>
                            ) : (
                              <div className="mt-3 h-10">
                                {/* Collapsed: thin divider only */}
                                <div className="h-1 w-full bg-white/15" />
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Controls (right-most) */}
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={goPrev}
                      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/25 text-white hover:border-white/50"
                      aria-label="Previous project"
                    >
                      ←
                    </button>
                    <button
                      type="button"
                      onClick={goNext}
                      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/25 text-white hover:border-white/50"
                      aria-label="Next project"
                    >
                      →
                    </button>
                  </div>
                </div>

                {/* Note: vertical scrolling does NOT affect the timeline (per your requirement). */}
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
