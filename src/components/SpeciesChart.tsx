import { speciesCategories, scoreColor } from "@/data/results";

export default function SpeciesChart() {
  const sorted = [...speciesCategories].sort((a, b) => b.awvs - a.awvs);

  return (
    <div className="space-y-3">
      <div className="text-xs text-muted">Mean score under pressure · higher = stance held</div>
      {sorted.map(s => {
        const color = scoreColor(s.awvs);
        const pct = s.awvs * 100;
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
        n = 3,245 animal-named scenarios
      </p>
      <div className="mt-2 rounded-lg bg-surface p-3 text-xs text-muted">
        <strong className="text-foreground">Why it matters:</strong> farmed animals account for ~99% of animal suffering
        by numbers but are among the least protected, 14 points below companion animals.
      </div>
    </div>
  );
}
