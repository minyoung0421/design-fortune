import type { PersonaKey } from '@/types/persona'
import { PERSONAS, getTherapyState } from './persona-data'

export interface TherapyCSSVars {
  '--t-bg': string
  '--t-surface': string
  '--t-glow': string
  '--t-accent': string
  '--t-border': string
  '--t-text-bright': string
}

/** persona + energyLevel → CSS 변수 맵 반환 */
export function getTherapyVars(persona: PersonaKey, energyLevel: number): TherapyCSSVars {
  const state = getTherapyState(energyLevel)
  const p = PERSONAS[persona].therapy[state]
  return {
    '--t-bg':          p.bg,
    '--t-surface':     p.surface,
    '--t-glow':        p.glow,
    '--t-accent':      p.accent,
    '--t-border':      p.border,
    '--t-text-bright': p.textBright,
  }
}

/** 컬러테라피 상태 → 사용자 메시지 */
export function getTherapyMessage(energyLevel: number): string {
  if (energyLevel <= 2) return '지금 당신에게 차분함의 컬러를 드립니다'
  if (energyLevel === 3) return '균형의 에너지가 오늘 하루를 이끕니다'
  return '활력의 컬러가 오늘 하루를 빛냅니다'
}
