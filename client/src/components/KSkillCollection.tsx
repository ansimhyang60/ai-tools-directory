import { useEffect, useMemo, useState } from "react";
import { Check, Copy, ExternalLink, Search } from "lucide-react";
import { kSkillCatalog, type KSkillCategory } from "@/lib/kSkillCatalog";
import { skillCollectionNav } from "@/lib/siteNav";

const categories: Array<"전체" | KSkillCategory> = ["전체", ...Array.from(new Set(kSkillCatalog.map((skill) => skill.category)))];
export const K_SKILL_PAGE_SIZE = 24;
export const allInstallCommand = "npx --yes skills add NomaDamas/k-skill --all -g";

export const getVisibleKSkills = <T,>(skills: T[], count: number) => skills.slice(0, count);
export const getKSkillInstallCommand = (slug: string) => `npx --yes skills add NomaDamas/k-skill --skill ${slug} -g`;

function humanize(value: string) {
  return value.replace(/-/g, " ");
}

export function getKoreanDescription(category: KSkillCategory) {
  const descriptions: Record<KSkillCategory, string> = {
    교통: "한국 교통·이동 정보를 조회하거나 예약 흐름을 준비하는 스킬입니다.",
    공공서비스: "한국 공공기관의 공고·행정 정보를 찾고 비교하는 스킬입니다.",
    생활: "날씨·지도·건강·주거 등 일상 정보를 확인하는 스킬입니다.",
    쇼핑: "상품·가격·딜 정보를 비교하고 찾는 스킬입니다.",
    "금융·비즈니스": "기업·금융·통계·업무 자료를 조회하고 정리하는 스킬입니다.",
    "문서·개발": "문서 편집·개발 환경·패키지 작업을 돕는 스킬입니다.",
    "콘텐츠·검색": "뉴스·연구·글쓰기·검색 작업을 빠르게 시작하는 스킬입니다.",
    기타: "한국 생활과 서비스 활용에 필요한 공개 스킬입니다.",
  };
  return descriptions[category];
}

export default function KSkillCollection() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<(typeof categories)[number]>("전체");
  const [copied, setCopied] = useState("");
  const [visibleCount, setVisibleCount] = useState(K_SKILL_PAGE_SIZE);
  const filtered = useMemo(() => {
    const term = query.trim().toLowerCase();
    return kSkillCatalog.filter((skill) => (category === "전체" || skill.category === category) && (!term || `${skill.name} ${skill.slug} ${skill.category}`.toLowerCase().includes(term)));
  }, [category, query]);
  const visibleSkills = useMemo(() => getVisibleKSkills(filtered, visibleCount), [filtered, visibleCount]);
  useEffect(() => {
    setVisibleCount(K_SKILL_PAGE_SIZE);
  }, [category, query]);
  const copyCommand = async (command: string) => {
    try {
      await navigator.clipboard?.writeText(command);
      setCopied(command);
      window.setTimeout(() => setCopied(""), 1800);
    } catch {
      setCopied("");
    }
  };

  return <section className="k-skill-collection" aria-labelledby="k-skill-heading">
    <div className="k-skill-collection-head">
      <div><span className="section-kicker">K-SKILL / 116 OFFICIAL FOLDERS</span><h2 id="k-skill-heading">한국형 스킬을<br /><em>골라서 설치하세요.</em></h2><p>교통·공공서비스·생활·쇼핑·금융·문서·콘텐츠 분야의 공개 스킬을 분야별로 찾고, 원문 GitHub 링크와 설치 명령을 바로 확인합니다.</p></div>
      <a className="k-skill-repo-link" href={skillCollectionNav.href} target="_blank" rel="noreferrer">공식 저장소 <ExternalLink size={15} /></a>
    </div>
    <div className="k-skill-install-bar"><div><span>전체 설치</span><code>{allInstallCommand}</code></div><button type="button" onClick={() => copyCommand(allInstallCommand)} aria-label="전체 k-skill 설치 명령 복사">{copied === allInstallCommand ? <Check size={15} /> : <Copy size={15} />} {copied === allInstallCommand ? "복사됨" : "명령 복사"}</button></div>
    <div className="k-skill-controls"><label><Search size={17} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="예: KTX, 홈택스, 쇼핑, 뉴스…" aria-label="k-skill 검색" /></label><div className="k-skill-category-tabs" role="group" aria-label="k-skill 분야 필터">{categories.map((item) => <button type="button" key={item} className={category === item ? "is-active" : ""} onClick={() => setCategory(item)} aria-pressed={category === item}>{item}</button>)}</div><span className="k-skill-count">{filtered.length} / {kSkillCatalog.length}</span></div>
    {filtered.length ? <><div className="k-skill-grid">{visibleSkills.map((skill) => { const command = getKSkillInstallCommand(skill.slug); return <article className="k-skill-card" key={skill.slug}><div className="k-skill-card-meta"><span>{skill.category}</span><span>#{skill.slug}</span></div><h3>{humanize(skill.name)}</h3><p className="k-skill-card-description">{getKoreanDescription(skill.category)}</p><div className="k-skill-card-actions"><a href={skill.url} target="_blank" rel="noreferrer">원문 보기 <ExternalLink size={13} /></a><button type="button" onClick={() => copyCommand(command)} aria-label={`${skill.name} 개별 설치 명령 복사`}>{copied === command ? <Check size={14} /> : <Copy size={14} />} {copied === command ? "복사됨" : "설치 명령"}</button></div></article>; })}</div><div className="k-skill-pagination"><span>{visibleSkills.length} / {filtered.length} 표시</span><div>{visibleCount > K_SKILL_PAGE_SIZE && <button type="button" onClick={() => setVisibleCount(K_SKILL_PAGE_SIZE)}>처음으로</button>}{visibleCount < filtered.length && <button type="button" onClick={() => setVisibleCount((count) => Math.min(count + K_SKILL_PAGE_SIZE, filtered.length))}>더 보기 <span aria-hidden="true">＋</span></button>}</div></div></> : <div className="k-skill-empty">검색 조건에 맞는 k-skill이 없습니다. 분야를 전체로 바꾸거나 다른 키워드를 입력해 보세요.</div>}
    <p className="k-skill-note">공식 저장소의 README와 각 스킬 안내를 먼저 확인하세요. KTX·SRT처럼 조회 전용인 항목이 있으며, 로그인·예약·결제·취소 가능 여부는 스킬별 안내가 우선합니다.</p>
  </section>;
}
