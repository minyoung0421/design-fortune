import type { FortuneHistory, PersonaKey } from '@/types/persona'

const HISTORY_KEY = 'fortune-log-history'
const PERSONA_KEY = 'fortune-log-persona'
const MAX_ENTRIES = 90

function genId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 6)
}

/* ── Persona persistence ──────────────────────────────── */

export function savePersona(key: PersonaKey): void {
  if (typeof window === 'undefined') return
  localStorage.setItem(PERSONA_KEY, key)
}

export function loadPersona(): PersonaKey | null {
  if (typeof window === 'undefined') return null
  return (localStorage.getItem(PERSONA_KEY) as PersonaKey) ?? null
}

/* ── Fortune history CRUD ─────────────────────────────── */

export function saveFortuneEntry(entry: Omit<FortuneHistory, 'id' | 'savedAt'>): void {
  if (typeof window === 'undefined') return
  const history = getHistory()
  const newEntry: FortuneHistory = {
    ...entry,
    id: genId(),
    savedAt: new Date().toISOString(),
  }
  // 같은 날 + 같은 직군은 덮어쓰기
  const filtered = history.filter(h => !(h.date === entry.date && h.persona === entry.persona))
  const updated = [newEntry, ...filtered].slice(0, MAX_ENTRIES)
  localStorage.setItem(HISTORY_KEY, JSON.stringify(updated))
}

export function getHistory(): FortuneHistory[] {
  if (typeof window === 'undefined') return []
  try {
    return JSON.parse(localStorage.getItem(HISTORY_KEY) ?? '[]') as FortuneHistory[]
  } catch {
    return []
  }
}

export function clearHistory(): void {
  if (typeof window === 'undefined') return
  localStorage.removeItem(HISTORY_KEY)
}

/** 오늘 날짜 YYYY-MM-DD */
export function todayStr(): string {
  const d = new Date()
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}
