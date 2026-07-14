# Bloom Filter Presentation

고등학교 수학 주제탐구 발표를 위한 16:9 인터랙티브 웹 프레젠테이션입니다. 블룸 필터가 데이터를 비트 위치로 기억하는 과정부터 거짓 양성 확률 공식, 최적 해시 함수 개수, 결정론적 시뮬레이션까지 10장의 슬라이드로 설명합니다.

## 공개 프레젠테이션

[GitHub Pages에서 발표 보기](https://rednebula100.github.io/bloom-filter-presentation/)

## 조작 방법

- `→`, `Space`, `PageDown`: 다음 Beat 또는 슬라이드
- `←`, `PageUp`: 이전 Beat 또는 슬라이드
- `Home` / `End`: 처음 / 마지막 슬라이드
- `F`: 전체화면 전환
- `R`: 처음부터 다시 시작

발표 대본의 클릭 위치만 수동 Beat로 사용하며, 한 Beat 안의 세부 연출은 자동으로 진행됩니다. 전체 내부 클릭은 9회입니다.

## 로컬 실행

Node.js 22 이상이 필요합니다.

```bash
npm ci
npm run dev
```

개발 서버는 기존 vinext 환경으로 실행됩니다.

## 검사와 정적 빌드

```bash
npm test
npm run typecheck
npm run lint
npm run build
npm run preview
```

`npm run build`는 GitHub Pages용 정적 결과를 `dist/`에 생성합니다. 로컬 preview는 `/bloom-filter-presentation/` 경로에서 확인할 수 있습니다.

## 배포

`main` 브랜치에 push하면 GitHub Actions가 테스트, TypeScript, ESLint, production build를 실행한 뒤 GitHub Pages에 배포합니다. Actions 화면에서 수동 실행도 가능합니다.
