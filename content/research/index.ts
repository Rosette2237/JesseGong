// JesseGong/content/research/index.ts

import type { ResearchEntry } from "../../lib/types";

/**
 * Add one file per entry (recommended), then import and include here.
 * Example:
 *   import ai4science from "./ai4science-at-gt";
 *   export const research: ResearchEntry[] = [ai4science, ...];
 */

import ai4science from "./ai4science-at-gt";
import neuron from "./neuron-level-interpretability";
import surs from "./isye-summer-undergraduate-research-scholars-program";

export const research: ResearchEntry[] = [ai4science, neuron, surs];

export default research;
