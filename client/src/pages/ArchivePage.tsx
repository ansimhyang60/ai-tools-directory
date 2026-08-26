import { ArrowUpRight, CalendarDays, ExternalLink, Loader2, RefreshCw, Search } from "lucide-react";
import { Link } from "wouter";
import { useMemo, useState } from "react";
import { trpc } from "@/lib/trpc";
import { archiveSeed, filterArchiveSeed } from "@/lib/archiveSeed";

const types = [{ value: undefined, label: "전체" }, { value: "contest" as const, label: "공모전" }, { value: "grant" as const, label: "정부지원" }, { value: "exhibition" as const, label: "전시·행사" }, { value: "news" as const, label: "관련 뉴스" }, { value: "case-study" as const, label: "활용사례" }];
const labels: Record<string, string> = { contest: "공모전", grant: "정부지원", exhibition: "전시·행사", news: "뉴스", "case-study": "활용사례" };

export default function ArchivePage() {
  const [type, setType] = useState<(typeof types)[number]["value"]>();
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const input = useMemo(() => ({ type, query: query.trim() || undefined, page, pageSize: 24 }), [type, query, page]);
  const { data, isLoading, isError, refetch } = trpc.archive.list.useQuery(input);
  const apiItems = data?.items ?? [];
  const fallbackItems = filterArchiveSeed(archiveSeed, type, query);
  const visibleItems = apiItems.length ? apiItems : fallbackItems;
  const showingFallback = !apiItems.length;
  return <main className="site-shell inner-page archive-page">
    <header className="topbar"><Link className="brand" href="/"><span className="brand-stamp"><span className="stamp-slash">/</span><span className="stamp-main">AI<span>100</span></span><span className="stamp-caption">FIELD<br />GUIDE</span></span></Link><nav className="topnav"><Link href="/workflows">업무 찾기</Link><Link href="/tools">도구 찾기</Link><Link href="/skills">스킬 라이브러리</Link><Link className="active" href="/archive">기회·뉴스</Link></nav><Link className="back-home" href="/"><ArrowUpRight size={15} /> 홈</Link></header>
    <section className="inner-hero archive-hero"><div><span className="section-kicker">AI OPPORTUNITY / LIVE ARCHIVE</span><h1>공모전부터<br /><em>활용사례까지.</em></h1><p>공식 기관의 AI 공모전·정부지원·전시·뉴스·활용사례를 원문 링크와 함께 모읍니다. 새 항목은 자동 갱신됩니다.</p></div><div className="archive-hero-stamp"><strong>{data?.total ?? archiveSeed.length}</strong><span>indexed<br />records</span></div></section>
    <section className="archive-workspace"><aside className="archive-filter-rail"><span className="atlas-label">INDEX / 05 STREAMS</span><h2>찾고 싶은<br /><em>기회.</em></h2><label className="archive-search"><Search size={16} /><input value={query} onChange={(event) => { setQuery(event.target.value); setPage(1); }} placeholder="키워드·기관 검색" aria-label="아카이브 검색" /></label><div className="archive-type-list">{types.map((item) => <button key={item.label} className={type === item.value ? "is-active" : ""} onClick={() => { setType(item.value); setPage(1); }}>{item.label}<span>{type === item.value ? "●" : "○"}</span></button>)}</div><p className="archive-source-note">공식 원문 중심 · 자동 중복 제거 · 마감일은 확인된 경우만 표시</p></aside>
      <div className="archive-canvas"><div className="archive-canvas-head"><span className="atlas-label">{isLoading ? "SYNCING / FETCHING" : `${showingFallback ? "STATIC FALLBACK" : "RESULT"} / ${data?.total ?? visibleItems.length}`}</span><button className="text-action" onClick={() => refetch()} disabled={isLoading}>{isLoading ? <Loader2 className="spin" size={15} /> : <RefreshCw size={15} />} 새로고침</button></div>{isError && <div className="archive-inline-warning">최신 API 연결이 지연되어 검수된 정적 기록을 먼저 표시합니다. <button onClick={() => refetch()}>다시 시도</button></div>}{isLoading && !visibleItems.length ? <div className="archive-state"><Loader2 className="spin" size={24} /><strong>공식 출처를 확인하는 중입니다.</strong><p>최신 목록을 정리하고 있습니다.</p></div> : visibleItems.length ? <div className="archive-list">{visibleItems.map((item) => <article className="archive-card" key={item.id}><div className="archive-card-meta"><span>{labels[item.type] ?? item.type}</span><span>{item.organization ?? item.sourceDomain}</span></div><h3>{item.title}</h3><p>{item.summary}</p><div className="archive-card-foot"><span><CalendarDays size={14} />{item.publishedAt ? new Date(item.publishedAt).toLocaleDateString("ko-KR") : "날짜 미상"}</span><a href={item.sourceUrl} target="_blank" rel="noreferrer">원문 바로가기 <ExternalLink size={14} /></a></div></article>)}</div> : <div className="archive-state"><strong>아직 조건에 맞는 기록이 없습니다.</strong><p>검색어를 지우거나 다른 유형을 선택해 보세요.</p></div>}{data && data.pages > 1 && <nav className="archive-pagination" aria-label="아카이브 페이지 이동"><button type="button" disabled={page <= 1} onClick={() => setPage((current) => Math.max(1, current - 1))}>이전</button><span>{page} / {data.pages}</span><button type="button" disabled={page >= data.pages} onClick={() => setPage((current) => Math.min(data.pages, current + 1))}>다음</button></nav>}</div></section>
  </main>;
}
