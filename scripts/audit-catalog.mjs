import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const files = [
  "client/src/lib/tools.ts",
  "client/src/lib/toolCatalog.ts",
  "client/src/lib/popularTools.ts",
  "client/src/lib/googleLabsTools.ts",
  "client/src/lib/expandedCatalog.ts",
  "client/src/lib/aimattersTools.ts",
  "client/src/lib/skills.ts",
  "client/src/lib/skills300.ts",
  "client/src/lib/kSkillCatalog.ts",
];

const namePattern = /(?:["']name["']|\bname)\s*:\s*["'`]([^"'`]+)["'`]/g;
const byFile = new Map();
const all = new Map();
for (const relative of files) {
  const content = fs.readFileSync(path.join(root, relative), "utf8");
  const names = [...content.matchAll(namePattern)].map((match) => match[1].trim().toLowerCase());
  byFile.set(relative, names);
  for (const name of names) {
    const entries = all.get(name) ?? [];
    entries.push(relative);
    all.set(name, entries);
  }
}

console.log("CATALOG_FILE_COUNTS");
for (const [file, names] of byFile) {
  console.log(`${names.length}\t${file}`);
}
console.log("DUPLICATES_WITHIN_FILE");
for (const [file, names] of byFile) {
  const duplicates = [...new Set(names.filter((name, index) => names.indexOf(name) !== index))];
  if (duplicates.length) console.log(`${duplicates.length}\t${file}\t${duplicates.slice(0, 12).join(" | ")}`);
}
console.log("CROSS_FILE_DUPLICATES");
const crossFile = [...all.entries()].filter(([, sources]) => new Set(sources).size > 1);
console.log(`count=${crossFile.length}`);
for (const [name, sources] of crossFile.slice(0, 80)) console.log(`${name}\t${[...new Set(sources)].join(" | ")}`);

const sourceFiles = ["client/src", "client/index.html", "server"];
const brandPatterns = /AI100|AI\/100|FIELD GUIDE|FIELD_GUIDE/;
console.log("OLD_BRAND_MATCHES");
for (const relative of sourceFiles) {
  const absolute = path.join(root, relative);
  const entries = fs.statSync(absolute).isDirectory() ? fs.readdirSync(absolute, { recursive: true }).map(String) : [relative];
  for (const entry of entries) {
    const candidate = path.join(relative, entry);
    const full = path.join(root, candidate);
    if (!fs.existsSync(full) || !fs.statSync(full).isFile()) continue;
    if (!/\.(tsx?|css|html)$/.test(full)) continue;
    const lines = fs.readFileSync(full, "utf8").split("\n");
    lines.forEach((line, index) => { if (brandPatterns.test(line)) console.log(`${candidate}:${index + 1}:${line.trim()}`); });
  }
}
