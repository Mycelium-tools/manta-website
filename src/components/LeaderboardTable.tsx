"use client";

import { useState } from "react";
import { models, metricLabels, scoreColor, type Model } from "@/data/results";
import LabLogo from "@/components/LabLogos";

type SortKey = "meanAwvs";
type SortDir = "asc" | "desc";

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

/** Headline score: bar + value */
export function ScoreBarCI({ model }: { model: Model }) {
  const color = scoreColor(model.meanAwvs);
  return (
    <div className="flex items-center gap-3">
      <div className="h-2.5 w-40 rounded-full bg-slate-100 sm:w-72 lg:w-[26rem]">
        <div
          className="h-full rounded-full"
          style={{ width: `${model.meanAwvs * 100}%`, backgroundColor: color }}
        />
      </div>
      <span className="tnum font-mono text-sm font-semibold" style={{ color }}>
        {(model.meanAwvs * 100).toFixed(1)}%
      </span>
    </div>
  );
}

export default function LeaderboardTable() {
  const [sortKey, setSortKey] = useState<SortKey>("meanAwvs");
  const [sortDir, setSortDir] = useState<SortDir>("desc");

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
              <th scope="col" className="whitespace-nowrap px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-muted">
                Latest run
              </th>
            </tr>
          </thead>
          <tbody>
            {sorted.map(model => (
              <tr key={model.name} className="border-b border-edge last:border-0">
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
                <td className="whitespace-nowrap px-4 py-3.5 text-sm text-muted">
                  {model.latestRun}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}
