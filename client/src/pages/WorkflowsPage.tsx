import { useMemo, useState } from "react";
import { Check, Copy, Filter, Search, Sparkles, Star, X } from "lucide-react";
import { workflowPrompts } from "@/lib/workflows";
import { accountingWorkflowPrompts, advancedBusinessWorkflowPrompts, excelAutomationWorkflowPrompts, extraWorkflowPrompts } from "@/lib/workflowsExtra";
import { PageFrame } from "./GuidePages";

const allWorkflowPrompts = [...workflowPrompts, ...extraWorkflowPrompts, ...accountingWorkflowPrompts, ...excelAutomationWorkflowPrompts, ...advancedBusinessWorkflowPrompts];
const levelById: Record<string, "초급" | "중급" | "고급"> = {
  "mail-automation": "중급", "document-summary": "초급", "csv-analysis": "중급", "webapp-plan": "초급", "ui-design": "초급", "social-content": "초급", "youtube-seo": "초급", "research-brief": "중급", "vba-spec": "중급", "image-model": "고급", "meeting": "초급", "prompt-improve": "초급", "presentation": "초급", "customer-support": "초급", "seo-page": "중급", "release-check": "중급", "notebooklm-study": "초급", "excel-clean-columns": "초급", "excel-duplicate-check": "초급", "excel-merge-sheets": "중급", "excel-xlookup-match": "초급", "excel-date-due-alert": "초급", "excel-reminder-mail-list": "중급", "excel-vba-report": "고급", "excel-pivot-dashboard": "중급", "excel-split-files": "고급", "excel-data-validation": "초급", "excel-csv-import": "중급", "excel-formula-audit": "중급", "excel-inventory-low-stock": "초급", "excel-weekly-summary": "초급",
};
const featuredIds = new Set(["mail-automation", "webapp-plan", "csv-analysis", "ui-design", "document-summary", "sales-analysis", "email-draft"]);
const sourceById: Record<string, string> = Object.fromEntries(allWorkflowPrompts.map((item) => [item.id, "AI/100 공개 프롬프트 카탈로그"]));
const roleByCategory: Record<string, string> = {
  "업무 자동화": "반복 업무를 안전하게 설계하는 업무 자동화 담당자",
  "엑셀 자동화": "엑셀과 데이터 정리를 돕는 실무 자동화 담당자",
  "데이터 분석": "데이터 품질과 근거를 먼저 확인하는 분석가",
  "문서·요약": "핵심 내용을 정확하게 정리하는 문서 편집자",
  "메일·문서": "수신자와 목적에 맞는 업무 문서를 쓰는 비서",
  "공문서·교정": "공식 문서의 사실과 표현을 점검하는 편집자",
  "마케팅·상품": "고객과 채널에 맞는 콘텐츠 기획자",
  "콘텐츠·바이럴": "초보자도 이해하는 콘텐츠 제작 기획자",
};
const inputGuideByCategory: Record<string, string> = {
  "엑셀 자동화": "파일명·시트명·열 이름·기준일·샘플 3~5행·원하는 결과",
  "데이터 분석": "파일명·분석 기간·열 정의·비교 기준·알고 싶은 질문 3개",
  "메일·문서": "수신자·관계·목적·핵심 사실·톤·길이·반드시 넣을 내용",
  "공문서·교정": "문서 종류·독자·원문·법령/정책 기준·변경 금지 항목",
  "마케팅·상품": "타깃·채널·제품 정보·고객 문제·브랜드 톤·금지 표현",
};
const getLevel = (item: (typeof allWorkflowPrompts)[number]): "초급" | "중급" | "고급" => levelById[item.id] || (["CRM", "ERP", "고급 업무 자동화", "재고관리"].includes(item.category) ? "고급" : "초급");
const buildPrompt = (item: (typeof allWorkflowPrompts)[number]) => {
  const role = roleByCategory[item.category] || `${item.category} 업무를 돕는 실무 보조자`;
  const inputs = inputGuideByCategory[item.category] || "업무 목적·대상·현재 상황·사용할 자료·기한·원하는 결과";
  return `역할: 당신은 ${role}입니다. 모르는 내용은 추측하지 말고 확인 질문으로 남겨주세요.\n\n목적: ${item.purpose}\n\n맥락: ${item.background}\n\n입력자료: 다음 정보를 먼저 채워 넣겠습니다 — ${inputs}.\n\n작업 순서:\n1. 입력자료의 누락·형식 오류·서로 맞지 않는 값을 먼저 점검하세요.\n2. 확인된 자료만 사용해 아래 요청을 처리하세요: ${item.request}\n3. 판단이 필요한 부분과 사실로 확인된 부분을 분리하세요.\n4. 결과를 만든 뒤 검수표와 추가 확인 질문을 제시하세요.\n\n제약: ${item.constraints}\n\n결과 형식: ${item.output}\n\n검수 기준: ${item.review}\n\n안전 원칙: ${item.caution}`;
};

