# AI 활용 가이드

React·Vite 기반의 AI 도구, 스킬, 업무 흐름, 프롬프트, UI 가이드 탐색 플랫폼입니다. 실제 AI 서비스 카탈로그와 NomaDamas/k-skill 모음집을 한곳에서 탐색할 수 있으며, 전체 검색·자동완성·정렬·즐겨찾기·다국어 전환·업무별 추천 흐름을 제공합니다.

> 이 저장소는 **Vercel Hobby에서 GitHub 연결만으로 프론트엔드를 배포할 수 있도록 구성**되어 있습니다. Vercel의 Vite 프로젝트 배포 방식은 공식 문서 [1]을, 환경변수 설정 방식은 공식 문서 [2]를 기준으로 합니다.

## 주요 기능

| 영역 | 제공 기능 |
| --- | --- |
| AI 도구 카탈로그 | 주요 AI 서비스, 가격 상태, 공식 링크, 업데이트·출처 메타데이터, 토큰 절약 팁 |
| 통합 검색 | 도구·스킬·UI Guide·워크플로·프롬프트·아카이브를 하나의 인덱스로 검색, 자동완성, 최근 검색어, 인기순·최신순·신뢰도순 정렬 |
| 업무 탐색 | 업무별 Work Atlas, mind map/tree, 관련 AI 도구·스킬·프롬프트·워크플로 추천 |
| 스킬 모음집 | 내부 실전 플레이북과 NomaDamas/k-skill 116개를 출처별로 분리해 탐색, 설치 명령 복사 |
| UI Guide | UI 패턴 카탈로그와 Component Gallery 디자인 시스템, 난이도 필터와 컴포넌트 미리보기 |
| 개인화 | k-skill 즐겨찾기(localStorage), 한국어·영어 전환 상태 저장 |
| 아카이브 | 정부지원·공모전·전시·뉴스·활용사례의 공식 출처 기반 목록과 링크 |

## 기술 스택

| 구분 | 기술 |
| --- | --- |
| Frontend | React 19, TypeScript, Vite 7, Tailwind CSS 4, Wouter |
| UI | shadcn/ui 계열 컴포넌트, Radix UI, Lucide React |
| Data fetching | tRPC 11, TanStack Query, SuperJSON |
| Backend·Auth | Express 로컬 서버, Manus OAuth, tRPC 컨텍스트 |
| Database | MySQL/TiDB, Drizzle ORM |
| Testing | Vitest, TypeScript 검사 |
| Deployment | Vercel Hobby용 Vite 정적 빌드 및 `api/` Serverless Functions |

## 요구 사항

Node.js 22 이상과 pnpm 10 계열을 권장합니다. 저장소에는 `pnpm-lock.yaml`이 포함되어 있으므로 의존성 설치 시 반드시 frozen lockfile을 사용해야 합니다.

```bash
corepack enable
corepack prepare pnpm@10.4.1 --activate
pnpm install --frozen-lockfile
```

## 로컬 개발

개발 서버는 Express와 Vite 브리지를 통해 실행되며 기본 포트는 `3000`입니다. 포트가 이미 사용 중이면 `PORT` 환경변수로 변경할 수 있습니다.

```bash
pnpm dev
```

브라우저에서 `http://localhost:3000`을 열어 확인합니다. 기본 점검용 API는 다음과 같습니다.

```bash
curl http://localhost:3000/api/health
```

정상 응답은 `ok: true`를 포함한 JSON입니다. 로컬 프로덕션 동작을 확인하려면 먼저 빌드한 뒤 서버를 실행합니다.

```bash
pnpm build
pnpm start
```

## 검증 명령

변경사항을 커밋하기 전에 다음 명령을 순서대로 실행합니다.

```bash
pnpm check
pnpm test
pnpm build:vercel
```

`pnpm build:vercel`은 Vercel 배포와 동일한 프론트엔드 빌드입니다. `pnpm build`는 프론트엔드와 로컬 Express 서버 번들을 모두 생성합니다.

