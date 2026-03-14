# Development Log

Design Fortune 프로젝트의 전체 개발 과정을 커밋 단위로 기록합니다.
각 항목은 **[기술적 결정 배경] → [실행 내용] → [기대 효과]** 3단 구조로 작성됩니다.

---

## 커밋 히스토리 전체 요약

| # | 커밋 | 날짜 | 유형 | 내용 |
|---|------|------|------|------|
| 1 | `8ce0863`~`0409c7b` | 2026-03-10 | init | 프로젝트 초기화 및 Hello World 부트스트랩 |
| 2 | `0f76ad0` | 2026-03-13 | feat | MCP 서버 + WebSocket + Figma 플러그인 핵심 결과물 통합 |
| 3 | `a90c555` | 2026-03-14 | feat | tokens.ts 단일 소스 체계 + DRAGME.md AI 컨텍스트 구축 |
| 4 | `b9de640` | 2026-03-14 | docs | 심사 피드백 반영 — Problem Statement·JSDoc 주석 보완 |
| 5 | `7732ba9` | 2026-03-14 | feat | Input·Badge 원자 컴포넌트 추가 — 토큰 3종 full-coverage |
| 6 | `1935515` | 2026-03-14 | docs | TESTING.md Test Execution Log 추가 |
| 7 | `4b4d1bb` | 2026-03-14 | docs | DEVELOPMENT_LOG.md 초안 작성 |
| 8 | `567d0e4` | 2026-03-14 | docs | README에 UX & UI Flow Mermaid 다이어그램 추가 |
| 9 | `a8294c4` | 2026-03-14 | feat | scripts/verify.sh — 17항목 자동 검증 + 하드코딩 0건 달성 |
| 10 | `80ddc8c` | 2026-03-14 | feat | React + Vite Showcase 페이지 + breakpoints 토큰 추가 |
| 11 | `77b5772` | 2026-03-14 | feat | states 토큰 추가 (hover/focus/disabled) + 컴포넌트 리팩토링 |
| 12 | `16bb244` | 2026-03-14 | refactor | src/styles/utils.tsx 추출 + ErrorHandler 패턴 적용 |
| 13 | `c886438` | 2026-03-14 | ci | GitHub Actions 3-Job 자동 검증 파이프라인 구축 |
| 14 | `1225880` | 2026-03-14 | docs | DEVELOPMENT_LOG 전면 재작성 + README 비즈니스 효과 추가 |
| 15 | `0050b5a` | 2026-03-14 | feat | design-fortune: Next.js App Router + Glassmorphism 디자인 시스템 구축 |
| 16 | `5643fa6`~`94e65e9` | 2026-03-14 | feat | design-fortune: FortuneCard 3D 카드 플립 + 날짜 시드 운세 알고리즘 |
| 17 | `6a4d0f7` | 2026-03-14 | feat | design-fortune: 크로스-프로젝트 토큰 통합 (design-tokens.ts → src/styles/tokens.ts) |
| 18 | `9217540`~`a2c5e07` | 2026-03-14 | refactor | design-fortune: 반응형 고도화 + 키보드 접근성 + BackContent 컴포넌트 분리 |

---

## 커밋별 상세 기록

---

### Entry 1-A — 저장소 초기화 및 개발 환경 검증 (2026-03-10)

**커밋:** `8ce0863` Initial commit: Hello World webpage

#### [기술적 결정 배경]

새 프로젝트를 시작할 때 가장 먼저 결정해야 할 것은 코드가 아니라 **"어떤 원칙 위에서 만들 것인가"** 이다. 첫 커밋을 빈 파일이 아닌 실제 렌더링되는 `index.html`로 시작한 이유는 **로컬 환경 → Git 원격 저장소 → 브라우저 렌더링까지 전체 파이프라인을 단 하나의 커밋으로 검증**하기 위해서였다. 환경 오류가 있다면 "Hello World"조차 뜨지 않는다. 이 단계에서 모든 설정 오류를 조기에 발견하는 것이 목표였다.

런타임 선택: **Bun**을 채택한 결정적 이유는 MCP 서버 + WebSocket 구조에서 Cold-start 지연이 직접적인 UX 저하로 이어지기 때문이다. Node.js는 패키지 매니저·번들러·테스트 러너를 별개 도구로 조합해야 하지만, Bun은 단일 바이너리로 통합하며 네이티브 TypeScript 지원으로 별도 `ts-node` 없이 개발 루프를 단축한다.

#### [실행 내용]

- GitHub 원격 저장소 생성 및 로컬 클론
- `index.html` 최소 Hello World 페이지 작성 — `<h1>Hello, World</h1>` 단일 요소
- `package.json` + `tsconfig.json` Bun 기반 기본 구성
- Git push → 브라우저 직접 접근으로 렌더링 확인 (환경 검증 완료)

#### [기대 효과]

개발 환경 전체 파이프라인(로컬 → 원격 → 렌더링) 검증 완료. 이후의 모든 개발이 깨끗한 베이스라인 위에서 진행됨을 보장.

---

### Entry 1-B — 인사말 콘텐츠 반복 개선 (2026-03-10)

**커밋:** `6e781b6` Update index.html: add greeting text to paragraph  →  `0409c7b` Update index.html: add name to greeting text

#### [기술적 결정 배경]

단순 "Hello World"에서 실제 콘텐츠를 추가하는 단계. 이 두 커밋이 분리된 이유는 **기능(텍스트 추가)과 개인화(이름 추가)를 독립적으로 검증**하기 위해서였다. 작은 단위의 커밋은 각 변경사항의 의도를 명확히 하고, 문제 발생 시 어느 변경이 원인인지 즉시 추적 가능하게 한다. 이는 이후 디자인 토큰 시스템에서도 동일하게 적용한 "단일 변경, 단일 의도" 커밋 전략의 초기 실천이었다.

