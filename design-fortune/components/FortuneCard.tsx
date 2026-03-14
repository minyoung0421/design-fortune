'use client'

import { useState, useMemo, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { generateFortune } from '@/lib/fortune-data'

/* ────────────────────────────────────────────────────────
   Toast
──────────────────────────────────────────────────────── */
function Toast({ msg }: { msg: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16, scale: 0.92 }}
      animate={{ opacity: 1, y: 0,  scale: 1 }}
      exit={{    opacity: 0, y: -10, scale: 0.92 }}
      transition={{ duration: 0.22, ease: 'easeOut' }}
      className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 pointer-events-none"
    >
      <div
        className="glass rounded-full px-5 py-2.5 text-sm font-medium whitespace-nowrap"
        style={{
          color: 'var(--ink)',
          border: '1px solid rgba(168,85,247,0.45)',
          boxShadow: '0 8px 32px rgba(0,0,0,0.5), 0 0 20px rgba(168,85,247,0.25)',
        }}
      >
        {msg}
      </div>
    </motion.div>
  )
}

/* ────────────────────────────────────────────────────────
   Crystal Ball (7-layer)
──────────────────────────────────────────────────────── */
function CrystalBall() {
  return (
    <div className="relative flex items-center justify-center select-none">
      {/* L1 — outer pulse glow */}
      <div
        className="absolute rounded-full animate-pulse-glow pointer-events-none"
        style={{
          width: 260, height: 260,
          background: 'radial-gradient(circle, rgba(168,85,247,0.28) 0%, rgba(107,33,168,0.12) 48%, transparent 70%)',
        }}
      />
      {/* L2 — mid haze */}
      <div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: 200, height: 200,
          background: 'radial-gradient(circle, rgba(147,51,234,0.18) 0%, transparent 65%)',
          filter: 'blur(8px)',
        }}
      />
      {/* L3 — main sphere */}
      <div
        className="relative rounded-full shadow-orb animate-float"
        style={{
          width: 168, height: 168,
          background:
            'radial-gradient(circle at 32% 27%, ' +
            'rgba(255,255,255,0.62) 0%, rgba(220,165,255,0.92) 10%, ' +
            'rgba(168,85,247,0.88) 28%, rgba(109,40,217,0.93) 52%, ' +
            'rgba(76,29,149,0.97) 72%, rgba(10,2,38,1) 100%)',
        }}
      >
        {/* L4 — rotating nebula */}
        <div
          className="absolute rounded-full animate-spin-slow pointer-events-none"
          style={{
            inset: 22, filter: 'blur(10px)', opacity: 0.60,
            background:
              'conic-gradient(from 0deg, rgba(168,85,247,1), rgba(99,102,241,0.5), ' +
              'rgba(216,180,254,0.85), rgba(139,92,246,0.6), rgba(168,85,247,1))',
          }}
        />
        {/* L5 — primary highlight */}
        <div
          className="absolute pointer-events-none"
          style={{ top: 12, left: 18, width: 46, height: 30, borderRadius: '50%',
            background: 'rgba(255,255,255,0.52)', filter: 'blur(8px)' }}
        />
        {/* L6 — specular point */}
        <div
          className="absolute pointer-events-none"
          style={{ top: 18, left: 28, width: 16, height: 10, borderRadius: '50%',
            background: 'rgba(255,255,255,0.90)', filter: 'blur(3px)' }}
        />
        {/* L7 — rim light */}
        <div
          className="absolute pointer-events-none"
          style={{ bottom: 14, right: 16, width: 28, height: 12, borderRadius: '50%',
            background: 'rgba(216,180,254,0.50)', filter: 'blur(7px)' }}
        />
      </div>
    </div>
  )
}

/* ────────────────────────────────────────────────────────
   Sparkles
──────────────────────────────────────────────────────── */
const SPARKLES = [
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
function Sparkles() {
  return (
    <>
      {SPARKLES.map(({ size, delay, ...pos }, i) => (
        <div
          key={i}
          className={`absolute rounded-full pointer-events-none ${i % 2 === 0 ? 'animate-twinkle' : 'animate-twinkle-alt'}`}
          style={{
            ...(pos as React.CSSProperties),
            width: size, height: size,
            background: 'var(--ink-bright)',
            animationDelay: `${delay}s`,
          }}
        />
      ))}
    </>
  )
}

/* ────────────────────────────────────────────────────────
   Back-face content
──────────────────────────────────────────────────────── */
const SEC = {
  hidden: { opacity: 0, y: 10 },
  show: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.08, duration: 0.3, ease: 'easeOut' },
  }),
}

