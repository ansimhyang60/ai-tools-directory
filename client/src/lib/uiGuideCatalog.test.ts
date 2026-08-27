import { describe, expect, it } from "vitest";
import { designSystemReferences } from "./designSystems";
import { uiCatalog350 } from "./uiCatalog350";

describe("UI Guide catalog integrity", () => {
  it("preserves all 350 numbered patterns without duplicate ids", () => {
    expect(uiCatalog350).toHaveLength(350);
    expect(new Set(uiCatalog350.map((item) => item.id)).size).toBe(350);
    expect(uiCatalog350[0]?.id).toBe(1);
    expect(uiCatalog350.at(-1)?.id).toBe(350);
  });

  it("preserves all curated design-system references with official links", () => {
    expect(designSystemReferences).toHaveLength(17);
    expect(new Set(designSystemReferences.map((item) => item.name)).size).toBe(17);
    expect(designSystemReferences.every((item) => item.url.startsWith("http"))).toBe(true);
    expect(designSystemReferences.every((item) => item.tech.length > 0 && item.features.length > 0)).toBe(true);
  });
});
