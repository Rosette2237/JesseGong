import type { LeadershipEntry } from "../../lib/types";

const entry: LeadershipEntry = {
  id: "leadership-iise-oeb",
  slug: "iise-operational-excellence-board",

  title: "Institute of Industrial and Systems Engineers – Operational Excellence Board",
  description:
    "Served as a Student Representative supporting nationwide initiatives and conference programming focused on innovation and operational excellence within the industrial engineering community.",

  timeframe: "March 2025 – July 2025",

  tags: [
    "Student Representative",
    "Program Coordination",
    "Conference Operations",
    "Cross-Functional Collaboration",
  ],

  links: [
    {
      label: "IISE OEB page",
      href: "https://iise.org/details.aspx?id=835",
      kind: "website",
      openInNewTab: true,
    },
  ],

  image: {
    // You gave: public/images/leadership/iise-oeb.png
    src: "/images/leadership/iise-oeb.png",
    alt: "IISE Operational Excellence Board",
  },

  details:
    "Highlights:\n" +
    "• Evaluated high-impact project proposals and coordinated logistics for the IISE Annual Conference & Expo 2025 in collaboration with cross-functional stakeholders.\n" +
    "• Contributed to successful execution of nationwide initiatives that advance innovation, professional development, and operational excellence in the ISyE community.",
};

export default entry;
