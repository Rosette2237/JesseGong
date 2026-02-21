import Link from "next/link";
import SectionHeader from "../components/SectionHeader";
import { getEntries } from "../lib/content";
import { withBasePath } from "../lib/site";
import type { AnyEntry } from "../lib/types";

// Skills are currently modeled as custom data (not via lib/content.ts)
import { technicalStack } from "../content/skills/data";

type Preview = {
  key:
    | "internships"
    | "research"
    | "projects"
    | "leadership"
    | "skills"
    | "awards"
    | "interests";
  title: string; // category title
  href: string; // category route
  // Optional category preview image (not the item image). You can add these later.
  imageSrc?: string;
  imageAlt?: string;
  // Text to display for the most recent item
  itemTitle: string;
  itemMeta: string; // timeframe or short meta line
  itemDescription: string;
};

function pickMostRecent(
  section: Exclude<Preview["key"], "skills" | "interests">
) {
  const items = getEntries(section) as AnyEntry[];
  return items.length ? items[0] : null;
}

function HomePreviewBlock({
  preview,
  reverse,
}: {
  preview: Preview;
  reverse: boolean;
}) {
  return (
    <section
      className={[
        "rounded-2xl border border-slate-200 bg-white p-6 md:p-8",
        "grid gap-6 md:grid-cols-2 md:items-center",
        reverse ? "md:[&>*:first-child]:order-2" : "",
      ].join(" ")}
    >
      {/* Image side */}
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-50">
        {preview.imageSrc ? (
          <img
            src={withBasePath(preview.imageSrc)}
            alt={preview.imageAlt ?? `${preview.title} preview`}
            className="h-64 w-full object-cover md:h-[360px]"
            loading="lazy"
          />
        ) : (
          <div className="flex h-64 w-full items-center justify-center text-sm text-slate-500 md:h-[360px]">
            Image placeholder
          </div>
        )}
      </div>

      {/* Text side */}
      <div className="min-w-0">
        <p className="text-sm font-semibold uppercase tracking-wider text-slate-600">
          {preview.title}
        </p>

        <h2 className="mt-3 font-heading text-2xl font-semibold tracking-tight text-slate-900">
          {preview.itemTitle}
        </h2>

        <p className="mt-2 text-sm text-slate-600">{preview.itemMeta}</p>

        <p className="mt-4 text-base leading-relaxed text-slate-700">
          {preview.itemDescription}
        </p>

        <div className="mt-6">
          <Link href={preview.href} className="btn-sweep">
            View {preview.title}
          </Link>
        </div>
      </div>
    </section>
  );
}