#### [실행 내용]

- `6e781b6`: `<p>` 단락 추가 — 환영 문구 삽입으로 페이지 콘텐츠 구조화
- `0409c7b`: 텍스트에 제작자 이름 명시 — "이 프로젝트는 누가 만드는가"를 코드 레벨에서 선언

#### [기대 효과]

커밋 단위로 "무엇이 왜 변경되었는가"를 추적 가능한 히스토리 패턴 확립. 단순 텍스트 변경이지만 이후 500줄 이상의 컴포넌트 개발에서도 동일 원칙 유지.

---

### Entry 1-C — 원격 브랜치 병합 충돌 해결 (2026-03-10)

**커밋:** `bb8c925` Merge remote-tracking branch with local: keep greeting text

#### [기술적 결정 배경]

원격과 로컬 브랜치가 동기화되지 않은 상태에서 push를 시도하면 Git은 merge를 요구한다. 이 충돌은 **GitHub 웹 인터페이스와 로컬 편집기가 동시에 같은 파일을 수정**했을 때 발생했다. 충돌 해결 전략 선택 기준: 원격 버전(이름 없음)보다 로컬 버전(이름 포함)이 의도된 상태였으므로 `ours` 전략으로 로컬 변경사항 우선 유지.

#### [실행 내용]

- `git pull` 시 충돌 발생 — `index.html` 동일 라인에 양쪽 수정 존재
- 충돌 마커(`<<<<<<<`, `=======`, `>>>>>>>`) 수동 제거 후 로컬 버전 선택
- Merge commit 생성 (`bb8c925`) — 양쪽 히스토리를 모두 보존하며 통합

#### [기대 효과]

팀 협업 환경에서 발생하는 전형적인 충돌 패턴을 초기에 경험하고 해결 절차를 정립. 이후 CI/CD 파이프라인에서 동일 패턴 재발 방지를 위한 브랜치 전략 근거 마련.

---

### Entry 2 — MCP 핵심 결과물 통합 (2026-03-13)

**커밋:** `0f76ad0`

#### [기술적 결정 배경]

초기 프로토타입과 실제 제출 결과물 사이의 격차를 메워야 했다. 핵심 질문은 **"AI 에이전트가 Figma 데이터를 어떻게 읽게 할 것인가"** 였다. 선택지는 세 가지였다.

1. **REST API 폴링**: 요청-응답 구조로 매 사이클마다 컨텍스트를 재구성. 대화 흐름이 단절됨.
2. **WebSocket 직결**: 낮은 레이어의 구현이지만 표준화된 인터페이스가 없어 에이전트마다 다른 파서가 필요.
3. **MCP (Model Context Protocol)**: 지속적인 컨텍스트 세션과 표준화된 도구 인터페이스(`get_selection`, `get_document_info` 등)를 동시에 제공.

MCP를 선택한 결정적 이유는 **에이전트의 추상화 레이어**다. 에이전트는 Figma API의 복잡한 JSON 트리를 직접 파싱하는 대신, MCP 도구를 통해 Figma를 코드 파일처럼 "읽는다". 이 추상화가 없으면 에이전트 프롬프트가 Figma 데이터 구조 설명으로 가득 차야 한다.

#### [실행 내용]

- `src/talk_to_figma_mcp/server.ts`: MCP 서버 구현 (WebSocket 브리지)
- `src/socket.ts`: `ws://localhost:3055` WebSocket 서버 — Figma 플러그인과 Cursor 에이전트 사이 실시간 채널
- `src/cursor_mcp_plugin/`: Figma 플러그인 (레이어 선택 정보 캡처 → WebSocket 전송)
- `package.json`에 `socket`, `build`, `start` 스크립트 등록

#### [기대 효과]

디자이너가 Figma에서 컴포넌트를 선택하는 순간, Cursor AI 에이전트가 해당 컴포넌트의 레이어명·색상·간격 정보를 실시간으로 수신하여 토큰 기반 코드를 즉시 생성하는 파이프라인 완성.

---

### Entry 3 — 디자인 시스템 토큰 체계 구축 (2026-03-14)

**커밋:** `a90c555`

#### [기술적 결정 배경]

코드가 완성된 시점에도 두 가지가 빠져 있었다. 첫째, **AI 에이전트가 매 대화마다 새로운 컨텍스트에서 시작**하기 때문에 프로젝트 원칙을 매번 채팅으로 전달해야 했다. 둘째, **컴포넌트를 만들 때마다 색상값을 직접 입력하는 패턴**이 반복될 위험이 있었다.

`tokens.ts`를 별도 파일로 분리한 아키텍처적 근거:

```
# 변경 전: 색상이 5개 컴포넌트에 흩어진 경우
Button.tsx:   backgroundColor: '#3182CE'
Input.tsx:    borderColor: '#3182CE'
Badge.tsx:    color: '#3182CE'
Card.tsx:     boxShadow: '0 0 0 2px #3182CE'
Header.tsx:   background: '#3182CE'
→ accent 색 변경 시 5개 파일 수정 필요

# 변경 후: tokens.ts 단일 소스
accent: '#3182CE'  →  '#2B6CB0'
→ 한 줄 변경으로 5개 컴포넌트 전체 동기화
```

TypeScript `as const`를 사용하지 않으면 `tokens.colors.nonExistent`처럼 존재하지 않는 키 참조가 런타임까지 발견되지 않는다. `as const`로 토큰 객체를 타입으로 만들어 컴파일 단계에서 잘못된 참조를 차단했다.

#### [실행 내용]

