"use client";

// JesseGong/app/internships/page.tsx

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";

import SectionHeader from "../../components/SectionHeader";
import { getEntries } from "../../lib/content";
import { withBasePath } from "../../lib/site";
import type { AnyEntry, ContentLink } from "../../lib/types";

function clamp01(x: number) {
  return Math.min(1, Math.max(0, x));
}

function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;
}

function isExternalHref(href: string): boolean {
  return href.startsWith("http://") || href.startsWith("https://") || href.startsWith("mailto:");
}

function inferSortYear(entry: AnyEntry): number {
  // Optional: if you later add chronology.year, we’ll use it
  const c: any = (entry as any).chronology;
  if (c?.kind === "year" && typeof c.year === "number") return c.year;

  // Fallback: parse a 20xx year from timeframe
  const tf = entry.timeframe ?? "";
  const m = tf.match(/\b(20\d{2})\b/);
  return m?.[1] ? Number(m[1]) : 0;
}

function sortNewestToOldest(entries: AnyEntry[]): AnyEntry[] {
  const copy = [...entries];
  copy.sort((a, b) => inferSortYear(b) - inferSortYear(a));
  return copy;
}

function normalizeLinks(entry: AnyEntry): {
  primary: { label: string; href: string; external: boolean };
  secondary?: { label: string; href: string; external: boolean };
} {
  const detailsHref = entry.detailsHref ?? `/internships/${entry.slug}`;

  const secondary = (entry.links ?? []).find((l) => {
    if (!l?.href) return false;
    if (l.kind === "details") return false;
    return isExternalHref(l.href);
  });

  return {
    primary: { label: "View details", href: detailsHref, external: false },
    secondary: secondary
      ? { label: secondary.label ?? "Link", href: secondary.href, external: true }
      : undefined,
  };
}

function positionLabel(_entry: AnyEntry): string {
  // Placeholder until you add a dedicated field (e.g., entry.position)
  return "Position (TBD)";
}

type Metrics = {
  startY: number; // top of section in document coords
  scrollDistance: number; // vertical scroll distance that maps to horizontal
  maxTranslateX: number; // total horizontal distance (px)
  viewportH: number;
};

