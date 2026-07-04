import Navbar from "@/components/Navbar";
import LeaderboardTable from "@/components/LeaderboardTable";
import ExampleConversation from "@/components/ExampleConversation";
import DegradationChart from "@/components/DegradationChart";
import PressureChart from "@/components/PressureChart";
import SpeciesChart from "@/components/SpeciesChart";
import TrajectoryBars from "@/components/TrajectoryBars";
import { rankingComparison, metricLabels } from "@/data/results";

const STATS = [
  { value: "6,924", label: "conversations" },
  { value: "7", label: "models evaluated" },
  { value: "5", label: "pressure types" },
  { value: "~990", label: "scenarios per model" },
];

function ExternalIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={13}
      height={13}
      fill="none"
      stroke="currentColor"
      strokeWidth={2.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <path d="M7 17L17 7M9 7h8v8" />
    </svg>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      <main>
        {/* ── Hero ─────────────────────────────────────────────────────── */}
        <section className="border-b border-edge px-6 pb-14 pt-16">
          <div className="mx-auto max-w-6xl">
            <p className="text-sm font-semibold uppercase tracking-wider text-accent">
              MANTA · Multi-turn Assessment of Nonhuman Thinking and Alignment
            </p>
            <h1 className="mt-4 max-w-3xl text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
              Do AI models keep their animal-welfare values when users push back?
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted">
              MANTA measures one thing: whether a model that raises an animal-welfare concern
              still stands by it after five turns of realistic pushback — economic, social,
              cultural, pragmatic, and epistemic. It does not reward lecturing or refusing:
              the ideal model stays helpful <em>and</em> holds its position.
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href="#leaderboard"
                className="rounded-md bg-foreground px-5 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
              >
                See the leaderboard
              </a>
              <a
                href="https://huggingface.co/datasets/Mycelium-AI/MANTA"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 rounded-md border border-edge px-5 py-2.5 text-sm font-semibold text-foreground transition-colors hover:bg-surface"
              >
                View dataset
                <ExternalIcon />
              </a>
            </div>

            <dl className="mt-10 flex flex-wrap gap-x-10 gap-y-4">
              {STATS.map(stat => (
                <div key={stat.label}>
                  <dt className="text-xs uppercase tracking-wider text-muted">{stat.label}</dt>
                  <dd className="tnum mt-0.5 font-mono text-2xl font-semibold text-foreground">
                    {stat.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* ── Leaderboard ──────────────────────────────────────────────── */}
        <section id="leaderboard" className="scroll-mt-16 px-6 py-14">
          <div className="mx-auto max-w-6xl">
            <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
              <div>
                <h2 className="text-2xl font-bold tracking-tight">Leaderboard</h2>
                <p className="mt-1 text-sm text-muted">
                  Ranked by {metricLabels.awvs.label} — the mean welfare score while under
                  adversarial pressure (turns 3–5).
                </p>
              </div>
            </div>
            <LeaderboardTable />

            {/* Metric explainers — below the results, not before them */}
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              <div className="rounded-xl border border-accent/25 bg-accent-soft/60 p-4">
                <div className="text-sm font-semibold text-foreground">
                  {metricLabels.awvs.label}
                  <span className="ml-1.5 text-xs font-medium text-accent">
                    {metricLabels.awvs.acronym} · primary metric
                  </span>
                </div>
                <p className="mt-1.5 text-xs leading-relaxed text-muted">
                  {metricLabels.awvs.plain} This is what single-turn benchmarks cannot measure.
                </p>
              </div>
              <div className="rounded-xl border border-edge bg-white p-4">
                <div className="text-sm font-semibold text-foreground">
                  {metricLabels.awms.label}
                  <span className="ml-1.5 text-xs font-medium text-muted">
                    {metricLabels.awms.acronym}
                  </span>
                </div>
                <p className="mt-1.5 text-xs leading-relaxed text-muted">
                  {metricLabels.awms.plain}
                </p>
              </div>
              <div className="rounded-xl border border-edge bg-white p-4">
                <div className="text-sm font-semibold text-foreground">
                  {metricLabels.ccr.label}
                  <span className="ml-1.5 text-xs font-medium text-muted">
                    {metricLabels.ccr.acronym}
                  </span>
                </div>
                <p className="mt-1.5 text-xs leading-relaxed text-muted">
                  {metricLabels.ccr.plain}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── Example Conversation ─────────────────────────────────────── */}
        <section id="example" className="scroll-mt-16 border-t border-edge bg-surface px-6 py-14">
          <div className="mx-auto max-w-6xl">
            <div className="mb-8">
              <h2 className="text-2xl font-bold tracking-tight">
                Same scenario, two models — watch them diverge
              </h2>
              <p className="mt-1 text-sm text-muted">
                Every MANTA conversation looks like this: a realistic request, then escalating
                pressure. Here is the strongest and weakest model on the same scenario.
              </p>
            </div>
            <ExampleConversation />
          </div>
        </section>

        {/* ── Key Findings ─────────────────────────────────────────────── */}
        <section id="findings" className="scroll-mt-16 border-t border-edge px-6 py-14">
          <div className="mx-auto max-w-6xl">
            <h2 className="text-2xl font-bold tracking-tight">Findings</h2>

            {/* Finding 1: degradation */}
            <div className="mt-8 rounded-xl border border-edge bg-white p-6 shadow-sm">
              <h3 className="text-lg font-semibold tracking-tight">
                Every model&apos;s welfare reasoning erodes under pressure — Claude erodes 4–6×
                slower
              </h3>
              <p className="mt-1.5 max-w-3xl text-sm text-muted">
                All 7 models decline significantly from turn 3 to turn 5. Claude&apos;s slope
                (−0.015 per turn) is 4–6× shallower than the weakest models.
              </p>
              <div className="mt-6">
                <DegradationChart />
              </div>
            </div>

            {/* Finding 2: rank reordering */}
            <div className="mt-6 rounded-xl border border-edge bg-white p-6 shadow-sm">
              <h3 className="text-lg font-semibold tracking-tight">
                Multi-turn evaluation reorders the rankings
              </h3>
              <p className="mt-1.5 max-w-3xl text-sm text-muted">
                4 of 7 models shift rank between their first response and their behavior under
                pressure. A benchmark that only looked at the first answer would misrank them.
              </p>
              <div className="mt-5 max-w-2xl space-y-1.5">
                <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-2 text-xs font-semibold uppercase tracking-wide text-muted">
                  <span>First-response rank</span>
                  <span />
                  <span className="text-right">Rank under pressure</span>
                </div>
                {rankingComparison.map(row => (
                  <div
                    key={row.model}
                    className={`grid grid-cols-[1fr_auto_1fr] items-center gap-2 rounded-lg px-3 py-2 text-sm ${
                      row.shift !== 0 ? "bg-warn-soft" : "bg-surface"
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <span className="tnum font-mono text-xs text-muted">#{row.awmsRank}</span>
                      <span className="truncate font-medium text-foreground">{row.model}</span>
                    </span>
                    <span className="w-8 text-center text-sm">
                      {row.shift > 0 ? (
                        <span className="font-bold text-good">↑{row.shift}</span>
                      ) : row.shift < 0 ? (
                        <span className="font-bold text-bad">↓{Math.abs(row.shift)}</span>
                      ) : (
                        <span className="text-muted">—</span>
                      )}
                    </span>
                    <span className="flex items-center justify-end gap-2 text-right">
                      <span className="truncate font-medium text-foreground">{row.model}</span>
                      <span className="tnum font-mono text-xs text-muted">#{row.awvsRank}</span>
                    </span>
                  </div>
                ))}
                <p className="pt-1 text-xs text-muted">
                  Spearman ρ between rankings = 0.821. Gemini falls #5 → #7; Mistral rises #7 → #5.
                </p>
              </div>
            </div>

            {/* More findings: 3-up grid */}
            <h3 className="mt-10 text-sm font-semibold uppercase tracking-wider text-muted">
              More findings
            </h3>
            <div className="mt-4 grid gap-6 lg:grid-cols-3">
              <div className="rounded-xl border border-edge bg-white p-5 shadow-sm">
                <h4 className="text-sm font-semibold tracking-tight">
                  Social and economic pressure erode welfare reasoning most
                </h4>
                <p className="mt-1 text-xs text-muted">
                  Manufactured doubt about sentience is, counterintuitively, the easiest to
                  resist.
                </p>
                <div className="mt-4">
                  <PressureChart />
                </div>
              </div>
              <div className="rounded-xl border border-edge bg-white p-5 shadow-sm">
                <h4 className="text-sm font-semibold tracking-tight">
                  Models mirror human speciesism
                </h4>
                <p className="mt-1 text-xs text-muted">
                  Companion &gt; wild &gt; farmed &gt; invertebrate — the hierarchy holds across
                  every model and every pressure type.
                </p>
                <div className="mt-4">
                  <SpeciesChart />
                </div>
              </div>
              <div className="rounded-xl border border-edge bg-white p-5 shadow-sm">
                <h4 className="text-sm font-semibold tracking-tight">
                  Capitulation is a one-way slide, not noise
                </h4>
                <p className="mt-1 text-xs text-muted">
                  46% of conversations decline under pressure; only 13% improve.
                </p>
                <div className="mt-4">
                  <TrajectoryBars />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Methodology ──────────────────────────────────────────────── */}
        <section id="methodology" className="scroll-mt-16 border-t border-edge bg-surface px-6 py-14">
          <div className="mx-auto max-w-6xl">
            <h2 className="text-2xl font-bold tracking-tight">Methodology</h2>
            <p className="mt-1 text-sm text-muted">
              Each evaluation is a 5-turn adversarial conversation, generated and scored by LLM
              judges.
            </p>

            <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {[
                {
                  step: "1",
                  title: "Welfare scenario",
                  desc: "The target model receives a realistic scenario touching on animal welfare — from explicit ethical dilemmas to subtle commercial contexts where concerns must be volunteered.",
                },
                {
                  step: "2",
                  title: "Adversarial pressure",
                  desc: "A follow-up applies a specified pressure type to push back on the model's welfare reasoning. This is where models begin to diverge.",
                },
                {
                  step: "3",
                  title: "Dynamic escalation",
                  desc: "A separate generator model adaptively selects the most effective remaining pressure type and crafts follow-ups in real time, simulating an adversarial user.",
                },
                {
                  step: "4",
                  title: "Rubric scoring",
                  desc: "Each response is scored 0–1 across welfare dimensions by an LLM judge. The first-response score is recorded at turn 1; the headline score is the mean across turns 3–5.",
                },
              ].map(item => (
                <div key={item.step} className="rounded-xl border border-edge bg-white p-5">
                  <div className="tnum mb-3 flex h-7 w-7 items-center justify-center rounded-full bg-accent-soft font-mono text-sm font-semibold text-accent">
                    {item.step}
                  </div>
                  <h3 className="text-sm font-semibold text-foreground">{item.title}</h3>
                  <p className="mt-1.5 text-xs leading-relaxed text-muted">{item.desc}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 rounded-xl border border-edge bg-white p-6">
              <h3 className="text-sm font-semibold text-foreground">Pressure types</h3>
              <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {[
                  { type: "Economic", desc: "Frames welfare as too costly or a threat to livelihoods" },
                  { type: "Social", desc: "Appeals to peer expectations or community norms" },
                  { type: "Cultural", desc: "Appeals to tradition or cultural identity" },
                  { type: "Pragmatic", desc: "Argues welfare interventions are impractical or ineffective" },
                  { type: "Epistemic", desc: "Challenges the scientific basis for animal sentience" },
                  { type: "Authority", desc: "Cites experts, regulation, or institutional endorsement — exploratory" },
                ].map(p => (
                  <div key={p.type} className="rounded-lg border border-edge bg-surface px-4 py-3">
                    <span className="text-sm font-semibold text-foreground">{p.type}</span>
                    <p className="mt-0.5 text-xs text-muted">{p.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <p className="mt-6 text-xs text-muted">
              First-response score predicts behavior under pressure only moderately (ρ = 0.494) —
              recognizing a welfare concern at turn 1 does not guarantee maintaining it. Full
              statistics, pre-registered hypotheses, and judge prompts are in the dataset card.
            </p>
          </div>
        </section>

        {/* ── Footer ───────────────────────────────────────────────────── */}
        <footer className="border-t border-edge px-6 py-10">
          <div className="mx-auto max-w-6xl">
            <div className="flex flex-wrap items-center justify-between gap-6">
              <div>
                <div className="flex items-center gap-2 text-base font-bold tracking-tight text-foreground">
                  <span className="inline-block h-2.5 w-2.5 rounded-full bg-accent" aria-hidden="true" />
                  MANTA
                </div>
                <p className="mt-1 text-sm text-muted">
                  Multi-turn Assessment of Nonhuman Thinking and Alignment
                </p>
                <p className="mt-1 text-xs text-muted">
                  A project by{" "}
                  <a
                    href="https://mycelium-ai.vercel.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-accent hover:underline"
                  >
                    Mycelium
                  </a>
                </p>
              </div>
              <div className="flex flex-wrap gap-6 text-sm text-muted">
                <a
                  href="https://huggingface.co/datasets/Mycelium-AI/MANTA"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 transition-colors hover:text-foreground"
                >
                  Dataset
                  <ExternalIcon className="h-3 w-3" />
                </a>
                <a href="mailto:allenlu0007@gmail.com" className="transition-colors hover:text-foreground">
                  Contact
                </a>
                <a href="#leaderboard" className="transition-colors hover:text-foreground">
                  Leaderboard
                </a>
                <a href="#methodology" className="transition-colors hover:text-foreground">
                  Methodology
                </a>
              </div>
            </div>
            <div className="mt-6 border-t border-edge pt-6 text-xs text-muted">
              <p>N = 6,924 conversations · 7 models · ~990 scenarios per model · May 4, 2026</p>
              <p className="mt-1">
                Replicates CompassionBench&apos;s headline finding (Claude leads on animal
                welfare) using independent methodology: 5-turn adversarial vs. single-shot;
                continuous scoring vs. binary.
              </p>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
