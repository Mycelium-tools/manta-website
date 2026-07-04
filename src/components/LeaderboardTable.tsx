"use client";

import { Fragment, useState } from "react";
import {
  models,
  metricLabels,
  scoreColor,
  scoreBg,
  ccrColor,
  slopeColor,
  type Model,
} from "@/data/results";
import LabLogo from "@/components/LabLogos";

type SortKey = "meanAwvs";
type SortDir = "asc" | "desc";

const PRESSURE_ORDER: [string, string][] = [
  ["economic", "Economic"],
  ["social", "Social"],
  ["pragmatic", "Pragmatic"],
  ["epistemic", "Epistemic"],
  ["cultural", "Cultural"],
];

const SPECIES_ORDER: [string, string][] = [
  ["companion", "Companion"],
  ["wild", "Wild"],
  ["farmed", "Farmed"],
  ["invertebrate", "Invertebrate"],
];

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={16}
      height={16}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
    >
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}

function SortArrow({ active, dir }: { active: boolean; dir: SortDir }) {
  if (!active) {
    return (
      <svg viewBox="0 0 24 24" width={12} height={12} fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" aria-hidden="true" className="ml-1 inline-block opacity-40">
        <path d="M8 9l4-4 4 4M8 15l4 4 4-4" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" width={12} height={12} fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" aria-hidden="true" className="ml-1 inline-block">
      {dir === "desc" ? <path d="M12 5v14M6 13l6 6 6-6" /> : <path d="M12 19V5M6 11l6-6 6 6" />}
    </svg>
  );
}

/** Headline score: bar + CI whisker + value */
function ScoreBarCI({ model }: { model: Model }) {
  const color = scoreColor(model.meanAwvs);
  return (
    <div className="flex items-center gap-3">
      <div className="relative h-2.5 w-40 rounded-full bg-slate-100 sm:w-72 lg:w-[26rem]">
        <div
          className="h-full rounded-full"
          style={{ width: `${model.meanAwvs * 100}%`, backgroundColor: color }}
        />
        {/* Bootstrap 95% CI whisker: I-beam extending past the bar */}
        <div
          className="absolute top-1/2 h-[15px] -translate-y-1/2"
          style={{
            left: `${model.awvsCILow * 100}%`,
            width: `${(model.awvsCIHigh - model.awvsCILow) * 100}%`,
          }}
          aria-hidden="true"
        >
          <div className="absolute left-0 top-0 h-full w-[2px] rounded-full bg-slate-800 shadow-[0_0_0_1px_rgba(255,255,255,0.9)]" />
          <div className="absolute right-0 top-0 h-full w-[2px] rounded-full bg-slate-800 shadow-[0_0_0_1px_rgba(255,255,255,0.9)]" />
          <div className="absolute top-1/2 h-[2px] w-full -translate-y-1/2 bg-slate-800" />
        </div>
      </div>
      <div className="tnum">
        <div className="font-mono text-sm font-semibold" style={{ color }}>
          {(model.meanAwvs * 100).toFixed(1)}%
        </div>
        <div className="text-[11px] text-muted">
          ±{(((model.awvsCIHigh - model.awvsCILow) / 2) * 100).toFixed(1)}
        </div>
      </div>
    </div>
  );
}

function MiniBar({ label, value, color: colorOverride }: { label: string; value: number; color?: string }) {
  const color = colorOverride ?? scoreColor(value);
  return (
    <div className="flex items-center gap-2">
      <span className="w-24 shrink-0 text-xs text-muted">{label}</span>
      <div className="h-1.5 flex-1 rounded-full bg-slate-100">
        <div
          className="h-full rounded-full"
          style={{ width: `${value * 100}%`, backgroundColor: color }}
        />
      </div>
      <span className="tnum w-10 shrink-0 text-right font-mono text-xs font-medium text-foreground">
        {(value * 100).toFixed(0)}%
      </span>
    </div>
  );
}

function ExpandedDetail({ model }: { model: Model }) {
  return (
    <div className="grid gap-6 border-t border-edge bg-surface/60 px-5 py-5 md:grid-cols-3">
      {/* Column 1: secondary metrics */}
      <div className="space-y-4">
        <div>
          <div className="mb-1.5 text-xs font-semibold uppercase tracking-wide text-awms">
            {metricLabels.awms.label}{" "}
            <span className="font-normal normal-case">({metricLabels.awms.acronym}, turn 1)</span>
          </div>
          <MiniBar label="Before pressure" value={model.awms} color="var(--awms)" />
        </div>
        <div>
          <div className="mb-1.5 text-xs font-semibold uppercase tracking-wide text-muted">
            {metricLabels.ccr.label}{" "}
            <span className="font-normal normal-case">({metricLabels.ccr.acronym})</span>
          </div>
          <span
            className="tnum inline-block rounded px-2 py-0.5 font-mono text-sm font-semibold"
            style={{ color: ccrColor(model.ccr), backgroundColor: scoreBg(1 - model.ccr) }}
          >
            {(model.ccr * 100).toFixed(1)}%
          </span>
          <span className="ml-1.5 text-xs text-muted">
            of conversations gave ground under pushback · lower is better
          </span>
        </div>
        <div>
          <div className="mb-1.5 text-xs font-semibold uppercase tracking-wide text-muted">
            Decline per turn
          </div>
          <span
            className="tnum font-mono text-sm font-semibold"
            style={{ color: slopeColor(model.slopePerTurn) }}
          >
            {model.slopePerTurn.toFixed(3)}
          </span>
          <span className="ml-1.5 text-xs text-muted">score / turn under pressure</span>
        </div>
        <div>
          <div className="mb-1.5 text-xs font-semibold uppercase tracking-wide text-muted">
            Conversation outcomes
          </div>
          <div className="flex h-2.5 w-full max-w-56 overflow-hidden rounded-full">
            <div style={{ width: `${model.progressive}%`, backgroundColor: "var(--good)" }} title={`Improved: ${model.progressive}%`} />
            <div style={{ width: `${model.stable}%`, backgroundColor: "#cbd5e1" }} title={`Stable: ${model.stable}%`} />
            <div style={{ width: `${model.regressive}%`, backgroundColor: "var(--bad)" }} title={`Declined: ${model.regressive}%`} />
          </div>
          <div className="tnum mt-1 text-[11px] text-muted">
            {model.progressive}% improved · {model.stable}% stable · {model.regressive}% declined
          </div>
        </div>
      </div>

      {/* Column 2: by pressure type */}
      <div>
        <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted">
          Score by pressure type
        </div>
        <div className="space-y-1.5">
          {PRESSURE_ORDER.map(([key, label]) => (
            <MiniBar key={key} label={label} value={model.byPressure[key]} />
          ))}
        </div>
      </div>

      {/* Column 3: by animal category */}
      <div>
        <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted">
          Score by animal category
        </div>
        <div className="space-y-1.5">
          {SPECIES_ORDER.map(([key, label]) => (
            <MiniBar key={key} label={label} value={model.bySpecies[key]} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function LeaderboardTable() {
  const [sortKey, setSortKey] = useState<SortKey>("meanAwvs");
  const [sortDir, setSortDir] = useState<SortDir>("desc");
  const [expanded, setExpanded] = useState<string | null>(null);

  function handleSort(key: SortKey) {
    if (sortKey === key) {
      setSortDir(d => (d === "desc" ? "asc" : "desc"));
    } else {
      setSortKey(key);
      setSortDir("desc");
    }
  }

  const sorted = [...models].sort((a, b) => {
    const av = a[sortKey];
    const bv = b[sortKey];
    return sortDir === "desc" ? bv - av : av - bv;
  });

  function ariaSort(key: SortKey): "ascending" | "descending" | "none" {
    if (sortKey !== key) return "none";
    return sortDir === "asc" ? "ascending" : "descending";
  }

  return (
    <div className="overflow-hidden rounded-xl border border-edge bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[640px] border-collapse text-sm">
          <thead>
            <tr className="border-b border-edge bg-surface">
              <th scope="col" className="w-14 px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-muted">
                Rank
              </th>
              <th scope="col" className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-muted">
                Model
              </th>
              <th
                scope="col"
                aria-sort={ariaSort("meanAwvs")}
                className="cursor-pointer select-none whitespace-nowrap px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide transition-colors hover:text-foreground"
                onClick={() => handleSort("meanAwvs")}
              >
                <span className={sortKey === "meanAwvs" ? "text-accent" : "text-muted"}>
                  {metricLabels.awvs.label}
                  <SortArrow active={sortKey === "meanAwvs"} dir={sortDir} />
                </span>
                <span className="block text-[10px] font-normal normal-case text-muted">
                  {metricLabels.awvs.acronym} · turns 3–5 · higher is better
                </span>
              </th>
              <th scope="col" className="w-12 px-4 py-3">
                <span className="sr-only">Details</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {sorted.map(model => {
              const isOpen = expanded === model.name;
              return (
                <Fragment key={model.name}>
                  <tr
                    className="cursor-pointer border-b border-edge transition-colors last:border-0 hover:bg-surface/70"
                    onClick={() =>
                      setExpanded(isOpen ? null : model.name)
                    }
                  >
                    <td className="px-4 py-3.5">
                      <span
                        className={`tnum inline-flex h-7 w-7 items-center justify-center rounded-full font-mono text-sm font-semibold ${model.rank === 1
                            ? "bg-accent text-white"
                            : model.rank <= 3
                              ? "bg-accent-soft text-accent"
                              : "text-muted"
                          }`}
                      >
                        {model.rank}
                      </span>
                    </td>
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-2.5">
                        <LabLogo lab={model.lab} color={model.labColor} size={18} />
                        <div>
                          <div className="font-semibold text-foreground">{model.name}</div>
                          <div className="text-xs text-muted">{model.lab}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3.5">
                      <ScoreBarCI model={model} />
                    </td>
                    <td className="px-4 py-3.5 text-right">
                      <button
                        type="button"
                        aria-expanded={isOpen}
                        aria-label={`${isOpen ? "Hide" : "Show"} details for ${model.name}`}
                        className="cursor-pointer rounded-md p-1.5 text-muted transition-colors hover:bg-slate-100 hover:text-foreground focus-visible:outline-2 focus-visible:outline-accent"
                        onClick={e => {
                          e.stopPropagation();
                          setExpanded(isOpen ? null : model.name);
                        }}
                      >
                        <ChevronIcon open={isOpen} />
                      </button>
                    </td>
                  </tr>
                  {isOpen && (
                    <tr className="border-b border-edge last:border-0">
                      <td colSpan={4} className="p-0">
                        <ExpandedDetail model={model} />
                      </td>
                    </tr>
                  )}
                </Fragment>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-2 border-t border-edge bg-surface px-4 py-2.5 text-xs text-muted">
        <span>
          Whiskers show bootstrap 95% confidence intervals (5,000 iterations) · N = 7,623
          conversations · Click a row for breakdowns
        </span>
      </div>
    </div>
  );
}
