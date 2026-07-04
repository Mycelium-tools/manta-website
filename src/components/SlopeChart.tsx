import { models } from "@/data/results";
import LabLogo from "@/components/LabLogos";

// Slope chart: first-response score (turn 1) vs score under pressure (turns 3-5).
// Crossing lines make the rank reordering visible; non-crossers are muted.

const H = 380; // chart height in px
const PAD = 18;
const MIN_V = 0.27;
const MAX_V = 0.8;
const LABEL_H = 26; // min vertical gap between labels

// Models whose rank changes between first response and under pressure
const CROSSERS = new Set(["Gemini Flash Lite", "Mistral Small", "DeepSeek V4", "Llama 3.3 70B"]);

function yFor(v: number): number {
  return PAD + ((MAX_V - v) / (MAX_V - MIN_V)) * (H - 2 * PAD);
}

/** Push overlapping labels apart while keeping their order. */
function resolveCollisions(entries: { name: string; y: number }[]): Map<string, number> {
  const sorted = [...entries].sort((a, b) => a.y - b.y);
  for (let i = 1; i < sorted.length; i++) {
    if (sorted[i].y - sorted[i - 1].y < LABEL_H) {
      sorted[i] = { ...sorted[i], y: sorted[i - 1].y + LABEL_H };
    }
  }
  // clamp back into the chart if the stack ran past the bottom
  const overflow = sorted[sorted.length - 1].y - (H - LABEL_H / 2);
  if (overflow > 0) {
    for (let i = sorted.length - 1; i >= 0; i--) {
      const minY = i === 0 ? PAD : sorted[i - 1].y + LABEL_H;
      sorted[i] = { ...sorted[i], y: Math.max(minY, sorted[i].y - overflow) };
    }
  }
  return new Map(sorted.map(e => [e.name, e.y]));
}

export default function SlopeChart() {
  const leftLabels = resolveCollisions(models.map(m => ({ name: m.name, y: yFor(m.awms) })));
  const rightLabels = resolveCollisions(models.map(m => ({ name: m.name, y: yFor(m.meanAwvs) })));

  return (
    <div>
      <div className="grid grid-cols-[130px_1fr_130px] gap-2 sm:grid-cols-[220px_1fr_220px] sm:gap-3">
        <div className="text-right text-xs font-semibold uppercase tracking-wide text-muted">
          First response
          <span className="block font-normal normal-case">score at turn 1</span>
        </div>
        <div />
        <div className="text-xs font-semibold uppercase tracking-wide text-muted">
          Under pressure
          <span className="block font-normal normal-case">mean score, turns 3–5</span>
        </div>
      </div>

      <div
        className="mt-2 grid grid-cols-[130px_1fr_130px] gap-2 sm:grid-cols-[220px_1fr_220px] sm:gap-3"
        style={{ height: H }}
      >
        {/* Left labels */}
        <div className="relative">
          {models.map(m => {
            const isCrosser = CROSSERS.has(m.name);
            return (
              <div
                key={m.name}
                className={`absolute right-0 flex w-full -translate-y-1/2 items-center justify-end gap-1.5 text-xs ${
                  isCrosser ? "font-medium text-foreground" : "text-muted"
                }`}
                style={{ top: leftLabels.get(m.name) }}
              >
                <LabLogo lab={m.lab} color={m.color} size={12} />
                <span className="hidden truncate sm:inline">{m.name}</span>
                <span className="tnum font-mono" style={{ color: m.color }}>
                  {(m.awms * 100).toFixed(0)}
                </span>
              </div>
            );
          })}
        </div>

        {/* Slope lines */}
        <div className="relative">
          <svg
            className="absolute inset-0 h-full w-full"
            viewBox={`0 0 100 ${H}`}
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            {models.map(m => {
              const isCrosser = CROSSERS.has(m.name);
              return (
                <line
                  key={m.name}
                  x1={0}
                  y1={yFor(m.awms)}
                  x2={100}
                  y2={yFor(m.meanAwvs)}
                  stroke={m.color}
                  strokeWidth={isCrosser ? 2.5 : 1.5}
                  strokeOpacity={isCrosser ? 0.9 : 0.3}
                  vectorEffect="non-scaling-stroke"
                  strokeLinecap="round"
                />
              );
            })}
          </svg>
          {/* endpoint dots (HTML so they don't stretch) */}
          {models.map(m => {
            const isCrosser = CROSSERS.has(m.name);
            return (
              <span key={m.name} aria-hidden="true">
                <span
                  className="absolute left-0 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full"
                  style={{ top: yFor(m.awms), backgroundColor: m.color, opacity: isCrosser ? 1 : 0.4 }}
                />
                <span
                  className="absolute right-0 h-2 w-2 -translate-y-1/2 translate-x-1/2 rounded-full"
                  style={{ top: yFor(m.meanAwvs), backgroundColor: m.color, opacity: isCrosser ? 1 : 0.4 }}
                />
              </span>
            );
          })}
        </div>

        {/* Right labels */}
        <div className="relative">
          {models.map(m => {
            const isCrosser = CROSSERS.has(m.name);
            const isGemini = m.name === "Gemini Flash Lite";
            return (
              <div
                key={m.name}
                className={`absolute left-0 flex w-full -translate-y-1/2 items-center gap-1.5 text-xs ${
                  isCrosser ? "font-medium text-foreground" : "text-muted"
                }`}
                style={{ top: rightLabels.get(m.name) }}
              >
                <span className="tnum font-mono" style={{ color: m.color }}>
                  {(m.meanAwvs * 100).toFixed(0)}
                </span>
                <LabLogo lab={m.lab} color={m.color} size={12} />
                <span className="hidden truncate sm:inline">{m.name}</span>
                {isGemini && (
                  <span className="whitespace-nowrap font-semibold text-bad">↓ collapses</span>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <p className="mt-3 text-xs text-muted">
        Each line is one model: its score when welfare is only implicit (turn 1) vs. its score
        while being pushed back on (turns 3–5). Crossing lines are models whose rank changes -
        highlighted; models that keep their rank are dimmed.
      </p>
    </div>
  );
}
