import { useMemo, useState } from "react";
import { ArrowUpRight, ChevronRight, Search } from "lucide-react";
import { Link } from "wouter";
import { skills } from "@/lib/skills";
import { skills300 } from "@/lib/skills300";
import { skillCollectionNav } from "@/lib/siteNav";
import { PageFrame } from "./GuideShared";
import { VirtualizedList } from "@/components/VirtualizedList";
import KSkillCollection from "@/components/KSkillCollection";

type SkillSource = "internal" | "k-skill";

export function SkillsPage() {
  const [source, setSource] = useState<SkillSource>(() => new URLSearchParams(window.location.search).get("source") === "k-skill" ? "k-skill" : "internal");
  const allSkills = useMemo(() => [...skills, ...skills300], []);
  const allCategories = useMemo(() => ["전체", ...Array.from(new Set(allSkills.map((skill) => skill.category)))], [allSkills]);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("전체");
  const filtered = useMemo(() => {
    const term = query.trim().toLowerCase();
    return allSkills.filter((skill) => (category === "전체" || skill.category === category) && (!term || [skill.name, skill.category, skill.summary, skill.tags.join(" ")].join(" ").toLowerCase().includes(term)));
  }, [allSkills, query, category]);

  const internalContent = <>
    <section className="skill-explainer"><div className="skill-explainer-heading"><span className="section-kicker">SKILL / HOW IT WORKS</span><h2>AI 도구를 쓰는 법을<br /><em>스킬로 고정하세요.</em></h2><p>스킬은 AI에게 매번 같은 배경을 설명하는 대신, 역할·입력·절차·제약·예시·검수 기준을 한 번 저장해 두는 작업 지침입니다. 도구가 바뀌어도 같은 품질의 결과를 반복해서 만들 수 있게 합니다.</p></div><div className="skill-explainer-grid"><article><span>01 / 정의</span><strong>무엇을 하나요?</strong><p>막연한 목표를 실행 가능한 단계로 바꾸고, 어떤 AI 도구를 언제 쓸지 정합니다.</p></article><article><span>02 / 입력</span><strong>무엇을 넣나요?</strong><p>자료 형식, 대상 사용자, 언어, 분량, 개인정보와 사용하면 안 되는 자료를 명확히 합니다.</p></article><article><span>03 / 절차</span><strong>어떻게 진행하나요?</strong><p>조사·생성·변환·검수·배포를 나누고, 외부 게시나 결제에는 사람 승인 지점을 둡니다.</p></article><article><span>04 / 결과</span><strong>무엇이 남나요?</strong><p>프롬프트, 산출 형식, 예외 처리, 검수 체크리스트를 남겨 다음 작업에 재사용합니다.</p></article></div><div className="skill-explainer-flow"><span>REUSABLE FLOW</span><strong>목표 정의 → 자료 준비 → 도구 선택 → 작은 샘플 → 사람 검수 → 반복 사용</strong><p>처음부터 모든 것을 자동화하지 않습니다. 대표 입력 하나로 시험하고, 결과가 안정되면 범위를 넓히세요.</p></div></section>
    <section className="skills-role-note"><div><span>TOOLS ≠ SKILLS</span><strong>도구는 ‘무엇을 쓰는가’,<br />스킬은 ‘어떻게 일하는가’입니다.</strong></div><div className="skills-role-columns"><article><b>도구 찾기</b><p>GPT·Claude·Codex·Stitch·Manus처럼 AI 도구의 역할, 추천 상황, 활용 예시, 공식 링크를 확인합니다.</p><Link href="/tools">도구 찾기로 이동 <ArrowUpRight size={14} /></Link></article><article><b>스킬 라이브러리</b><p>특정 도구에 적용할 수 있는 작업 절차, 반복 가능한 플레이북, 스킬 링크와 프롬프트 사용법을 확인합니다.</p><span>현재 페이지</span></article></div></section>
    <section className="skills-browser"><label><Search size={18} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="예: 릴스, 유튜브, UI, 자동화, 프롬프트…" aria-label="스킬 검색" /></label><select value={category} onChange={(event) => setCategory(event.target.value)} aria-label="스킬 카테고리 선택">{allCategories.map((item) => <option key={item} value={item}>{item}</option>)}</select><span>{filtered.length} / 400</span></section>
    <VirtualizedList items={filtered} itemHeight={112} className="skills-page-list" renderItem={(skill, index) => <details className={`skill-page-entry skill-tone-${index % 8}`}><summary><span>{String(index + 1).padStart(3, "0")}</span><div><b>{skill.name}</b><small>{skill.summary}</small></div><em>{skill.category}</em><i>SKILL INDEX</i><ChevronRight size={17} /></summary><div className="skill-page-detail"><p>{skill.guide}</p><div className="skill-page-columns"><div><span>사용 방법</span><p>{skill.howTo}</p></div><div><span>프롬프트 예시</span><p className="prompt-example">{skill.example}</p></div><div><span>지원·활용 도구</span><p>{skill.compatible.join(" · ")}</p></div><div><span>라이선스</span><p>{skill.license} · {skill.licenseNote}</p></div></div><div className="skill-page-actions"><a href={skill.sourceUrl} target="_blank" rel="noreferrer">원문·공식 참고 <ArrowUpRight size={15} /></a>{skill.importUrl && <a href={skill.importUrl} target="_blank" rel="noreferrer">Manus 가져오기 <ArrowUpRight size={15} /></a>}</div></div></details>} />
  </>;

  return <PageFrame active="/skills" kicker="AGENT SKILL LIBRARY / 400" title={<>AI에게<br /><em>일하는 법을 가르치기.</em></>}>
    <section className="skills-page-intro"><p>AI 활용 가이드의 실전 플레이북 300개와 공개 저장소 스킬을 구분해 함께 탐색합니다. 먼저 어떤 소스의 스킬을 찾는지 선택한 다음, 필요한 작업 절차나 한국형 서비스 스킬을 골라보세요.</p><div className="skill-page-stats"><strong>400</strong><span>internal skills</span><strong>{allCategories.length - 1}</strong><span>fields</span></div></section>
    <section className="skill-source-switcher" aria-labelledby="skill-source-heading"><div className="skill-source-switcher-copy"><span className="section-kicker">CHOOSE A SKILL SOURCE</span><h2 id="skill-source-heading">어떤 스킬을<br /><em>찾고 있나요?</em></h2><p>업무를 설계하는 실전 플레이북과 한국형 생활 서비스를 다루는 k-skill은 목적이 다릅니다. 출처를 먼저 고르면 목록이 더 단순해집니다.</p></div><div className="skill-source-tabs" role="tablist" aria-label="스킬 소스 선택"><button type="button" role="tab" aria-selected={source === "internal"} className={source === "internal" ? "is-active" : ""} onClick={() => setSource("internal")}><span>01</span><strong>실전 플레이북</strong><small>AI 활용 가이드 · 400개</small></button><button type="button" role="tab" aria-selected={source === "k-skill"} className={source === "k-skill" ? "is-active" : ""} onClick={() => setSource("k-skill")}><span>02</span><strong>한국형 k-skill</strong><small>NomaDamas · 116개</small></button></div></section>
    {source === "k-skill" ? <><section className="skill-external-source"><div><span className="section-kicker">EXTERNAL SKILL COLLECTION / K-SKILL</span><h2>한국형 생활 스킬을<br /><em>공식 모음집에서 확인하세요.</em></h2><p>SRT·KTX·공공서비스·생활·금융 등 한국 사용자를 위한 공개 스킬 모음집입니다. 내부 실전 플레이북과 구분해 원문 저장소에서 설치·기여 방법을 확인하세요.</p></div><a href={skillCollectionNav.href} target="_blank" rel="noreferrer">{skillCollectionNav.mobileLabel} 열기 <ArrowUpRight size={15} /></a></section><KSkillCollection /></> : internalContent}
  </PageFrame>;
}
