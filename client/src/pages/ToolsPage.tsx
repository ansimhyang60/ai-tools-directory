import { useMemo, useState } from "react";
import { ArrowUpRight, Check, Filter, Search, SlidersHorizontal, X } from "lucide-react";
import { Link } from "wouter";
import { expandedCatalog, type CatalogTool } from "@/lib/expandedCatalog";
import { tools, type Tool } from "@/lib/tools";
import { PageFrame } from "./GuidePages";

const popularToolTags = ["무료", "GitHub", "Futurepedia", "AI 모델", "자동화", "이미지", "개발", "리서치"];
const curatedCategories = ["전체", "범용 AI", "업무자동화", "바이브코딩", "UI/UX", "이미지", "영상", "문서·리서치", "데이터", "마케팅"];

function sourceLabel(source: string) {
  if (source.toLowerCase().includes("github")) return "GitHub 공개 저장소";
  if (source.toLowerCase().includes("futurepedia")) return "Futurepedia 공개 디렉터리";
  return "기타 공개 기록";
}

function ToolListRow({ tool, index }: { tool: CatalogTool; index: number }) {
  return <a className="standalone-tool-row" href={tool.url} target="_blank" rel="noreferrer"><span className="standalone-tool-index">{String(index + 1).padStart(3, "0")}</span><span className="standalone-tool-marker" /><span className="standalone-tool-main"><strong>{tool.name}</strong><small>{tool.note === "✅" ? "공개 목록에 확인된 도구" : tool.note}</small></span><span className="standalone-tool-category">{tool.category}</span><span className="standalone-tool-price">{tool.pricing}</span><span className="standalone-tool-source">{sourceLabel(tool.source)}</span><ArrowUpRight size={17} /></a>;
}

function CuratedToolRow({ tool, index }: { tool: Tool; index: number }) {
  return <a className="standalone-tool-row curated-tool-row" href={tool.url ?? "#"} target={tool.url ? "_blank" : undefined} rel={tool.url ? "noreferrer" : undefined}><span className="standalone-tool-index">{String(index + 1).padStart(3, "0")}</span><span className="standalone-tool-marker" /><span className="standalone-tool-main"><strong>{tool.name}</strong><small>{tool.summary}</small></span><span className="standalone-tool-category">{tool.category}</span><span className="standalone-tool-price">{tool.difficulty}</span><span className="standalone-tool-source">AI/100 추천</span><ArrowUpRight size={17} /></a>;
}

