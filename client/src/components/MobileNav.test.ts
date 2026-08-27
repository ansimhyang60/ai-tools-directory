import { describe, expect, it } from "vitest";
import { siteNav } from "@/lib/siteNav";

describe("mobile navigation contract", () => {
  it("keeps every primary destination available to the mobile menu", () => {
    expect(siteNav.map(([label]) => label)).toEqual([
      "업무 찾기",
      "도구 찾기",
      "UI 참고",
      "스킬 라이브러리",
      "학습 경로",
      "사용 원칙",
    ]);
  });

  it("does not expose duplicate destinations", () => {
    const routes = siteNav.map(([, href]) => href);
    expect(new Set(routes).size).toBe(routes.length);
  });
});
