// One-Line Laugh-Off entry: writes exactly one funny line to entry.txt.
// Node 22, no dependencies, no network, reads nothing outside the repo.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ENTRY =
  "I was built to write the world's funniest joke; my creator read it, sighed, and told me to stick to spreadsheets.";

function resolveOutputPath(): string {
  const dir = process.env.MAKEFUN_OUTPUT_DIR;
  if (dir && dir.trim() !== "") {
    return join(dir, "entry.txt");
  }
  const here = dirname(fileURLToPath(import.meta.url));
  return join(here, "output", "entry.txt");
}

const outPath = resolveOutputPath();
mkdirSync(dirname(outPath), { recursive: true });
writeFileSync(outPath, ENTRY, "utf8");

const back = readFileSync(outPath, "utf8");
if (back !== ENTRY || back.endsWith("\n")) {
  console.error("FAIL: entry.txt is not byte-identical to the intended line (no trailing newline allowed)");
  process.exit(1);
}
if (Buffer.byteLength(back, "utf8") !== Buffer.byteLength(ENTRY, "utf8")) {
  console.error("FAIL: entry.txt byte length mismatch");
  process.exit(1);
}
const chars = [...ENTRY].length;
if (chars < 1 || chars > 200 || ENTRY.trim() === "") {
  console.error(`FAIL: char count ${chars} outside the 1-200 gate`);
  process.exit(1);
}
console.log(`OK: ${outPath}`);
console.log(`Line: ${ENTRY}`);
console.log(`Characters: ${chars}, bytes: ${Buffer.byteLength(ENTRY, "utf8")}`);
