import { ArrowUpRight, BookOpen, ChevronRight, Home as HomeIcon, Search, ShieldCheck, Sparkles } from "lucide-react";
import { Link } from "wouter";
import { uiGuides } from "@/lib/uiGuides";
import { skills, skillCategories } from "@/lib/skills";

const nav = [
  ["도구 찾기", "/"],
  ["UI 참고", "/ui-guide"],
  ["스킬 라이브러리", "/skills"],
  ["학습 경로", "/path"],
  ["사용 원칙", "/principles"],
] as const;

function PageFrame({ active, kicker, title, children }: { active: string; kicker: string; title: React.ReactNode; children: React.ReactNode }) {
  return <main className="site-shell inner-page"><header className="topbar"><Link className="brand" href="/"><span className="brand-stamp"><span className="stamp-slash">/</span><span className="stamp-main">AI<span>100</span></span><span className="stamp-caption">FIELD<br />GUIDE</span></span></Link><nav className="topnav" aria-label="주요 메뉴">{nav.map(([label, href]) => <Link key={href} className={active === href ? "active" : ""} href={href}>{label}</Link>)}</nav><div className="top-actions"><span className="updated">AI/100 FIELD GUIDE</span><Link className="icon-button" href="/" aria-label="홈으로 이동"><HomeIcon size={16} /></Link></div></header><section className="inner-hero"><div><span className="section-kicker">{kicker}</span><h1>{title}</h1></div><Link className="back-home" href="/"><HomeIcon size={15} /> 홈으로 돌아가기</Link></section>{children}<footer className="footer inner-footer"><div className="footer-brand">AI<span>/</span>100</div><p>작은 문제를 찾고, 알맞은 도구를 고르고, 실제 결과를 공유하세요.</p><span className="footer-meta">CURATED FIELD GUIDE · 2026</span></footer></main>;
}

export function UiGuidePage() {
  return <PageFrame active="/ui-guide" kicker="UI / UX FIELD KIT" title={<>화면 요소별<br /><em>추천 도구.</em></>}><section className="guide-page-grid">{uiGuides.map((guide, i) => <article className="guide-page-card" key={guide.element}><span className="guide-page-index">{String(i + 1).padStart(2, "0")}</span><h2>{guide.element}</h2><p>{guide.goal}</p><div className="ui-tool-tags">{guide.recommended.map((name) => <span key={name}>{name}</span>)}</div><div className="guide-example"><span>실제 참고 포인트</span><strong>{guide.example}</strong></div></article>)}</section></PageFrame>;
}

export function SkillsPage() {
  return <PageFrame active="/skills" kicker="AGENT SKILL LIBRARY / 100" title={<>AI에게<br /><em>일하는 법을 가르치기.</em></>}><section className="skills-page-intro"><p>GitHub 공개 저장소에서 확인한 스킬을 새 페이지에서 탐색할 수 있습니다. 홈 화면의 긴 스크롤을 반복하지 않고, 이 페이지에서 스킬 가이드·원문 링크·지원 도구·라이선스 상태를 확인하세요.</p><div className="skill-page-stats"><strong>100</strong><span>skills indexed</span><strong>{skillCategories.length - 1}</strong><span>fields</span></div></section><section className="skills-page-list">{skills.map((skill) => <details className="skill-page-entry" key={skill.id}><summary><span>{String(skill.id).padStart(3, "0")}</span><b>{skill.name}</b><em>{skill.category}</em><ChevronRight size={17} /></summary><div className="skill-page-detail"><p>{skill.guide}</p><div className="skill-page-columns"><div><span>사용 방법</span><p>{skill.howTo}</p></div><div><span>프롬프트 예시</span><p className="prompt-example">{skill.example}</p></div><div><span>지원·활용 도구</span><p>{skill.compatible.join(" · ")}</p></div><div><span>라이선스</span><p>{skill.license} · {skill.licenseNote}</p></div></div><div className="skill-page-actions"><a href={skill.sourceUrl} target="_blank" rel="noreferrer">GitHub 원문 <ArrowUpRight size={15} /></a>{skill.importUrl && <a href={skill.importUrl} target="_blank" rel="noreferrer">Manus 가져오기 <ArrowUpRight size={15} /></a>}</div></div></details>)}</section></PageFrame>;
}

export function PathPage() {
  const steps = [["01", "말로 정리하기", "ChatGPT·Claude로 문제와 사용자를 한 문장으로 적습니다."], ["02", "화면 그려보기", "Stitch·Canva·Figma로 첫 화면과 흐름을 확인합니다."], ["03", "작게 만들어 공개하기", "Replit·Lovable로 만들고 GitHub·Vercel로 공유합니다."], ["04", "실제 업무에 붙이기", "반복 메일·문서·데이터 작업 중 한 단계만 자동화합니다."], ["05", "사용자에게 검증받기", "방문자 행동과 피드백을 보고 다음 기능을 결정합니다."]];
  return <PageFrame active="/path" kicker="A SMALL PATH TO A REAL PROJECT" title={<>처음이라면,<br /><em>이 순서로.</em></>}><section className="path-page"><div className="path-page-lead"><Sparkles size={24} /><p>처음부터 거대한 서비스를 만들지 않습니다. 이해할 수 있는 작은 결과를 만들고, 공개하고, 다시 개선하는 순서입니다.</p></div><div className="path-page-steps">{steps.map(([num, name, text]) => <article key={num}><span>{num}</span><div><h2>{name}</h2><p>{text}</p></div><ChevronRight size={19} /></article>)}</div><div className="path-page-cta"><Link className="primary-action" href="/">도구 조합 다시 찾기 <ArrowUpRight size={16} /></Link></div></section></PageFrame>;
}

export function PrinciplesPage() {
  const rules = [["01", "개인정보를 지키기", "고객 명단과 기밀 문서는 익명화하고, AI가 만든 결과는 사람이 마지막에 확인합니다."], ["02", "작은 자동화부터", "대량 발송보다 내 업무 한 단계부터 시험합니다. 실패해도 되돌릴 수 있게 로그와 백업을 남깁니다."], ["03", "한 도구에 올인하지 않기", "조사·디자인·개발·배포는 각자 잘하는 도구로 나누면 결과를 설명하고 개선하기 쉽습니다."], ["04", "라이선스 확인하기", "GitHub 스킬과 오픈소스 코드는 저장소의 LICENSE와 사용 조건을 확인한 뒤 적용합니다."], ["05", "결과를 기록하기", "무엇을 입력했고 무엇이 바뀌었는지 남겨야 다음 사람이 다시 사용할 수 있습니다."]];
  return <PageFrame active="/principles" kicker="FIELD NOTES / SAFETY" title={<>도구보다<br /><em>흐름이 먼저.</em></>}><section className="principles-page"><div className="principles-page-note"><ShieldCheck size={23} /><p>AI는 대신 결정하는 사람이 아니라, 사람이 더 빨리 시도하게 해주는 작업 파트너입니다.</p></div>{rules.map(([num, title, text]) => <article key={num}><span>{num}</span><div><h2>{title}</h2><p>{text}</p></div></article>)}</section></PageFrame>;
}
