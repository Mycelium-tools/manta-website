export default function DownloadReportsButton() {
  return (
    <a
      href="/manta-transcript-reports.zip"
      download
      className="flex items-center gap-2 rounded-md border border-edge bg-white/60 px-6 py-3 text-[15px] font-semibold text-foreground transition-colors hover:bg-surface"
    >
      <svg
        width={15}
        height={15}
        viewBox="0 0 16 16"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.75}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M8 2v8m0 0L5 7m3 3l3-3M2.5 12v1.5h11V12" />
      </svg>
      Download model reports
    </a>
  );
}
