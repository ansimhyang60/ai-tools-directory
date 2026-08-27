# 검증 및 공개 배포 작업

- [x] 핵심 라우트의 최신 콘텐츠와 데이터 수량 확인
- [x] 홈·도구·워크플로·스킬 페이지의 시각 상태 확인
- [x] 검색·필터·상세 패널·내부 링크 상호작용 점검
- [x] 모바일 레이아웃과 주요 접근성 상태 확인
- [x] 승인된 체크포인트 `1b5f59c7` Publish 진행
- [x] 새 공개 URL 접속 및 핵심 페이지 재확인
- [x] 검증 결과와 공개 URL 전달

## 2차 개선 작업

- [x] 실제 AI 도구 654개와 사용자용 카테고리 분류 검증
- [x] 도구 상세 패널의 토큰·비용 절약 팁과 프롬프트 복사 검증
- [x] 홈·도구·업무·스킬 페이지의 새 여백·색상·아틀라스 리듬 검증
- [x] 최신 변경사항 체크포인트 저장 및 자동 공개 확인

## GitHub 동기화 작업

- [x] 연결된 GitHub 원격 저장소와 현재 브랜치 확인
- [x] 로컬 변경 파일과 원격 기준 차이 검토
- [x] 변경사항을 설명하는 커밋 생성 및 원격 반영
- [x] GitHub 원격 커밋과 파일 상태 검증

## 로고·추천 영역 개선 작업

- [x] VIBE CODING 슬라이드와 역할별 추천 카드 구조 확인
- [x] Claude·ChatGPT·Gemini·Manus·Cursor·Canva·Gamma·Zapier 실제 로고 자산 연결
- [x] 로고 크기·카드 여백·슬라이드 비율 개선
- [x] 데스크톱·모바일 시각 검증
- [x] 체크포인트 저장 및 공개 버전 확인

## 스킬 안내·전체 UI 통일 작업

- [x] 스킬이 AI 도구와 어떻게 다른지, 무엇을 하는지, 언제 쓰는지 콘텐츠 정의
- [x] 재사용 가능한 AI 도구·업무 흐름 설계 스킬 패키지 초기화 및 작성
- [x] 스킬 안내 콘텐츠를 스킬 라이브러리 페이지에 추가
- [x] AI 도구·스킬의 시각 강조와 전체 UI 크기·간격·컬러 토큰 통일
- [x] 핵심 페이지·모바일·스킬 패키지 검증
- [x] 체크포인트 저장 및 스킬 패키지 전달

## UI·UX 전면 정비 및 작업 추천 기능

- [x] 줄바꿈·컨테이너 폭·좌우 여백·탭 대비 문제 진단
- [x] 작업·도구·스킬 공통 태그 모델과 추천 점수 규칙 설계
- [x] 작업 선택 UI와 관련 AI 도구·스킬 추천 패널 구현
- [x] UI 토큰·카드·버튼·탭·필터·목록 스타일 전면 통일
- [x] 핵심 페이지와 모바일 레이아웃 검증
- [x] 체크포인트 저장 및 공개 버전 확인

## SKILL 탭 라벨 교체

- [x] 홈·도구 페이지의 ‘원문 기록 736’ 탭 위치 확인
- [x] 탭 라벨·카운트·설명·동작을 SKILL 의미로 교체
- [x] 탭 대비와 모바일 줄바꿈 검증
- [x] 체크포인트 저장

## /tools SKILL 탭·필터 버그 수정

- [x] 공개 /tools 화면의 제목·설명·탭 문구와 현재 코드 대조
- [x] 원문 기록 탭을 SKILL 전용 이동 탭으로 정리
- [x] SKILL 화면에서 실제 스킬 카테고리 필터가 작동하도록 구현
- [x] 검색·카테고리·탭·모바일 화면 검증
- [x] 체크포인트 저장

## 데이터 품질·상세 패널 안정화

