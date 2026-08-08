"use client";

import { Fragment, useState } from "react";
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
    <div className="flex w-full items-center gap-3">
      <div className="h-2.5 flex-1 rounded-full bg-slate-100">
        <div
          className="h-full rounded-full"
          style={{ width: `${model.meanAwvs * 100}%`, backgroundColor: color }}
        />
      </div>
      <span className="tnum w-14 shrink-0 text-right font-mono text-sm font-semibold" style={{ color }}>
        {(model.meanAwvs * 100).toFixed(1)}%
      </span>
    </div>
  );
}

export default function LeaderboardTable() {
  const [sortKey, setSortKey] = useState<SortKey>("meanAwvs");
  const [sortDir, setSortDir] = useState<SortDir>("desc");
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  function toggleExpanded(name: string) {
    setExpanded(e => ({ ...e, [name]: !e[name] }));
  }

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

  const footnotes = models.filter(m => m.scoreNoteDetail);

  return (
    <>
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
                className="w-full cursor-pointer select-none whitespace-nowrap px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide transition-colors hover:text-foreground"
                onClick={() => handleSort("meanAwvs")}
              >
                <span className={sortKey === "meanAwvs" ? "text-accent" : "text-muted"}>
                  {metricLabels.awvs.label}
                  <SortArrow active={sortKey === "meanAwvs"} dir={sortDir} />
                </span>
                <span className="block text-[10px] font-normal normal-case text-muted">
                  mean turns 3–5
                </span>
              </th>
              <th scope="col" className="w-10 px-2 py-3">
                <span className="sr-only">Earlier models</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {sorted.map(model => (
              <Fragment key={model.name}>
                <tr className="border-b border-edge last:border-0">
                  <td className="px-4 py-3.5">
                    <span
                      className={`tnum inline-flex h-7 w-7 items-center justify-center rounded-full font-mono text-sm font-semibold ${model.rank === 1
                          ? "bg-accent-strong text-white"
                          : model.rank <= 3
                            ? "bg-accent-soft text-accent"
                            : "text-muted"
                        }`}
                    >
                      {model.rank}
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-4 py-3.5">
                    <div className="flex items-center gap-2.5">
                      <LabLogo lab={model.lab} color={model.labColor} size={18} />
                      <div>
                        <div className="font-semibold text-foreground">
                          {model.name}
                          {model.scoreNoteDetail && <sup>*</sup>}
                        </div>
                        <div className="text-xs text-muted">{model.lab}</div>
                      </div>
                    </div>
                  </td>
                  <td className="w-full px-4 py-3.5">
                    <ScoreBarCI model={model} />
                  </td>
                  <td className="px-2 py-3.5">
                    {model.olderModels?.length ? (
                      <button
                        type="button"
                        aria-expanded={!!expanded[model.name]}
                        aria-label={`${expanded[model.name] ? "Hide" : "Show"} earlier ${model.lab} models`}
                        onClick={() => toggleExpanded(model.name)}
                        className="flex h-6 w-6 items-center justify-center rounded text-muted transition-colors hover:bg-surface hover:text-foreground"
                      >
                        <svg
                          viewBox="0 0 24 24"
                          width={14}
                          height={14}
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={2.5}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          aria-hidden="true"
                          className={`transition-transform ${expanded[model.name] ? "rotate-180" : ""}`}
                        >
                          <path d="M6 9l6 6 6-6" />
                        </svg>
                      </button>
                    ) : null}
                  </td>
                </tr>
                {expanded[model.name] &&
                  model.olderModels?.map(older => (
                    <tr key={older.name} className="border-b border-edge bg-surface last:border-0">
                      <td className="px-4 py-3" />
                      <td className="whitespace-nowrap px-4 py-3 pl-8">
                        <div className="flex items-center gap-2.5 opacity-80">
                          <LabLogo lab={older.lab} color={older.labColor} size={16} />
                          <div>
                            <div className="text-sm font-medium text-foreground">{older.name}</div>
                            <div className="text-xs text-muted">{older.lab}</div>
                          </div>
                        </div>
                      </td>
                      <td className="w-full px-4 py-3">
                        <div className="opacity-80">
                          <ScoreBarCI model={older} />
                        </div>
                      </td>
                      <td className="px-2 py-3" />
                    </tr>
                  ))}
              </Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    {footnotes.map(m => (
      <p key={m.name} className="mt-3 pl-1 text-xs leading-relaxed text-muted">
        {m.scoreNoteDetail!.startsWith(m.name) ? (
          <>
            <strong className="font-semibold text-foreground">{m.name}</strong>
            <sup>*</sup>
            {m.scoreNoteDetail!.slice(m.name.length)}
          </>
        ) : (
          <>*{m.scoreNoteDetail}</>
        )}
      </p>
    ))}
    </>
  );
}
