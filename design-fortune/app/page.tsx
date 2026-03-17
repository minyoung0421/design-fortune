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
    setTimeout(() => router.push('/fortune/'), 480)
  }

  return (
    <main
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-4 py-10"
      style={{ background: '#030014' }}
    >
      <StarField />

      {/* ── 배경 글로우 ── */}
      <div aria-hidden className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 rounded-full"
          style={{ width: 700, height: 380, top: -100,
            background: 'radial-gradient(ellipse, rgba(147,51,234,0.18) 0%, transparent 70%)',
            filter: 'blur(60px)' }} />
      </div>

      <div className="relative z-10 w-full max-w-sm mx-auto flex flex-col items-center gap-7">

        {/* ── 헤더 ── */}
        <motion.header
          className="text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          {/* 마스코트 아이콘 */}
          <motion.div
            className="text-5xl mb-3 inline-block"
            animate={{ y: [0, -8, 0], rotate: [0, -5, 5, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          >
            🔮
          </motion.div>

          <p className="font-cute text-[11px] font-700 tracking-[0.30em] uppercase mb-2"
            style={{ color: 'rgba(192,132,252,0.7)' }}>
            FortuneLog
          </p>
          <h1 className="font-cute font-800 leading-tight mb-1.5"
            style={{ fontSize: '1.9rem', color: '#f8f8ff' }}>
            오늘 나의 직군은?
          </h1>
          <p className="font-cute text-sm" style={{ color: '#b4b4d4' }}>
            직군을 선택하면 맞춤 컬러테라피가 시작돼요
          </p>
        </motion.header>

        {/* ── 페르소나 카드 그리드 ── */}
        <AnimatePresence>
          {!leaving && (
            <motion.div
              className="grid grid-cols-2 gap-3 w-full"
              initial="hidden"
              animate="show"
              exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.3 } }}
              variants={{ show: { transition: { staggerChildren: 0.09 } } }}
            >
              {PERSONA_ORDER.map((key) => {
                const p = PERSONAS[key]
                const isSelected = selected === key

                return (
                  <motion.button
                    key={key}
                    variants={{
                      hidden: { opacity: 0, y: 30, scale: 0.88 },
                      show:   { opacity: 1, y: 0,  scale: 1,
                        transition: { duration: 0.45, ease: [0.22, 1.2, 0.36, 1] } },
                    }}
                    whileHover={{ scale: 1.04, y: -3 }}
                    whileTap={{ scale: 0.96 }}
                    animate={isSelected ? { scale: 1.08, opacity: 1 } : {}}
                    onClick={() => handleSelect(key)}
                    className="relative flex flex-col items-center gap-2.5 p-5 rounded-3xl text-center cursor-pointer overflow-hidden"
                    style={{
                      background: p.cardGradient,
                      boxShadow: isSelected
                        ? `0 0 0 3px #fff, 0 8px 30px ${p.color}99`
                        : `0 6px 24px ${p.color}44`,
                    }}
                    aria-label={`${p.role} 선택`}
                  >
                    {/* 카드 내부 하이라이트 */}
                    <div className="absolute inset-0 rounded-3xl pointer-events-none"
                      style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.18) 0%, transparent 60%)' }} />

                    {/* 이모지 */}
                    <motion.span
                      className="relative text-4xl"
                      animate={{ rotate: [0, -6, 6, 0] }}
                      transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut',
                        delay: PERSONA_ORDER.indexOf(key) * 0.6 }}
                    >
                      {p.emoji}
                    </motion.span>

                    {/* 직군명 */}
                    <div>
                      <p className="font-cute font-800 text-base text-white leading-tight">
                        {p.role}
                      </p>
                      <p className="font-cute text-xs font-600 mt-0.5"
                        style={{ color: 'rgba(255,255,255,0.65)' }}>
                        {p.label}
                      </p>
                    </div>

                    {/* 태그라인 */}
                    <p className="font-cute text-[11px] leading-snug px-1"
                      style={{ color: 'rgba(255,255,255,0.75)' }}>
                      "{p.tagline}"
                    </p>

                    {/* 하단 포인트 */}
                    <div className="w-6 h-1 rounded-full mt-0.5"
                      style={{ background: 'rgba(255,255,255,0.40)' }} />
                  </motion.button>
                )
              })}
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── 하단 안내 ── */}
        <motion.p
          className="font-cute text-xs text-center"
          style={{ color: '#70709a' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          매일 자정 컬러테라피가 갱신됩니다 ✦
        </motion.p>
      </div>
    </main>
  )
}
