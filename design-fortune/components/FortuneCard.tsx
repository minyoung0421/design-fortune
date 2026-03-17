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

/* ── Sparkles ────────────────────────────────────────── */
const SPARKLE_POS = [
  { top: '9%',  left: '8%',   size: 3, delay: 0   },
  { top: '14%', right: '9%',  size: 5, delay: 0.8 },
  { top: '4%',  left: '44%',  size: 2, delay: 1.4 },
  { bottom: '16%', left: '5%',   size: 3, delay: 0.3 },
  { bottom: '10%', right: '11%', size: 5, delay: 1.7 },
  { top: '55%', left: '3%',   size: 2, delay: 2.2 },
  { top: '62%', right: '4%',  size: 3, delay: 1.1 },
  { bottom: '38%', left: '14%', size: 2, delay: 1.9 },
  { top: '74%', left: '20%',  size: 2, delay: 0.6 },
  { top: '30%', right: '20%', size: 2, delay: 2.8 },
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
  const accent       = theme.therapy[therapyState].accent

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
              className="glass-therapy-card rounded-2xl w-full h-full flex flex-col cursor-pointer select-none relative overflow-hidden"
              onClick={handleFlip}
              onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleFlip() } }}
              role="button"
              tabIndex={0}
              aria-label={`클릭하여 오늘의 ${theme.role} 운세 보기`}
            >
              <Sparkles color={accentColor} />

              {/* ── 팔레트 컬러 스트립 (카드 상단 35%) ── */}
              <div className="relative flex-shrink-0 overflow-hidden"
                style={{ height: 178, borderRadius: '1rem 1rem 0 0' }}>

                {/* 5색 수직 스트립 */}
                <div className="flex w-full h-full">
                  {fortune.palette.colors.map((sw, i) => (
                    <div key={sw.hex} className="flex-1 relative"
                      style={{ background: sw.hex }}>
                      {/* top sheen */}
                      <div className="absolute inset-0 pointer-events-none"
                        style={{ background: 'linear-gradient(to bottom, rgba(255,255,255,0.20) 0%, transparent 45%)' }} />
                      {/* subtle separator */}
                      {i < fortune.palette.colors.length - 1 && (
                        <div className="absolute right-0 top-0 bottom-0 w-px"
                          style={{ background: 'rgba(0,0,0,0.18)' }} />
                      )}
                    </div>
                  ))}
                </div>

                {/* bottom gradient fade into card */}
                <div className="absolute bottom-0 left-0 right-0 pointer-events-none"
                  style={{ height: 72,
                    background: 'linear-gradient(to top, rgba(8,3,24,0.90) 0%, rgba(8,3,24,0.40) 55%, transparent 100%)' }} />

                {/* FortuneLog label — top */}
                <div className="absolute top-3 left-0 right-0 flex justify-center pointer-events-none">
                  <p className="font-cute text-[9px] tracking-[0.38em] uppercase"
                    style={{ color: 'rgba(255,255,255,0.55)' }}>
                    ✦ FortuneLog ✦
                  </p>
                </div>

                {/* palette name badge — bottom */}
                <div className="absolute bottom-3 left-0 right-0 flex justify-center z-10 pointer-events-none">
                  <div className="px-3.5 py-1 rounded-full font-cute text-[11px] font-bold tracking-wide"
                    style={{
                      background: 'rgba(0,0,0,0.48)',
                      backdropFilter: 'blur(10px)',
                      WebkitBackdropFilter: 'blur(10px)',
                      color: '#f8f8ff',
                      border: '1px solid rgba(255,255,255,0.14)',
                    }}>
                    🎨 {fortune.palette.name}
                  </div>
                </div>
              </div>

              {/* ── 중간: 이모지 + 말풍선 ── */}
              <div className="flex flex-col items-center gap-2.5 flex-1 justify-center px-6">

                {/* 말풍선 */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8, y: 6 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ delay: 0.35, duration: 0.4, ease: [0.22, 1.2, 0.36, 1] }}
                >
                  <div className="speech-bubble">
                    <p className="font-cute text-xs font-semibold whitespace-nowrap"
                      style={{ color: '#f8f8ff' }}>
                      {theme.speech}
                    </p>
                  </div>
                </motion.div>

                {/* 마스코트 이모지 */}
                <motion.div
                  className="text-5xl"
                  animate={{ y: [0, -10, 0], rotate: [0, -6, 6, 0] }}
                  transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
                  style={{ filter: 'drop-shadow(0 4px 14px rgba(0,0,0,0.45))' }}
                >
                  {theme.emoji}
                </motion.div>

                {/* 에너지 */}
                <div className="flex items-center gap-2">
                  <span className="font-cute text-[10px]" style={{ color: '#70709a' }}>에너지</span>
                  <div className="flex gap-1">
                    {[1,2,3,4,5].map(i => (
                      <div key={i} className="rounded-full"
                        style={{
                          width: 7, height: 7,
                          background: i <= fortune.energyLevel ? accent : 'rgba(255,255,255,0.14)',
                          boxShadow: i <= fortune.energyLevel ? `0 0 6px ${accent}88` : 'none',
                          transition: 'background 0.3s',
                        }} />
                    ))}
                  </div>
                </div>

                {/* 운세 미리보기 */}
                <p className="font-serif-ele text-[11px] italic text-center leading-snug px-2"
                  style={{ color: 'rgba(255,255,255,0.48)' }}>
                  {fortune.fortuneMsg.length > 44
                    ? fortune.fortuneMsg.slice(0, 44) + '…'
                    : fortune.fortuneMsg}
                </p>
              </div>

              {/* ── 하단: 탭 프롬프트 ── */}
              <div className="flex-shrink-0 flex items-center justify-center gap-2 pb-5 pt-1">
                <span className="block h-px w-8" style={{ background: accentColor, opacity: 0.22 }} />
                <motion.p
                  className="font-cute text-[11px]"
                  style={{ color: '#70709a' }}
                  animate={{ opacity: [0.6, 1, 0.6] }}
                  transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
                >
                  탭해서 오늘의 운세 확인하기
                </motion.p>
                <span className="block h-px w-8" style={{ background: accentColor, opacity: 0.22 }} />
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
