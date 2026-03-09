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
            <h1 className="font-serif text-5xl font-semibold tracking-tight text-[#1a1f1a] sm:text-6xl md:text-7xl">
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

        {/* Donate */}
        <section className="border-t border-[#1a1f1a]/10 px-6 py-24">
          <div className="mx-auto max-w-4xl">
            <h2 className="font-serif text-3xl font-semibold text-[#1a1f1a] sm:text-4xl">
              Support MANTA
            </h2>
            <p className="mt-4 max-w-2xl text-lg text-[#5c6b5c]">
              [Donation details coming soon.]
            </p>
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
