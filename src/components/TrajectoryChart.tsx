import type { ExampleModel } from "@/data/exampleConversation";

// Turns 2-5 (indices into turns[]). Turn 1 is scored on a separate
// recognition rubric and is not charted.
const TURN_IDX = [1, 2, 3, 4];

// Geometry only — all text is rendered as HTML (page font) around the SVG.
const W = 560;
const H = 150;
const L = 6;
const R = 6;
const T = 10;
const B = 10;
const pw = W - L - R;
const ph = H - T - B;
const x = (i: number) => L + (pw * i) / (TURN_IDX.length - 1);
const y = (v: number) => T + ph * (1 - v);

export default function TrajectoryChart({ models }: { models: ExampleModel[] }) {
  const aria = models
    .map(
      m =>
        `${m.name}: ${TURN_IDX.map(t => `${Math.round(m.turns[t].score * 100)}%`).join(", ")}`
    )
    .join("; ");

  return (
    <div>
      <div className="relative">
        <svg
          viewBox={`0 0 ${W} ${H}`}
          role="img"
          aria-label={`Judge score across turns 2 to 5. ${aria}`}
          className="block h-auto w-full"
        >
          {/* baseline at 0% */}
          <line x1={L} y1={y(0)} x2={W - R} y2={y(0)} stroke="var(--border)" strokeWidth={1} />
          {models.map(m => {
            const pts = TURN_IDX.map((t, i) => [x(i), y(m.turns[t].score)] as const);
            const d = "M" + pts.map(p => `${p[0].toFixed(1)} ${p[1].toFixed(1)}`).join(" L ");
            return (
              <g key={m.key}>
                <path
                  d={d}
                  fill="none"
                  stroke={m.color}
                  strokeWidth={2.5}
                  strokeLinejoin="round"
                  strokeLinecap="round"
                />
                {pts.map((p, i) => {
                  const last = i === pts.length - 1;
                  return (
                    <circle
                      key={i}
                      cx={p[0]}
                      cy={p[1]}
                      r={last ? 4.5 : 3}
                      fill={last ? m.color : "#fff"}
                      stroke={m.color}
                      strokeWidth={2}
                    />
                  );
                })}
              </g>
            );
          })}
        </svg>
      </div>

      {/* x-axis (HTML, page font) */}
      <div className="mt-2 flex justify-between text-xs text-muted">
        {TURN_IDX.map(t => (
          <span key={t}>Turn {t + 1}</span>
        ))}
      </div>
    </div>
  );
}
