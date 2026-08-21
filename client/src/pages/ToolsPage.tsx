import { useMemo, useState } from "react";
import { ArrowUpRight, Check, Filter, Search, SlidersHorizontal, X } from "lucide-react";
import { Link } from "wouter";
import { expandedCatalog, type CatalogTool } from "@/lib/expandedCatalog";
import { tools, type Tool } from "@/lib/tools";
import { PageFrame } from "./GuidePages";

const popularToolTags = ["무료", "GitHub", "Futurepedia", "AI 모델", "자동화", "이미지", "개발", "리서치"];

type ToolProfile = { name: string; category: string; role: string; recommend: string; example: string; prompt: string; url: string; related: string };
const toolProfiles: ToolProfile[] = [
  { name: "GPT / ChatGPT", category: "범용 AI", role: "문서·메일·분석·아이디어를 빠르게 초안으로 만드는 범용 작업 파트너", recommend: "처음 AI를 업무에 적용하거나 여러 작업을 한 도구에서 시작할 때", example: "고객 40명의 제품·도래일·담당자 정보를 표로 주고 개인화 메일 초안 만들기", prompt: "역할: 업무 보조자\n자료: 아래 표\n요청: 고객별 메일 초안을 표로 작성\n제약: 없는 정보는 추측하지 않기\n결과: 제목·본문·확인 필요 항목", url: "https://chatgpt.com", related: "문서 요약 · 데이터 분석 · 메일 초안" },
  { name: "Claude", category: "범용 AI", role: "긴 문서·기획서·코드베이스를 읽고 구조화하는 분석 파트너", recommend: "긴 자료를 비교하거나 코드·정책·매뉴얼의 논리를 검토할 때", example: "서비스 요구사항과 기존 코드 구조를 비교해 누락된 기능과 위험을 표로 만들기", prompt: "이 문서의 목적·핵심 규칙·예외·확인 질문을 분리하고, 근거 문장을 함께 표시해줘.", url: "https://claude.ai", related: "문서 검토 · 코드 리뷰 · 기획 정리" },
  { name: "Google Antigravity", category: "업무자동화·개발", role: "아이디어를 여러 단계의 에이전트 작업과 프로토타입으로 연결하는 실행 도구", recommend: "화면·데이터·기능을 함께 시험하는 앱 프로토타입을 만들 때", example: "Firebase 데이터 구조와 화면 요구를 설명하고 로그인·목록·상세 흐름을 작은 단위로 구현하기", prompt: "먼저 파일 구조와 구현 순서를 제안하고, 각 단계가 끝날 때 테스트 방법과 다음 승인 질문을 보여줘.", url: "https://antigravity.google", related: "바이브코딩 · 앱 프로토타입 · Firebase" },
  { name: "Codex", category: "바이브코딩", role: "코드베이스를 읽고 기능 추가·테스트·버그 수정을 수행하는 개발 파트너", recommend: "이미 있는 웹앱을 안전하게 수정하거나 반복 테스트할 때", example: "검색 필터의 조건 누락을 재현하고 원인 파일·수정안·테스트 결과를 함께 제시하기", prompt: "변경 전 영향을 받는 파일과 완료 조건을 먼저 설명하고, 작은 수정 후 타입 검사와 테스트를 실행해줘.", url: "https://chatgpt.com/codex", related: "코드 수정 · 테스트 · 배포 준비" },
  { name: "Google Stitch", category: "UI/UX", role: "말이나 참고 이미지를 화면 구조·UI 시안으로 바꾸는 디자인 탐색 도구", recommend: "개발 전에 홈페이지·앱의 첫 화면과 사용자 흐름을 시각화할 때", example: "소개팅 앱의 온보딩·프로필·매칭 화면을 같은 디자인 규칙으로 시안 만들기", prompt: "대상 사용자는 비개발자이고, 화면마다 목표·주요 버튼·다음 이동을 설명한 뒤 모바일 시안을 만들어줘.", url: "https://stitch.withgoogle.com", related: "UI 참고 · 와이어프레임 · 사용자 흐름" },
  { name: "Manus", category: "업무자동화", role: "리서치·문서·웹사이트·자료 정리를 계획부터 결과물까지 연결하는 실행 파트너", recommend: "조사와 정리뿐 아니라 실제 문서·페이지 결과물까지 만들 때", example: "경쟁사 자료를 조사하고 출처표·비교표·발표용 요약 페이지로 정리하기", prompt: "목표와 결과 형식을 먼저 확인하고, 출처·진행상태·사람이 승인할 지점을 표시하며 작업해줘.", url: "https://manus.im", related: "리서치 · 문서 자동화 · 웹 제작" },
  { name: "NotebookLM", category: "문서·리서치", role: "내가 넣은 PDF·문서·자료를 기준으로 질문·요약·비교하는 자료 전용 도구", recommend: "외부 지식보다 내 회사 문서나 학습 자료를 기준으로 답을 얻을 때", example: "업무 매뉴얼 5개를 넣고 공통 규칙·충돌 규정·신입용 질문 목록 만들기", prompt: "업로드한 자료 안에서만 답하고, 답의 근거 문서와 페이지를 표시해줘. 자료에 없으면 없다고 말해줘.", url: "https://notebooklm.google.com", related: "문서 요약 · 매뉴얼 학습 · 출처 확인" },
  { name: "Canva", category: "디자인·마케팅", role: "발표·카드뉴스·배너·브랜드 화면을 빠르게 시각화하는 디자인 도구", recommend: "복잡한 내용을 발표자료·홍보물·SNS 콘텐츠로 바꿀 때", example: "업무 자동화 전후 과정을 5장 발표 슬라이드와 인스타 카드뉴스로 변환하기", prompt: "대상은 비개발자 모임이고, 한 장에 한 메시지만 담아 제목·본문·시각 요소·CTA를 구성해줘.", url: "https://www.canva.com", related: "UI 참고 · 발표자료 · 콘텐츠 제작" },
];
const curatedCategories = ["전체", "범용 AI", "업무자동화", "바이브코딩", "UI/UX", "이미지", "영상", "문서·리서치", "데이터", "마케팅"];

