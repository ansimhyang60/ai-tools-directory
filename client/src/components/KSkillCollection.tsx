import { useMemo, useState } from "react";
import { Check, Copy, ExternalLink, Search } from "lucide-react";
import { kSkillCatalog, type KSkillCategory } from "@/lib/kSkillCatalog";
import { skillCollectionNav } from "@/lib/siteNav";

const categories: Array<"전체" | KSkillCategory> = ["전체", ...Array.from(new Set(kSkillCatalog.map((skill) => skill.category)))];
const allInstallCommand = "npx --yes skills add NomaDamas/k-skill --all -g";

function humanize(value: string) {
  return value.replace(/-/g, " ");
}

export default function KSkillCollection() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<(typeof categories)[number]>("전체");
  const [copied, setCopied] = useState("");
  const filtered = useMemo(() => {
    const term = query.trim().toLowerCase();
    return kSkillCatalog.filter((skill) => (category === "전체" || skill.category === category) && (!term || `${skill.name} ${skill.slug} ${skill.category}`.toLowerCase().includes(term)));
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
    {filtered.length ? <div className="k-skill-grid">{filtered.map((skill) => { const command = `npx --yes skills add NomaDamas/k-skill --skill ${skill.slug} -g`; return <article className="k-skill-card" key={skill.slug}><div className="k-skill-card-meta"><span>{skill.category}</span><span>#{skill.slug}</span></div><h3>{humanize(skill.name)}</h3><div className="k-skill-card-actions"><a href={skill.url} target="_blank" rel="noreferrer">원문 보기 <ExternalLink size={13} /></a><button type="button" onClick={() => copyCommand(command)} aria-label={`${skill.name} 개별 설치 명령 복사`}>{copied === command ? <Check size={14} /> : <Copy size={14} />} {copied === command ? "복사됨" : "설치 명령"}</button></div></article>; })}</div> : <div className="k-skill-empty">검색 조건에 맞는 k-skill이 없습니다. 분야를 전체로 바꾸거나 다른 키워드를 입력해 보세요.</div>}
    <p className="k-skill-note">공식 저장소의 README와 각 스킬 안내를 먼저 확인하세요. KTX·SRT처럼 조회 전용인 항목이 있으며, 로그인·예약·결제·취소 가능 여부는 스킬별 안내가 우선합니다.</p>
  </section>;
}
