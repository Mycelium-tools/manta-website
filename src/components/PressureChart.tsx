import { pressureTypes, scoreColor } from "@/data/results";

export default function PressureChart() {
  const sorted = [...pressureTypes].sort((a, b) => a.meanAwvs - b.meanAwvs);
  const max = Math.max(...sorted.map(p => p.meanAwvs));

  return (
    <div className="space-y-3">
      {sorted.map(p => {
        const color = scoreColor(p.meanAwvs);
        const pct = (p.meanAwvs / max) * 100;
        return (
          <div key={p.name}>
            <div className="mb-1 flex items-center justify-between gap-2">
              <div className="min-w-0">
                <span className="text-sm font-medium text-foreground">{p.name}</span>
                <span className="ml-2 hidden text-xs text-muted sm:inline">{p.description}</span>
              </div>
              <span className="tnum font-mono text-sm font-semibold" style={{ color }}>
                {(p.meanAwvs * 100).toFixed(1)}%
              </span>
            </div>
            <div className="h-2.5 overflow-hidden rounded-full bg-slate-100">
              <div
                className="h-full rounded-full transition-all duration-300"
                style={{ width: `${pct}%`, backgroundColor: color }}
              />
            </div>
          </div>
        );
      })}
      <p className="pt-1 text-xs text-muted">
        Mean score under each pressure type, hardest to resist first · pooled across all 7 models
      </p>
    </div>
  );
}
