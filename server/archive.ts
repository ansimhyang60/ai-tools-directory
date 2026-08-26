import { createHash } from "node:crypto";
import { upsertArchiveItem } from "./db";
import type { InsertArchiveItem } from "../drizzle/schema";

const officialSeeds: Array<Omit<InsertArchiveItem, "contentHash" | "lastSeenAt" | "createdAt" | "updatedAt">> = [
  { type: "contest", title: "제14회 범정부 공공데이터·AI 활용 창업경진대회 통합공고", summary: "공공데이터와 인공지능을 활용한 아이디어 기획 및 제품·서비스 개발을 통해 공공데이터 기반 창업을 촉진하는 범정부 경진대회입니다. 예선 기관별 모집기간과 신청방법은 공공데이터포털에서 확인해야 합니다.", organization: "행정안전부", sourceDomain: "mois.go.kr", sourceUrl: "https://www.mois.go.kr/frt/bbs/type013/commonSelectBoardArticle.do?bbsId=BBSMSTR_000000000006&nttId=125058", publishedAt: new Date("2026-04-08T00:00:00Z"), eventStartAt: null, eventEndAt: null, deadlineAt: null, status: "unknown", tags: JSON.stringify(["공공데이터", "AI", "창업", "경진대회"]) },
  { type: "contest", title: "중소기업 AI 전환 우수사례 공모전 모집공고", summary: "중소기업의 AI 전환 우수사례를 발굴하고 공유하기 위한 공모전 모집공고입니다. 공고 원문과 첨부 안내에서 신청기간과 제출서류를 확인할 수 있습니다.", organization: "중소벤처기업부", sourceDomain: "mss.go.kr", sourceUrl: "https://www.mss.go.kr/site/smba/ex/bbs/View.do?cbIdx=310&bcIdx=1061253&parentSeq=1061253", publishedAt: new Date("2025-08-28T00:00:00Z"), eventStartAt: null, eventEndAt: null, deadlineAt: null, status: "closed", tags: JSON.stringify(["중소기업", "AI 전환", "활용사례", "공모전"]) },
  { type: "exhibition", title: "2026 공공 AI 박람회(KPAIX)", summary: "행정안전부가 개최한 공공 AI 박람회로, 공공 AI 솔루션·재해복구·AI 플랫폼과 클라우드·스타트업 기술 전시 및 포럼을 소개합니다.", organization: "행정안전부", sourceDomain: "mois.go.kr", sourceUrl: "https://www.mois.go.kr/frt/bbs/type010/commonSelectBoardArticle.do?bbsId=BBSMSTR_000000000008&nttId=127100", publishedAt: new Date("2026-06-23T00:00:00Z"), eventStartAt: new Date("2026-06-23T00:00:00Z"), eventEndAt: new Date("2026-06-24T00:00:00Z"), deadlineAt: null, status: "closed", tags: JSON.stringify(["공공 AI", "박람회", "전시", "포럼"]) },
  { type: "case-study", title: "(2026년) AI 정부 서비스 사례집", summary: "행정안전부와 한국지능정보사회진흥원이 발간한 공공부문 AI 활용 우수사례 모음입니다. 홍수예보·노동법 상담·복지 사각지대 발굴 등 16개 사례를 소개합니다.", organization: "행정안전부·한국지능정보사회진흥원", sourceDomain: "mois.go.kr", sourceUrl: "https://www.mois.go.kr/frt/bbs/type001/commonSelectBoardArticle.do?bbsId=BBSMSTR_000000000015&nttId=124688", publishedAt: new Date("2026-03-24T00:00:00Z"), eventStartAt: null, eventEndAt: null, deadlineAt: null, status: "ongoing", tags: JSON.stringify(["AI 정부", "공공서비스", "활용사례", "사례집"]) },
];

const rssSources = [
  { url: "https://www.mois.go.kr/gpms/view/jsp/rss/rss.jsp?ctxCd=1012", domain: "mois.go.kr", type: "news" as const },
  { url: "https://www.mois.go.kr/gpms/view/jsp/rss/rss.jsp?ctxCd=1001", domain: "mois.go.kr", type: "grant" as const },
];

function stripHtml(value: string) { return value.replace(/<[^>]*>/g, " ").replace(/<!\[CDATA\[|\]\]>/g, "").replace(/&nbsp;/g, " ").replace(/&amp;/g, "&").replace(/\s+/g, " ").trim(); }
function tagList(title: string, summary: string) { return JSON.stringify(Array.from(new Set(`${title} ${summary}`.split(/\s+/).filter((word) => word.length > 1).slice(0, 8)))); }
function hashFor(item: Pick<InsertArchiveItem, "type" | "title" | "sourceUrl">) { return createHash("sha256").update(`${item.type}|${item.title}|${item.sourceUrl}`).digest("hex"); }
function textBetween(block: string, tag: string) { const match = block.match(new RegExp(`<${tag}(?:\\s[^>]*)?>([\\s\\S]*?)<\\/${tag}>`, "i")); return match?.[1] ? stripHtml(match[1]) : ""; }

function parseRss(xml: string, source: typeof rssSources[number]) {
  return Array.from(xml.matchAll(/<item(?:\s[^>]*)?>([\s\S]*?)<\/item>/gi)).map((match) => {
    const block = match[1] ?? "";
    const title = textBetween(block, "title");
    const link = textBetween(block, "link");
    const summary = textBetween(block, "description");
    const published = textBetween(block, "pubDate");
    if (!title || !link) return null;
    const item: InsertArchiveItem = { type: source.type, title, summary: summary || "공식 출처의 원문에서 자세한 내용을 확인하세요.", organization: "행정안전부", sourceDomain: source.domain, sourceUrl: link, publishedAt: published ? new Date(published) : null, eventStartAt: null, eventEndAt: null, deadlineAt: null, status: "unknown", tags: tagList(title, summary), contentHash: hashFor({ type: source.type, title, sourceUrl: link }), lastSeenAt: new Date(), createdAt: new Date(), updatedAt: new Date() };
    return item;
  }).filter((item): item is InsertArchiveItem => Boolean(item));
}

export async function refreshArchive() {
  let inserted = 0;
  for (const seed of officialSeeds) { await upsertArchiveItem({ ...seed, contentHash: hashFor(seed), lastSeenAt: new Date(), createdAt: new Date(), updatedAt: new Date() }); inserted += 1; }
  for (const source of rssSources) {
    try { const response = await fetch(source.url, { signal: AbortSignal.timeout(12_000), headers: { "user-agent": "AI100-ArchiveBot/1.0 (+official-source-index)" } }); if (!response.ok) continue; const items = parseRss(await response.text(), source); for (const item of items) { await upsertArchiveItem(item); inserted += 1; } }
    catch (error) { console.warn(`[Archive] source refresh skipped: ${source.url}`, error); }
  }
  return { inserted, sources: rssSources.length, seeded: officialSeeds.length, refreshedAt: new Date().toISOString() };
}
