import { useMemo, useState } from "react";
import { ArrowUpRight, Check, Copy, GitCompare, Lightbulb, WandSparkles, Workflow } from "lucide-react";
import { Link } from "wouter";
import { toast } from "sonner";
import { directoryTools, type DirectoryTool } from "@/lib/toolCatalog";
import { workflowPrompts } from "@/lib/workflows";
import { skills } from "@/lib/skills";
import BrandLogo from "@/components/BrandLogo";

type WorkProfile = { id: string; label: string; description: string; tags: string[] };
const workProfiles: WorkProfile[] = [
  { id: "automation", label: "반복 업무 자동화", description: "메일·CRM·스프레드시트의 반복 단계를 줄입니다.", tags: ["자동화", "업무", "메일", "CRM", "스프레드시트"] },
  { id: "research", label: "리서치·보고서", description: "자료를 근거 있는 브리핑과 보고서로 바꿉니다.", tags: ["리서치", "문서", "PDF", "요약", "검색"] },
  { id: "content", label: "콘텐츠·SNS", description: "카피·영상·이미지 콘텐츠를 채널에 맞게 만듭니다.", tags: ["콘텐츠", "마케팅", "SNS", "영상", "이미지"] },
  { id: "build", label: "웹앱·바이브코딩", description: "아이디어를 작은 화면과 동작하는 앱으로 만듭니다.", tags: ["코딩", "개발", "웹앱", "앱", "프로토타입"] },
  { id: "data", label: "데이터 분석", description: "CSV·엑셀에서 변화와 이상치를 찾습니다.", tags: ["데이터", "분석", "CSV", "엑셀", "차트"] },
];

function haystack(values: unknown[]) { return values.flatMap((value) => Array.isArray(value) ? value : [value]).filter(Boolean).join(" ").toLowerCase(); }
function score(tags: string[], values: unknown[]) { const text = haystack(values); return tags.reduce((total, tag) => total + (text.includes(tag.toLowerCase()) ? 1 : 0), 0); }
function priceStatus(tool: DirectoryTool) { const value = tool.pricing.toLowerCase(); if (value.includes("무료") && (value.includes("부분") || value.includes("체험"))) return "부분 무료"; if (value.includes("무료")) return "무료"; if (value.includes("유료")) return "유료"; return "확인 필요"; }
function trustLabel(tool: DirectoryTool) { const source = tool.source.toLowerCase(); if (source.includes("공식") || source.includes("official")) return "공식 출처"; if (tool.verifiedAt) return `출처 확인 ${tool.verifiedAt}`; return "공개 기록"; }
async function copyText(text: string) { await navigator.clipboard?.writeText(text); toast.success("클립보드에 복사했어요."); }

