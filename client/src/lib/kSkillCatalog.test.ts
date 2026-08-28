import { describe, expect, it } from "vitest";
import { kSkillCatalog } from "./kSkillCatalog";

describe("k-skill catalog", () => {
  it("keeps the official folder links unique and complete", () => {
    expect(kSkillCatalog.length).toBe(116);
    expect(new Set(kSkillCatalog.map((skill) => skill.slug)).size).toBe(kSkillCatalog.length);
    expect(kSkillCatalog.every((skill) => skill.url === `https://github.com/NomaDamas/k-skill/tree/main/${skill.slug}`)).toBe(true);
  });

  it("covers the user-facing category filters", () => {
    const categories = new Set(kSkillCatalog.map((skill) => skill.category));
    expect(categories).toEqual(new Set(["교통", "공공서비스", "생활", "쇼핑", "금융·비즈니스", "문서·개발", "콘텐츠·검색", "기타"]));
  });

  it("keeps representative Korean services in useful categories", () => {
    const categoryOf = (slug: string) => kSkillCatalog.find((skill) => skill.slug === slug)?.category;
    expect(categoryOf("ktx-booking")).toBe("교통");
    expect(categoryOf("k-dart")).toBe("금융·비즈니스");
    expect(categoryOf("coupang-product-search")).toBe("쇼핑");
    expect(categoryOf("nts-tax-delinquency")).toBe("공공서비스");
  });
});
