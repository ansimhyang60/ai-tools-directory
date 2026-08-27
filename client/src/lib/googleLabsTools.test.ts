import { describe, expect, it } from "vitest";
import { directoryTools } from "./toolCatalog";
import { googleLabsTools } from "./googleLabsTools";

const requestedNames = [
  "NotebookLM",
  "Google Stitch",
  "Flow AI (Google Flow)",
  "Google AI Studio",
  "Pomelli",
  "Google Antigravity",
  "Illuminate",
  "TextFX",
  "Google Opal",
  "MusicFX (Google Flow Music)",
];

describe("Google Labs priority tool catalog", () => {
  it("includes all requested tools in the central directory", () => {
    const names = new Set(directoryTools.map((tool) => tool.name));
    expect(googleLabsTools).toHaveLength(10);
    for (const name of requestedNames) expect(names.has(name)).toBe(true);
  });

  it("keeps unique IDs, slugs, official URLs, and trust metadata", () => {
    const ids = directoryTools.map((tool) => tool.id);
    const slugs = directoryTools.map((tool) => tool.slug);
    expect(new Set(ids).size).toBe(ids.length);
    expect(new Set(slugs).size).toBe(slugs.length);

    for (const tool of googleLabsTools) {
      const record = directoryTools.find((item) => item.name === tool.name);
      expect(record?.url).toMatch(/^https:\/\//);
      expect(record?.source).toBeTruthy();
      expect(record?.verifiedAt).toBe("2026-08-27");
      expect(record?.tokenTip.length).toBeGreaterThan(20);
      expect(record?.promptStarter.length).toBeGreaterThan(40);
    }
  });

  it("merges canonical updates instead of duplicating NotebookLM and Pomelli", () => {
    for (const name of ["NotebookLM", "Pomelli"]) {
      expect(directoryTools.filter((tool) => tool.name === name)).toHaveLength(1);
      expect(directoryTools.find((tool) => tool.name === name)?.sourceCategory).toMatch(/Google/);
    }
  });
});
