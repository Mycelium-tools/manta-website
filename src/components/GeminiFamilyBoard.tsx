"use client";

import { Fragment, useState } from "react";
import {
  models,
  geminiFamily,
  geminiExtraModels,
  type Model,
} from "@/data/results";
import { ScoreBarCI, ExpandedDetail, ChevronIcon } from "@/components/LeaderboardTable";
import LabLogo from "@/components/LabLogos";

const GEMINI_COLOR = "#4285f4";

function findModel(modelName?: string): Model | undefined {
  if (!modelName) return undefined;
  return (
    models.find(m => m.name === modelName) ??
    geminiExtraModels.find(m => m.name === modelName)
  );
}

/** "would rank #N on the main leaderboard" for a given score */
function mainBoardRank(meanAwvs: number): number {
  return models.filter(m => m.name !== "Gemini Flash Lite" && m.meanAwvs > meanAwvs).length + 1;
}

export default function GeminiFamilyBoard() {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <details className="group/board mt-8">
      <summary className="flex cursor-pointer select-none flex-wrap items-center justify-between gap-3 rounded-md py-1">
        <span className="flex items-center gap-2 text-lg font-semibold tracking-tight text-foreground transition-colors hover:text-accent">
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
            className="shrink-0 transition-transform duration-200 group-open/board:rotate-90"
          >
            <path d="M9 6l6 6-6 6" />
          </svg>
          Newest Runs: Gemini
        </span>
        <span className="shrink-0 rounded-full border border-edge bg-surface px-3 py-1 text-xs font-medium text-muted">
          Last run: July 2026
        </span>
      </summary>
      <p className="mt-1 max-w-3xl pl-6 text-sm text-muted">
        Three Gemini tiers, same protocol and scenario set as the main leaderboard -
        separating raw capability from alignment training choices.
      </p>

      <div className="mt-4 overflow-hidden rounded-xl border border-edge bg-white shadow-sm">
        <div className="divide-y divide-edge">
          {geminiFamily.map(entry => {
            const model = entry.status === "done" ? findModel(entry.modelName) : undefined;
            const isOpen = expanded === entry.name;
            return (
              <Fragment key={entry.name}>
                <div
                  className={`flex flex-wrap items-center gap-x-6 gap-y-2 px-4 py-3.5 ${
                    model ? "cursor-pointer transition-colors hover:bg-surface/70" : ""
                  }`}
                  onClick={model ? () => setExpanded(isOpen ? null : entry.name) : undefined}
                >
                  <div className="flex w-56 shrink-0 items-center gap-2.5">
                    <LabLogo lab="Google" color={GEMINI_COLOR} size={18} />
                    <div>
                      <div className="font-semibold text-foreground">{entry.name}</div>
                      <span className="mt-0.5 inline-block rounded-full bg-surface px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-muted">
                        {entry.tier} tier
                      </span>
                    </div>
                  </div>

                  {model ? (
                    <>
                      <ScoreBarCI model={model} />
                      <span className="text-xs text-muted">
                        would rank #{mainBoardRank(model.meanAwvs)} on the main leaderboard
                      </span>
                      <button
                        type="button"
                        aria-expanded={isOpen}
                        aria-label={`${isOpen ? "Hide" : "Show"} details for ${entry.name}`}
                        className="ml-auto flex cursor-pointer items-center gap-1 whitespace-nowrap rounded-md px-2 py-1.5 text-xs font-medium text-muted transition-colors hover:bg-slate-100 hover:text-foreground focus-visible:outline-2 focus-visible:outline-accent"
                        onClick={e => {
                          e.stopPropagation();
                          setExpanded(isOpen ? null : entry.name);
                        }}
                      >
                        {isOpen ? "Hide details" : "See details"}
                        <ChevronIcon open={isOpen} />
                      </button>
                    </>
                  ) : (
                    <span className="ml-auto flex items-center gap-2 rounded-full bg-awms-soft px-3 py-1 text-xs font-semibold text-awms">
                      <span className="relative flex h-2 w-2">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-awms opacity-60" />
                        <span className="relative inline-flex h-2 w-2 rounded-full bg-awms" />
                      </span>
                      Evaluation in progress
                    </span>
                  )}
                </div>
                {isOpen && model && <ExpandedDetail model={model} />}
              </Fragment>
            );
          })}
        </div>
        <div className="border-t border-edge bg-surface px-4 py-2.5 text-xs text-muted">
          Runs use the original May 2026 question set - directly comparable to the main
          leaderboard above.
        </div>
      </div>
    </details>
  );
}