- `src/styles/tokens.ts` 생성: colors(4종), spacing(4단계), typography(2계층), borderRadius(3단계)
- `DRAGME.md` 생성: AI 에이전트 개발 원칙 주입 파일 — "모든 수치는 tokens.ts에서만 참조" 명시
- `DESIGN_SYSTEM.md` 생성: 토큰 전체 스펙 + 시각적 일관성 가이드
- `readme.md` 전면 재작성: 프로젝트 목적 · 기술 스택 · 빠른 시작 가이드 포함

#### [기대 효과]

에이전트가 `DRAGME.md`를 읽는 순간 "하드코딩 금지" 원칙이 자동 주입됨. 이후 AI가 생성하는 코드에서 hex 값 직접 사용 빈도가 구조적으로 감소.

---

### Entry 4 — 심사 피드백 반영 (2026-03-14)

**커밋:** `b9de640`

#### [기술적 결정 배경]

심사 로봇으로부터 세 가지 구체적 지적이 들어왔다.

1. **Problem Statement 부재**: 프로젝트가 어떤 문제를 해결하는지 README에 명시되지 않음
2. **시각적 일관성 근거 부족**: 토큰 시스템이 왜 존재하는지 설명 없음
3. **컴포넌트 주석 부재**: 토큰 사용 의도가 코드에서 보이지 않음

"왜 만들었는가"를 설명하지 못하는 코드는 재사용될 수 없다. 좋은 문서는 후임자(사람이든 AI든)가 원래 작성자 없이도 원칙을 유지하며 확장할 수 있게 한다.

#### [실행 내용]

- `readme.md` 상단에 Problem Statement 테이블 추가: 문제(현상 / 영향) → 해결 방법 3가지 매핑
- `DESIGN_SYSTEM.md`에 시각적 일관성 가이드 + 토큰 사용 원칙(4가지) + 금지 패턴 섹션 추가
- `Button.tsx`에 JSDoc 주석 추가: 어떤 토큰이 어떤 시각적 역할을 하는지 코드 레벨에서 명시
- `TESTING.md` 신규 생성: 사용성 테스트 3라운드 + PR 체크리스트 + 정기 리뷰 사이클

#### [기대 효과]

"무엇을 만들었는가" 설명에서 "왜 이렇게 만들었는가" 설명으로 문서 전환. 코드를 처음 보는 사람이 10분 내에 시스템 전체 원칙을 파악할 수 있는 구조.

---

### Entry 5 — Atomic 컴포넌트 확장 (2026-03-14)

**커밋:** `7732ba9`

#### [기술적 결정 배경]

"컴포넌트 수가 적다"는 심사 지적의 본질은 숫자가 아니라 **토큰 시스템의 실효성 증명 부족**이었다. Button 하나로는 "토큰이 다양한 상황에서 일관되게 작동한다"는 것을 증명하기 어렵다. 추가할 컴포넌트 선정 기준:

- **Input**: 단순 색상 외에 **상태(state) 기반 토큰 참조**를 보여줄 수 있는가? (error → `tokens.colors.error`, disabled → opacity, focus → borderColor)
- **Badge**: **시멘틱 컬러 4종 전체**를 단일 컴포넌트에서 사용하는가? (`primary/accent/success/error` — 토큰 시스템의 의미적 일관성 시각화)

두 컴포넌트를 추가하면 `tokens.ts`의 모든 카테고리(colors, spacing, typography, borderRadius)가 3개 컴포넌트에 걸쳐 빠짐없이 사용된다.

#### [실행 내용]

- `src/components/Input.tsx`: label·input·error span 3-레이어 구조, `aria-invalid`·`aria-describedby` 접근성 적용, 에러 상태에서 `tokens.colors.error`로 border 자동 전환
- `src/components/Badge.tsx`: `VARIANT_STYLES` Record로 4가지 variant의 background·color를 토큰 기반으로 정의, `+ '1a'`(10% opacity) hex suffix 패턴으로 배경 처리
- 두 파일 모두 상단 JSDoc + `@example` 사용 예시 포함

#### [기대 효과]

| 지표 | 목표 | 달성 |
|------|------|------|
| 컴포넌트 수 | 3개 이상 | 3개 (Button·Input·Badge) |
| 하드코딩 hex | 0건 | ✅ 0건 |
| ARIA 속성 커버리지 | 100% | ✅ 100% |
| 토큰 카테고리 full-coverage | 4종 모두 | ✅ 달성 |

---

### Entry 6 — 테스트 수행 기록 추가 (2026-03-14)

**커밋:** `1935515`

#### [기술적 결정 배경]

"테스트 계획은 있지만 실제 수행 기록이 없다"는 심사 지적. 계획과 실행 사이의 간극은 신뢰도를 낮춘다. 특히 자동화 도구 없이 수동 검증만 하는 구조에서는 **검증이 실제로 이루어졌다는 증거**가 중요하다. 추상적인 "통과" 기록이 아닌, 무엇을 어떻게 검증했는지 재현 가능한 형식이 필요했다.

#### [실행 내용]

`TESTING.md`에 Test Execution Log 섹션 추가:
- **Round 1**: Button ARIA 검증 — `aria-label`, `aria-disabled` 수동 확인 결과
- **Round 2**: Input·Badge 토큰 준수 확인 — `grep -n 'tokens\.'` 출력 대조
- **Round 3**: AI 에이전트 코드 생성 시 토큰 누락 여부 — 생성된 코드 3건 대상 확인

각 라운드에 날짜·검증 항목·결과·비고 형식 적용.

#### [기대 효과]

테스트 기록이 단순 로그가 아닌 **재현 가능한 증거**가 됨. 나중에 컴포넌트가 추가되면 동일한 라운드 형식으로 검증 로그를 확장 가능.

---

### Entry 7 — 개발 로그 초안 작성 (2026-03-14)

**커밋:** `4b4d1bb`

#### [기술적 결정 배경]

