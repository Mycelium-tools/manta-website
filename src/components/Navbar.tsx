import Image from "next/image";
import { Atkinson_Hyperlegible } from "next/font/google";

// Matches the wordmark font on projectmycelium.ai
const atkinson = Atkinson_Hyperlegible({ weight: ["400", "700"], subsets: ["latin"] });

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
          <a
            href="https://projectmycelium.ai/"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden items-center gap-1.5 text-sm text-muted md:flex"
          >
            a project by
            <Image
              src="/mycelium-logo.png"
              alt=""
              width={18}
              height={18}
              className="inline-block"
            />
            <span className={`${atkinson.className} font-bold text-foreground`}>
              Mycelium
            </span>
          </a>
        </div>
      </nav>
    </header>
  );
}
