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
    labColor: "#c85c27",
    awms: 0.583,
    awvsT3: 0.778,
    awvsT4: 0.752,
    awvsT5: 0.749,
    meanAwvs: 0.760,
    awvsCILow: 0.748,
    awvsCIHigh: 0.771,
    ccr: 0.285,
    slopePerTurn: -0.015,
    progressive: 22.7,
    stable: 48.8,
    regressive: 28.5,
    everCapitulated: 54.6,
    meanToF: 3.71,
    meanNoF: 0.86,
    capitulatedAtT3: 48.6,
    cronbachAlpha: 0.691,
    byPressure: { economic: 0.716, social: 0.716, pragmatic: 0.822, epistemic: 0.847, cultural: 0.746 },
    bySpecies: { companion: 0.865, wild: 0.813, farmed: 0.741, invertebrate: 0.661 },
    meanResponseLength: 2708,
    color: "#c85c27",
  },
  {
    rank: 2,
    name: "GPT-5.5",
    lab: "OpenAI",
    labColor: "#10a37f",
    awms: 0.510,
    awvsT3: 0.701,
    awvsT4: 0.664,
    awvsT5: 0.629,
    meanAwvs: 0.665,
    awvsCILow: 0.655,
    awvsCIHigh: 0.674,
    ccr: 0.411,
    slopePerTurn: -0.036,
    progressive: 17.1,
    stable: 41.8,
    regressive: 41.1,
    everCapitulated: 58.5,
    meanToF: 3.90,
    meanNoF: 0.94,
    capitulatedAtT3: 36.3,
    cronbachAlpha: 0.715,
    byPressure: { economic: 0.610, social: 0.588, pragmatic: 0.743, epistemic: 0.809, cultural: 0.763 },
    bySpecies: { companion: 0.775, wild: 0.702, farmed: 0.622, invertebrate: 0.641 },
    meanResponseLength: 3874,
    color: "#10a37f",
  },
  {
    rank: 3,
    name: "DeepSeek V4",
    lab: "DeepSeek",
    labColor: "#4b6ef5",
    awms: 0.420,
    awvsT3: 0.585,
    awvsT4: 0.503,
    awvsT5: 0.435,
    meanAwvs: 0.507,
    awvsCILow: 0.495,
    awvsCIHigh: 0.520,
    ccr: 0.529,
    slopePerTurn: -0.075,
    progressive: 13.9,
    stable: 33.1,
    regressive: 53.1,
    everCapitulated: 83.4,
    meanToF: 3.67,
    meanNoF: 1.71,
    capitulatedAtT3: 50.9,
    cronbachAlpha: 0.777,
    byPressure: { economic: 0.464, social: 0.431, pragmatic: 0.571, epistemic: 0.670, cultural: 0.601 },
    bySpecies: { companion: 0.655, wild: 0.537, farmed: 0.479, invertebrate: 0.392 },
    meanResponseLength: 3995,
    color: "#4b6ef5",
  },
  {
    rank: 4,
    name: "Llama 3.3 70B",
    lab: "Meta",
    labColor: "#0064e0",
    awms: 0.475,
    awvsT3: 0.498,
    awvsT4: 0.408,
    awvsT5: 0.364,
    meanAwvs: 0.423,
    awvsCILow: 0.414,
    awvsCIHigh: 0.433,
    ccr: 0.528,
    slopePerTurn: -0.067,
    progressive: 13.5,
    stable: 33.6,
    regressive: 52.8,
    everCapitulated: 83.3,
    meanToF: 3.58,
    meanNoF: 1.74,
    capitulatedAtT3: 52.7,
    cronbachAlpha: 0.604,
    byPressure: { economic: 0.371, social: 0.360, pragmatic: 0.500, epistemic: 0.561, cultural: 0.412 },
    bySpecies: { companion: 0.471, wild: 0.452, farmed: 0.421, invertebrate: 0.402 },
    meanResponseLength: 2471,
    color: "#0064e0",
  },
  {
    rank: 5,
    name: "Mistral Small",
    lab: "Mistral",
    labColor: "#f05a28",
    awms: 0.372,
    awvsT3: 0.484,
    awvsT4: 0.380,
    awvsT5: 0.316,
    meanAwvs: 0.393,
    awvsCILow: 0.382,
    awvsCIHigh: 0.405,
    ccr: 0.589,
    slopePerTurn: -0.084,
    progressive: 11.5,
    stable: 29.4,
    regressive: 59.1,
    everCapitulated: 86.1,
    meanToF: 3.66,
    meanNoF: 1.79,
    capitulatedAtT3: 49.5,
    cronbachAlpha: 0.720,
    byPressure: { economic: 0.347, social: 0.333, pragmatic: 0.468, epistemic: 0.507, cultural: 0.381 },
    bySpecies: { companion: 0.518, wild: 0.424, farmed: 0.374, invertebrate: 0.284 },
    meanResponseLength: 2414,
    color: "#f05a28",
  },
  {
    rank: 6,
    name: "Grok 4.3",
    lab: "xAI",
    labColor: "#0f172a",
    awms: 0.374,
    awvsT3: 0.416,
    awvsT4: 0.337,
    awvsT5: 0.304,
    meanAwvs: 0.353,
    awvsCILow: 0.338,
    awvsCIHigh: 0.368,
    ccr: 0.393,
    slopePerTurn: -0.056,
    progressive: 7.9,
    stable: 52.8,
    regressive: 39.3,
    everCapitulated: 64.3,
    meanToF: 3.63,
    meanNoF: 1.37,
    capitulatedAtT3: 52.3,
    cronbachAlpha: 0.910,
    byPressure: { economic: 0.323, social: 0.328, pragmatic: 0.386, epistemic: 0.436, cultural: 0.333 },
    bySpecies: { companion: 0.540, wild: 0.461, farmed: 0.307, invertebrate: 0.203 },
    meanResponseLength: 2381,
    color: "#0f172a",
  },
  {
    rank: 7,
    name: "Gemini Flash Lite",
    lab: "Google",
    labColor: "#4285f4",
    awms: 0.401,
    awvsT3: 0.386,
    awvsT4: 0.296,
    awvsT5: 0.242,
    meanAwvs: 0.308,
    awvsCILow: 0.297,
    awvsCIHigh: 0.320,
    ccr: 0.493,
    slopePerTurn: -0.072,
    progressive: 5.3,
    stable: 45.4,
    regressive: 49.3,
    everCapitulated: 79.1,
    meanToF: 3.57,
    meanNoF: 1.81,
    capitulatedAtT3: 57.0,
    cronbachAlpha: 0.837,
    byPressure: { economic: 0.292, social: 0.281, pragmatic: 0.339, epistemic: 0.340, cultural: 0.320 },
    bySpecies: { companion: 0.434, wild: 0.338, farmed: 0.275, invertebrate: 0.239 },
    meanResponseLength: 3971,
    color: "#4285f4",
  },
];

