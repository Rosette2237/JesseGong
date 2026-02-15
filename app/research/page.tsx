"use client";

// JesseGong/app/research/page.tsx

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import SectionHeader from "../../components/SectionHeader";
import { getEntries } from "../../lib/content";
import type { AnyEntry } from "../../lib/types";

type ResearchItem = AnyEntry & { section: "research" };

function safePositionLabel(entry: ResearchItem): string {
  // Placeholder until we add a dedicated field like `role` or `org`.
  // You asked this “Bloomberg” slot be your research position.
  return "Research Position (TBD)";
}

export default function ResearchPage() {
  const items = useMemo(() => getEntries("research") as ResearchItem[], []);
  const [activeIndex, setActiveIndex] = useState(0);

  // Refs to each research row
  const itemRefs = useRef<Array<HTMLElement | null>>([]);

  const scrollToIndex = (idx: number, behavior: ScrollBehavior = "smooth") => {
    const el = itemRefs.current[idx];
    if (!el) return;
    // Center the item in the viewport
    el.scrollIntoView({ behavior, block: "center" });
  };

  // Update activeIndex based on what’s in the “center band” of the viewport.
  useEffect(() => {
    if (!items.length) return;

    const nodes = itemRefs.current.filter(Boolean) as HTMLElement[];
    if (!nodes.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // Choose the entry with the highest intersection ratio in our center band
        const best = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0))[0];

        if (!best?.target) return;

        const idxStr = (best.target as HTMLElement).dataset.index;
        const idx = idxStr ? Number(idxStr) : 0;
        if (!Number.isNaN(idx)) setActiveIndex(idx);
      },
      {
        // rootMargin shrinks the effective viewport to the middle band,
        // so “active” means “near the center”.
        root: null,
        rootMargin: "-45% 0px -45% 0px",
        threshold: [0, 0.25, 0.5, 0.75, 1],
      }
    );

    nodes.forEach((n) => observer.observe(n));
    return () => observer.disconnect();
  }, [items.length]);

  if (!items.length) {
    return (
      <div className="rounded-xl border border-slate-200 bg-white p-8 text-sm text-slate-700">
        Coming in future
      </div>
    );
  }

  return (
    <div className="w-full">
      <SectionHeader
        eyebrow="Research"
        title="Research"
        description="Selected research experiences, newest to oldest."
        variant="tab"
        action={{ label: "CV", href: "/files/cv.pdf", openInNewTab: true }}
      />

      <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-[72px_1fr]">
        {/* Sidebar: dashed rail + clickable segments */}
        <aside className="hidden md:block">
          <div className="sticky top-24">
            <div className="relative pl-6">
              {/* dashed vertical line */}
              <div className="absolute left-3 top-0 h-full border-l border-dashed border-slate-300" />

              <ul className="flex flex-col gap-6">
                {items.map((it, idx) => {
                  const isActive = idx === activeIndex;
                  return (
                    <li key={it.id} className="relative">
                      <button
                        type="button"
                        aria-label={`Jump to ${it.title}`}
                        onClick={() => {
                          setActiveIndex(idx);
                          scrollToIndex(idx);
                        }}
                        className="group inline-flex items-center gap-3"
                      >
                        <span
                          className={[
                            "h-3 w-3 rounded-full border transition-transform",
                            isActive
                              ? "border-transparent"
                              : "border-slate-400 group-hover:border-slate-600",
                          ].join(" ")}
                          style={{
                            backgroundColor: isActive ? "var(--accent-fill)" : "transparent",
                          }}
                        />
                        <span className="sr-only">{it.title}</span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </aside>

        {/* Content: single column list */}
        <section className="min-w-0">
          <div className="flex flex-col">
            {items.map((it, idx) => {
              const isActive = idx === activeIndex;

              return (
                <article
                  key={it.id}
                  ref={(el) => {
                    itemRefs.current[idx] = el;
                  }}
                  data-index={idx}
                  className={[
                    "rounded-xl-soft border border-slate-200 bg-white",
                    "transition-transform transition-shadow duration-200",
                    isActive ? "shadow-md" : "shadow-sm",
                    isActive ? "scale-[1]" : "scale-[0.985] opacity-80",
                    "mb-10",
                  ].join(" ")}
                  onMouseEnter={() => {
                    // Hover should “focus” the item and center it
                    setActiveIndex(idx);
                    scrollToIndex(idx);
                  }}
                >
                  <div className="p-6">
                    {/* Top meta row: timeframe | position */}
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-sm">
                      <span className="font-medium text-slate-800">{it.timeframe}</span>
                      <span className="text-slate-400">|</span>
                      <span className="text-slate-600">{safePositionLabel(it)}</span>
                    </div>

                    {/* Title: click to zoom/focus within THIS page */}
                    <div className="mt-3">
                      <button
                        type="button"
                        className="link-sweep text-left text-2xl font-semibold tracking-tight"
                        onClick={() => {
                          setActiveIndex(idx);
                          scrollToIndex(idx);
                        }}
                      >
                        {it.title}
                      </button>
                    </div>

                    {/* Expanded content only when active */}
                    {isActive ? (
                      <div className="mt-5">
                        <p className="text-base leading-relaxed text-slate-700">
                          {it.description}
                        </p>

                        {/* Tech stacks (tags) */}
                        {it.tags?.length ? (
                          <div className="mt-4">
                            <p className="text-xs font-semibold uppercase tracking-wider text-slate-600">
                              Tech Stack
                            </p>
                            <ul className="mt-2 flex flex-wrap gap-2">
                              {it.tags.map((t) => (
                                <li
                                  key={t}
                                  className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-medium text-slate-700"
                                >
                                  {t}
                                </li>
                              ))}
                            </ul>
                          </div>
                        ) : null}

                        {/* Details button: goes to the dedicated detail page */}
                        <div className="mt-6">
                          <Link href={it.detailsHref ?? `/research/${it.slug}`} className="btn-sweep">
                            View details
                          </Link>
                        </div>
                      </div>
                    ) : null}
                  </div>
                </article>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
}
