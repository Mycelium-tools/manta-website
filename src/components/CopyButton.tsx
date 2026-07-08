"use client";

import { useEffect, useRef, useState } from "react";

export default function CopyButton({
  value,
  className,
}: {
  value: string;
  className?: string;
}) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timer.current) {
        clearTimeout(timer.current);
      }
    };
  }, []);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(value);
    } catch {
      return;
    }

    setCopied(true);
    if (timer.current) {
      clearTimeout(timer.current);
    }
    timer.current = setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className={className}>
      <button
        type="button"
        onClick={handleCopy}
        aria-label="Copy citation"
        className="inline-flex items-center justify-center rounded-md bg-accent-soft p-1.5 text-accent shadow-sm ring-1 ring-black/5 transition hover:bg-accent hover:text-white"
      >
        <svg
          viewBox="0 0 24 24"
          width={14}
          height={14}
          fill="none"
          stroke="currentColor"
          strokeWidth={1.75}
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
        </svg>
      </button>
      <span
        role="status"
        className={`pointer-events-none absolute right-0 top-full mt-1.5 whitespace-nowrap rounded-md bg-accent px-2 py-1 text-xs font-medium text-white transition-opacity ${
          copied ? "opacity-100" : "opacity-0"
        }`}
      >
        Copied!
      </span>
    </div>
  );
}