export default function ToolsPage() {
  const [dataset, setDataset] = useState<"public" | "curated">("public");
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("전체");
  const [pricing, setPricing] = useState("전체");
  const [source, setSource] = useState("전체");
  const [tag, setTag] = useState("");

  const publicCategories = useMemo(() => ["전체", ...Array.from(new Set(expandedCatalog.map((tool) => tool.category))).sort()], []);
  const pricingOptions = useMemo(() => ["전체", ...Array.from(new Set(expandedCatalog.map((tool) => tool.pricing))).sort()], []);
  const sourceOptions = ["전체", "GitHub 공개 저장소", "Futurepedia 공개 디렉터리", "기타 공개 기록"];
  const curated = useMemo(() => { const term = query.trim().toLowerCase(); return tools.filter((tool) => { const haystack = [tool.name, tool.category, tool.role, tool.summary, tool.example, ...tool.tags].join(" ").toLowerCase(); return (!term || haystack.includes(term)) && (category === "전체" || tool.category === category); }); }, [category, query]);
  const publicTools = useMemo(() => { const term = query.trim().toLowerCase(); return expandedCatalog.filter((tool) => { const haystack = [tool.name, tool.category, tool.pricing, tool.note, tool.source, ...tool.tags].join(" ").toLowerCase(); return (!term || haystack.includes(term)) && (category === "전체" || tool.category === category) && (pricing === "전체" || tool.pricing === pricing) && (source === "전체" || sourceLabel(tool.source) === source); }); }, [category, pricing, query, source]);
  const visibleCount = dataset === "public" ? publicTools.length : curated.length;
  const activeFilterCount = [query, category !== "전체" ? category : "", dataset === "public" && pricing !== "전체" ? pricing : "", dataset === "public" && source !== "전체" ? source : ""].filter(Boolean).length;
  const reset = () => { setQuery(""); setCategory("전체"); setPricing("전체"); setSource("전체"); setTag(""); };
  const chooseTag = (next: string) => { setTag(next); setQuery(next); setDataset("public"); setCategory("전체"); setPricing("전체"); setSource(next === "GitHub" ? "GitHub 공개 저장소" : next === "Futurepedia" ? "Futurepedia 공개 디렉터리" : "전체"); };

  return <PageFrame active="/tools" kicker="TOOL DIRECTORY / SEARCH FIRST" title={<>필요한 도구를<br /><em>찾아보세요.</em></>}><div className="tools-page"><div className="tools-location"><Link href="/">AI/100 홈</Link><span>›</span><strong>도구 찾기</strong></div><section className="tools-intro"><div><span className="workflow-kicker"><SlidersHorizontal size={15} /> 도구 찾기</span><h2>업무를 고른 뒤,<br /><em>도구를 비교하세요.</em></h2><p>추천 도구와 공개 카탈로그를 분리했습니다. 공개 카탈로그의 분류·가격·출처 필터는 현재 선택한 데이터셋에만 적용됩니다.</p></div><div className="tools-count"><strong>{visibleCount}</strong><span>{dataset === "public" ? "공개 카탈로그 결과" : "AI/100 추천 결과"}</span></div></section><section className="tools-search-panel"><label className="tools-search"><Search size={20} /><input value={query} onChange={(event) => { setQuery(event.target.value); setTag(""); }} placeholder="도구 이름, 기능, 태그로 검색하세요" aria-label="도구 검색" /><kbd>⌘ K</kbd>{query && <button onClick={() => { setQuery(""); setTag(""); }} aria-label="검색어 지우기"><X size={16} /></button>}</label><div className="tools-popular-tags"><span>빠른 찾기</span>{popularToolTags.map((item) => <button key={item} className={tag === item ? "is-active" : ""} onClick={() => chooseTag(item)}>{item}</button>)}</div></section><div className="tools-dataset-tabs"><button className={dataset === "public" ? "is-active" : ""} onClick={() => { setDataset("public"); setCategory("전체"); }}>공개 카탈로그 <small>{expandedCatalog.length}</small></button><button className={dataset === "curated" ? "is-active" : ""} onClick={() => { setDataset("curated"); setCategory("전체"); setPricing("전체"); setSource("전체"); }}>추천 도구 <small>{tools.length}</small></button></div><section className="tools-filter-panel"><div className="tools-filter-heading"><span><Filter size={14} /> 현재 데이터셋 필터</span><strong>{activeFilterCount}개 적용</strong><button onClick={reset}>초기화</button></div><div className="tools-filter-row"><label>분류<select value={category} onChange={(event) => setCategory(event.target.value)}>{(dataset === "public" ? publicCategories : curatedCategories).map((item) => <option key={item}>{item}</option>)}</select></label>{dataset === "public" && <><label>가격 상태<select value={pricing} onChange={(event) => setPricing(event.target.value)}>{pricingOptions.map((item) => <option key={item}>{item}</option>)}</select></label><label>출처<select value={source} onChange={(event) => setSource(event.target.value)}>{sourceOptions.map((item) => <option key={item}>{item}</option>)}</select></label></>}</div></section><div className="tools-result-head"><span><strong>{visibleCount}</strong>개 도구 표시</span><small>{dataset === "public" ? "카테고리·가격·출처 조건을 모두 적용" : "AI/100 추천 목록"}</small></div><section className="standalone-tool-list" aria-label="도구 목록">{dataset === "public" ? publicTools.map((tool, index) => <ToolListRow key={tool.id} tool={tool} index={index} />) : curated.map((tool, index) => <CuratedToolRow key={tool.id} tool={tool} index={index} />)}{visibleCount === 0 && <div className="tools-empty"><strong>조건에 맞는 도구가 없습니다.</strong><button onClick={reset}>필터 초기화</button></div>}</section></div></PageFrame>;
}
