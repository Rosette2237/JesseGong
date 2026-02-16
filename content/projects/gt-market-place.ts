import type { ProjectEntry } from "../../lib/types";

const entry: ProjectEntry = {
  id: "project-gt-market-place",
  slug: "gt-market-place",

  title: "GT Market Place",
  timeframe: "September 2025 – Present",

  description:
    "Built a full-stack marketplace platform with an admin-facing React dashboard and a moderation-ready backend. Implemented secure identity-to-listing associations for Georgia Tech users and ensured consistent data relationships across listings and accounts.",

  tags: [
    "React",
    "Tailwind CSS",
    "MongoDB",
    "Express.js",
    "Mongoose",
    "Firebase Auth",
    "CRUD",
    "Admin Dashboard",
  ],

  links: [
    {
      label: "Repo",
      href: "https://github.com/Surfnam/gt-marketplace",
      kind: "repo",
      openInNewTab: true,
    },
    {
      label: "Details",
      href: "/projects/gt-market-place",
      kind: "details",
    },
  ],

  image: {
    // You gave: public/images/projects/gt-market-place.png
    // In Next.js, reference it like this:
    src: "/images/projects/gt-market-place.png",
    alt: "GT Market Place project background",
  },

  details:
    "Highlights:\n" +
    "• Developed a dynamic administrative React dashboard styled with Tailwind CSS for a clean, responsive management interface.\n" +
    "• Architected a MongoDB + Express.js backend with full CRUD support to enable platform moderation and administrative oversight.\n" +
    "• Strengthened data integrity by enforcing Mongoose ObjectID relationships and integrating Firebase authentication to securely associate GT users with listings.",

  // Year grouping based on end date (Present → current/latest year group)
  chronology: { kind: "year", year: 2026, order: 1 },
};

export default entry;
