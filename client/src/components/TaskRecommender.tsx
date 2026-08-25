/* Paper + Pixel Atlas: task-first navigation turns the directory into a practical field guide. */
import { useMemo, useState } from "react";
import { ArrowUpRight, Check, Sparkles } from "lucide-react";
import { Link } from "wouter";
import { directoryTools, type DirectoryTool } from "@/lib/toolCatalog";
import { skills } from "@/lib/skills";
import { workflowPrompts } from "@/lib/workflows";
import BrandLogo from "@/components/BrandLogo";

type Task = { id: string; label: string; description: string; tags: string[]; tone: "blue" | "coral" | "mint" | "ink" };
const tasks: Task[] = [
  { id: "automation", label: "반복 업무 자동화", description: "메일·CRM·스프레드시트처럼 매번 반복하는 한 단계를 줄이고 싶어요.", tags: ["업무자동화", "업무 자동화", "자동화", "메일", "CRM", "스프레드시트", "생산성"], tone: "coral" },
  { id: "vibe-coding", label: "웹앱·바이브코딩", description: "아이디어를 작은 화면과 실제 동작하는 웹앱으로 만들고 싶어요.", tags: ["바이브코딩", "개발", "코딩", "웹앱", "프로토타입", "UI/UX", "배포", "코드"], tone: "blue" },
  { id: "content", label: "콘텐츠·SNS 제작", description: "릴스·쇼츠·카피·썸네일을 채널에 맞게 빠르게 만들고 싶어요.", tags: ["SNS 자동화", "콘텐츠", "마케팅", "영상", "소셜", "릴스", "유튜브", "카피"], tone: "coral" },
  { id: "research", label: "리서치·보고서", description: "자료를 읽고 비교해 출처가 있는 브리핑과 보고서를 만들고 싶어요.", tags: ["리서치", "문서·리서치", "보고서", "PDF", "요약", "분석", "검색"], tone: "mint" },
  { id: "slides", label: "슬라이드·교육자료", description: "복잡한 내용을 발표자료와 이해하기 쉬운 시각 흐름으로 바꾸고 싶어요.", tags: ["슬라이드", "발표", "교육", "프레젠테이션", "디자인", "시각화", "문서"], tone: "blue" },
  { id: "data", label: "데이터 분석", description: "CSV·엑셀·대시보드에서 변화와 이상치를 찾고 싶어요.", tags: ["데이터", "분석", "CSV", "엑셀", "대시보드", "차트", "스프레드시트"], tone: "ink" },
];

function terms(value: string | string[]) { return (Array.isArray(value) ? value : [value]).join(" ").toLowerCase(); }
function scoreTask(task: Task, values: Array<string | string[]>) { const haystack = values.flatMap((value) => Array.isArray(value) ? value : [value]).join(" ").toLowerCase(); return task.tags.reduce((score, tag) => score + (haystack.includes(tag.toLowerCase()) ? 1 : 0), 0); }
function toolLogo(name: string) { const normalized = name.toLowerCase(); if (normalized.includes("claude")) return "claude"; if (normalized.includes("gemini") || normalized.includes("notebooklm")) return "gemini"; if (normalized.includes("chatgpt") || normalized.includes("gpt")) return "chatgpt"; if (normalized.includes("manus")) return "manus"; if (normalized.includes("cursor")) return "cursor"; if (normalized.includes("canva")) return "canva"; if (normalized.includes("gamma")) return "gamma"; return ""; }

export default function TaskRecommender() {
  const [selectedTask, setSelectedTask] = useState(tasks[0]);
  const recommendations = useMemo(() => {
    const toolResults = directoryTools.map((tool) => ({ tool, score: scoreTask(selectedTask, [tool.name, tool.category, tool.sourceCategory, tool.description, tool.useCase, tool.tags]) })).sort((a, b) => b.score - a.score || a.tool.name.localeCompare(b.tool.name)).slice(0, 5);
    const skillResults = skills.map((skill) => ({ skill, score: scoreTask(selectedTask, [skill.name, skill.category, skill.summary, skill.guide, skill.tags, skill.compatible]) })).sort((a, b) => b.score - a.score || a.skill.name.localeCompare(b.skill.name)).slice(0, 4);
    const workflowResults = workflowPrompts.map((workflow) => ({ workflow, score: scoreTask(selectedTask, [workflow.title, workflow.category, workflow.purpose, workflow.tools]) })).sort((a, b) => b.score - a.score || a.workflow.title.localeCompare(b.workflow.title)).slice(0, 2);
    return { toolResults, skillResults, workflowResults };
  }, [selectedTask]);
  return <section className="task-recommender" id="task-recommender"><div className="task-recommender-heading"><div><span className="section-kicker"><Sparkles size={14} /> TASK FIRST / TAG MATCHING</span><h2>하고 싶은 일을 고르면,<br /><em>조합을 제안할게요.</em></h2></div><p>작업 태그와 도구·스킬·업무 프롬프트의 설명을 비교해 지금 시작하기 좋은 조합을 먼저 보여줍니다. 추천은 출발점이며, 공식 기능과 요금은 각 도구에서 확인하세요.</p></div><div className="task-picker" role="listbox" aria-label="작업 선택">{tasks.map((task) => <button key={task.id} type="button" className={`task-picker-item tone-${task.tone} ${selectedTask.id === task.id ? "is-selected" : ""}`} onClick={() => setSelectedTask(task)} aria-selected={selectedTask.id === task.id}><span>{selectedTask.id === task.id ? <Check size={14} /> : task.id.toUpperCase().slice(0, 2)}</span><strong>{task.label}</strong><small>{task.description}</small></button>)}</div><div className="task-match-header"><div><span>SELECTED TASK</span><h3>{selectedTask.label}</h3><p>{selectedTask.description}</p></div><span className="task-match-count">{recommendations.toolResults.length + recommendations.skillResults.length} MATCHES</span></div><div className="task-recommendation-columns"><div className="task-result-group"><div className="task-result-label"><span>01 / AI TOOLS</span><Link href="/tools">전체 도구 보기 <ArrowUpRight size={14} /></Link></div>{recommendations.toolResults.map(({ tool, score }) => <a className="task-result-card" href={tool.url} target="_blank" rel="noreferrer" key={tool.id}><BrandLogo name={toolLogo(tool.name)} compact /><span><strong>{tool.name}</strong><small>{tool.category} · {tool.useCase}</small><em>{score > 0 ? `${score}개 태그 일치` : "유사 역할 추천"}</em></span><ArrowUpRight size={15} /></a>)}</div><div className="task-result-group"><div className="task-result-label"><span>02 / SKILLS & WORKFLOWS</span><Link href="/skills">스킬 라이브러리 <ArrowUpRight size={14} /></Link></div>{recommendations.skillResults.map(({ skill, score }) => <Link className="task-result-card" href="/skills" key={skill.id}><span className="task-result-index">S{String(skill.id).padStart(2, "0")}</span><span><strong>{skill.name}</strong><small>{skill.category} · {skill.summary}</small><em>{score > 0 ? `${score}개 태그 일치` : "유사 절차 추천"}</em></span><ArrowUpRight size={15} /></Link>)}{recommendations.workflowResults.map(({ workflow }) => <Link className="task-result-card task-workflow-result" href={`/workflows/${workflow.id}`} key={workflow.id}><span className="task-result-index">W</span><span><strong>{workflow.title}</strong><small>{workflow.category} · 업무 프롬프트</small><em>바로 실행할 흐름</em></span><ArrowUpRight size={15} /></Link>)}</div></div></section>;
}
