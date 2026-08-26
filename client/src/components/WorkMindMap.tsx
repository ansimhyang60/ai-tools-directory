/* Paper + Pixel Atlas: a full-bleed field map turns tasks into connected tools, skills, and workflows. */
import { useMemo, useState } from "react";
import { ArrowUpRight, Check, GitBranch, Network, Sparkles } from "lucide-react";
import { Link } from "wouter";
import { popularTools } from "@/lib/popularTools";
import { skills } from "@/lib/skills";
import { workflowPrompts } from "@/lib/workflows";

type Tone = "coral" | "blue" | "mint" | "amber" | "ink";
type MapTask = { id: string; label: string; description: string; tags: string[]; tone: Tone };
type NodeKind = "tool" | "skill" | "workflow";

const mapTasks: MapTask[] = [
  { id: "automation", label: "반복 업무 자동화", description: "메일·CRM·스프레드시트의 반복 단계를 줄입니다.", tags: ["자동화", "업무자동화", "메일", "CRM", "스프레드시트", "생산성"], tone: "coral" },
  { id: "vibe-coding", label: "웹앱·바이브코딩", description: "아이디어를 작은 화면과 실제 웹앱으로 만듭니다.", tags: ["바이브코딩", "개발", "코딩", "웹앱", "프로토타입", "UI/UX", "배포"], tone: "blue" },
  { id: "content", label: "콘텐츠·SNS 제작", description: "릴스·쇼츠·카피·썸네일을 채널에 맞춥니다.", tags: ["콘텐츠", "마케팅", "영상", "소셜", "릴스", "유튜브", "카피"], tone: "coral" },
  { id: "research", label: "리서치·보고서", description: "자료를 비교해 출처 있는 브리핑을 만듭니다.", tags: ["리서치", "문서·리서치", "보고서", "PDF", "요약", "분석", "검색"], tone: "mint" },
  { id: "slides", label: "슬라이드·교육자료", description: "복잡한 내용을 발표 흐름과 시각 자료로 바꿉니다.", tags: ["슬라이드", "발표", "교육", "프레젠테이션", "디자인", "시각화", "문서"], tone: "blue" },
  { id: "data", label: "데이터 분석", description: "CSV·엑셀·대시보드에서 변화와 이상치를 찾습니다.", tags: ["데이터", "분석", "CSV", "엑셀", "대시보드", "차트", "스프레드시트"], tone: "ink" },
];

function score(task: MapTask, values: ReadonlyArray<string | readonly string[]>) { const haystack = values.flatMap((value) => Array.isArray(value) ? [...value] : [value]).join(" ").toLowerCase(); return task.tags.reduce((total, tag) => total + (haystack.includes(tag.toLowerCase()) ? 1 : 0), 0); }

