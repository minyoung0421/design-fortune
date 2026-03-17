'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { PERSONAS } from '@/lib/persona-data'
import { savePersona } from '@/lib/history'
import type { PersonaKey } from '@/types/persona'
import StarField from '@/components/StarField'

const PERSONA_ORDER: PersonaKey[] = ['pm', 'designer', 'developer', 'qa']

export default function PersonaSelector() {
  const router = useRouter()
  const [selected, setSelected] = useState<PersonaKey | null>(null)
  const [leaving, setLeaving] = useState(false)

  const handleSelect = (key: PersonaKey) => {
    if (leaving) return
    setSelected(key)
    setLeaving(true)
    savePersona(key)
    setTimeout(() => router.push('/fortune/'), 520)
  }

  return (
    <main
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-4 py-10"
      style={{ background: '#030014' }}
    >
      <StarField />

      {/* ── Ambient glow blobs ── */}
      <div aria-hidden className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 rounded-full pointer-events-none"
          style={{ width: 600, height: 400, top: -80,
            background: 'radial-gradient(circle, rgba(147,51,234,0.22) 0%, rgba(107,33,168,0.08) 50%, transparent 70%)',
            filter: 'blur(50px)' }} />
        <div className="absolute bottom-0 left-1/4 rounded-full pointer-events-none"
          style={{ width: 320, height: 320, bottom: -60,
            background: 'radial-gradient(circle, rgba(99,102,241,0.16) 0%, transparent 65%)',
            filter: 'blur(45px)' }} />
        <div className="absolute top-1/2 right-0 rounded-full pointer-events-none"
          style={{ width: 280, height: 280,
            background: 'radial-gradient(circle, rgba(245,158,11,0.10) 0%, transparent 65%)',
            filter: 'blur(40px)' }} />
      </div>

      <div className="relative z-10 w-full max-w-lg mx-auto flex flex-col items-center gap-8">

        {/* ── Header ── */}
        <motion.header
          className="text-center"
          initial={{ opacity: 0, y: -24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <p className="font-display text-[10px] tracking-[0.40em] uppercase mb-4"
            style={{ color: 'rgba(192,132,252,0.7)' }}>
            ✦ &nbsp; FortuneLog &nbsp; ✦
          </p>
          <h1 className="font-serif-ele leading-tight mb-3"
            style={{ fontSize: '2.8rem', color: '#f8f8ff' }}>
            직군별 멘탈 케어
          </h1>
          <p className="text-sm leading-relaxed" style={{ color: '#b4b4d4' }}>
            당신의 직군을 선택하면{' '}
            <span style={{ color: 'rgba(192,132,252,0.8)' }}>오늘의 컬러테라피</span>를 시작합니다
          </p>
        </motion.header>

        {/* ── Persona Grid ── */}
        <AnimatePresence>
          {!leaving && (
            <motion.div
              className="grid grid-cols-2 gap-3 w-full"
              initial="hidden"
              animate="show"
              exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.3 } }}
              variants={{ show: { transition: { staggerChildren: 0.08 } } }}
            >
              {PERSONA_ORDER.map((key) => {
                const p = PERSONAS[key]
                const isSelected = selected === key
                return (
                  <motion.button
                    key={key}
                    variants={{
                      hidden: { opacity: 0, y: 28, scale: 0.95 },
                      show:   { opacity: 1, y: 0,  scale: 1, transition: { duration: 0.4, ease: 'easeOut' } },
                    }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => handleSelect(key)}
                    className="persona-card flex flex-col items-center gap-3 p-5 text-center cursor-pointer"
                    style={{
                      boxShadow: isSelected
                        ? `0 0 0 2px ${p.color}, 0 0 28px ${p.color}55`
                        : 'none',
                      borderColor: isSelected ? p.color : undefined,
                    }}
                    aria-label={`${p.role} 직군 선택`}
                  >
                    {/* Glow blob behind emoji */}
                    <div className="relative flex items-center justify-center">
                      <div className="absolute rounded-full pointer-events-none"
                        style={{ width: 64, height: 64,
                          background: `radial-gradient(circle, ${p.color}30 0%, transparent 70%)`,
                          filter: 'blur(8px)' }} />
                      <span className="relative" style={{ fontSize: '2.2rem', lineHeight: 1 }}>
                        {p.emoji}
                      </span>
                    </div>

                    <div>
                      <p className="font-semibold text-base mb-0.5" style={{ color: '#f8f8ff' }}>
                        {p.role}
                      </p>
                      <p className="text-xs" style={{ color: p.color, opacity: 0.9 }}>
                        {p.label}
                      </p>
                    </div>

                    <p className="text-[11px] leading-snug px-1" style={{ color: '#70709a' }}>
                      "{p.tagline}"
                    </p>

                    {/* Bottom accent bar */}
                    <div className="w-full h-0.5 rounded-full mt-1"
                      style={{ background: `linear-gradient(to right, transparent, ${p.color}80, transparent)` }} />
                  </motion.button>
                )
              })}
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Footer hint ── */}
        <motion.p
          className="text-xs tracking-widest text-center"
          style={{ color: '#70709a' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          매일 자정 컬러테라피가 갱신됩니다
        </motion.p>
      </div>
    </main>
  )
}
