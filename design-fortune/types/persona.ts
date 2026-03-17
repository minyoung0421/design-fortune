export type PersonaKey = 'pm' | 'designer' | 'developer' | 'qa'
export type TherapyState = 'calm' | 'balance' | 'energize'

export interface TherapyPalette {
  bg: string          // --t-bg   (body background)
  surface: string     // --t-surface (card surface)
  glow: string        // --t-glow  (rgba glow color)
  accent: string      // --t-accent (primary accent)
  border: string      // --t-border (rgba border)
  textBright: string  // --t-text-bright
}

export interface PersonaTheme {
  key: PersonaKey
  label: string       // 한국어 직군명
  role: string        // 영문 역할
  emoji: string
  description: string
  tagline: string     // 공감 한줄
  color: string       // primary hex (selector UI용)
  therapy: Record<TherapyState, TherapyPalette>
}

export interface FortuneHistory {
  id: string
  date: string                    // YYYY-MM-DD
  persona: PersonaKey
  energyLevel: 1 | 2 | 3 | 4 | 5
  paletteName: string
  memeText: string
  savedAt: string                 // ISO timestamp
}
