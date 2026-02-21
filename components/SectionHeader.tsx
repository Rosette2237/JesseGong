// JesseGong/components/SectionHeader.tsx

import Link from "next/link";
import { withBasePath } from "../lib/site";

type HeadingTag = "h1" | "h2" | "h3";

type HeaderAction = {
  label: string;
  href: string;
  /** Default: true for external links, false for internal links */
  openInNewTab?: boolean;
};

export type SectionHeaderProps = {
  /** Small label above the title (e.g., "Research") */
  eyebrow?: string;
  /** Main title text */
  title: string;
  /** Optional subtitle/description under the title */
  description?: string;

  /** Optional right-side action (e.g., "View CV") */
  action?: HeaderAction;

  /** Heading level control (default: h1 for tab pages) */
  as?: HeadingTag;

  /**
   * Size rule:
   * - "tab": medium (for Research/Projects/etc.)
   * - "home": larger (if you ever reuse on Home)
   */
  variant?: "tab" | "home";

  /** Optional extra classes on the outer wrapper */
  className?: string;
};

function isExternalHref(href?: string): boolean {
  if (!href) return false;
  return href.startsWith("http://") || href.startsWith("https://") || href.startsWith("mailto:");
}

export default function SectionHeader({
  eyebrow,
  title,
  description,
  action,
  as = "h1",
  variant = "tab",
  className = "",
}: SectionHeaderProps) {
  const TitleTag = as;

  // Uses your updated custom size logic
  const titleClass =
    variant === "home"
      ? "text-4xl md:text-5xl"
      : "text-3xl md:text-4xl";

  const hasActionHref = Boolean(action?.href);
  const actionIsExternal = hasActionHref ? isExternalHref(action!.href) : false;
  const actionHref = hasActionHref
    ? actionIsExternal
      ? action!.href
      : withBasePath(action!.href)
    : undefined;

  const openInNewTab =
    action?.openInNewTab ?? (actionIsExternal ? true : false);

  // Redundancy Filter: Only show eyebrow if it exists AND doesn't match the title
  const showEyebrow = eyebrow && eyebrow.toLowerCase() !== title.toLowerCase();

  return (
    <section className={`w-full ${className}`}>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
        <div className="min-w-0">
          {showEyebrow ? (
            <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
              {eyebrow}
            </p>
          ) : null}

          {/* Updated title color to Flag Blue */}
          <TitleTag className={`font-heading ${titleClass} font-semibold tracking-tight text-[#002856]`}>
            {title}
          </TitleTag>

          {description ? (
            <p className="mt-3 max-w-3xl text-base text-slate-700">
              {description}
            </p>
          ) : null}
        </div>

        {action && hasActionHref ? (
          <div className="shrink-0">
            {actionIsExternal ? (
              <a
                href={actionHref}
                target={openInNewTab ? "_blank" : undefined}
                rel={openInNewTab ? "noopener noreferrer" : undefined}
                className="btn-sweep"
              >
                {action.label}
              </a>
            ) : (
              <Link href={actionHref} className="btn-sweep">
                {action.label}
              </Link>
            )}
          </div>
        ) : null}
      </div>
    </section>
  );
}