## Vercel 배포: GitHub 연결 방식

### 1. 저장소 Import

Vercel 대시보드에서 **Add New → Project**를 선택한 뒤 GitHub 저장소 `ansimhyang60/ai-tools-directory`를 Import합니다. 기존 프로젝트를 유지하려면 새 프로젝트를 만들기보다 해당 프로젝트의 Git 연결과 Production Branch가 `main`인지 확인합니다. Vercel은 Git 저장소에 연결된 프로젝트에서 브랜치와 커밋을 기준으로 배포할 수 있습니다 [3].

### 2. Build & Development Settings

다음 값을 저장소의 `vercel.json`과 일치시킵니다. Vercel 프로젝트 설정에서 값을 직접 덮어쓸 경우에도 아래 구성을 유지해야 합니다.

| 설정 | 값 |
| --- | --- |
| Framework Preset | Vite |
| Root Directory | `./` |
| Install Command | `pnpm install --frozen-lockfile` |
| Build Command | `pnpm build:vercel` |
| Output Directory | `dist/public` |
| Production Branch | `main` |

`vercel.json`은 SPA fallback, `/api/*` 라우팅, 장기 캐시가 가능한 정적 자산 캐시, 아카이브 갱신 Cron 경로를 선언합니다. Vercel 프로젝트 설정 파일의 역할은 공식 문서 [4]에서 확인할 수 있습니다.

### 3. 환경변수 등록

Vercel 프로젝트의 **Settings → Environment Variables**에서 필요한 값을 Local·Preview·Production 환경별로 등록합니다. 값은 GitHub에 커밋하지 말고 Vercel의 환경변수 화면에 직접 입력합니다.

| 변수 | 사용 목적 | 필수 여부 |
| --- | --- | --- |
| `DATABASE_URL` | MySQL/TiDB 연결 | DB 기능을 Vercel에서 사용할 때 필수 |
| `JWT_SECRET` | 세션 서명 | OAuth·세션을 사용할 때 필수 |
| `VITE_APP_ID` | Manus OAuth 애플리케이션 ID | 로그인 사용 시 필수 |
| `VITE_OAUTH_PORTAL_URL` | 로그인 포털 주소 | 로그인 사용 시 필수 |
| `OAUTH_SERVER_URL` | OAuth 서버 주소 | 로그인 사용 시 필수 |
| `OWNER_OPEN_ID` | 소유자 식별자 | 서버 인증 설정에 사용 |
| `OWNER_NAME` | 소유자 표시 이름 | 서버 인증 설정에 사용 |
| `BUILT_IN_FORGE_API_URL` | Manus 내장 API 주소 | 내장 API 사용 시 필요 |
| `BUILT_IN_FORGE_API_KEY` | 서버 측 내장 API 키 | 내장 API 사용 시 필요 |
| `VITE_FRONTEND_FORGE_API_URL` | 브라우저용 내장 API 주소 | 브라우저 내장 API 사용 시 필요 |
| `VITE_FRONTEND_FORGE_API_KEY` | 브라우저용 내장 API 키 | 브라우저 내장 API 사용 시 필요 |
| `VITE_APP_TITLE` | 사이트 제목 | 선택 사항 |

`VITE_` 접두사가 붙은 값은 Vite 빌드 결과에 포함될 수 있으므로 비밀키를 넣지 않습니다. Vercel 환경은 Local·Preview·Production으로 구분되며, 환경별 값을 별도로 지정할 수 있습니다 [5].

### 4. 첫 배포 및 이후 자동 배포

설정을 저장하고 **Deploy**를 실행합니다. 이후 `main`에 push하면 Production 배포가 트리거되며, Pull Request는 Preview 배포로 확인할 수 있습니다. 배포가 실패하면 Vercel의 **Deployments → 해당 배포 → Building** 로그에서 먼저 `pnpm install --frozen-lockfile`, Build Command, Output Directory를 확인합니다.

