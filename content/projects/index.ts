// JesseGong/content/projects/index.ts

import type { ProjectEntry } from "../../lib/types";

/**
 * Add one file per entry (recommended), then import and include here.
 * Example:
 *   import marketplace from "./gt-market-place";
 *   export const projects: ProjectEntry[] = [marketplace, ...];
 */
import marketplace from "./gt-market-place";
import signSync from "./sign-sync";
import stockDL from "./deep-learning-based-stock-prediction";

// NOTE: lib/content.ts will re-sort again, but this list is still useful as the source of truth.
export const projects: ProjectEntry[] = [marketplace, signSync, stockDL];

export default projects;