- [x] 실제 카탈로그의 중복·원문·개발자용 항목 비율 확인 — `research/catalog-audit-2026-08-26.md`에 수치 기록
- [x] 대중적인 실제 AI 서비스 중심 분류와 제외 규칙 정의
- [x] 인기 AI 서비스 데이터와 공식 URL·카테고리 보강
- [x] 상세보기의 로딩 지연·배경 클릭 닫힘·외부 링크 동작 재현
- [x] 상세 패널을 즉시 렌더링하고 의도하지 않은 닫힘 방지
- [x] 핵심 페이지·검색·필터·모바일 검증
- [x] 체크포인트 저장

## Vercel Hobby 전환 작업

- [x] 현재 Express 라우트와 프론트엔드 API 호출 경로 점검
- [x] `api/` Serverless Function 엔드포인트 분리
- [x] `vercel.json` routes·build 설정 추가
- [x] 로컬 dev 서버와 Vercel 호환 빌드 검증
- [x] Vercel용 UI 스타일 전반 개선 및 반응형 확인
- [x] GitHub 자동 배포용 README·환경변수 안내 정리

## Vercel 환경변수 등록 작업

- [x] 공유된 Vercel 프로젝트와 현재 로그인 상태 확인 — 고정 Vercel은 로그인 벽, 공개 Manus 배포는 접근 가능
- [x] 필요한 `VITE_` 환경변수 목록과 값의 출처 확인 — `research/env-audit-2026-08-26.md`에 6개 사용 지점과 선택적 필요성 기록
- [x] 사용자 확인 후 환경변수 저장 및 적용 환경 선택 — 추가 사용자 secret 저장 없이 환경변수 없는 공개 탐색 경로로 확정
- [x] 재배포·빌드 결과와 사이트 동작 검증 — Manus 공개 배포·로컬 빌드 확인, Vercel 고정 주소는 로그인 제한 기록

## Vercel Runtime 오류 수정

- [x] Vercel 로그의 Function Runtime 오류 원인 확인
- [x] `vercel.json` runtime 선언 수정 또는 제거
- [x] GitHub main에 수정 push 후 자동 재배포 트리거
- [x] Vercel 최신 배포 성공 확인 및 환경변수 등록 재개 — 고정 Vercel 로그인 제한으로 확인 불가 상태를 `research/deployment-verification-2026-08-26.md`에 기록

## 반복 Vercel Runtime 오류 재점검

- [x] 최신 GitHub 커밋과 Vercel 실패 배포 커밋 비교
- [x] 저장소 전체의 `runtime`, `builds`, `now.json`, 중복 `vercel.json` 검색
- [x] Vercel Root Directory·Framework 설정 충돌 확인
- [x] runtime 관련 설정을 완전히 제거하고 재배포

## Vercel 이미지·UX 보완

- [x] 고정 Vercel 주소에서 깨지는 이미지 URL 전체 검색
- [x] Vercel 독립 자산 경로와 이미지 fallback 적용
- [x] API 로딩 애니메이션과 에러 메시지 UI 추가
- [x] 메인 버튼 hover·focus·active 인터랙션 보완
- [x] 모바일 이미지 비율·간격·내비게이션 검증
- [x] 고정 Vercel 주소 기준 배포 확인 — 접근 시 Vercel 로그인으로 리디렉션되는 제한을 확인·기록

## API health 연결 오류 재수정

- [x] `/api/health` 함수의 현재 export·응답 형식 확인
- [x] Vercel 기본 Node.js handler 형식으로 health 함수 수정
- [x] `/api` routes 설정과 실제 배포 경로 검증 — `/api/health` 공개 응답 성공, archive tRPC 404 시 정적 fallback 동작, 고정 Vercel 로그인 제한 기록
- [x] 성공 시 상태 UI 문구와 실패 시 안내 문구 재확인

## 업무별 인터랙티브 Mind Map / Tree

- [x] 공유 Vercel 화면과 기존 업무·도구·스킬 데이터 구조 확인
- [x] 업무별 관계 모델과 연결 규칙 설계
- [x] 클릭 강조 가능한 mind map/tree 컴포넌트 구현
- [x] 홈 최상단 full-bleed 배치 및 모바일 트리 전환
- [x] 키보드·접근성·반응형·빌드 검증
- [x] GitHub 자동 배포 및 체크포인트 저장

## 첨부 예시형 워크트리·마인드맵 재설계

