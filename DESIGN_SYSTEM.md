# Design System Documentation

## 개요

Design Fortune의 디자인 시스템은 **토큰 우선(Token-First)** 원칙을 기반으로 합니다.
모든 디자인 결정은 `src/styles/tokens.ts`에서 시작하며, AI 에이전트와 개발자 모두 이 문서를 기준으로 작업합니다.

---

## 컬러 시스템

| 토큰 | 값 | 용도 |
|------|----|------|
| `tokens.colors.primary` | `#718096` | 기본 텍스트, 브랜드 안정감 |
| `tokens.colors.accent` | `#3182CE` | CTA 버튼, 링크, 인터랙션 |
| `tokens.colors.error` | `#F56565` | 에러 상태, 경고 메시지 |
| `tokens.colors.success` | `#48BB78` | 성공 상태, 완료 피드백 |

---

## 간격 시스템 (8px Grid)

| 토큰 | 값 | 사용 예 |
|------|----|---------|
| `tokens.spacing.xs` | `4px` | 아이콘 간격, 미세 조정 |
| `tokens.spacing.sm` | `8px` | 기본 내부 여백 (padding) |
| `tokens.spacing.md` | `16px` | 컴포넌트 간격 |
| `tokens.spacing.lg` | `24px` | 섹션 간격 |

---

## 타이포그래피

| 토큰 | 값 | 사용 예 |
|------|----|---------|
| `tokens.typography.heading` | `24px` | 페이지 제목, 카드 헤딩 |
| `tokens.typography.body` | `16px` | 본문 텍스트, 레이블 |

---

## 보더 라디우스

| 토큰 | 값 | 사용 예 |
|------|----|---------|
| `tokens.borderRadius.sm` | `4px` | 배지, 태그 |
| `tokens.borderRadius.md` | `12px` | 버튼, 인풋 |
| `tokens.borderRadius.lg` | `24px` | 카드, 모달 |

---

## 컴포넌트 계층 (Atomic Design)

```
atoms/          # 최소 단위: Button, Input, Badge, Icon
molecules/      # 조합 단위: SearchBar, FormField, CardHeader
organisms/      # 완성 단위: TokenCard, FortunePanel, Navigation
```

### 작성 규칙

1. `atoms`는 외부 의존성 없이 독립적으로 작동해야 한다
2. `molecules`는 `atoms`만 조합한다 (`organisms` 참조 금지)
3. 모든 컴포넌트는 `tokens.ts` 값만 참조한다 (하드코딩 금지)
4. 인터랙티브 요소는 반드시 `aria-label` 또는 `aria-describedby` 포함

---

## 브레이크포인트 (반응형)

| 이름 | 기준 |
|------|------|
| `mobile` | `< 768px` |
| `tablet` | `768px ~ 1024px` |
| `desktop` | `> 1024px` |

---

## AI 에이전트 사용 가이드

AI 에이전트(`DRAGME.md` 원칙 적용 시)는 다음 순서로 작업한다:

1. Figma 레이아웃 의도 파악
2. 필요한 토큰 식별 (`tokens.ts` 참조)
3. Atomic 레벨 결정 (atom / molecule / organism)
4. 컴포넌트 마크업 작성
5. 접근성 속성 추가
6. 하드코딩 값 검토 및 토큰으로 교체

---

## 시각적 일관성 가이드

### 원칙: 단일 소스 원칙 (Single Source of Truth)

모든 시각적 결정은 `src/styles/tokens.ts`에서 출발합니다. 컴포넌트, AI 에이전트, 개발자 모두 이 파일 하나를 기준으로 작업하여 Figma 디자인과 구현 코드 사이의 시각적 일관성을 보장합니다.

### 색상 일관성

```
Figma 컬러 스타일 ──► tokens.colors.* ──► 컴포넌트 style prop
```

- **Primary (`#718096`)**: 정보성 텍스트, 보조 버튼, 비활성 상태에만 사용
- **Accent (`#3182CE`)**: 유저 액션을 유도하는 단 하나의 요소에만 사용 (CTA 원칙)
- **Error / Success**: 시스템 피드백 전용 — 일반 UI 장식에 사용 금지

### 간격 일관성

모든 여백은 **8px 그리드** 기반으로 작동합니다.

```
xs(4px) → 인접 요소 간 미세 간격
sm(8px) → 컴포넌트 내부 padding 기준
md(16px) → 컴포넌트 간 기본 margin
lg(24px) → 섹션 간 구분 여백
```

임의의 `13px`, `20px` 같은 오프그리드 값은 허용하지 않습니다.

### 타이포그래피 일관성

| 계층 | 토큰 | 사용 기준 |
|------|------|-----------|
| Heading | `tokens.typography.heading` (`24px`) | 페이지 당 최대 1개의 H1, 섹션별 H2 |
| Body | `tokens.typography.body` (`16px`) | 모든 본문, 레이블, 버튼 텍스트 |

폰트 크기를 임의로 혼합하지 않습니다. 두 단계(heading / body)만 사용합니다.

---

## 디자인 토큰 사용 원칙

### 1. 토큰 우선 (Token-First)

새 컴포넌트를 작성하기 전에 반드시 `tokens.ts`에서 필요한 값을 찾습니다.
찾는 값이 없으면 토큰을 **추가**하고 컴포넌트를 작성합니다. 인라인 하드코딩은 허용하지 않습니다.

```typescript
// ✅ 올바름
backgroundColor: tokens.colors.accent

// ❌ 금지
backgroundColor: '#3182CE'
backgroundColor: 'blue'
```

### 2. 토큰 확장 절차

기존 토큰으로 표현이 불가한 경우에만 아래 절차를 거쳐 토큰을 확장합니다.

```
1. DESIGN_SYSTEM.md에 새 토큰 필요성 문서화
2. tokens.ts에 토큰 추가 (네이밍 컨벤션 준수)
3. PR 설명에 "토큰 추가" 명시 후 리뷰 요청
```

### 3. 네이밍 컨벤션

```
colors.{의미}        → colors.primary, colors.accent, colors.error
spacing.{규모}       → spacing.xs, spacing.sm, spacing.md, spacing.lg
typography.{계층}    → typography.heading, typography.body
borderRadius.{규모}  → borderRadius.sm, borderRadius.md, borderRadius.lg
```

규모 기반(`xs/sm/md/lg`) 또는 의미 기반(`primary/accent/error`) 중 해당 카테고리에 맞는 방식을 사용합니다.

### 4. 토큰 사용 금지 케이스

| 금지 항목 | 이유 |
|-----------|------|
| `style={{ color: '#718096' }}` | 토큰 변경 시 누락 가능 |
| `className="text-blue-500"` | Tailwind 임의 클래스는 토큰과 분리됨 |
| CSS 파일 내 색상 직접 정의 | 단일 소스 원칙 위반 |
