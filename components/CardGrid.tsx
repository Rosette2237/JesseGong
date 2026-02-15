"use client";

// JesseGong/components/CardGrid.tsx

import { useMemo, useState } from "react";
import Card, { type CardProps, type CardLink } from "./Card";

/**
 * Grid wrapper for Card components with a title-based search box.
 * - Responsive: 1 col (mobile) / 2 cols (tablet) / 3 cols (desktop)
 * - Spacing: gap-6
 * - Empty state: "Coming in future"
 */
export type CardGridProps = {
  items: CardProps[];

  /** Shows a search box that filters by title (case-insensitive). */
  enableSearch?: boolean;

  /** Placeholder text for the search box. */
  searchPlaceholder?: string;

  /** Message shown when items list is empty. */
  emptyMessage?: string;

  className?: string;
};

function normalizeLinks(links: CardLink[]): CardLink[] {
  // Enforce: first link = button, second link = text link
  return (links ?? []).slice(0, 2).map((l, idx) => ({
    ...l,
    kind: idx === 0 ? "button" : "link",
  }));
}

export default function CardGrid({
  items,
  enableSearch = true,
  searchPlaceholder = "Search by title...",
  emptyMessage = "Coming in future",
  className = "",
}: CardGridProps) {
  const [query, setQuery] = useState("");

  const preparedItems = useMemo(() => {
    return (items ?? []).map((item) => ({
      ...item,
      links: normalizeLinks(item.links ?? []),
    }));
  }, [items]);

  const filteredItems = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return preparedItems;
    return preparedItems.filter((item) => item.title.toLowerCase().includes(q));
  }, [preparedItems, query]);

  const showEmpty = preparedItems.length === 0;
  const showNoMatches = preparedItems.length > 0 && filteredItems.length === 0;

  return (
    <section className={`w-full ${className}`}>
      {enableSearch ? (
        <div className="mb-6">
          <label htmlFor="cardgrid-search" className="sr-only">
            Search
          </label>

          <input
            id="cardgrid-search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={searchPlaceholder}
            className={[
              "w-full rounded-xl border border-slate-200 bg-white px-4 py-3",
              "text-sm text-slate-900 placeholder:text-slate-400",
              "shadow-sm",
              "focus:outline-none focus:ring-2 focus:ring-slate-200 focus:border-slate-300",
            ].join(" ")}
            type="text"
            autoComplete="off"
          />

          {showNoMatches ? (
            <p className="mt-2 text-sm text-slate-600">No matching items.</p>
          ) : null}
        </div>
      ) : null}

      {showEmpty ? (
        <div className="rounded-xl border border-slate-200 bg-white p-8 text-sm text-slate-700">
          {emptyMessage}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredItems.map((item) => (
            <Card key={`${item.title}-${item.timeframe}`} {...item} />
          ))}
        </div>
      )}
    </section>
  );
}