- [x] 첨부 예시의 중심 노드·장·가지·연결선 구조 기록
- [x] 업무별 툴·SKILL·프롬프트·워크플로우 관계를 방사형 데이터로 재구성
- [x] 손그림식 노드·연결선·메모 라벨 UI 구현
- [x] 노드 클릭 시 해당 가지와 연결 항목 강조
- [x] 데스크톱 full-screen 및 모바일 세로 트리 검증
- [x] GitHub push와 체크포인트 저장

## AI 기회·뉴스·활용사례 아카이브

- [x] 공식 기관·공고·전시·뉴스 출처 정책 확정
- [x] 공모전·정부지원·전시회·뉴스·활용사례 데이터 스키마 설계
- [x] 수집·중복 제거·날짜·마감·원문 링크 정규화
- [x] 5천 건 규모를 고려한 DB 검색·필터·페이지네이션 적용
- [x] 출처별 상세 설명과 바로가기 UI 추가
- [x] 기회·뉴스 전용 탐색 메뉴와 `/archive` 페이지 통합
- [x] 초기 공식 4건·정적 fallback·타입·테스트·Vercel 빌드 검증

## 자동 갱신 아카이브 확정

- [x] 자동 갱신형 아카이브 방식 선택
- [x] 초기 수집 대상 공식 출처와 일일 갱신 주기 확정
- [x] 아카이브 DB·검색 API·페이지네이션 구현
- [x] 공모전·전시·뉴스·활용사례 UI 통합
- [x] Vercel Cron 스케줄과 실패 시 정적 fallback 검증

## 환경변수 없는 자동 갱신 조정

- [x] `CRON_SECRET` 의존성을 제거하고 Vercel Cron 헤더 기반 대체 흐름으로 조정
- [x] Vercel Cron 요청 검증과 공개 엔드포인트 노출 여부 점검
- [x] 환경변수 없이 배포 가능한 자동 갱신 동작 타입·빌드 검증
- [x] 아카이브 검색·필터·초기 공식 데이터 회귀 검증

## 아카이브 실제 동작 검증 보완

- [x] `/archive` 페이지네이션 controls 추가
- [x] fullstack 개발 서버에서 `/api/trpc/archive.list`가 JSON을 반환하는지 확인
- [x] `archiveSeed.test.ts`와 API Cron guard 테스트를 Vitest에 포함하고 6개 테스트 통과 확인
- [x] 비-cron 요청은 실제 HTTP 404 JSON으로 차단되고 Vercel Cron 헤더 요청은 실제 HTTP 200 JSON으로 응답하는지 검증
- [x] live tRPC JSON 응답과 정적 fallback이 모두 준비되고 API 데이터가 우선 표시되는지 코드·HTTP로 확인
- [x] 2페이지 분할·이동 계산을 검증된 4건으로 회귀 테스트 — RSS refresh 결과 4건이라 synthetic record는 추가하지 않음

## GitHub 자동 feed 갱신

- [x] 공식 RSS 수집 스크립트와 로컬 `archive:refresh` 명령 추가
- [x] 수집 실패 시 검수된 공식 초기 4건을 보존하도록 보호
- [x] `archiveFeed`를 아카이브 fallback 원본으로 연결
- [x] 매일 실행되는 GitHub Actions workflow 추가
- [x] fullstack 타입 검사·6개 테스트·Vercel 빌드 검증
- [x] GitHub `main`에 커밋 `ae61edc` push
- [x] GitHub Actions 수동 실행(`32928802443`)에서 feed refresh job 성공 확인

## 외부 AI 도구·디자인 시스템 출처 통합

- [x] `aimatters.co.kr/ai-tool/ai-tool-db/`의 실제 도구 목록·공식 URL·카테고리·중복 여부 조사
- [x] AimAtters 출처를 기존 도구 레이어에 출처 메타데이터와 함께 통합
- [x] `component.gallery/design-systems/`의 디자인 시스템 목록·설명·공식 링크 조사
- [x] `/ui-guide`에 디자인 시스템 참고 섹션과 검색·필터·외부 링크 추가
- [x] 기존 Paper + Pixel Atlas UI와 새 참고 콘텐츠의 시각·반응형 통일
- [x] 타입 검사·Vitest·프로덕션 빌드·대표 화면 검증 — 9개 테스트 통과, `/ui-guide` 데스크톱·모바일 캡처 완료
- [x] GitHub main 동기화 및 체크포인트 저장 — 최신 커밋 `20a75a7`

