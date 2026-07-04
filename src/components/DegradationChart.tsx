"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { models } from "@/data/results";
import LabLogo from "@/components/LabLogos";

const EMPHASIZED = "Claude Opus 4.7";

const chartData = [
  { turn: "Turn 3", ...Object.fromEntries(models.map(m => [m.name, m.awvsT3])) },
  { turn: "Turn 4", ...Object.fromEntries(models.map(m => [m.name, m.awvsT4])) },
  { turn: "Turn 5", ...Object.fromEntries(models.map(m => [m.name, m.awvsT5])) },
];

const byFinalScore = [...models].sort((a, b) => b.awvsT5 - a.awvsT5);

function CustomTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: { name: string; value: number; color: string }[];
  label?: string;
}) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-lg border border-edge bg-white p-3 text-sm shadow-lg">
      <p className="mb-2 font-semibold text-foreground">{label}</p>
      {[...payload]
        .sort((a, b) => b.value - a.value)
        .map(entry => (
          <div key={entry.name} className="flex items-center justify-between gap-4">
            <span className="flex items-center gap-1.5">
              <span
                className="inline-block h-2 w-2 rounded-full"
                style={{ backgroundColor: entry.color }}
              />
              <span className="text-muted">{entry.name}</span>
            </span>
            <span className="tnum font-mono font-medium text-foreground">
              {(entry.value * 100).toFixed(1)}%
            </span>
          </div>
        ))}
    </div>
  );
}

export default function DegradationChart() {
  return (
    <div className="flex flex-col gap-4 sm:flex-row">
      <div className="min-w-0 flex-1">
        <div className="mb-1 text-xs text-muted">Welfare score (higher = better)</div>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData} margin={{ top: 8, right: 16, left: 0, bottom: 8 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#0f172a" strokeOpacity={0.06} />
            <XAxis
              dataKey="turn"
              tick={{ fill: "#475569", fontSize: 13 }}
              axisLine={{ stroke: "#0f172a", strokeOpacity: 0.1 }}
              tickLine={false}
            />
            <YAxis
              domain={[0, 1]}
              tickFormatter={v => `${(v * 100).toFixed(0)}%`}
              tick={{ fill: "#475569", fontSize: 12 }}
              axisLine={false}
              tickLine={false}
              width={44}
            />
            <Tooltip content={<CustomTooltip />} />
            {models.map(model => {
              const isHero = model.name === EMPHASIZED;
              return (
                <Line
                  key={model.name}
                  type="monotone"
                  dataKey={model.name}
                  stroke={model.color}
                  strokeWidth={isHero ? 3 : 1.5}
                  strokeOpacity={isHero ? 1 : 0.35}
                  dot={{ r: isHero ? 4 : 3, fill: model.color, strokeWidth: 0, fillOpacity: isHero ? 1 : 0.35 }}
                  activeDot={{ r: 5, strokeWidth: 0 }}
                />
              );
            })}
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Direct-labeled rail replaces a detached legend */}
      <div className="flex shrink-0 flex-col justify-center gap-1.5 sm:w-52">
        {byFinalScore.map(model => {
          const isHero = model.name === EMPHASIZED;
          return (
            <div
              key={model.name}
              className={`flex items-center gap-2 rounded-md px-2 py-1 text-xs ${
                isHero ? "bg-surface font-semibold text-foreground" : "text-muted"
              }`}
            >
              <LabLogo lab={model.lab} color={model.color} size={13} />
              <span className="truncate">{model.name}</span>
              <span className="tnum ml-auto font-mono" style={{ color: model.color }}>
                {(model.awvsT5 * 100).toFixed(0)}%
              </span>
            </div>
          );
        })}
        <div className="mt-1 px-2 text-[11px] text-muted">Score at turn 5</div>
      </div>
    </div>
  );
}
