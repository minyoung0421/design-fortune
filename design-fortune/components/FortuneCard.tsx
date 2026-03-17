'use client'

import { useState, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { BackContent } from './BackContent'
import { getPersona, getTherapyState } from '@/lib/persona-data'
import type { DesignerFortune } from '@/lib/fortune-data'
import type { PersonaKey } from '@/types/persona'

/* ── Toast ─────────────────────────────────────────────── */
function Toast({ msg }: { msg: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16, scale: 0.92 }}
      animate={{ opacity: 1, y: 0,  scale: 1 }}
      exit={{    opacity: 0, y: -10, scale: 0.92 }}
      transition={{ duration: 0.22, ease: 'easeOut' }}
      className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 pointer-events-none"
    >
      <div className="glass-therapy rounded-full px-5 py-2.5 text-sm font-medium whitespace-nowrap"
        style={{ color: '#f8f8ff', boxShadow: '0 8px 32px rgba(0,0,0,0.5)' }}>
        {msg}
      </div>
    </motion.div>
  )
}

/* ── Crystal Ball — persona 컬러 반영 ─────────────────── */
function CrystalBall({ persona }: { persona: PersonaKey }) {
  const theme = getPersona(persona)
  const accent = theme.color
  // derive sphere gradient colors from persona
  const sphereGradient = `radial-gradient(circle at 32% 27%,
    rgba(255,255,255,0.62) 0%,
    ${accent}ee 10%,
    ${accent}cc 28%,
    ${accent}bb 52%,
    ${accent}99 72%,
    rgba(4,1,20,1) 100%)`

  return (
    <div className="relative flex items-center justify-center select-none">
      {/* L1 outer pulse glow */}
      <div className="absolute rounded-full animate-pulse-glow pointer-events-none"
        style={{ width: 260, height: 260,
          background: `radial-gradient(circle, ${accent}45 0%, ${accent}1a 48%, transparent 70%)` }} />
      {/* L2 mid haze */}
      <div className="absolute rounded-full pointer-events-none"
        style={{ width: 200, height: 200,
          background: `radial-gradient(circle, ${accent}2e 0%, transparent 65%)`,
          filter: 'blur(8px)' }} />
      {/* L3 main sphere */}
      <div className="relative rounded-full animate-float"
        style={{ width: 168, height: 168, background: sphereGradient,
          boxShadow: `0 0 50px ${accent}88, 0 0 100px ${accent}44, 0 0 180px ${accent}22` }}>
        {/* L4 rotating nebula */}
        <div className="absolute rounded-full animate-spin-slow pointer-events-none"
          style={{ inset: 22, filter: 'blur(10px)', opacity: 0.55,
            background: `conic-gradient(from 0deg, ${accent}ff, ${accent}80, ${accent}dd, ${accent}99, ${accent}ff)` }} />
        {/* L5 primary highlight */}
        <div className="absolute pointer-events-none"
          style={{ top: 12, left: 18, width: 46, height: 30, borderRadius: '50%',
            background: 'rgba(255,255,255,0.52)', filter: 'blur(8px)' }} />
        {/* L6 specular point */}
        <div className="absolute pointer-events-none"
          style={{ top: 18, left: 28, width: 16, height: 10, borderRadius: '50%',
            background: 'rgba(255,255,255,0.90)', filter: 'blur(3px)' }} />
        {/* L7 rim light */}
        <div className="absolute pointer-events-none"
          style={{ bottom: 14, right: 16, width: 28, height: 12, borderRadius: '50%',
            background: `${accent}80`, filter: 'blur(7px)' }} />
      </div>
    </div>
  )
}

/* ── Sparkles (persona-colored) ─────────────────────────── */
const SPARKLE_POS = [
  { top: '9%',  left: '8%',   size: 4, delay: 0   },
  { top: '16%', right: '10%', size: 6, delay: 0.8 },
  { top: '5%',  left: '44%',  size: 3, delay: 1.4 },
  { bottom: '18%', left: '6%',   size: 4, delay: 0.3 },
  { bottom: '11%', right: '12%', size: 6, delay: 1.7 },
  { top: '38%', left: '3%',   size: 2, delay: 2.2 },
  { top: '60%', right: '5%',  size: 4, delay: 1.1 },
  { bottom: '40%', left: '15%', size: 2, delay: 1.9 },
  { top: '72%', left: '22%',  size: 3, delay: 0.6 },
  { top: '28%', right: '22%', size: 2, delay: 2.8 },
]
function Sparkles({ color }: { color: string }) {
  return (
    <>
      {SPARKLE_POS.map(({ size, delay, ...pos }, i) => (
        <div key={i} aria-hidden
          className={`absolute rounded-full pointer-events-none ${i % 2 === 0 ? 'animate-twinkle' : 'animate-twinkle-alt'}`}
          style={{ ...(pos as React.CSSProperties), width: size, height: size,
            background: color, animationDelay: `${delay}s` }} />
      ))}
    </>
  )
}

/* ── Props ─────────────────────────────────────────────── */
interface FortuneCardProps {
  fortune: DesignerFortune
  persona: PersonaKey
}