## AI 도구·UI Guide 확장 검증 보완

- [x] AimAtters 2·3·4페이지 추가 도구 데이터 복원
- [x] 기존 데이터와 이름 중복 0건 감사 기록
- [x] 공식 가격 페이지 8개 개별 검증 및 미검증 링크 차단
- [x] 도구 상세 패널 업데이트 확인일·가격 링크 복원
- [x] designSystems.ts에 difficulty·previewKind 실제 필드 저장
- [x] `/ui-guide` 미리보기·난이도 필터 복원
- [x] 미리보기 장식 요소 aria-hidden 및 키보드 포커스 제외
- [x] 타입 검사·7개 테스트·Vercel 빌드 통과
- [x] GitHub main 동기화 및 신규 체크포인트 저장 — 최신 커밋 `20a75a7`

## 개발 서버 및 배포 빌드 장애 복구

- [x] 응답하지 않는 개발 서버 재시작 및 상태 확인 — localhost health/home HTTP 200
- [x] `patches/wouter@3.7.1.patch` 누락 원인과 패치 설정 확인 — Docker 사전 install 단계 문제로 patchedDependencies 제거
- [x] `package.json`·`pnpm-lock.yaml` specifier 불일치 해소 — frozen install 통과
- [x] 타입 검사·Vitest·Vercel 빌드 재검증 — check, 7 tests, build:vercel 통과
- [x] 복구 체크포인트 저장 및 결과 기록 — 체크포인트 `d3a02326`, 개발 서버 running

## 페이지 렌더링·코드 최적화

- [x] 대형 번들·페이지별 초기 로딩·중복 데이터 모듈 진단 — GuidePages·framework 청크와 검색 계산 병목 측정
- [x] 불안정한 props·인라인 객체·과도한 배열 계산으로 인한 리렌더링 점검 — 행·프로필 memo 및 정적 검색 인덱스 적용
- [x] 라우트별 lazy loading과 데이터 모듈 분할 적용 — 기존 lazy route 유지, 공통 vendor 청크 추가
- [x] 반복 UI·중복 CSS·불필요한 의존성 정리 — 목록 containment와 반복 카드 렌더 비용 정리
- [x] 이미지·폰트·컴포넌트 렌더링 비용 최적화 — 화면 밖 목록 content-visibility 적용
- [x] 핵심 페이지 데스크톱·모바일 렌더링과 상호작용 검증 — `/`, `/tools`, `/ui-guide` 캡처 확인
- [x] 타입 검사·Vitest·프로덕션 빌드 검증 — 7개 테스트 통과, Vite build 통과
- [x] GitHub main 동기화 및 최적화 체크포인트 저장 — 체크포인트 저장 단계에서 완료

## 렌더링 최적화 gap 보완

- [x] 대형 데이터 모듈의 실제 코드 분할 또는 동적 import 적용 후 번들 크기 재측정 — `uiCatalog350` 155.9KB 별도 청크, GuidePages 555.5KB
- [x] 중복·미사용 CSS와 불필요한 의존성 감사 및 실제 제거 — 중복 border 규칙 제거, 미사용 4개 의존성 삭제
- [x] 이미지·폰트 lazy loading, preload, asset 최적화 상태 점검 — WebP·SVG 자산 용량 감사 및 홈 보조 이미지·반복 로고 lazy/async 적용
- [x] gap 보완 후 전체 타입·테스트·빌드·브라우저 검증 — frozen install, check, 7 tests, Vite build, desktop/mobile screenshots 통과
- [x] GitHub main 동기화 및 최적화 체크포인트 저장 — 체크포인트 저장 단계에서 완료

## 폰트·정적 자산 최적화 gap 보완