export default function InternshipsPage() {
  const internships = useMemo(() => {
    // You can control ordering by adding chronology.year later; for now this is a safe heuristic.
    return sortNewestToOldest(getEntries("internships"));
  }, []);

  const n = internships.length;

  // Scroll-scrub refs
  const sectionRef = useRef<HTMLElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);

  const rafRef = useRef<number | null>(null);
  const programmaticRef = useRef(false);

  const [metrics, setMetrics] = useState<Metrics>({
    startY: 0,
    scrollDistance: 1,
    maxTranslateX: 0,
    viewportH: 0,
  });

  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  // --- Measure + recompute scroll mapping
  useEffect(() => {
    const recalc = () => {
      const section = sectionRef.current;
      const track = trackRef.current;
      if (!section || !track) return;

      const viewportW = window.innerWidth;
      const viewportH = window.innerHeight;

      // Track is composed of panels that are each w-screen; measure scrollWidth.
      const trackW = track.scrollWidth;

      // Horizontal distance we need to translate to reveal all panels.
      const maxTranslateX = Math.max(0, trackW - viewportW);

      // 1:1 mapping feels natural: 1px vertical scroll => 1px horizontal translate.
      // Ensure it's at least 1 to avoid division by zero.
      const scrollDistance = Math.max(1, maxTranslateX);

      const rect = section.getBoundingClientRect();
      const startY = rect.top + window.scrollY;

      setMetrics({
        startY,
        scrollDistance,
        maxTranslateX,
        viewportH,
      });
    };

    recalc();
    window.addEventListener("resize", recalc);
    return () => window.removeEventListener("resize", recalc);
  }, [n]);

  // --- Scroll handler: map vertical progress -> translateX, and update active index
  useEffect(() => {
    const onScroll = () => {
      if (rafRef.current != null) return;

      rafRef.current = window.requestAnimationFrame(() => {
        rafRef.current = null;

        const section = sectionRef.current;
        const track = trackRef.current;
        if (!section || !track) return;

        const { startY, scrollDistance, maxTranslateX, viewportH } = metrics;
        const endY = startY + scrollDistance + viewportH;

        const y = window.scrollY;
        const raw = (y - startY) / scrollDistance;
        const progress = clamp01(raw);

        // Transform: newest -> oldest left->right, so we move track left as progress increases.
        const tx = -progress * maxTranslateX;
        track.style.transform = `translate3d(${tx}px, 0, 0)`;

        // Update active index based on scroll progress (unless we’re in a programmatic jump)
        if (!programmaticRef.current && n > 1) {
          const idx = Math.round(progress * (n - 1));
          setActiveIndex((prev) => (prev === idx ? prev : idx));
        }

        // Optional: if user scrolls past the section, stop autoplay.
        if (y < startY - 8 || y > endY + 8) {
          // Don’t force-stop if they explicitly want it; keeping it conservative:
          // setIsPlaying(false);
        }
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    // Run once at mount to set initial transform (e.g., if user refreshes mid-page)
    onScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafRef.current != null) window.cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    };
  }, [metrics, n]);

  // --- Programmatic navigation by index (drives window scroll position to match)
  const scrollToIndex = (idx: number, behavior: ScrollBehavior) => {
    if (n <= 1) return;

    const section = sectionRef.current;
    if (!section) return;

    const { startY, scrollDistance } = metrics;

    const clamped = Math.max(0, Math.min(n - 1, idx));
    const progress = clamped / (n - 1);
    const y = startY + progress * scrollDistance;

    programmaticRef.current = true;
    window.scrollTo({ top: y, behavior });

    // Release programmatic lock after scroll settles
    window.setTimeout(() => {
      programmaticRef.current = false;
      setActiveIndex(clamped);
    }, behavior === "smooth" ? 500 : 0);
  };

  const goNext = () => {
    const next = (activeIndex + 1) % Math.max(1, n);
    scrollToIndex(next, prefersReducedMotion() ? "auto" : "smooth");
  };

  const goPrev = () => {
    const prev = (activeIndex - 1 + Math.max(1, n)) % Math.max(1, n);
    scrollToIndex(prev, prefersReducedMotion() ? "auto" : "smooth");
  };

  // --- Autoplay loop: newest -> oldest, loop back
  useEffect(() => {
    if (!isPlaying) return;
    if (n <= 1) return;
    if (prefersReducedMotion()) return;

    const id = window.setInterval(() => {
      // Move forward along timeline (newest -> oldest)
      const next = (activeIndex + 1) % n;
      scrollToIndex(next, "smooth");
    }, 10_000);

    return () => window.clearInterval(id);
  }, [isPlaying, activeIndex, n]);

  // Height of the scroll-scrub section: viewportH + scrollDistance
  const sectionHeight = Math.max(1, metrics.viewportH + metrics.scrollDistance);

  const activeEntry = internships[activeIndex];

  return (
    <div className="w-full">
      <SectionHeader
        eyebrow="Internships"
        title="Internships"
        description="A scroll-driven timeline. Use the dots or controls to navigate."
        variant="tab"
      />

      {n === 0 ? (
        <div className="mt-10 rounded-xl border border-slate-200 bg-white p-8 text-sm text-slate-700">
          Coming in future
        </div>
      ) : (
        <>
          {/* FULL-BLEED scroll-scrub timeline section */}
          <section
            ref={(el) => {
              sectionRef.current = el;
            }}
            className="relative mt-10"
            style={{ height: `${sectionHeight}px` }}
          >
            {/* Sticky viewport */}
            <div className="sticky top-0 h-screen overflow-hidden">
              {/* Off-white backdrop (keeps consistent light theme) */}
              <div className="absolute inset-0 bg-slate-50" />

              {/* Horizontal track */}
              <div
                ref={(el) => {
                  trackRef.current = el;
                }}
                className="relative z-10 flex h-full will-change-transform"
                style={{ transform: "translate3d(0,0,0)" }}
              >
                {internships.map((entry) => {
                  const { primary, secondary } = normalizeLinks(entry);

                  return (
                    <div
                      key={entry.id}
                      className="flex h-full w-screen items-center justify-center px-6 md:px-12"
                      aria-label={entry.title}
                    >
                      {/* Internship card */}
                      <div className="w-full max-w-4xl rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-10">
                        <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
                          {/* Left: logo block + meta */}
                          <div className="flex items-start gap-4">
                            <div className="flex h-14 w-14 items-center justify-center overflow-hidden rounded-xl border border-slate-200 bg-slate-50">
                              {entry.image?.src ? (
                                <img
                                  src={withBasePath(entry.image.src)}
                                  alt={entry.image.alt ?? entry.title}
                                  className="h-full w-full object-contain p-2"
                                  loading="lazy"
                                />
                              ) : (
                                <span className="text-xs font-semibold text-slate-500">
                                  LOGO
                                </span>
                              )}
                            </div>

                            <div className="min-w-0">
                              <p className="text-sm text-slate-600">
                                <span className="font-medium text-slate-800">
                                  {entry.timeframe || "Timeframe (TBD)"}
                                </span>
                                <span className="mx-2 text-slate-400">|</span>
                                <span className="text-slate-600">
                                  {positionLabel(entry)}
                                </span>
                              </p>

                              <h2 className="mt-2 font-heading text-2xl font-semibold tracking-tight text-slate-900 md:text-3xl">
                                <Link
                                  href={withBasePath(`/internships/${entry.slug}`)}
                                  className="link-sweep"
                                >
                                  {entry.title}
                                </Link>
                              </h2>
                            </div>
                          </div>

                          {/* Right: actions */}
                          <div className="flex flex-wrap items-center gap-3">
                            <Link href={withBasePath(primary.href)} className="btn-sweep">
                              {primary.label}
                            </Link>

                            {secondary ? (
                              <a
                                href={secondary.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="link-sweep text-sm"
                              >
                                {secondary.label}
                              </a>
                            ) : null}
                          </div>
                        </div>

                        {/* Short description (bullets) */}
                        <div className="mt-7">
                          <ul className="list-disc space-y-2 pl-5 text-base text-slate-700">
                            <li>Coming soon (bullet 1).</li>
                            <li>Coming soon (bullet 2).</li>
                            <li>Coming soon (bullet 3).</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Bottom timeline controls */}
              <div className="absolute inset-x-0 bottom-6 z-20 px-6 md:px-12">
                <div className="mx-auto flex w-full max-w-6xl items-center gap-6">
                  {/* Dots */}
                  <div className="relative flex-1">
                    <div className="h-px w-full bg-slate-300" />
                    <div className="-mt-1 flex w-full items-center justify-between">
                      {internships.map((entry, idx) => {
                        const active = idx === activeIndex;

                        return (
                          <button
                            key={entry.id}
                            type="button"
                            onClick={() =>
                              scrollToIndex(idx, prefersReducedMotion() ? "auto" : "smooth")
                            }
                            className="group relative -translate-y-1"
                            aria-label={`Go to ${entry.title}`}
                            title={entry.title}
                          >
                            <span
                              className={[
                                "block rounded-full border transition-transform",
                                active
                                  ? "h-4 w-4 border-transparent bg-[var(--accent-fill)]"
                                  : "h-3 w-3 border-slate-400 bg-white group-hover:scale-110",
                              ].join(" ")}
                            />
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Controls: prev / play-pause / next */}
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={goPrev}
                      className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-300 bg-white text-slate-800 hover:border-slate-400"
                      aria-label="Previous internship"
                    >
                      ←
                    </button>

                    <button
                      type="button"
                      onClick={() => setIsPlaying((p) => !p)}
                      className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-300 bg-white text-slate-800 hover:border-slate-400"
                      aria-label={isPlaying ? "Pause autoplay" : "Play autoplay"}
                      aria-pressed={isPlaying}
                      disabled={prefersReducedMotion()}
                      title={
                        prefersReducedMotion()
                          ? "Autoplay disabled (reduced motion)"
                          : undefined
                      }
                    >
                      {isPlaying ? "❚❚" : "▶"}
                    </button>

                    <button
                      type="button"
                      onClick={goNext}
                      className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-300 bg-white text-slate-800 hover:border-slate-400"
                      aria-label="Next internship"
                    >
                      →
                    </button>
                  </div>
                </div>

                {/* Optional caption (shows what’s selected) */}
                <div className="mx-auto mt-3 max-w-6xl px-1">
                  <p className="text-xs text-slate-600">
                    Current:{" "}
                    <span className="font-medium text-slate-800">
                      {activeEntry?.title ?? ""}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* After the timeline section, the page continues normally */}
          <div className="mt-14 rounded-xl border border-slate-200 bg-white p-8 text-sm text-slate-700">
            More content coming soon.
          </div>
        </>
      )}
    </div>
  );
}
