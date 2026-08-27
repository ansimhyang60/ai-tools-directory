import { describe, expect, it } from "vitest";
import { filterSearchRecords, getSearchCounts, globalSearchRecords, normalizeSearchText } from "./globalSearch";

describe("global search index", () => {
  it("normalizes Korean and mixed-case queries consistently", () => {
    expect(normalizeSearchText("  NotebookLM   학습 ")).toBe("notebooklm 학습");
  });

  it("contains distinct records for the field guide content layers", () => {
    const kinds = new Set(globalSearchRecords.map((record) => record.kind));
    expect(kinds).toEqual(new Set(["AI 도구", "SKILL", "UI Guide", "디자인 시스템", "워크플로우", "아카이브"]));
    expect(globalSearchRecords.length).toBeGreaterThan(500);
  });

  it("finds content outside the AI tool catalog", () => {
    expect(filterSearchRecords("접근성", "SKILL").length).toBeGreaterThan(0);
    expect(filterSearchRecords("CTA", "UI Guide").length).toBeGreaterThan(0);
    expect(filterSearchRecords("재고", "워크플로우").length).toBeGreaterThan(0);
    expect(filterSearchRecords("공모전", "아카이브").length).toBeGreaterThan(0);
  });

  it("keeps workflow prompts available as a dedicated filter", () => {
    const prompts = filterSearchRecords("메일", "프롬프트");
    expect(prompts.length).toBeGreaterThan(0);
    expect(prompts.every((record) => record.kind === "워크플로우" && record.isPrompt)).toBe(true);
  });

  it("reports counts that agree with the filtered result sets", () => {
    const counts = getSearchCounts("NotebookLM");
    expect(counts.find((entry) => entry.label === "전체")?.count).toBe(filterSearchRecords("NotebookLM").length);
    expect(counts.find((entry) => entry.label === "AI 도구")?.count).toBe(filterSearchRecords("NotebookLM", "AI 도구").length);
  });
});
