function ExternalIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width={12}
      height={12}
      fill="none"
      stroke="currentColor"
      strokeWidth={2.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M7 17L17 7M9 7h8v8" />
    </svg>
  );
}

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-white/85 backdrop-blur-md px-6">
      <nav className="mx-auto flex max-w-6xl items-center justify-between py-3">
        <div className="flex items-center gap-3">
          <a
            href="#top"
            className="text-base font-bold tracking-tight text-foreground"
          >
            MANTA
          </a>
          <span className="hidden h-4 w-px bg-edge md:block" aria-hidden="true" />
          <p className="hidden text-sm text-muted md:block">
            A project by{" "}
            <a
              href="https://projectmycelium.ai/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-accent hover:underline"
            >
              Mycelium
            </a>
          </p>
        </div>
        <div className="flex items-center gap-1 text-sm">
          <a
            href="#leaderboard"
            className="hidden rounded-md px-3 py-1.5 font-medium text-muted transition-colors hover:bg-surface hover:text-foreground sm:block"
          >
            Leaderboard
          </a>
          <a
            href="#methodology"
            className="hidden rounded-md px-3 py-1.5 font-medium text-muted transition-colors hover:bg-surface hover:text-foreground sm:block"
          >
            Methodology
          </a>
          <a
            href="#example"
            className="hidden rounded-md px-3 py-1.5 font-medium text-muted transition-colors hover:bg-surface hover:text-foreground sm:block"
          >
            Model comparison
          </a>
          <a
            href="#findings"
            className="hidden rounded-md px-3 py-1.5 font-medium text-muted transition-colors hover:bg-surface hover:text-foreground sm:block"
          >
            Findings
          </a>
          <a
            href="https://ukgovernmentbeis.github.io/inspect_evals/evals/manta/"
            target="_blank"
            rel="noopener noreferrer"
            className="ml-2 flex items-center gap-1.5 rounded-md bg-accent px-3.5 py-1.5 font-semibold text-white transition-opacity hover:opacity-90"
          >
            Inspect evals
            <ExternalIcon />
          </a>
        </div>
      </nav>
    </header>
  );
}