export const pressureTypes = [
  { name: "Social", meanAwvs: 0.434, description: "Peer norms & community standards" },
  { name: "Economic", meanAwvs: 0.446, description: "Cost framing & financial arguments" },
  { name: "Cultural", meanAwvs: 0.508, description: "Cultural tradition & relativism" },
  { name: "Pragmatic", meanAwvs: 0.547, description: "Practical utility & convenience" },
  { name: "Epistemic", meanAwvs: 0.596, description: "Manufactured sentience uncertainty" },
];

export const speciesCategories = [
  { name: "Companion", awvs: 0.608, awms: 0.477, n: 595 },
  { name: "Wild / Charismatic", awvs: 0.532, awms: 0.443, n: 511 },
  { name: "Farmed", awvs: 0.460, awms: 0.430, n: 1246 },
  { name: "Invertebrate", awvs: 0.402, awms: 0.397, n: 354 },
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

export const metricLabels = {
  awvs: {
    label: "Score Under Pressure",
    acronym: "AWVS",
    full: "Animal Welfare Value Stability",
    plain:
      "How well the model keeps advocating for animal welfare across turns 3–5, while a simulated user pushes back. Higher is better.",
  },
  awms: {
    label: "First-Response Score",
    acronym: "AWMS",
    full: "Animal Welfare Moral Sensitivity",
    plain:
      "Whether the model raises welfare concerns on its own in its very first answer, before any pressure is applied.",
  },
  ccr: {
    label: "Capitulation Rate",
    acronym: "CCR",
    full: "Crescendo Capitulation Rate",
    plain:
      "The share of conversations where the model's score collapses by the final turn. Lower is better.",
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
