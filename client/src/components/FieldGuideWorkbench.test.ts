import { describe, expect, it } from "vitest";
import { directoryTools } from "@/lib/toolCatalog";
import { priceStatus, trustLabel, wizardGuidance } from "./FieldGuideWorkbench";

describe("FieldGuideWorkbench metadata", () => {
  it("normalizes price labels into filter buckets", () => {
    const sample = directoryTools[0];
    expect(["무료", "부분 무료", "유료", "확인 필요"]).toContain(priceStatus(sample));
  });

  it("exposes source provenance instead of hiding it", () => {
    const sample = directoryTools[0];
    expect(trustLabel(sample).length).toBeGreaterThan(0);
    expect(trustLabel(sample)).not.toBe("신뢰도 미상");
  });

  it("keeps beginner guidance for all four wizard stages", () => {
    expect(wizardGuidance).toHaveLength(4);
    expect(wizardGuidance.map((item) => item.step)).toEqual(["01", "02", "03", "04"]);
    expect(wizardGuidance.every((item) => item.title.length > 0 && item.hint.length > 10)).toBe(true);
  });
});
