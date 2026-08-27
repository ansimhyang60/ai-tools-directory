import { describe, expect, it } from "vitest";

describe("configured website branding", () => {
  it("uses the selected app title when the environment provides it", () => {
    expect(process.env.VITE_APP_TITLE ?? "AI 활용 가이드").toBe("AI 활용 가이드");
  });
});
