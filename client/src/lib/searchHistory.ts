export const SEARCH_HISTORY_KEY = "ai100:recent-searches";
export const SEARCH_HISTORY_EVENT = "ai100:recent-searches-changed";
export const SEARCH_HISTORY_LIMIT = 6;

type StorageLike = Pick<Storage, "getItem" | "setItem" | "removeItem">;

function getBrowserStorage() {
  if (typeof window === "undefined") return undefined;
  try {
    return window.localStorage;
  } catch {
    return undefined;
  }
}

function cleanHistory(value: unknown) {
  if (!Array.isArray(value)) return [];
  const seen = new Set<string>();
  return value
    .filter((item): item is string => typeof item === "string")
    .map((item) => item.trim())
    .filter(Boolean)
    .filter((item) => {
      const key = item.toLocaleLowerCase("ko-KR");
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    })
    .slice(0, SEARCH_HISTORY_LIMIT);
}

export function readSearchHistory(storage: StorageLike | undefined = getBrowserStorage()) {
  if (!storage) return [];
  try {
    const raw = storage.getItem(SEARCH_HISTORY_KEY);
    return cleanHistory(raw ? JSON.parse(raw) : []);
  } catch {
    return [];
  }
}

function writeSearchHistory(history: string[], storage: StorageLike | undefined = getBrowserStorage()) {
  const next = cleanHistory(history);
  if (!storage) return next;
  try {
    storage.setItem(SEARCH_HISTORY_KEY, JSON.stringify(next));
    if (typeof window !== "undefined") window.dispatchEvent(new Event(SEARCH_HISTORY_EVENT));
  } catch {
    // Private browsing and storage quotas should not prevent searching.
  }
  return next;
}

export function rememberSearchQuery(query: string, storage?: StorageLike) {
  const value = query.trim();
  if (!value) return readSearchHistory(storage);
  const history = readSearchHistory(storage).filter((item) => item.toLocaleLowerCase("ko-KR") !== value.toLocaleLowerCase("ko-KR"));
  return writeSearchHistory([value, ...history], storage);
}

export function removeSearchHistoryItem(query: string, storage?: StorageLike) {
  const key = query.trim().toLocaleLowerCase("ko-KR");
  return writeSearchHistory(readSearchHistory(storage).filter((item) => item.toLocaleLowerCase("ko-KR") !== key), storage);
}

export function clearSearchHistory(storage?: StorageLike) {
  const next = writeSearchHistory([], storage);
  try {
    storage?.removeItem(SEARCH_HISTORY_KEY);
  } catch {
    // Ignore storage failures; the in-memory UI still clears.
  }
  return next;
}