interface BackProps {
  fortune: ReturnType<typeof generateFortune>
  onReset: () => void
  onSave: () => void
  onCopyHex: (hex: string) => void
  isSaving: boolean
}

function BackContent({ fortune, onReset, onSave, onCopyHex, isSaving }: BackProps) {
  const [copiedHex, setCopiedHex] = useState<string | null>(null)
  const dateStr = new Date().toLocaleDateString('ko-KR', { month: 'long', day: 'numeric', weekday: 'short' })

  const handleCopy = (hex: string) => {
    onCopyHex(hex)
    setCopiedHex(hex)
    setTimeout(() => setCopiedHex(null), 1800)
  }

  return (
    <motion.div className="w-full h-full flex flex-col p-5" initial="hidden" animate="show">

      {/* ── Header ── */}
      <motion.div custom={0} variants={SEC} className="flex items-start justify-between mb-2 flex-shrink-0">
        <div>
          <p className="font-display text-[10px] tracking-[0.22em]" style={{ color: 'var(--ink-bright)' }}>
            TODAY'S FORTUNE
          </p>
          <p className="text-[11px] mt-0.5" style={{ color: 'var(--ink-faint)' }}>{dateStr}</p>
        </div>
        <div className="flex gap-0.5 mt-0.5">
          {[...Array(5)].map((_, i) => (
            <span key={i} className="text-xs"
              style={{ color: i < fortune.energyLevel ? 'var(--gold)' : 'var(--ink-faint)' }}>✦</span>
          ))}
        </div>
      </motion.div>

      {/* ── 오늘의 고충 밈 ── */}
      <motion.div custom={0.6} variants={SEC} className="flex-shrink-0 mb-2">
        <div
          className="flex items-center gap-2 rounded-lg px-3 py-2"
          style={{
            background: 'rgba(168,85,247,0.08)',
            border: '1px solid rgba(168,85,247,0.18)',
          }}
        >
          <span style={{ fontSize: 15 }}>{fortune.meme.emoji}</span>
          <p className="text-xs leading-snug" style={{ color: 'var(--ink-soft)' }}>
            {fortune.meme.text}
          </p>
        </div>
      </motion.div>

      <motion.div custom={1} variants={SEC}
        className="h-px flex-shrink-0 mb-2"
        style={{ background: 'rgba(168,85,247,0.18)' }}
      />

      {/* ── 컬러 팔레트 ── */}
      <motion.div custom={1.5} variants={SEC} className="flex-shrink-0 mb-2">
        <p className="text-[10px] tracking-widest uppercase mb-2" style={{ color: 'var(--ink-faint)' }}>
          행운의 컬러 팔레트
          <span className="ml-2 normal-case tracking-normal" style={{ color: 'var(--ink-faint)', opacity: 0.7 }}>
            — 클릭해서 HEX 복사
          </span>
        </p>
        <div className="flex gap-2 mb-1.5">
          {fortune.palette.colors.map((sw) => (
            <button
              key={sw.hex}
              data-no-export="true"
              onClick={() => handleCopy(sw.hex)}
              className="flex flex-col items-center gap-1 group relative cursor-pointer"
              aria-label={`${sw.hex} 복사`}
            >
              <div
                className="rounded-full swatch-ring relative overflow-hidden"
                style={{ width: 34, height: 34, background: sw.hex }}
              >
                {/* Copied checkmark overlay */}
                <AnimatePresence>
                  {copiedHex === sw.hex && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.5 }}
                      className="absolute inset-0 flex items-center justify-center rounded-full"
                      style={{ background: 'rgba(0,0,0,0.55)' }}
                    >
                      <span style={{ fontSize: 14, color: '#fff' }}>✓</span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              <span
                className="font-mono text-[8px] transition-colors"
                style={{ color: copiedHex === sw.hex ? 'var(--ink-bright)' : 'var(--ink-faint)' }}
              >
                {sw.hex.slice(1)}
              </span>
            </button>
          ))}
        </div>
        <p className="text-sm font-medium" style={{ color: 'var(--ink)' }}>{fortune.palette.name}</p>
        <p className="text-xs" style={{ color: 'var(--ink-bright)' }}>
          {fortune.palette.mood}
          <span style={{ color: 'var(--ink-faint)' }}>&nbsp;·&nbsp;{fortune.palette.useCase}</span>
        </p>
      </motion.div>

      <motion.div custom={2} variants={SEC}
        className="h-px flex-shrink-0 mb-2"
        style={{ background: 'rgba(168,85,247,0.18)' }}
      />

      {/* ── 폰트 페어링 ── */}
      <motion.div custom={2.5} variants={SEC} className="flex-shrink-0 mb-2">
        <p className="text-[10px] tracking-widest uppercase mb-1.5" style={{ color: 'var(--ink-faint)' }}>
          오늘의 폰트 페어링
        </p>
        <div className="glass rounded-lg px-3.5 py-2 mb-1">
          <div className="flex items-baseline gap-2">
            <span className="text-sm font-semibold" style={{ color: 'var(--ink)' }}>{fortune.font.headline}</span>
            <span style={{ color: 'var(--ink-faint)', fontSize: 10 }}>+</span>
            <span className="text-xs" style={{ color: 'var(--ink-soft)' }}>{fortune.font.body}</span>
          </div>
          <p className="text-[10px] mt-0.5" style={{ color: 'var(--ink-bright)' }}>
            {fortune.font.style}
          </p>
        </div>
        <p className="text-[10px]" style={{ color: 'var(--ink-faint)' }}>
          {fortune.palette.mood} 무드와 어울리는 조합
        </p>
      </motion.div>

      <motion.div custom={3} variants={SEC}
        className="h-px flex-shrink-0 mb-2"
        style={{ background: 'rgba(168,85,247,0.18)' }}
      />

      {/* ── 격언 ── */}
      <motion.div custom={3.5} variants={SEC} className="flex-1 flex flex-col min-h-0">
        <p className="text-[10px] tracking-widest uppercase mb-1.5" style={{ color: 'var(--ink-faint)' }}>
          오늘의 격언
        </p>
        <blockquote
          className="font-serif-ele text-sm italic leading-relaxed flex-1"
          style={{ color: 'var(--ink)' }}
        >
          <span style={{ color: 'var(--ink-bright)', fontSize: '1.2rem', lineHeight: 1 }}>"</span>
          {fortune.quote.text.length > 55 ? fortune.quote.text.slice(0, 55) + '…' : fortune.quote.text}
          <span style={{ color: 'var(--ink-bright)', fontSize: '1.2rem', lineHeight: 1 }}>"</span>
        </blockquote>
        <p className="text-xs text-right mb-2" style={{ color: 'var(--ink-bright)' }}>
          — {fortune.quote.author}
        </p>
      </motion.div>

      {/* ── 버튼 영역 ── */}
      <motion.div custom={4} variants={SEC} className="flex gap-2 flex-shrink-0" data-no-export="true">
        {/* 포토카드 저장 */}
        <button
          onClick={onSave}
          disabled={isSaving}
          className="flex-1 py-2 rounded-md text-xs tracking-wide transition-all duration-200 flex items-center justify-center gap-1.5"
          style={{
            background: isSaving
              ? 'rgba(168,85,247,0.15)'
              : 'linear-gradient(135deg, rgba(168,85,247,0.25) 0%, rgba(139,92,246,0.15) 100%)',
            border: '1px solid rgba(168,85,247,0.45)',
            color: 'var(--ink-bright)',
          }}
        >
          {isSaving ? (
            <>
              <span className="animate-spin inline-block" style={{ fontSize: 11 }}>⟳</span>
              저장 중…
            </>
          ) : (
            <>📸 포토카드로 저장</>
          )}
        </button>
        {/* 다시 보기 */}
        <button
          onClick={onReset}
          className="px-3 py-2 rounded-md text-xs tracking-wide transition-all duration-200"
          style={{
            border: '1px solid rgba(168,85,247,0.25)',
            color: 'var(--ink-faint)',
            background: 'transparent',
          }}
          onMouseEnter={e => (e.currentTarget.style.background = 'rgba(168,85,247,0.08)')}
          onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
          aria-label="카드 앞면으로"
        >
          ↩
        </button>
      </motion.div>
    </motion.div>
  )
}

