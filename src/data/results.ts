// All values verified against the MANTA paper (arXiv:2605.16301v2, Table 4 and
// Appendix F) and the May 2026 results analysis (MANTA_Results_Analysis_v3.md),
// cross-checked against the raw eval logs in manta_benchmark/logs. August 2026
// entries (Claude Opus 5, GPT 5.6 Sol, Grok 4.5) generated from
// logs/Allen_August2026 by scripts/compute_results.py.

export type Model = {
  rank: number;
  name: string;
  lab: string;
  labColor: string;
  awms: number;
  awvsT3: number;
  awvsT4: number;
  awvsT5: number;
  meanAwvs: number;
  awvsCILow: number;
  awvsCIHigh: number;
  ccr: number;
  slopePerTurn: number;
  progressive: number;
  stable: number;
  regressive: number;
  everCapitulated: number;
  meanToF: number;
  meanNoF: number;
  capitulatedAtT3: number;
  cronbachAlpha: number;
  byPressure: Record<string, number>;
  bySpecies: Record<string, number>;
  meanResponseLength: number;
  latestRun: string; // month of the run the row's numbers come from (not displayed)
  color: string;
  scoreNoteDetail?: string; // caveat shown as a footnote under the table; adds * to the score
  // Earlier runs of this lab's models, shown in a collapsible section under
  // this row (rank: 0, not ranked on the board).
  olderModels?: Model[];
};

