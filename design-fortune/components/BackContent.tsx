'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { getPersona, getTherapyState } from '@/lib/persona-data'
import { saveFortuneEntry, todayStr } from '@/lib/history'
import type { DesignerFortune } from '@/lib/fortune-data'
import type { PersonaKey } from '@/types/persona'

/* ── 캐스케이드 리빌 variants — 아래에서 부드럽게 올라오며 정착 ── */
function dealVariant(i: number) {
  return {
    hidden: { opacity: 0, y: 18, scale: 0.97 },
    show: {
      opacity: 1, y: 0, scale: 1,
      transition: { delay: i * 0.10 + 0.06, duration: 0.40,
        ease: [0.22, 1, 0.36, 1] },
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
    <motion.div className="w-full h-full flex flex-col" initial="hidden" animate="show">

      {/* ── 상단 팔레트 컬러 스트립 ── */}
      <div className="flex flex-shrink-0 overflow-hidden" style={{ height: 7, borderRadius: '1rem 1rem 0 0' }}>
        {fortune.palette.colors.map((sw) => (
          <div key={sw.hex} className="flex-1" style={{ background: sw.hex }} />
        ))}
      </div>

      {/* ── 나머지 콘텐츠 (패딩 적용) ── */}
      <div className="flex flex-col flex-1 p-4 min-h-0 overflow-hidden relative">

      {/* ── 글로우 플래시 — 카드 뒤집힐 때 한 번 빛남 ── */}
      <motion.div
        className="absolute inset-0 rounded-2xl pointer-events-none z-20"
        initial={{ opacity: 0.55 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 0.55, ease: 'easeOut' }}
        style={{ background: `radial-gradient(ellipse at 50% 40%, ${accent}55 0%, ${accent}18 55%, transparent 75%)` }}
      />

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
        <div className="flex gap-1.5 mb-1.5">
          {fortune.palette.colors.map((sw) => (
            <button key={sw.hex} data-no-export="true"
              onClick={() => handleCopy(sw.hex)}
              className="flex-1 flex flex-col items-center gap-1 cursor-pointer group"
              aria-label={`${sw.hex} 복사`}>
              <div className="w-full rounded-xl relative overflow-hidden"
                style={{ height: 46, background: sw.hex,
                  boxShadow: '0 3px 10px rgba(0,0,0,0.35)',
                  transition: 'transform 0.18s ease, box-shadow 0.18s ease',
                }}>
                <div className="absolute inset-0 pointer-events-none"
                  style={{ background: 'linear-gradient(to bottom, rgba(255,255,255,0.22) 0%, transparent 55%)' }} />
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                  style={{ background: 'rgba(0,0,0,0.25)' }}>
                  <span style={{ fontSize: 11, color: '#fff' }}>copy</span>
                </div>
                <AnimatePresence>
                  {copiedHex === sw.hex && (
                    <motion.div
                      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                      className="absolute inset-0 flex items-center justify-center rounded-xl"
                      style={{ background: 'rgba(0,0,0,0.50)' }}>
                      <span style={{ fontSize: 15, color: '#fff' }}>✓</span>
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
      <motion.div variants={dealVariant(4)} className="flex gap-2 flex-shrink-0 mt-auto" data-no-export="true">
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

      </div>{/* end padded content */}
    </motion.div>
  )
}

export default BackContent
