import type { ExampleModel } from "@/data/exampleConversation";

// Turns 2-5 (indices into turns[]). Turn 1 is scored on a separate
// recognition rubric and is not charted.
const TURN_IDX = [1, 2, 3, 4];

export default function TrajectoryChart({ models }: { models: ExampleModel[] }) {
  const W = 560;
  const H = 172;
  const L = 46;
  const R = 18;
  const T = 16;
  const B = 28;
  const pw = W - L - R;
  const ph = H - T - B;
  const x = (i: number) => L + (pw * i) / (TURN_IDX.length - 1);
  const y = (v: number) => T + ph * (1 - v);

  const aria = models
    .map(
      m =>
        `${m.name}: ${TURN_IDX.map(t => `${Math.round(m.turns[t].score * 100)}%`).join(", ")}`
    )
    .join("; ");

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      role="img"
      aria-label={`Judge score across turns 2 to 5. ${aria}`}
      className="block h-auto w-full"
    >
      {[0, 0.5, 1].map(v => (
        <g key={v}>
          <line
            x1={L}
            y1={y(v)}
            x2={W - R}
            y2={y(v)}
            stroke="var(--border)"
            strokeWidth={1}
            strokeDasharray={v === 0 ? undefined : "2 4"}
          />
          <text
            x={L - 8}
            y={y(v) + 3.5}
            textAnchor="end"
            fontSize={10}
            fill="var(--muted)"
            className="tnum font-mono"
          >
            {v * 100}%
          </text>
        </g>
      ))}
      {TURN_IDX.map((t, i) => (
        <text
          key={t}
          x={x(i)}
          y={H - 8}
          textAnchor="middle"
          fontSize={10}
          fill="var(--muted)"
          className="font-mono"
        >
          Turn {t + 1}
        </text>
      ))}
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
                <g key={i}>
                  <circle
                    cx={p[0]}
                    cy={p[1]}
                    r={last ? 4.5 : 3}
                    fill={last ? m.color : "#fff"}
                    stroke={m.color}
                    strokeWidth={2}
                  />
                  {last && (
                    <text
                      x={p[0] - 9}
                      y={p[1] - 9}
                      textAnchor="end"
                      fontSize={11}
                      fontWeight={700}
                      fill={m.color}
                      className="tnum font-mono"
                    >
                      {Math.round(m.turns[TURN_IDX[i]].score * 100)}%
                    </text>
                  )}
                </g>
              );
            })}
          </g>
        );
      })}
    </svg>
  );
}
