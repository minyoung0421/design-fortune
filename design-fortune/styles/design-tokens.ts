// ── 공통 구조 토큰 (루트 src/styles/tokens.ts 에서 임포트) ──────────────────
// breakpoints · states 는 두 프로젝트의 단일 출처(Single Source of Truth).
// design-fortune 앱은 이 파일 하나만 참조하면 됨.
import { tokens as _root } from '../../src/styles/tokens'

export const tokens = {
  // Shared structural tokens — defined canonically in src/styles/tokens.ts
  breakpoints: _root.breakpoints,
  states:      _root.states,

  colors: {
    primary: {
      50:  '#f5f0ff',
      100: '#ede0ff',
      200: '#d9bfff',
      300: '#c084fc',
      400: '#a855f7',
      500: '#9333ea',
      600: '#7c3aed',
      700: '#6d28d9',
      800: '#5b21b6',
      900: '#4c1d95',
      950: '#2e1065',
    },
    secondary: {
      50:  '#fffbeb',
      100: '#fef3c7',
      200: '#fde68a',
      300: '#fcd34d',
      400: '#fbbf24',
      500: '#f59e0b',
      600: '#d97706',
      700: '#b45309',
      800: '#92400e',
      900: '#78350f',
    },
    background: {
      base:    '#030014',
      surface: '#0a0028',
      elevated:'#120040',
      card:    'rgba(255,255,255,0.03)',
    },
    text: {
      primary: '#f8f8ff',
      secondary:'#b4b4d4',
      muted:   '#70709a',
      accent:  '#c084fc',
    },
    glass: {
      border:    'rgba(255,255,255,0.10)',
      borderHover:'rgba(255,255,255,0.20)',
      bg:        'rgba(255,255,255,0.04)',
      bgHover:   'rgba(255,255,255,0.08)',
      shine:     'rgba(255,255,255,0.06)',
    },
  },

  fontSizes: {
    '2xs': '0.625rem',   // 10px
    xs:    '0.75rem',    // 12px
    sm:    '0.875rem',   // 14px
    base:  '1rem',       // 16px
    lg:    '1.125rem',   // 18px
    xl:    '1.25rem',    // 20px
    '2xl': '1.5rem',     // 24px
    '3xl': '1.875rem',   // 30px
    '4xl': '2.25rem',    // 36px
    '5xl': '3rem',       // 48px
    '6xl': '3.75rem',    // 60px
    '7xl': '4.5rem',     // 72px
  },

  spacing: {
    '0.5':  '0.125rem',
    '1':    '0.25rem',
    '1.5':  '0.375rem',
    '2':    '0.5rem',
    '2.5':  '0.625rem',
    '3':    '0.75rem',
    '3.5':  '0.875rem',
    '4':    '1rem',
    '5':    '1.25rem',
    '6':    '1.5rem',
    '7':    '1.75rem',
    '8':    '2rem',
    '10':   '2.5rem',
    '12':   '3rem',
    '14':   '3.5rem',
    '16':   '4rem',
    '20':   '5rem',
    '24':   '6rem',
    '28':   '7rem',
    '32':   '8rem',
    '40':   '10rem',
    '48':   '12rem',
    '56':   '14rem',
    '64':   '16rem',
    '72':   '18rem',
    '80':   '20rem',
    '96':   '24rem',
  },

  radius: {
    none:    '0px',
    sm:      '0.375rem',
    DEFAULT: '0.5rem',
    md:      '0.75rem',
    lg:      '1rem',
    xl:      '1.5rem',
    '2xl':   '2rem',
    '3xl':   '3rem',
    full:    '9999px',
  },
} as const

export type DesignTokens = typeof tokens
