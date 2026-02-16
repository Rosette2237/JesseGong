import type { ResearchEntry } from "../../lib/types";

const entry: ResearchEntry = {
  id: "research-neuron-level-interpretability",
  slug: "neuron-level-interpretability",

  title: "Quantifying Polysemanticity in Convolutional Neural Networks",
  description:
    "Built and trained CNN baselines (LeNet-5 → CIFAR-10 variants) and quantified mono-/poly-semanticity via activation-distribution metrics. Studied how optimizer choice (SGD vs Adam), weight decay, and normalization influence feature sensitivity and the emergence of polysemantic representations.",

  timeframe: "September 2024 – Present",

  tags: [
    // (temporary) position label stored as a tag until we formalize a research-specific field
    "Researcher — GT Math Modeling Student Research Group",
    "LeNet-5",
    "PyTorch",
    "TensorFlow",
    "SGD",
    "Adam",
    "Feature Visualization",
    "LPIPS",
    "Wasserstein GAN",
    "cGAN",
  ],

  // You said links aren't available yet — leave empty for now.
  links: [],

  image: {
    // You provided: public/images/research/neuron.png
    // In Next.js, reference it like this:
    src: "/images/research/neuron.png",
    alt: "Neuron-level interpretability research visual",
  },

  details:
    "Developing an interpretability workflow to quantify polysemanticity in CNNs by analyzing neuron activation distributions and how they shift across tasks and training regimes. Implemented LeNet-5 baselines on MNIST and extended to stronger CNN variants for CIFAR-10, then evaluated how optimizer settings (SGD/Adam), regularization (weight decay), and normalization choices affect semanticity, feature sensitivity, and representation stability. Ongoing work includes feature visualization and perceptual similarity diagnostics (e.g., LPIPS) alongside generative baselines (Wasserstein GAN / cGAN) for stress-testing learned features.",
};

export default entry;
