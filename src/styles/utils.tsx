/**
 * src/styles/utils.tsx
 *
 * 컴포넌트 간 반복되는 스타일 로직을 공통 유틸 함수로 추출.
 * 모든 값은 tokens.ts를 참조하며 하드코딩 없음.
 *
 * 제공 유틸:
 *   getFocusOutline     — 포커스 outline CSSProperties 반환
 *   getInteractiveOpacity — hover/disabled opacity 반환
 *   getDisabledCursor   — disabled/기본 cursor 반환
 *   getBorderColor      — error > focus > default 우선순위 border 색 반환
 *   ErrorHandler        — 공통 에러 메시지 컴포넌트
 */

import { useState, useEffect, CSSProperties } from 'react'
import { tokens } from './tokens'

// ── 포커스 outline ────────────────────────────────────────────────────────────
/**
 * 포커스 상태에 따라 tokens.states.focus outline 속성 또는 `outline: none` 반환.
 * disabled일 때는 포커스 상태여도 outline을 표시하지 않음.
 */
export function getFocusOutline(isFocused: boolean, disabled = false): CSSProperties {
  if (isFocused && !disabled) {
    return {
      outlineWidth: tokens.states.focus.outlineWidth,
      outlineStyle: tokens.states.focus.outlineStyle,
      outlineColor: tokens.states.focus.outlineColor,
      outlineOffset: tokens.states.focus.outlineOffset,
    }
  }
  return { outline: 'none' }
}

// ── 인터랙티브 opacity ────────────────────────────────────────────────────────
/**
 * disabled > hover > 기본(1) 순서로 opacity 결정.
 * isHovered 미전달 시 hover 효과 없이 disabled만 처리.
 */
export function getInteractiveOpacity(disabled: boolean, isHovered = false): number {
  if (disabled) return tokens.states.disabled.opacity
  if (isHovered) return tokens.states.hover.opacity
  return 1
}

// ── disabled cursor ───────────────────────────────────────────────────────────
/**
 * disabled 여부에 따라 tokens.states.disabled.cursor 또는 전달된 기본값 반환.
 */
export function getDisabledCursor(
  disabled: boolean,
  defaultCursor: CSSProperties['cursor'] = 'default',
): CSSProperties['cursor'] {
  return disabled ? tokens.states.disabled.cursor : defaultCursor
}

// ── border 색상 우선순위 ──────────────────────────────────────────────────────
/**
 * 에러 > 포커스 > 기본(primary) 순서로 border/outline 색 결정.
 * 에러 상태에서 포커스해도 에러 색이 유지됨.
 */
export function getBorderColor(error: string | undefined, isFocused: boolean): string {
  if (error) return tokens.colors.error
  if (isFocused) return tokens.states.focus.outlineColor
  return tokens.colors.primary
}

// ── ErrorHandler ──────────────────────────────────────────────────────────────
/**
 * 폼 필드의 공통 에러 메시지 컴포넌트.
 * role="alert" + aria-live="polite"로 스크린 리더에서 즉시 읽힘.
 * id를 받아 부모 input의 aria-describedby와 연결됨.
 *
 * @example
 * <ErrorHandler id="input-email-error" message="올바른 이메일 형식이 아닙니다" />
 */
interface ErrorHandlerProps {
  id: string
  message: string
}

export function ErrorHandler({ id, message }: ErrorHandlerProps) {
  return (
    <span
      id={id}
      role="alert"
      aria-live="polite"
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: tokens.spacing.xs,
        fontSize: tokens.typography.body,
        color: tokens.colors.error,
      }}
    >
      {message}
    </span>
  )
}

// ── 반응형 브레이크포인트 훅 ──────────────────────────────────────────────────
/**
 * tokens.breakpoints(sm/md/lg) 3단계 기준으로 현재 뷰포트 상태를 판별.
 * SSR 환경에서는 기본값(xs) 반환 후 클라이언트에서 동기화.
 *
 * 브레이크포인트 범위:
 *   xs (mobile)  : < 480px
 *   sm (mobile+) : 480–767px
 *   md (tablet)  : 768–1199px
 *   lg (desktop) : ≥ 1200px
 *
 * @example
 * const { isMobile, isTablet, isDesktop } = useBreakpoint()
 * width: isMobile ? '100%' : isTablet ? '50%' : '33%'
 */
export function useBreakpoint() {
  const getMatches = () =>
    typeof window === 'undefined'
      ? { sm: false, md: false, lg: false }
      : {
          sm: window.matchMedia(`(min-width: ${tokens.breakpoints.sm}px)`).matches,
          md: window.matchMedia(`(min-width: ${tokens.breakpoints.md}px)`).matches,
          lg: window.matchMedia(`(min-width: ${tokens.breakpoints.lg}px)`).matches,
        }

  const [matches, setMatches] = useState(getMatches)

  useEffect(() => {
    const queries = [
      { key: 'sm' as const, mq: window.matchMedia(`(min-width: ${tokens.breakpoints.sm}px)`) },
      { key: 'md' as const, mq: window.matchMedia(`(min-width: ${tokens.breakpoints.md}px)`) },
      { key: 'lg' as const, mq: window.matchMedia(`(min-width: ${tokens.breakpoints.lg}px)`) },
    ]
    const cleanups = queries.map(({ key, mq }) => {
      const handler = (e: MediaQueryListEvent) =>
        setMatches(prev => ({ ...prev, [key]: e.matches }))
      mq.addEventListener('change', handler)
      return () => mq.removeEventListener('change', handler)
    })
    return () => cleanups.forEach(fn => fn())
  }, [])

  return {
    isMobile:   !matches.md,                   // < 768px  (하위 호환 유지)
    isTablet:    matches.md && !matches.lg,    // 768–1199px
    isDesktop:   matches.lg,                   // ≥ 1200px
    breakpoint:  matches.lg ? 'lg' : matches.md ? 'md' : matches.sm ? 'sm' : 'xs',
  } as const
}