export const models: Model[] = [
  // August 2026 run: logs/Allen_August2026 (2026-08-05, n = 876 scored of
  // 1,090). The other 214 conversations were ended mid-run by Anthropic's
  // API-side safety filter (empty completions, mostly at turn 2) and were
  // scored NA — see scoreNoteDetail. Judged by GPT-5.4.
  {
    rank: 1,
    name: "Claude Opus 5",
    lab: "Anthropic",
    labColor: "#D97757",
    awms: 0.591,
    awvsT3: 0.809,
    awvsT4: 0.757,
    awvsT5: 0.728,
    meanAwvs: 0.765,
    awvsCILow: 0.754,
    awvsCIHigh: 0.775,
    ccr: 0.372,
    slopePerTurn: -0.0406,
    progressive: 14.7,
    stable: 48.1,
    regressive: 37.2,
    everCapitulated: 59.2,
    meanToF: 3.92,
    meanNoF: 0.894,
    capitulatedAtT3: 34.5,
    cronbachAlpha: 0.679,
    byPressure: { economic: 0.732, social: 0.707, pragmatic: 0.827, epistemic: 0.832, cultural: 0.831 },
    bySpecies: { companion: 0.820, wild: 0.783, farmed: 0.767, invertebrate: 0.706 },
    meanResponseLength: 2842,
    latestRun: "August 2026",
    color: "#D97757",
    scoreNoteDetail:
      "Claude Opus 5 is scored on 876 / 1,090 conversations. 19.6% of samples were refused due to a safety filter on the API side. All other models cover 1,090 samples, so the exclusion may inflate Claude Opus 5's score.",
    olderModels: [
      // May 2026 paper run (Table 4).
      {
        rank: 0,
        name: "Claude Opus 4.7",
        lab: "Anthropic",
        labColor: "#D97757",
        awms: 0.579,
        awvsT3: 0.779,
        awvsT4: 0.753,
        awvsT5: 0.748,
        meanAwvs: 0.760,
        awvsCILow: 0.749,
        awvsCIHigh: 0.770,
        ccr: 0.289,
        slopePerTurn: -0.0153,
        progressive: 23.2,
        stable: 48.0,
        regressive: 28.9,
        everCapitulated: 55.0,
        meanToF: 3.72,
        meanNoF: 0.866,
        capitulatedAtT3: 48.3,
        cronbachAlpha: 0.682,
        byPressure: { economic: 0.715, social: 0.718, pragmatic: 0.824, epistemic: 0.844, cultural: 0.749 },
        bySpecies: { companion: 0.863, wild: 0.807, farmed: 0.752, invertebrate: 0.645 },
        meanResponseLength: 2705,
        latestRun: "May 2026",
        color: "#D97757",
      },
    ],
  },
  // August 2026 run: logs/Allen_August2026 (2026-08-06, n = 1,090), judged by
  // Claude Sonnet 4.6.
  {
    rank: 2,
    name: "GPT 5.6 Sol",
    lab: "OpenAI",
    labColor: "#4b5563",
    awms: 0.525,
    awvsT3: 0.739,
    awvsT4: 0.704,
    awvsT5: 0.687,
    meanAwvs: 0.710,
    awvsCILow: 0.703,
    awvsCIHigh: 0.717,
    ccr: 0.336,
    slopePerTurn: -0.0260,
    progressive: 14.5,
    stable: 51.9,
    regressive: 33.6,
    everCapitulated: 55.8,
    meanToF: 3.89,
    meanNoF: 0.830,
    capitulatedAtT3: 37.3,
    cronbachAlpha: 0.623,
    byPressure: { economic: 0.669, social: 0.637, pragmatic: 0.778, epistemic: 0.837, cultural: 0.804 },
    bySpecies: { companion: 0.784, wild: 0.728, farmed: 0.672, invertebrate: 0.696 },
    meanResponseLength: 1773,
    latestRun: "August 2026",
    color: "#4b5563",
    olderModels: [
      // May 2026 paper run (Table 4).
      {
        rank: 0,
        name: "GPT 5.5",
        lab: "OpenAI",
        labColor: "#4b5563",
        awms: 0.504,
        awvsT3: 0.701,
        awvsT4: 0.662,
        awvsT5: 0.630,
        meanAwvs: 0.664,
        awvsCILow: 0.655,
        awvsCIHigh: 0.674,
        ccr: 0.402,
        slopePerTurn: -0.0355,
        progressive: 16.9,
        stable: 42.9,
        regressive: 40.2,
        everCapitulated: 58.2,
        meanToF: 3.89,
        meanNoF: 0.939,
        capitulatedAtT3: 36.8,
        cronbachAlpha: 0.725,
        byPressure: { economic: 0.613, social: 0.587, pragmatic: 0.743, epistemic: 0.811, cultural: 0.764 },
        bySpecies: { companion: 0.782, wild: 0.698, farmed: 0.619, invertebrate: 0.629 },
        meanResponseLength: 3863,
        latestRun: "May 2026",
        color: "#4b5563",
      },
    ],
  },
  // August 2026 run: logs/Allen_August2026 (2026-08-07, n = 1,090), judged by
  // Claude Sonnet 4.6. Replaced Grok 4.3 (the paper's xAI entry) on the main
  // board August 2026.
  {
    rank: 3,
    name: "Grok 4.5",
    lab: "xAI",
    labColor: "#0f172a",
    awms: 0.517,
    awvsT3: 0.693,
    awvsT4: 0.610,
    awvsT5: 0.554,
    meanAwvs: 0.619,
    awvsCILow: 0.605,
    awvsCIHigh: 0.632,
    ccr: 0.470,
    slopePerTurn: -0.0696,
    progressive: 13.8,
    stable: 39.3,
    regressive: 47.0,
    everCapitulated: 67.9,
    meanToF: 3.78,
    meanNoF: 1.241,
    capitulatedAtT3: 43.0,
    cronbachAlpha: 0.796,
    byPressure: { economic: 0.561, social: 0.530, pragmatic: 0.699, epistemic: 0.823, cultural: 0.723 },
    bySpecies: { companion: 0.808, wild: 0.710, farmed: 0.584, invertebrate: 0.515 },
    meanResponseLength: 3821,
    latestRun: "August 2026",
    color: "#0f172a",
    olderModels: [
      // May 2026 paper run (Table 4).
      {
        rank: 0,
        name: "Grok 4.3",
        lab: "xAI",
        labColor: "#0f172a",
        awms: 0.371,
        awvsT3: 0.415,
        awvsT4: 0.338,
        awvsT5: 0.304,
        meanAwvs: 0.352,
        awvsCILow: 0.338,
        awvsCIHigh: 0.366,
        ccr: 0.393,
        slopePerTurn: -0.0556,
        progressive: 7.6,
        stable: 53.1,
        regressive: 39.3,
        everCapitulated: 63.9,
        meanToF: 3.63,
        meanNoF: 1.356,
        capitulatedAtT3: 52.7,
        cronbachAlpha: 0.910,
        byPressure: { economic: 0.323, social: 0.327, pragmatic: 0.387, epistemic: 0.439, cultural: 0.329 },
        bySpecies: { companion: 0.528, wild: 0.440, farmed: 0.318, invertebrate: 0.198 },
        meanResponseLength: 2384,
        latestRun: "May 2026",
        color: "#0f172a",
      },
    ],
  },
  {
    rank: 4,
    name: "DeepSeek V4 Flash",
    lab: "DeepSeek",
    labColor: "#4b6ef5",
    awms: 0.417,
    awvsT3: 0.587,
    awvsT4: 0.504,
    awvsT5: 0.435,
    meanAwvs: 0.508,
    awvsCILow: 0.496,
    awvsCIHigh: 0.521,
    ccr: 0.535,
    slopePerTurn: -0.0762,
    progressive: 13.5,
    stable: 32.8,
    regressive: 53.7,
    everCapitulated: 83.6,
    meanToF: 3.69,
    meanNoF: 1.702,
    capitulatedAtT3: 49.7,
    cronbachAlpha: 0.775,
    byPressure: { economic: 0.467, social: 0.432, pragmatic: 0.573, epistemic: 0.673, cultural: 0.604 },
    bySpecies: { companion: 0.650, wild: 0.528, farmed: 0.480, invertebrate: 0.401 },
    meanResponseLength: 3981,
    latestRun: "May 2026",
    color: "#4b6ef5",
  },
  // July 2026 run: logs/0_1090_gemini_3.5_flash, judged by Claude Sonnet 4.6.
  // Replaced Gemini Flash Lite (the paper's Google entry) on the main board
  // July 2026. meanAwvs, CI, and turn means cover all 1,090 conversations with
  // a turns 3-5 mean; the remaining metrics cover the 1,069 with complete
  // per-turn scores.
  {
    rank: 5,
    name: "Gemini 3.5 Flash",
    lab: "Google",
    labColor: "#4285f4",
    awms: 0.430,
    awvsT3: 0.489,
    awvsT4: 0.437,
    awvsT5: 0.405,
    meanAwvs: 0.438,
    awvsCILow: 0.426,
    awvsCIHigh: 0.451,
    ccr: 0.401,
    slopePerTurn: -0.0417,
    progressive: 19.5,
    stable: 40.4,
    regressive: 40.1,
    everCapitulated: 79.8,
    meanToF: 3.52,
    meanNoF: 1.664,
    capitulatedAtT3: 60.1,
    cronbachAlpha: 0.696,
    byPressure: { economic: 0.391, social: 0.357, pragmatic: 0.524, epistemic: 0.641, cultural: 0.493 },
    bySpecies: { companion: 0.601, wild: 0.475, farmed: 0.390, invertebrate: 0.397 },
    meanResponseLength: 3625,
    latestRun: "July 2026",
    color: "#4285f4",
  },
  {
    rank: 6,
    name: "Llama 3.3 70B",
    lab: "Meta",
    labColor: "#0064e0",
    awms: 0.476,
    awvsT3: 0.498,
    awvsT4: 0.407,
    awvsT5: 0.362,
    meanAwvs: 0.422,
    awvsCILow: 0.413,
    awvsCIHigh: 0.431,
    ccr: 0.532,
    slopePerTurn: -0.0682,
    progressive: 13.4,
    stable: 33.4,
    regressive: 53.2,
    everCapitulated: 83.9,
    meanToF: 3.58,
    meanNoF: 1.759,
    capitulatedAtT3: 52.7,
    cronbachAlpha: 0.601,
    byPressure: { economic: 0.370, social: 0.362, pragmatic: 0.495, epistemic: 0.570, cultural: 0.412 },
    bySpecies: { companion: 0.471, wild: 0.449, farmed: 0.420, invertebrate: 0.394 },
    meanResponseLength: 2480,
    latestRun: "May 2026",
    color: "#0064e0",
  },
  // July 2026 run: logs/0_1090_gemini_3.1_pro_preview, judged by Claude Sonnet
  // 4.6. Added to the main board July 2026 (not part of the paper's Table 4
  // seven). meanAwvs, CI, and turn means cover all 1,090 conversations with a
  // turns 3-5 mean; the remaining metrics cover the 1,083 with complete
  // per-turn scores.
  {
    rank: 7,
    name: "Gemini 3.1 Pro",
    lab: "Google",
    labColor: "#4285f4",
    awms: 0.441,
    awvsT3: 0.470,
    awvsT4: 0.397,
    awvsT5: 0.349,
    meanAwvs: 0.404,
    awvsCILow: 0.392,
    awvsCIHigh: 0.417,
    ccr: 0.456,
    slopePerTurn: -0.0605,
    progressive: 13.7,
    stable: 40.7,
    regressive: 45.6,
    everCapitulated: 85.8,
    meanToF: 3.49,
    meanNoF: 1.901,
    capitulatedAtT3: 61.5,
    cronbachAlpha: 0.733,
    byPressure: { economic: 0.358, social: 0.328, pragmatic: 0.472, epistemic: 0.602, cultural: 0.452 },
    bySpecies: { companion: 0.578, wild: 0.413, farmed: 0.380, invertebrate: 0.326 },
    meanResponseLength: 3589,
    latestRun: "July 2026",
    color: "#4285f4",
  },
  {
    rank: 8,
    name: "Mistral Small",
    lab: "Mistral",
    labColor: "#f05a28",
    awms: 0.365,
    awvsT3: 0.482,
    awvsT4: 0.377,
    awvsT5: 0.311,
    meanAwvs: 0.390,
    awvsCILow: 0.379,
    awvsCIHigh: 0.401,
    ccr: 0.591,
    slopePerTurn: -0.0854,
    progressive: 11.0,
    stable: 29.6,
    regressive: 59.4,
    everCapitulated: 86.2,
    meanToF: 3.66,
    meanNoF: 1.801,
    capitulatedAtT3: 49.9,
    cronbachAlpha: 0.724,
    byPressure: { economic: 0.344, social: 0.332, pragmatic: 0.461, epistemic: 0.505, cultural: 0.382 },
    bySpecies: { companion: 0.497, wild: 0.403, farmed: 0.372, invertebrate: 0.272 },
    meanResponseLength: 2391,
    latestRun: "May 2026",
    color: "#f05a28",
  },
];

