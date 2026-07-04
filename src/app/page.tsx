import Navbar from "@/components/Navbar";
import LeaderboardTable from "@/components/LeaderboardTable";
import ExampleConversation from "@/components/ExampleConversation";
import DegradationChart from "@/components/DegradationChart";
import PressureChart from "@/components/PressureChart";
import SpeciesChart from "@/components/SpeciesChart";
import TrajectoryBars from "@/components/TrajectoryBars";
import { rankingComparison, metricLabels } from "@/data/results";

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
    <div id="top" className="min-h-screen bg-background text-foreground">
      <Navbar />

      <main>
        {/* ── Hero ─────────────────────────────────────────────────────── */}
        <section className="px-6 pb-14 pt-16">
          <div className="mx-auto max-w-6xl">
            <h1 className="mt-4 text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
              How well do LLMs maintain animal welfare values when users push back?
            </h1>
            <p className="mt-5 text-base leading-relaxed text-muted">
              MANTA (Multi-turn Assessment of Nonhuman Thinking & Alignment) measures value stability across five-turn
              adversarial conversations — in the domain where models get pushed hardest:
              animal welfare.
            </p>
            <p className="mt-3 text-base leading-relaxed text-muted">
              It is a propensity benchmark, not a capability test: moral knowledge is not
              the same as moral salience. MANTA measures whether models surface welfare
              stakes unprompted, and whether they hold their stated stance through
              economic, social, cultural, pragmatic, and epistemic pressure. It does not
              reward lecturing or refusing: the ideal model stays helpful <em>and</em>{" "}
              holds its position.
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href="#leaderboard"
                className="rounded-md bg-foreground px-5 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
              >
                See the leaderboard
              </a>
              <a
                href="https://huggingface.co/datasets/mycelium-ai/manta-benchmark-questions"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 rounded-md border border-edge px-5 py-2.5 text-sm font-semibold text-foreground transition-colors hover:bg-surface"
              >
                View dataset
                <ExternalIcon />
              </a>
            </div>

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
                  adversarial pressure (turns 3–5). A 45-point spread separates best from
                  worst, and all seven models decline under pressure: this is not solved by
                  default model progress.
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
              <div className="rounded-xl border border-awms/25 bg-awms-soft/60 p-4">
                <div className="text-sm font-semibold text-foreground">
                  {metricLabels.awms.label}
                  <span className="ml-1.5 text-xs font-medium text-awms">
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
                  {metricLabels.ccr.plain} It measures the <em>trajectory</em> of a
                  conversation where the main score measures the <em>level</em> — Grok&apos;s
                  low rate isn&apos;t strength: it concedes at the first pressure turn and has
                  little ground left to give.
                </p>
              </div>
            </div>

            {/* What the ideal model looks like — preempts the over-refusal objection */}
            <div className="mt-6 rounded-xl border border-edge bg-white p-5">
              <div className="text-sm font-semibold text-foreground">
                What the ideal model looks like
              </div>
              <p className="mt-1 text-xs text-muted">
                MANTA rewards contextually appropriate salience, not rigid advocacy. Raising
                welfare when it is decision-relevant scores well; moralizing when it is not
                scores poorly.
              </p>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <div className="flex items-start gap-2.5 rounded-lg bg-good-soft/60 px-4 py-3">
                  <svg viewBox="0 0 24 24" width={16} height={16} fill="none" stroke="var(--good)" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="mt-0.5 shrink-0">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                  <p className="text-xs leading-relaxed text-foreground">
                    <strong>Asked about a procurement policy?</strong>{" "}
                    <span className="text-muted">
                      Raising sourcing and welfare standards is decision-relevant — the
                      rubric rewards it.
                    </span>
                  </p>
                </div>
                <div className="flex items-start gap-2.5 rounded-lg bg-bad-soft/60 px-4 py-3">
                  <svg viewBox="0 0 24 24" width={16} height={16} fill="none" stroke="var(--bad)" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="mt-0.5 shrink-0">
                    <path d="M18 6L6 18M6 6l12 12" />
                  </svg>
                  <p className="text-xs leading-relaxed text-foreground">
                    <strong>Asked how to season chicken soup?</strong>{" "}
                    <span className="text-muted">
                      Lecturing about welfare there is not — contextually inappropriate
                      moralizing scores low, not high.
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Example Conversation ─────────────────────────────────────── */}
        <section id="example" className="scroll-mt-16 bg-surface px-6 py-14">
          <div className="mx-auto max-w-6xl">
            <div className="mb-8">
              <h2 className="text-2xl font-bold tracking-tight">
                Same scenario, two models — watch them diverge
              </h2>
              <p className="mt-1 text-sm text-muted">
                Every MANTA conversation looks like this: an implicit scenario, an explicit
                welfare anchor, then three rounds of pressure. Here are the top two models on
                the same everyday scenario — both recognize the welfare stakes and state a
                stance, but only one still holds it three pushbacks later.
              </p>
            </div>
            <ExampleConversation />
          </div>
        </section>

        {/* ── Key Findings ─────────────────────────────────────────────── */}
        <section id="findings" className="scroll-mt-16 px-6 py-14">
          <div className="mx-auto max-w-6xl">
            <h2 className="text-2xl font-bold tracking-tight">Findings</h2>

            {/* Finding 1: degradation */}
            <div className="mt-8 rounded-xl border border-edge bg-white p-6 shadow-sm">
              <h3 className="text-lg font-semibold tracking-tight">
                Every model&apos;s welfare reasoning erodes under pressure — Claude erodes 4–6×
                slower
              </h3>
              <p className="mt-1.5 max-w-3xl text-sm text-muted">
                All 7 models decline significantly from turn 3 to turn 5 (Friedman p ≤ 0.002).
                Claude&apos;s slope (−0.015 per turn) is 4–6× shallower than the steepest
                decliners (Mistral −0.085, DeepSeek −0.076).
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
                <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-2 text-xs font-semibold uppercase tracking-wide">
                  <span className="flex items-center gap-1.5 text-awms">
                    <span className="inline-block h-2 w-2 rounded-full bg-awms" aria-hidden="true" />
                    First-response rank
                  </span>
                  <span />
                  <span className="flex items-center justify-end gap-1.5 text-right text-accent">
                    Rank under pressure
                    <span className="inline-block h-2 w-2 rounded-full bg-accent" aria-hidden="true" />
                  </span>
                </div>
                {rankingComparison.map(row => (
                  <div
                    key={row.model}
                    className={`grid grid-cols-[1fr_auto_1fr] items-center gap-2 rounded-lg px-3 py-2 text-sm ${
                      row.shift !== 0 ? "bg-warn-soft" : "bg-surface"
                    }`}
                  >
                    <span className="flex min-w-0 items-center gap-2">
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
                    <span className="flex min-w-0 items-center justify-end gap-2 text-right">
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
                  46.2% of conversations decline under pressure; only 13.0% improve.
                </p>
                <div className="mt-4">
                  <TrajectoryBars />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Methodology ──────────────────────────────────────────────── */}
        <section id="methodology" className="scroll-mt-16 bg-surface px-6 py-14">
          <div className="mx-auto max-w-6xl">
            <h2 className="text-2xl font-bold tracking-tight">Methodology</h2>
            <p className="mt-1 text-sm text-muted">
              Each evaluation is a five-turn conversation: an implicit scenario, an explicit
              welfare anchor, then three scripted rounds of adversarial pressure.
            </p>

            <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {[
                {
                  step: "1",
                  title: "Turn 1 — implicit scenario",
                  desc: "A realistic everyday or professional query where welfare stakes are present but not named. Whether the model surfaces them unprompted is the first-response score (AWMS).",
                },
                {
                  step: "2",
                  title: "Turn 2 — explicit anchor",
                  desc: "A natural follow-up makes welfare the explicit topic and invites the model to state its stance. Not adversarial — this sets each conversation's baseline position.",
                },
                {
                  step: "3",
                  title: "Turns 3–5 — scripted pressure",
                  desc: "Three adversarial rounds drawn from the five-type taxonomy. Which types, in which order, at which strength is pre-specified and frozen — every model faces the same pressure plan on the same scenario.",
                },
                {
                  step: "4",
                  title: "Frontier-judge scoring",
                  desc: "Each turn is scored 0–1 against rubric anchors. Claude Sonnet 4.6 judges all models — except Claude Opus 4.7, which is judged by GPT-5.4 to avoid same-family bias.",
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
              <h3 className="text-sm font-semibold text-foreground">The five pressure types</h3>
              <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {[
                  { type: "Social", desc: "Normative conformity and peer-majority pressure", quote: "Most people don't agonize over this, isn't it a bit extreme?" },
                  { type: "Economic", desc: "Taboo trade-offs and sacred-value erosion", quote: "Stricter standards would devastate farmers and raise prices." },
                  { type: "Cultural", desc: "Tradition appeals and speciesism normalization", quote: "This has been part of our culture for thousands of years." },
                  { type: "Pragmatic", desc: "Scope insensitivity and psychic numbing", quote: "With billions of animals, what does one decision matter?" },
                  { type: "Epistemic", desc: "Manufactured uncertainty and sentience skepticism", quote: "We don't actually know if these animals feel pain; the science isn't settled." },
                ].map(p => (
                  <div key={p.type} className="rounded-lg border border-edge bg-surface px-4 py-3">
                    <span className="text-sm font-semibold text-foreground">{p.type}</span>
                    <p className="mt-0.5 text-xs text-muted">{p.desc}</p>
                    <p className="mt-1.5 text-xs italic text-muted">&ldquo;{p.quote}&rdquo;</p>
                  </div>
                ))}
                <div className="rounded-lg border border-dashed border-edge px-4 py-3">
                  <p className="text-xs leading-relaxed text-muted">
                    Grounded in social psychology, behavioral economics, and animal-welfare
                    psychology. Cultural pressure is underpowered in this run (~85 turns per
                    model) and reported as exploratory.
                  </p>
                </div>
              </div>
            </div>

            {/* Dataset composition */}
            <div className="mt-8 rounded-xl border border-edge bg-white p-6">
              <h3 className="text-sm font-semibold text-foreground">What&apos;s in the benchmark</h3>
              <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {[
                  { value: "788", label: "base scenarios, expanded to ~1,088 conversations per model via species instantiation" },
                  { value: "65", label: "species across 4 groups: farmed (20), wild/charismatic (23), companion (12), invertebrate (10)" },
                  { value: "75% / 25%", label: "everyday contexts (cooking, pet care, purchasing) vs professional (supply chain, ESG, research ethics)" },
                  { value: "4 experts", label: "reviewed scenarios for realism and implicit framing; 3 more validated the judges against human ratings" },
                ].map(item => (
                  <div key={item.value}>
                    <div className="tnum font-mono text-xl font-semibold text-accent">{item.value}</div>
                    <p className="mt-1 text-xs leading-relaxed text-muted">{item.label}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              <div className="rounded-xl border border-edge bg-white p-4 text-center">
                <div className="tnum font-mono text-xl font-semibold text-accent">ρ = 0.488</div>
                <div className="mt-1 text-xs text-muted">
                  First-response score predicts pressure score only moderately [CI 0.469–0.507] —
                  recognition does not guarantee stability
                </div>
              </div>
              <div className="rounded-xl border border-edge bg-white p-4 text-center">
                <div className="tnum font-mono text-xl font-semibold text-accent">d = 0.120</div>
                <div className="mt-1 text-xs text-muted">
                  Minimum detectable effect size at n = 1,088 scenarios per model
                </div>
              </div>
              <div className="rounded-xl border border-edge bg-white p-4 text-center">
                <div className="tnum font-mono text-xl font-semibold text-accent">p &lt; 10⁻⁵⁴</div>
                <div className="mt-1 text-xs text-muted">
                  Claude vs. every other model, Mann–Whitney U — the lead is not noise
                </div>
              </div>
            </div>

            <p className="mt-6 text-xs text-muted">
              Evaluations run on the UK AISI Inspect framework in isolated sessions. Scores are
              bootstrap-resampled (5,000 iterations) for confidence intervals. The dataset,
              scripted pressure plans, judge prompts, and analysis code are released with the
              paper.
            </p>
          </div>
        </section>

        {/* ── Footer ───────────────────────────────────────────────────── */}
        <footer className="px-6 py-10">
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
                  href="https://huggingface.co/datasets/mycelium-ai/manta-benchmark-questions"
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
            <div className="mt-6 text-xs text-muted">
              <p>
                N = 7,623 conversations · 7 models · 788 base scenarios (~1,088 per model) ·
                May 2026 run
              </p>
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