/* ── Main Component ─────────────────────────────────────── */
export default function FortuneCard({ fortune, persona }: FortuneCardProps) {
  const [isFlipped, setIsFlipped]   = useState(false)
  const [showBack,  setShowBack]    = useState(false)
  const [isSaving,  setIsSaving]    = useState(false)
  const [toastMsg,  setToastMsg]    = useState<string | null>(null)
  const toastTimer                  = useRef<ReturnType<typeof setTimeout>>()
  const cardBackRef                 = useRef<HTMLDivElement>(null)

  const theme        = getPersona(persona)
  const therapyState = getTherapyState(fortune.energyLevel)
  const accentColor  = theme.therapy[therapyState].textBright

  const showToast = useCallback((msg: string) => {
    clearTimeout(toastTimer.current)
    setToastMsg(msg)
    toastTimer.current = setTimeout(() => setToastMsg(null), 2400)
  }, [])

  const handleCopyHex = useCallback(async (hex: string) => {
    try {
      await navigator.clipboard.writeText(hex)
      showToast(`✓ ${hex} 복사 완료!`)
    } catch {
      showToast('복사에 실패했습니다')
    }
  }, [showToast])

  const handleSave = useCallback(async () => {
    if (!cardBackRef.current || isSaving) return
    setIsSaving(true)
    const el = cardBackRef.current
    const prevStyles = { bg: el.style.background, bd: el.style.backdropFilter, border: el.style.border }
    const bgColor = theme.therapy[therapyState].surface
    el.style.background     = `linear-gradient(145deg, ${bgColor} 0%, ${theme.therapy[therapyState].bg} 100%)`
    el.style.backdropFilter = 'none'
    ;(el.style as CSSStyleDeclaration & { webkitBackdropFilter: string }).webkitBackdropFilter = 'none'
    el.style.border         = `1px solid ${theme.therapy[therapyState].border}`
    try {
      const { default: html2canvas } = await import('html2canvas')
      const canvas = await html2canvas(el, { scale: 2, useCORS: true, logging: false, backgroundColor: null,
        ignoreElements: n => n.hasAttribute('data-no-export') })
      const link = document.createElement('a')
      link.download = `fortune-log-${new Date().toISOString().slice(0,10)}.png`
      link.href = canvas.toDataURL('image/png')
      link.click()
      showToast('✨ 포토카드가 저장되었습니다!')
    } catch {
      showToast('저장 중 오류가 발생했습니다')
    } finally {
      el.style.background     = prevStyles.bg
      el.style.backdropFilter = prevStyles.bd
      el.style.border         = prevStyles.border
      setIsSaving(false)
    }
  }, [isSaving, showToast, theme, therapyState])

  const handleFlip  = () => { if (!isFlipped) setIsFlipped(true) }
  const handleReset = () => { setShowBack(false); setIsFlipped(false) }

  return (
    <>
      <AnimatePresence>{toastMsg && <Toast key="toast" msg={toastMsg} />}</AnimatePresence>

      <div className="relative w-full max-w-[90vw] md:max-w-[360px] h-[590px]"
        style={{ perspective: '1400px' }}>
        <motion.div
          className="relative w-full h-full preserve-3d"
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{ duration: 0.85, ease: [0.60, 0.04, 0.02, 0.92] }}
          onAnimationComplete={() => setShowBack(isFlipped)}
        >
          {/* ══ FRONT ══ */}
          <div className="absolute inset-0 backface-hidden">
            <div
              className="glass-therapy-card rounded-2xl w-full h-full flex flex-col items-center justify-center gap-8 cursor-pointer select-none relative overflow-hidden"
              onClick={handleFlip}
              onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleFlip() } }}
              role="button"
              tabIndex={0}
              aria-label={`클릭하여 오늘의 ${theme.role} 운세 보기`}
            >
              <Sparkles color={accentColor} />

              {/* shimmer sweep */}
              <div className="absolute inset-0 rounded-2xl pointer-events-none"
                style={{ background: 'linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.04) 50%, transparent 70%)' }} />

              <CrystalBall persona={persona} />

              <div className="text-center z-10 px-8" style={{ marginTop: -8 }}>
                <p className="font-display text-xs tracking-[0.28em] mb-2" style={{ color: accentColor }}>
                  {theme.emoji} {theme.role.toUpperCase()}
                </p>
                <p className="font-serif-ele text-2xl mb-3" style={{ color: '#f8f8ff' }}>
                  오늘의 운세
                </p>
                <div className="flex items-center gap-2 justify-center">
                  <span className="block h-px w-10" style={{ background: accentColor, opacity: 0.28 }} />
                  <p className="text-xs tracking-widest" style={{ color: '#70709a' }}>
                    수정구슬을 클릭하세요
                  </p>
                  <span className="block h-px w-10" style={{ background: accentColor, opacity: 0.28 }} />
                </div>
              </div>

              {/* bottom accent line */}
              <div className="absolute bottom-0 left-0 right-0 h-px"
                style={{ background: `linear-gradient(to right, transparent, ${theme.color}88, transparent)` }} />
            </div>
          </div>

          {/* ══ BACK ══ */}
          <div className="absolute inset-0 backface-hidden" style={{ transform: 'rotateY(180deg)' }}>
            <div ref={cardBackRef}
              className="glass-therapy-card rounded-2xl w-full h-full overflow-hidden">
              <AnimatePresence>
                {showBack && (
                  <BackContent
                    fortune={fortune}
                    persona={persona}
                    onReset={handleReset}
                    onSave={handleSave}
                    onCopyHex={handleCopyHex}
                    isSaving={isSaving}
                  />
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </div>
    </>
  )
}
