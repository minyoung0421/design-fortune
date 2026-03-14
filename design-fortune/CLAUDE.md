# CLAUDE.md — AI 협업 규칙 & 디자인 시스템 원칙

이 파일은 Claude Code가 이 프로젝트에서 코드를 작성할 때 반드시 따라야 할 규칙을 정의합니다.

---

## 디자인 토큰 규칙

### 원칙: 토큰 우선 (Token-First)

**모든 디자인 값은 `styles/design-tokens.ts` 에서 출발한다.**

```
금지 ✗   bg-[#9333ea]         (임의 hex 사용)
금지 ✗   text-purple-500      (Tailwind 기본 컬러 직접 사용)
허용 ✓   bg-primary-500       (토큰에서 정의된 값)
허용 ✓   text-text-accent     (토큰에서 정의된 텍스트 컬러)
```

### 컬러 사용 가이드

| 용도 | 토큰 클래스 |
|------|------------|
| 주요 액션, CTA | `bg-primary-500`, `bg-primary-600` |
| 특별한 강조 | `text-secondary-400` (골드) |
| 페이지 배경 | CSS var `--bg-base` |
| 카드 배경 | `.glass-card` 유틸리티 |
| 본문 텍스트 | `text-text-primary` |
| 보조 텍스트 | `text-text-secondary` |
| 비활성 텍스트 | `text-text-muted` |

### 간격(Spacing) 규칙
- `tokens.spacing` 에 정의된 값만 사용
- 임의의 `p-[13px]` 형태 금지
- 기본 단위: 4px grid (0.25rem)

### 타이포그래피 규칙
- 폰트 크기: `tokens.fontSizes` 참조 (`text-2xl`, `text-5xl` 등)
- 디스플레이 제목: `font-display` 클래스 (Cinzel Decorative)
- 세리프 강조: `font-serif-ele` 클래스 (Cormorant Garamond)
- 본문: 기본 Inter

### 반지름(Radius) 규칙
- 소형 요소 (버튼, 배지): `rounded-md` (0.75rem)
- 카드: `rounded-2xl` (2rem)
- 원형 요소: `rounded-full`

---

## Glassmorphism 구현 규칙

반드시 아래 유틸리티 클래스를 사용한다:

```html
<!-- 기본 유리 효과 -->
<div class="glass">...</div>

<!-- 카드 수준 유리 효과 (더 강한 보라 틴트) -->
<div class="glass-card">...</div>
```

직접 `backdrop-filter` 를 인라인으로 쓰지 않는다.

---

## 애니메이션 규칙

### Framer Motion 사용 원칙
1. 모든 인터랙티브 애니메이션은 Framer Motion 사용 (CSS animation 혼용 최소화)
2. `AnimatePresence` 는 요소의 mount/unmount 전환에만 사용
3. 카드 플립은 `rotateY` + `transformStyle: 'preserve-3d'` 패턴 사용
4. easing 기본값: `[0.6, 0.05, 0.01, 0.9]` (spring-like cubic-bezier)

### Tailwind animation 사용 원칙
- 루프 애니메이션 (float, pulse-glow, twinkle 등): `tailwind.config.ts` 에 정의된 커스텀 애니메이션 사용
- 예: `animate-float`, `animate-pulse-glow`, `animate-twinkle`

---

## AI 활용 원칙

### 이 프로젝트에서 AI(Claude)의 역할

1. **디자인 의사결정 보조**: 컬러 팔레트, 폰트 조합, 레이아웃 제안
2. **코드 생성**: 컴포넌트, 유틸리티 함수, 타입 정의
3. **데이터 큐레이션**: 운세 콘텐츠 (팔레트, 폰트, 격언) 큐레이션
4. **일관성 검사**: 토큰 미준수 코드 탐지 및 수정

### AI가 하지 말아야 할 것
- 디자인 토큰을 무시하고 임의 값 사용
- 불필요한 새 파일 생성 (기존 파일 수정 우선)
- 요청하지 않은 기능 추가 (Over-engineering 금지)
- `tailwind.config.ts` 를 우회한 인라인 스타일 남용

### 컴포넌트 작성 순서 (AI 준수 사항)
1. 타입/인터페이스 정의
2. 데이터/로직 분리 (`lib/` 폴더)
3. 디자인 토큰 확인
4. 컴포넌트 마크업 작성
5. 애니메이션 추가

---

## 프로젝트 컨텍스트

- **목적**: 해커톤 — 디자이너의 힐링과 영감
- **평가 포인트**: 디자인 시스템(30점) + 문서화(20점) + 구현(50점)
- **핵심 철학**: "토큰에서 시작해서 픽셀로 끝난다"