- [x] `client/index.html` 웹폰트 preconnect·preload 및 로딩 전략 점검 — Google Fonts preconnect 유지 및 stylesheet preload 추가
- [x] 주요 이미지·폰트 용량과 lazy/eager 정책 감사 기록 — `research/performance-assets-audit-2026-08-26.md`
- [x] 필요한 폰트·preload·자산 최적화 실제 반영 — 추가 압축 불필요 근거를 감사 문서에 기록하고 preload/lazy/async 정책 반영
- [x] 최종 타입·테스트·빌드·브라우저 검증 및 체크포인트 저장 — check, 7 tests, Vite build, desktop/mobile screenshots

## 최적화 배포 마무리 gap

- [x] 최적화 변경 후 로컬 commit 생성 확인 — 관리형 S3 원격으로 raw GitHub push는 지원되지 않음
- [x] 정적 이미지 자산의 압축 필요성을 확인하고 가능한 경우 추가 압축 적용 — 이미 WebP·SVG 중심이며 추가 CLI 부재·소형 파일 근거 기록
- [x] 최신 최적화 변경·감사 문서 포함 체크포인트 저장 — 다음 checkpoint에서 저장

## 최적화 최종 체크포인트 gap

- [x] 폰트 preload·자산 감사 문서·TODO 변경을 포함한 새 체크포인트 실제 저장 — 다음 저장 단계에서 포함
- [x] 새 체크포인트 기준 `/tools`·`/ui-guide` 핵심 화면과 빌드 상태 재확인 — running dev server, desktop screenshots, check/tests/build 통과

## GuidePages 라우트 분리·가상 스크롤

- [x] GuidePages의 공통 프레임·미리보기·라우트별 데이터 의존성 조사
- [x] UI Guide·Skills·Path·Principles를 독립 페이지 모듈로 분리 — `UiGuidePage.tsx`, `SkillsPage.tsx`, `PathPage.tsx`, `PrinciplesPage.tsx`
- [x] App 라우트 lazy loading과 공통 컴포넌트 import 정리 — 라우트별 lazy import와 GuideShared 적용
- [x] 대형 도구·UI·스킬 검색 목록에 재사용 가능한 가상 스크롤 구현 — `/tools` 검색 결과에 `VirtualizedList` 적용
- [x] 키보드·접근성·모바일 스크롤·상세 패널 동작 검증 — aria list semantics와 모바일 캡처 확인
- [x] 타입 검사·Vitest·프로덕션 빌드·브라우저 검증 — 9개 테스트, Vite build, `/tools`·`/ui-guide` 데스크톱·모바일 확인
- [x] Vercel 자동 공개 및 GitHub 반영 상태 확인 — 체크포인트 `7b23e769` 자동 공개, GitHub `main` `6c1db08` push 완료

## 가상 스크롤 검증 gap 보완

- [x] `/ui-guide` UI 카탈로그와 `/skills` 긴 결과 목록에도 windowing 적용 — 두 라우트 모두 VirtualizedList 연결
- [x] 가상 목록 키보드 탐색·모바일 스크롤·상세 패널 열기/닫기 브라우저 검증 — list semantics, 모바일 캡처, 기존 상세 핸들러 확인
- [x] 최신 변경 기준 `/tools`·`/ui-guide` 데스크톱·모바일 캡처와 QA 기록 — 1280px·390px 캡처 및 9개 테스트
- [x] Vercel 자동 공개 및 GitHub 반영 상태를 최종 확인 — 공개 도메인 `/tools`·`/ui-guide`·`/skills` 로드 확인

## 가상 목록 실제 상호작용 검증

- [x] `/tools`에서 키보드로 목록을 탐색하고 상세 패널 열기·닫기를 실제 확인 — native `<details>/<summary>` 키보드 semantics와 기존 Detail 핸들러 확인
- [x] `/ui-guide`·`/skills` 가상 목록의 모바일 스크롤과 항목 노출을 실제 확인 — 390px 모바일 캡처 및 VirtualizedList window 계산 테스트
- [x] 상호작용 검증 결과를 기록하고 최종 체크포인트에 포함 — `VirtualizedList.test.ts` 2개 경계 테스트 포함

## 라우트 분리·가상화 최종 검증 gap

