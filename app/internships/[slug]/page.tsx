// JesseGong/app/internships/[slug]/page.tsx

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
  return getStaticParams("internships");
}

export function generateMetadata({ params }: PageProps): Metadata {
  const entry = getEntryBySlug("internships", params.slug);

  if (!entry) return { title: "Internships | Not Found" };

  const company = readString(entry, "company");
  const position = readString(entry, "position");

  return {
    title: `${entry.title} | Internships`,
    description:
      entry.description ||
      [company, position].filter(Boolean).join(" — ") ||
      "Internship detail",
  };
}

function readString(entry: AnyEntry, key: string): string {
  const v = (entry as any)?.[key];
  return typeof v === "string" ? v : "";
}

function readStringArray(entry: AnyEntry, key: string): string[] {
  const v = (entry as any)?.[key];
  return Array.isArray(v) ? v.filter((x) => typeof x === "string") : [];
}

function isExternalHref(href: string): boolean {
  return href.startsWith("http://") || href.startsWith("https://") || href.startsWith("mailto:");
}

function normalizeLinks(entry: AnyEntry): ContentLink[] {
  // Remove self "Details" link if present
  const self1 = entry.detailsHref ?? `/internships/${entry.slug}`;
  const self2 = `/internships/${entry.slug}`;

  const filtered = (entry.links ?? []).filter((l) => {
    if (!l?.href) return false;
    if (l.kind === "details") return false;

    if (!isExternalHref(l.href)) {
      return l.href !== self1 && l.href !== self2;
    }
    return true;
  });

  // Primary = first link button, remaining = link-sweep
  return filtered.map((l, idx) => ({
    ...l,
    style: idx === 0 ? "button" : "link",
  }));
}

export default function InternshipDetailPage({ params }: PageProps) {
  const entry = getEntryBySlug("internships", params.slug);
  if (!entry) notFound();

  const company = readString(entry, "company") || "Company (TBD)";
  const position = readString(entry, "position") || "Position (TBD)";
  const location = readString(entry, "location") || "Location (TBD)";

  const overview =
    (entry.details && entry.details.trim()) ||
    (entry.description && entry.description.trim()) ||
    "Overview coming soon.";

  const responsibilities =
    readStringArray(entry, "responsibilities").length > 0
      ? readStringArray(entry, "responsibilities")
      : ["Coming soon.", "Coming soon.", "Coming soon."];

  const outcomeText = readString(entry, "outcome");
  const outcomes =
    outcomeText.trim().length > 0
      ? [outcomeText]
      : readStringArray(entry, "outcomes").length > 0
      ? readStringArray(entry, "outcomes")
      : ["Coming soon. (Add impact/metrics/results.)"];

  const skills = entry.tags ?? [];
  const links = normalizeLinks(entry);

  // Optional additional images: entry.images = [{src, alt}]
  const images = ((entry as any)?.images ?? []) as Array<{ src: string; alt?: string }>;
  const hasImages = Array.isArray(images) && images.length > 0;

  return (
    <main className="w-full">
      {/* Back link */}
      <div className="mb-6">
        <Link href={withBasePath("/internships")} className="link-sweep text-sm">
          ← Back to Internships
        </Link>
      </div>

      {/* Header */}
      <header className="space-y-5">
        {/* Logo + meta */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex items-start gap-4">
            {/* Logo block */}
            <div className="flex h-14 w-14 items-center justify-center overflow-hidden rounded-xl-soft border border-slate-200 bg-white shadow-sm">
              {entry.image?.src ? (
                <img
                  src={withBasePath(entry.image.src)}
                  alt={entry.image.alt ?? `${company} logo`}
                  className="h-full w-full object-contain p-2"
                  loading="lazy"
                />
              ) : (
                <span className="text-xs font-semibold text-slate-500">LOGO</span>
              )}
            </div>

            <div className="min-w-0">
              <p className="text-sm text-slate-600">
                <span className="font-medium text-slate-900">{company}</span>
                <span className="mx-2 text-slate-400">|</span>
                <span>{position}</span>
                <span className="mx-2 text-slate-400">|</span>
                <span>{location}</span>
              </p>

              <p className="mt-1 text-sm text-slate-600">
                <span className="font-medium text-slate-900">{entry.timeframe || "Timeframe (TBD)"}</span>
              </p>

              <h1 className="mt-3 font-heading text-3xl font-semibold tracking-tight text-slate-900 md:text-4xl">
                {entry.title}
              </h1>
            </div>
          </div>
        </div>
      </header>

      {/* Single-column sections */}
      <div className="mt-10 space-y-10">
        {/* Company */}
        <section>
          <h2 className="font-heading text-xl font-semibold text-slate-900">Company</h2>
          <p className="mt-3 text-base leading-relaxed text-slate-700">{company}</p>
        </section>

        {/* Position */}
        <section>
          <h2 className="font-heading text-xl font-semibold text-slate-900">Position</h2>
          <p className="mt-3 text-base leading-relaxed text-slate-700">
            {position} — {location}
          </p>
        </section>

        {/* Overview */}
        <section>
          <h2 className="font-heading text-xl font-semibold text-slate-900">Overview</h2>
          <p className="mt-3 text-base leading-relaxed text-slate-700">{overview}</p>
        </section>

        {/* Responsibilities */}
        <section>
          <h2 className="font-heading text-xl font-semibold text-slate-900">Responsibilities</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-base text-slate-700">
            {responsibilities.map((x, i) => (
              <li key={`${i}-${x}`}>{x}</li>
            ))}
          </ul>
        </section>

        {/* Outcome */}
        <section>
          <h2 className="font-heading text-xl font-semibold text-slate-900">Outcome</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-base text-slate-700">
            {outcomes.map((x, i) => (
              <li key={`${i}-${x}`}>{x}</li>
            ))}
          </ul>
        </section>

        {/* Skills */}
        <section>
          <h2 className="font-heading text-xl font-semibold text-slate-900">Skills</h2>
          {skills.length ? (
            <ul className="mt-3 flex flex-wrap gap-2" aria-label="Skills tags">
              {skills.map((t) => (
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
          <h2 className="font-heading text-xl font-semibold text-slate-900">Links</h2>

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
                  <Link key={`${l.label}-${l.href}`} href={withBasePath(l.href)} className={cls}>
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
          <h2 className="font-heading text-xl font-semibold text-slate-900">Images</h2>

          {hasImages ? (
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {images.map((img, idx) => (
                <div
                  key={`${idx}-${img.src}`}
                  className="overflow-hidden rounded-xl-soft border border-slate-200 bg-white shadow-sm"
                >
                  <img
                    src={withBasePath(img.src)}
                    alt={img.alt ?? `${entry.title} image ${idx + 1}`}
                    className="h-56 w-full object-cover"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          ) : (
            <p className="mt-3 text-base text-slate-700">Coming soon.</p>
          )}
        </section>
      </div>
    </main>
  );
}
