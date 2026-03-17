'use client'

import { useState, useMemo, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/navigation'
import StarField from '@/components/StarField'
import FortuneCard from '@/components/FortuneCard'
import { PERSONAS, getPersona, getTherapyState, THERAPY_LABELS } from '@/lib/persona-data'
import { savePersona, loadPersona } from '@/lib/history'
import { generateFortune } from '@/lib/fortune-data'
import { getTherapyVars } from '@/lib/color-therapy'
import type { PersonaKey } from '@/types/persona'

const PERSONA_ORDER: PersonaKey[] = ['pm', 'designer', 'developer', 'qa']
type View = 'select' | 'fortune'

/* ── 페르소나 선택 화면 ──────────────────────────────────── */
function SelectView({ onSelect }: { onSelect: (key: PersonaKey) => void }) {
  const [selected,   setSelected]   = useState<PersonaKey | null>(null)
  const [confirming, setConfirming] = useState(false)

  const handleConfirm = () => {
    if (!selected || confirming) return
    setConfirming(true)
    setTimeout(() => onSelect(selected), 380)
  }

  const todayStr = new Date().toLocaleDateString('ko-KR', {
    year: 'numeric', month: 'long', day: 'numeric', weekday: 'long',
  })

  return (
    <motion.div
      key="select"
      className="relative z-10 min-h-screen flex flex-col items-center justify-center px-5 py-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.97, transition: { duration: 0.28 } }}
    >
      {/* ── 헤더 ── */}
      <motion.div
        className="text-center mb-10"
        initial={{ opacity: 0, y: -22 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: 'easeOut' }}
      >
        <motion.div
          className="text-6xl mb-4 inline-block"
          animate={{ y: [0, -10, 0], rotate: [0, -6, 6, 0] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          🔮
        </motion.div>
        <p className="font-cute text-[11px] font-semibold tracking-[0.35em] uppercase mb-1.5"
          style={{ color: 'rgba(192,132,252,0.7)' }}>
          FortuneLog
        </p>
        <h1 className="font-cute font-extrabold leading-tight mb-2"
          style={{ fontSize: '2rem', color: '#f8f8ff' }}>
          오늘의 컬러테라피
        </h1>
        <p className="font-cute text-xs" style={{ color: '#70709a' }}>{todayStr}</p>
      </motion.div>

      {/* ── 직군 선택 ── */}
      <motion.div
        className="w-full max-w-xs mb-5"
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.18, duration: 0.5 }}
      >
        <p className="font-cute text-[10px] tracking-[0.28em] uppercase text-center mb-3"
          style={{ color: '#70709a' }}>
          직군 선택
        </p>
        <div className="grid grid-cols-2 gap-2">
          {PERSONA_ORDER.map((key) => {
            const p = PERSONAS[key]
            const isSelected = selected === key
            return (
              <motion.button
                key={key}
                onClick={() => setSelected(key)}
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.96 }}
                animate={isSelected ? { scale: 1.04 } : { scale: 1 }}
                transition={{ duration: 0.2 }}
                className="flex items-center gap-2.5 px-3.5 py-3 rounded-2xl cursor-pointer relative overflow-hidden text-left"
                style={{
                  background: isSelected ? p.cardGradient : 'rgba(255,255,255,0.05)',
                  border: isSelected
                    ? `1.5px solid ${p.color}70`
                    : '1.5px solid rgba(255,255,255,0.09)',
                  boxShadow: isSelected ? `0 4px 18px ${p.color}44` : 'none',
                  transition: 'background 0.25s, border 0.25s, box-shadow 0.25s',
                }}
                aria-label={`${p.role} 선택`}
              >
                {isSelected && (
                  <div className="absolute inset-0 pointer-events-none"
                    style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.16) 0%, transparent 60%)' }} />
                )}
                <span className="text-2xl flex-shrink-0">{p.emoji}</span>
                <div>
                  <p className="font-cute font-bold text-sm leading-tight"
                    style={{ color: isSelected ? '#fff' : '#b4b4d4' }}>
                    {p.role}
                  </p>
                  <p className="font-cute text-[10px] mt-0.5"
                    style={{ color: isSelected ? 'rgba(255,255,255,0.65)' : '#70709a' }}>
                    {p.label}
                  </p>
                </div>
              </motion.button>
            )
          })}
        </div>
      </motion.div>

      {/* ── CTA 버튼 ── */}
      <motion.div
        className="w-full max-w-xs"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.32, duration: 0.5 }}
      >
        <motion.button
          onClick={handleConfirm}
          disabled={!selected || confirming}
          whileHover={selected && !confirming ? { scale: 1.03, y: -2 } : {}}
          whileTap={selected && !confirming ? { scale: 0.97 } : {}}
          className="w-full py-3.5 rounded-2xl font-cute font-bold text-sm tracking-wide"
          style={selected ? {
            background: `linear-gradient(135deg, ${PERSONAS[selected].color} 0%, ${PERSONAS[selected].color}cc 100%)`,
            boxShadow: `0 6px 24px ${PERSONAS[selected].color}55, 0 2px 8px rgba(0,0,0,0.3)`,
            color: '#fff',
            border: 'none',
          } : {
            background: 'rgba(255,255,255,0.05)',
            border: '1.5px solid rgba(255,255,255,0.10)',
            color: '#70709a',
          }}
        >
          {confirming
            ? '✨ 불러오는 중…'
            : selected
              ? `${PERSONAS[selected].emoji} ${PERSONAS[selected].role} 운세 확인하기`
              : '직군을 선택해주세요'}
        </motion.button>
      </motion.div>

      <motion.p
        className="font-cute text-xs text-center mt-6"
        style={{ color: '#70709a' }}
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}
      >
        매일 자정 컬러테라피가 갱신됩니다 ✦
      </motion.p>
    </motion.div>
  )
}

