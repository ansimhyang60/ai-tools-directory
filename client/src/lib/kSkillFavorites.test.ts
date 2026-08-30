import { describe, expect, it } from "vitest";
import { toggleKSkillFavorite } from "./kSkillFavorites";

describe("kSkillFavorites", () => {
  it("adds a skill once and removes it on the next toggle", () => {
    const added = toggleKSkillFavorite("ktx", []);
    expect(added).toEqual(["ktx"]);
    expect(toggleKSkillFavorite("ktx", added)).toEqual([]);
  });

  it("preserves other favorites when removing one", () => {
    expect(toggleKSkillFavorite("tax", ["ktx", "weather"])).toEqual(["ktx", "weather", "tax"]);
    expect(toggleKSkillFavorite("ktx", ["ktx", "weather"])).toEqual(["weather"]);
  });
});
