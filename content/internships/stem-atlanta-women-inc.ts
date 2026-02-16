import type { InternshipEntry } from "../../lib/types";

const entry: InternshipEntry = {
  id: "internship-stem-atlanta-women-inc",
  slug: "stem-atlanta-women-inc",

  title: "Finance Optimization Lead — STEM Atlanta Women, Inc.",
  description:
    "Led a revenue diversification and finance optimization initiative by launching a new product line, improving donor strategy with RFM segmentation + DMAIC, and deploying financial models to drive measurable growth.",
  timeframe: "January 2025 – April 2025",
  tags: [
    "RFM Analytics",
    "Lean Six Sigma",
    "DMAIC Framework",
    "Finance Optimization",
    "Modeling",
    "Leadership",
  ],

  links: [
    {
      label: "Organization site",
      href: "https://www.stematlanta.ai/",
      kind: "website",
      openInNewTab: true,
    },
  ],

  // Required internship logo
  image: {
    src: "/images/logos/stem.png",
    alt: "STEM Atlanta logo",
  },

  company: "STEM Atlanta Women, Inc.",
  position: "Finance Optimization Lead",
  location: "Atlanta, GA",

  responsibilities: [
    "Launched a new STEM product line end-to-end, owning product definition, pricing strategy, marketing plan, and distribution approach to diversify revenue streams.",
    "Built a donor segmentation approach using RFM analytics to identify high-value supporters, reactivation opportunities, and targeted outreach cohorts.",
    "Applied Lean Six Sigma’s DMAIC framework to structure the improvement process—clarifying objectives, diagnosing bottlenecks, and prioritizing high-ROI interventions for retention and fundraising performance.",
    "Developed financial models to evaluate pricing, unit economics, and resource allocation tradeoffs, enabling data-driven decisions across program and fundraising initiatives.",
    "Coordinated with internal stakeholders to align execution, communicate insights clearly, and drive cross-functional follow-through from analysis to implementation.",
  ],

  outcomes: [
    "Drove an additional ~$500K in annual revenue through optimized resource allocation and revenue diversification initiatives.",
    "Secured 10+ corporate sponsors by strengthening the value proposition and aligning sponsorship opportunities with organizational goals and partner priorities.",
    "Improved donor strategy and retention planning through RFM-based targeting and a DMAIC-driven optimization process focused on ROI.",
  ],

  // Required by InternshipEntry (can be empty if you don’t have extras yet)
  images: [],
};

export default entry;