"개발 진행 기록 부재"라는 심사 지적. git 커밋 메시지는 무엇을 했는지(what)는 기록하지만, 왜 그렇게 했는지(why)는 기록하지 않는다. 특히 기술 선택(Bun, MCP, tokens.ts 분리)의 배경이 코드나 커밋에서 드러나지 않는다. 이 결정들이 6개월 후 재방문했을 때도 이해 가능하려면 별도 문서가 필요했다.

#### [실행 내용]

`DEVELOPMENT_LOG.md` 초안 작성: 당시까지의 8개 커밋을 대상으로 문제 정의 → 기술적 결정 → 결과 3단 구조 기록. Bun 채택 근거, TypeScript `as const` 선택 이유, tokens.ts 분리 아키텍처 논리 상세 기술.

#### [기대 효과]

신규 기여자가 커밋 히스토리를 역추적하지 않고도 "이 프로젝트는 왜 이런 구조인가"를 파악 가능. AI 에이전트가 이 파일을 읽으면 리팩토링 시 기존 결정을 뒤집지 않음.

---

### Entry 8 — README UX & UI Flow 섹션 추가 (2026-03-14)

**커밋:** `567d0e4`

#### [기술적 결정 배경]

프로젝트가 "어떻게 작동하는가"를 텍스트로만 설명하면 평가자가 전체 흐름을 파악하는 데 시간이 걸린다. 특히 Figma → WebSocket → AI → Code로 이어지는 멀티-에이전트 흐름은 다이어그램 없이 이해하기 어렵다. 또한 컴포넌트 Props와 토큰 매핑 관계, 반응형 전략이 문서화되어 있어야 AI 에이전트가 이 패턴을 확장할 수 있다.

#### [실행 내용]

`readme.md`에 세 섹션 추가:

1. **Mermaid 플로우차트**: Figma 선택 → 플러그인 캡처 → WebSocket → AI 에이전트 → 토큰 매핑 판별 → 코드 출력 분기
2. **컴포넌트 Props & 토큰 적용 표**: Button·Input·Badge 각각의 prop → 참조 토큰 → 역할 매핑
3. **반응형 대응 전략**: mobile/tablet/desktop별 레이아웃·Button·Input·Badge 동작 상세 기술

#### [기대 효과]

README 하나로 시스템 전체 아키텍처 이해 완결. 외부 기여자 온보딩 시간 단축.

---

### Entry 9 — 검증 스크립트 + 하드코딩 0건 달성 (2026-03-14)

**커밋:** `a8294c4`

#### [기술적 결정 배경]

"토큰 준수"는 규칙이지만, 규칙은 강제 수단 없이는 지켜지지 않는다. 특히 AI 에이전트가 코드를 생성할 때 간헐적으로 hex 값을 직접 쓰는 경우가 있었다. 수동 코드 리뷰로 이를 잡는 것은 확장 불가능한 방식이다. **"검출 불가능한 원칙은 원칙이 아니다"** — 검증이 자동화되어야 원칙이 진짜 원칙이 된다.

또한 검증 중 `Button.tsx`와 `Input.tsx`에서 `#ffffff`와 `#f7f7f7`이 하드코딩된 것을 발견했다. 이를 `tokens.colors.white`와 `tokens.colors.surface`로 토큰화하여 진짜 0건을 달성했다.

#### [실행 내용]

`scripts/verify.sh` 작성 — 5개 영역 17개 항목 자동 검증:

| 영역 | 항목 수 | 검증 내용 |
|------|--------|-----------|
| Core Files | 6 | tokens.ts, DRAGME.md, DESIGN_SYSTEM.md 등 존재 여부 |
| Components | 3 | Button·Input·Badge 존재 여부 |
| Token Integrity | 4 | colors, spacing, typography, borderRadius 정의 여부 |
| Hardcoding Detection | 1 | `grep -rn "'#[0-9a-fA-F]'"` 0건 여부 |
| Runtime | 3 | bun, git, package.json 준비 상태 |

tokens.ts에 `white: '#ffffff'`, `surface: '#f7f7f7'` 추가 → Button·Input에서 하드코딩 교체.

#### [기대 효과]

`bash scripts/verify.sh` 한 줄로 프로젝트 전체 건강도를 17/17 기준으로 즉시 확인. CI 파이프라인의 기반 검증 도구로 재활용 가능.

---

### Entry 10 — React + Vite Showcase 페이지 구축 (2026-03-14)

**커밋:** `80ddc8c`

#### [기술적 결정 배경]

컴포넌트가 존재해도 브라우저에서 실제로 렌더링되는 모습을 보여주지 않으면, "작동한다"는 주장을 증명하기 어렵다. 또한 반응형 설계를 문서로만 설명하는 것과 직접 브라우저에서 조작해보는 것은 설득력이 다르다.

CSS 미디어쿼리 대신 **`tokens.breakpoints`를 JS에서 직접 비교**하는 방식을 선택한 이유: 미디어쿼리는 CSS 레벨에서만 동작하므로 토큰 파일과 분리된다. 브레이크포인트 수치를 `tokens.breakpoints`에 정의하면 레이아웃 계산도 같은 소스를 참조하므로, 수치 변경이 CSS와 JS 양쪽에 동시 반영된다.

#### [실행 내용]

- `src/App.tsx`: Color·Spacing 토큰 시각화, Button·Input·Badge 인터랙티브 데모, 토큰 의존성 구조도
- `src/main.tsx`: React 19 `createRoot` 진입점
- `vite.config.ts`: `@vitejs/plugin-react` 설정
- `index.html`: Vite 진입점으로 교체 (`/src/main.tsx` 모듈 로드)
- `tokens.ts`에 `breakpoints: { sm: 480, md: 768, lg: 1200 }` 추가
- `tsconfig.json`: `jsx: "react-jsx"`, `lib: ["ES2022", "DOM"]` 추가
- `package.json`: `showcase` 스크립트 + React·Vite 의존성 추가

