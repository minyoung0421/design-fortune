'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { getHistory, clearHistory } from '@/lib/history'
import { getPersona } from '@/lib/persona-data'
import type { FortuneHistory, PersonaKey } from '@/types/persona'

const ENERGY_COLORS: Record<number, string> = {
  1: '#6366F1', 2: '#3B82F6', 3: '#A855F7', 4: '#F59E0B', 5: '#10B981',
}

function EnergyDots({ level }: { level: number }) {
  return (
    <span className="flex gap-0.5">
      {[1,2,3,4,5].map(i => (
        <span key={i} className="inline-block rounded-full"
          style={{ width: 7, height: 7,
            background: i <= level ? ENERGY_COLORS[level] : 'rgba(255,255,255,0.12)' }} />
      ))}
    </span>
  )
}

function PersonaBadge({ persona }: { persona: PersonaKey }) {
  const p = getPersona(persona)
  return (
    <span className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-medium"
      style={{ background: `${p.color}20`, border: `1px solid ${p.color}50`, color: p.color }}>
      {p.emoji} {p.role}
    </span>
  )
}

/* 지난 7일 날짜 배열 */
function getLast7Days(): string[] {
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date()
    d.setDate(d.getDate() - (6 - i))
    return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`
  })
}

export default function HistoryPage() {
  const router = useRouter()
  const [history, setHistory] = useState<FortuneHistory[]>([])
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setHistory(getHistory())
    setMounted(true)
  }, [])

  const last7 = getLast7Days()
  const historyMap = Object.fromEntries(history.map(h => [h.date, h]))

  const handleClear = () => {
    if (confirm('모든 기록을 삭제할까요?')) {
      clearHistory()
      setHistory([])
    }
  }

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr + 'T00:00:00')
    return d.toLocaleDateString('ko-KR', { month: 'short', day: 'numeric', weekday: 'short' })
  }

  // Stats
  const personaCounts = history.reduce<Record<string, number>>((acc, h) => {
    acc[h.persona] = (acc[h.persona] ?? 0) + 1
    return acc
  }, {})
  const topPersona = Object.entries(personaCounts).sort(([,a],[,b]) => b-a)[0]
  const avgEnergy = history.length
    ? (history.reduce((s, h) => s + h.energyLevel, 0) / history.length).toFixed(1)
    : null

  return (
    <main className="min-h-screen flex flex-col" style={{ background: '#030014', color: '#f8f8ff' }}>

      {/* Nav */}
      <nav className="flex items-center justify-between px-5 pt-6 pb-4">
        <button onClick={() => router.back()}
          className="text-xs tracking-wide hover:opacity-70 transition-opacity"
          style={{ color: 'rgba(192,132,252,0.8)' }}>
          ← 돌아가기
        </button>
        <h1 className="font-display text-xs tracking-widest" style={{ color: 'rgba(192,132,252,0.7)' }}>
          MY FORTUNELOG
        </h1>
        {history.length > 0 && (
          <button onClick={handleClear}
            className="text-xs hover:opacity-70 transition-opacity"
            style={{ color: '#70709a' }}>
            전체 삭제
          </button>
        )}
      </nav>

      <div className="flex-1 px-4 pb-10 max-w-lg mx-auto w-full">

        {!mounted ? null : history.length === 0 ? (
          /* ── Empty State ── */
          <motion.div
            className="flex flex-col items-center justify-center gap-4 mt-24"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <span style={{ fontSize: '3rem' }}>🔮</span>
            <p className="text-base font-medium" style={{ color: '#b4b4d4' }}>아직 기록이 없어요</p>
            <p className="text-sm text-center" style={{ color: '#70709a' }}>
              운세를 뽑으면<br />이곳에 컬러테라피 기록이 쌓입니다
            </p>
            <button
              onClick={() => router.push('/')}
              className="mt-2 px-5 py-2.5 rounded-full text-sm font-medium transition-opacity hover:opacity-80"
              style={{ background: 'rgba(168,85,247,0.20)', border: '1px solid rgba(168,85,247,0.40)', color: '#c084fc' }}>
              첫 번째 운세 보러가기 →
            </button>
          </motion.div>
        ) : (
          <>
            {/* ── 7-day Color Strip ── */}
            <motion.section
              className="mb-6"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <p className="text-[10px] tracking-widest uppercase mb-3" style={{ color: '#70709a' }}>
                최근 7일
              </p>
              <div className="flex gap-2">
                {last7.map((date) => {
                  const entry = historyMap[date]
                  const persona = entry ? getPersona(entry.persona) : null
                  const dayLabel = new Date(date + 'T00:00:00').toLocaleDateString('ko-KR', { weekday: 'short' })
                  return (
                    <div key={date} className="flex flex-col items-center gap-1.5 flex-1">
                      <div className="w-full rounded-lg flex items-end justify-center"
                        style={{ height: 44,
                          background: persona
                            ? `linear-gradient(to top, ${persona.color}50, ${persona.color}20)`
                            : 'rgba(255,255,255,0.05)',
                          border: `1px solid ${persona ? persona.color + '40' : 'rgba(255,255,255,0.08)'}` }}>
                        {entry && (
                          <div className="flex gap-px mb-1">
                            {[1,2,3,4,5].map(i => (
                              <div key={i} className="rounded-full"
                                style={{ width: 3, height: i <= entry.energyLevel ? 3 + i * 3 : 4,
                                  background: i <= entry.energyLevel ? ENERGY_COLORS[entry.energyLevel] : 'rgba(255,255,255,0.15)',
                                  alignSelf: 'flex-end' }} />
                            ))}
                          </div>
                        )}
                        {!entry && <span style={{ fontSize: 14, marginBottom: 6, opacity: 0.3 }}>·</span>}
                      </div>
                      <span className="text-[9px]" style={{ color: '#70709a' }}>{dayLabel}</span>
                    </div>
                  )
                })}
              </div>
            </motion.section>

            {/* ── Stats ── */}
            <motion.section
              className="grid grid-cols-3 gap-2 mb-6"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.08 }}
            >
              {[
                { label: '총 기록', value: `${history.length}일` },
                { label: '평균 에너지', value: avgEnergy ? `${avgEnergy} ✦` : '-' },
                { label: '최다 직군', value: topPersona ? `${getPersona(topPersona[0] as PersonaKey).emoji} ${getPersona(topPersona[0] as PersonaKey).role}` : '-' },
              ].map(({ label, value }) => (
                <div key={label}
                  className="rounded-xl p-3 text-center"
                  style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
                  <p className="text-[10px] mb-1" style={{ color: '#70709a' }}>{label}</p>
                  <p className="text-sm font-medium" style={{ color: '#f8f8ff' }}>{value}</p>
                </div>
              ))}
            </motion.section>

            {/* ── Entry List ── */}
            <motion.section
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.14 }}
            >
              <p className="text-[10px] tracking-widest uppercase mb-3" style={{ color: '#70709a' }}>
                기록 목록
              </p>
              <div className="flex flex-col gap-2">
                {history.map((entry, i) => (
                  <motion.div
                    key={entry.id}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: i * 0.04 }}
                    className="rounded-xl p-3.5"
                    style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
                  >
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <span className="text-xs" style={{ color: '#b4b4d4' }}>{formatDate(entry.date)}</span>
                      <PersonaBadge persona={entry.persona} />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs font-medium mb-1" style={{ color: '#f8f8ff' }}>
                          {entry.paletteName}
                        </p>
                        <p className="text-[10px] leading-snug" style={{ color: '#70709a' }}>
                          {entry.memeText}
                        </p>
                      </div>
                      <EnergyDots level={entry.energyLevel} />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.section>
          </>
        )}
      </div>
    </main>
  )
}
