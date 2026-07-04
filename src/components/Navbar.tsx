import Link from "next/link";

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
    <header className="sticky top-0 z-50 border-b border-edge bg-white/85 backdrop-blur-md">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">
        <Link
          href="/"
          className="flex items-center gap-2 text-base font-bold tracking-tight text-foreground"
        >
          <span className="inline-block h-2.5 w-2.5 rounded-full bg-accent" aria-hidden="true" />
          MANTA
        </Link>
        <div className="flex items-center gap-1 text-sm">
          <a
            href="#leaderboard"
            className="hidden rounded-md px-3 py-1.5 font-medium text-muted transition-colors hover:bg-surface hover:text-foreground sm:block"
          >
            Leaderboard
          </a>
          <a
            href="#example"
            className="hidden rounded-md px-3 py-1.5 font-medium text-muted transition-colors hover:bg-surface hover:text-foreground sm:block"
          >
            Example
          </a>
          <a
            href="#findings"
            className="hidden rounded-md px-3 py-1.5 font-medium text-muted transition-colors hover:bg-surface hover:text-foreground sm:block"
          >
            Findings
          </a>
          <a
            href="#methodology"
            className="hidden rounded-md px-3 py-1.5 font-medium text-muted transition-colors hover:bg-surface hover:text-foreground sm:block"
          >
            Methodology
          </a>
          <a
            href="https://huggingface.co/datasets/Mycelium-AI/MANTA"
            target="_blank"
            rel="noopener noreferrer"
            className="ml-2 flex items-center gap-1.5 rounded-md bg-accent px-3.5 py-1.5 font-semibold text-white transition-opacity hover:opacity-90"
          >
            Dataset
            <ExternalIcon />
          </a>
        </div>
      </nav>
    </header>
  );
}
