import { archiveFeed } from "./archiveFeed";
import { designSystemReferences } from "./designSystems";
import { directoryTools } from "./toolCatalog";
import { uiCatalog350 } from "./uiCatalog350";
import { skills } from "./skills";
import { workflowPrompts } from "./workflows";
import { accountingWorkflowPrompts, advancedBusinessWorkflowPrompts, excelAutomationWorkflowPrompts, extraWorkflowPrompts } from "./workflowsExtra";

export type SearchKind = "AI 도구" | "SKILL" | "UI Guide" | "디자인 시스템" | "워크플로우" | "아카이브";
export type SearchFilter = "전체" | SearchKind | "프롬프트";
export type SearchRecord = {
  id: string;
  kind: SearchKind;
  title: string;
  summary: string;
  meta: string;
  tags: string[];
  href: string;
  source?: string;
  isPrompt?: boolean;
};

const allWorkflowPrompts = [...workflowPrompts, ...extraWorkflowPrompts, ...accountingWorkflowPrompts, ...excelAutomationWorkflowPrompts, ...advancedBusinessWorkflowPrompts];

export function normalizeSearchText(value: string) {
  return value.normalize("NFKC").toLocaleLowerCase("ko-KR").replace(/\s+/g, " ").trim();
}

const makeRecordText = (record: SearchRecord) => normalizeSearchText([record.title, record.summary, record.meta, ...record.tags].join(" "));

export const globalSearchRecords: SearchRecord[] = [
  ...directoryTools.map((tool) => ({
    id: `tool:${tool.slug}`,
    kind: "AI 도구" as const,
    title: tool.name,
    summary: tool.description,
    meta: `${tool.category} · ${tool.pricing}`,
    tags: [tool.category, tool.sourceCategory, ...tool.tags],
    href: `/tools#${tool.slug}`,
    source: tool.source,
  })),
  ...skills.map((skill) => ({
    id: `skill:${skill.slug}`,
    kind: "SKILL" as const,
    title: skill.name,
    summary: skill.summary,
    meta: `${skill.category} · ${skill.license}`,
    tags: [skill.category, ...skill.tags, ...skill.compatible],
    href: `/skills#${skill.slug}`,
    source: skill.source,
  })),
  ...uiCatalog350.map((item) => ({
    id: `ui:${item.id}`,
    kind: "UI Guide" as const,
    title: item.name,
    summary: item.purpose,
    meta: `${item.category} · ${item.location}`,
    tags: [item.category, item.location, item.pattern, item.example, item.tools],
    href: `/ui-guide#pattern-${item.id}`,
    source: "AI/100 UI Guide 원문 카탈로그",
  })),
  ...designSystemReferences.map((system) => ({
    id: `design:${system.name}`,
    kind: "디자인 시스템" as const,
    title: system.name,
    summary: `${system.owner}의 ${system.platform} 디자인 시스템. ${system.features.join(" · ")}`,
    meta: `${system.difficulty} · ${system.platform}`,
    tags: [system.owner, system.platform, ...system.tech, ...system.features],
    href: "/ui-guide#design-system-" + normalizeSearchText(system.name).replace(/[^a-z0-9가-힣]+/g, "-"),
    source: system.url,
  })),
  ...allWorkflowPrompts.map((workflow) => ({
    id: `workflow:${workflow.id}`,
    kind: "워크플로우" as const,
    title: workflow.title,
    summary: workflow.purpose,
    meta: `${workflow.category} · ${workflow.tools.join(" · ")}`,
    tags: [workflow.category, ...workflow.tools, workflow.background, workflow.request, workflow.output],
    href: `/workflows/${workflow.id}`,
    source: "AI/100 공개 프롬프트 카탈로그",
    isPrompt: true,
  })),
  ...archiveFeed.map((item) => ({
    id: `archive:${item.id}`,
    kind: "아카이브" as const,
    title: item.title,
    summary: item.summary,
    meta: `${item.organization} · ${item.type}`,
    tags: [item.type, item.organization, item.sourceDomain],
    href: "/archive",
    source: item.sourceUrl,
  })),
];

const indexedRecords = globalSearchRecords.map((record) => ({ record, text: makeRecordText(record) }));

export function filterSearchRecords(query: string, filter: SearchFilter = "전체") {
  const term = normalizeSearchText(query);
  return indexedRecords
    .filter(({ record, text }) => {
      const kindMatches = filter === "전체" || (filter === "프롬프트" ? record.isPrompt === true : record.kind === filter);
      return kindMatches && (!term || text.includes(term));
    })
    .map(({ record }) => record);
}

export function getSearchCounts(query = "") {
  const records = filterSearchRecords(query);
  return ["전체", "AI 도구", "SKILL", "UI Guide", "디자인 시스템", "워크플로우", "프롬프트", "아카이브"].map((label) => ({
    label,
    count: filterSearchRecords(query, label as SearchFilter).length,
  }));
}