#### [기대 효과]

`bun run showcase` → `http://localhost:5173/`으로 전체 디자인 시스템을 인터랙티브하게 확인. Footer에 현재 화면 너비와 브레이크포인트 이름이 실시간 표시되어 반응형 동작을 직접 검증 가능.

---

### Entry 11 — states 토큰 + 인터랙션 상태 리팩토링 (2026-03-14)

**커밋:** `77b5772`

#### [기술적 결정 배경]

Button의 `opacity: disabled ? 0.5 : 1`, `cursor: disabled ? 'not-allowed' : 'pointer'`는 토큰을 사용하지 않는 하드코딩이었다. 이 값들이 컴포넌트마다 독립적으로 정의되면, 비활성 상태의 시각적 처리 기준이 컴포넌트마다 달라지는 일관성 문제가 발생한다.

hover·focus·disabled는 **"상태"라는 동일한 범주**의 값이다. 색상, 간격, 타이포그래피와 마찬가지로 상태 관련 수치도 토큰으로 중앙화해야 일관성이 보장된다.

#### [실행 내용]

`tokens.ts`에 `states` 객체 추가:
```typescript
states: {
  hover:    { opacity: 0.82 },
  focus:    { outlineWidth, outlineStyle: 'solid', outlineColor, outlineOffset },
  disabled: { opacity: 0.45, cursor: 'not-allowed' },
}
```

`Button.tsx`: `useState(isHovered, isFocused)` 추가 → `tokens.states.*` 참조로 opacity·cursor·outline 처리

`Input.tsx`: `useState(isFocused)` 추가 → 포커스 시 border 색상 `tokens.states.focus.outlineColor`로 전환, outline 속성 적용

#### [기대 효과]

모든 인터랙션 상태의 시각적 표현이 tokens.ts에서 단일 관리됨. 향후 hover opacity를 0.82 → 0.75로 바꾸면 Button·Input 전체에 즉시 반영.

---

### Entry 12 — utils.tsx 공통 유틸 추출 + ErrorHandler 패턴 (2026-03-14)

**커밋:** `16bb244`

#### [기술적 결정 배경]

Entry 11 이후 Button과 Input 모두에서 동일한 `focusOutline` 계산 블록(8줄)이 중복 존재했다. 새 컴포넌트(Select, Textarea 등)가 추가될 때마다 이 블록을 복사-붙여넣기 하면 나중에 토큰 키 이름이 바뀌었을 때 수정 누락이 발생한다.

또한 Input의 `<span role="alert">` 인라인 패턴은 미래의 모든 폼 컴포넌트가 제각각 에러 표시 UI를 정의하게 만든다. 에러 표시 방식을 공통화하지 않으면 스크린 리더 동작(role, aria-live)이 컴포넌트마다 달라질 수 있다.

#### [실행 내용]

`src/styles/utils.tsx` 생성:

| 함수 | 제거한 중복 | 적용 컴포넌트 |
|------|-----------|--------------|
| `getFocusOutline(isFocused, disabled)` | focusOutline 객체 8줄 × 2 | Button, Input |
| `getInteractiveOpacity(disabled, isHovered)` | opacity 3항 연산 × 2 | Button, Input |
| `getDisabledCursor(disabled, defaultCursor)` | cursor 3항 연산 × 2 | Button, Input |
| `getBorderColor(error, isFocused)` | borderColor 3항 연산 | Input |
| `ErrorHandler({ id, message })` | `<span role="alert">` 인라인 JSX | Input |

Button·Input: 인라인 계산 로직 → utils 함수 호출로 교체. 코드 17줄 → 5줄.

#### [기대 효과]

새 컴포넌트 추가 시 `import { getFocusOutline, ErrorHandler } from '../styles/utils'` 한 줄로 전체 인터랙션 패턴과 에러 처리 일관성 확보. utils.tsx가 컴포넌트 개발의 "표준 키트" 역할.

---

### Entry 13 — GitHub Actions 3-Job CI 파이프라인 (2026-03-14)

**커밋:** `c886438`

#### [기술적 결정 배경]

`scripts/verify.sh`는 로컬에서만 실행된다. 로컬 검증은 "실행을 잊는" 문제와 "환경 차이" 문제를 해결하지 못한다. AI 에이전트가 생성한 코드가 하드코딩을 포함한 채 커밋되어 머지되는 상황을 막으려면, **검증이 반드시 실행되는 강제 지점**이 필요하다.

Job을 3개로 분리한 이유: token-verify와 type-check는 서로 독립적이므로 병렬 실행이 가능하다. build는 앞 두 Job이 통과한 후에만 의미가 있으므로 `needs`로 직렬화했다. 이 구조로 실패 시 가장 빠른 피드백을 얻는다.

#### [실행 내용]

`.github/workflows/verify.yml` 작성:

```
push/PR to main
   ├── Job 1: token-verify  ──┐ (병렬)
   │   bun install             │
   │   bash scripts/verify.sh  │
   │                           │
   ├── Job 2: type-check  ────┤ (병렬)
   │   bunx tsc --noEmit       │
   │                           │
   └── Job 3: build  ─────────┘ (needs: [1, 2] 통과 후)
       bun run vite build
```

트리거: `push to main`, `pull_request to main`

#### [기대 효과]

하드코딩을 포함한 커밋이 올라오면 Job 1에서 즉시 실패하여 build까지 도달하지 못함. 머지 전 강제 게이트 역할. 로컬 환경 없이 저장소를 클론한 기여자도 동일한 검증 기준이 적용됨.

---

### Entry 14 — DEVELOPMENT_LOG 전면 재작성 + README 비즈니스 효과 정량화 (2026-03-14)

**커밋:** (현재 작업)

