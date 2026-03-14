'use client'

/**
 * BackContent — FortuneCard 뒷면 컴포넌트
 *
 * 책임: 오늘의 운세 결과 표시 (팔레트 · 폰트 · 격언 · 에너지 레벨)
 * FortuneCard.tsx에서 분리하여 단일 책임 원칙(SRP) 준수.
 *
 * 포함 기능:
 *   - 컬러 팔레트 HEX 복사 (토스트 피드백 포함)
 *   - 폰트 페어링 표시
 *   - 디자이너 격언
 *   - 포토카드 저장 · 앞면으로 되돌리기 버튼
 */

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { generateFortune } from '@/lib/fortune-data'

// ── 섹션 등장 애니메이션 variants ─────────────────────────────────────────
export const SEC = {
  hidden: { opacity: 0, y: 10 },
  show: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.08, duration: 0.3, ease: 'easeOut' },
  }),
}

export interface BackProps {
  fortune: ReturnType<typeof generateFortune>
  onReset: () => void
  onSave: () => void
  onCopyHex: (hex: string) => void
  isSaving: boolean
}

export function BackContent({ fortune, onReset, onSave, onCopyHex, isSaving }: BackProps) {
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

export default BackContent
