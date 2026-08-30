const STORAGE_KEY = "ai-guide-k-skill-favorites";

export function readKSkillFavorites(): string[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed.filter((value): value is string => typeof value === "string") : [];
  } catch {
    return [];
  }
}

export function toggleKSkillFavorite(slug: string, favorites: string[]) {
  const next = favorites.includes(slug) ? favorites.filter((item) => item !== slug) : [...favorites, slug];
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(next)); } catch {}
  return next;
}

export function clearKSkillFavorites() {
  try { localStorage.removeItem(STORAGE_KEY); } catch {}
}
