'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { getPersona, getTherapyState } from '@/lib/persona-data'
import { saveFortuneEntry, todayStr } from '@/lib/history'
import type { DesignerFortune } from '@/lib/fortune-data'
import type { PersonaKey } from '@/types/persona'

/* ── 포커 딜 variants — 각 섹션이 중앙에서 날아오며 정착 ── */
const DEAL_ORIGINS = [
  { x: -60, y: -40, rotate: -8 },   // 운세 메시지 — 좌상
  { x:  60, y: -30, rotate:  7 },   // 팔레트       — 우상
  { x: -50, y:  30, rotate: -5 },   // 폰트         — 좌하
  { x:  50, y:  40, rotate:  6 },   // 격언         — 우하
  { x:   0, y: -20, rotate:  0 },   // 액션 버튼    — 중앙위
]

function dealVariant(i: number) {
  const o = DEAL_ORIGINS[i] ?? DEAL_ORIGINS[0]
  return {
    hidden: { opacity: 0, scale: 0.55, x: o.x, y: o.y, rotate: o.rotate },
    show: {
      opacity: 1, scale: 1, x: 0, y: 0, rotate: 0,
      transition: { delay: i * 0.12 + 0.05, duration: 0.45,
        ease: [0.22, 1.2, 0.36, 1] },  // spring-like overshoot
    },
  }
}

/* ── Props ─────────────────────────────────────────────── */
export interface BackProps {
  fortune: DesignerFortune
  persona: PersonaKey
  onReset:    () => void
  onSave:     () => void
  onCopyHex:  (hex: string) => void
  isSaving:   boolean
}

