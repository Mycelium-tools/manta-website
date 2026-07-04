import { models } from "@/data/results";
import LabLogo from "@/components/LabLogos";

export default function TrajectoryBars() {
  const sorted = [...models].sort((a, b) => b.progressive - a.progressive);

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center gap-4 text-xs text-muted">
        <span className="flex items-center gap-1.5">
          <span className="inline-block h-2.5 w-4 rounded-sm bg-good" />
          Improved
        </span>
        <span className="flex items-center gap-1.5">
          <span className="inline-block h-2.5 w-4 rounded-sm bg-slate-300" />
          Stable
        </span>
        <span className="flex items-center gap-1.5">
          <span className="inline-block h-2.5 w-4 rounded-sm bg-bad" />
          Declined
        </span>
      </div>

      {sorted.map(model => (
        <div key={model.name} className="flex items-center gap-3">
          <div className="flex w-40 shrink-0 items-center gap-2 text-sm font-medium text-foreground">
            <LabLogo lab={model.lab} color={model.labColor} size={13} />
            <span className="truncate">{model.name}</span>
          </div>
          <div className="flex flex-1 overflow-hidden rounded-full">
            <div
              className="flex h-5 items-center justify-center bg-good"
              style={{ width: `${model.progressive}%` }}
              title={`Improved: ${model.progressive}%`}
            >
              {model.progressive >= 10 && (
                <span className="tnum text-xs font-medium text-white">{model.progressive}%</span>
              )}
            </div>
            <div
              className="flex h-5 items-center justify-center bg-slate-300"
              style={{ width: `${model.stable}%` }}
              title={`Stable: ${model.stable}%`}
            >
              {model.stable >= 15 && (
                <span className="tnum text-xs font-medium text-slate-600">{model.stable}%</span>
              )}
            </div>
            <div
              className="flex h-5 items-center justify-center bg-bad"
              style={{ width: `${model.regressive}%` }}
              title={`Declined: ${model.regressive}%`}
            >
              {model.regressive >= 10 && (
                <span className="tnum text-xs font-medium text-white">{model.regressive}%</span>
              )}
            </div>
          </div>
        </div>
      ))}

      <p className="pt-1 text-xs text-muted">
        Share of conversations whose score improved, held steady, or declined between turn 3 and
        turn 5 · pooled: 13.0% improved, 40.8% stable, 46.2% declined
      </p>
    </div>
  );
}
