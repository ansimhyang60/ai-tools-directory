import { ArrowUpRight, Search, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Link, useLocation } from "wouter";
import { filterSearchRecords, getSearchCounts, type SearchFilter, type SearchRecord } from "@/lib/globalSearch";
import { PageFrame } from "./GuideShared";

const filters: SearchFilter[] = ["전체", "AI 도구", "SKILL", "UI Guide", "디자인 시스템", "워크플로우", "프롬프트", "아카이브"];

function ResultCard({ item }: { item: SearchRecord }) {
  return <Link className="global-search-result" href={item.href}>
    <div className="global-search-result-top"><span className={`global-search-kind kind-${item.kind.replace(/[^a-zA-Z가-힣]/g, "-")}`}>{item.kind}</span><span className="global-search-meta">{item.meta}</span></div>
    <h2>{item.title}</h2>
    <p>{item.summary}</p>
    <div className="global-search-result-foot"><span>{item.source ?? "AI/100 FIELD GUIDE"}</span><ArrowUpRight size={16} /></div>
  </Link>;
}

export function GlobalSearchPage() {
  const [location] = useLocation();
  const queryFromUrl = useMemo(() => new URLSearchParams(location.split("?")[1] ?? "").get("q") ?? "", [location]);
  const [query, setQuery] = useState(queryFromUrl);
  const [filter, setFilter] = useState<SearchFilter>("전체");

  useEffect(() => setQuery(queryFromUrl), [queryFromUrl]);

  const results = useMemo(() => filterSearchRecords(query, filter), [query, filter]);
  const counts = useMemo(() => getSearchCounts(query), [query]);
  const total = filterSearchRecords("").length;

  return <PageFrame active="" kicker="GLOBAL INDEX / SEARCH EVERYTHING" title={<>찾고 싶은 것을<br /><em>한 번에 찾기.</em></>}>
    <section className="global-search-hero" aria-labelledby="global-search-title">
      <div className="global-search-hero-copy"><span className="section-kicker">SEARCH ACROSS THE FIELD GUIDE</span><h2 id="global-search-title">도구만 찾지 말고,<br /><em>일의 맥락까지.</em></h2><p>AI 도구, SKILL, UI Guide, 디자인 시스템, 업무 워크플로우와 프롬프트, 공식 아카이브를 한 번에 검색합니다.</p></div>
      <div className="global-search-stat"><strong>{total.toLocaleString("ko-KR")}</strong><span>indexed records</span></div>
    </section>
    <section className="global-search-workspace" aria-label="전체 콘텐츠 검색">
      <label className="global-search-input"><Search size={22} /><input autoFocus value={query} onChange={(event) => setQuery(event.target.value)} placeholder="예: NotebookLM, 재고, CTA, 프롬프트, 접근성…" aria-label="전체 콘텐츠 검색어" /><kbd>⌘ K</kbd>{query && <button type="button" onClick={() => setQuery("")} aria-label="검색어 지우기"><X size={16} /></button>}</label>
      <div className="global-search-toolbar"><div className="global-search-filters" role="tablist" aria-label="검색 결과 유형">{filters.map((item) => { const count = counts.find((entry) => entry.label === item)?.count ?? 0; return <button type="button" role="tab" aria-selected={filter === item} key={item} className={filter === item ? "is-active" : ""} onClick={() => setFilter(item)}>{item}<span>{count.toLocaleString("ko-KR")}</span></button>; })}</div><span className="global-search-result-count">{results.length.toLocaleString("ko-KR")}개 결과</span></div>
      {results.length ? <div className="global-search-results">{results.slice(0, 120).map((item) => <ResultCard key={item.id} item={item} />)}</div> : <div className="global-search-empty"><span className="global-search-empty-mark">?</span><h2>아직 찾지 못했어요.</h2><p>검색어를 조금 넓히거나 ‘전체’를 선택해 다른 콘텐츠 층위를 확인해 보세요.</p><button type="button" className="secondary-action" onClick={() => { setQuery(""); setFilter("전체"); }}>검색 초기화</button></div>}
      {results.length > 120 && <p className="global-search-limit">결과가 많아 처음 120개만 표시합니다. 키워드를 더 구체적으로 입력해 보세요.</p>}
    </section>
  </PageFrame>;
}
