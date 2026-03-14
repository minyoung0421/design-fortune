# 🎡 Design Fortune
**AI-Native Design System Assistant** — Figma 디자인 토큰을 Cursor AI 에이전트와 연동하여 일관된 UI 코드를 자동 생성하는 생산성 도구.

---

## 🧭 서비스 개요

| 항목 | 내용 |
|------|------|
| **목적** | Figma 디자인 시스템 → 코드 자동 생성 |
| **핵심 가치** | 토큰 일관성 유지 + AI 협업 효율화 |
| **타깃** | 디자인 시스템을 운영하는 프로덕트 팀 |

---

## ⚡ 핵심 기술 스택

```
TypeScript  ·  Next.js  ·  Bun  ·  MCP (Model Context Protocol)
```

---

## 🎨 Design Token System

모든 디자인 수치는 `src/styles/tokens.ts` 단 하나의 소스에서 관리됩니다.

```typescript
// src/styles/tokens.ts
export const tokens = {
  colors: {
    primary: '#718096',   // 브랜드 안정감
    accent:  '#3182CE',   // 사용자 상호작용
    error:   '#F56565',
    success: '#48BB78',
  },
  spacing:      { xs: '4px', sm: '8px', md: '16px', lg: '24px' },
  typography:   { heading: '24px', body: '16px' },
  borderRadius: { sm: '4px', md: '12px', lg: '24px' },
}
```

> **원칙:** 하드코딩 금지 — 모든 값은 토큰을 참조한다.

---

## 🤖 AI-Native Workflow

```
DRAGME.md ──► AI 에이전트 컨텍스트 주입
    │
    ▼
tokens.ts ──► 토큰 기반 코드 생성
    │
    ▼
components/ ──► Atomic Design 컴포넌트 출력
```

- `DRAGME.md`: AI 에이전트에게 개발 원칙을 주입하는 컨텍스트 파일
- 에이전트는 Figma 레이아웃 의도 파악 → 토큰 적용 → 컴포넌트 생성 순으로 작동

---

## 🗂️ 프로젝트 구조

```
src/
├── styles/
│   └── tokens.ts          # Design Token 단일 소스
├── components/            # Atomic UI 컴포넌트
│   ├── atoms/
│   ├── molecules/
│   └── organisms/
└── socket.ts              # Figma MCP WebSocket 서버

DRAGME.md                  # AI 에이전트 개발 원칙
DESIGN_SYSTEM.md           # 디자인 시스템 전체 문서
```

---

## 🚀 빠른 시작

```bash
# 1. 의존성 설치
bun install

# 2. 빌드
bun run build

# 3. MCP 설정 (Cursor 연동)
bun setup

# 4. WebSocket 서버 시작
bun socket
```

---

## 📐 컴포넌트 작성 규칙

```typescript
// ✅ 올바른 예 — 토큰 사용
import { tokens } from '@/styles/tokens'

const Button = () => (
  <button style={{
    backgroundColor: tokens.colors.accent,
    padding: `${tokens.spacing.sm} ${tokens.spacing.md}`,
    borderRadius: tokens.borderRadius.md,
  }}>
    확인
  </button>
)

// ❌ 금지 — 하드코딩
const Button = () => <button style={{ backgroundColor: '#3182CE' }}>확인</button>
```

---

## 📋 품질 검증

- **Unit Test:** 디자인 토큰 적용 여부 자동화 검증
- **Usability:** Figma-코드 일치도 95% 이상 목표
- **접근성:** 모든 인터랙티브 요소 ARIA 레이블 필수

---

## 📄 관련 문서

- [AI 에이전트 원칙 →](./DRAGME.md)
- [디자인 시스템 전체 문서 →](./DESIGN_SYSTEM.md)
