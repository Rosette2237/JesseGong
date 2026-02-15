// JesseGong/app/projects/[slug]/page.tsx

import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { getEntryBySlug, getStaticParams } from "../../../lib/content";
import { withBasePath } from "../../../lib/site";
import type { AnyEntry, ContentLink } from "../../../lib/types";

type PageProps = {
  params: { slug: string };
};

export function generateStaticParams() {
  // Required for static export + dynamic routes
  return getStaticParams("projects");
}

export function generateMetadata({ params }: PageProps): Metadata {
  const entry = getEntryBySlug("projects", params.slug);

  if (!entry) {
    return { title: "Projects | Not Found" };
  }

  return {
    title: `${entry.title} | Projects`,
    description: entry.description,
  };
}

function isExternalHref(href: string): boolean {
  return href.startsWith("http://") || href.startsWith("https://") || href.startsWith("mailto:");
}

function normalizeProjectLinks(entry: AnyEntry): ContentLink[] {
  // Avoid showing "Details" on the detail page itself (common in our content seed).
  const selfHref1 = entry.detailsHref ?? `/projects/${entry.slug}`;
  const selfHref2 = `/projects/${entry.slug}`;

  const filtered = (entry.links ?? []).filter((l) => {
    if (!l?.href) return false;
    if (l.kind === "details") return false;

    const href = l.href;
    // Internal self link
    if (!isExternalHref(href)) {
      return href !== selfHref1 && href !== selfHref2;
    }
    return true;
  });

  // Enforce: primary btn-sweep + secondary link-sweep
  return filtered.map((l, idx) => ({
    ...l,
    style: idx === 0 ? "button" : "link",
  }));
}

function hasDemoLink(links: ContentLink[]): boolean {
  return links.some((l) => {
    const label = (l.label ?? "").toLowerCase();
    const href = (l.href ?? "").toLowerCase();
    return (
      l.kind === "demo" ||
      label.includes("demo") ||
      label.includes("live") ||
      href.includes("demo") ||
      href.includes("vercel") ||
      href.includes("netlify")
    );
  });
}

export default function ProjectDetailPage({ params }: PageProps) {
  const entry = getEntryBySlug("projects", params.slug);

  if (!entry) notFound();

  const backHref = withBasePath("/projects");
  const links = normalizeProjectLinks(entry);
  const showDemoSection = hasDemoLink(links);

  return (
    <main className="w-full">
      {/* Back link */}
      <div className="mb-6">
        <Link href={backHref} className="link-sweep text-sm">
          ← Back to Projects
        </Link>
      </div>

      {/* Header */}
      <header className="space-y-3">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-sm">
          <span className="font-medium text-slate-800">{entry.timeframe}</span>
        </div>

        <h1 className="font-heading text-3xl font-semibold tracking-tight text-slate-900 md:text-4xl">
          {entry.title}
        </h1>

        {/* Hero image */}
        {entry.image ? (
          <div className="mt-6 overflow-hidden rounded-xl-soft border border-slate-200 bg-white shadow-sm">
            <img
              src={withBasePath(entry.image.src)}
              alt={entry.image.alt}
              className="h-64 w-full object-cover md:h-80"
              loading="lazy"
            />
          </div>
        ) : null}
      </header>

      {/* Sections (single column) */}
      <div className="mt-10 space-y-10">
        {/* Overview */}
        <section>
          <h2 className="font-heading text-xl font-semibold text-slate-900">
            Overview
          </h2>
          <p className="mt-3 text-base leading-relaxed text-slate-700">
            {entry.details?.trim()
              ? entry.details
              : entry.description || "Overview coming soon."}
          </p>
        </section>

        {/* Contributions */}
        <section>
          <h2 className="font-heading text-xl font-semibold text-slate-900">
            Contributions
          </h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-base text-slate-700">
            <li>Coming soon.</li>
            <li>Coming soon.</li>
            <li>Coming soon.</li>
          </ul>
        </section>

        {/* Results */}
        <section>
          <h2 className="font-heading text-xl font-semibold text-slate-900">
            Results
          </h2>
          <p className="mt-3 text-base leading-relaxed text-slate-700">
            Coming soon. (Add metrics, outcomes, user impact, performance, etc.)
          </p>
        </section>

        {/* Tech Stack */}
        <section>
          <h2 className="font-heading text-xl font-semibold text-slate-900">
            Tech Stack
          </h2>

          {entry.tags?.length ? (
            <ul className="mt-3 flex flex-wrap gap-2" aria-label="Tech stack tags">
              {entry.tags.map((t) => (
                <li
                  key={t}
                  className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-medium text-slate-700"
                >
                  {t}
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-3 text-base text-slate-700">Coming soon.</p>
          )}
        </section>

        {/* Links */}
        <section>
          <h2 className="font-heading text-xl font-semibold text-slate-900">
            Links
          </h2>

          {links.length ? (
            <div className="mt-4 flex flex-wrap items-center gap-3">
              {links.map((l) => {
                const external = isExternalHref(l.href);
                const cls = l.style === "link" ? "link-sweep text-sm" : "btn-sweep";

                if (external) {
                  const openInNewTab = l.openInNewTab ?? true;
                  return (
                    <a
                      key={`${l.label}-${l.href}`}
                      href={l.href}
                      target={openInNewTab ? "_blank" : undefined}
                      rel={openInNewTab ? "noopener noreferrer" : undefined}
                      className={cls}
                    >
                      {l.label}
                    </a>
                  );
                }

                return (
                  <Link
                    key={`${l.label}-${l.href}`}
                    href={withBasePath(l.href)}
                    className={cls}
                  >
                    {l.label}
                  </Link>
                );
              })}
            </div>
          ) : (
            <p className="mt-3 text-base text-slate-700">Coming soon.</p>
          )}
        </section>

        {/* Images */}
        <section>
          <h2 className="font-heading text-xl font-semibold text-slate-900">
            Images
          </h2>

          {entry.image ? (
            <div className="mt-4 overflow-hidden rounded-xl-soft border border-slate-200 bg-white shadow-sm">
              <img
                src={withBasePath(entry.image.src)}
                alt={entry.image.alt}
                className="h-56 w-full object-cover md:h-72"
                loading="lazy"
              />
            </div>
          ) : (
            <p className="mt-3 text-base text-slate-700">Coming soon.</p>
          )}
        </section>

        {/* Demo (optional) */}
        {showDemoSection ? (
          <section>
            <h2 className="font-heading text-xl font-semibold text-slate-900">
              Demo
            </h2>
            <p className="mt-3 text-base leading-relaxed text-slate-700">
              Coming soon. (You can link a live demo, video walkthrough, or interactive prototype.)
            </p>
          </section>
        ) : null}
      </div>
    </main>
  );
}