/* ────────────────────────────────────────────────────────
   Main Component
──────────────────────────────────────────────────────── */
export default function FortuneCard() {
  const [isFlipped, setIsFlipped]   = useState(false)
  const [showBack, setShowBack]     = useState(false)
  const [isSaving, setIsSaving]     = useState(false)
  const [toastMsg, setToastMsg]     = useState<string | null>(null)
  const toastTimer                  = useRef<ReturnType<typeof setTimeout>>()
  const cardBackRef                 = useRef<HTMLDivElement>(null)

  const fortune = useMemo(() => generateFortune(), [])

  /* Toast helper */
  const showToast = useCallback((msg: string) => {
    clearTimeout(toastTimer.current)
    setToastMsg(msg)
    toastTimer.current = setTimeout(() => setToastMsg(null), 2400)
  }, [])

  /* Copy hex to clipboard */
  const handleCopyHex = useCallback(async (hex: string) => {
    try {
      await navigator.clipboard.writeText(hex)
      showToast(`✓ ${hex} 복사 완료!`)
    } catch {
      showToast('복사에 실패했습니다')
    }
  }, [showToast])

  /* Save card as PNG via html2canvas */
  const handleSave = useCallback(async () => {
    if (!cardBackRef.current || isSaving) return
    setIsSaving(true)

    const el = cardBackRef.current
    /* Override glassmorphism for clean capture */
    const prevBg       = el.style.background
    const prevBd       = el.style.backdropFilter
    const prevWkBd     = (el.style as CSSStyleDeclaration & { webkitBackdropFilter: string }).webkitBackdropFilter
    const prevBorder   = el.style.border

    el.style.background       = 'linear-gradient(145deg, #1e0b40 0%, #0e0035 40%, #050018 75%, #030014 100%)'
    el.style.backdropFilter   = 'none'
    ;(el.style as CSSStyleDeclaration & { webkitBackdropFilter: string }).webkitBackdropFilter = 'none'
    el.style.border           = '1px solid rgba(168,85,247,0.40)'

    try {
      const { default: html2canvas } = await import('html2canvas')
      const canvas = await html2canvas(el, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: null,
        ignoreElements: (node) => node.hasAttribute('data-no-export'),
      })

      const link        = document.createElement('a')
      const dateStamp   = new Date().toISOString().slice(0, 10)
      link.download     = `design-fortune-${dateStamp}.png`
      link.href         = canvas.toDataURL('image/png')
      link.click()
      showToast('✨ 포토카드가 저장되었습니다!')
    } catch {
      showToast('저장 중 오류가 발생했습니다')
    } finally {
      el.style.background       = prevBg
      el.style.backdropFilter   = prevBd
      ;(el.style as CSSStyleDeclaration & { webkitBackdropFilter: string }).webkitBackdropFilter = prevWkBd
      el.style.border           = prevBorder
      setIsSaving(false)
    }
  }, [isSaving, showToast])

  /* Flip handlers */
  const handleFlip  = () => { if (!isFlipped) setIsFlipped(true) }
  const handleReset = () => { setShowBack(false); setIsFlipped(false) }

  return (
    <>
      {/* Global toast */}
      <AnimatePresence>
        {toastMsg && <Toast key="toast" msg={toastMsg} />}
      </AnimatePresence>

      <div
        className="relative w-full max-w-[90vw] md:max-w-[360px] h-[590px]"
        style={{ perspective: '1400px' }}
      >
        <motion.div
          className="relative w-full h-full preserve-3d"
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{ duration: 0.85, ease: [0.60, 0.04, 0.02, 0.92] }}
          onAnimationComplete={() => setShowBack(isFlipped)}
        >

          {/* ══ FRONT — 수정구슬 ══ */}
          <div className="absolute inset-0 backface-hidden">
            <div
              className="glass-card rounded-2xl w-full h-full flex flex-col items-center justify-center gap-8 cursor-pointer select-none relative overflow-hidden"
              onClick={handleFlip}
              role="button"
              aria-label="클릭하여 오늘의 디자인 운세 보기"
            >
              <Sparkles />
              <div
                className="absolute inset-0 rounded-2xl pointer-events-none"
                style={{ background: 'linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.04) 50%, transparent 70%)' }}
              />
              <CrystalBall />

              <div className="text-center z-10 px-8" style={{ marginTop: -8 }}>
                <p className="font-display text-xs tracking-[0.28em] mb-2" style={{ color: 'var(--ink-bright)' }}>
                  DESIGN FORTUNE
                </p>
                <p className="font-serif-ele text-2xl mb-3" style={{ color: 'var(--ink)' }}>
                  오늘의 디자인 운세
                </p>
                <div className="flex items-center gap-2 justify-center">
                  <span className="block h-px w-10" style={{ background: 'var(--ink-bright)', opacity: 0.28 }} />
                  <p className="text-xs tracking-widest" style={{ color: 'var(--ink-faint)' }}>
                    수정구슬을 클릭하세요
                  </p>
                  <span className="block h-px w-10" style={{ background: 'var(--ink-bright)', opacity: 0.28 }} />
                </div>
              </div>

              <div
                className="absolute bottom-0 left-0 right-0 h-px"
                style={{ background: 'linear-gradient(to right, transparent, rgba(168,85,247,0.55), transparent)' }}
              />
            </div>
          </div>

          {/* ══ BACK — 운세 결과 ══ */}
          <div
            className="absolute inset-0 backface-hidden"
            style={{ transform: 'rotateY(180deg)' }}
          >
            <div
              ref={cardBackRef}
              className="glass-card rounded-2xl w-full h-full overflow-hidden"
            >
              <AnimatePresence>
                {showBack && (
                  <BackContent
                    fortune={fortune}
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
