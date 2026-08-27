import { describe, expect, it } from "vitest";
import { clearSearchHistory, readSearchHistory, rememberSearchQuery, removeSearchHistoryItem, SEARCH_HISTORY_KEY } from "./searchHistory";

function makeStorage() {
  const values = new Map<string, string>();
  return {
    getItem: (key: string) => values.get(key) ?? null,
    setItem: (key: string, value: string) => values.set(key, value),
    removeItem: (key: string) => values.delete(key),
  };
}

describe("search history", () => {
  it("keeps the newest unique queries first and caps history at six", () => {
    const storage = makeStorage();
    ["one", "two", "three", "four", "five", "six", "seven", "TWO"].forEach((query) => rememberSearchQuery(query, storage));
    expect(readSearchHistory(storage)).toEqual(["TWO", "seven", "six", "five", "four", "three"]);
  });

  it("removes one case-insensitive query without affecting the others", () => {
    const storage = makeStorage();
    rememberSearchQuery("NotebookLM", storage);
    rememberSearchQuery("CTA", storage);
    expect(removeSearchHistoryItem("notebooklm", storage)).toEqual(["CTA"]);
    expect(readSearchHistory(storage)).toEqual(["CTA"]);
  });

  it("clears persisted history safely", () => {
    const storage = makeStorage();
    rememberSearchQuery("재고", storage);
    expect(storage.getItem(SEARCH_HISTORY_KEY)).not.toBeNull();
    expect(clearSearchHistory(storage)).toEqual([]);
    expect(readSearchHistory(storage)).toEqual([]);
    expect(storage.getItem(SEARCH_HISTORY_KEY)).toBeNull();
  });
});
