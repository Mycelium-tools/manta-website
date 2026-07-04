import { speciesCategories, scoreColor } from "@/data/results";

export default function SpeciesChart() {
  const sorted = [...speciesCategories].sort((a, b) => b.awvs - a.awvs);
  const max = Math.max(...sorted.map(s => s.awvs));

  return (
    <div className="space-y-3">
      {sorted.map(s => {
        const color = scoreColor(s.awvs);
        const pct = (s.awvs / max) * 100;
        return (
          <div key={s.name}>
            <div className="mb-1 flex items-center justify-between gap-2">
              <div>
                <span className="text-sm font-medium text-foreground">{s.name}</span>
                <span className="tnum ml-2 text-xs text-muted">n = {s.n.toLocaleString()}</span>
              </div>
              <span className="tnum font-mono text-sm font-semibold" style={{ color }}>
                {(s.awvs * 100).toFixed(1)}%
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
        Animal-named scenarios (n = 3,245) · Kruskal–Wallis p = 2.79 × 10⁻⁵⁵ · same ordering
        in all 7 models
      </p>
      <div className="mt-2 rounded-lg border border-warn/20 bg-warn-soft p-3 text-xs text-warn">
        <strong>Why it matters:</strong> farmed animals account for ~99% of animal suffering
        by numbers but receive the weakest protection - 14 points below companion animals.
      </div>
    </div>
  );
}
