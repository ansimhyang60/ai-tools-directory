/* Paper + Pixel Atlas: warm editorial directory, asymmetric index rail, cobalt signals. */
import { useMemo, useState } from "react";
import { ArrowUpRight, BookOpen, ChevronRight, Command, Filter, Grid2X2, Layers3, Search, Sparkles, X } from "lucide-react";
import { tools, categories, difficulties, type Tool } from "@/lib/tools";

const categoryColors: Record<string, string> = {
  "범용 AI": "#2457FF",
  "업무자동화": "#FF654F",
  "바이브코딩": "#1D8B63",
  "UI/UX": "#B66CFF",
  "이미지": "#EBA72B",
  "영상": "#E16A90",
  "음성": "#4384C7",
  "음악": "#7C6EE6",
  "문서·리서치": "#9B6B46",
  "데이터": "#147A78",
  "마케팅": "#D25B45",
};

function Pill({ children, active, onClick, tone = "default" }: { children: React.ReactNode; active?: boolean; onClick?: () => void; tone?: "default" | "mint" | "tomato" }) {
  return <button onClick={onClick} className={`pill ${active ? "is-active" : ""} ${tone !== "default" ? `pill-${tone}` : ""}`}>{children}</button>;
}

function ToolRow({ tool, onOpen, index }: { tool: Tool; onOpen: (tool: Tool) => void; index: number }) {
  return (
    <button className="tool-row" onClick={() => onOpen(tool)} aria-label={`${tool.name} 상세 보기`}>
      <div className="row-index">{String(index + 1).padStart(2, "0")}</div>
      <div className="row-marker" style={{ background: categoryColors[tool.category] || "#2457FF" }} />
      <div className="row-main">
        <div className="row-titleline"><h3>{tool.name}</h3><span className="category-label">{tool.category}</span><span className="role-tag">{tool.role.split("·")[0]}</span></div>
        <p>{tool.summary}</p>
      </div>
      <div className="row-use"><span>사용 예시</span><strong>{tool.example}</strong></div>
      <div className="row-meta"><span className={`difficulty difficulty-${tool.difficulty.replaceAll("~", "-")}`}>{tool.difficulty}</span><ChevronRight size={18} /></div>
    </button>
  );
}