function sourceLabel(source: string) {
  if (source.toLowerCase().includes("github")) return "GitHub 공개 저장소";
  if (source.toLowerCase().includes("futurepedia")) return "Futurepedia 공개 디렉터리";
  return "기타 공개 기록";
}

function ToolListRow({ tool, index }: { tool: CatalogTool; index: number }) {
  return <a className="standalone-tool-row" href={tool.url} target="_blank" rel="noreferrer"><span className="standalone-tool-index">{String(index + 1).padStart(3, "0")}</span><span className="standalone-tool-marker" /><span className="standalone-tool-main"><strong>{tool.name}</strong><small>{tool.note === "✅" ? "공개 목록에 확인된 도구" : tool.note}</small></span><span className="standalone-tool-category">{tool.category}</span><span className="standalone-tool-price">{tool.pricing}</span><span className="standalone-tool-source">{sourceLabel(tool.source)}</span><ArrowUpRight size={17} /></a>;
}

function ToolProfileCard({ profile }: { profile: ToolProfile }) {
  return <article className="tool-profile-card"><div className="tool-profile-top"><span>{profile.category}</span><a href={profile.url} target="_blank" rel="noreferrer" aria-label={`${profile.name} 공식 사이트 열기`}><ArrowUpRight size={16} /></a></div><h3>{profile.name}</h3><p className="tool-profile-role">{profile.role}</p><div className="tool-profile-section"><span>이럴 때 추천</span><p>{profile.recommend}</p></div><div className="tool-profile-section"><span>활용 예시</span><p>{profile.example}</p></div><details><summary>예시 프롬프트 보기</summary><p className="tool-profile-prompt">{profile.prompt}</p></details><div className="tool-profile-related"><span>연결 주제</span><strong>{profile.related}</strong></div></article>;
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

  return <PageFrame active="/tools" kicker="TOOL DIRECTORY / SEARCH FIRST" title={<>필요한 도구를<br /><em>찾아보세요.</em></>}><div className="tools-page"><div className="tools-location"><Link href="/">AI/100 홈</Link><span>›</span><strong>도구 찾기</strong></div><section className="tools-intro"><div><span className="workflow-kicker"><SlidersHorizontal size={15} /> 도구 찾기</span><h2>업무를 고른 뒤,<br /><em>도구를 비교하세요.</em></h2><p>추천 도구와 공개 카탈로그를 분리했습니다. 공개 카탈로그의 분류·가격·출처 필터는 현재 선택한 데이터셋에만 적용됩니다.</p></div><div className="tools-count"><strong>{visibleCount}</strong><span>{dataset === "public" ? "공개 카탈로그 결과" : "AI/100 추천 결과"}</span></div></section><section className="tool-profile-section-wrap"><div className="tool-profile-heading"><div><span>AI TOOL ROLES / START HERE</span><h2>도구의 이름보다<br /><em>역할부터 이해하세요.</em></h2></div><p>도구 찾기는 ‘무슨 도구인가’를 설명합니다. 스킬 라이브러리는 ‘그 도구로 일하는 방법’을 단계별로 제공합니다.</p></div><div className="tool-profile-grid">{toolProfiles.map((profile) => <ToolProfileCard key={profile.name} profile={profile} />)}</div><Link className="tool-skill-bridge" href="/skills">도구에 적용할 스킬과 플레이북 보기 <ArrowUpRight size={15} /></Link></section><section className="tools-search-panel"><label className="tools-search"><Search size={20} /><input value={query} onChange={(event) => { setQuery(event.target.value); setTag(""); }} placeholder="도구 이름, 기능, 태그로 검색하세요" aria-label="도구 검색" /><kbd>⌘ K</kbd>{query && <button onClick={() => { setQuery(""); setTag(""); }} aria-label="검색어 지우기"><X size={16} /></button>}</label><div className="tools-popular-tags"><span>빠른 찾기</span>{popularToolTags.map((item) => <button key={item} className={tag === item ? "is-active" : ""} onClick={() => chooseTag(item)}>{item}</button>)}</div></section><div className="tools-dataset-tabs"><button className={dataset === "public" ? "is-active" : ""} onClick={() => { setDataset("public"); setCategory("전체"); }}>공개 카탈로그 <small>{expandedCatalog.length}</small></button><button className={dataset === "curated" ? "is-active" : ""} onClick={() => { setDataset("curated"); setCategory("전체"); setPricing("전체"); setSource("전체"); }}>추천 도구 <small>{tools.length}</small></button></div><section className="tools-filter-panel"><div className="tools-filter-heading"><span><Filter size={14} /> 현재 데이터셋 필터</span><strong>{activeFilterCount}개 적용</strong><button onClick={reset}>초기화</button></div><div className="tools-filter-row"><label>분류<select value={category} onChange={(event) => setCategory(event.target.value)}>{(dataset === "public" ? publicCategories : curatedCategories).map((item) => <option key={item}>{item}</option>)}</select></label>{dataset === "public" && <><label>가격 상태<select value={pricing} onChange={(event) => setPricing(event.target.value)}>{pricingOptions.map((item) => <option key={item}>{item}</option>)}</select></label><label>출처<select value={source} onChange={(event) => setSource(event.target.value)}>{sourceOptions.map((item) => <option key={item}>{item}</option>)}</select></label></>}</div></section><div className="tools-result-head"><span><strong>{visibleCount}</strong>개 도구 표시</span><small>{dataset === "public" ? "카테고리·가격·출처 조건을 모두 적용" : "AI/100 추천 목록"}</small></div><section className="standalone-tool-list" aria-label="도구 목록">{dataset === "public" ? publicTools.map((tool, index) => <ToolListRow key={tool.id} tool={tool} index={index} />) : curated.map((tool, index) => <CuratedToolRow key={tool.id} tool={tool} index={index} />)}{visibleCount === 0 && <div className="tools-empty"><strong>조건에 맞는 도구가 없습니다.</strong><button onClick={reset}>필터 초기화</button></div>}</section></div></PageFrame>;
}
