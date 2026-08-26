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
- [ ] GitHub main 동기화 및 체크포인트 저장

## AI 도구·UI Guide 확장 검증 보완

- [x] AimAtters 2·3·4페이지 추가 도구 데이터 복원
- [x] 기존 데이터와 이름 중복 0건 감사 기록
- [x] 공식 가격 페이지 8개 개별 검증 및 미검증 링크 차단
- [x] 도구 상세 패널 업데이트 확인일·가격 링크 복원
- [x] designSystems.ts에 difficulty·previewKind 실제 필드 저장
- [x] `/ui-guide` 미리보기·난이도 필터 복원
- [x] 미리보기 장식 요소 aria-hidden 및 키보드 포커스 제외
- [x] 타입 검사·7개 테스트·Vercel 빌드 통과
- [ ] GitHub main 동기화 및 신규 체크포인트 저장
