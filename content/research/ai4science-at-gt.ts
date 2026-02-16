import type { ResearchEntry } from "@/lib/types";

const entry: ResearchEntry = {
  id: "research-ai4science-at-gt",
  slug: "ai4science-at-gt",
  title: "AI4Science @ GT - Visualizing & Interpretable Protein Folding",
  description:
    "Built an interpretability workflow for OpenFold by extracting layer-wise representations and turning high-dimensional residue interactions into interactive visual analytics. Created embedding views (t-SNE/PCA) and a lightweight web interface to automate folding runs and visualize predicted structures from raw sequences.",
  timeframe: "August 2025 – Present",
  tags: [
    "Undergraduate Student Researcher",
    "HPC",
    "Parallel Computing",
    "TensorFlow",
    "PyTorch",
    "Flask",
    "Bootstrap",
    "PyMOL",
    "OpenFold",
    "Plotly",
    "t-SNE",
    "PCA",
  ],
  links: [
    {
      label: "AI2Science GitHub",
      href: "https://github.com/AI2Science",
    },
  ],
  image: {
    // You provided: public/images/research/ai4science.png
    // In Next.js, that becomes:
    src: "/images/research/ai4science.png",
    alt: "AI4Science @ GT research visual for interpretable protein folding",
  },
  details:
    "Developing interpretable protein folding analysis tools around OpenFold by surfacing intermediate representations, embedding dynamics, and structure-level signals. Emphasis on interactive exploration (dashboards + embeddings) and reproducible structure visualization from sequence-to-3D workflows.",
};

export default entry;
