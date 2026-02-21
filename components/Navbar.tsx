"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { getNavbarModel, withBasePath } from "../lib/site";

type SubItem = { label: string; href: string };

function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/@/g, " at ")
    .replace(/&/g, " and ")
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

function buildAnchorHref(base: "/research" | "/projects" | "/internships", label: string): string {
  // Example: /research#ai4science-at-gt
  return `${base}#${slugify(label)}`;
}

function isRouteActive(pathname: string, href: string): boolean {
  // Active for exact match, and for nested routes (e.g., /projects/anything counts for /projects)
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

function NavLink({
  href,
  children,
  className,
  onClick,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}) {
  const isExternal = href.startsWith("http://") || href.startsWith("https://");

  if (isExternal) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        className={className}
        onClick={onClick}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={withBasePath(href)} className={className} onClick={onClick}>
      {children}
    </Link>
  );
}

export default function Navbar() {
  const pathname = usePathname();
  const { primary, actions } = useMemo(() => getNavbarModel(), []);

  // Desktop hover dropdown control (hover-only as you requested)
  const [openDesktopMenu, setOpenDesktopMenu] = useState<string | null>(null);

  // Mobile slide-in drawer
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Close drawer on route change (nice UX)
  useEffect(() => {
    setDrawerOpen(false);
    setOpenDesktopMenu(null);
  }, [pathname]);

  // Close drawer on Escape
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setDrawerOpen(false);
    }
    if (drawerOpen) window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [drawerOpen]);

  const submenus: Record<string, SubItem[]> = useMemo(
    () => ({
      research: [
        { label: "AI4Science @ GT", href: buildAnchorHref("/research", "AI4Science @ GT") },
        { label: "Neuron-Level Interpretability", href: buildAnchorHref("/research", "Neuron-Level Interpretability") },
        {
          label: "ISyE Summer Undergraduate Research Scholars Program",
          href: buildAnchorHref("/research", "ISyE Summer Undergraduate Research Scholars Program"),
        },
      ].slice(0, 5),

      projects: [
        { label: "GT Market Place", href: buildAnchorHref("/projects", "GT Market Place") },
        { label: "Sign Sync", href: buildAnchorHref("/projects", "Sign Sync") },
        { label: "Deep Learning Based Stock Prediction", href: buildAnchorHref("/projects", "Deep Learning Based Stock Prediction") },
      ].slice(0, 5),

      internships: [
        { label: "Crossroads Community Ministries", href: buildAnchorHref("/internships", "Crossroads Community Ministries") },
        { label: "STEM Atlanta Women, Inc.", href: buildAnchorHref("/internships", "STEM Atlanta Women, Inc.") },
      ].slice(0, 5),
    }),
    []
  );

  // Updated color classes for Flag Blue
  const flagBlue = "text-[#002856]";
  const activeLink = "text-[#002856] font-bold";
  const subtle = "text-[#002856]/70";

  const iconSrcByKey: Record<string, string> = {
    github: withBasePath("/images/icons/github.svg"),
    cv: withBasePath("/images/icons/cv.svg"),
  };

  return (
    <header className="w-full border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        {/* Brand */}
        <Link
          href={withBasePath("/")}
          className={`text-base font-semibold tracking-tight ${flagBlue} hover:opacity-80 transition-opacity`}
        >
          Boyang Gong
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-6 md:flex" aria-label="Primary">
          {primary.map((item) => {
            const active = isRouteActive(pathname, item.href);
            const hasSubmenu = Boolean(submenus[item.key]?.length);

            if (!hasSubmenu) {
              return (
                <NavLink
                  key={item.key}
                  href={item.href}
                  className={[
                    "text-sm font-medium transition-colors link-sweep",
                    active ? activeLink : flagBlue,
                  ].join(" ")}
                >
                  {item.label}
                </NavLink>
              );
            }

            const isOpen = openDesktopMenu === item.key;

            return (
              <div
                key={item.key}
                className="relative"
                onMouseEnter={() => setOpenDesktopMenu(item.key)}
                onMouseLeave={() => setOpenDesktopMenu(null)}
              >
                {/* Top-level link (still navigates) */}
                <NavLink
                  href={item.href}
                  className={[
                    "text-sm font-medium transition-colors link-sweep",
                    active ? activeLink : flagBlue,
                  ].join(" ")}
                >
                  {item.label}
                </NavLink>

                {/* Hover dropdown panel */}
                <div
                  className={[
                    "absolute left-0 top-full z-50 mt-2 w-80 rounded-lg border border-slate-200 bg-white shadow-lg",
                    isOpen ? "block" : "hidden",
                  ].join(" ")}
                  role="menu"
                  aria-label={`${item.label} submenu`}
                >
                  <ul className="py-2">
                    {submenus[item.key].map((sub) => (
                      <li key={sub.href} role="none">
                        <NavLink
                          href={sub.href}
                          className={`block px-4 py-2 text-sm transition-colors ${flagBlue} hover:bg-slate-50`}
                        >
                          <span className="link-sweep inline-block">{sub.label}</span>
                        </NavLink>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </nav>

        {/* Desktop actions: icon-only GitHub + CV */}
        <div className="hidden items-center gap-3 md:flex" aria-label="Actions">
          {actions.map((a) => {
            const iconSrc = iconSrcByKey[a.key];
            if (!iconSrc) {
              // fallback if you add actions later
              return (
                <NavLink
                  key={a.key}
                  href={a.href}
                  className={`text-sm font-medium link-sweep ${flagBlue}`}
                >
                  {a.label}
                </NavLink>
              );
            }

            return (
              <a
                key={a.key}
                href={a.href}
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-slate-200 bg-white transition-colors hover:bg-slate-50"
                aria-label={a.label}
                title={a.label}
              >
                {/* Use <img> for simple static icons under static export */}
                <img src={iconSrc} alt="" className="h-5 w-5" />
                <span className="sr-only">{a.label}</span>
              </a>
            );
          })}
        </div>

        {/* Mobile: hamburger */}
        <button
          type="button"
          className={`inline-flex items-center justify-center rounded-md border border-slate-200 bg-white p-2 ${flagBlue} hover:bg-slate-50 md:hidden`}
          aria-label="Open menu"
          aria-expanded={drawerOpen}
          onClick={() => setDrawerOpen(true)}
        >
          {/* Simple hamburger icon (inline SVG) */}
          <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
            <path
              d="M4 7h16M4 12h16M4 17h16"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </div>

      {/* Mobile slide-in drawer (left) */}
      <div
        className={[
          "fixed inset-0 z-50 md:hidden",
          drawerOpen ? "pointer-events-auto" : "pointer-events-none",
        ].join(" ")}
        aria-hidden={!drawerOpen}
      >
        {/* Overlay */}
        <div
          className={[
            "absolute inset-0 bg-black/30 transition-opacity",
            drawerOpen ? "opacity-100" : "opacity-0",
          ].join(" ")}
          onClick={() => setDrawerOpen(false)}
        />

        {/* Panel */}
        <aside
          className={[
            "absolute left-0 top-0 h-full w-80 max-w-[85vw] bg-white shadow-xl transition-transform",
            drawerOpen ? "translate-x-0" : "-translate-x-full",
          ].join(" ")}
          aria-label="Mobile menu"
        >
          <div className="flex items-center justify-between border-b border-slate-200 px-4 py-3">
            <Link
              href={withBasePath("/")}
              className={`text-base font-semibold tracking-tight ${flagBlue}`}
              onClick={() => setDrawerOpen(false)}
            >
              Boyang Gong
            </Link>

            <button
              type="button"
              className={`rounded-md p-2 ${flagBlue} hover:bg-slate-50`}
              aria-label="Close menu"
              onClick={() => setDrawerOpen(false)}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
                <path
                  d="M6 6l12 12M18 6L6 18"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>

          <nav className="px-2 py-3" aria-label="Mobile primary">
            {primary.map((item) => {
              const active = isRouteActive(pathname, item.href);
              const hasSubmenu = Boolean(submenus[item.key]?.length);

              return (
                <div key={item.key} className="mb-1">
                  <NavLink
                    href={item.href}
                    onClick={() => setDrawerOpen(false)}
                    className={[
                      "flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors",
                      active ? `bg-slate-50 ${activeLink}` : `${flagBlue} hover:bg-slate-50 hover:opacity-80`,
                    ].join(" ")}
                  >
                    {item.label}
                  </NavLink>

                  {/* Nested submenu links shown under the parent in mobile */}
                  {hasSubmenu && (
                    <div className="ml-3 border-l border-slate-200 pl-2">
                      {submenus[item.key].map((sub) => (
                        <NavLink
                          key={sub.href}
                          href={sub.href}
                          onClick={() => setDrawerOpen(false)}
                          className={[
                            "block rounded-md px-3 py-2 text-sm transition-colors",
                            `${subtle} hover:bg-slate-50 hover:opacity-80`,
                          ].join(" ")}
                        >
                          {sub.label}
                        </NavLink>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}

            {/* Mobile actions */}
            <div className="mt-3 border-t border-slate-200 pt-3">
              <div className="flex items-center gap-2 px-2">
                {actions.map((a) => {
                  const iconSrc = iconSrcByKey[a.key];
                  if (!iconSrc) {
                    return (
                      <NavLink
                        key={a.key}
                        href={a.href}
                        className={`text-sm font-medium ${flagBlue} hover:opacity-80`}
                        onClick={() => setDrawerOpen(false)}
                      >
                        {a.label}
                      </NavLink>
                    );
                  }

                  return (
                    <a
                      key={a.key}
                      href={a.href}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-slate-200 bg-white transition-colors hover:bg-slate-50"
                      aria-label={a.label}
                      title={a.label}
                      onClick={() => setDrawerOpen(false)}
                    >
                      <img src={iconSrc} alt="" className="h-5 w-5" />
                      <span className="sr-only">{a.label}</span>
                    </a>
                  );
                })}
              </div>
            </div>
          </nav>
        </aside>
      </div>
    </header>
  );
}