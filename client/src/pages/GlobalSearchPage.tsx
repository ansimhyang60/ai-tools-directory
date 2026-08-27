import { ArrowUpRight, Clock3, Search, X } from "lucide-react";
import { FormEvent, KeyboardEvent, useEffect, useId, useMemo, useRef, useState } from "react";
import { Link, useLocation } from "wouter";
import { filterSearchRecords, getSearchCounts, getSearchSuggestions, getSearchTrustLabel, type SearchFilter, type SearchRecord, type SearchSort } from "@/lib/globalSearch";
import { clearSearchHistory, readSearchHistory, rememberSearchQuery, removeSearchHistoryItem, SEARCH_HISTORY_EVENT } from "@/lib/searchHistory";
import { PageFrame } from "./GuideShared";

const filters: SearchFilter[] = ["전체", "AI 도구", "SKILL", "UI Guide", "디자인 시스템", "워크플로우", "프롬프트", "아카이브"];
const sorts: { value: SearchSort; label: string }[] = [
  { value: "relevance", label: "관련도순" },
  { value: "popular", label: "인기순" },
  { value: "recent", label: "최신순" },
  { value: "trust", label: "신뢰도순" },
];

type Suggestion = { label: string; record?: SearchRecord; isHistory?: boolean };

function formatDate(value?: string) {
  if (!value) return "업데이트 날짜 미등록";
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? "업데이트 날짜 미등록" : `확인 ${date.toLocaleDateString("ko-KR")}`;
}

function ResultCard({ item }: { item: SearchRecord }) {
  return <Link className="global-search-result" href={item.href}>
    <div className="global-search-result-top"><span className={`global-search-kind kind-${item.kind.replace(/[^a-zA-Z가-힣]/g, "-")}`}>{item.kind}</span><span className="global-search-meta">{item.meta}</span></div>
    <h2>{item.title}</h2>
    <p>{item.summary}</p>
    <div className="global-search-result-foot"><span>{item.source ?? "AI/100 FIELD GUIDE"}</span><span className="global-search-trust">{getSearchTrustLabel(item.trustScore)} · {formatDate(item.updatedAt)}</span><ArrowUpRight size={16} /></div>
  </Link>;
}

