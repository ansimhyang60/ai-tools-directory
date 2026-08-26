# Vercel Hobby 배포 안내

AI/100은 **Vite 정적 프론트엔드 + Vercel Node.js Serverless Functions** 구조로 배포할 수 있습니다. 저장소를 Vercel에 연결하고 프로젝트 루트 디렉터리를 현재 저장소 루트로 지정하면 GitHub의 `main` 브랜치 push마다 자동 배포됩니다.

## Vercel 프로젝트 설정

| 항목 | 값 |
|---|---|
| Framework Preset | Vite |
| Root Directory | `./` |
| Install Command | `pnpm install --frozen-lockfile` |
| Build Command | `pnpm build:vercel` |
| Output Directory | `dist/public` |
| Node.js Runtime | `22.x` |

`vercel.json`이 위 설정을 저장하므로 대시보드에서 같은 값을 다시 입력하지 않아도 됩니다. `api/health.ts`는 `GET /api/health`로 동작하는 배포 확인용 함수이고, `api/oauth/callback.ts`는 기존 클라이언트의 OAuth return path를 받는 호환 엔드포인트입니다.

## 로컬 명령

`pnpm dev`는 Vite 개발 서버를 실행하고, 로컬 `/api/health`와 `/api/oauth/callback` 호환 미들웨어도 제공합니다. `pnpm build`는 Vercel용 정적 빌드와 로컬 Express fallback 서버 번들을 모두 생성합니다. `pnpm start`는 기존처럼 `dist/index.js`를 실행합니다.

## 환경변수

공개 클라이언트 변수는 Vercel Project Settings의 Environment Variables에 `VITE_` 접두사를 포함해 등록해야 합니다. 실제 비밀키는 절대로 `VITE_` 접두사를 사용하지 말고 Serverless Function에서만 읽으세요. 현재 디렉터리는 대부분 정적 데이터로 동작하며, Manus 전용 storage 자산이 없는 외부 배포에서도 favicon과 브랜드 로고가 유지되도록 로컬 favicon 및 외부 로고 fallback을 포함합니다.

## 주의 사항

Manus 기본 호스팅과 Vercel은 별도의 배포 대상입니다. Vercel 배포에서는 Manus의 내부 프록시·storage·OAuth 세션을 자동으로 공유하지 않으므로, 해당 기능을 실제 운영에 사용할 경우 Vercel용 공개 자산 URL과 인증 provider를 별도로 설정해야 합니다. 현재 구현은 정적 디렉터리와 기본 API smoke test가 독립적으로 동작하도록 구성되어 있습니다.
