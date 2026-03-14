# Design Fortune — 오늘의 디자인 운세

> 디자이너의 힐링과 영감을 위한 AI-Native 웹 앱

---

## 시스템 설계 철학

**"토큰에서 시작해서 픽셀로 끝난다."**

모든 디자인 결정은 `styles/design-tokens.ts` 한 곳에서 출발한다. 컬러, 간격, 반지름, 폰트 크기 — 어떤 값도 임의로 하드코딩하지 않는다. 토큰이 Tailwind config로 주입되고, Tailwind 클래스가 컴포넌트를 만든다.

```
design-tokens.ts  →  tailwind.config.ts  →  components
      (정의)              (주입)               (사용)
```

---

## 문서

| 문서 | 내용 |
|------|------|
| [docs/PRD.md](docs/PRD.md) | 서비스 기획서 — 목표, 페르소나, 기능 명세, AI-Native 프로세스 전체 |
| [CLAUDE.md](CLAUDE.md) | AI 협업 규칙 — 디자인 토큰 규칙, 컴포넌트 작성 순서 |

---

## 프로젝트 개요

디자이너가 매일 새로운 영감을 얻을 수 있도록, **오늘의 행운 컬러 팔레트 · 추천 폰트 · 디자이너 격언**을 수정구슬 카드로 전달하는 운세 앱입니다.

---

## AI-Native 설계 프로세스

이 프로젝트는 **Claude Code (AI 페어 프로그래밍)** 를 활용하여 다음 순서로 설계되었습니다:

### 1단계: 디자인 시스템 정의 (AI와 협업)
- Claude에게 "몽환적 다크 Glassmorphism" 컨셉을 자연어로 설명
- `styles/design-tokens.ts` 를 **단일 진실 공급원(Single Source of Truth)** 으로 설정
- 토큰에서 Tailwind config까지 자동 연결되도록 아키텍처 설계

### 2단계: 데이터 레이어 설계 (AI 큐레이션)
- Claude가 7개 컬러 팔레트, 6개 폰트 조합, 12개 디자이너 격언을 큐레이션
- 날짜 기반 시드(seed) 알고리즘으로 매일 동일한 운세 제공 (일관성 확보)

### 3단계: 컴포넌트 구현 (AI 주도)
- Framer Motion `AnimatePresence` + 3D 카드 플립 애니메이션
- 디자인 토큰에서 정의된 값만 사용하여 디자인 일관성 유지

### 4단계: 품질 검증
- 토큰-컴포넌트 간 연결 누락 없는지 AI가 검토
- 접근성(명도비) 자동 체크

---

## 디자인 시스템 구조

```
styles/
└── design-tokens.ts       # 모든 디자인 값의 원천
     ├── colors             # Primary(보라), Secondary(금), Background, Text, Glass
     ├── fontSizes          # 2xs(10px) ~ 7xl(72px)
     ├── spacing            # 0.5 ~ 96 (rem 기반)
     └── radius             # sm ~ full

tailwind.config.ts         # design-tokens를 Tailwind 테마에 주입
app/globals.css            # CSS 변수 + 커스텀 유틸리티 클래스
```

### 컬러 팔레트

| 역할 | 색상 | 설명 |
|------|------|------|
| Primary | `#9333ea` (500) | 메인 보라 - 신비로움 |
| Secondary | `#f59e0b` (500) | 골드 액센트 - 특별함 |
| Background Base | `#030014` | 깊은 우주 검정 |
| Background Surface | `#0a0028` | 카드 배경 |
| Text Primary | `#f8f8ff` | 거의 흰색 |
| Text Accent | `#c084fc` | 보라빛 강조 |

### Glassmorphism 스타일 원칙
- **배경**: `backdrop-filter: blur(24px)` + 반투명 배경
- **보더**: `rgba(168,85,247,0.2)` 반투명 보라 테두리
- **그림자**: 다층 box-shadow로 깊이감 표현
- **빛 반사**: `inset 0 1px 0 rgba(255,255,255,0.08)` 상단 하이라이트

---

## 기술 스택

| 기술 | 버전 | 용도 |
|------|------|------|
| Next.js | 14.x (App Router) | 프레임워크 |
| TypeScript | 5.x | 타입 안전성 |
| Tailwind CSS | 3.4 | 스타일링 |
| Framer Motion | 11.x | 애니메이션 |

---

## 핵심 기능

### 운세 카드 플립
- 수정구슬 모양의 카드를 클릭하면 3D로 뒤집힘
- `rotateY` + `transformStyle: preserve-3d` 로 구현
- 앞면: 수정구슬 (클릭 유도)
- 뒷면: 오늘의 운세 (팔레트 + 폰트 + 격언)

### 일별 운세 알고리즘
```typescript
const seed = year * 10000 + month * 100 + day
const pick = <T>(arr: T[], offset: number) => arr[(seed + offset) % arr.length]
```
같은 날은 같은 운세를 받아 신뢰감 형성.

---

## 시작하기

```bash
cd design-fortune
npm install
npm run dev
# → http://localhost:3000
```

---

## 파일 구조

```
design-fortune/
├── app/
│   ├── globals.css          # Tailwind + 커스텀 스타일
│   ├── layout.tsx           # 루트 레이아웃
│   └── page.tsx             # 메인 페이지
├── components/
│   └── FortuneCard.tsx      # 핵심 인터랙티브 카드
├── lib/
│   └── fortune-data.ts      # 운세 데이터 & 생성 로직
├── styles/
│   └── design-tokens.ts     # ★ 디자인 시스템 원천
├── tailwind.config.ts       # Tailwind ← 토큰 연결
└── CLAUDE.md                # AI 협업 규칙
```
