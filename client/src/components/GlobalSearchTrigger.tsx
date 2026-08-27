import { Clock3, Search, X } from "lucide-react";
import { FormEvent, KeyboardEvent, useEffect, useId, useRef, useState } from "react";
import { useLocation } from "wouter";
import type { SearchRecord } from "@/lib/globalSearch";
import { clearSearchHistory, readSearchHistory, rememberSearchQuery, removeSearchHistoryItem, SEARCH_HISTORY_EVENT } from "@/lib/searchHistory";

type Suggestion = { label: string; record?: SearchRecord; isHistory?: boolean };

export default function GlobalSearchTrigger() {
  const [, navigate] = useLocation();
  const [query, setQuery] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const listId = useId();

  useEffect(() => {
    const syncHistory = () => setHistory(readSearchHistory());
    syncHistory();
    window.addEventListener(SEARCH_HISTORY_EVENT, syncHistory);
    window.addEventListener("storage", syncHistory);
    return () => {
      window.removeEventListener(SEARCH_HISTORY_EVENT, syncHistory);
      window.removeEventListener("storage", syncHistory);
    };
  }, []);

  useEffect(() => {
    let cancelled = false;
    if (!query.trim()) {
      setSuggestions(history.map((item) => ({ label: item, isHistory: true })));
      return () => { cancelled = true; };
    }
    import("@/lib/globalSearch").then(({ getSearchSuggestions }) => {
      if (!cancelled) setSuggestions(getSearchSuggestions(query).map((record) => ({ label: record.title, record })));
    });
    return () => { cancelled = true; };
  }, [history, query]);

  const submit = (value: string) => {
    const next = value.trim();
    if (next) rememberSearchQuery(next);
    setOpen(false);
    setActiveIndex(-1);
    navigate(next ? `/search?q=${encodeURIComponent(next)}` : "/search");
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    submit(activeIndex >= 0 ? suggestions[activeIndex]?.label ?? query : query);
  };

  const onKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "ArrowDown" && suggestions.length) {
      event.preventDefault();
      setOpen(true);
      setActiveIndex((current) => (current + 1) % suggestions.length);
    } else if (event.key === "ArrowUp" && suggestions.length) {
      event.preventDefault();
      setOpen(true);
      setActiveIndex((current) => (current <= 0 ? suggestions.length - 1 : current - 1));
    } else if (event.key === "Escape") {
      setOpen(false);
      setActiveIndex(-1);
    }
  };

  return <div className="global-search-trigger-wrap">
    <form className="global-search-trigger" role="search" onSubmit={onSubmit}>
      <Search size={16} aria-hidden="true" />
      <input
        ref={inputRef}
        value={query}
        onChange={(event) => { setQuery(event.target.value); setOpen(true); setActiveIndex(-1); }}
        onFocus={() => setOpen(true)}
        onKeyDown={onKeyDown}
        placeholder="전체 검색"
        aria-label="전체 콘텐츠 검색"
        aria-controls={open && suggestions.length ? listId : undefined}
        aria-expanded={open && suggestions.length > 0}
        aria-activedescendant={activeIndex >= 0 ? `${listId}-${activeIndex}` : undefined}
        autoComplete="off"
      />
      <button type="submit" aria-label="전체 검색 실행"><Search size={15} /></button>
    </form>
    {open && suggestions.length > 0 && <div id={listId} className="global-search-suggestions" role="listbox" aria-label={query.trim() ? "검색어 자동완성" : "최근 검색어"}>
      <div className="global-search-suggestions-head"><span>{query.trim() ? "추천 검색어" : "최근 검색어"}</span>{!query.trim() && <button type="button" onMouseDown={(event) => event.preventDefault()} onClick={() => { clearSearchHistory(); setHistory([]); }} disabled={!history.length}>전체 삭제</button>}</div>
      {suggestions.map((suggestion, index) => <div
        id={`${listId}-${index}`}
        key={`${suggestion.isHistory ? "history" : suggestion.record?.id}-${suggestion.label}`}
        className={`global-search-suggestion ${index === activeIndex ? "is-active" : ""}`}
        role="option"
        aria-selected={index === activeIndex}
        onMouseDown={(event) => event.preventDefault()}
        onMouseEnter={() => setActiveIndex(index)}
        onClick={() => submit(suggestion.label)}
      >
        {suggestion.isHistory ? <Clock3 size={14} aria-hidden="true" /> : <Search size={14} aria-hidden="true" />}
        <span className="global-search-suggestion-copy"><strong>{suggestion.label}</strong>{suggestion.record && <small>{suggestion.record.kind} · {suggestion.record.meta}</small>}</span>
        {suggestion.isHistory && <button type="button" className="global-search-suggestion-remove" aria-label={`${suggestion.label} 최근 검색어 삭제`} onMouseDown={(event) => event.stopPropagation()} onClick={(event) => { event.stopPropagation(); setHistory(removeSearchHistoryItem(suggestion.label)); }}><X size={14} /></button>}
      </div>)}
      <p className="global-search-suggestions-hint">↑↓ 이동 · Enter 검색 · Esc 닫기</p>
    </div>}
  </div>;
}
