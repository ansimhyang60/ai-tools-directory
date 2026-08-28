import { describe, expect, it } from "vitest";
import { getKoreanDescription, getKSkillInstallCommand, getVisibleKSkills, K_SKILL_PAGE_SIZE } from "./KSkillCollection";

describe("KSkillCollection helpers", () => {
  it("reveals the first 24 entries and supports the next page", () => {
    const entries = Array.from({ length: 50 }, (_, index) => index);
    expect(K_SKILL_PAGE_SIZE).toBe(24);
    expect(getVisibleKSkills(entries, K_SKILL_PAGE_SIZE)).toHaveLength(24);
    expect(getVisibleKSkills(entries, 48)).toHaveLength(48);
    expect(getVisibleKSkills(entries, 48).at(-1)).toBe(47);
  });

  it("builds the documented all-in-one skill install command", () => {
    expect(getKSkillInstallCommand("ktx-booking")).toBe("npx --yes skills add NomaDamas/k-skill --skill ktx-booking -g");
  });

  it("provides a Korean explanation for every filter category", () => {
    const categories = ["교통", "공공서비스", "생활", "쇼핑", "금융·비즈니스", "문서·개발", "콘텐츠·검색", "기타"] as const;
    for (const category of categories) {
      expect(getKoreanDescription(category)).toMatch(/스킬입니다\.$/);
    }
  });
});
