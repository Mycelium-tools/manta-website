import Image from "next/image";

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
        src="/mycelium-logo-v3.1.png"
        alt="mycelium"
        width={83}
        height={24}
        className="inline-block h-6 w-auto"
        unoptimized
      />
    </a>
  );
}
