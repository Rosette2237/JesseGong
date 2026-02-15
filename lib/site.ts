// JesseGong/lib/site.ts

export type NavItem = {
  key: string;
  label: string;
  href: string;
  kind: "internal" | "external";
  /**
   * If true, render with target=_blank rel=noopener noreferrer.
   * (Recommended for external links like GitHub.)
   */
  openInNewTab?: boolean;
  /**
   * Feature flag per item. Keep the item definition but hide it from the navbar.
   * This is how you can hide CV quickly.
   */
  enabled?: boolean;
};

type SiteConfig = {
  ownerName: string;

  // External destinations
  githubUrl: string;

  // Static file paths (served from /public). Example: public/files/cv.pdf -> /files/cv.pdf
  cvPath: string;

  // Feature flags (single place to turn things on/off)
  features: {
    showCvInNavbar: boolean;
    showGithubInNavbar: boolean;
  };

  /**
   * Main navigation tabs in your preferred order (internal routes only).
   * These correspond to app/<route>/page.tsx.
   */
  primaryNav: NavItem[];

  /**
   * Right-side “action” nav items (external / download / quick links).
   * Example: GitHub + CV.
   */
  actionNav: NavItem[];
};

/**
 * If you host on GitHub Pages as a project site, your base path is usually "/<repo>".
 * You’ll set this (later) via NEXT_PUBLIC_BASE_PATH and next.config.ts basePath/assetPrefix.
 * This helper ensures links to public assets (e.g., /files/cv.pdf) work under basePath too.
 */
function normalizeBasePath(raw: string): string {
  if (!raw) return "";
  let bp = raw.trim();
  if (!bp.startsWith("/")) bp = `/${bp}`;
  if (bp !== "/" && bp.endsWith("/")) bp = bp.slice(0, -1);
  return bp === "/" ? "" : bp;
}

export const BASE_PATH = normalizeBasePath(process.env.NEXT_PUBLIC_BASE_PATH ?? "");

/**
 * Prefix relative hrefs (starting with "/") with basePath if present.
 * Leaves absolute URLs untouched.
 */
export function withBasePath(href: string): string {
  if (!href) return href;
  if (href.startsWith("http://") || href.startsWith("https://")) return href;
  if (!href.startsWith("/")) return `${BASE_PATH}/${href}`;
  return `${BASE_PATH}${href}`;
}

export const site: SiteConfig = {
  ownerName: "Boyang Gong",
  githubUrl: "https://github.com/Rosette2237",
  cvPath: "/files/cv.pdf", // put your PDF at: JesseGong/public/files/cv.pdf

  features: {
    showCvInNavbar: true,      // <-- flip to false anytime to hide CV
    showGithubInNavbar: true,  // GitHub should generally stay visible
  },

  // Your required order: home, internship, research, project, leadership, awards, skills, interests
  primaryNav: [
    { key: "home", label: "Home", href: "/", kind: "internal", enabled: true },
    { key: "internships", label: "Internships", href: "/internships", kind: "internal", enabled: true },
    { key: "research", label: "Research", href: "/research", kind: "internal", enabled: true },
    { key: "projects", label: "Projects", href: "/projects", kind: "internal", enabled: true },
    { key: "leadership", label: "Leadership", href: "/leadership", kind: "internal", enabled: true },
    { key: "awards", label: "Awards", href: "/awards", kind: "internal", enabled: true },
    { key: "skills", label: "Skills", href: "/skills", kind: "internal", enabled: true },
    { key: "interests", label: "Interests", href: "/interests", kind: "internal", enabled: true },
  ],

  // Action items (typically rendered on the right side of the navbar)
  actionNav: [
    {
      key: "github",
      label: "GitHub",
      href: "https://github.com/Rosette2237",
      kind: "external",
      openInNewTab: true,
      enabled: true, // final enabling is controlled by features below
    },
    {
      key: "cv",
      label: "CV",
      href: "/files/cv.pdf",
      kind: "external",
      openInNewTab: true,
      enabled: true, // final enabling is controlled by features below
    },
  ],
};

/**
 * Single “source of truth” getter for the Navbar:
 * - filters disabled items
 * - applies feature flags
 * - basePath-prefixes public/static paths where needed
 */
export function getNavbarModel(): { primary: NavItem[]; actions: NavItem[] } {
  const primary = site.primaryNav.filter((i) => i.enabled !== false);

  const actions: NavItem[] = site.actionNav
    .filter((i) => i.enabled !== false)
    .filter((i) => {
      if (i.key === "cv") return site.features.showCvInNavbar;
      if (i.key === "github") return site.features.showGithubInNavbar;
      return true;
    })
    .map((i) => {
      // Base-path prefix only for relative hrefs like "/files/cv.pdf"
      const href = withBasePath(i.href);
      return { ...i, href };
    });

  return { primary, actions };
}
