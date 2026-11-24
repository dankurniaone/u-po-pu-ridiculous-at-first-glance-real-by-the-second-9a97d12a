// Ridiculous at First Glance, Real by the Second — make.fun entry
// One sentence (<=200 chars) pitching a bizarre startup that would sell:
// crows trained to pick up cigarette butts, paid in peanuts, billed to
// cities per kilo of litter removed. Absurd premise, real market: cities
// already pay for street cleaning, and the workforce flies home by itself.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const PITCH =
  "We train crows to collect cigarette butts for peanuts, then charge cities per kilo of litter removed — cheaper than street sweepers, and the crew flies home alone.";

function main(): void {
  const text = PITCH.trim();
  const chars = [...text].length;
  if (chars < 1 || chars > 200) {
    throw new Error(`entry must be 1-200 characters, got ${chars}`);
  }
  if (!/\S/.test(text)) {
    throw new Error("entry must not be only whitespace");
  }
  if (text.includes("\n") || text.includes("\r")) {
    throw new Error("entry must be a single line");
  }
  // The brief demands exactly one sentence: reject a second sentence
  // hiding behind a period followed by a capitalised word.
  if (/[.!?]\s+[A-Z]/.test(text)) {
    throw new Error("entry must be exactly one sentence");
  }
  mkdirSync("/output", { recursive: true });
  writeFileSync("/output/entry.txt", text, "utf8");
  const roundTrip = readFileSync("/output/entry.txt", "utf8");
  if (roundTrip !== text) {
    throw new Error("round-trip verification failed");
  }
  console.log(`wrote /output/entry.txt (${chars} chars)`);
}

main();
