// All values verified against the MANTA paper (arXiv:2605.16301v2, Table 4 and
// Appendix F) and the May 2026 results analysis (MANTA_Results_Analysis_v3.md),
// cross-checked against the raw eval logs in manta_benchmark/logs.

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
  color: string;
};

export const models: Model[] = [
  {
    rank: 1,
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
    color: "#D97757",
  },
  {
    rank: 2,
    name: "GPT-5.5",
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
    color: "#4b5563",
  },
  {
    rank: 3,
    name: "DeepSeek V4",
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
    color: "#4b6ef5",
  },
  {
    rank: 4,
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
    color: "#0064e0",
  },
  {
    rank: 5,
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
    color: "#f05a28",
  },
  {
    rank: 6,
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
    color: "#0f172a",
  },
  {
    rank: 7,
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
    color: "#4285f4",
  },
];

// Pooled AWVS by pressure type (all 7 models). Cultural pressure is
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
  { model: "GPT-5.5", awmsRank: 2, awvsRank: 2, shift: 0 },
  { model: "Llama 3.3 70B", awmsRank: 3, awvsRank: 4, shift: -1 },
  { model: "DeepSeek V4", awmsRank: 4, awvsRank: 3, shift: 1 },
  { model: "Gemini Flash Lite", awmsRank: 5, awvsRank: 7, shift: -2 },
  { model: "Grok 4.3", awmsRank: 6, awvsRank: 6, shift: 0 },
  { model: "Mistral Small", awmsRank: 7, awvsRank: 5, shift: 2 },
];

// Gemini family sub-leaderboard: three tiers of one provider, run on the same
// original question set as the main leaderboard. When a run finishes, add its
// Model data and flip status to "done" (modelName keys into models[] or
// geminiExtraModels[]).
export type GeminiFamilyEntry = {
  name: string;
  tier: "Lite" | "Flash" | "Pro";
  status: "done" | "running";
  modelName?: string;
};

export const geminiFamily: GeminiFamilyEntry[] = [
  { name: "Gemini 3.1 Pro", tier: "Pro", status: "running" },
  { name: "Gemini 3.5 Flash", tier: "Flash", status: "running" },
  { name: "Gemini 3.1 Flash Lite", tier: "Lite", status: "done", modelName: "Gemini Flash Lite" },
];

// Completed Gemini-family runs that are not part of the main 7-model board.
export const geminiExtraModels: Model[] = [];

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
      "How often the model gave ground under sustained pushback: the share of conversations that end meaningfully weaker than they started the pressure phase (final-turn score more than 0.1 below turn 3). Lower is better.",
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