export default function WorkMindMap() {
  const [selectedTask, setSelectedTask] = useState(mapTasks[0]);
  const [selectedNode, setSelectedNode] = useState<{ kind: NodeKind | "task"; id: number | string; name: string } | null>(null);
  const recommendations = useMemo(() => {
    const tools = popularTools.map((tool) => ({ item: tool, score: score(selectedTask, [tool.name, tool.category, tool.role, tool.summary, tool.example, tool.tags]) })).sort((a, b) => b.score - a.score || a.item.name.localeCompare(b.item.name)).slice(0, 4);
    const skillItems = skills.map((skill) => ({ item: skill, score: score(selectedTask, [skill.name, skill.category, skill.summary, skill.guide, skill.tags, skill.compatible]) })).sort((a, b) => b.score - a.score || a.item.name.localeCompare(b.item.name)).slice(0, 3);
    const workflows = workflowPrompts.map((workflow) => ({ item: workflow, score: score(selectedTask, [workflow.title, workflow.category, workflow.purpose, workflow.tools]) })).sort((a, b) => b.score - a.score || a.item.title.localeCompare(b.item.title)).slice(0, 2);
    return { tools, skills: skillItems, workflows };
  }, [selectedTask]);
  const isSelected = (kind: NodeKind, id: number | string) => selectedNode?.kind === kind && selectedNode.id === id;
  const selectTask = (task: MapTask) => { setSelectedTask(task); setSelectedNode({ kind: "task", id: task.id, name: task.label }); };
  return <section className="work-mind-map" id="work-map" aria-labelledby="work-map-title">
    <div className="work-map-inner">
      <header className="work-map-header"><div><span className="section-kicker"><Network size={14} /> WORK ATLAS / TASK-FIRST CONNECTIONS</span><h2 id="work-map-title">업무를 고르면,<br /><em>도구와 스킬이 연결됩니다.</em></h2></div><p>가운데 업무를 기준으로 실제 AI 서비스, 재사용 가능한 SKILL, 바로 실행할 워크플로우를 한 장의 지도에서 확인하세요. 노드를 클릭하면 연결된 가지가 강조됩니다.</p><div className="work-map-modes"><span><GitBranch size={13} /> TREE VIEW</span><span><Network size={13} /> MIND MAP</span></div></header>
      <div className="work-map-layout">
        <aside className="work-map-task-rail"><div className="work-map-rail-label">01 / CHOOSE A JOB</div>{mapTasks.map((task, index) => <button type="button" key={task.id} className={`work-task-node tone-${task.tone} ${selectedTask.id === task.id ? "is-active" : ""}`} onClick={() => selectTask(task)} aria-pressed={selectedTask.id === task.id}><span>{selectedTask.id === task.id ? <Check size={13} /> : String(index + 1).padStart(2, "0")}</span><strong>{task.label}</strong><small>{task.description}</small></button>)}</aside>
        <div className="work-map-canvas"><div className="work-map-canvas-top"><span>02 / CONNECTED NODES</span><strong>{selectedTask.label}</strong><small>{selectedTask.tags.slice(0, 4).join(" · ")}</small></div><div className="work-map-graph"><div className="map-root"><Sparkles size={18} /><span>SELECTED JOB</span><strong>{selectedTask.label}</strong></div><div className="map-branches"><div className="map-branch branch-tools"><span className="map-branch-label">AI TOOLS</span>{recommendations.tools.map(({ item }, index) => <button type="button" key={item.id} className={`map-node ${isSelected("tool", item.id) ? "is-selected" : ""}`} onClick={() => setSelectedNode({ kind: "tool", id: item.id, name: item.name })} aria-pressed={isSelected("tool", item.id)}><i>{String(index + 1).padStart(2, "0")}</i><strong>{item.name}</strong><small>{item.category}</small></button>)}</div><div className="map-branch branch-skills"><span className="map-branch-label">SKILLS</span>{recommendations.skills.map(({ item }, index) => <button type="button" key={item.id} className={`map-node ${isSelected("skill", item.id) ? "is-selected" : ""}`} onClick={() => setSelectedNode({ kind: "skill", id: item.id, name: item.name })} aria-pressed={isSelected("skill", item.id)}><i>S{String(index + 1).padStart(2, "0")}</i><strong>{item.name}</strong><small>{item.category}</small></button>)}</div><div className="map-branch branch-workflows"><span className="map-branch-label">WORKFLOWS</span>{recommendations.workflows.map(({ item }, index) => <button type="button" key={item.id} className={`map-node ${isSelected("workflow", item.id) ? "is-selected" : ""}`} onClick={() => setSelectedNode({ kind: "workflow", id: item.id, name: item.title })} aria-pressed={isSelected("workflow", item.id)}><i>W{String(index + 1).padStart(2, "0")}</i><strong>{item.title}</strong><small>{item.category}</small></button>)}</div></div></div><div className="work-map-legend"><span><i className="legend-dot dot-tool" /> 실제 AI 서비스</span><span><i className="legend-dot dot-skill" /> 반복 가능한 SKILL</span><span><i className="legend-dot dot-workflow" /> 업무 프롬프트</span></div></div>
        <aside className="work-map-inspector"><span className="work-map-rail-label">03 / SELECTED STAGE</span><div className="inspector-marker" /><span className="inspector-kind">{selectedNode?.kind === "task" ? "TASK" : selectedNode?.kind === "skill" ? "SKILL NODE" : selectedNode?.kind === "workflow" ? "WORKFLOW NODE" : selectedNode ? "AI TOOL NODE" : "JOB ROOT"}</span><h3>{selectedNode?.name || selectedTask.label}</h3><p>{selectedNode ? "선택한 노드가 현재 업무 가지에서 강조되었습니다." : selectedTask.description}</p><div className="inspector-summary"><strong>{recommendations.tools.length + recommendations.skills.length + recommendations.workflows.length}</strong><span>connected nodes</span></div><div className="inspector-actions"><Link href={selectedNode?.kind === "skill" ? "/skills" : selectedNode?.kind === "workflow" ? "/workflows" : "/tools"}>상세 라이브러리 열기 <ArrowUpRight size={15} /></Link><button type="button" onClick={() => setSelectedNode(null)}>업무 기준으로 보기</button></div></aside>
      </div>
    </div>
  </section>;
}
