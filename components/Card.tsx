// JesseGong/components/Card.tsx

import Link from "next/link";
import { withBasePath } from "../lib/site";

export type CardImage = {
  src: string; // e.g. "/images/projects/foo.jpg" (place in public/)
  alt: string;
};

export type CardTag = string;

export type CardLink = {
  label: string;
  href: string; // internal ("/projects#...") or external ("https://...")
  kind?: "link" | "button"; // "button" uses btn-sweep; "link" uses link-sweep
  openInNewTab?: boolean; // default true for external, false for internal
};

export type CardProps = {
  title: string;
  description: string;
  timeframe: string; // e.g. "Fall 2025" / "May–Aug 2025"
  tags: CardTag[];
  links: CardLink[]; // we will render up to 2
  image?: CardImage;

  className?: string;
};

function isExternalHref(href: string): boolean {
  return href.startsWith("http://") || href.startsWith("https://") || href.startsWith("mailto:");
}

function renderLink(link: CardLink) {
  const external = isExternalHref(link.href);
  const openInNewTab = link.openInNewTab ?? (external ? true : false);

  const baseClass =
    link.kind === "button"
      ? "btn-sweep"
      : "link-sweep text-sm"; // link-sweep handles underline + hover

  if (external) {
    return (
      <a
        key={`${link.label}-${link.href}`}
        href={link.href}
        target={openInNewTab ? "_blank" : undefined}
        rel={openInNewTab ? "noopener noreferrer" : undefined}
        className={baseClass}
      >
        {link.label}
      </a>
    );
  }

  return (
    <Link
      key={`${link.label}-${link.href}`}
      href={withBasePath(link.href)}
      className={baseClass}
    >
      {link.label}
    </Link>
  );
}

export default function Card({
  title,
  description,
  timeframe,
  tags,
  links,
  image,
  className = "",
}: CardProps) {
  const shownLinks = (links ?? []).slice(0, 2);

  return (
    <article
      className={[
        "rounded-xl-soft border border-slate-200 bg-white shadow-sm",
        "transition-transform transition-shadow duration-200",
        "hover:-translate-y-0.5 hover:shadow-md",
        className,
      ].join(" ")}
    >
      {image ? (
        <div className="overflow-hidden rounded-t-[inherit]">
          {/* Using <img> keeps this simple for static hosting/export flows */}
          <img
            src={withBasePath(image.src)}
            alt={image.alt}
            loading="lazy"
            className="h-44 w-full object-cover sm:h-48"
          />
        </div>
      ) : null}

      <div className="p-5">
        <div className="flex items-start justify-between gap-4">
          {/* Updated card title to Flag Blue */}
          <h3 className="text-lg font-semibold tracking-tight text-[#002856]">
            {title}
          </h3>
          <p className="shrink-0 text-xs font-medium text-slate-600">
            {timeframe}
          </p>
        </div>

        <p className="mt-2 text-sm leading-relaxed text-slate-700">
          {description}
        </p>

        {tags?.length ? (
          <ul className="mt-4 flex flex-wrap gap-2" aria-label="Tags">
            {tags.map((t) => (
              <li
                key={t}
                className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-medium text-slate-700"
              >
                {t}
              </li>
            ))}
          </ul>
        ) : null}

        {shownLinks.length ? (
          <div className="mt-5 flex flex-wrap items-center gap-3">
            {shownLinks.map((l) => renderLink(l))}
          </div>
        ) : null}
      </div>
    </article>
  );
}