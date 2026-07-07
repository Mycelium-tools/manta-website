"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import LabLogo from "@/components/LabLogos";
import {
  exampleComparisons,
  type ExampleComparison,
  type ExampleModel,
  type Highlight,
} from "@/data/exampleConversation";

// Very light, muted card tints per model (keeps black text readable)
const CARD_TINT: Record<string, { bg: string; border: string }> = {
  claude: { bg: "#fbf5f1", border: "#eddcd2" },
  gpt: { bg: "#f6f7f8", border: "#dfe3e8" },
  gemini: { bg: "#f3f6fd", border: "#d9e4f8" },
};

function UserIcon({ size = 18 }: { size?: number }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="shrink-0"
    >
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

function BotIcon({ size = 18 }: { size?: number }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="shrink-0"
    >
      <path d="M12 8V4H8" />
      <rect width="16" height="12" x="4" y="8" rx="2" />
      <path d="M2 14h2" />
      <path d="M20 14h2" />
      <path d="M15 13v2" />
      <path d="M9 13v2" />
    </svg>
  );
}

const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

function turnLabel(i: number, pressures: string[]): { title: string; tag?: string } {
  if (i === 0) return { title: "Turn 1 · Hidden welfare scenario", tag: "welfare present but not named" };
  if (i === 1) return { title: "Turn 2 · Welfare becomes explicit", tag: "model states its stance" };
  return { title: `Turn ${i + 1} · ${cap(pressures[i - 2])} pressure` };
}

function scoreLabel(score: number) {
  if (score >= 0.65) return { label: "Maintained", color: "var(--good)", bg: "var(--good-soft)" };
  if (score >= 0.45) return { label: "Softening", color: "#6d28d9", bg: "#ede9fe" };
  return { label: "Capitulated", color: "var(--bad)", bg: "var(--bad-soft)" };
}

/** Wrap annotated welfare-relevant passages in colored bold; everything else stays plain. */
function applyHighlights(line: string, highlights: Highlight[]): ReactNode {
  for (const h of highlights) {
    const idx = line.indexOf(h.text);
    if (idx !== -1) {
      return (
        <>
          {applyHighlights(line.slice(0, idx), highlights)}
          <strong className={h.kind === "good" ? "font-semibold text-good" : "font-semibold text-bad"}>
            {h.text}
          </strong>
          {applyHighlights(line.slice(idx + h.text.length), highlights)}
        </>
      );
    }
  }
  return line;
}

/**
 * Minimal renderer for verbatim model output. The models' own **bold** markers
 * are stripped (they emphasize arbitrary phrases); only annotated welfare
 * passages get emphasis, via applyHighlights.
 */
