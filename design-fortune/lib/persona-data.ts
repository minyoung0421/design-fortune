import type { PersonaTheme, PersonaKey, TherapyState } from '@/types/persona'

/* ────────────────────────────────────────────────────────
   4 Persona Definitions — 컬러테라피 원리 기반
   calm    (에너지 1-2): 차갑고 어두운 톤 → 스트레스 완화
   balance (에너지 3):   중립 베이스 → 균형 유지
   energize(에너지 4-5): 밝고 채도 높은 톤 → 활력 부여
──────────────────────────────────────────────────────── */

export const PERSONAS: Record<PersonaKey, PersonaTheme> = {
  pm: {
    key: 'pm',
    label: 'PM',
    role: '기획자',
    emoji: '📊',
    description: '제품의 방향을 결정하는 나침반',
    tagline: '로드맵이 또 바뀌었다',
    color: '#6366F1',
    therapy: {
      calm: {
        bg: '#020818',
        surface: '#061533',
        glow: 'rgba(59,130,246,0.55)',
        accent: '#3B82F6',
        border: 'rgba(59,130,246,0.25)',
        textBright: '#93C5FD',
      },
      balance: {
        bg: '#0A0F2E',
        surface: '#131A4F',
        glow: 'rgba(99,102,241,0.55)',
        accent: '#6366F1',
        border: 'rgba(99,102,241,0.28)',
        textBright: '#A5B4FC',
      },
      energize: {
        bg: '#150B3E',
        surface: '#1E1558',
        glow: 'rgba(129,140,248,0.70)',
        accent: '#818CF8',
        border: 'rgba(129,140,248,0.35)',
        textBright: '#C7D2FE',
      },
    },
  },

  designer: {
    key: 'designer',
    label: '디자이너',
    role: '시각화 전문가',
    emoji: '🎨',
    description: '아이디어를 픽셀로 번역하는 마법사',
    tagline: '좀 더 팝하게, 근데 심플하게',
    color: '#A855F7',
    therapy: {
      calm: {
        bg: '#080018',
        surface: '#0E0030',
        glow: 'rgba(147,51,234,0.45)',
        accent: '#9333EA',
        border: 'rgba(147,51,234,0.22)',
        textBright: '#C084FC',
      },
      balance: {
        bg: '#030014',
        surface: '#0A0028',
        glow: 'rgba(168,85,247,0.55)',
        accent: '#A855F7',
        border: 'rgba(168,85,247,0.22)',
        textBright: '#C084FC',
      },
      energize: {
        bg: '#1A0038',
        surface: '#250050',
        glow: 'rgba(192,38,211,0.65)',
        accent: '#C026D3',
        border: 'rgba(192,38,211,0.32)',
        textBright: '#E879F9',
      },
    },
  },

  developer: {
    key: 'developer',
    label: '개발자',
    role: '코드 아키텍트',
    emoji: '💻',
    description: '로직으로 세상을 만드는 엔지니어',
    tagline: '로컬에서는 됐는데요',
    color: '#10B981',
    therapy: {
      calm: {
        bg: '#001810',
        surface: '#002B1A',
        glow: 'rgba(5,150,105,0.50)',
        accent: '#059669',
        border: 'rgba(5,150,105,0.22)',
        textBright: '#6EE7B7',
      },
      balance: {
        bg: '#021C14',
        surface: '#04301F',
        glow: 'rgba(16,185,129,0.55)',
        accent: '#10B981',
        border: 'rgba(16,185,129,0.25)',
        textBright: '#6EE7B7',
      },
      energize: {
        bg: '#062820',
        surface: '#0A3D30',
        glow: 'rgba(52,211,153,0.65)',
        accent: '#34D399',
        border: 'rgba(52,211,153,0.30)',
        textBright: '#A7F3D0',
      },
    },
  },

  qa: {
    key: 'qa',
    label: 'QA',
    role: '품질 수호자',
    emoji: '🔍',
    description: '완벽함을 추구하는 디테일의 달인',
    tagline: '버그는 내가 먼저 찾는다',
    color: '#F59E0B',
    therapy: {
      calm: {
        bg: '#180A00',
        surface: '#251200',
        glow: 'rgba(217,119,6,0.45)',
        accent: '#D97706',
        border: 'rgba(217,119,6,0.22)',
        textBright: '#FCD34D',
      },
      balance: {
        bg: '#1A0F02',
        surface: '#291700',
        glow: 'rgba(245,158,11,0.52)',
        accent: '#F59E0B',
        border: 'rgba(245,158,11,0.25)',
        textBright: '#FDE68A',
      },
      energize: {
        bg: '#201200',
        surface: '#311C00',
        glow: 'rgba(252,211,77,0.65)',
        accent: '#FCD34D',
        border: 'rgba(252,211,77,0.32)',
        textBright: '#FEF3C7',
      },
    },
  },
}

export function getPersona(key: string): PersonaTheme {
  return PERSONAS[key as PersonaKey] ?? PERSONAS.designer
}

export function getTherapyState(energyLevel: number): TherapyState {
  if (energyLevel <= 2) return 'calm'
  if (energyLevel === 3) return 'balance'
  return 'energize'
}

export const THERAPY_LABELS: Record<TherapyState, string> = {
  calm:     '차분함의 컬러가 오늘 하루를 감싸줍니다',
  balance:  '균형의 에너지가 오늘 하루를 이끕니다',
  energize: '활력의 컬러가 오늘 하루를 빛냅니다',
}
