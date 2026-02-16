import type { ProjectEntry } from "../../lib/types";

const entry: ProjectEntry = {
  id: "project-deep-learning-stock-prediction",
  slug: "deep-learning-based-stock-prediction",

  title: "Deep Learning Based Stock Prediction",
  timeframe: "January 2025 – June 2025",

  description:
    "Built a multi-signal stock prediction pipeline that combines computer vision on candlestick charts with transformer-based sentiment from financial news. Benchmarked architectures, integrated outputs into a unified model, and delivered a full-stack app for interactive, real-time prediction visualization.",

  tags: [
    "TensorFlow",
    "CNN",
    "EfficientNet",
    "Transfer Learning",
    "RoBERTa",
    "Sentiment Analysis",
    "Backtesting",
    "Vue.js",
    "Vite",
    "FastAPI",
    "Polygon API",
  ],

  links: [
    // No external links yet, keep Details internal
    { label: "Details", href: "/projects/deep-learning-based-stock-prediction", kind: "details" },
  ],

  image: {
    // public/images/projects/deep-learning-stock.png -> /images/projects/deep-learning-stock.png
    src: "/images/projects/deep-learning-stock.png",
    alt: "Deep learning stock prediction project background",
  },

  details:
    "Highlights:\n" +
    "• Designed and trained a custom three-layer CNN in TensorFlow to learn patterns from candlestick chart images for stock-movement prediction.\n" +
    "• Applied transfer learning with EfficientNet and performed architecture benchmarking to identify the most effective vision backbone.\n" +
    "• Fine-tuned a RoBERTa transformer for financial-news sentiment analysis and integrated it with chart-based signals.\n" +
    "• Combined CNN and RoBERTa outputs into a unified predictive framework and rigorously backtested against historical stock data.\n" +
    "• Built a full-stack web app (Vue.js + Vite + FastAPI) that displays real-time predictions via Polygon API and visualizes model outputs across user-selected time windows.",

  // End date is June 2025 → group year = 2025
  chronology: { kind: "year", year: 2025, order: 1 },
};

export default entry;
