import { useState } from "react";
import { ArrowLeft, Check, ClipboardCheck, Copy, FileSpreadsheet, GitBranch, Search, ShieldCheck } from "lucide-react";
import { Link, useRoute } from "wouter";
import { workflowPrompts } from "@/lib/workflows";
import { accountingWorkflowPrompts, advancedBusinessWorkflowPrompts, excelAutomationWorkflowPrompts, extraWorkflowPrompts } from "@/lib/workflowsExtra";
import { PageFrame } from "./GuidePages";

const allWorkflowPrompts = [...workflowPrompts, ...extraWorkflowPrompts, ...accountingWorkflowPrompts, ...excelAutomationWorkflowPrompts, ...advancedBusinessWorkflowPrompts];

type Stage = { label: string; title: string; prompt: string; checklist: string[]; output: string };
const stageTemplates: Stage[] = [
  { label: "01 초안", title: "업무 목표와 입력자료 정리", prompt: "이 업무의 목적·대상·현재 상황·입력자료·원하는 결과를 정리하고, 누락된 정보는 확인 질문으로 분리해줘. 원본 자료는 수정하지 말고 먼저 작업 계획을 만들어줘.", checklist: ["목표가 한 문장인가요?", "입력자료와 기준일을 적었나요?", "모르는 정보는 질문으로 남겼나요?"], output: "업무 목표·입력자료표·확인 질문" },
  { label: "02 검토", title: "초안과 원본 자료 대조", prompt: "작성한 초안을 원본 자료와 대조해 사실·추정·누락·오류 가능성을 구분하고, 각각의 근거와 담당자 확인 질문을 표로 작성해줘.", checklist: ["숫자·날짜·이름을 원본과 대조했나요?", "사실과 추정을 나눴나요?", "확인 담당자가 정해졌나요?"], output: "대조표·오류 후보·확인 질문" },
  { label: "03 보완", title: "결과 형식과 제약 보완", prompt: "검토 결과를 반영해 실제 사용자가 바로 이해할 수 있도록 표·체크리스트·다음 행동 형식으로 보완해줘. 하지 말아야 할 것과 검수 기준도 포함해줘.", checklist: ["출력 형식이 정해졌나요?", "금지사항이 적혀 있나요?", "검수 기준이 측정 가능한가요?"], output: "수정 결과·검수 기준·변경 요약" },
  { label: "04 실행 준비", title: "담당자·승인·기록 연결", prompt: "보완된 결과를 실제 업무에 적용하기 전에 담당자·기한·승인자·증빙 위치·로그·실패 시 되돌리는 방법을 정리해줘. 외부 발송·수정·삭제는 승인 전 실행하지 않도록 해줘.", checklist: ["실행 전 승인자가 있나요?", "증빙과 로그가 남나요?", "실패 시 되돌릴 수 있나요?"], output: "실행 체크리스트·승인 흐름·롤백 방법" },
  { label: "05 반복 개선", title: "실제 결과를 반영해 다음 회차 개선", prompt: "이번 업무 결과와 실제 결과를 비교해 잘된 점·오류·재작업·다음 실험을 정리하고, 다음 회차에 재사용할 프롬프트를 개선해줘.", checklist: ["이전 회차와 같은 기준인가요?", "오류와 재작업을 기록했나요?", "다음 실험이 작고 측정 가능한가요?"], output: "회고표·개선안·다음 회차 프롬프트" },
];
const popularMajorByCategory: Record<string, string> = { "엑셀 자동화": "데이터·리포팅", "재고관리": "물류·재고", "CRM": "영업·고객관리", "ERP": "재무·회계", "경리·회계": "재무·회계", "홈페이지 제작": "IT·웹 제작", "데이터 분석": "데이터·리포팅", "메일 초안": "문서·지식관리" };

const visualSteps = [
  { icon: FileSpreadsheet, label: "자료 준비", detail: "원본·기준일·열 정의" },
  { icon: Search, label: "검토", detail: "사실·누락·오류 대조" },
  { icon: GitBranch, label: "보완", detail: "규칙·결과 형식 수정" },
  { icon: ClipboardCheck, label: "승인", detail: "담당자·기록·실행" },
  { icon: ShieldCheck, label: "반복", detail: "결과 비교·개선" },
];

