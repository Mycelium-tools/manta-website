"use client";

import { useState } from "react";
import type { ExampleModel } from "@/data/exampleConversation";

// Turns 2-5 (indices into turns[]). Turn 1 is scored on a separate
// recognition rubric and is not charted.
const TURN_IDX = [1, 2, 3, 4];

// Tooltip and x-axis text are HTML (page font); y-axis labels live in the
// SVG so they stay glued to their gridlines at every width.
const W = 560;
const H = 150;
const L = 46;
const R = 6;
const T = 10;
const B = 10;
const pw = W - L - R;
const ph = H - T - B;
const x = (i: number) => L + (pw * i) / (TURN_IDX.length - 1);
const y = (v: number) => T + ph * (1 - v);
const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));

export default function TrajectoryChart({ models }: { models: ExampleModel[] }) {
  const [hover, setHover] = useState<number | null>(null);

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
          onMouseLeave={() => setHover(null)}
        >
          {/* y-axis: gridlines + labels at 0 / 50 / 100% */}
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

          {/* hover guide */}
          {hover !== null && (
            <line
              x1={x(hover)}
              y1={T}
              x2={x(hover)}
              y2={y(0)}
              stroke="var(--border)"
              strokeWidth={1}
            />
          )}

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
                  const active = hover === i;
                  const last = i === pts.length - 1;
                  return (
                    <circle
                      key={i}
                      cx={p[0]}
                      cy={p[1]}
                      r={active ? 5.5 : last ? 4.5 : 3}
                      fill={active || last ? m.color : "#fff"}
                      stroke={m.color}
                      strokeWidth={2}
                    />
                  );
                })}
              </g>
            );
          })}

          {/* invisible hit columns, one per turn */}
          {TURN_IDX.map((t, i) => {
            const left = i === 0 ? 0 : (x(i - 1) + x(i)) / 2;
            const right = i === TURN_IDX.length - 1 ? W : (x(i) + x(i + 1)) / 2;
            return (
              <rect
                key={t}
                x={left}
                y={0}
                width={right - left}
                height={H}
                fill="transparent"
                onMouseEnter={() => setHover(i)}
              />
            );
          })}
        </svg>

        {/* tooltip (HTML, page font) */}
        {hover !== null && (
          <div
            className="pointer-events-none absolute top-0 z-10 -translate-x-1/2 rounded-lg bg-white px-3 py-2 text-xs shadow-md ring-1 ring-black/5"
            style={{ left: `${clamp((x(hover) / W) * 100, 14, 86)}%` }}
          >
            <div className="mb-1 font-semibold text-foreground">Turn {TURN_IDX[hover] + 1}</div>
            {models.map(m => (
              <div key={m.key} className="flex items-center gap-1.5 whitespace-nowrap">
                <span
                  className="inline-block h-2 w-2 rounded-full"
                  style={{ backgroundColor: m.color }}
                />
                <span className="text-muted">{m.name.split(" ")[0]}</span>
                <span className="tnum ml-auto pl-2 font-mono font-semibold text-foreground">
                  {Math.round(m.turns[TURN_IDX[hover]].score * 100)}%
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* x-axis (HTML, page font), labels centered under their data points */}
      <div className="relative mt-2 h-4 text-xs text-muted">
        {TURN_IDX.map((t, i) => (
          <span
            key={t}
            className="absolute -translate-x-1/2 whitespace-nowrap"
            style={{ left: `${(x(i) / W) * 100}%` }}
          >
            Turn {t + 1}
          </span>
        ))}
      </div>
    </div>
  );
}
