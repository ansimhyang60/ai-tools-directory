# AI 활용 가이드 종합 품질 감사

감사 기준일은 2026-08-28이며, 대상은 AI 활용 가이드의 현재 관리형 프로젝트 코드, 개발 로그, 프로덕션 빌드, 핵심 라우트 화면, GitHub `main`과 Actions 상태입니다.

## 감사 요약

| 영역 | 확인 결과 | 조치 |
|---|---|---|
| 데이터 중복 | `expandedCatalog.ts`에 736개 규모의 미사용 원본 스냅샷이 앱 소스에 남아 있었고, `toolCatalog.ts`와 655개 이름이 겹쳤습니다. `expandedCatalog`는 프로젝트 어디에서도 import되지 않았습니다. | 원본을 `research/data/expandedCatalog.snapshot.ts`로 이동하고 생성 스크립트 경로를 함께 갱신했습니다. 화면용 단일 도구 원본은 `toolCatalog.ts`로 유지합니다. |
| 실제 병합 중복 | Google Labs와 AimAtters 사이의 Pomelli 중복은 `toolCatalog.ts`의 이름 기반 병합·기존 이름 제외 로직으로 화면 중복이 발생하지 않음을 확인했습니다. | 별도 제거 없이 기존 병합 규칙을 유지했습니다. |
| Fast Refresh | `MobileNav.tsx`의 `getActiveNavHref`, `VirtualizedList.tsx`의 `getVirtualWindow` named export가 UI 모듈에 있어 HMR 무효화 경고가 발생했습니다. | 두 순수 유틸을 `client/src/lib/mobileNavUtils.ts`, `client/src/lib/virtualListUtils.ts`로 분리하고 테스트 import를 갱신했습니다. 서버 재시작 후 새 경고가 재발하지 않았습니다. |
| 렌더링 | 핵심 6개 라우트의 데스크톱 full-page와 4개 라우트의 1280px viewport 화면을 확인했습니다. 잘림·겹침·빈 화면은 발견되지 않았습니다. | 기존 가상 목록·lazy route 구조를 유지했습니다. |
| 로그/API | 최신 서버 로그의 `/api/health`와 analytics 요청은 200입니다. 과거 HMR 경고와 중간 수정 단계의 `directoryRendering` resolve 오류는 최신 빌드에서 재현되지 않았습니다. | 최신 `pnpm check`, 42개 Vitest, Vite 빌드로 회귀 확인했습니다. |
| 번들 | `popularTools` 562KB, `framework` 586KB, `skills300` 423KB minified chunk 경고가 남아 있습니다. | 현재 기능 오류는 아니므로 기록했습니다. 다음 최적화 후보는 데이터 lazy import·수동 chunk 분할입니다. |
| GitHub | 감사 전 GitHub `main`은 `2403266`으로 관리형 최신 커밋 `906ee48`과 분기되어 있었습니다. | 기존 GitHub main을 `backup/pre-audit-2026-08-28`로 보존한 뒤 감사 커밋 `082d977`을 GitHub `main`에 동기화했습니다. |
| Actions | 감사 커밋 `082d977`의 Datadog Synthetic workflow run `33135266384`가 `success`로 완료되었습니다. 이전 archive refresh run도 `success`였습니다. | GitHub 자동 검증 상태 정상입니다. |
| 배포 | Vercel 설정은 `pnpm install --frozen-lockfile`, `pnpm build:vercel`, `dist/public`, archive cron과 filesystem/API routes를 사용합니다. | lockfile 설정과 workflow 파일을 확인했습니다. 이번 감사 수정은 체크포인트 저장으로 관리형 공개 버전에 반영합니다. |

## 검증 기록

`pnpm check`가 통과했고, 15개 테스트 파일의 42개 테스트가 통과했습니다. `pnpm build:vercel`도 성공했으며 Vite가 1,749개 모듈을 변환했습니다. `/`, `/tools`, `/skills`, `/skills?source=k-skill`, `/ui-guide`, `/search`의 full-page 캡처와 `/`, `/tools`, `/skills`, `/search`의 1280px viewport 캡처를 확인했습니다. 서버 재시작 후 OAuth 초기화와 로컬 서버 기동도 정상입니다.

## 후속 권장 사항

첫째, `popularTools`와 `skills300`의 데이터 lazy import 또는 Rollup manual chunk 분할로 초기 다운로드를 줄이는 것이 좋습니다. 둘째, 1,331개 도구 카탈로그를 이름뿐 아니라 공식 URL 정규화까지 포함한 중복 감사 테스트로 고정하는 것이 좋습니다. 셋째, GitHub main 동기화가 수동 force update에 의존하지 않도록 관리형 원격 또는 단일 push workflow를 명시하는 것이 좋습니다.
