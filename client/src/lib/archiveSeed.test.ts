import { describe, expect, it } from "vitest";
import { archiveSeed, filterArchiveSeed } from "./archiveSeed";

describe("archive seed fallback", () => {
  it("contains the four verified official records", () => {
    expect(archiveSeed).toHaveLength(4);
    expect(archiveSeed.every((item) => item.sourceUrl.startsWith("https://"))).toBe(true);
  });

  it("filters by stream and Korean keyword", () => {
    expect(filterArchiveSeed(archiveSeed, "contest")).toHaveLength(2);
    expect(filterArchiveSeed(archiveSeed, undefined, "박람회")[0]?.type).toBe("exhibition");
    expect(filterArchiveSeed(archiveSeed, undefined, "존재하지 않는 기록")).toHaveLength(0);
  });
});