로컬에서 다음 명령이 통과해야 Vercel에서도 동일한 프론트엔드 빌드를 재현할 수 있습니다.

```bash
pnpm install --frozen-lockfile
pnpm check
pnpm test
pnpm build:vercel
```

## Vercel 배포 범위와 서버 기능 안내

현재 Vercel 구성은 Vite 정적 결과물과 저장소의 `api/health.ts`, `api/oauth/callback.ts`, `api/scheduled/archive-refresh.ts` Serverless Function을 배포합니다. `vercel.json`의 `crons`를 사용한 아카이브 갱신은 Vercel 프로젝트에서 Cron 기능이 활성화된 경우에 실행됩니다.

반면 로컬 `server/index.ts`는 개발·로컬 프로덕션 확인용 Express fallback 서버입니다. DB-backed tRPC 기능이나 댓글·사용자 세션을 Vercel에서 완전히 운영하려면 해당 API를 Vercel Function 형태로 추가 연결하고 `DATABASE_URL`, OAuth 관련 환경변수를 등록해야 합니다. 환경변수가 없는 경우에도 카탈로그·UI Guide·스킬·검색과 같은 정적 콘텐츠는 계속 사용할 수 있지만, DB 기반 기능은 제한될 수 있습니다.

## 아카이브 갱신

공식 RSS 피드를 갱신하려면 다음 명령을 실행합니다.

```bash
pnpm archive:refresh
```

저장소에는 `.github/workflows/refresh-archive.yml`이 있으며, 예약 실행 또는 수동 실행으로 공식 피드 갱신을 수행합니다. 갱신 결과는 `client/src/lib/archiveFeed.ts`에 반영되므로 변경사항을 검토한 뒤 커밋합니다.

## 데이터·스키마 작업

Drizzle 스키마를 변경할 때는 먼저 `drizzle/schema.ts`를 수정하고 migration을 생성합니다. 운영 데이터에 대한 destructive SQL은 충분히 검토한 뒤 적용해야 합니다.

```bash
pnpm drizzle-kit generate
pnpm db:push
```

UI Guide seed가 필요한 개발 환경에서는 DB 연결 환경변수를 설정한 뒤 다음 명령을 사용합니다.

```bash
pnpm db:seed-ui-guide
```

## 프로젝트 구조

```text
client/src/App.tsx              라우트와 전역 레이아웃
client/src/pages/               페이지 단위 화면
client/src/components/          재사용 UI 컴포넌트
client/src/contexts/            언어·테마 등 전역 컨텍스트
client/src/lib/                 카탈로그·검색·브랜드 데이터와 유틸리티
api/                            Vercel Serverless Functions
server/                         로컬 Express·tRPC·DB·OAuth 서버 코드
drizzle/                        Drizzle 스키마와 migration
scripts/                        데이터 seed·공식 피드 갱신 스크립트
shared/                         클라이언트·서버 공유 타입과 상수
vercel.json                     Vercel 빌드·라우팅·Cron 설정
```

이미지와 대형 미디어 파일은 저장소에 직접 추가하지 말고 프로젝트의 파일 저장소 정책에 맞춰 관리합니다. 비밀정보가 담긴 `.env` 파일과 개인 토큰은 절대 커밋하지 않습니다.

## 라이선스 및 출처

이 프로젝트의 카탈로그 설명과 외부 링크는 각 출처의 이용조건을 존중하며, 공식 사이트로 연결되는 참고 정보로 제공됩니다. 외부 저장소의 콘텐츠 지시문을 실행하지 않고, 필요 범위에서 공개 README·라이선스·링크만 참고합니다.

## References

[1]: https://vercel.com/docs/frameworks/frontend/vite "Vite on Vercel"
[2]: https://vercel.com/docs/environment-variables "Vercel Environment Variables"
[3]: https://vercel.com/docs/git "Deploying Git Repositories with Vercel"
[4]: https://vercel.com/docs/project-configuration "Vercel Project Configuration"
[5]: https://vercel.com/docs/deployments/environments "Vercel Deployment Environments"
