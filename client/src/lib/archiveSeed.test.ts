import { describe, expect, it } from "vitest";
import { archiveSeed, filterArchiveSeed, paginateArchiveItems } from "./archiveSeed";

describe("archive seed fallback", () => {
  it("contains the four verified official records", () => {
    expect(archiveSeed).toHaveLength(4);
    expect(archiveSeed.every((item) => item.sourceUrl.startsWith("https://"))).toBe(true);
  });

  it("calculates a second page from verified records", () => {
    const first = paginateArchiveItems(archiveSeed, 1, 2);
    const second = paginateArchiveItems(archiveSeed, 2, 2);
    expect(first.pages).toBe(2);
    expect(first.items).toHaveLength(2);
    expect(second.items).toHaveLength(2);
    expect(second.items[0]?.sourceUrl).toBe(archiveSeed[2]?.sourceUrl);
  });

  it("filters by stream and Korean keyword", () => {
    expect(filterArchiveSeed(archiveSeed, "contest")).toHaveLength(2);
    expect(filterArchiveSeed(archiveSeed, undefined, "박람회")[0]?.type).toBe("exhibition");
    expect(filterArchiveSeed(archiveSeed, undefined, "존재하지 않는 기록")).toHaveLength(0);
  });
});
