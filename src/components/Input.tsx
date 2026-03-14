/**
 * Input 컴포넌트
 *
 * 이 컴포넌트는 디자인 토큰을 사용하여 일관성을 유지함.
 * 색상, 간격, 폰트 사이즈, 보더 라디우스 모두 src/styles/tokens.ts에서 참조.
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
  const inputId = `input-${label.replace(/\s+/g, '-').toLowerCase()}`
  const errorId = `${inputId}-error`

  const borderColor = error
    ? tokens.colors.error
    : tokens.colors.primary

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
        style={{
          fontSize: tokens.typography.body,
          color: tokens.colors.primary,
          padding: `${tokens.spacing.sm} ${tokens.spacing.md}`,
          borderRadius: tokens.borderRadius.md,
          border: `1.5px solid ${borderColor}`,
          outline: 'none',
          opacity: disabled ? 0.5 : 1,
          cursor: disabled ? 'not-allowed' : 'text',
          backgroundColor: disabled ? '#f7f7f7' : '#ffffff',
          width: '100%',
          boxSizing: 'border-box',
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