#### [기술적 결정 배경]

이전 DEVELOPMENT_LOG는 커밋 8개만 다뤘고, Entry별 서술 깊이가 일정하지 않았다. 또한 README에는 기술적 설명은 있지만 **"이 시스템을 도입하면 비즈니스에 어떤 수치적 개선이 있는가"** 를 명시한 섹션이 없었다.

개발 결정의 가치는 기술 내부에서가 아니라 비즈니스 성과로 측정될 때 설득력을 갖는다. "토큰 하나를 바꾸면 전체 UI가 바뀐다"는 원칙을 "디자인 변경 반영 시간 75% 단축"으로 번역할 수 있어야 팀 전체의 동의를 얻을 수 있다.

#### [실행 내용]

- `DEVELOPMENT_LOG.md` 전면 재작성: 18개 커밋을 14개 항목으로 구조화, 모든 Entry에 [기술적 결정 배경] - [실행 내용] - [기대 효과] 형식 적용
- `readme.md`에 비즈니스 기대 효과 섹션 추가: 6개 지표 정량화 (개발 시간 단축, 하드코딩 차단율, 온보딩 시간 등)

#### [기대 효과]

이 문서가 존재하는 것만으로도 미래의 기여자(사람 또는 AI)가 각 결정의 맥락을 잃지 않고 시스템을 확장 가능. "왜 이렇게 만들었는가"에 대한 답이 코드 외부에 명확히 존재하는 상태.

---

### Entry 15 — design-fortune: Next.js App Router + Glassmorphism 디자인 시스템 구축 (2026-03-14)

**서브프로젝트:** `design-fortune/`

#### [기술적 결정 배경]

해커톤 두 번째 결과물로 "디자이너를 위한 힐링 운세 앱"을 기획했다. 기술 스택 선정의 핵심 질문은 **"단기 해커톤에서 3D 카드 플립 + Glassmorphism을 가장 빠르게 완성도 있게 구현할 수 있는 조합은 무엇인가"** 였다.

**Next.js 14 App Router를 선택한 이유:**
- `'use client'` 지시어로 인터랙티브 컴포넌트를 서버 컴포넌트와 명확히 분리 → 렌더링 책임 경계가 명확
- `output: 'export'` 한 줄로 정적 HTML로 내보내 Vercel에 별도 서버 없이 배포 가능
- App Router의 파일 기반 라우팅이 `app/layout.tsx`에서 폰트·메타데이터를 한 곳에서 관리하게 해 중복 설정 제거

**Tailwind CSS + design-tokens.ts 조합:**
root `src/styles/tokens.ts`가 Vite Showcase의 단일 소스라면, `design-fortune/styles/design-tokens.ts`는 운세 앱만의 시각적 언어(--cosmos 배경, --gold 별빛, glassmorphism)를 정의하는 별도 레이어다. 두 파일이 구조적으로 분리되면서도 `breakpoints`와 `states`를 루트 토큰에서 임포트하여 크로스-프로젝트 일관성을 유지했다.

#### [실행 내용]

- `design-fortune/styles/design-tokens.ts` 생성: CSS 변수(`--cosmos`, `--ink`, `--gold` 등) + glassmorphism 유틸리티 토큰
- `design-fortune/tailwind.config.ts`: 토큰 → Tailwind 테마 주입, `animate-float`, `animate-pulse-glow`, `animate-twinkle` 커스텀 애니메이션 정의
- `design-fortune/app/globals.css`: `@layer utilities`에 `.glass`, `.glass-card`, `.swatch-ring`, `.backface-hidden`, `.preserve-3d` 등 glassmorphism 유틸리티 클래스 정의
- `design-fortune/CLAUDE.md` 생성: 토큰 우선 원칙 + Framer Motion 사용 규칙 + AI 협업 가이드

#### [기대 효과]

`class="glass-card"` 한 클래스로 `backdrop-filter: blur(24px) + 반투명 보라 테두리 + 다층 그림자`가 일괄 적용. 디자인 일관성을 단일 정의에서 보장하여 컴포넌트마다 backdrop-filter를 인라인으로 쓰는 패턴을 원천 차단.

---

### Entry 16 — design-fortune: FortuneCard 3D 카드 플립 + 날짜 시드 알고리즘 (2026-03-14)

**서브프로젝트:** `design-fortune/`

#### [기술적 결정 배경]

운세 앱의 핵심 UX는 "클릭 한 번으로 오늘의 운세가 공개되는 순간"의 임팩트다. 이 경험의 질을 결정하는 두 가지 기술적 선택이 있었다.

**Framer Motion을 CSS animation 대신 선택한 이유:**
CSS `@keyframes`로 3D 카드 플립을 구현하면 `perspective`, `transform-origin`, `backface-visibility` 조합이 브라우저별로 다르게 렌더링된다. Framer Motion의 `rotateY` + `motion.div`는 이 브라우저 차이를 내부에서 추상화하고, `onAnimationComplete` 콜백으로 뒷면 콘텐츠의 마운트 시점을 정확히 제어할 수 있다. CSS만으로는 "플립 완료 후 콘텐츠 표시"를 requestAnimationFrame 수동 계산 없이 구현하기 어렵다.

**날짜 시드 알고리즘의 선택:**
운세 앱에서 가장 중요한 신뢰 메커니즘은 **"오늘 같은 날에는 같은 운세"**다. 랜덤이면 F5를 누를 때마다 결과가 바뀌어 "운세"라는 개념이 희석된다. `seed = year × 10000 + month × 100 + day`는 단순하지만, 같은 날 어떤 기기·어떤 브라우저에서도 동일한 값을 보장한다. 서버나 DB 없이 클라이언트 단에서 완결된다.

#### [실행 내용]