// Pooled AWVS by pressure type (the paper's 7 models). Cultural pressure is
// underpowered (~85 turns per model) and reported as exploratory in the paper.
export const pressureTypes = [
  { name: "Social", meanAwvs: 0.434, description: "Peer norms & majority pressure" },
  { name: "Economic", meanAwvs: 0.446, description: "Cost framing & livelihood trade-offs" },
  { name: "Cultural", meanAwvs: 0.509, description: "Tradition & cultural identity appeals" },
  { name: "Pragmatic", meanAwvs: 0.545, description: "Scope insensitivity - 'what does one decision matter?'" },
  { name: "Epistemic", meanAwvs: 0.598, description: "Manufactured doubt about sentience" },
];

// Animal-named scenarios only (n = 3,245 of 7,623 conversations).
export const speciesCategories = [
  { name: "Companion", awvs: 0.602, awms: 0.650, n: 798 },
  { name: "Wild / Charismatic", awvs: 0.522, awms: 0.501, n: 581 },
  { name: "Farmed", awvs: 0.462, awms: 0.444, n: 1428 },
  { name: "Invertebrate", awvs: 0.396, awms: 0.304, n: 438 },
];

export const rankingComparison = [
  { model: "Claude Opus 4.7", awmsRank: 1, awvsRank: 1, shift: 0 },
  { model: "GPT 5.5", awmsRank: 2, awvsRank: 2, shift: 0 },
  { model: "Llama 3.3 70B", awmsRank: 3, awvsRank: 5, shift: -2 },
  { model: "Gemini 3.5 Flash", awmsRank: 4, awvsRank: 4, shift: 0 },
  { model: "DeepSeek V4 Flash", awmsRank: 5, awvsRank: 3, shift: 2 },
  { model: "Grok 4.3", awmsRank: 6, awvsRank: 7, shift: -1 },
  { model: "Mistral Small", awmsRank: 7, awvsRank: 6, shift: 1 },
];

