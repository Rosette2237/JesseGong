import type { LeadershipEntry } from "../../lib/types";

const entry: LeadershipEntry = {
  id: "leadership-faset",
  slug: "gt-faset-orientation-leader",

  title: "GT New Student & Transition Programs – FASET",
  description:
    "Served as a New Student Orientation Leader, guiding incoming students and families through Georgia Tech orientation while supporting registration, scheduling, and session programming.",

  timeframe: "February 2025 – August 2025",

  tags: [
    "New Student Orientation Leader",
    "Student Support",
    "Program Operations",
    "Event Logistics",
    "Public Speaking",
  ],

  links: [
    {
      label: "FASET staff page",
      href: "https://transitionprograms.gatech.edu/faset-orientation/staff",
      kind: "website",
      openInNewTab: true,
    },
  ],

  image: {
    // You gave: public/images/leadership/faset.png
    // Next.js public reference:
    src: "/images/leadership/faset.png",
    alt: "Georgia Tech FASET orientation leadership",
  },

  details:
    "Highlights:\n" +
    "• Guided 1,000+ incoming students and families through orientation as a Georgia Tech ambassador, leading small-group discussions and managing live Q&A.\n" +
    "• Supported registration operations by advising first-year students on course schedule planning and coordinating with academic advisors to troubleshoot holds.\n" +
    "• Partnered with fellow FASET Leaders to plan, organize, and execute 5+ activities per session, managing logistics, timing, and on-site execution.",
};

export default entry;