export function GlobalSearchPage() {
  const [location, navigate] = useLocation();
  const queryFromUrl = useMemo(() => new URLSearchParams(location.split("?")[1] ?? "").get("q") ?? "", [location]);
  const [query, setQuery] = useState(queryFromUrl);
  const [filter, setFilter] = useState<SearchFilter>("전체");
  const [sort, setSort] = useState<SearchSort>("relevance");
  const [history, setHistory] = useState<string[]>([]);
  const [suggestionsOpen, setSuggestionsOpen] = useState(false);
  const [activeSuggestion, setActiveSuggestion] = useState(-1);
  const searchBoxRef = useRef<HTMLDivElement>(null);
  const listId = useId();

  useEffect(() => setQuery(queryFromUrl), [queryFromUrl]);

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
    const closeOnOutsideClick = (event: MouseEvent) => {
      if (!searchBoxRef.current?.contains(event.target as Node)) setSuggestionsOpen(false);
    };
    document.addEventListener("mousedown", closeOnOutsideClick);
    return () => document.removeEventListener("mousedown", closeOnOutsideClick);
  }, []);

  const suggestions: Suggestion[] = query.trim()
    ? getSearchSuggestions(query).map((record) => ({ label: record.title, record }))
    : history.map((item) => ({ label: item, isHistory: true }));
  const results = useMemo(() => filterSearchRecords(query, filter, sort), [query, filter, sort]);
  const counts = useMemo(() => getSearchCounts(query), [query]);
  const total = filterSearchRecords("").length;

  const commitQuery = (value: string) => {
    const next = value.trim();
    if (next) rememberSearchQuery(next);
    setQuery(next);
    setSuggestionsOpen(false);
    setActiveSuggestion(-1);
    navigate(next ? `/search?q=${encodeURIComponent(next)}` : "/search");
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    commitQuery(activeSuggestion >= 0 ? suggestions[activeSuggestion]?.label ?? query : query);
  };

  const onKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "ArrowDown" && suggestions.length) {
      event.preventDefault();
      setSuggestionsOpen(true);
      setActiveSuggestion((current) => (current + 1) % suggestions.length);
    } else if (event.key === "ArrowUp" && suggestions.length) {
      event.preventDefault();
      setSuggestionsOpen(true);
      setActiveSuggestion((current) => (current <= 0 ? suggestions.length - 1 : current - 1));
    } else if (event.key === "Escape") {
      setSuggestionsOpen(false);
      setActiveSuggestion(-1);
    }
  };

  return <PageFrame active="" kicker="GLOBAL INDEX / SEARCH EVERYTHING" title={<>찾고 싶은 것을<br /><em>한 번에 찾기.</em></>}>
    <section className="global-search-hero" aria-labelledby="global-search-title">
      <div className="global-search-hero-copy"><span className="section-kicker">SEARCH ACROSS THE FIELD GUIDE</span><h2 id="global-search-title">도구만 찾지 말고,<br /><em>일의 맥락까지.</em></h2><p>AI 도구, SKILL, UI Guide, 디자인 시스템, 업무 워크플로우와 프롬프트, 공식 아카이브를 한 번에 검색합니다.</p></div>
      <div className="global-search-stat"><strong>{total.toLocaleString("ko-KR")}</strong><span>indexed records</span></div>
    </section>
    <section className="global-search-workspace" aria-label="전체 콘텐츠 검색">
      <div className="global-search-input-wrap" ref={searchBoxRef}>
        <form className="global-search-input" role="search" onSubmit={onSubmit}>
          <Search size={22} aria-hidden="true" />
          <input autoFocus value={query} onChange={(event) => { setQuery(event.target.value); setSuggestionsOpen(true); setActiveSuggestion(-1); }} onFocus={() => setSuggestionsOpen(true)} onKeyDown={onKeyDown} placeholder="예: NotebookLM, 재고, CTA, 프롬프트, 접근성…" aria-label="전체 콘텐츠 검색어" aria-controls={suggestionsOpen && suggestions.length ? listId : undefined} aria-expanded={suggestionsOpen && suggestions.length > 0} aria-activedescendant={activeSuggestion >= 0 ? `${listId}-${activeSuggestion}` : undefined} autoComplete="off" />
          <kbd>⌘ K</kbd>
          {query && <button type="button" onClick={() => { setQuery(""); setSuggestionsOpen(true); setActiveSuggestion(-1); }} aria-label="검색어 지우기"><X size={16} /></button>}
        </form>
        {suggestionsOpen && suggestions.length > 0 && <div id={listId} className="global-search-suggestions global-search-suggestions-large" role="listbox" aria-label={query.trim() ? "검색어 자동완성" : "최근 검색어"}>
          <div className="global-search-suggestions-head"><span>{query.trim() ? "추천 검색어" : "최근 검색어"}</span>{!query.trim() && <button type="button" onClick={() => { clearSearchHistory(); setHistory([]); }} disabled={!history.length}>전체 삭제</button>}</div>
          {suggestions.map((suggestion, index) => <div id={`${listId}-${index}`} key={`${suggestion.isHistory ? "history" : suggestion.record?.id}-${suggestion.label}`} className={`global-search-suggestion ${index === activeSuggestion ? "is-active" : ""}`} role="option" aria-selected={index === activeSuggestion} onMouseEnter={() => setActiveSuggestion(index)} onClick={() => commitQuery(suggestion.label)}>
            {suggestion.isHistory ? <Clock3 size={15} aria-hidden="true" /> : <Search size={15} aria-hidden="true" />}
            <span className="global-search-suggestion-copy"><strong>{suggestion.label}</strong>{suggestion.record && <small>{suggestion.record.kind} · {suggestion.record.meta}</small>}</span>
            {suggestion.isHistory && <button type="button" className="global-search-suggestion-remove" aria-label={`${suggestion.label} 최근 검색어 삭제`} onClick={(event) => { event.stopPropagation(); setHistory(removeSearchHistoryItem(suggestion.label)); }}><X size={14} /></button>}
          </div>)}
          <p className="global-search-suggestions-hint">↑↓ 이동 · Enter 검색 · Esc 닫기</p>
        </div>}
      </div>
      <div className="global-search-toolbar"><div className="global-search-filters" role="tablist" aria-label="검색 결과 유형">{filters.map((item) => { const count = counts.find((entry) => entry.label === item)?.count ?? 0; return <button type="button" role="tab" aria-selected={filter === item} key={item} className={filter === item ? "is-active" : ""} onClick={() => setFilter(item)}>{item}<span>{count.toLocaleString("ko-KR")}</span></button>; })}</div><div className="global-search-sort" role="group" aria-label="검색 결과 정렬"><span>정렬</span>{sorts.map((item) => <button key={item.value} type="button" className={sort === item.value ? "is-active" : ""} aria-pressed={sort === item.value} onClick={() => setSort(item.value)}>{item.label}</button>)}</div><span className="global-search-result-count">{results.length.toLocaleString("ko-KR")}개 결과</span></div>
      {results.length ? <div className="global-search-results">{results.slice(0, 120).map((item) => <ResultCard key={item.id} item={item} />)}</div> : <div className="global-search-empty"><span className="global-search-empty-mark">?</span><h2>아직 찾지 못했어요.</h2><p>검색어를 조금 넓히거나 ‘전체’를 선택해 다른 콘텐츠 층위를 확인해 보세요.</p><button type="button" className="secondary-action" onClick={() => { setQuery(""); setFilter("전체"); setSort("relevance"); navigate("/search"); }}>검색 초기화</button></div>}
      {results.length > 120 && <p className="global-search-limit">결과가 많아 처음 120개만 표시합니다. 키워드를 더 구체적으로 입력해 보세요.</p>}
    </section>
  </PageFrame>;
}
