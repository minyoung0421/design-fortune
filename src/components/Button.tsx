/**
 * Button 컴포넌트
 *
 * 이 컴포넌트는 src/styles/tokens.ts에 정의된 디자인 토큰을 사용하여
 * 시각적 일관성을 유지함. 인터랙션 상태(hover/focus/disabled) 로직은
 * src/styles/utils.tsx 공통 유틸 함수를 통해 처리됨.
 *
 * states 토큰:
 *   - hover    → getInteractiveOpacity
 *   - focus    → getFocusOutline
 *   - disabled → getInteractiveOpacity + getDisabledCursor
 */

import { useState } from 'react'
import { tokens } from '../styles/tokens'
import { getFocusOutline, getInteractiveOpacity, getDisabledCursor } from '../styles/utils'

type ButtonVariant = 'primary' | 'accent'

interface ButtonProps {
  label: string
  variant?: ButtonVariant
  onClick?: () => void
  disabled?: boolean
  /** 접근성: 버튼 의미가 label만으로 불명확할 때 사용 */
  ariaLabel?: string
}

export const Button = ({
  label,
  variant = 'accent',
  onClick,
  disabled = false,
  ariaLabel,
}: ButtonProps) => {
  const [isHovered, setIsHovered] = useState(false)
  const [isFocused, setIsFocused] = useState(false)

  const backgroundColor = disabled
    ? tokens.colors.primary
    : variant === 'accent'
    ? tokens.colors.accent
    : tokens.colors.primary

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel ?? label}
      aria-disabled={disabled}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      style={{
        backgroundColor,
        color: tokens.colors.white,
        fontSize: tokens.typography.body,
        padding: `${tokens.spacing.sm} ${tokens.spacing.md}`,
        borderRadius: tokens.borderRadius.md,
        border: 'none',
        cursor: getDisabledCursor(disabled, 'pointer'),
        opacity: getInteractiveOpacity(disabled, isHovered),
        transition: 'opacity 0.15s',
        ...getFocusOutline(isFocused, disabled),
      }}
    >
      {label}
    </button>
  )
}

export default Button