/* ── 포춘 화면 ───────────────────────────────────────────── */
function FortuneView({
  persona,
  fortune,
  onChangePersona,
}: {
  persona: PersonaKey
  fortune: ReturnType<typeof generateFortune>
  onChangePersona: () => void
}) {
  const router      = useRouter()
  const theme       = getPersona(persona)
  const therapyState = getTherapyState(fortune.energyLevel)
  const therapyLabel = THERAPY_LABELS[therapyState]

  return (
    <motion.div
      key="fortune"
      className="relative z-10 min-h-screen flex flex-col items-center justify-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16, transition: { duration: 0.28 } }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* 상단 네비 */}
      <motion.nav
        className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-5 pt-6 pb-3"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.4 }}
      >
        <button
          onClick={onChangePersona}
          className="font-cute text-xs font-semibold tracking-wide transition-opacity hover:opacity-70 flex items-center gap-1"
          style={{ color: theme.therapy[therapyState].textBright }}
        >
          ← 직군 바꾸기
        </button>

        <div className="flex items-center gap-1.5">
          <span style={{ fontSize: '1rem' }}>{theme.emoji}</span>
          <span className="font-cute text-xs font-bold" style={{ color: '#f8f8ff' }}>{theme.role}</span>
        </div>

        <button
          onClick={() => router.push('/history/')}
          className="font-cute text-xs font-semibold tracking-wide transition-opacity hover:opacity-70"
          style={{ color: theme.therapy[therapyState].textBright }}
        >
          히스토리 →
        </button>
      </motion.nav>

      {/* 콘텐츠 */}
      <div className="flex flex-col items-center gap-7 px-4 py-8 w-full max-w-lg mx-auto mt-10">
        <motion.header
          className="text-center"
          initial={{ opacity: 0, y: -14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.45, ease: 'easeOut' }}
        >
          <p className="font-display text-[10px] tracking-[0.35em] uppercase mb-3"
            style={{ color: theme.therapy[therapyState].textBright, opacity: 0.7 }}>
            ✦ &nbsp; FortuneLog &nbsp; ✦
          </p>
          <h1 className="font-serif-ele leading-tight mb-2" style={{ fontSize: '2.6rem', color: '#f8f8ff' }}>
            오늘의<br />
            <span style={{
              color: theme.therapy[therapyState].textBright,
              textShadow: `0 0 20px ${theme.therapy[therapyState].glow}, 0 0 45px ${theme.therapy[therapyState].glow}`,
            }}>
              {theme.role} 운세
            </span>
          </h1>
          <p className="font-cute text-xs tracking-wide" style={{ color: '#70709a' }}>{therapyLabel}</p>
        </motion.header>

        <FortuneCard fortune={fortune} persona={persona} />

        <p className="font-cute text-xs tracking-wider text-center" style={{ color: '#70709a' }}>
          운세는 매일 자정에 갱신됩니다
        </p>
      </div>

      {/* 하단 페이드 */}
      <div className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none"
        style={{ background: 'linear-gradient(to top, var(--t-bg, #030014), transparent)' }} />
    </motion.div>
  )
}