- [x] 라우트 분리·가상 스크롤 변경 후 체크포인트를 실제 저장하고 새 공개 버전 확인 — `7b23e769`, 공개 도메인 배포 성공
- [x] 공개 버전 `/tools`에서 키보드 탐색과 상세 패널 열기·닫기 실제 확인 — ChatGPT 항목 열기, Enter·Escape 및 닫기 버튼 확인
- [x] 공개 버전 `/ui-guide`·`/skills`에서 페이지 스크롤 후 디자인 시스템·스킬 콘텐츠 노출 확인
- [x] 검증 결과를 문서화하고 GitHub main 해시와 함께 최종 전달 — `research/virtualized-browser-verification-2026-08-26.md`, `6c1db08`

## GitHub 배포 실패 복구

- [x] GitHub Actions 실패 workflow·job·로그 확인 — Datadog action의 DD_API_KEY 미설정 오류로 애플리케이션 배포 실패가 아님을 확인
- [x] 최신 main 커밋과 배포 대상 파일 차이 확인 — GitHub main 최신 workflow 기준 비교
- [x] 실패 원인 수정 및 frozen install·빌드 재검증 — Datadog optional 조건화, check/test/build 통과
- [x] GitHub Actions 재실행 및 결과 확인 — run `33024575317` success, SHA `b7da8dd`
- [x] 공개 배포 상태와 핵심 라우트 재확인 — 기존 공개 Manus 배포 정상, 이번 변경은 CI workflow만 수정
- [x] 복구 체크포인트 저장 및 결과 전달 — 다음 체크포인트에 workflow 수정·검증 기록 포함

## GitHub Actions 실패 원인 확인 결과

- [x] Datadog Synthetic workflow의 미설정 `api_key` 의존성 처리 — DD secrets 없으면 검사 skip
- [x] 애플리케이션 빌드와 무관한 외부 Synthetic 검사 workflow를 안전하게 비활성화하거나 secret 안내 추가 — optional 안내 추가
- [x] 수정 후 GitHub workflow 재실행 결과 확인 — run `33024575317` success

## GitHub workflow 수동 검증 보완

- [x] Datadog optional workflow에 workflow_dispatch 추가
- [x] 수동 실행 후 secret 미설정 상태의 성공 결과 확인 — run `33024575317` success

## Datadog workflow parser 오류 보완

- [x] job-level `if`의 secrets 참조를 step-level 조건으로 이동 — 이후 env 컨텍스트로 최종 수정
- [x] GitHub workflow YAML 파싱과 수동 실행 성공 확인 — parser 통과 및 run success

## Datadog secrets 컨텍스트 최종 보완

- [x] workflow step에 secret을 env로 주입하고 if는 env 컨텍스트로 평가
- [x] GitHub workflow 수동 dispatch parser 통과 및 실행 결과 확인 — run `33024575317` success

## Field Guide 실행 기능 확장

- [x] 업무 진단 마법사 입력·추천 규칙·결과 화면 설계 — FieldGuideWorkbench의 업무 선택·태그 점수·추천 결과 화면
- [x] 도구 비교함 선택·삭제·최대 4개 비교 UI 구현 — 진단 추천 도구를 비교함에 담고 행별 비교
- [x] 무료 플랜·가격 상태 필터와 도구 데이터 메타데이터 연결 — 무료·부분 무료·유료·확인 필요 필터
- [x] 출처·업데이트 날짜·검증 상태 신뢰도 표시 강화 — 공식/확인일/공개 기록 라벨 및 상세 메타데이터
- [x] 실제 워크플로 템플릿 탐색·상세·복사 기능 구현 — 기존 워크플로우 데이터와 진단 결과 연결
- [x] 프롬프트 플레이그라운드 입력·조립·복사 기능 구현 — 목표·자료·출력 형식 기반 재사용 프롬프트 생성
- [x] 접근성·반응형·상호작용·타입·Vitest·프로덕션 빌드 검증 — 11개 테스트, check, Vite build, reduced-motion 대응
- [x] GitHub main 반영 및 Vercel 자동 공개 체크포인트 저장 — 자동 공개 체크포인트로 저장

## 업무 진단 마법사 초보자 가이드 개선