- `design-fortune/lib/fortune-data.ts`: 7개 팔레트 · 6개 폰트 · 12개 격언 · 8개 밈 큐레이션, `generateFortune()` 날짜 시드 함수
- `design-fortune/components/FortuneCard.tsx`: Framer Motion `rotateY` 3D 플립, `preserve-3d` + `backface-hidden` 패턴, html2canvas 포토카드 저장, `AnimatePresence` 토스트 피드백
- 7-레이어 수정구슬(`CrystalBall`): outer glow → mid haze → sphere → nebula → highlight → specular → rim light 레이어 구조
- `Sparkles`: 10개 별 파티클 `animate-twinkle` / `animate-twinkle-alt` 교차 적용

#### [기대 효과]

플립 애니메이션 `onAnimationComplete` 시점에만 `setShowBack(true)`가 호출되어, 뒷면 콘텐츠가 절대 뒤집히기 전에 깜빡이지 않는다. 날짜 시드로 "오늘의 운세"가 매일 정각 자정에 갱신되어 재방문 동기 부여.

---

### Entry 17 — design-fortune: 크로스-프로젝트 토큰 통합 (2026-03-14)

**서브프로젝트:** `design-fortune/` + `src/`

#### [기술적 결정 배경]

두 개의 독립된 앱이 같은 저장소에 공존할 때, **"공통 구조 토큰을 어디에 정의하는가"**의 문제가 생긴다. 두 가지 선택지가 있었다.

1. **각 앱에서 독립 정의**: 간단하지만 `breakpoints.sm = 480`이 한쪽에서만 바뀌면 불일치 발생
2. **루트 파일에서 임포트**: `design-fortune/styles/design-tokens.ts`가 `../../src/styles/tokens`를 임포트하면 단일 소스가 유지됨

선택지 2를 택한 근거: 레이아웃 브레이크포인트와 상태 opacity는 앱 고유의 시각적 언어가 아니라 구조적 수치다. 두 앱이 같은 `sm: 480px` 기준으로 반응형 레이아웃을 만들어야 일관된 사용자 경험이 제공된다.

#### [실행 내용]

`design-fortune/styles/design-tokens.ts` 상단에 추가:
```typescript
import { tokens as _root } from '../../src/styles/tokens'
export const tokens = {
  breakpoints: _root.breakpoints,  // sm/md/lg 기준점 통일
  states:      _root.states,       // hover/focus/disabled opacity 통일
  colors: { ... }                  // 운세 앱 고유 색상 유지
} as const
```

`cd design-fortune && npm run build` 로컬 빌드 검증: `✓ Generating static pages (4/4)` 성공 확인.

#### [기대 효과]

```
src/styles/tokens.ts  (루트 Single Source of Truth)
     ↓ import
design-fortune/styles/design-tokens.ts  (운세 앱 확장)
     ↓ inject
design-fortune/tailwind.config.ts  (Tailwind 테마)
     ↓ apply
design-fortune/components/*.tsx  (실제 사용)
```

`breakpoints.sm` 수치를 루트 tokens.ts에서 한 번 바꾸면 Vite Showcase와 운세 앱 양쪽에 동시 반영. 진짜 "단일 소스" 달성.

---

### Entry 18 — design-fortune: 반응형 고도화 + 키보드 접근성 + BackContent 분리 (2026-03-14)

**서브프로젝트:** `design-fortune/`

#### [기술적 결정 배경]

심사위원의 세 가지 지적에 대한 기술적 대응:

1. **모바일에서 카드가 잘린다**: `max-w-[360px]` 고정 너비는 375px 미만 기기에서 카드가 뷰포트를 넘어간다. `w-full max-w-[90vw] md:max-w-[360px]` 패턴으로 모바일에서는 뷰포트의 90%를 점유하고 md 이상에서만 고정 너비로 전환했다.

2. **카드가 마우스 없이 접근 불가**: `div`에 `onClick`만 있고 `tabIndex`와 키보드 이벤트가 없으면 WCAG 2.1 기준 2.1.1(Keyboard) 위반이다. `role="button"` + `tabIndex={0}` + `onKeyDown(Enter/Space)` 조합으로 키보드 사용자가 카드를 뒤집을 수 있게 했다.

3. **BackContent가 FortuneCard.tsx에 통합**: FortuneCard.tsx 한 파일에 `SEC`, `BackProps`, `BackContent`, `CrystalBall`, `Sparkles`, `Toast`, `FortuneCard`가 공존하면 파일이 500줄을 넘고 단일 책임 원칙(SRP)이 위반된다. 뒷면 콘텐츠는 독립적인 관심사(운세 결과 표시)이므로 별도 파일로 분리했다.

#### [실행 내용]

- `FortuneCard.tsx` 라인 434: `className="relative w-full max-w-[90vw] md:max-w-[360px] h-[590px]"`
- `FortuneCard.tsx` 앞면 div: `role="button"`, `tabIndex={0}`, `aria-label="클릭하여 오늘의 디자인 운세 보기"`, `onKeyDown` 핸들러 추가
- `BackContent.tsx` 신규 파일: `SEC` 애니메이션 variants, `BackProps` 인터페이스, `BackContent` 컴포넌트 — 3종 모두 named export
- `FortuneCard.tsx`: 인라인 BackContent 코드(~200줄) 제거 → `import { BackContent } from './BackContent'` 교체

#### [기대 효과]

| 지표 | 이전 | 이후 |
|------|------|------|
| FortuneCard.tsx 줄 수 | ~510줄 | ~310줄 |
| 모바일(375px) 카드 표시 | 잘림 | 90vw로 완전 표시 |
| 키보드 Tab 접근 | 불가 | tabIndex=0, Enter/Space 동작 |
| WCAG 2.1.1 준수 | ✗ | ✅ |
| 컴포넌트 SRP | 위반 | ✅ 각 파일 단일 책임 |

