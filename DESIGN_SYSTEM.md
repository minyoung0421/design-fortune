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