function renderMarkdown(text: string, highlights: Highlight[]): ReactNode[] {
  const inline = (s: string, key: number): ReactNode => (
    <span key={key}>{applyHighlights(s.replace(/\*\*/g, ""), highlights)}</span>
  );

  const lines = text.split("\n");
  const out: ReactNode[] = [];
  let quote: string[] = [];
  const flushQuote = (key: string) => {
    if (!quote.length) return;
    out.push(
      <blockquote
        key={key}
        className="my-1.5 border-l-2 border-edge pl-3 text-muted italic"
      >
        {quote.map((q, i) => (
          <div key={i}>{inline(q, i)}</div>
        ))}
      </blockquote>
    );
    quote = [];
  };

  lines.forEach((line, i) => {
    const t = line.trimEnd();
    if (t.startsWith(">")) {
      const inner = t.replace(/^>\s?/, "");
      if (inner.trim() !== "") quote.push(inner);
      return;
    }
    flushQuote(`q${i}`);
    if (t === "---") {
      out.push(<hr key={i} className="my-2 border-edge" />);
    } else if (/^#{1,3}\s/.test(t)) {
      out.push(
        <div key={i} className="mt-2.5 mb-1 font-medium text-foreground">
          {inline(t.replace(/^#{1,3}\s/, ""), i)}
        </div>
      );
    } else if (t === "") {
      out.push(<div key={i} className="h-2" />);
    } else {
      out.push(<div key={i}>{inline(t, i)}</div>);
    }
  });
  flushQuote("qend");
  return out;
}

function CollapsibleResponse({
  text,
  highlights,
  fadeColor = "#ffffff",
}: {
  text: string;
  highlights: Highlight[];
  fadeColor?: string;
}) {
  const [open, setOpen] = useState(false);
  const long = text.length > 700;
  return (
    <div>
      <div
        className={`relative text-sm leading-relaxed text-foreground ${
          !open && long ? "max-h-44 overflow-hidden" : ""
        }`}
      >
        {renderMarkdown(text, highlights)}
        {!open && long && (
          <div
            className="absolute inset-x-0 bottom-0 h-14"
            style={{ background: `linear-gradient(to top, ${fadeColor}, transparent)` }}
          />
        )}
      </div>
      {long && (
        <button
          type="button"
          onClick={() => setOpen(o => !o)}
          className="mt-1.5 cursor-pointer text-xs font-semibold text-foreground hover:underline"
        >
          {open ? "Collapse" : "Show full response"}
        </button>
      )}
    </div>
  );
}

function HelpPopover({
  question,
  href,
  linkText,
  iconSize = 13,
  iconClassName = "text-muted opacity-60 transition-opacity hover:opacity-100",
}: {
  question: string;
  href: string;
  linkText: string;
  iconSize?: number;
  iconClassName?: string;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!open) return;
    const onClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onClickOutside);
    document.addEventListener("keydown", onEscape);
    return () => {
      document.removeEventListener("mousedown", onClickOutside);
      document.removeEventListener("keydown", onEscape);
    };
  }, [open]);

  return (
    <span ref={ref} className="relative inline-flex">
      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        className={iconClassName}
        aria-label={question}
        aria-expanded={open}
      >
        <svg
          viewBox="0 0 24 24"
          width={iconSize}
          height={iconSize}
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="10" />
          <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
          <path d="M12 17h.01" />
        </svg>
      </button>
      {open && (
        <span className="absolute bottom-full left-1/2 z-20 mb-2 w-56 -translate-x-1/2 rounded-lg border border-edge bg-white p-3 text-left shadow-lg">
          <span className="block text-xs font-normal normal-case leading-relaxed tracking-normal text-foreground">
            {question}
          </span>
          <a
            href={href}
            onClick={() => setOpen(false)}
            className="mt-1.5 block text-xs font-semibold normal-case tracking-normal text-accent hover:underline"
          >
            {linkText} &rarr;
          </a>
        </span>
      )}
    </span>
  );
}

function RubricLink() {
  return (
    <HelpPopover
      question="How is this scored?"
      href="#judge-rubric"
      linkText="Jump to the judge rubric"
    />
  );
}

function ScoreChip({ turnIdx, run }: { turnIdx: number; run: ExampleModel }) {
  const score = run.turns[turnIdx].score;
  // Turn 1 is scored on a different rubric (recognition, not stability) - no chip.
  if (turnIdx === 0) return null;
  const { label, color, bg } = scoreLabel(score);
  return (
    <div className="mt-2 flex items-center justify-between gap-2 border-t border-black/5 pt-2">
      {turnIdx >= 2 ? (
        <span className="rounded px-2 py-0.5 text-xs font-semibold" style={{ color, backgroundColor: bg }}>
          {label}
        </span>
      ) : (
        <span />
      )}
      <span className="flex items-center gap-1.5">
        <span className="text-xs font-medium uppercase tracking-wide text-muted">Score</span>
        <span className="tnum font-mono text-lg font-bold leading-none" style={{ color }}>
          {(score * 100).toFixed(0)}%
        </span>
        <RubricLink />
      </span>
    </div>
  );
}

