/* Paper + Pixel Atlas: reference-grounded hand-drawn knowledge map with chapter branches and selectable leaves. */
import React, { useMemo, useState } from "react";
import { ArrowUpRight, Check, GitBranch, Network } from "lucide-react";
import { Link } from "wouter";
import { popularTools } from "@/lib/popularTools";
import { skills } from "@/lib/skills";
import { workflowPrompts } from "@/lib/workflows";

type Tone = "coral" | "blue" | "mint" | "amber" | "ink";
type MapTask = { id: string; label: string; description: string; tags: string[]; tone: Tone };
type NodeKind = "tool" | "skill" | "workflow" | "note";
type MapNode = { kind: NodeKind; id: number | string; name: string; meta: string };

const mapTasks: MapTask[] = [
  { id: "automation", label: "반복 업무 자동화", description: "메일·CRM·스프레드시트의 반복 단계를 줄입니다.", tags: ["자동화", "업무자동화", "메일", "CRM", "스프레드시트", "생산성"], tone: "coral" },
  { id: "vibe-coding", label: "웹앱·바이브코딩", description: "아이디어를 작은 화면과 실제 웹앱으로 만듭니다.", tags: ["바이브코딩", "개발", "코딩", "웹앱", "프로토타입", "UI/UX", "배포"], tone: "blue" },
  { id: "content", label: "콘텐츠·SNS 제작", description: "릴스·쇼츠·카피·썸네일을 채널에 맞춥니다.", tags: ["콘텐츠", "마케팅", "영상", "소셜", "릴스", "유튜브", "카피"], tone: "coral" },
  { id: "research", label: "리서치·보고서", description: "자료를 비교해 출처 있는 브리핑을 만듭니다.", tags: ["리서치", "문서·리서치", "보고서", "PDF", "요약", "분석", "검색"], tone: "mint" },
  { id: "slides", label: "슬라이드·교육자료", description: "복잡한 내용을 발표 흐름과 시각 자료로 바꿉니다.", tags: ["슬라이드", "발표", "교육", "프레젠테이션", "디자인", "시각화", "문서"], tone: "blue" },
  { id: "data", label: "데이터 분석", description: "CSV·엑셀·대시보드에서 변화와 이상치를 찾습니다.", tags: ["데이터", "분석", "CSV", "엑셀", "대시보드", "차트", "스프레드시트"], tone: "ink" },
];

function score(task: MapTask, values: ReadonlyArray<string | readonly string[]>) { const haystack = values.flatMap((value) => Array.isArray(value) ? [...value] : [value]).join(" ").toLowerCase(); return task.tags.reduce((total, tag) => total + (haystack.includes(tag.toLowerCase()) ? 1 : 0), 0); }
function selectedNodeKey(node: MapNode | null) { return node ? `${node.kind}-${node.id}` : ""; }