/* ── BackContent ─────────────────────────────────────────── */
export function BackContent({ fortune, persona, onReset, onSave, onCopyHex, isSaving }: BackProps) {
  const [copiedHex, setCopiedHex] = useState<string | null>(null)
  const theme        = getPersona(persona)
  const therapyState = getTherapyState(fortune.energyLevel)
  const accent       = theme.therapy[therapyState].accent
  const textBright   = theme.therapy[therapyState].textBright
  const border       = theme.therapy[therapyState].border
  const dateStr      = new Date().toLocaleDateString('ko-KR', { month: 'long', day: 'numeric', weekday: 'short' })

  /* 히스토리 자동 저장 */
  useEffect(() => {
    saveFortuneEntry({
      date:        todayStr(),
      persona,
      energyLevel: fortune.energyLevel,
      paletteName: fortune.palette.name,
      memeText:    fortune.meme.text,
    })
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const handleCopy = (hex: string) => {
    onCopyHex(hex)
    setCopiedHex(hex)
    setTimeout(() => setCopiedHex(null), 1800)
  }

  const divider = (
    <div className="h-px flex-shrink-0 my-1.5"
      style={{ background: `linear-gradient(to right, transparent, ${border.replace(')', ', 0.5)')}, transparent)` }} />
  )

  return (
    <motion.div className="w-full h-full flex flex-col p-4" initial="hidden" animate="show">

      {/* ── 0: Header ── */}
      <motion.div variants={dealVariant(0)}
        className="flex items-center justify-between mb-1.5 flex-shrink-0">
        <div>
          <p className="font-cute font-700 text-[11px] tracking-wide" style={{ color: textBright }}>
            {theme.emoji} 오늘의 운세
          </p>
          <p className="font-cute text-[10px] mt-0.5" style={{ color: '#70709a' }}>{dateStr}</p>
        </div>
        {/* 에너지 바 */}
        <div className="flex items-center gap-1">
          <span className="font-cute text-[9px]" style={{ color: '#70709a' }}>에너지</span>
          <div className="flex gap-0.5">
            {[1,2,3,4,5].map(i => (
              <div key={i} className="rounded-full transition-all"
                style={{ width: 6, height: i <= fortune.energyLevel ? 6 + i * 2 : 6,
                  background: i <= fortune.energyLevel ? accent : 'rgba(255,255,255,0.12)',
                  alignSelf: 'flex-end' }} />
            ))}
          </div>
        </div>
      </motion.div>

      {/* ── 1: 운세 예감 메시지 ── */}
      <motion.div variants={dealVariant(0)} className="flex-shrink-0 mb-1.5">
        <div className="rounded-lg px-3 py-2.5"
          style={{ background: `${accent}15`, border: `1px solid ${accent}35` }}>
          <p className="font-serif-ele text-sm italic leading-snug" style={{ color: '#f8f8ff' }}>
            {fortune.fortuneMsg}
          </p>
        </div>
      </motion.div>

      {/* ── 밈 ── */}
      <motion.div variants={dealVariant(0)} className="flex-shrink-0 mb-1.5">
        <div className="flex items-center gap-2 rounded-2xl px-3 py-2"
          style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.10)' }}>
          <span className="text-lg flex-shrink-0">{fortune.meme.emoji}</span>
          <p className="font-cute text-xs font-600 leading-snug" style={{ color: '#f8f8ff' }}>
            {fortune.meme.text}
          </p>
        </div>
      </motion.div>

      {divider}

      {/* ── 2: 컬러 팔레트 ── */}
      <motion.div variants={dealVariant(1)} className="flex-shrink-0 mb-1.5">
        <p className="font-cute font-700 text-[10px] tracking-wide uppercase mb-1.5" style={{ color: '#70709a' }}>
          🎨 행운의 팔레트
          <span className="ml-1.5 normal-case tracking-normal font-400 text-[9px]" style={{ opacity: 0.6 }}>— 클릭해서 복사</span>
        </p>
        <div className="flex gap-2 mb-1">
          {fortune.palette.colors.map((sw) => (
            <button key={sw.hex} data-no-export="true"
              onClick={() => handleCopy(sw.hex)}
              className="flex flex-col items-center gap-1 group cursor-pointer"
              aria-label={`${sw.hex} 복사`}>
              <div className="rounded-full swatch-ring relative overflow-hidden"
                style={{ width: 32, height: 32, background: sw.hex }}>
                <AnimatePresence>
                  {copiedHex === sw.hex && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.5 }}
                      className="absolute inset-0 flex items-center justify-center rounded-full"
                      style={{ background: 'rgba(0,0,0,0.55)' }}>
                      <span style={{ fontSize: 12, color: '#fff' }}>✓</span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              <span className="font-mono text-[8px]"
                style={{ color: copiedHex === sw.hex ? textBright : '#70709a' }}>
                {sw.hex.slice(1)}
              </span>
            </button>
          ))}
        </div>
        <p className="font-cute font-700 text-sm" style={{ color: '#f8f8ff' }}>{fortune.palette.name}</p>
        <p className="font-cute text-xs" style={{ color: textBright }}>
          {fortune.palette.mood}
          <span style={{ color: '#70709a' }}>&nbsp;·&nbsp;{fortune.palette.useCase}</span>
        </p>
      </motion.div>

      {divider}

      {/* ── 3: 폰트 페어링 + 럭키 요소 ── */}
      <motion.div variants={dealVariant(2)} className="flex-shrink-0 mb-1.5">
        <div className="flex items-center justify-between gap-2">
          <div className="flex-1">
            <p className="text-[10px] tracking-widest uppercase mb-1" style={{ color: '#70709a' }}>폰트 페어링</p>
            <div className="rounded-lg px-3 py-1.5"
              style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}>
              <div className="flex items-baseline gap-1.5">
                <span className="text-xs font-semibold" style={{ color: '#f8f8ff' }}>{fortune.font.headline}</span>
                <span style={{ color: '#70709a', fontSize: 9 }}>+</span>
                <span className="text-[11px]" style={{ color: '#b4b4d4' }}>{fortune.font.body}</span>
              </div>
              <p className="text-[10px]" style={{ color: textBright }}>{fortune.font.style}</p>
            </div>
          </div>
          <div className="text-center flex-shrink-0">
            <p className="text-[10px] tracking-widest uppercase mb-1" style={{ color: '#70709a' }}>행운 요소</p>
            <div className="rounded-lg px-2.5 py-1.5"
              style={{ background: `${accent}18`, border: `1px solid ${accent}35` }}>
              <p className="text-xs font-medium" style={{ color: textBright }}>{fortune.luckyElement}</p>
            </div>
          </div>
        </div>
      </motion.div>

      {divider}

      {/* ── 4: 격언 ── */}
      <motion.div variants={dealVariant(3)} className="flex-1 flex flex-col min-h-0 mb-1.5">
        <p className="font-cute font-700 text-[10px] tracking-wide uppercase mb-1" style={{ color: '#70709a' }}>💬 오늘의 격언</p>
        <blockquote className="font-serif-ele text-sm italic leading-relaxed flex-1"
          style={{ color: '#f8f8ff' }}>
          <span style={{ color: textBright, fontSize: '1.1rem', lineHeight: 1 }}>"</span>
          {fortune.quote.text.length > 60 ? fortune.quote.text.slice(0, 60) + '…' : fortune.quote.text}
          <span style={{ color: textBright, fontSize: '1.1rem', lineHeight: 1 }}>"</span>
        </blockquote>
        <p className="text-xs text-right" style={{ color: textBright }}>— {fortune.quote.author}</p>
      </motion.div>

      {/* ── 5: 액션 버튼 ── */}
      <motion.div variants={dealVariant(4)} className="flex gap-2 flex-shrink-0" data-no-export="true">
        <button onClick={onSave} disabled={isSaving}
          className="flex-1 py-2 rounded-md text-xs tracking-wide transition-all duration-200 flex items-center justify-center gap-1.5"
          style={{
            background: isSaving ? `${accent}25` : `linear-gradient(135deg, ${accent}40 0%, ${accent}20 100%)`,
            border: `1px solid ${accent}70`,
            color: textBright,
          }}>
          {isSaving ? (
            <><span className="animate-spin inline-block" style={{ fontSize: 11 }}>⟳</span>저장 중…</>
          ) : (
            <>📸 포토카드 저장</>
          )}
        </button>
        <button onClick={onReset}
          className="px-3 py-2 rounded-md text-xs tracking-wide transition-all duration-200"
          style={{ border: '1px solid rgba(255,255,255,0.12)', color: '#70709a', background: 'transparent' }}
          onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.06)')}
          onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
          aria-label="카드 앞면으로">
          ↩
        </button>
      </motion.div>
    </motion.div>
  )
}

export default BackContent