export default function FieldGuideWorkbench() {
  const [work, setWork] = useState(workProfiles[0]);
  const [compare, setCompare] = useState<DirectoryTool[]>([]);
  const [price, setPrice] = useState("전체");
  const [prompt, setPrompt] = useState({ goal: "", audience: "초보 실무자", material: "", format: "핵심 요약 → 근거 → 다음 행동" });
  const matches = useMemo(() => directoryTools.map((tool) => ({ tool, score: score(work.tags, [tool.name, tool.category, tool.description, tool.useCase, tool.tags]) })).filter(({ tool }) => price === "전체" || priceStatus(tool) === price).sort((a, b) => b.score - a.score || a.tool.name.localeCompare(b.tool.name)).slice(0, 5), [work, price]);
  const workflows = useMemo(() => workflowPrompts.map((item) => ({ item, score: score(work.tags, [item.title, item.category, item.purpose, item.tools]) })).sort((a, b) => b.score - a.score).slice(0, 3), [work]);
  const toggleCompare = (tool: DirectoryTool) => setCompare((current) => current.some((item) => item.id === tool.id) ? current.filter((item) => item.id !== tool.id) : current.length < 4 ? [...current, tool] : (toast.info("비교함은 최대 4개까지 담을 수 있어요."), current));
  const generatedPrompt = `역할: ${work.label}을 돕는 실무 파트너\n목표: ${prompt.goal || `${work.label}의 첫 결과물 만들기`}\n대상: ${prompt.audience}\n입력 자료: ${prompt.material || "첨부 자료 또는 아래에 붙여넣은 원문"}\n요청: 자료에서 확인되는 사실만 사용해 ${work.label} 작업을 진행해줘. 누락·불확실한 정보는 먼저 질문으로 분리해줘.\n출력 형식: ${prompt.format}\n검수: 원문과 숫자·이름·날짜를 대조하고 추측은 ‘확인 필요’로 표시해줘.`;
  return <section className="field-guide-workbench" aria-label="Field Guide 실행 도구"><div className="workbench-heading"><div><span className="section-kicker"><WandSparkles size={14} /> FIELD GUIDE / MAKE A DECISION</span><h2>도구를 고르기 전에<br /><em>일을 진단하세요.</em></h2></div><p>업무를 고르면 실제 도구·워크플로우·프롬프트 조합을 제안합니다. 추천은 출발점이며 가격과 기능은 공식 페이지에서 확인하세요.</p></div><div className="workbench-grid"><section className="diagnostic-card"><div className="workbench-card-head"><span><Lightbulb size={15} /> 01 / 업무 진단 마법사</span><strong>{work.label}</strong></div><div className="diagnostic-options">{workProfiles.map((item) => <button key={item.id} type="button" className={item.id === work.id ? "is-active" : ""} onClick={() => setWork(item)} aria-pressed={item.id === work.id}><span>{item.id === work.id ? <Check size={13} /> : "·"}</span>{item.label}</button>)}</div><p className="workbench-description">{work.description}</p><div className="diagnostic-results"><div><span>추천 도구</span>{matches.slice(0, 3).map(({ tool }) => <button key={tool.id} onClick={() => toggleCompare(tool)} className="mini-result"><strong>{tool.name}</strong><small>{priceStatus(tool)} · {trustLabel(tool)}</small></button>)}</div><div><span>연결 워크플로우</span>{workflows.map(({ item }) => <Link key={item.id} href={`/workflows/${item.id}`} className="mini-result"><strong>{item.title}</strong><small>{item.category} · 바로 실행</small><ArrowUpRight size={13} /></Link>)}</div></div></section><section className="compare-card"><div className="workbench-card-head"><span><GitCompare size={15} /> 02 / 도구 비교함</span><strong>{compare.length}/4</strong></div><label className="workbench-select">가격 상태<select value={price} onChange={(event) => setPrice(event.target.value)}><option>전체</option><option>무료</option><option>부분 무료</option><option>유료</option><option>확인 필요</option></select></label>{compare.length ? <div className="compare-table" role="table" aria-label="선택한 AI 도구 비교"><div className="compare-row compare-header"><span>항목</span>{compare.map((tool) => <strong key={tool.id}>{tool.name}<button onClick={() => toggleCompare(tool)} aria-label={`${tool.name} 비교에서 제거`}>×</button></strong>)}</div><div className="compare-row"><span>가격</span>{compare.map((tool) => <span key={tool.id}>{priceStatus(tool)}</span>)}</div><div className="compare-row"><span>출처</span>{compare.map((tool) => <span key={tool.id}>{trustLabel(tool)}</span>)}</div><div className="compare-row"><span>용도</span>{compare.map((tool) => <span key={tool.id}>{tool.useCase}</span>)}</div></div> : <div className="compare-empty"><p>진단 결과의 도구를 눌러 비교함에 담으세요.</p><Link href="/tools">전체 도구에서 고르기 <ArrowUpRight size={14} /></Link></div>}</section></div><section className="prompt-playground"><div className="playground-copy"><span className="section-kicker"><Workflow size={14} /> 03 / PROMPT PLAYGROUND</span><h3>업무를 바로 실행할<br /><em>프롬프트로 조립하세요.</em></h3><p>목표·대상·자료·출력 형식을 채우면 근거·검수 기준이 포함된 재사용 프롬프트가 만들어집니다.</p><button className="secondary-action" onClick={() => copyText(generatedPrompt)}><Copy size={14} /> 프롬프트 복사</button></div><div className="playground-form"><label>목표<input value={prompt.goal} onChange={(event) => setPrompt({ ...prompt, goal: event.target.value })} placeholder="예: 회의 녹취에서 다음 행동을 뽑기" /></label><label>입력 자료<textarea value={prompt.material} onChange={(event) => setPrompt({ ...prompt, material: event.target.value })} placeholder="자료의 종류·범위·주의할 점" rows={2} /></label><label>출력 형식<select value={prompt.format} onChange={(event) => setPrompt({ ...prompt, format: event.target.value })}><option>핵심 요약 → 근거 → 다음 행동</option><option>표 → 확인 질문 → 검수 체크리스트</option><option>단계별 계획 → 위험 → 완료 조건</option></select></label></div><pre className="generated-prompt" aria-live="polite">{generatedPrompt}</pre></section></section>;
}

export { priceStatus, trustLabel };
