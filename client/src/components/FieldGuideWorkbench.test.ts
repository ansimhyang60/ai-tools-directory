import { describe, expect, it } from "vitest";
import { directoryTools } from "@/lib/toolCatalog";
import { priceStatus, trustLabel } from "./FieldGuideWorkbench";

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
});
