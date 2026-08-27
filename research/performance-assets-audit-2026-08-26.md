# Performance asset audit — 2026-08-26

현재 정적 자산은 WebP 2개가 각각 약 118KB, 로고 WebP가 약 52KB이며 SVG 로고는 0.5–4.4KB 범위다. 보조 일러스트와 반복 로고에는 `loading="lazy"`와 `decoding="async"`를 적용했고, 초기 화면의 hero 이미지는 eager 기본 동작을 유지했다.

웹폰트는 Google Fonts의 IBM Plex Sans와 Space Grotesk를 `display=swap`으로 사용하고 있으며 Google Fonts·gstatic에 대한 preconnect가 이미 있었다. 이번 보완에서 동일한 stylesheet URL에 `rel="preload" as="style"`를 추가해 연결 후 CSS fetch를 앞당긴다. 폰트 파일을 저장소에 복제하지 않아 중복 다운로드와 번들 포함은 발생하지 않는다.

빌드 후 가장 큰 JavaScript 청크는 framework 약 583KB, GuidePages 약 555KB이며 UI 카탈로그 350건은 약 156KB 별도 동적 청크로 분리됐다. 따라서 `/ui-guide` 진입 전 UI 카탈로그 데이터는 초기 경로에 포함되지 않는다.

추가 점검 결과, 저장소의 이미지 자산은 이미 WebP 3개와 소형 SVG 로고 중심이며 PNG는 2KB 수준의 Gamma 로고 1개뿐이다. sandbox에 `cwebp`, `oxipng`, `svgo`가 설치되어 있지 않아 무손실 재압축을 강행하지 않았고, 현재 포맷·용량에서는 추가 변환보다 lazy/async 로딩과 preload 정책이 안전한 최적화로 판단된다.
