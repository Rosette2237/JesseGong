import Link from "next/link";
import SectionHeader from "../../components/SectionHeader";
import { getEntries } from "../../lib/content";
import { withBasePath } from "../../lib/site";
import type { AnyEntry } from "../../lib/types";

export default function LeadershipPage() {
  const items = getEntries("leadership") as AnyEntry[];

  return (
    <div className="w-full">
      <SectionHeader
        eyebrow="Leadership"
        title="Leadership"
        description="Selected leadership experiences."
        variant="tab"
      />

      {items.length === 0 ? (
        <div className="mt-10 rounded-xl border border-slate-200 bg-white p-8 text-sm text-slate-700">
          Coming in future
        </div>
      ) : (
        <div className="mt-10 space-y-10">
          {items.map((entry, idx) => {
            const reverse = idx % 2 === 1;

            return (
              <section
                key={entry.id}
                className={[
                  "grid gap-6 rounded-2xl border border-slate-200 bg-white p-6 md:p-8",
                  "md:grid-cols-2 md:items-center",
                  reverse ? "md:[&>*:first-child]:order-2" : "",
                ].join(" ")}
              >
                {/* Image half */}
                <div className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-50">
                  {entry.image?.src ? (
                    <img
                      src={withBasePath(entry.image.src)}
                      alt={entry.image.alt ?? entry.title}
                      className="h-64 w-full object-cover md:h-[360px]"
                      loading="lazy"
                    />
                  ) : (
                    <div className="flex h-64 w-full items-center justify-center text-sm text-slate-500 md:h-[360px]">
                      Image placeholder
                    </div>
                  )}
                </div>

                {/* Text half */}
                <div className="min-w-0">
                  <p className="text-sm text-slate-600">
                    <span className="font-medium text-slate-900">
                      {entry.timeframe || "Timeframe (TBD)"}
                    </span>
                    {entry.tags?.length ? (
                      <>
                        <span className="mx-2 text-slate-400">|</span>
                        <span className="text-slate-600">
                          {entry.tags.slice(0, 3).join(" • ")}
                        </span>
                      </>
                    ) : null}
                  </p>

                  <h2 className="mt-3 font-heading text-2xl font-semibold tracking-tight text-slate-900">
                    <Link
                      href={withBasePath(entry.detailsHref ?? `/leadership/${entry.slug}`)}
                      className="link-sweep"
                    >
                      {entry.title}
                    </Link>
                  </h2>

                  <p className="mt-4 text-base leading-relaxed text-slate-700">
                    {entry.description}
                  </p>

                  <div className="mt-6 flex items-center gap-3">
                    <Link
                      href={withBasePath(entry.detailsHref ?? `/leadership/${entry.slug}`)}
                      className="btn-sweep"
                    >
                      View details
                    </Link>

                    {/* Optional: external link if present */}
                    {entry.links?.[0]?.href ? (
                      <a
                        className="link-sweep text-sm"
                        href={entry.links[0].href}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {entry.links[0].label ?? "Link"}
                      </a>
                    ) : null}
                  </div>
                </div>
              </section>
            );
          })}
        </div>
      )}
    </div>
  );
}