export default function Home() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("전체");
  const [difficulty, setDifficulty] = useState<(typeof difficulties)[number]>("전체");
  const [selected, setSelected] = useState<Tool | null>(null);
  const [view, setView] = useState<"list" | "grid">("list");

  const filtered = useMemo(() => {
    const term = query.trim().toLowerCase();
    return tools.filter((tool) => {
      const matchesTerm = !term || [tool.name, tool.category, tool.role, tool.summary, tool.example, ...tool.tags].join(" ").toLowerCase().includes(term);
      const matchesCategory = category === "전체" || tool.category === category;
      const matchesDifficulty = difficulty === "전체" || tool.difficulty === difficulty;
      return matchesTerm && matchesCategory && matchesDifficulty;
    });
  }, [query, category, difficulty]);

  const reset = () => { setQuery(""); setCategory("전체"); setDifficulty("전체"); };
  const activeFilters = (category !== "전체" ? 1 : 0) + (difficulty !== "전체" ? 1 : 0) + (query ? 1 : 0);

  return (
    <main className="site-shell">
      <header className="topbar">
        <a className="brand" href="#top"><span className="brand-stamp"><span className="stamp-slash">/</span><span className="stamp-main">AI<span>100</span></span><span className="stamp-caption">FIELD<br />GUIDE</span></span></a>
        <nav className="topnav" aria-label="주요 메뉴"><a href="#directory">도구 찾기</a><a href="#path">학습 경로</a><a href="#about">사용 원칙</a></nav>
        <div className="top-actions"><span className="updated">AUG 2026 · 100 ENTRIES</span><button className="icon-button" aria-label="검색으로 이동" onClick={() => document.getElementById("search")?.focus()}><Search size={17} /></button></div>
      </header>

      <section className="hero" id="top">
        <div className="hero-copy">
          <div className="eyebrow"><span className="eyebrow-dot" /> A HUMAN-CURATED INDEX OF AI TOOLS</div>
          <h1>Start with<br /><em>the job,</em><br />not the tool.</h1>
          <p className="hero-dek">기획부터 디자인, 코딩, 자동화, 데이터, 마케팅까지. 지금 만들고 싶은 일을 말하면, 가장 작은 유용한 도구 조합을 찾을 수 있습니다.</p>
          <div className="hero-actions"><a className="primary-action" href="#directory">100개 도구 살펴보기 <ArrowUpRight size={17} /></a><span className="hero-note">검색하고 · 비교하고 · 바로 시도하세요</span></div>
        </div>
        <div className="hero-art"><img src="/manus-storage/ai-atlas-hero_c483f211.png" alt="AI 도구를 분류한 종이 아틀라스 일러스트" /><div className="hero-stamp"><strong>100</strong><span>tools<br />indexed</span></div></div>
      </section>

      <section className="signal-strip" aria-label="디렉터리 요약"><div><span className="strip-number">10</span><span>categories</span></div><div><span className="strip-number">06</span><span>difficulty levels</span></div><div><span className="strip-number">∞</span><span>possible stacks</span></div><div className="strip-note">도구를 외우는 대신<br /><strong>문제를 작게 쪼개세요.</strong></div></section>

      <div className="content-layout" id="directory">
        <aside className="index-rail">
          <div className="rail-heading"><span>INDEX</span><span>{String(categories.length - 1).padStart(2, "0")}</span></div>
          <div className="rail-list">{categories.slice(1).map((item, idx) => <button key={item} className={category === item ? "rail-item active" : "rail-item"} onClick={() => setCategory(item)}><span>{String(idx + 1).padStart(2, "0")}</span>{item}</button>)}</div>
          <div className="rail-art"><img src="/manus-storage/ai-atlas-orbit_7f66df78.png" alt="AI 도구 카테고리 연결 일러스트" /><span>FIND<br />YOUR<br />NEXT<br />MOVE</span></div>
        </aside>

        <section className="directory-panel">
          <div className="section-intro"><div><span className="section-kicker">THE DIRECTORY</span><h2>어떤 일을<br /><em>하고 있나요?</em></h2></div><p>이름을 알고 있지 않아도 괜찮습니다. 지금 필요한 업무나 만들고 싶은 결과를 검색해 보세요.</p></div>
          <div className="search-wrap"><Search size={21} /><input id="search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="예: 홈페이지, 회의록, 고객 메일, 이미지, 데이터 분석…" /><kbd><Command size={12} /> K</kbd>{query && <button className="clear-search" onClick={() => setQuery("")} aria-label="검색어 지우기"><X size={15} /></button>}</div>
          <div className="filter-bar"><div className="filter-group"><span className="filter-label"><Filter size={13} /> CATEGORY</span><div className="pills">{categories.slice(0, 7).map((item) => <Pill key={item} active={category === item} onClick={() => setCategory(item)}>{item}</Pill>)}<select aria-label="추가 카테고리 선택" value={categories.slice(0, 7).includes(category) ? "" : category} onChange={(e) => setCategory(e.target.value || "전체")}><option value="">더 보기 +</option>{categories.slice(7).map((item) => <option key={item} value={item}>{item}</option>)}</select></div></div><div className="filter-group difficulty-group"><span className="filter-label">LEVEL</span><div className="pills">{difficulties.map((item) => <Pill key={item} active={difficulty === item} onClick={() => setDifficulty(item)} tone={item === "초급" ? "mint" : item === "고급" ? "tomato" : "default"}>{item}</Pill>)}</div></div></div>
          <div className="results-head"><div><strong>{filtered.length}</strong> tools found {activeFilters > 0 && <span className="filter-count">{activeFilters} filters active</span>}</div><div className="view-switch"><button className={view === "list" ? "active" : ""} onClick={() => setView("list")} aria-label="목록 보기"><Layers3 size={16} /></button><button className={view === "grid" ? "active" : ""} onClick={() => setView("grid")} aria-label="격자 보기"><Grid2X2 size={16} /></button></div></div>
          {filtered.length ? <div className={view === "list" ? "tool-list" : "tool-grid"}>{filtered.map((tool, idx) => <ToolRow key={tool.id} tool={tool} index={tools.indexOf(tool)} onOpen={setSelected} />)}</div> : <div className="empty-state"><Sparkles size={26} /><h3>아직 이 조합은 찾지 못했어요.</h3><p>검색어를 조금 넓히거나 필터를 초기화해 보세요.</p><button className="secondary-action" onClick={reset}>필터 모두 초기화</button></div>}
        </section>
      </div>

      <section className="path-section" id="path"><div className="path-art"><img src="/manus-storage/ai-atlas-workbench_40cdd8e5.png" alt="AI 프로젝트를 만드는 작업대 일러스트" /></div><div className="path-copy"><span className="section-kicker">A SMALL PATH TO A REAL PROJECT</span><h2>처음이라면,<br /><em>이 순서로.</em></h2><div className="path-steps"><div><span>01</span><p><strong>말로 정리하기</strong> ChatGPT·Claude로 문제와 사용자를 한 문장으로 적습니다.</p></div><div><span>02</span><p><strong>화면 그려보기</strong> Stitch·Canva·Figma로 첫 화면과 흐름을 확인합니다.</p></div><div><span>03</span><p><strong>작게 만들어 공개하기</strong> Replit·Lovable로 만들고 GitHub·Vercel로 공유합니다.</p></div></div><a className="text-link" href="#directory">도구 조합을 다시 찾기 <ArrowUpRight size={16} /></a></div></section>

      <section className="principles" id="about"><div><span className="section-kicker">FIELD NOTES</span><h2>도구보다<br /><em>흐름이 먼저.</em></h2></div><div className="principle-grid"><div className="principle-margin-note">FIELD<br />NOTES<br />/03</div><article><span>01</span><h3>개인정보를 지키기</h3><p>고객 명단과 기밀 문서는 익명화하고, AI가 만든 결과는 사람이 마지막에 확인합니다.</p></article><article><span>02</span><h3>작은 자동화부터</h3><p>대량 발송보다 내 업무 한 단계부터 시험합니다. 실패해도 되돌릴 수 있게 로그와 백업을 남깁니다.</p></article><article><span>03</span><h3>한 도구에 올인하지 않기</h3><p>조사·디자인·개발·배포는 각자 잘하는 도구로 나누면 결과를 설명하고 개선하기 쉽습니다.</p></article></div></section>
      <footer className="footer"><div className="footer-brand">AI<span>/</span>100</div><p>작은 문제를 찾고, 알맞은 도구를 고르고, 실제 결과를 공유하세요.</p><div className="footer-visual"><img src="/manus-storage/ai-atlas-signal_b9c95bbb.png" alt="AI 도구 선택을 상징하는 신호 일러스트" /></div><span className="footer-meta">CURATED FIELD GUIDE · 2026</span></footer>

      {selected && <div className="detail-backdrop" onClick={() => setSelected(null)}><aside className="detail-panel" onClick={(e) => e.stopPropagation()}><button className="detail-close" onClick={() => setSelected(null)} aria-label="상세 패널 닫기"><X size={19} /></button><div className="detail-index"><span>ENTRY</span> {String(selected.id).padStart(3, "0")} <span className="detail-rule" /></div><div className="detail-marker" style={{ background: categoryColors[selected.category] || "#2457FF" }} /><span className="category-label">{selected.category}</span><h2>{selected.name}</h2><p className="detail-role">{selected.role}</p><div className="detail-block"><span>이럴 때 써보세요</span><strong>{selected.example}</strong></div><div className="detail-block"><span>시작 난이도</span><strong>{selected.difficulty}</strong></div><div className="detail-tags">{selected.tags.map((tag) => <span key={tag}>#{tag}</span>)}</div>{selected.url && <a className="primary-action detail-action" href={selected.url} target="_blank" rel="noreferrer">공식 페이지 열기 <ArrowUpRight size={16} /></a>}<p className="detail-footnote">기능과 요금제는 서비스별로 달라질 수 있으니 실제 도입 전 공식 안내를 확인하세요.</p></aside></div>}
    </main>
  );
}
