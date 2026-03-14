import type { Config } from 'tailwindcss'
import { tokens } from './styles/design-tokens'

/**
 * 색상 토큰 네이밍 시스템
 * ─────────────────────────────────────────────────────────
 *  layer-0 → bg-layer-0  (#030014  배경 최하단)
 *  layer-1 → bg-layer-1  (#0a0028  카드 서피스)
 *  layer-2 → bg-layer-2  (#120040  elevated)
 *
 *  ink         → text-ink        (#f8f8ff  본문)
 *  ink-soft    → text-ink-soft   (#b4b4d4  보조)
 *  ink-faint   → text-ink-faint  (#70709a  흐릿한)
 *  ink-bright  → text-ink-bright (#c084fc  보라 강조)
 *
 *  primary-*   → Tailwind 기본 그대로
 *  gold-*      → 골드/앰버 계열
 */

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        /* Brand */
        primary: tokens.colors.primary,
        gold:    tokens.colors.secondary,

        /* Background layers */
        layer: {
          0: tokens.colors.background.base,
          1: tokens.colors.background.surface,
          2: tokens.colors.background.elevated,
        },

        /* Text/ink system */
        ink: {
          DEFAULT: tokens.colors.text.primary,
          soft:    tokens.colors.text.secondary,
          faint:   tokens.colors.text.muted,
          bright:  tokens.colors.text.accent,
        },
      },

      fontFamily: {
        display: ['var(--font-cinzel)', 'serif'],
        serif:   ['var(--font-cormorant)', 'serif'],
        sans:    ['var(--font-inter)', 'sans-serif'],
      },

      fontSize:     tokens.fontSizes,
      spacing:      tokens.spacing,
      borderRadius: tokens.radius,

      backgroundImage: {
        'mystic-bg':
          'radial-gradient(ellipse 90% 55% at 50% -5%, #1e0b40 0%, #0a0028 45%, #030014 75%)',
        'orb-core':
          'radial-gradient(circle at 32% 27%, rgba(255,255,255,0.60) 0%, rgba(216,160,255,0.92) 12%, rgba(147,51,234,0.88) 38%, rgba(76,29,149,0.96) 72%, rgba(8,2,36,1) 100%)',
        'orb-glow':
          'radial-gradient(circle, rgba(168,85,247,0.55) 0%, rgba(107,33,168,0.28) 44%, transparent 68%)',
        'shimmer-sweep':
          'linear-gradient(105deg, transparent 35%, rgba(255,255,255,0.18) 50%, transparent 65%)',
      },

      boxShadow: {
        'orb':      '0 0 50px rgba(168,85,247,0.55), 0 0 100px rgba(107,33,168,0.35), 0 0 180px rgba(76,29,149,0.18)',
        'orb-xl':   '0 0 80px rgba(168,85,247,0.70), 0 0 160px rgba(107,33,168,0.50)',
        'glass':    '0 8px 32px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.08)',
        'glow-sm':  '0 0 16px rgba(168,85,247,0.45)',
        'glow-md':  '0 0 32px rgba(168,85,247,0.55)',
      },

      animation: {
        'float':       'float 6s ease-in-out infinite',
        'pulse-glow':  'pulseGlow 3.5s ease-in-out infinite',
        'spin-slow':   'spin 22s linear infinite',
        'twinkle':     'twinkle 3s ease-in-out infinite',
        'twinkle-alt': 'twinkle 4.5s ease-in-out infinite',
        'drift':       'drift 18s ease-in-out infinite',
        'shimmer':     'shimmerSweep 3.5s linear infinite',
      },
      keyframes: {
        float: {
          '0%,100%': { transform: 'translateY(0px)' },
          '50%':     { transform: 'translateY(-20px)' },
        },
        pulseGlow: {
          '0%,100%': { boxShadow: '0 0 45px rgba(168,85,247,0.45), 0 0 90px rgba(107,33,168,0.28)' },
          '50%':     { boxShadow: '0 0 75px rgba(168,85,247,0.72), 0 0 150px rgba(107,33,168,0.48)' },
        },
        twinkle: {
          '0%,100%': { opacity: '0.15', transform: 'scale(0.7)' },
          '50%':     { opacity: '1',    transform: 'scale(1.4)' },
        },
        drift: {
          '0%,100%': { transform: 'translate(0,0) rotate(0deg)' },
          '33%':     { transform: 'translate(20px,-15px) rotate(120deg)' },
          '66%':     { transform: 'translate(-15px,10px) rotate(240deg)' },
        },
        shimmerSweep: {
          '0%':   { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition:  '200% center' },
        },
      },
    },
  },
  plugins: [],
}

export default config
