"use client";

// JesseGong/app/research/page.tsx

import Link from "next/link";
import { useMemo, useRef, useState } from "react";
import SectionHeader from "../../components/SectionHeader";
import { getEntries } from "../../lib/content";
import type { AnyEntry } from "../../lib/types";

type ResearchItem = AnyEntry & { section: "research" };

function pickRoleTag(tags?: string[]) {
  if (!tags?.length) return { role: "", rest: [] as string[] };

  // Heuristic: treat any tag containing “Researcher” (or an em dash label) as the “position”
  const role =
    tags.find((t) => /researcher/i.test(t)) ??
    tags.find((t) => t.includes("—")) ??
    "";

  const rest = role ? tags.filter((t) => t !== role) : tags;
  return { role, rest };
}

function ArrowIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M5 12h12"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M13 6l6 6-6 6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function ResearchPage() {
  const items = useMemo(() => getEntries("research") as ResearchItem[], []);
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  // Refs to each research row (for click-to-center)
  const itemRefs = useRef<Array<HTMLElement | null>>([]);

  const scrollToIndex = (idx: number, behavior: ScrollBehavior = "smooth") => {
    const el = itemRefs.current[idx];
    if (!el) return;
    // Center the item in the viewport
    el.scrollIntoView({ behavior, block: "center" });
  };

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
        // Intentionally no CV action here (CV visibility should be controlled centrally).
      />

      <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-[84px_1fr]">
        {/* Sidebar: dashed rail + clickable segments (LEFT) */}
        <aside className="hidden md:block">
          <div className="sticky top-24">
            <div className="relative pl-6">
              {/* dashed vertical line */}
              <div className="absolute left-3 top-0 h-full border-l border-dashed border-slate-300" />

              <ul className="flex flex-col gap-6">
                {items.map((it, idx) => {
                  const isActive = idx === activeIndex;
                  const isHover = idx === hoverIndex;
                  const isHot = isActive || isHover;

                  return (
                    <li key={it.id} className="relative">
                      <button
                        type="button"
                        aria-label={`Jump to ${it.title}`}
                        title={it.title}
                        onMouseEnter={() => setHoverIndex(idx)}
                        onMouseLeave={() => setHoverIndex(null)}
                        onClick={() => {
                          setActiveIndex(idx);
                          scrollToIndex(idx);
                        }}
                        className="group inline-flex items-center gap-3"
                      >
                        <span
                          className={[
                            "h-3 w-3 rounded-full border transition-transform",
                            isHot
                              ? "border-transparent scale-110"
                              : "border-slate-400 group-hover:border-slate-600",
                          ].join(" ")}
                          style={{
                            backgroundColor: isHot ? "var(--accent-fill)" : "transparent",
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
              const isHover = idx === hoverIndex;

              const { role, rest: techTags } = pickRoleTag(it.tags);

              return (
                <article
                  key={it.id}
                  ref={(el) => {
                    itemRefs.current[idx] = el;
                  }}
                  data-index={idx}
                  className={[
                    "rounded-xl-soft border bg-white",
                    "transition-transform transition-shadow duration-200",
                    isActive ? "shadow-md" : "shadow-sm",
                    isActive ? "scale-[1.02] opacity-100" : "scale-[0.99] opacity-90",
                    isHover && !isActive ? "shadow-md opacity-100" : "",
                    "mb-10",
                  ].join(" ")}
                  style={{
                    borderColor: isActive ? "rgba(0,0,0,0.08)" : "rgba(0,0,0,0.08)",
                    boxShadow: isActive ? "0 12px 30px rgba(0,0,0,0.08)" : undefined,
                  }}
                  onMouseEnter={() => setHoverIndex(idx)}
                  onMouseLeave={() => setHoverIndex(null)}
                  aria-current={isActive ? "true" : undefined}
                >
                  <div className="p-6">
                    {/* Top row: timeframe | position + right arrow to detail page */}
                    <div className="flex items-start justify-between gap-6">
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-sm">
                          <span className="font-medium text-slate-800">
                            {it.timeframe}
                          </span>
                          <span className="text-slate-400">|</span>
                          <span className="text-slate-600">
                            {role || "Research Position (TBD)"}
                          </span>
                        </div>

                        {/* Title: click to zoom + center within THIS page */}
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
                      </div>

                      {/* Arrow button: go to dedicated detail page */}
                      <Link
                        href={it.detailsHref ?? `/research/${it.slug}`}
                        aria-label={`Open details for ${it.title}`}
                        className={[
                          "btn-sweep inline-flex h-11 w-11 items-center justify-center rounded-full",
                          "border border-slate-200 bg-white text-slate-900",
                        ].join(" ")}
                      >
                        <ArrowIcon className="transition-transform duration-200 group-hover:translate-x-0.5" />
                      </Link>
                    </div>

                    {/* Always-on: tech stack (compact when not active, full when active) */}
                    {techTags?.length ? (
                      <div className="mt-4">
                        <p className="text-xs font-semibold uppercase tracking-wider text-slate-600">
                          Tech Stack
                        </p>
                        <ul className="mt-2 flex flex-wrap gap-2">
                          {(isActive ? techTags : techTags.slice(0, 5)).map((t) => (
                            <li
                              key={t}
                              className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-medium text-slate-700"
                            >
                              {t}
                            </li>
                          ))}
                          {!isActive && techTags.length > 5 ? (
                            <li className="px-2.5 py-1 text-xs font-medium text-slate-500">
                              +{techTags.length - 5} more
                            </li>
                          ) : null}
                        </ul>
                      </div>
                    ) : null}

                    {/* Expanded content only when active */}
                    {isActive ? (
                      <div className="mt-5">
                        <p className="text-base leading-relaxed text-slate-700">
                          {it.description}
                        </p>

                        <div className="mt-6">
                          <Link
                            href={it.detailsHref ?? `/research/${it.slug}`}
                            className="btn-sweep"
                          >
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