export default function WorkflowDetailPage() {
  const [, params] = useRoute("/workflows/:id");
  const item = allWorkflowPrompts.find((entry) => entry.id === params?.id);
  const [stageIndex, setStageIndex] = useState(0);
  const [copied, setCopied] = useState(false);
  const [checked, setChecked] = useState<string[]>([]);
  if (!item) return <PageFrame active="/workflows" kicker="WORKFLOW DETAIL" title={<>업무를<br /><em>찾을 수 없습니다.</em></>}><Link href="/workflows" className="workflow-back-link"><ArrowLeft size={15} /> 업무 찾기로 돌아가기</Link></PageFrame>;
  const stage = stageTemplates[stageIndex];
  const majorCategory = popularMajorByCategory[item.category] ?? "업무 영역";
  const prompt = `역할: ${item.category} 실무를 돕는 업무 보조자\n\n목적: ${item.purpose}\n\n맥락: ${item.background}\n\n이번 단계 요청: ${stage.prompt}\n\n기존 업무 요청: ${item.request}\n\n제약: ${item.constraints}\n\n결과 형식: ${stage.output}\n\n검수 기준: ${item.review}\n\n안전 원칙: ${item.caution}`;
  const copy = async () => { await navigator.clipboard?.writeText(prompt); setCopied(true); window.setTimeout(() => setCopied(false), 1600); };
  const toggleCheck = (value: string) => setChecked((current) => current.includes(value) ? current.filter((item) => item !== value) : [...current, value]);
  const selectStage = (index: number) => { setStageIndex(index); setChecked([]); setCopied(false); };
  return <PageFrame active="/workflows" kicker="WORKFLOW DETAIL / STEP-BY-STEP" title={<>업무를<br /><em>단계별로 진행하세요.</em></>}><div className="workflow-detail-page"><nav className="workflow-breadcrumb" aria-label="업무 이동 경로"><Link href="/workflows">업무 찾기</Link><span>›</span><Link href={`/workflows?major=${encodeURIComponent(majorCategory)}`}>{majorCategory}</Link><span>›</span><strong>{item.title}</strong></nav><Link href="/workflows" className="workflow-back-link"><ArrowLeft size={15} /> 업무 목록으로 돌아가기</Link><header className="workflow-detail-hero"><div><span className="workflow-category">{item.category}</span><h1>{item.title}</h1><p>{item.purpose}</p><div className="workflow-tools">{item.tools.map((tool) => <span key={tool}>{tool}</span>)}</div></div><div className="workflow-visual-flow" aria-label="업무 진행 흐름 그림">{visualSteps.map(({ icon: Icon, label, detail }, index) => <div className={`workflow-flow-node flow-node-${index} ${index === stageIndex ? "is-active" : index < stageIndex ? "is-done" : ""}`} key={label}><Icon size={22} /><strong>{label}</strong><small>{detail}</small>{index < visualSteps.length - 1 && <i>→</i>}</div>)}</div></header><div className="workflow-progress-summary"><div><span>현재 진행 단계</span><strong>{stage.label} · {stage.title}</strong></div><div className="workflow-progress-meter"><span style={{ width: `${((stageIndex + 1) / stageTemplates.length) * 100}%` }} /></div><b>{stageIndex + 1} / {stageTemplates.length}</b></div><section className="workflow-stage-nav"><span>진행 단계</span>{stageTemplates.map((entry, index) => <button key={entry.label} className={`stage-${index} ${index === stageIndex ? "is-active" : index < stageIndex ? "is-done" : ""}`} onClick={() => selectStage(index)}><b>{entry.label}</b><small>{entry.title}</small></button>)}</section><section className="workflow-detail-grid"><article className="workflow-detail-prompt"><span className="workflow-detail-label">이번 단계 프롬프트</span><h2>{stage.title}</h2><p className="workflow-prompt-copy">{prompt}</p><button className="workflow-copy-button" onClick={copy}>{copied ? <><Check size={15} /> 복사됨</> : <><Copy size={15} /> 이 단계 프롬프트 복사</>}</button></article><aside className="workflow-check-panel"><span className="workflow-detail-label">검토 체크리스트</span><div className="workflow-check-count"><strong>{checked.length}</strong> / {stage.checklist.length}개 확인</div>{stage.checklist.map((check) => <label className={checked.includes(check) ? "is-checked" : ""} key={check}><input type="checkbox" checked={checked.includes(check)} onChange={() => toggleCheck(check)} /> <span>{check}</span></label>)}<div className="workflow-next-box"><strong>이 단계의 결과</strong><p>{stage.output}</p><strong>다음 진행</strong><p>{stageIndex === stageTemplates.length - 1 ? "다음 회차 초안으로 돌아가 최신 자료를 반영하세요." : `${stageTemplates[stageIndex + 1].label} ${stageTemplates[stageIndex + 1].title}로 이동하세요.`}</p></div></aside></section></div></PageFrame>;
}
