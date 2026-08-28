import { describe, expect, it } from "vitest";
import { getVirtualWindow } from "@/lib/virtualListUtils";

describe("getVirtualWindow", () => {
  it("keeps the first window bounded and overscanned", () => {
    expect(getVirtualWindow(400, 116, 0, 700, 5)).toEqual({ start: 0, end: 12 });
  });

  it("moves the window with scroll position without exceeding item count", () => {
    expect(getVirtualWindow(12, 116, 1200, 700, 5)).toEqual({ start: 5, end: 12 });
  });
});