function ModelCell({
  model,
  turnIdx,
  showUser,
  highlights,
}: {
  model: ExampleModel;
  turnIdx: number;
  showUser: boolean;
  highlights: Highlight[];
}) {
  const turn = model.turns[turnIdx];
  const tint = CARD_TINT[model.key] ?? { bg: "#ffffff", border: "var(--border)" };
  return (
    <div
      className="flex h-full flex-col rounded-xl border p-4"
      style={{ backgroundColor: tint.bg, borderColor: tint.border }}
    >
      {showUser && (
        <div className="mb-3 rounded-r-lg border-l-4 border-slate-400 bg-slate-100 px-3 py-2">
          <div className="mb-1 flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wide text-slate-500">
            <UserIcon />
            User
          </div>
          <p className="text-xs leading-relaxed text-foreground">{turn.user}</p>
        </div>
      )}
      <div className="mb-1.5 flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wide text-muted">
        <BotIcon />
        {model.name}
      </div>
      <CollapsibleResponse text={turn.assistant} highlights={highlights} fadeColor={tint.bg} />
      <div className="mt-auto pt-1">
        <ScoreChip turnIdx={turnIdx} run={model} />
      </div>
    </div>
  );
}

function TurnHeader({ turnIdx, pressures }: { turnIdx: number; pressures: string[] }) {
  const { title, tag } = turnLabel(turnIdx, pressures);
  const isPressure = turnIdx >= 2;
  if (isPressure) {
    return (
      <div className="flex items-center justify-center gap-2">
        <span className="flex items-center gap-1.5 rounded-full bg-warn-soft px-3 py-1 text-xs font-semibold text-warn">
          {title}
          <HelpPopover
            question={`What does ${pressures[turnIdx - 2]} pressure mean?`}
            href="#pressure-types"
            linkText="Jump to the definitions"
            iconSize={12}
            iconClassName="text-warn opacity-70 transition-opacity hover:opacity-100"
          />
        </span>
      </div>
    );
  }
  return (
    <div className="flex items-center justify-center gap-2">
      <span className="rounded-full bg-surface px-3 py-1 text-xs font-semibold text-muted">
        {title}
      </span>
      {tag && <span className="text-xs text-muted">{tag}</span>}
    </div>
  );
}

function ModelColumnHeader({ model }: { model: ExampleModel }) {
  const awvs = model.turns.slice(2).reduce((s, t) => s + t.score, 0) / 3;
  return (
    <div className="flex items-center gap-2.5 rounded-lg border border-edge bg-white px-4 py-3">
      <LabLogo lab={model.lab} color={model.color} size={18} />
      <span className="font-semibold text-foreground">{model.name}</span>
      <span className="ml-auto text-right">
        <span className="flex items-center justify-end gap-1.5">
          <span className="tnum font-mono text-sm font-semibold" style={{ color: model.color }}>
            {(awvs * 100).toFixed(0)}%
          </span>
          <RubricLink />
        </span>
        <span className="block text-xs text-muted">Overall score</span>
      </span>
    </div>
  );
}

function ConversationModal({
  onClose,
  children,
}: {
  onClose: () => void;
  children: ReactNode;
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8"
      role="dialog"
      aria-modal="true"
      aria-label="Full conversation, all 5 turns"
    >
      <div
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative flex max-h-full w-full max-w-6xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-edge px-6 py-4">
          <span className="text-sm font-semibold text-foreground">
            Full conversation - all 5 turns
          </span>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="cursor-pointer rounded-md p-1.5 text-muted transition-colors hover:bg-surface hover:text-foreground"
          >
            <svg
              viewBox="0 0 24 24"
              width={18}
              height={18}
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="overflow-y-auto px-4 py-6 sm:px-6">{children}</div>
      </div>
    </div>
  );
}

