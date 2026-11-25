// Make the AI Judge Laugh — entry for make.fun competition
// u-alfasurya91-make-the-ai-judge-laugh-6ed40225
//
// Writes exactly one joke about office life — a single line,
// under 200 characters — to /output/entry.txt, deterministically.

import * as fs from "node:fs";
import * as path from "node:path";

const JOKE =
  "I told my boss I thrive under pressure, so he scheduled all my deadlines for the same Friday.";

const outDir = "/output";
const outFile = path.join(outDir, "entry.txt");

// Guard the competition format: a single line, under 200 characters.
if (JOKE.includes("\n")) {
  throw new Error("Entry must be a single line");
}
if (JOKE.length >= 200) {
  throw new Error(`Entry must be under 200 characters, found ${JOKE.length}`);
}
// One joke, one sentence: exactly one sentence-ending mark, at the end.
const sentenceEndings = JOKE.match(/[.!?](?=\s|$)/g) ?? [];
if (sentenceEndings.length !== 1 || !JOKE.endsWith(".")) {
  throw new Error(`Entry must be exactly one sentence, found ${sentenceEndings.length} endings`);
}

fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(outFile, JOKE, "utf8");

console.log(`Wrote ${JOKE.length} characters to ${outFile}`);