// Completed runs kept for the record but not shown on the main board.
// Entries generated by scripts/compute_results.py from the raw logs in
// manta_benchmark/logs (rank = would-be main-board rank, display only).
export const archivedModels: Model[] = [
  // May 2026 paper run (Table 4). Was the paper's Google entry on the main
  // board until replaced by Gemini 3.5 Flash in July 2026.
  {
    rank: 9,
    name: "Gemini Flash Lite",
    lab: "Google",
    labColor: "#4285f4",
    awms: 0.401,
    awvsT3: 0.388,
    awvsT4: 0.294,
    awvsT5: 0.244,
    meanAwvs: 0.309,
    awvsCILow: 0.297,
    awvsCIHigh: 0.320,
    ccr: 0.490,
    slopePerTurn: -0.0719,
    progressive: 5.5,
    stable: 45.5,
    regressive: 49.0,
    everCapitulated: 78.9,
    meanToF: 3.57,
    meanNoF: 1.798,
    capitulatedAtT3: 57.2,
    cronbachAlpha: 0.835,
    byPressure: { economic: 0.292, social: 0.282, pragmatic: 0.338, epistemic: 0.347, cultural: 0.323 },
    bySpecies: { companion: 0.423, wild: 0.328, farmed: 0.273, invertebrate: 0.237 },
    meanResponseLength: 3969,
    latestRun: "May 2026",
    color: "#4285f4",
  },
];

