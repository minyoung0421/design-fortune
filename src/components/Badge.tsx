/**
 * Badge 컴포넌트
 *
 * 이 컴포넌트는 디자인 토큰을 사용하여 일관성을 유지함.
 * 색상, 간격, 폰트 사이즈, 보더 라디우스 모두 src/styles/tokens.ts에서 참조.
 *
 * @example
 * // 기본 상태 배지
 * <Badge label="신규" variant="accent" />
 *
 * // 성공 상태
 * <Badge label="완료" variant="success" />
 *
 * // 에러 상태
 * <Badge label="오류" variant="error" />
 *
 * // 기본(primary) 배지
 * <Badge label="비활성" variant="primary" />
 */

import { tokens } from '../styles/tokens'
import { useBreakpoint } from '../styles/utils'

type BadgeVariant = 'primary' | 'accent' | 'success' | 'error'

interface BadgeProps {
  label: string
  variant?: BadgeVariant
  /** 접근성: 배지의 의미를 스크린 리더에 전달 */
  ariaLabel?: string
}

const VARIANT_STYLES: Record<BadgeVariant, { background: string; color: string }> = {
  primary: {
    background: `${tokens.colors.primary}1a`, // 10% opacity
    color: tokens.colors.primary,
  },
  accent: {
    background: `${tokens.colors.accent}1a`,
    color: tokens.colors.accent,
  },
  success: {
    background: `${tokens.colors.success}1a`,
    color: tokens.colors.success,
  },
  error: {
    background: `${tokens.colors.error}1a`,
    color: tokens.colors.error,
  },
}

export const Badge = ({
  label,
  variant = 'primary',
  ariaLabel,
}: BadgeProps) => {
  const { background, color } = VARIANT_STYLES[variant]
  const { isMobile } = useBreakpoint()

  return (
    <span
      role="status"
      aria-label={ariaLabel ?? label}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        fontSize: tokens.typography.body,
        fontWeight: 500,
        color,
        backgroundColor: background,
        // 반응형: 모바일(<768px)에서 패딩 축소
        padding: isMobile ? `2px ${tokens.spacing.xs}` : `${tokens.spacing.xs} ${tokens.spacing.sm}`,
        borderRadius: tokens.borderRadius.sm,
        lineHeight: 1,
      }}
    >
      {label}
    </span>
  )
}

export default Badge