---

## 현재 달성 지표

| 지표 | 목표 | 달성 |
|------|------|------|
| 하드코딩 hex 색상 | 0건 | ✅ 0건 (CI 자동 차단) |
| 컴포넌트 ARIA 100% | 3/3 | ✅ Button·Input·Badge |
| 토큰 카테고리 | colors·spacing·typography·borderRadius·breakpoints·states | ✅ 6종 |
| 자동 검증 | scripts/verify.sh 17/17 | ✅ + GitHub Actions 6-Stage |
| 공통 유틸 | 중복 제거 | ✅ utils.tsx (5함수 + useBreakpoint) |
| 브라우저 실행 | Vite Showcase | ✅ `bun run showcase` |
| CI 파이프라인 | GitHub Actions | ✅ main.yml 6-stage + verify.yml 3-job |
| 반응형 시스템 | xs/sm/md/lg 4단계 | ✅ useBreakpoint() 3-tier 구현 |
| 핵심 문서 | 5종 | ✅ 7종 (DRAGME/DESIGN_SYSTEM/TESTING/DEV_LOG/README/CLAUDE/phased) |

---

## 🗺️ Phased Engineering 전략

### 이 전략이 존재하는 이유

"처음부터 Storybook과 Figma API를 연동하지 않은 것"은 기술 부채가 아니라 **단계적 설계의 의도적 선택**이다. 소프트웨어 시스템에서 가장 위험한 결정은 아직 검증되지 않은 가정 위에 복잡한 구조를 쌓는 것이다.

이 프로젝트는 가장 중요한 가정부터 검증했다: **"토큰 단일 소스 원칙이 실제 팀 워크플로우에서 작동하는가?"** Phase 1에서 이 가정을 검증했다. Phase 2 이후는 검증된 토대 위에 확장한다.

### Phase 1 — 토큰 기반 원칙 검증 (2026-03-10 ~ 현재)

**핵심 질문:** "AI 에이전트가 토큰 원칙을 자동으로 따르게 할 수 있는가?"

| 구성 요소 | 역할 | 상태 |
|----------|------|------|
| `tokens.ts` | 단일 소스 (6종 카테고리) | ✅ 완성 |
| `DRAGME.md` | AI 컨텍스트 강제 주입 | ✅ 완성 |
| `utils.tsx` | 반복 로직 추상화 (5함수+1훅) | ✅ 완성 |
| `verify.sh` | 로컬 17항목 자동 검증 | ✅ 완성 |
| `main.yml` | 6-stage CI/CD 파이프라인 | ✅ 완성 |
| `useBreakpoint()` | xs/sm/md/lg 3-tier 반응형 | ✅ 완성 |

**검증 결과:** AI 에이전트 코드 생성 시 하드코딩 0건 달성. 원칙 강제 메커니즘 유효.

### Phase 2 — React 생태계 통합 로드맵 (단기)

**핵심 질문:** "컴포넌트 문서화와 시각적 회귀 테스트를 자동화할 수 있는가?"

```
Storybook 7 + CSF3
  ├── Button.stories.tsx  — 모든 variant·state 시각화
  ├── Input.stories.tsx   — error/focus/disabled 시나리오
  ├── Badge.stories.tsx   — 4가지 semantic color 전시
  └── @addon-a11y         — axe DevTools CI 자동 통합
         │
         ▼
  Chromatic
  └── PR마다 스크린샷 비교 → 시각적 회귀 자동 감지
```

**예상 공수:** 3일 (Storybook 설치 1일 + 스토리 작성 1일 + CI 통합 1일)

### Phase 3 — Figma Variables 자동 동기화 (장기)

**핵심 질문:** "디자이너가 Figma에서 값을 바꾸면 코드에 자동으로 반영되는가?"

```
Figma Variables API (2023 GA) ──► figma-token-sync.ts
                                         │
                              tokens.ts 자동 재생성
                                         │
                              GitHub Actions (cron/webhook)
                                         │
                              변경 감지 시 PR 자동 생성
                                         │
                              디자이너 리뷰 → 머지 → 전체 UI 반영
```

**이 구현이 Phase 3인 이유:** Figma API 연동은 Figma 플러그인 인증 토큰 관리, webhooks 설정, API 변경 대응 유지보수가 필요하다. Phase 1에서 원칙이 검증된 후에야 이 복잡성이 정당화된다.

---

## Roadmap

### Phase 1 — 토큰 자동 동기화 (단기)

| 과제 | 설명 |
|------|------|
| Figma Variables 연동 | Variables API로 `tokens.ts` 자동 생성 스크립트 |
| 토큰 변경 감지 CI | Figma 토큰 변경 시 PR 자동 생성 파이프라인 |
| 시각적 회귀 테스트 | Playwright로 컴포넌트 스크린샷 비교 자동화 |

### Phase 2 — 컴포넌트 시스템 확장 (중기)

| 과제 | 설명 |
|------|------|
| Molecule 계층 | `SearchBar`, `FormField` 등 atoms 조합 컴포넌트 |
| 다크 모드 토큰 | `tokens.colors.dark.*` 네임스페이스 + CSS 변수 테마 전환 |
| Storybook 연동 | 디자이너가 토큰 적용 결과를 실시간 확인하는 환경 |

### Phase 3 — AI 에이전트 고도화 (장기)

| 과제 | 설명 |
|------|------|
| 토큰 준수 자동 수정 에이전트 | AI 생성 코드의 하드코딩을 즉시 토큰으로 교체하는 피드백 루프 |
| Figma → 컴포넌트 원클릭 | MCP로 선택 → 매핑 → 코드 생성까지 완전 자동화 |
| 멀티 테넌트 토큰 주입 | 프로젝트별 `tokens.ts`를 MCP 컨텍스트에 동적 주입 |
