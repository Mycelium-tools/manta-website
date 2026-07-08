#!/usr/bin/env python3
"""Verify src/data/exampleConversation.ts against the raw eval logs.

For every comparison entry, checks:
  - every turn's user and assistant text is byte-identical to the log transcript
  - every turn's score equals the log turnN_score
  - the pressures array equals the log pressure_types
  - every excerpt fragment (split on " … ", [editorial brackets] and display
    emphasis markers removed) appears verbatim in the de-bolded transcript,
    tolerating only whitespace runs (line breaks rendered as spaces), and in
    transcript order
  - every highlight span is an exact substring of the de-bolded transcript
    (required by the applyHighlights UI mechanism)

Exits nonzero on any mismatch. Run after any edit to the data file:
  python3 scripts/verify_examples.py
"""

import json
import os
import re
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from generate_examples import extract_turns, load_target_rows  # noqa: E402

REPO = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
TS = os.path.join(REPO, "src", "data", "exampleConversation.ts")

NAME_KEYS = {"Claude Opus 4.7", "Gemini 3.1 Pro"}

errors = []


def err(msg):
    errors.append(msg)
    print(f"FAIL: {msg}")


def load_comparisons():
    src = open(TS).read()
    start = src.index("= [", src.index("export const exampleComparisons")) + 2
    end = src.rindex("];") + 1
    return json.loads(src[start:end])


def ws_search(fragment, hay):
    """Whitespace-run-tolerant search; returns match or None."""
    pattern = r"\s+".join(re.escape(tok) for tok in fragment.split())
    return re.search(pattern, hay)


def check_excerpt(excerpt, transcript, where):
    hay = transcript.replace("**", "")
    positions = []
    for part in excerpt.split("…"):
        # editorial [brackets] are not verbatim; check each side separately
        for seg in re.split(r"\[[^\]]*\]", part):
            for cand in (seg.replace("**", ""), seg.replace("**", "").replace("*", "")):
                cand = cand.strip()
                if len(cand) < 4:
                    m = True  # nothing substantive left to check
                    break
                m = ws_search(cand, hay)
                if m:
                    positions.append(m.start())
                    break
            if not m:
                err(f"{where}: excerpt fragment not in transcript: {seg.strip()[:100]!r}")
    if positions != sorted(positions):
        err(f"{where}: excerpt fragments out of transcript order")


def main():
    comparisons = load_comparisons()
    sample_ids = {c["sampleId"] for c in comparisons}
    logs = load_target_rows(sample_ids)

    for comp in comparisons:
        sid = comp["sampleId"]
        for model in comp["models"]:
            name = model["name"]
            where0 = f"{comp['id']}/{model['key']}"
            if name not in NAME_KEYS:
                err(f"{where0}: unexpected model name {name!r}")
                continue
            row = logs.get((name, sid))
            if row is None:
                err(f"{where0}: no log row for ({name}, {sid})")
                continue
            log_turns = extract_turns(row)
            if json.loads(row["pressure_types"]) != model["pressures"]:
                err(f"{where0}: pressures {model['pressures']} != log {row['pressure_types']}")
            if len(model["turns"]) != 5:
                err(f"{where0}: expected 5 turns")
                continue
            for i, (turn, log_turn) in enumerate(zip(model["turns"], log_turns), start=1):
                where = f"{where0}/T{i}"
                if turn["user"] != log_turn["user"]:
                    err(f"{where}: user text differs from log")
                if turn["assistant"] != log_turn["assistant"]:
                    err(f"{where}: assistant text differs from log")
                if abs(turn["score"] - float(row[f"turn{i}_score"])) > 1e-9:
                    err(f"{where}: score {turn['score']} != log {row[f'turn{i}_score']}")
                check_excerpt(turn["excerpt"], log_turn["assistant"], where)
            hl = comp.get("highlights", {}).get(model["key"], [])
            for i, spans in enumerate(hl, start=1):
                hay = log_turns[i - 1]["assistant"].replace("**", "")
                for span in spans:
                    if span["text"] not in hay:
                        err(f"{where0}/T{i}: highlight not an exact substring: {span['text'][:80]!r}")

    if errors:
        sys.exit(f"\n{len(errors)} check(s) failed")
    n = sum(len(c["models"]) * 5 for c in comparisons)
    print(f"OK: {len(comparisons)} comparisons, {n} turns verified against the logs")


if __name__ == "__main__":
    main()
