import type { ResearchEntry } from "../../lib/types";

const entry: ResearchEntry = {
  id: "research-isye-surs",
  slug: "isye-summer-undergraduate-research-scholars-program",

  title: "ISyE Summer Undergraduate Research Scholars Program",
  description:
    "Studied Multiple Hypothesis Testing (MHT) theory and error-control guarantees, focusing on formal derivations for FWER and FDR metrics under faculty guidance. Authored a research write-up that reframed MHT as an infinite-dimensional optimization problem to reason about optimal and maximin testing procedures.",

  timeframe: "May 2025 – August 2025",

  tags: [
    // (temporary) position label stored as a tag until we formalize a research-specific field
    "Undergraduate Student Researcher",
    "Multiple Hypothesis Testing",
    "Optimal Multiple Testing",
    "FWER",
    "FDR",
    "Bonferroni Correction",
    "Benjamini–Hochberg (BH) Procedure",
  ],

  links: [
    {
      label: "Program page",
      href: "https://ugresearch.isye.gatech.edu/research-awards-programs/summer-scholars-program",
      kind: "website",
      openInNewTab: true,
    },
    {
      // Your uploaded flyer in the repo:
      // public/files/isye-summer-scholars-program-flyer.pdf  ->  /files/isye-summer-scholars-program-flyer.pdf
      label: "Flyer (PDF)",
      href: "/files/isye-summer-scholars-program-flyer.pdf",
      kind: "other",
      openInNewTab: true,
    },
  ],

  image: {
    // public/images/research/surs.jpg -> /images/research/surs.jpg
    src: "/images/research/surs.jpg",
    alt: "ISyE Summer Undergraduate Research Scholars Program",
  },

  details:
    "Focused on the theoretical foundations of multiple hypothesis testing, including rigorous derivations for family-wise error rate (FWER) and false discovery rate (FDR) control. Developed a research report that formulates key MHT objectives as an infinite-dimensional optimization problem, enabling a principled discussion of optimal and maximin procedures and how classical corrections (e.g., Bonferroni and BH) relate to these guarantees.",
};

export default entry;
