import { describe, expect, it } from "vitest";
import { aimattersTools } from "./aimattersTools";
import { designSystemReferences } from "./designSystems";
import { directoryTools } from "./toolCatalog";

const normalized = (value: string) => value.toLowerCase().replace(/[^a-z0-9가-힣]/g, "");

describe("external catalog integrations", () => {
  it("keeps AimAtters additions source-labelled and linked to official products", () => {
    expect(aimattersTools.length).toBeGreaterThanOrEqual(15);
    expect(aimattersTools.every((tool) => tool.source === "AimAtters AI Tool DB")).toBe(true);
    expect(aimattersTools.every((tool) => tool.url.startsWith("https://"))).toBe(true);
    const verifiedPricingTools = directoryTools.filter((tool) => tool.sourceCategory === "AimAtters AI Tool DB" && tool.pricingUrl);
    expect(verifiedPricingTools.length).toBeGreaterThanOrEqual(8);
    expect(verifiedPricingTools.every((tool) => tool.pricingUrl?.startsWith("https://"))).toBe(true);
    expect(new Set(aimattersTools.map((tool) => normalized(tool.name))).size).toBe(aimattersTools.length);
    expect(directoryTools.some((tool) => tool.name === "10Web AI" && tool.sourceCategory === "AimAtters AI Tool DB")).toBe(true);
  });

  it("keeps design-system references discoverable with primary and companion links", () => {
    expect(designSystemReferences.length).toBeGreaterThanOrEqual(15);
    expect(designSystemReferences.every((item) => item.url.startsWith("https://"))).toBe(true);
    expect(designSystemReferences.some((item) => item.name === "shadcn/ui")).toBe(true);
    expect(designSystemReferences.some((item) => item.companionLinks.some((link) => link.label === "GitHub"))).toBe(true);
    expect(designSystemReferences.every((item) => ["초급", "중급", "고급"].includes(item.difficulty))).toBe(true);
    expect(designSystemReferences.every((item) => ["button", "form", "card", "table"].includes(item.previewKind))).toBe(true);
  });
});
