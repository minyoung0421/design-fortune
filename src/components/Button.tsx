/**
 * Button 컴포넌트
 *
 * 이 컴포넌트는 src/styles/tokens.ts에 정의된 디자인 토큰을 사용하여
 * 시각적 일관성을 유지함. 색상, 간격, 보더 라디우스 등 모든 수치는
 * 하드코딩 없이 tokens 객체를 통해서만 참조됨.
 *
 * states 토큰:
 *   - hover   → tokens.states.hover.opacity
 *   - focus   → tokens.states.focus.outline*
 *   - disabled → tokens.states.disabled.opacity + cursor
 */

import { useState } from 'react'
import { tokens } from '../styles/tokens'

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

  const opacity = disabled
    ? tokens.states.disabled.opacity
    : isHovered
    ? tokens.states.hover.opacity
    : 1

  const focusOutline = isFocused && !disabled
    ? {
        outlineWidth: tokens.states.focus.outlineWidth,
        outlineStyle: tokens.states.focus.outlineStyle,
        outlineColor: tokens.states.focus.outlineColor,
        outlineOffset: tokens.states.focus.outlineOffset,
      }
    : { outline: 'none' as const }

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
        cursor: disabled ? tokens.states.disabled.cursor : 'pointer',
        opacity,
        transition: 'opacity 0.15s',
        ...focusOutline,
      }}
    >
      {label}
    </button>
  )
}

export default Button
