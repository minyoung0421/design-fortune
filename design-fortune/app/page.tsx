import FortuneCard from '@/components/FortuneCard'
import StarField from '@/components/StarField'

export default function Home() {
  return (
    <main
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{ background: 'var(--cosmos)' }}
    >

      {/* ── Layer 1: Mystic gradient — 상단 보라빛 네뷸라 ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 110% 55% at 50% -8%, #1e0b40 0%, #0d0030 38%, #030014 68%)',
        }}
      />

      {/* ── Layer 2: Ambient glow blobs ── */}
      {/* Center top blob */}
      <div
        aria-hidden="true"
        className="absolute pointer-events-none rounded-full"
        style={{
          top: -80, left: '50%', transform: 'translateX(-50%)',
          width: 720, height: 500,
          background: 'radial-gradient(circle, rgba(147,51,234,0.28) 0%, rgba(107,33,168,0.12) 50%, transparent 70%)',
          filter: 'blur(40px)',
        }}
      />
      {/* Bottom-left blob */}
      <div
        aria-hidden="true"
        className="absolute pointer-events-none rounded-full"
        style={{
          bottom: -60, left: '15%',
          width: 380, height: 380,
          background: 'radial-gradient(circle, rgba(99,102,241,0.20) 0%, transparent 65%)',
          filter: 'blur(50px)',
        }}
      />
      {/* Right blob */}
      <div
        aria-hidden="true"
        className="absolute pointer-events-none rounded-full"
        style={{
          top: '40%', right: '-5%',
          width: 300, height: 300,
          background: 'radial-gradient(circle, rgba(168,85,247,0.14) 0%, transparent 65%)',
          filter: 'blur(45px)',
        }}
      />

      {/* ── Layer 3: Floating dust particles ── */}
      {[
        { w: 2, h: 2, top: '15%', left: '20%', delay: '0s',   dur: '18s' },
        { w: 3, h: 3, top: '30%', left: '75%', delay: '3s',   dur: '22s' },
        { w: 2, h: 2, top: '55%', left: '10%', delay: '6s',   dur: '16s' },
        { w: 4, h: 4, top: '70%', left: '85%', delay: '1.5s', dur: '25s' },
        { w: 2, h: 2, top: '82%', left: '35%', delay: '9s',   dur: '20s' },
        { w: 3, h: 3, top: '12%', left: '60%', delay: '4s',   dur: '19s' },
      ].map((p, i) => (
        <div
          key={i}
          aria-hidden="true"
          className="absolute pointer-events-none rounded-full animate-drift"
          style={{
            width: p.w, height: p.h,
            top: p.top, left: p.left,
            background: 'var(--ink-bright)',
            opacity: 0.25,
            animationDelay: p.delay,
            animationDuration: p.dur,
          }}
        />
      ))}

      {/* ── Layer 4: Star canvas ── */}
      <StarField />

      {/* ── Main Content ── */}
      <div className="relative z-10 flex flex-col items-center gap-10 px-4 py-16 w-full max-w-lg mx-auto">

        {/* Header */}
        <header className="text-center">
          <p
            className="font-display text-xs tracking-[0.35em] uppercase mb-4"
            style={{ color: 'var(--ink-bright)' }}
          >
            ✦ &nbsp; Design Fortune &nbsp; ✦
          </p>
          <h1
            className="font-serif-ele leading-tight mb-3"
            style={{ fontSize: '3.25rem', color: 'var(--ink)' }}
          >
            오늘의<br />
            <span className="text-glow" style={{ color: 'var(--ink)' }}>
              디자인 운세
            </span>
          </h1>
          <p className="text-sm leading-relaxed" style={{ color: 'var(--ink-soft)' }}>
            매일 새로운 영감으로{' '}
            <span style={{ color: 'var(--ink-faint)' }}>디자이너의 하루를 열어드립니다</span>
          </p>
        </header>

        {/* Fortune Card */}
        <FortuneCard />

        {/* Footer */}
        <p className="text-xs tracking-wider text-center" style={{ color: 'var(--ink-faint)' }}>
          운세는 매일 자정에 갱신됩니다
        </p>
      </div>

      {/* ── Bottom fade ── */}
      <div
        className="absolute bottom-0 left-0 right-0 h-28 pointer-events-none"
        style={{ background: 'linear-gradient(to top, var(--cosmos), transparent)' }}
      />
    </main>
  )
}
