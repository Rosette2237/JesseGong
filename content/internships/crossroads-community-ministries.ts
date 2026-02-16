import type { InternshipEntry } from "../../lib/types";

const entry: InternshipEntry = {
  id: "internship-crossroads-community-ministries",
  slug: "crossroads-community-ministries",

  title: "Consultant — Crossroads Community Ministries",
  description:
    "Built an operational reporting pipeline and dashboards to improve case tracking, service visibility, and day-to-day decision-making for frontline staff.",
  timeframe: "October 2024 – May 2025",
  tags: ["Power BI", "HMIS Systems", "Data Analysis", "Client Communication"],

  links: [
    {
      label: "Organization site",
      href: "https://www.crossroadsatlanta.org/",
      kind: "website",
      openInNewTab: true,
    },
  ],

  // Required internship logo
  image: {
    src: "/images/logos/crossroads.png",
    alt: "Crossroads Community Ministries logo",
  },

  company: "Crossroads Community Ministries",
  position: "Consultant",
  location: "Atlanta, GA",

  responsibilities: [
    "Developed a lightweight data integration workflow connecting Georgia HMIS exports with Google Sheets to consolidate case notes and key operational metrics for weekly tracking.",
    "Defined consistent data fields and validation checks to improve data quality and reduce manual reconciliation across intake and case-management records.",
    "Designed a unified Power BI reporting layer (data model + measures) that translated raw operational data into clear, stakeholder-ready views for leadership and program staff.",
    "Built dashboard experiences aligned with frontline workflows to streamline reporting, identify bottlenecks, and support service delivery improvements.",
    "Partnered closely with staff to iterate on requirements, clarify definitions, and deliver dashboards that matched how teams actually use the data day-to-day.",
  ],

  outcomes: [
    "Enabled more reliable tracking of case activity and program operations by centralizing notes and data points into a single reporting workflow.",
    "Improved visibility into service delivery through standardized Power BI dashboards, supporting faster, clearer communication across stakeholders.",
    "Streamlined recurring reporting workflows, reducing friction for staff and improving consistency in operational decision support.",
  ],

  // Required by InternshipEntry (can be empty if you don’t have extras yet)
  images: [],
};

export default entry;
