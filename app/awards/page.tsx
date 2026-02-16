import SectionHeader from "../../components/SectionHeader";
import { getEntries } from "../../lib/content";
import { withBasePath } from "../../lib/site";
import type { AnyEntry } from "../../lib/types";

export default function AwardsPage() {
  const items = getEntries("awards") as AnyEntry[];

  return (
    <div className="w-full">
      <SectionHeader
        eyebrow="Awards"
        title="Awards"
        description="Recognitions and highlights."
        variant="tab"
      />

      {items.length === 0 ? (
        <div className="mt-10 rounded-xl border border-slate-200 bg-white p-8 text-sm text-slate-700">
          Coming in future
        </div>
      ) : (
        <div className="mt-10 space-y-6">
          {items.map((entry) => (
            <article
              key={entry.id}
              className="grid gap-6 rounded-2xl border border-slate-200 bg-white p-6 md:grid-cols-[1fr_320px] md:items-stretch"
            >
              {/* Text */}
              <div className="min-w-0">
                <p className="text-sm text-slate-600">
                  <span className="font-medium text-slate-900">
                    {entry.timeframe || "Timeframe (TBD)"}
                  </span>
                </p>

                <h2 className="mt-2 font-heading text-xl font-semibold text-slate-900">
                  {entry.title}
                </h2>

                <p className="mt-3 text-base leading-relaxed text-slate-700">
                  {entry.description}
                </p>

                {entry.tags?.length ? (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {entry.tags.map((t) => (
                      <span
                        key={t}
                        className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-medium text-slate-700"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                ) : null}
              </div>

              {/* Image “display room” */}
              <div className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-50">
                {entry.image?.src ? (
                  <img
                    src={withBasePath(entry.image.src)}
                    alt={entry.image.alt ?? entry.title}
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                ) : (
                  <div className="flex h-56 w-full items-center justify-center text-sm text-slate-500 md:h-full">
                    Image placeholder
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
