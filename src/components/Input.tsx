/**
 * Input 컴포넌트
 *
 * 이 컴포넌트는 디자인 토큰을 사용하여 일관성을 유지함.
 * 색상, 간격, 폰트 사이즈, 보더 라디우스 모두 src/styles/tokens.ts에서 참조.
 *
 * states 토큰:
 *   - focus   → 테두리 색상 변경 + tokens.states.focus.outline*
 *   - disabled → tokens.states.disabled.opacity + cursor
 *
 * @example
 * // 기본 텍스트 입력
 * <Input
 *   label="이메일"
 *   placeholder="example@email.com"
 *   onChange={(value) => console.log(value)}
 * />
 *
 * // 에러 상태
 * <Input
 *   label="비밀번호"
 *   type="password"
 *   error="8자 이상 입력해주세요"
 *   onChange={(value) => console.log(value)}
 * />
 *
 * // 비활성 상태
 * <Input
 *   label="읽기 전용"
 *   value="수정 불가 값"
 *   disabled
 *   onChange={() => {}}
 * />
 */

import { useState } from 'react'
import { tokens } from '../styles/tokens'

interface InputProps {
  label: string
  value?: string
  placeholder?: string
  type?: 'text' | 'password' | 'email' | 'number'
  error?: string
  disabled?: boolean
  onChange: (value: string) => void
  /** 접근성: label 외 추가 설명이 필요한 경우 */
  ariaDescribedBy?: string
}

export const Input = ({
  label,
  value,
  placeholder,
  type = 'text',
  error,
  disabled = false,
  onChange,
  ariaDescribedBy,
}: InputProps) => {
  const [isFocused, setIsFocused] = useState(false)

  const inputId = `input-${label.replace(/\s+/g, '-').toLowerCase()}`
  const errorId = `${inputId}-error`

  // 에러 > 포커스 > 기본 순으로 테두리 색상 우선순위 결정
  const borderColor = error
    ? tokens.colors.error
    : isFocused
    ? tokens.states.focus.outlineColor
    : tokens.colors.primary

  const focusOutline = isFocused && !disabled
    ? {
        outlineWidth: tokens.states.focus.outlineWidth,
        outlineStyle: tokens.states.focus.outlineStyle,
        outlineColor: tokens.states.focus.outlineColor,
        outlineOffset: tokens.states.focus.outlineOffset,
      }
    : { outline: 'none' as const }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: tokens.spacing.xs }}>
      <label
        htmlFor={inputId}
        style={{
          fontSize: tokens.typography.body,
          color: tokens.colors.primary,
          fontWeight: 500,
        }}
      >
        {label}
      </label>

      <input
        id={inputId}
        type={type}
        value={value}
        placeholder={placeholder}
        disabled={disabled}
        aria-disabled={disabled}
        aria-invalid={!!error}
        aria-describedby={error ? errorId : ariaDescribedBy}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        style={{
          fontSize: tokens.typography.body,
          color: tokens.colors.primary,
          padding: `${tokens.spacing.sm} ${tokens.spacing.md}`,
          borderRadius: tokens.borderRadius.md,
          border: `1.5px solid ${borderColor}`,
          opacity: disabled ? tokens.states.disabled.opacity : 1,
          cursor: disabled ? tokens.states.disabled.cursor : 'text',
          backgroundColor: disabled ? tokens.colors.surface : tokens.colors.white,
          width: '100%',
          boxSizing: 'border-box',
          transition: 'border-color 0.15s',
          ...focusOutline,
        }}
      />

      {error && (
        <span
          id={errorId}
          role="alert"
          style={{
            fontSize: tokens.typography.body,
            color: tokens.colors.error,
          }}
        >
          {error}
        </span>
      )}
    </div>
  )
}

export default Input