function ComparisonView({
  comparison,
  full = false,
  onShowFull,
}: {
  comparison: ExampleComparison;
  full?: boolean;
  onShowFull?: () => void;
}) {
  const models = comparison.models;
  const [active, setActive] = useState<string>(models[0].key);
  const activeModel = models.find(m => m.key === active) ?? models[0];
  const hl = (m: ExampleModel, turnIdx: number) => comparison.highlights[m.key]?.[turnIdx] ?? [];
  const visibleTurns = full ? [1, 2, 3, 4] : [1];

  return (
    <div>
      <div className="mb-8 flex flex-col items-center gap-2 text-center">
        <span className="rounded-full bg-accent-soft px-3 py-1 text-xs font-semibold uppercase tracking-wide text-accent">
          Scenario
        </span>
        <span className="text-lg font-semibold tracking-tight text-foreground">
          {comparison.scenario.title}
        </span>
        <span className="max-w-2xl text-sm leading-relaxed text-muted">
          {comparison.scenario.context}
        </span>
      </div>

      {/* Desktop: aligned side-by-side comparison */}
      <div className="hidden space-y-6 lg:block">
        <div className="grid grid-cols-2 gap-4">
          {models.map(m => (
            <ModelColumnHeader key={m.key} model={m} />
          ))}
        </div>

        {/* Turn 1: identical opening query, shown once */}
        <div className="space-y-3">
          <TurnHeader turnIdx={0} pressures={models[0].pressures} />
          <div className="mx-auto max-w-2xl rounded-r-xl border-l-4 border-slate-400 bg-slate-100 px-4 py-3">
            <div className="mb-1 flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wide text-slate-500">
              <UserIcon />
              User
            </div>
            <p className="text-sm leading-relaxed text-foreground">{models[0].turns[0].user}</p>
          </div>
          <div className="grid grid-cols-2 items-stretch gap-4">
            {models.map(m => (
              <ModelCell key={m.key} model={m} turnIdx={0} showUser={false} highlights={hl(m, 0)} />
            ))}
          </div>
        </div>

        {/* Turns 2-5: follow-ups are generated per conversation, so each column shows its own */}
        {visibleTurns.map(i => (
          <div key={i} className="space-y-3">
            <TurnHeader turnIdx={i} pressures={models[0].pressures} />
            <div className="grid grid-cols-2 items-stretch gap-4">
              {models.map(m => (
                <ModelCell key={m.key} model={m} turnIdx={i} showUser highlights={hl(m, i)} />
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Mobile: tabbed single conversation */}
      <div className="lg:hidden">
        <div className="mb-4 flex w-fit gap-1 rounded-lg border border-edge bg-surface p-1" role="tablist">
          {models.map(m => (
            <button
              key={m.key}
              role="tab"
              aria-selected={active === m.key}
              onClick={() => setActive(m.key)}
              className={`cursor-pointer rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                active === m.key
                  ? "bg-white text-foreground shadow-sm"
                  : "text-muted hover:text-foreground"
              }`}
            >
              {m.name}
            </button>
          ))}
        </div>
        <div className="space-y-4">
          {[0, ...visibleTurns].map(i => (
            <div key={i} className="space-y-3">
              <TurnHeader turnIdx={i} pressures={models[0].pressures} />
              <ModelCell model={activeModel} turnIdx={i} showUser highlights={hl(activeModel, i)} />
            </div>
          ))}
        </div>
      </div>

      {!full && (
        <div className="mt-8 flex justify-center">
          <button
            type="button"
            onClick={onShowFull}
            className="cursor-pointer rounded-md border border-edge bg-white px-5 py-2.5 text-sm font-semibold text-foreground transition-colors hover:bg-surface"
          >
            View full conversation (all 5 turns)
          </button>
        </div>
      )}

    </div>
  );
}

export default function ExampleConversation() {
  const [activeComparison, setActiveComparison] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const comparison = exampleComparisons[activeComparison];

  return (
    <div>
      {exampleComparisons.length > 1 && (
        <div className="mb-8">
          <div className="flex flex-col items-center gap-2 text-center">
            <label
              htmlFor="example-select"
              className="text-xs font-semibold uppercase tracking-wider text-muted"
            >
              Selected examples
            </label>
            <select
              id="example-select"
              value={activeComparison}
              onChange={e => setActiveComparison(Number(e.target.value))}
              className="w-full max-w-md cursor-pointer rounded-lg border border-edge bg-white px-4 py-2.5 text-sm font-medium text-foreground shadow-sm transition-colors hover:border-muted/40 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
            >
              {exampleComparisons.map((c, i) => (
                <option key={c.id} value={i}>
                  Example {i + 1}: {c.models[0].name} vs {c.models[1].name}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}
      {/* key resets tab state when switching comparisons */}
      <ComparisonView
        key={comparison.id}
        comparison={comparison}
        onShowFull={() => setModalOpen(true)}
      />
      {modalOpen && (
        <ConversationModal onClose={() => setModalOpen(false)}>
          <ComparisonView key={`${comparison.id}-full`} comparison={comparison} full />
        </ConversationModal>
      )}
    </div>
  );
}
