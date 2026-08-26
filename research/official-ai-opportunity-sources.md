# 공식 AI 기회·뉴스·활용사례 초기 출처

수집 기준: 한국 정부·공공기관 공식 페이지를 우선 출처로 사용하고, 원문 URL·기관·등록일·마감/행사일·콘텐츠 유형을 저장한다. 설명은 원문을 축약하되 사실을 추가하지 않는다.

| 유형 | 제목 | 기관 | 등록/행사 정보 | 원문 |
|---|---|---|---|---|
| 공모전 | 제14회 범정부 공공데이터·AI 활용 창업경진대회 통합공고 | 행정안전부 | 2026-04-08 등록; 예선은 기관별 상이 | https://www.mois.go.kr/frt/bbs/type013/commonSelectBoardArticle.do?bbsId=BBSMSTR_000000000006&nttId=125058 |
| 지원/공모 | 중소기업 AI 전환 우수사례 공모전 모집공고 | 중소벤처기업부 | 2025-08-28 등록; 공고번호 2025-482 | https://www.mss.go.kr/site/smba/ex/bbs/View.do?cbIdx=310&bcIdx=1061253&parentSeq=1061253 |
| 전시회 | 2026 공공 AI 박람회(KPAIX) | 행정안전부 | 2026-06-23~2026-06-24; 일산 킨텍스 | https://www.mois.go.kr/frt/bbs/type010/commonSelectBoardArticle.do?bbsId=BBSMSTR_000000000008&nttId=127100 |
| 활용사례 | (2026년) AI 정부 서비스 사례집 | 행정안전부·한국지능정보사회진흥원 | 2026-03-24 등록; 공공부문 AI 활용 우수사례 16개 | https://www.mois.go.kr/frt/bbs/type001/commonSelectBoardArticle.do?bbsId=BBSMSTR_000000000015&nttId=124688 |

## 수집 설계 메모

초기 아카이브 유형은 `contest`, `grant`, `exhibition`, `news`, `case-study`로 분리한다. 모든 레코드는 `title`, `summary`, `type`, `organization`, `publishedAt`, `eventStartAt`, `eventEndAt`, `deadlineAt`, `sourceUrl`, `sourceDomain`, `tags`, `status`, `lastSeenAt`, `contentHash`를 가진다. 공식 페이지에서 확인되지 않은 마감일·상금·대상은 비워 두며, RSS/API/목록 페이지와 상세 페이지를 모두 확인한 경우에만 정규화한다.

5,000건은 프론트엔드 번들에 직접 포함하지 않는다. DB에 저장하고 서버 검색·필터·페이지네이션으로 제공하며, 수집 작업은 idempotent upsert와 `contentHash` 중복 제거를 사용한다. 자동 갱신은 플랫폼의 `/api/scheduled/*` Heartbeat 경로를 사용하고 in-process timer는 사용하지 않는다.