export default function WorkMindMap() {
  const [selectedTask, setSelectedTask] = useState(mapTasks[0]);
  const [selectedNode, setSelectedNode] = useState<MapNode | null>(null);
  const recommendations = useMemo(() => {
    const tools = popularTools.map((item) => ({ item, score: score(selectedTask, [item.name, item.category, item.role, item.summary, item.example, item.tags]) })).sort((a, b) => b.score - a.score || a.item.name.localeCompare(b.item.name)).slice(0, 3);
    const skillItems = skills.map((item) => ({ item, score: score(selectedTask, [item.name, item.category, item.summary, item.guide, item.tags, item.compatible]) })).sort((a, b) => b.score - a.score || a.item.name.localeCompare(b.item.name)).slice(0, 3);
    const workflows = workflowPrompts.map((item) => ({ item, score: score(selectedTask, [item.title, item.category, item.purpose, item.tools]) })).sort((a, b) => b.score - a.score || a.item.title.localeCompare(b.item.title)).slice(0, 2);
    return { tools, skills: skillItems, workflows };
  }, [selectedTask]);
  const nodeIsSelected = (node: MapNode) => selectedNodeKey(selectedNode) === selectedNodeKey(node);
  const selectTask = (task: MapTask) => { setSelectedTask(task); setSelectedNode(null); };
  const connectedClass = (kind: NodeKind) => selectedNode && selectedNode.kind !== kind ? "is-dimmed" : "";
  const toolNodes: MapNode[] = recommendations.tools.map(({ item }) => ({ kind: "tool", id: item.id, name: item.name, meta: item.category }));
  const skillNodes: MapNode[] = recommendations.skills.map(({ item }) => ({ kind: "skill", id: item.id, name: item.name, meta: item.category }));
  const workflowNodes: MapNode[] = recommendations.workflows.map(({ item }) => ({ kind: "workflow", id: item.id, name: item.title, meta: item.category }));
  const noteNodes: MapNode[] = [{ kind: "note", id: "input", name: "입력 자료", meta: selectedTask.tags.slice(0, 3).join(" · ") }, { kind: "note", id: "check", name: "사람의 검수", meta: "결과 확인 · 다음 행동" }];
  return <section className="work-mind-map" id="work-map" aria-labelledby="work-map-title">
    <div className="work-map-inner">
      <header className="work-map-header"><div><span className="section-kicker"><Network size={14} /> WORK ATLAS / KNOWLEDGE MAP</span><h2 id="work-map-title">업무를 고르면,<br /><em>가지가 펼쳐집니다.</em></h2></div><p>첨부한 기술 노트처럼 하나의 업무에서 장·개념·도구·스킬·프롬프트가 퍼져 나갑니다. 박스와 연결선을 클릭하면 해당 가지가 또렷해집니다.</p><div className="work-map-modes"><span><GitBranch size={13} /> WORK TREE</span><span><Network size={13} /> MIND MAP</span></div></header>
      <div className="work-map-layout">
        <aside className="work-map-task-rail"><div className="work-map-rail-label">01 / CHOOSE A JOB</div>{mapTasks.map((task, index) => <button type="button" key={task.id} className={`work-task-node tone-${task.tone} ${selectedTask.id === task.id ? "is-active" : ""}`} onClick={() => selectTask(task)} aria-pressed={selectedTask.id === task.id}><span>{selectedTask.id === task.id ? <Check size={13} /> : String(index + 1).padStart(2, "0")}</span><strong>{task.label}</strong><small>{task.description}</small></button>)}</aside>
        <div className="work-map-canvas"><div className="work-map-canvas-top"><span>02 / KNOWLEDGE BRANCHES</span><strong>{selectedTask.label}</strong><small>{selectedTask.tags.join(" · ")}</small></div><div className="sketch-map-board"><svg className="sketch-map-lines" viewBox="0 0 1000 650" aria-hidden="true"><path className="line-tool" d="M500 316 C390 240 245 158 130 112" /><path className="line-skill" d="M500 316 C505 220 505 152 500 80" /><path className="line-workflow" d="M500 316 C620 240 755 158 870 112" /><path className="line-note" d="M500 316 C385 400 250 486 130 540" /><path className="line-note" d="M500 316 C500 414 500 493 500 574" /><path className="line-workflow" d="M500 316 C620 400 755 486 870 540" /></svg><Branch className={`branch-position branch-top-left ${connectedClass("tool")}`} index="01" title="실제 AI 툴" nodes={toolNodes} selected={selectedNode} onSelect={setSelectedNode} /><Branch className={`branch-position branch-top-center ${connectedClass("skill")}`} index="02" title="재사용 SKILL" nodes={skillNodes} selected={selectedNode} onSelect={setSelectedNode} /><Branch className={`branch-position branch-top-right ${connectedClass("workflow")}`} index="03" title="업무 프롬프트" nodes={workflowNodes} selected={selectedNode} onSelect={setSelectedNode} /><Branch className={`branch-position branch-bottom-left ${connectedClass("note")}`} index="04" title="입력 자료" nodes={[noteNodes[0]]} selected={selectedNode} onSelect={setSelectedNode} /><Branch className={`branch-position branch-bottom-center ${connectedClass("note")}`} index="05" title="검수 기준" nodes={[noteNodes[1]]} selected={selectedNode} onSelect={setSelectedNode} /><Branch className={`branch-position branch-bottom-right ${connectedClass("workflow")}`} index="06" title="다음 행동" nodes={[{ kind: "workflow", id: "next", name: "작게 실행하기", meta: "선택 → 테스트 → 반복" }]} selected={selectedNode} onSelect={setSelectedNode} /></div><div className="work-map-legend"><span><i className="legend-dot dot-tool" /> 실제 AI 툴</span><span><i className="legend-dot dot-skill" /> 재사용 SKILL</span><span><i className="legend-dot dot-workflow" /> 프롬프트·다음 행동</span></div></div>
        <aside className="work-map-inspector"><span className="work-map-rail-label">07 / SELECTED NODE</span><div className="inspector-marker" /><span className="inspector-kind">{selectedNode ? selectedNode.kind.toUpperCase() : "JOB ROOT"}</span><h3>{selectedNode?.name || selectedTask.label}</h3><p>{selectedNode ? `${selectedNode.meta} 가지가 현재 업무 지도에서 강조되었습니다.` : selectedTask.description}</p><div className="inspector-summary"><strong>{toolNodes.length + skillNodes.length + workflowNodes.length + noteNodes.length}</strong><span>mapped nodes</span></div><div className="inspector-actions"><Link href={selectedNode?.kind === "skill" ? "/skills" : selectedNode?.kind === "workflow" ? "/workflows" : "/tools"}>상세 라이브러리 열기 <ArrowUpRight size={15} /></Link><button type="button" onClick={() => setSelectedNode(null)}>업무 기준으로 보기</button></div></aside>
      </div>
    </div>
  </section>;
}

function Branch({ className, index, title, nodes, selected, onSelect }: { className: string; index: string; title: string; nodes: MapNode[]; selected: MapNode | null; onSelect: (node: MapNode) => void }) { return <article className={`sketch-branch ${className}`}><div className="sketch-branch-title"><span>{index}</span><strong>{title}</strong></div><div className="sketch-branch-leaves">{nodes.map((node) => <button type="button" key={`${node.kind}-${node.id}`} className={`sketch-leaf ${selectedNodeKey(selected) === selectedNodeKey(node) ? "is-selected" : ""}`} onClick={() => onSelect(node)} aria-pressed={selectedNodeKey(selected) === selectedNodeKey(node)}><i>{node.kind === "tool" ? "AI" : node.kind === "skill" ? "SK" : node.kind === "workflow" ? "W" : "•"}</i><span><strong>{node.name}</strong><small>{node.meta}</small></span></button>)}</div></article>; }