export default function WorkflowsPage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("전체");
  const [level, setLevel] = useState("전체");
  const [scope, setScope] = useState("추천");
  const [limit, setLimit] = useState("20");
  const [copied, setCopied] = useState<string | null>(null);
  const [favorites, setFavorites] = useState<string[]>(() => { try { return JSON.parse(localStorage.getItem("ai100-workflow-favorites") || "[]"); } catch { return []; } });
  const [favoriteOnly, setFavoriteOnly] = useState(false);
  const categories = ["전체", ...Array.from(new Set(allWorkflowPrompts.map((item) => item.category)))];
  const filtered = useMemo(() => { const term = query.trim().toLowerCase(); const base = allWorkflowPrompts.filter((item) => { const matchesScope = scope === "전체" || (scope === "추천" && featuredIds.has(item.id)) || (scope === "공개 카탈로그" && sourceById[item.id]); const matchesFavorite = !favoriteOnly || favorites.includes(item.id); const matchesLevel = level === "전체" || getLevel(item) === level; const matchesCategory = category === "전체" || item.category === category; const matchesQuery = !term || [item.title, item.category, item.tools.join(" "), item.purpose].join(" ").toLowerCase().includes(term); return matchesScope && matchesLevel && matchesCategory && matchesQuery && matchesFavorite; }); return limit === "전체" ? base : base.slice(0, Number(limit));   }, [category, favoriteOnly, favorites, level, limit, query, scope]);
  const copyPrompt = async (id: string, prompt: string) => { await navigator.clipboard?.writeText(prompt); setCopied(id); window.setTimeout(() => setCopied(null), 1600); };
  const reset = () => { setQuery(""); setCategory("전체"); setLevel("전체"); setScope("추천"); setLimit("20"); setFavoriteOnly(false); };
  const toggleFavorite = (id: string) => { const next = favorites.includes(id) ? favorites.filter((value) => value !== id) : [...favorites, id]; setFavorites(next); localStorage.setItem("ai100-workflow-favorites", JSON.stringify(next)); };
  return <PageFrame active="/workflows" kicker="WORKFLOW PROMPT LAB / START HERE" title={<>어떤 일을<br /><em>하고 있나요?</em></>}><section className="workflow-lead"><div><span className="workflow-kicker"><Sparkles size={15} /> AI에게 일하는 법을 가르치기</span><p>도구 이름부터 고르지 말고, 먼저 하려는 일을 고르세요. 목적·역할·맥락·입력자료·단계·제약·결과 형식을 채우면 AI가 더 정확하게 도와줍니다.</p><small className="workflow-reference">작성 구조 참고: <a href="https://wikidocs.net/340811" target="_blank" rel="noreferrer">프롬프트 작성법</a> · <a href="https://wikidocs.net/340813" target="_blank" rel="noreferrer">문서 업무</a> · <a href="https://wikidocs.net/340814" target="_blank" rel="noreferrer">데이터 분석</a> · <a href="https://wikidocs.net/book/19558" target="_blank" rel="noreferrer">책 전체 보기</a></small></div><div className="workflow-stat"><strong>{allWorkflowPrompts.length}</strong><span>실전 업무 프롬프트</span></div></section><section className="prompt-method"><div><span>01</span><strong>목적</strong><small>무엇을 이루려는가</small></div><i>→</i><div><span>02</span><strong>배경</strong><small>AI가 알아야 할 상황</small></div><i>→</i><div><span>03</span><strong>요청사항</strong><small>무엇을 해달라는가</small></div><i>→</i><div><span>04</span><strong>제약</strong><small>하지 말아야 할 것</small></div><i>→</i><div><span>05</span><strong>결과</strong><small>어떤 형태로 받을까</small></div></section><section className="workflow-browser"><div className="workflow-scope-tabs" role="tablist" aria-label="프롬프트 범위"><button className={scope === "추천" && !favoriteOnly ? "is-active" : ""} onClick={() => { setScope("추천"); setFavoriteOnly(false); }}>추천 업무 <small>{featuredIds.size}</small></button><button className={scope === "공개 카탈로그" && !favoriteOnly ? "is-active" : ""} onClick={() => { setScope("공개 카탈로그"); setFavoriteOnly(false); }}>공개 카탈로그 <small>{allWorkflowPrompts.length}</small></button><button className={scope === "전체" && !favoriteOnly ? "is-active" : ""} onClick={() => { setScope("전체"); setFavoriteOnly(false); }}>전체 보기 <small>{allWorkflowPrompts.length}</small></button><button className={favoriteOnly ? "is-active favorite-tab" : ""} onClick={() => setFavoriteOnly(true)}><Star size={13} fill="currentColor" /> 즐겨찾기 <small>{favorites.length}</small></button></div><div className="workflow-toolbar"><label className="ui-catalog-search"><Search size={18} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="예: 메일 자동화, 웹앱, 인스타, 데이터…" aria-label="업무 프롬프트 검색" /></label><select value={category} onChange={(event) => setCategory(event.target.value)} aria-label="업무 카테고리 선택"><option value="전체">카테고리: 전체</option>{categories.slice(1).map((item) => <option key={item}>{item}</option>)}</select><select value={level} onChange={(event) => setLevel(event.target.value)} aria-label="난이도 선택"><option value="전체">Level: 전체</option><option>초급</option><option>중급</option><option>고급</option></select><select value={limit} onChange={(event) => setLimit(event.target.value)} aria-label="노출 개수 선택"><option value="20">20개 보기</option><option value="30">30개 보기</option><option value="50">50개 보기</option><option value="전체">전체 보기</option></select><button className="workflow-reset" onClick={reset}><Filter size={14} /> 초기화</button></div><div className="workflow-result-meta"><span><strong>{filtered.length}</strong>개 표시 · {favoriteOnly ? "즐겨찾기" : scope} · {level === "전체" ? "모든 레벨" : level}</span>{(query || category !== "전체" || level !== "전체" || scope !== "추천" || limit !== "20") && <button onClick={reset}><X size={13} /> 조건 지우기</button>}</div><div className="workflow-grid">{filtered.map((item) => { const prompt = buildPrompt(item); return <article className="workflow-card" key={item.id}><div className="workflow-card-head"><span className="workflow-index">{String(allWorkflowPrompts.indexOf(item) + 1).padStart(2, "0")}</span><div><div className="workflow-card-labels"><span className="workflow-category">{item.category}</span><span className={`workflow-level level-${getLevel(item)}`}>{getLevel(item)}</span><button className={`workflow-favorite ${favorites.includes(item.id) ? "is-favorite" : ""}`} onClick={() => toggleFavorite(item.id)} aria-label={favorites.includes(item.id) ? "즐겨찾기 해제" : "즐겨찾기 추가"}><Star size={16} fill={favorites.includes(item.id) ? "currentColor" : "none"} /></button></div><h2>{item.title}</h2><p>{item.purpose}</p></div></div><div className="workflow-tools">{item.tools.map((tool) => <span key={tool}>{tool}</span>)}<span className="workflow-source">{sourceById[item.id]}</span></div><div className="prompt-block"><div className="prompt-label"><span>RCIF 실전 프롬프트 · 역할·맥락·지시·형식</span><button onClick={() => copyPrompt(item.id, prompt)} aria-label={`${item.title} 프롬프트 복사`}>{copied === item.id ? <><Check size={14} /> 복사됨</> : <><Copy size={14} /> 복사</>}</button></div><p>{prompt}</p></div><details className="workflow-detail"><summary>작성 구조와 검수 포인트 보기</summary><div className="workflow-detail-grid"><div><span>요청 예시</span><p>{item.request}</p></div><div><span>주의할 점</span><p>{item.caution}</p></div></div></details></article>; })}</div>{filtered.length === 0 && <div className="workflow-empty"><strong>조건에 맞는 업무 프롬프트가 없습니다.</strong><button onClick={reset}>필터 초기화</button></div>}</section></PageFrame>;
}
