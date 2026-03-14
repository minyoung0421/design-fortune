/**
 * Input 컴포넌트
 *
 * 이 컴포넌트는 디자인 토큰을 사용하여 일관성을 유지함.
 * 인터랙션 상태 및 에러 표시 로직은 src/styles/utils.tsx 공통 유틸을 통해 처리됨.
 *
 * states 토큰:
 *   - focus    → getBorderColor + getFocusOutline
 *   - disabled → getInteractiveOpacity + getDisabledCursor
 * 에러 표시:
 *   - ErrorHandler 공통 컴포넌트 사용 (role="alert" + aria-live="polite")
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
import {
  getFocusOutline,
  getInteractiveOpacity,
  getDisabledCursor,
  getBorderColor,
  ErrorHandler,
} from '../styles/utils'

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
          border: `1.5px solid ${getBorderColor(error, isFocused)}`,
          opacity: getInteractiveOpacity(disabled),
          cursor: getDisabledCursor(disabled, 'text'),
          backgroundColor: disabled ? tokens.colors.surface : tokens.colors.white,
          width: '100%',
          boxSizing: 'border-box',
          transition: 'border-color 0.15s',
          ...getFocusOutline(isFocused, disabled),
        }}
      />

      {error && <ErrorHandler id={errorId} message={error} />}
    </div>
  )
}

export default Input
