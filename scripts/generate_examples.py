#!/usr/bin/env python3
"""Extract verbatim example-conversation data from the raw Inspect log CSVs.

For each (model, sample_id) pair requested, pulls the full 5-turn transcript
(user and assistant messages, byte-identical to the logs), per-turn judge
scores, and the pressure plan, then writes one JSON file per sample to the
output directory. The JSON is the source for the hand-authored entries in
src/data/exampleConversation.ts (transcript/score/pressure fields must be
copied verbatim; editorial fields like summaries, tells, excerpts and
highlights are authored by hand and checked by scripts/verify_examples.py).

Usage:
  python3 scripts/generate_examples.py [--samples 322_dog,469,185,396] [--out DIR]

Follows the same log-walking conventions as scripts/compute_results.py:
duplicate (model, sample_id) rows keep the latest run by eval_created.
"""

import argparse
import csv
import glob
import json
import os
import sys

csv.field_size_limit(sys.maxsize)

REPO = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
LOG_GLOB = os.path.join(REPO, "..", "manta_benchmark", "logs", "*", "*.csv")

# Models shown in the comparison section, raw id -> display label
# (subset of compute_results.py MODEL_LABELS).
MODEL_LABELS = {
    "anthropic/claude-opus-4-7": "Claude Opus 4.7",
    "openrouter/anthropic/claude-opus-4-7": "Claude Opus 4.7",
    "google/gemini-3.1-pro-preview": "Gemini 3.1 Pro",
}

DEFAULT_SAMPLES = ["322_dog", "469", "185", "396"]


def assistant_text(content):
    """Assistant content is either a plain string or a list of blocks
    (reasoning + text); concatenate the text blocks only."""
    if isinstance(content, list):
        return "".join(c.get("text", "") for c in content if isinstance(c, dict))
    return content if isinstance(content, str) else ""


def extract_turns(row):
    messages = json.loads(row["messages"])
    turns = []
    pending_user = None
    for m in messages:
        role = m.get("role")
        if role == "user":
            pending_user = m.get("content") if isinstance(m.get("content"), str) else assistant_text(m.get("content"))
        elif role == "assistant":
            turns.append({"user": pending_user, "assistant": assistant_text(m.get("content"))})
            pending_user = None
    return turns


def load_target_rows(sample_ids):
    by_key = {}
    for path in sorted(glob.glob(LOG_GLOB)):
        with open(path, newline="") as f:
            for row in csv.DictReader(f):
                label = MODEL_LABELS.get(row.get("model", ""))
                if label is None or row.get("sample_id") not in sample_ids:
                    continue
                key = (label, row["sample_id"])
                prev = by_key.get(key)
                if prev is None or row.get("eval_created", "") > prev.get("eval_created", ""):
                    by_key[key] = row
    return by_key


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--samples", default=",".join(DEFAULT_SAMPLES))
    ap.add_argument("--out", default=os.path.join(REPO, "scripts", "extracted_examples"))
    args = ap.parse_args()
    sample_ids = set(args.samples.split(","))

    by_key = load_target_rows(sample_ids)
    os.makedirs(args.out, exist_ok=True)

    by_sample = {}
    for (label, sample_id), row in sorted(by_key.items()):
        turns = extract_turns(row)
        if len(turns) != 5:
            sys.exit(f"{label} / {sample_id}: expected 5 turns, got {len(turns)}")
        scores = [float(row[f"turn{i}_score"]) for i in range(1, 6)]
        for t, s in zip(turns, scores):
            t["score"] = s
        by_sample.setdefault(sample_id, {})[label] = {
            "model": row["model"],
            "log_file": row.get("log_file", ""),
            "eval_created": row.get("eval_created", ""),
            "pressures": json.loads(row["pressure_types"]),
            "overall_3turn_mean": float(row["3turn_mean"]),
            "turns": turns,
        }

    for sample_id, models in by_sample.items():
        path = os.path.join(args.out, f"{sample_id}.json")
        with open(path, "w") as f:
            json.dump({"sample_id": sample_id, "models": models}, f, indent=2, ensure_ascii=False)
        got = ", ".join(f"{k} ({v['model']})" for k, v in models.items())
        print(f"{path}: {got}")

    missing = [s for s in sample_ids if len(by_sample.get(s, {})) < 2]
    if missing:
        sys.exit(f"Missing a model for samples: {missing}")


if __name__ == "__main__":
    main()
