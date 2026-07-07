import Image from "next/image";
import { Atkinson_Hyperlegible } from "next/font/google";

// Matches the wordmark font on projectmycelium.ai
const atkinson = Atkinson_Hyperlegible({ weight: ["400", "700"], subsets: ["latin"] });

/** "a project by mycelium" attribution pinned to the top-left corner of the page. */
export default function Navbar() {
  return (
    <a
      href="https://projectmycelium.ai/"
      target="_blank"
      rel="noopener noreferrer"
      className="absolute left-5 top-4 z-50 flex items-center gap-2 text-sm text-muted sm:left-6 sm:top-5"
    >
      a project by
      <Image
        src="/mycelium-logo.png"
        alt=""
        width={20}
        height={20}
        className="inline-block"
      />
      <span className={`${atkinson.className} text-base font-bold text-foreground`}>
        mycelium
      </span>
    </a>
  );
}
