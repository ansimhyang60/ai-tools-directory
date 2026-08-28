# NomaDamas/k-skill 조사 메모

조사일: 2026-08-28

## 확인된 출처

- 저장소: [NomaDamas/k-skill](https://github.com/NomaDamas/k-skill)
- README 원문: [raw README](https://raw.githubusercontent.com/NomaDamas/k-skill/main/README.md)
- 개인정보 처리 안내: [k-skill-proxy 개인정보 처리방침](https://k-skill-proxy.nomadamas.org/privacy)
- 라이선스: MIT

## 서비스 범위

README에 따르면 k-skill은 한국 사용자가 자주 이용하는 서비스와 공공·생활 정보를 AI 에이전트가 다룰 수 있도록 만든 스킬 모음집이다. 예시로 SRT, KTX, KBO, 로또, 당근, 쿠팡, 카카오톡, 정부24, 홈택스 등이 소개되어 있으며 Claude Code, Codex, OpenCode, OpenClaw/ClawHub 계열 코딩 에이전트를 지원한다.

전체 설치는 `npx --yes skills add NomaDamas/k-skill --all -g`, 개별 설치는 `npx --yes skills add NomaDamas/k-skill --skill <skill-name> -g` 형식이다. 저장소는 다수의 기능별 최상위 폴더로 구성되어 있으며, 메타·문서용 폴더를 제외한 116개 기능 폴더를 공공서비스 조회·교통·쇼핑·생활·금융·문서 편집 등 분야로 분류할 수 있다.

README는 KTX와 SRT 항목을 조회 전용으로 명시하며 로그인·예약·결제·취소는 수행하지 않는다고 안내한다. 따라서 사이트에서는 실제 자동 실행 기능으로 오인되지 않도록 **공식 저장소의 스킬 모음집을 탐색·설치하는 외부 참고 리소스**로 표시하는 것이 적절하다.

## 통합 방향

현재 헤더의 `스킬 라이브러리`는 사이트 내부의 작업 방법·플레이북을 가리키고 있으므로, k-skill을 같은 메뉴의 하위 진입점인 `한국형 스킬 모음집`으로 연결하는 방식을 우선 검토한다. 외부 저장소 내용을 무단 복제하기보다 공식 GitHub 링크와 라이선스·주의사항을 함께 표시하고, 사용자가 선택한 경우에만 원문 저장소로 이동하도록 한다.
