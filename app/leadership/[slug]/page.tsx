import Link from "next/link";
import { notFound } from "next/navigation";
import SectionHeader from "../../../components/SectionHeader";
import { getEntries } from "../../../lib/content";
import { withBasePath } from "../../../lib/site";
import type { AnyEntry } from "../../../lib/types";

type LeadershipItem = AnyEntry & { section: "leadership" };

function bulletsFromDetails(details?: string): string[] {
  if (!details) return [];
  // Extract lines starting with "•" from the details string we stored in content files.
  return details
    .split("\n")
    .map((s) => s.trim())
    .filter((s) => s.startsWith("•"))
    .map((s) => s.replace(/^•\s*/, ""));
}

function buildSections(entry: LeadershipItem) {
  const bullets = bulletsFromDetails(entry.details);

  // A clean default overview derived from your description, plus a little structure.
  // (You can later swap to structured fields in content if you want.)
  const overview =
    entry.slug === "gt-faset-orientation-leader"
      ? "Served as a New Student Orientation Leader within Georgia Tech’s New Student & Transition Programs (FASET), supporting large-scale orientation delivery and helping incoming students and families navigate registration, scheduling, and campus resources."
      : entry.slug === "iise-operational-excellence-board"
      ? "Served as a Student Representative on IISE’s Operational Excellence Board, supporting nationwide initiatives and conference operations that promote innovation and operational excellence across the industrial engineering community."
      : entry.description ?? "";

  // Outcomes: expand from your original bullets into impact statements.
  const outcomes =
    entry.slug === "gt-faset-orientation-leader"
      ? [
          "Helped deliver orientation programming for a large incoming cohort by facilitating discussions and resolving real-time questions from students and families.",
          "Improved the registration experience by guiding schedule decisions and coordinating with advisors to clear course holds efficiently.",
          "Executed multiple activities per session with reliable logistics and timing, contributing to smooth session flow and student engagement.",
        ]
      : entry.slug === "iise-operational-excellence-board"
      ? [
          "Supported the successful planning and logistics coordination for IISE Annual Conference & Expo 2025 through cross-team collaboration.",
          "Helped advance operational excellence initiatives by reviewing proposals and contributing to coordination and execution workstreams.",
        ]
      : [];

  return { overview, responsibilities: bullets, outcomes };
}

export function generateStaticParams() {
  const entries = getEntries("leadership") as LeadershipItem[];
  return entries.map((e) => ({ slug: e.slug }));
}

export default function LeadershipDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const entries = getEntries("leadership") as LeadershipItem[];
  const entry = entries.find((e) => e.slug === params.slug);

  if (!entry) notFound();

  const { overview, responsibilities, outcomes } = buildSections(entry);

  return (
    <div className="w-full">
      {/* Back control */}
      <div className="mb-6">
        <Link href="/leadership" className="link-sweep text-sm">
          ← Back to Leadership
        </Link>
      </div>

      <SectionHeader
        eyebrow="Leadership"
        title={entry.title}
        description={entry.timeframe ?? ""}
        variant="tab"
        action={
        entry.links?.[0]?.href ? (
            <a
            className="link-sweep text-sm"
            href={entry.links[0].href}
            target="_blank"
            rel="noopener noreferrer"
            >
            {entry.links[0].label ?? "Official link"} →
            </a>
        ) : undefined
        }
      />

      {/* Top image */}
      <div className="mt-8 overflow-hidden rounded-2xl border border-slate-200 bg-slate-50">
        {entry.image?.src ? (
          <img
            src={withBasePath(entry.image.src)}
            alt={entry.image.alt ?? entry.title}
            className="h-64 w-full object-cover md:h-[420px]"
            loading="lazy"
          />
        ) : (
          <div className="flex h-64 w-full items-center justify-center text-sm text-slate-500 md:h-[420px]">
            Image placeholder
          </div>
        )}
      </div>

      {/* Single-column content */}
      <div className="mt-10 space-y-10">
        {/* Overview */}
        <section className="rounded-2xl border border-slate-200 bg-white p-6 md:p-8">
          <h2 className="font-heading text-xl font-semibold text-slate-900">
            Overview
          </h2>
          <p className="mt-4 text-base leading-relaxed text-slate-700">
            {overview}
          </p>
        </section>

        {/* Responsibilities */}
        <section className="rounded-2xl border border-slate-200 bg-white p-6 md:p-8">
          <h2 className="font-heading text-xl font-semibold text-slate-900">
            Responsibilities
          </h2>

          {responsibilities.length ? (
            <ul className="mt-4 list-disc space-y-2 pl-5 text-base text-slate-700">
              {responsibilities.map((b) => (
                <li key={b} className="leading-relaxed">
                  {b}
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-4 text-sm text-slate-600">Coming in future</p>
          )}
        </section>

        {/* Outcomes */}
        <section className="rounded-2xl border border-slate-200 bg-white p-6 md:p-8">
          <h2 className="font-heading text-xl font-semibold text-slate-900">
            Outcomes
          </h2>

          {outcomes.length ? (
            <ul className="mt-4 list-disc space-y-2 pl-5 text-base text-slate-700">
              {outcomes.map((o) => (
                <li key={o} className="leading-relaxed">
                  {o}
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-4 text-sm text-slate-600">Coming in future</p>
          )}
        </section>

        {/* Links */}
        <section className="rounded-2xl border border-slate-200 bg-white p-6 md:p-8">
          <h2 className="font-heading text-xl font-semibold text-slate-900">
            Links
          </h2>

          {entry.links?.length ? (
            <div className="mt-4 flex flex-wrap gap-3">
              {entry.links.map((l) => (
                <a
                  key={`${l.label}-${l.href}`}
                  className="link-sweep text-sm"
                  href={l.href}
                  target={l.openInNewTab ? "_blank" : undefined}
                  rel={l.openInNewTab ? "noopener noreferrer" : undefined}
                >
                  {l.label}
                </a>
              ))}
            </div>
          ) : (
            <p className="mt-4 text-sm text-slate-600">Coming in future</p>
          )}
        </section>

        {/* Images (placeholder region for future galleries) */}
        <section className="rounded-2xl border border-slate-200 bg-white p-6 md:p-8">
          <h2 className="font-heading text-xl font-semibold text-slate-900">
            Images
          </h2>
          <p className="mt-4 text-sm text-slate-600">
            Add additional photos or media here in the future.
          </p>
        </section>
      </div>
    </div>
  );
}
