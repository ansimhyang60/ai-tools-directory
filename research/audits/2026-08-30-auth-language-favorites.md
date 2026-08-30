# 2026-08-30 인증·다국어·즐겨찾기 화면 검증

데스크톱 1280px와 모바일 390px에서 홈 및 `/skills?source=k-skill`을 full-page 캡처했다. 헤더의 한국어/EN 전환 버튼과 비로그인 상태의 Google 로그인 버튼은 기존 검색 영역과 함께 표시되며 모바일에서는 상단 액션이 축약되어 잘림 없이 보인다. k-skill 모음집은 카드 그리드에서 즐겨찾기 별 버튼과 즐겨찾기 전용 필터를 제공하고, 카드 내 댓글 버튼은 필요할 때 댓글 패널을 펼치는 구조다.

기술 검증은 TypeScript 검사, 16개 테스트 파일의 44개 테스트, Vite 프로덕션 빌드를 통과했다. 프로덕션 빌드에서 `data-vendor`와 `react-vendor` 분리가 적용됐으며, `skills300`·`popularTools` 등 대형 카탈로그는 페이지 lazy route 청크로 분리되어 초기 라우트에 직접 포함되지 않는다. 모바일 캡처에서 baseline-browser-mapping의 오래된 개발 의존성 안내만 표시됐고 애플리케이션 오류는 확인되지 않았다.

Google 버튼은 별도 수제 OAuth callback이 아니라 기존 Manus OAuth portal을 시작한다. 상위 인증 포털에서 Google 계정을 선택하면 기존 nonce 보호 callback과 `loginMethod` 정규화가 유지된다.