export default function HomePage() {
  // Pull “most recent” entries based on your lib/content sorting rules.
  const latestInternship = pickMostRecent("internships");
  const latestResearch = pickMostRecent("research");
  const latestProject = pickMostRecent("projects");
  const latestLeadership = pickMostRecent("leadership");
  const latestAward = pickMostRecent("awards");

  // Build Home previews in your required order.
  const previews: Preview[] = [
    {
      key: "internships",
      title: "Internships",
      href: "/internships",
      imageSrc: latestInternship?.image?.src,
      imageAlt: latestInternship?.image?.alt,
      itemTitle: latestInternship?.title ?? "Internships",
      itemMeta: latestInternship?.timeframe ?? "Most recent internship",
      itemDescription:
        latestInternship?.description ??
        "Explore internship experiences, roles, and outcomes.",
    },
    {
      key: "research",
      title: "Research",
      href: "/research",
      imageSrc: latestResearch?.image?.src,
      imageAlt: latestResearch?.image?.alt,
      itemTitle: latestResearch?.title ?? "Research",
      itemMeta: latestResearch?.timeframe ?? "Most recent research",
      itemDescription:
        latestResearch?.description ??
        "Explore research projects, roles, and key contributions.",
    },
    {
      key: "projects",
      title: "Projects",
      href: "/projects",
      imageSrc: latestProject?.image?.src,
      imageAlt: latestProject?.image?.alt,
      itemTitle: latestProject?.title ?? "Projects",
      itemMeta: latestProject?.timeframe ?? "Most recent project",
      itemDescription:
        latestProject?.description ??
        "Browse selected projects with demos, writeups, and technical highlights.",
    },
    {
      key: "leadership",
      title: "Leadership",
      href: "/leadership",
      imageSrc: latestLeadership?.image?.src,
      imageAlt: latestLeadership?.image?.alt,
      itemTitle: latestLeadership?.title ?? "Leadership",
      itemMeta: latestLeadership?.timeframe ?? "Selected leadership",
      itemDescription:
        latestLeadership?.description ??
        "Leadership experiences in student orgs and community initiatives.",
    },
    {
      key: "skills",
      title: "Skills",
      href: "/skills",
      imageSrc: undefined,
      imageAlt: undefined,
      itemTitle: "Technical Stack & Core Skills",
      itemMeta: `Proficient stack across ${technicalStack.length} technologies`,
      itemDescription:
        "A snapshot of my technical toolkit and the skills I use to build, analyze, and communicate effectively.",
    },
    {
      key: "awards",
      title: "Awards",
      href: "/awards",
      imageSrc: latestAward?.image?.src,
      imageAlt: latestAward?.image?.alt,
      itemTitle: latestAward?.title ?? "Awards",
      itemMeta: latestAward?.timeframe ?? "Recognitions",
      itemDescription:
        latestAward?.description ??
        "Awards, scholarships, and recognitions (expanding over time).",
    },
    {
      key: "interests",
      title: "Interests",
      href: "/interests",
      imageSrc: undefined,
      imageAlt: undefined,
      itemTitle: "Photography",
      itemMeta: "Outside of class & work",
      itemDescription:
        "I enjoy photography as a way to document moments with strong composition and light. This section will expand into a small gallery and short writeups.",
    },
  ];

  return (
    <div className="w-full">
      {/* Hero header */}
      <div className="mt-2">
        <SectionHeader
          eyebrow="Boyang Gong"
          title="Boyang Gong"
          description="B.S. in Industrial Engineering, 2028 — Georgia Institute of Technology, Atlanta, USA"
          variant="home"
          action={
            <a
              className="link-sweep text-sm"
              href={withBasePath("/files/cv.pdf")}
              target="_blank"
              rel="noopener noreferrer"
            >
              View CV
            </a>
          }
        />

        {/* About (left) + Vertical Hero Image (right) */}
        <div className="mt-8 grid gap-8 md:grid-cols-2 md:items-start">
          {/* About card (LEFT) */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 md:p-8">
            <h2 className="font-heading text-xl font-semibold text-slate-900">
              About
            </h2>

            <div className="mt-4 space-y-4 text-base leading-relaxed text-slate-700">
              <p>
                I am an Industrial and Systems Engineering and Computer Science
                double major at the Georgia Institute of Technology with a 4.0
                GPA, specializing in Data Science. My work centers on the
                intersection of optimization and intelligent systems, leveraging
                a robust foundation in deep learning and statistical modeling to
                transform complex datasets into actionable strategic insights.
              </p>

              <p>
                My professional and project-based background spans software
                architecture, data-driven optimization, and quantitative finance.
                I have designed scalable platforms to enhance operational
                efficiency and engineered predictive deep learning frameworks for
                equity analysis and market forecasting. My quantitative
                proficiency is further underscored by my success as a top-ranked
                finalist in the Citadel Quant League, where I applied advanced
                mathematical skills to navigate financial markets. Additionally,
                my research explores the underlying mechanics of AI, specifically
                focusing on model interpretability and forecasting through
                high-performance computing.
              </p>

              <p>
                I have been recognized for excellence through international
                awards in mathematics and physics and hold memberships in the Tau
                Beta Pi and Alpha Pi Mu engineering honor societies. My
                leadership as a university orientation leader and international
                interpreter highlights my ability to manage complex logistics and
                communicate effectively across global audiences.
              </p>

              <p>
                Beyond my technical pursuits, I am an avid photographer and
                hiker who finds inspiration in the outdoors. I also played
                competitive soccer in high school and achieved ABRSM Grade 8
                certification in piano, bringing the same focused and curious
                mindset to my personal interests as I do to my professional life.
              </p>
            </div>
          </div>

          {/* Vertical hero image (RIGHT) */}
          <div className="md:flex md:justify-end">
            <div className="w-full max-w-md overflow-hidden rounded-2xl border border-slate-200 bg-slate-50">
              <img
                src={withBasePath("/images/hero.png")}
                alt="Boyang Gong — hero"
                className="h-[520px] w-full object-cover md:h-[620px]"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Alternating previews (unchanged) */}
      <div className="mt-10 space-y-10">
        {previews.map((p, idx) => (
          <HomePreviewBlock key={p.key} preview={p} reverse={idx % 2 === 1} />
        ))}
      </div>
    </div>
  );
}