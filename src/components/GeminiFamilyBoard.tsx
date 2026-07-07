"use client";

import {
  models,
  geminiFamily,
  geminiExtraModels,
  type Model,
} from "@/data/results";
import { ScoreBarCI } from "@/components/LeaderboardTable";
import LabLogo from "@/components/LabLogos";

const GEMINI_COLOR = "#4285f4";

function findModel(modelName?: string): Model | undefined {
  if (!modelName) return undefined;
  return (
    models.find(m => m.name === modelName) ??
    geminiExtraModels.find(m => m.name === modelName)
  );
}

export default function GeminiFamilyBoard() {
  const entries = [...geminiFamily].sort((a, b) => {
    const am = findModel(a.modelName)?.meanAwvs ?? -1;
    const bm = findModel(b.modelName)?.meanAwvs ?? -1;
    return bm - am;
  });

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
          Latest Runs: Gemini
          <LabLogo lab="Google" color={GEMINI_COLOR} size={18} />
        </span>
        <span className="shrink-0 rounded-full border border-edge bg-surface px-3 py-1 text-xs font-medium text-muted">
          Last run: July 2026
        </span>
      </summary>
      <p className="mt-1 max-w-3xl pl-6 text-sm text-muted">
        Three Gemini tiers, same protocol and scenario set as the main leaderboard
      </p>

      <div className="mt-4 overflow-hidden rounded-xl border border-edge bg-white shadow-sm">
        <div className="divide-y divide-edge">
          {entries.map((entry, i) => {
            const model = entry.status === "done" ? findModel(entry.modelName) : undefined;
            return (
              <div
                key={entry.name}
                className="flex flex-wrap items-center gap-x-6 gap-y-2 px-4 py-3.5"
              >
                <span
                  className={`tnum inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full font-mono text-sm font-semibold ${
                    i === 0 ? "bg-accent text-white" : "bg-accent-soft text-accent"
                  }`}
                >
                  {i + 1}
                </span>
                <div className="flex w-56 shrink-0 items-center gap-2.5">
                  <LabLogo lab="Google" color={GEMINI_COLOR} size={18} />
                  <div className="font-semibold text-foreground">{entry.name}</div>
                </div>

                {model ? (
                  <ScoreBarCI model={model} />
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
