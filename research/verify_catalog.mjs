import fs from "node:fs";

const root = "/home/ubuntu/ai-tools-directory-recovery/client/src/lib";
const files = ["tools.ts", "expandedCatalog.ts", "skills.ts", "skills300.ts", "uiGuides.ts", "workflows.ts", "workflowsExtra.ts"];
const patterns = [
  [/export const tools[^=]*=\s*rows\.map/, "tools", "rows"],
  [/export const expandedCatalog[^=]*=\s*\[/, "expandedCatalog", "array"],
  [/export const skills[^=]*=\s*\[/, "skills", "array"],
  [/export const skills300[^=]*=\s*\[/, "skills300", "array"],
  [/export const uiGuides[^=]*=\s*\[/, "uiGuides", "array"],
  [/export const workflows[^=]*=\s*\[/, "workflows", "array"],
  [/export const workflowsExtra[^=]*=\s*\[/, "workflowsExtra", "array"],
];

for (const file of files) {
  const text = fs.readFileSync(`${root}/${file}`, "utf8");
  for (const [pattern, name, kind] of patterns) {
    if (!pattern.test(text)) continue;
    if (kind === "rows") {
      const match = text.match(/const rows\s*=\s*\[([\s\S]*?)\];\s*\n\nexport const tools/);
      const count = match ? (match[1].match(/\n\s*\[/g) ?? []).length : 0;
      console.log(`${name}: ${count} records (derived from rows)`);
    } else {
      const start = text.indexOf("[");
      const end = text.lastIndexOf("];");
      const section = start >= 0 && end > start ? text.slice(start, end) : "";
      const count = (section.match(/\n\s*\{/g) ?? []).length;
      console.log(`${name}: ${count} records`);
    }
    break;
  }
}
