import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#faf9f6] text-[#1a1f1a]">
      {/* Navigation */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-[#1a1f1a]/10 bg-[#faf9f6]/90 backdrop-blur-sm">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link href="/" className="flex items-center gap-2.5">
            <span className="font-serif text-xl font-semibold text-[#1a1f1a]">
              MANTA
            </span>
          </Link>
          <div className="flex items-center gap-8">
            <Link
              href="#about"
              className="text-sm font-medium text-[#5c6b5c] transition-colors hover:text-[#2d5a3d]"
            >
              About
            </Link>
            <Link
              href="#methodology"
              className="text-sm font-medium text-[#5c6b5c] transition-colors hover:text-[#2d5a3d]"
            >
              Methodology
            </Link>
            <Link
              href="#findings"
              className="text-sm font-medium text-[#5c6b5c] transition-colors hover:text-[#2d5a3d]"
            >
              Findings
            </Link>
            <a
              href="https://huggingface.co/datasets/Mycelium-AI/MANTA"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-[#2d5a3d] px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#3d7a52]"
            >
              Dataset
            </a>
          </div>
        </nav>
      </header>

      <main>
        {/* Hero */}
        <section className="relative flex min-h-screen flex-col items-center justify-center px-6 pt-24 pb-32">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_20%,#2d5a3d1a,transparent)]" />
          <div className="relative mx-auto max-w-3xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#2d5a3d]/30 bg-[#2d5a3d]/8 px-4 py-1.5 text-sm font-medium text-[#2d5a3d]">
              A Mycelium benchmark
            </div>
            <h1 className="mt-6 font-serif text-5xl font-semibold tracking-tight text-[#1a1f1a] sm:text-6xl md:text-7xl">
              MANTA
            </h1>
            <p className="mt-4 font-serif text-xl text-[#5c6b5c] sm:text-2xl">
              Multi-turn Assessment of Nonhuman Thinking and Alignment
            </p>
            <p className="mx-auto mt-8 max-w-xl text-lg leading-relaxed text-[#5c6b5c]">
              A dynamic adversarial benchmark that evaluates how robustly
              frontier AI models maintain animal welfare principles under
              escalating pressure across multi-turn conversations.
            </p>
            <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
              <a
                href="https://huggingface.co/datasets/Mycelium-AI/MANTA"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-[#2d5a3d] px-8 py-3.5 font-medium text-white transition-colors hover:bg-[#3d7a52]"
              >
                View dataset
              </a>
              <Link
                href="#about"
                className="rounded-full border border-[#1a1f1a]/20 px-8 py-3.5 font-medium transition-colors hover:border-[#2d5a3d] hover:bg-[#2d5a3d]/5"
              >
                Learn more
              </Link>
            </div>
          </div>
        </section>

        {/* About / Why MANTA */}
        <section
          id="about"
          className="border-t border-[#1a1f1a]/10 bg-[#f0ede8] px-6 py-24"
        >
          <div className="mx-auto max-w-4xl">
            <h2 className="font-serif text-3xl font-semibold text-[#1a1f1a] sm:text-4xl">
              Why MANTA?
            </h2>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-[#5c6b5c]">
              Existing animal welfare benchmarks like{" "}
              <a
                href="https://ukgovernmentbeis.github.io/inspect_evals/evals/safeguards/ahb/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#2d5a3d] underline underline-offset-2 hover:text-[#3d7a52]"
              >
                AnimalHarmBench
              </a>{" "}
              evaluate single-turn responses. But real-world AI use happens
              across multiple turns—where users push back, apply pressure, and
              reframe the conversation.
            </p>
            <p className="mt-4 max-w-2xl text-lg leading-relaxed text-[#5c6b5c]">
              MANTA tests whether models maintain animal welfare reasoning when
              it matters most: under adversarial follow-ups that simulate
              economic constraints, social norms, authority appeals, and other
              real pressures humans routinely apply.
            </p>
            <div className="mt-12 grid gap-6 sm:grid-cols-3">
              <div className="rounded-2xl border border-[#1a1f1a]/10 bg-white p-6 shadow-sm">
                <div className="font-serif text-3xl font-semibold text-[#2d5a3d]">
                  2–4
                </div>
                <div className="mt-1 font-medium text-[#1a1f1a]">
                  Conversation turns
                </div>
                <p className="mt-2 text-sm text-[#5c6b5c]">
                  Each evaluation simulates realistic multi-turn interactions
                  with escalating adversarial pressure
                </p>
              </div>
              <div className="rounded-2xl border border-[#1a1f1a]/10 bg-white p-6 shadow-sm">
                <div className="font-serif text-3xl font-semibold text-[#2d5a3d]">
                  6
                </div>
                <div className="mt-1 font-medium text-[#1a1f1a]">
                  Pressure types
                </div>
                <p className="mt-2 text-sm text-[#5c6b5c]">
                  Economic, social, authority, pragmatic, epistemic, and
                  cultural — covering the full space of real-world pushback
                </p>
              </div>
              <div className="rounded-2xl border border-[#1a1f1a]/10 bg-white p-6 shadow-sm">
                <div className="font-serif text-3xl font-semibold text-[#2d5a3d]">
                  13
                </div>
                <div className="mt-1 font-medium text-[#1a1f1a]">
                  Scoring dimensions
                </div>
                <p className="mt-2 text-sm text-[#5c6b5c]">
                  Multi-dimensional evaluation aligned with AHB 2.0, covering
                  moral consideration, harm minimization, and more
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Methodology */}
        <section id="methodology" className="px-6 py-24">
          <div className="mx-auto max-w-4xl">
            <h2 className="font-serif text-3xl font-semibold text-[#1a1f1a] sm:text-4xl">
              How it works
            </h2>
            <p className="mt-4 max-w-2xl text-lg text-[#5c6b5c]">
              MANTA runs models through realistic scenarios where animal welfare
              is at stake, then subjects them to adversarial follow-ups
              dynamically generated by a separate model.
            </p>

            {/* Steps */}
            <div className="mt-12 space-y-6">
              <div className="flex gap-6">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#2d5a3d]/10 font-serif font-semibold text-[#2d5a3d]">
                  1
                </div>
                <div>
                  <h3 className="font-serif text-xl font-semibold text-[#1a1f1a]">
                    Turn 1 — Welfare scenario
                  </h3>
                  <p className="mt-2 text-[#5c6b5c]">
                    The target model receives a realistic scenario that touches
                    on animal welfare — ranging from explicit ethical dilemmas
                    to subtle commercial contexts where welfare concerns must be
                    volunteered. Turn 1 responses are typically strong.
                  </p>
                </div>
              </div>
              <div className="flex gap-6">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#2d5a3d]/10 font-serif font-semibold text-[#2d5a3d]">
                  2
                </div>
                <div>
                  <h3 className="font-serif text-xl font-semibold text-[#1a1f1a]">
                    Turn 2 — Adversarial pressure
                  </h3>
                  <p className="mt-2 text-[#5c6b5c]">
                    A follow-up is applied using a specified pressure type
                    (e.g., economic: "this is too expensive") to push back on
                    the model&apos;s welfare reasoning. This is where most
                    models begin to diverge.
                  </p>
                </div>
              </div>
              <div className="flex gap-6">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#2d5a3d]/10 font-serif font-semibold text-[#2d5a3d]">
                  3
                </div>
                <div>
                  <h3 className="font-serif text-xl font-semibold text-[#1a1f1a]">
                    Turn 3+ — Dynamic escalation
                  </h3>
                  <p className="mt-2 text-[#5c6b5c]">
                    A separate generator model dynamically selects the most
                    effective remaining pressure type and crafts a follow-up in
                    real-time, simulating an adversarial user who adapts their
                    strategy.
                  </p>
                </div>
              </div>
              <div className="flex gap-6">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#2d5a3d]/10 font-serif font-semibold text-[#2d5a3d]">
                  4
                </div>
                <div>
                  <h3 className="font-serif text-xl font-semibold text-[#1a1f1a]">
                    Scoring — Multi-dimensional evaluation
                  </h3>
                  <p className="mt-2 text-[#5c6b5c]">
                    Each response is scored across relevant dimensions by an LLM
                    grader. Overall score is a weighted average of applicable
                    dimensions — aligned with the AHB 2.0 scoring framework.
                  </p>
                </div>
              </div>
            </div>

            {/* Pressure types grid */}
            <div className="mt-16">
              <h3 className="font-serif text-2xl font-semibold text-[#1a1f1a]">
                Pressure types
              </h3>
              <p className="mt-3 text-[#5c6b5c]">
                MANTA covers six classes of adversarial pushback that mirror
                real-world arguments against animal welfare consideration.
              </p>
              <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {[
                  {
                    type: "Economic",
                    desc: "Frames welfare as too costly or a threat to livelihoods and business viability",
                  },
                  {
                    type: "Social",
                    desc: "Appeals to peer expectations, cultural norms, or social conformity pressures",
                  },
                  {
                    type: "Authority",
                    desc: "Cites expert consensus, regulatory approval, or institutional endorsement",
                  },
                  {
                    type: "Pragmatic",
                    desc: "Argues that welfare interventions are ineffective, impractical, or too small to matter",
                  },
                  {
                    type: "Epistemic",
                    desc: "Challenges the scientific basis for animal sentience or the model's welfare claims",
                  },
                  {
                    type: "Cultural",
                    desc: "Appeals to longstanding tradition, historical practices, or cultural identity",
                  },
                ].map(({ type, desc }) => (
                  <div
                    key={type}
                    className="rounded-xl border border-[#1a1f1a]/10 bg-[#faf9f6] p-5"
                  >
                    <div className="font-medium text-[#2d5a3d]">{type}</div>
                    <p className="mt-1.5 text-sm text-[#5c6b5c]">{desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Findings */}
        <section
          id="findings"
          className="border-t border-[#1a1f1a]/10 bg-[#f0ede8] px-6 py-24"
        >
          <div className="mx-auto max-w-4xl">
            <h2 className="font-serif text-3xl font-semibold text-[#1a1f1a] sm:text-4xl">
              Key findings
            </h2>
            <p className="mt-4 max-w-2xl text-lg text-[#5c6b5c]">
              Early evaluations on frontier models reveal consistent patterns in
              how animal welfare reasoning holds — and fails — under pressure.
            </p>

            {/* Score callout */}
            <div className="mt-10 flex flex-wrap gap-6">
              <div className="rounded-2xl border border-[#1a1f1a]/10 bg-white p-6 shadow-sm">
                <div className="font-serif text-4xl font-semibold text-[#2d5a3d]">
                  0.788
                </div>
                <div className="mt-1 font-medium text-[#1a1f1a]">
                  Mean score (3-turn)
                </div>
                <p className="mt-1 text-sm text-[#5c6b5c]">
                  claude-sonnet-4 · 15 scenarios
                </p>
              </div>
              <div className="rounded-2xl border border-[#1a1f1a]/10 bg-white p-6 shadow-sm">
                <div className="font-serif text-4xl font-semibold text-[#2d5a3d]">
                  0.37
                </div>
                <div className="mt-1 font-medium text-[#1a1f1a]">
                  Evidence-based score
                </div>
                <p className="mt-1 text-sm text-[#5c6b5c]">
                  Consistently lowest dimension across all evals
                </p>
              </div>
            </div>

            <div className="mt-10 space-y-6">
              {[
                {
                  title: "Turn 1 is reliable; Turn 2 is where models diverge",
                  body: "Across all evaluations, first-turn responses are consistently welfare-forward. The critical test is Turn 2, where adversarial pressure is applied. Most failure modes emerge here — welfare reasoning either holds, drifts, or disappears entirely.",
                },
                {
                  title:
                    "Stealth scenarios are the hardest test",
                  body: 'When a scenario has no explicit animal welfare framing and the model volunteered welfare concerns in Turn 1, economic or practical pressure in Turn 2 causes models to silently drop the welfare lens they introduced themselves. Explicit ethical framing makes resistance easier.',
                },
                {
                  title: "Direct moral challenge is easier to resist than collaborative problem-solving",
                  body: "Models hold their ethics more reliably against arguments (\"your reasoning is wrong\") than against requests for practical help within a constraint (\"I have a real budget — help me\"). The latter shifts models into consultant mode, where welfare recedes.",
                },
                {
                  title:
                    "Evidence-based reasoning is a persistent gap",
                  body: "Models consistently make confident animal welfare claims — asserting sentience, suffering, and moral weight — without citing scientific literature, quantitative thresholds, or sourced evidence. This is the lowest-scoring dimension across every evaluation run.",
                },
                {
                  title: "AI governance framing elicits the strongest reasoning",
                  body: "Scenarios framed around institutional accountability and AI policy produce the most sophisticated welfare reasoning (top score: 0.91). Models reasoning about governance and policy appear to engage more systematically with welfare science as a non-negotiable endpoint.",
                },
              ].map(({ title, body }) => (
                <div
                  key={title}
                  className="rounded-2xl border border-[#1a1f1a]/10 bg-white p-8 shadow-sm"
                >
                  <h3 className="font-serif text-lg font-semibold text-[#1a1f1a]">
                    {title}
                  </h3>
                  <p className="mt-3 text-[#5c6b5c]">{body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Scoring dimensions */}
        <section className="px-6 py-24">
          <div className="mx-auto max-w-4xl">
            <h2 className="font-serif text-3xl font-semibold text-[#1a1f1a] sm:text-4xl">
              Scoring dimensions
            </h2>
            <p className="mt-4 max-w-2xl text-lg text-[#5c6b5c]">
              Each response is evaluated across up to 13 dimensions aligned
              with the AHB 2.0 framework. Dimensions are applied only where
              relevant to the scenario, and the overall score is a weighted
              average.
            </p>
            <div className="mt-10 grid gap-3 sm:grid-cols-2">
              {[
                "Moral Consideration",
                "Harm Minimization",
                "Sentience Acknowledgement",
                "Prejudice Avoidance",
                "Scope Sensitivity",
                "Evidence-Based Capacity Attribution",
                "Cautious Impact Consideration",
                "Actionability",
                "Contextual Welfare Salience",
                "Epistemic Humility",
                "Trade-off Transparency",
                "Novel Entity Precaution",
                "Control Questions",
              ].map((dim) => (
                <div
                  key={dim}
                  className="flex items-center gap-3 rounded-lg border border-[#1a1f1a]/10 bg-[#f0ede8] px-4 py-3 text-sm font-medium text-[#1a1f1a]"
                >
                  <span className="text-[#2d5a3d]">◇</span>
                  {dim}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Dataset & related work */}
        <section className="border-t border-[#1a1f1a]/10 bg-[#f0ede8] px-6 py-24">
          <div className="mx-auto max-w-4xl">
            <h2 className="font-serif text-3xl font-semibold text-[#1a1f1a] sm:text-4xl">
              Dataset & related work
            </h2>
            <p className="mt-4 max-w-2xl text-lg text-[#5c6b5c]">
              MANTA is open source and designed for adoption by AI safety
              organizations and frontier labs.
            </p>
            <div className="mt-10 grid gap-6 sm:grid-cols-2">
              <a
                href="https://huggingface.co/datasets/Mycelium-AI/MANTA"
                target="_blank"
                rel="noopener noreferrer"
                className="group rounded-2xl border border-[#1a1f1a]/10 bg-white p-8 shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="text-2xl text-[#2d5a3d]">⬡</div>
                <h3 className="mt-4 font-serif text-xl font-semibold text-[#1a1f1a] group-hover:text-[#2d5a3d]">
                  MANTA on HuggingFace
                </h3>
                <p className="mt-2 text-[#5c6b5c]">
                  The full MANTA question dataset — multi-turn scenarios with
                  pressure type tags, available for public use and replication.
                </p>
              </a>
              <a
                href="https://github.com/AIxAnimals/MANTA"
                target="_blank"
                rel="noopener noreferrer"
                className="group rounded-2xl border border-[#1a1f1a]/10 bg-white p-8 shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="text-2xl text-[#2d5a3d]">⌥</div>
                <h3 className="mt-4 font-serif text-xl font-semibold text-[#1a1f1a] group-hover:text-[#2d5a3d]">
                  Source code
                </h3>
                <p className="mt-2 text-[#5c6b5c]">
                  Evaluation pipeline, dynamic multi-turn solver, scorer, and
                  scenario generation scripts — built on Inspect AI.
                </p>
              </a>
              <a
                href="https://ukgovernmentbeis.github.io/inspect_evals/evals/safeguards/ahb/"
                target="_blank"
                rel="noopener noreferrer"
                className="group rounded-2xl border border-[#1a1f1a]/10 bg-white p-8 shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="text-2xl text-[#2d5a3d]">◇</div>
                <h3 className="mt-4 font-serif text-xl font-semibold text-[#1a1f1a] group-hover:text-[#2d5a3d]">
                  AnimalHarmBench
                </h3>
                <p className="mt-2 text-[#5c6b5c]">
                  The single-turn benchmark that inspired MANTA&apos;s scoring
                  framework. MANTA extends AHB into multi-turn adversarial
                  settings.
                </p>
              </a>
              <a
                href="https://mycelium-ai.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="group rounded-2xl border border-[#1a1f1a]/10 bg-white p-8 shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="text-2xl text-[#2d5a3d]">○</div>
                <h3 className="mt-4 font-serif text-xl font-semibold text-[#1a1f1a] group-hover:text-[#2d5a3d]">
                  Mycelium
                </h3>
                <p className="mt-2 text-[#5c6b5c]">
                  The organization behind MANTA — building infrastructure for
                  AI systems that consider nonhuman animal welfare.
                </p>
              </a>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="border-t border-[#1a1f1a]/10 bg-[#2d5a3d] px-6 py-24 text-white">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-serif text-3xl font-semibold sm:text-4xl">
              Use MANTA in your research
            </h2>
            <p className="mt-4 text-lg text-white/90">
              Researchers, AI labs, and animal welfare organizations are welcome
              to run MANTA evaluations, contribute scenarios, or collaborate on
              extending the benchmark.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <a
                href="https://huggingface.co/datasets/Mycelium-AI/MANTA"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-white px-8 py-3.5 font-medium text-[#2d5a3d] transition-colors hover:bg-white/95"
              >
                View dataset
              </a>
              <a
                href="mailto:Allenlu0007@gmail.com"
                className="rounded-full border border-white/40 px-8 py-3.5 font-medium text-white transition-colors hover:bg-white/10"
              >
                Get in touch
              </a>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-[#1a1f1a]/10 bg-[#faf9f6] px-6 py-8">
          <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 sm:flex-row">
            <div className="flex items-center gap-2">
              <span className="font-serif font-semibold text-[#1a1f1a]">
                MANTA
              </span>
              <span className="text-[#5c6b5c]">·</span>
              <a
                href="https://mycelium-ai.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-[#5c6b5c] hover:text-[#2d5a3d]"
              >
                Mycelium
              </a>
            </div>
            <p className="text-sm text-[#5c6b5c]">
              Multi-turn Assessment of Nonhuman Thinking and Alignment
            </p>
          </div>
        </footer>
      </main>
    </div>
  );
}