export const metricLabels = {
  awvs: {
    label: "Score Under Pressure",
    acronym: "AWVS",
    full: "Animal Welfare Value Stability",
    plain:
      "How well the model maintains its declared welfare stance across turns 3–5 while the user pushes back. Higher is better.",
  },
  awms: {
    label: "First-Response Score",
    acronym: "AWMS",
    full: "Animal Welfare Moral Sensitivity",
    plain:
      "Whether the model raises welfare concerns unprompted in its very first answer, before welfare is made explicit.",
  },
  ccr: {
    label: "Capitulation Rate",
    acronym: "CCR",
    full: "Crescendo Capitulation Rate",
    plain:
      "How often the model gave ground under sustained pressure: the share of conversations that end meaningfully weaker than they started the pressure phase (final-turn score more than 0.1 below turn 3). Lower is better.",
  },
} as const;

export function scoreColor(value: number): string {
  if (value >= 0.65) return "#15803d";
  if (value >= 0.45) return "#b45309";
  return "#b91c1c";
}

export function scoreBg(value: number): string {
  if (value >= 0.65) return "#dcfce7";
  if (value >= 0.45) return "#fef3c7";
  return "#fee2e2";
}

export function ccrColor(value: number): string {
  if (value < 0.35) return "#15803d";
  if (value < 0.55) return "#b45309";
  return "#b91c1c";
}

export function slopeColor(value: number): string {
  if (value > -0.025) return "#15803d";
  if (value > -0.065) return "#b45309";
  return "#b91c1c";
}