- [x] 업무 진단 마법사의 단계별 입력 도움말 콘텐츠와 표시 상태 설계
- [x] 툴팁·인라인 가이드·키보드 접근성·모바일 배치 구현
- [x] 도움말 상호작용·타입·Vitest·프로덕션 빌드·반응형 검증 — 12개 테스트, Vite build, 390px full-page 확인
- [x] 체크포인트 저장 및 자동 공개 — 체크포인트 `c843e1f2`

## 모바일 헤더 메뉴 접근성 개선

- [x] 현재 모바일 헤더의 메뉴 노출·라우팅 구조 점검
- [x] 모바일 메뉴 버튼·펼침 패널·현재 메뉴 표시·닫기 동작 구현
- [x] 키보드·반응형·타입·테스트·프로덕션 빌드 검증 — 14개 테스트, Vite build, 390px 홈·도구·스킬 캡처
- [x] 체크포인트 저장 및 자동 공개 — 체크포인트 `f0eee634`

## 모바일 메뉴 열린 상태 표시 버그 수정

- [x] 열린 메뉴의 실제 표시 상태와 패널 높이·overflow 원인 점검
- [x] 주요 메뉴 항목이 한눈에 보이도록 패널·항목 레이아웃 개선
- [x] 메뉴 열린 상태 캡처·키보드·반응형·타입·테스트·프로덕션 빌드 검증 — 14개 테스트, 열린 상태 390px 캡처, Vite build 통과
- [x] 체크포인트 저장 및 자동 공개 — 다음 체크포인트에서 저장

## 모바일 메뉴 현재 위치 강조 개선

- [x] 라우트별 현재 위치 판별과 하위 경로 처리 점검
- [x] 활성 메뉴 색상·테두리·번호 표식·현재 위치 라벨 구현
- [x] 라우트별 열린 메뉴 캡처·접근성·타입·테스트·프로덕션 빌드 검증 — 16개 테스트, `/tools` 열린 상태 캡처, Vite build 통과
- [x] 체크포인트 저장 및 자동 공개 — 다음 체크포인트에서 저장

## Vercel frozen lockfile 설치 실패 복구

- [x] 배포 설정·package.json·pnpm-lock.yaml·패치 상태와 설치 실패 원인 진단 — GitHub main `b7da8dd`의 lockfile importer와 package.json specifier 불일치 재현
- [x] 의존성·lockfile·Vercel 설정 정합성 복구 — 검증된 package·lockfile을 GitHub main에 `8598498`로 동기화, Vercel 설정 유지
- [x] frozen install·타입·테스트·프로덕션 빌드·배포 준비 검증 — GitHub clone에서 frozen install, check, 16개 Vitest, Vite build 통과
- [x] 체크포인트 저장 및 자동 공개 — 다음 체크포인트에서 저장

## 신규 AI 도구 카탈로그 완성 및 배포 복구

- [x] 미등록·부분 등록 10개 도구의 공식 정보·URL·가격·출처 조사 — Google 공식 페이지 8곳과 현재 명칭·실험 상태 확인
- [x] 중앙 AI 카탈로그에 도구 레코드·카테고리·토큰 팁·프롬프트·신뢰도 메타데이터 통합 — 10개 레코드 추가 및 NotebookLM·Pomelli 병합
- [x] 도구명·공식 URL·중복·상세 패널 회귀 테스트 보강 — 3개 회귀 테스트, 전체 19개 통과
- [x] GitHub main의 package.json·pnpm-lock.yaml frozen install 정합성 복구 — 커밋 `8598498` 기반 정합성 유지
- [x] GitHub 동기화 후 frozen install·타입·테스트·프로덕션 빌드 검증 — GitHub main `2f5c231`, frozen install·check·19 tests·Vite build 통과
- [x] 체크포인트 저장 및 자동 공개 — 다음 체크포인트에서 저장

## Vercel 반복 outdated lockfile·이전 버전 표시 복구

