'use client'

import { useEffect, useState, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import StarField from '@/components/StarField'
import FortuneCard from '@/components/FortuneCard'
import { loadPersona } from '@/lib/history'
import { getPersona, getTherapyState, THERAPY_LABELS } from '@/lib/persona-data'
import { getTherapyVars } from '@/lib/color-therapy'
import { generateFortune } from '@/lib/fortune-data'
import type { PersonaKey } from '@/types/persona'

export default function FortunePage() {
  const router = useRouter()
  const [persona, setPersona] = useState<PersonaKey>('designer')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const saved = loadPersona()
    if (!saved) { router.replace('/'); return }
    setPersona(saved)
    setMounted(true)
  }, [router])

  const fortune  = useMemo(() => mounted ? generateFortune(persona) : null, [persona, mounted])
  const theme    = getPersona(persona)
  const therapyState = fortune ? getTherapyState(fortune.energyLevel) : 'balance'
  const therapyLabel = THERAPY_LABELS[therapyState]
  const cssVars  = fortune ? getTherapyVars(persona, fortune.energyLevel) : null

  if (!mounted || !fortune) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: '#030014' }}>
        <div className="w-8 h-8 rounded-full border-2 border-t-transparent animate-spin"
          style={{ borderColor: 'rgba(168,85,247,0.6)', borderTopColor: 'transparent' }} />
      </div>
    )
  }

  return (
    <main
      className="therapy-root relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      style={(cssVars ?? {}) as React.CSSProperties}
    >
      <StarField accentColor={theme.therapy[therapyState].glow} />

      {/* ── Ambient glows ── */}
      <div aria-hidden className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 rounded-full"
          style={{ width: 680, height: 420, top: -90,
            background: `radial-gradient(circle, ${theme.therapy[therapyState].glow.replace('0.55)', '0.22)')} 0%, transparent 70%)`,
            filter: 'blur(50px)' }} />
        <div className="absolute bottom-0 left-1/4 rounded-full"
          style={{ width: 340, height: 340, bottom: -70,
            background: `radial-gradient(circle, ${theme.therapy[therapyState].glow.replace('0.55)', '0.12)')} 0%, transparent 65%)`,
            filter: 'blur(55px)' }} />
      </div>

      {/* ── Navigation ── */}
      <motion.nav
        className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-5 pt-6 pb-3"
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <button
          onClick={() => router.push('/')}
          className="flex items-center gap-1.5 text-xs tracking-wide transition-opacity hover:opacity-70"
          style={{ color: 'var(--t-text-bright)' }}
          aria-label="직군 선택으로 돌아가기"
        >
          ← 직군 바꾸기
        </button>

        <div className="flex items-center gap-2">
          <span style={{ fontSize: '1.1rem' }}>{theme.emoji}</span>
          <span className="text-xs font-medium" style={{ color: '#f8f8ff' }}>{theme.role}</span>
        </div>

        <button
          onClick={() => router.push('/history/')}
          className="text-xs tracking-wide transition-opacity hover:opacity-70"
          style={{ color: 'var(--t-text-bright)' }}
          aria-label="히스토리 보기"
        >
          히스토리 →
        </button>
      </motion.nav>

      {/* ── Main Content ── */}
      <div className="relative z-10 flex flex-col items-center gap-8 px-4 py-8 w-full max-w-lg mx-auto mt-10">

        {/* Header */}
        <motion.header
          className="text-center"
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: 'easeOut' }}
        >
          <p className="font-display text-[10px] tracking-[0.35em] uppercase mb-3"
            style={{ color: 'var(--t-text-bright)', opacity: 0.75 }}>
            ✦ &nbsp; FortuneLog &nbsp; ✦
          </p>
          <h1 className="font-serif-ele leading-tight mb-2"
            style={{ fontSize: '2.8rem', color: '#f8f8ff' }}>
            오늘의<br />
            <span style={{ color: 'var(--t-text-bright)',
              textShadow: `0 0 20px var(--t-glow), 0 0 45px ${theme.therapy[therapyState].glow.replace('0.55)', '0.30)')}` }}>
              {theme.role} 운세
            </span>
          </h1>
          <p className="text-xs tracking-wide" style={{ color: '#70709a' }}>
            {therapyLabel}
          </p>
        </motion.header>

        {/* Fortune Card */}
        <FortuneCard fortune={fortune} persona={persona} />

        {/* Footer */}
        <p className="text-xs tracking-wider text-center" style={{ color: '#70709a' }}>
          운세는 매일 자정에 갱신됩니다
        </p>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none"
        style={{ background: `linear-gradient(to top, var(--t-bg), transparent)` }} />
    </main>
  )
}
