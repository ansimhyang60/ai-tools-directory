import { describe, expect, it } from "vitest";
import { popularTools } from "./popularTools";

describe("popularTools catalog", () => {
  it("keeps the complete 89-service index available to the directory", () => {
    expect(popularTools).toHaveLength(89);
    expect(new Set(popularTools.map((tool) => tool.id)).size).toBe(89);
    expect(popularTools.map((tool) => tool.name)).toEqual(expect.arrayContaining(["ChatGPT", "Claude", "Gemini"]));
  });
});