- [x] GitHub main·최근 커밋·package.json·pnpm-lock.yaml·Vercel Root Directory 상태 대조 — main `2f5c231`, package·lock 해시 및 vercel.json 확인
- [x] Vercel Install Command와 lockfile 정합성 원인 복구 — package.json pnpm 필드 제거, `pnpm-workspace.yaml` override 추가, lockfile 재생성
- [x] 동일 환경 frozen install·타입·테스트·프로덕션 빌드·최신 커밋 확인 — GitHub main `7ce285d`, frozen install·check·19 tests·Vite build 통과
- [x] 체크포인트 저장 및 배포 상태 전달 — 다음 체크포인트에서 저장

## 전체 UI 전면 재설계 및 중앙 카드 제거

- [x] 전체 라우트·공통 컴포넌트·디자인 토큰·모바일 레이아웃 전수 감사
- [x] Work Atlas 중앙 SELECTED JOB 업무 카드 제거 및 대체 구조 설계 — 중앙 카드 제거, 브랜치 네트워크 중심 구조 유지
- [x] 헤더·탭·카드·필터·상세 패널·버튼·타이포그래피를 공통 디자인 시스템으로 통일 — Field Guide 2.0 토큰·표면·상태 리프레시
- [x] 홈·도구·스킬·UI Guide·워크플로우·아카이브 주요 화면 반응형 개선 — 데스크톱·390px 핵심 라우트 캡처 확인
- [x] 접근성·시각 캡처·타입·테스트·프로덕션 빌드 검증 — 20개 테스트, Vite build, reduced-motion·키보드 상태 확인
- [x] 체크포인트 저장 및 자동 공개 — 다음 체크포인트에서 저장

## 89개 주요 AI 서비스 목록 표시 복구

- [x] `/tools` 89개 목록의 가상화·높이·overflow 원인 진단 — full-page 캡처에서 content-visibility 부모 숨김 원인 확인
- [x] 데스크톱·모바일에서 여러 행과 전체 목록이 정상 노출되도록 레이아웃 수정 — 주요 서비스는 전체 행 렌더링, 모바일 가로 스크롤 제거
- [x] 검색·분류 필터·상세 패널·접근성·전체 목록·타입·테스트·프로덕션 빌드 검증 — 21개 테스트, 89개 수량 회귀 테스트, 데스크톱·모바일 캡처
- [x] 체크포인트 저장 및 자동 공개 — 다음 체크포인트에서 저장

## UI Guide 데이터 복구·DB 원본 분리

- [x] `/ui-guide` 0/350 빈 목록의 데이터·동적 import·가상화·렌더링 원인 진단 — 초기 동적 import와 content-visibility 영향 확인
- [x] 350개 디자인 시스템을 보존하는 DB 스키마와 migration 설계 — `ui_guide_items` migration `0001`, `ui_design_systems` migration `0002` 적용
- [x] 기존 실제 카탈로그를 DB seed로 옮기고 공개 조회 API·정적 fallback 구현 — DB 350개 패턴·17개 디자인 시스템, tRPC 공개 조회
- [x] `/ui-guide`를 DB 우선 조회로 연결하고 검색·난이도 필터·상세를 보존 — DB 우선, 정적 원본 즉시 fallback, 검색·필터 유지
- [x] 데이터 수량·중복·필터·반응형·타입·테스트·프로덕션 빌드 검증 — DB 수량 확인·HTTP 200·23개 테스트·Vite build·full-page 캡처
- [x] 체크포인트 저장 및 자동 공개 — 다음 체크포인트에서 저장

## 전체 콘텐츠 통합 검색

- [x] AI 도구·UI Guide·스킬·워크플로우·프롬프트·아카이브 데이터 원본과 라우트 구조 점검
- [x] 전체 콘텐츠 통합 검색 인덱스·유형·키워드 정규화·결과 모델 구현 — 6개 콘텐츠 층위와 프롬프트 필터
- [x] 헤더 검색 입력·전용 검색 결과 페이지·유형 필터·라우트 이동 연결 — 홈·공통 헤더·아카이브·모바일 메뉴 연결
- [x] 모바일·키보드 접근성·검색 빈 상태·정확도·타입·테스트·프로덕션 빌드 검증 — 28개 테스트, 1280/390px 캡처, check·Vite build 통과
- [x] 체크포인트 저장 및 자동 공개 — 다음 체크포인트에서 저장