/* ── Root App ─────────────────────────────────────────────── */
export default function App() {
  const [view,    setView]    = useState<View>('select')
  const [persona, setPersona] = useState<PersonaKey | null>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const saved = loadPersona()
    if (saved) { setPersona(saved); setView('fortune') }
    setMounted(true)
  }, [])

  const fortune = useMemo(() =>
    persona && mounted ? generateFortune(persona) : null,
    [persona, mounted]
  )

  const therapyState = fortune && persona ? getTherapyState(fortune.energyLevel) : 'balance'
  const cssVars = fortune && persona ? getTherapyVars(persona, fortune.energyLevel) : null
  const theme   = persona ? getPersona(persona) : null

  const handleSelect = (key: PersonaKey) => {
    savePersona(key)
    setPersona(key)
    setView('fortune')
  }

  const handleChangePersona = () => {
    setView('select')
  }

  if (!mounted) return <div className="min-h-screen" style={{ background: '#030014' }} />

  return (
    <main
      className="therapy-root relative min-h-screen overflow-hidden"
      style={(view === 'fortune' && cssVars ? cssVars : { '--t-bg': '#030014' }) as React.CSSProperties}
    >
      {/* 배경 별 */}
      <StarField accentColor={
        view === 'fortune' && theme && fortune
          ? theme.therapy[therapyState].glow
          : undefined
      } />

      {/* 글로우 블롭 */}
      <div aria-hidden className="absolute inset-0 pointer-events-none">
        {view === 'fortune' && theme ? (
          <>
            <div className="absolute top-0 left-1/2 -translate-x-1/2 rounded-full"
              style={{ width: 680, height: 420, top: -90,
                background: `radial-gradient(circle, ${theme.therapy[therapyState].glow.replace(/[\d.]+\)$/, '0.20)')} 0%, transparent 70%)`,
                filter: 'blur(55px)' }} />
            <div className="absolute bottom-0 left-1/4 rounded-full"
              style={{ width: 340, height: 340, bottom: -70,
                background: `radial-gradient(circle, ${theme.therapy[therapyState].glow.replace(/[\d.]+\)$/, '0.10)')} 0%, transparent 65%)`,
                filter: 'blur(55px)' }} />
          </>
        ) : (
          <div className="absolute top-0 left-1/2 -translate-x-1/2 rounded-full"
            style={{ width: 680, height: 380, top: -100,
              background: 'radial-gradient(ellipse, rgba(147,51,234,0.16) 0%, transparent 70%)',
              filter: 'blur(60px)' }} />
        )}
      </div>

      {/* 뷰 전환 */}
      <AnimatePresence mode="wait">
        {view === 'select' && (
          <SelectView key="select" onSelect={handleSelect} />
        )}
        {view === 'fortune' && fortune && persona && (
          <FortuneView
            key="fortune"
            persona={persona}
            fortune={fortune}
            onChangePersona={handleChangePersona}
          />
        )}
      </AnimatePresence>
    </main>
  )
}
