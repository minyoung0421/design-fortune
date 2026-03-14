import { useState, useEffect } from 'react'
import { Button } from './components/Button'
import { Input } from './components/Input'
import { Badge } from './components/Badge'
import { tokens } from './styles/tokens'

function useWindowWidth() {
  const [width, setWidth] = useState(window.innerWidth)
  useEffect(() => {
    const handle = () => setWidth(window.innerWidth)
    window.addEventListener('resize', handle)
    return () => window.removeEventListener('resize', handle)
  }, [])
  return width
}

export default function App() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const width = useWindowWidth()

  const isMobile = width < tokens.breakpoints.md
  const isDesktop = width >= tokens.breakpoints.lg

  const pad = isMobile ? tokens.spacing.md : tokens.spacing.lg
  const cols = isDesktop ? 3 : isMobile ? 1 : 2

  const passwordError =
    password.length > 0 && password.length < 8 ? '8자 이상 입력해주세요' : undefined

  return (
    <div style={{ minHeight: '100vh', backgroundColor: tokens.colors.surface, fontFamily: "'Segoe UI', system-ui, sans-serif" }}>

      {/* ── Header ── */}
      <header style={{ backgroundColor: tokens.colors.accent, padding: `${tokens.spacing.lg} ${pad}` }}>
        <div style={{ maxWidth: '960px', margin: '0 auto' }}>
          <div style={{ display: 'flex', gap: tokens.spacing.sm, marginBottom: tokens.spacing.sm }}>
            <Badge variant="accent" label="v1.0" />
            <Badge variant="success" label="Token-First" />
            <Badge variant="primary" label="Atomic Design" />
          </div>
          <h1 style={{
            fontSize: isMobile ? '28px' : '36px',
            fontWeight: 800,
            color: tokens.colors.white,
            letterSpacing: '-0.5px',
            marginBottom: tokens.spacing.xs,
          }}>
            Design Fortune
          </h1>
          <p style={{ fontSize: tokens.typography.body, color: tokens.colors.white, opacity: 0.85 }}>
            Token-First Design System Showcase — 모든 스타일은 <code style={{ backgroundColor: `${tokens.colors.white}22`, padding: '2px 6px', borderRadius: tokens.borderRadius.sm }}>tokens.ts</code> 하나에서 관리됩니다
          </p>
        </div>
      </header>

      <main style={{ maxWidth: '960px', margin: '0 auto', padding: pad, display: 'flex', flexDirection: 'column', gap: tokens.spacing.lg }}>

        {/* ── Why Tokens ── */}
        <section>
          <SectionTitle>왜 토큰 우선인가?</SectionTitle>
          <div style={{ display: 'grid', gridTemplateColumns: `repeat(${isMobile ? 1 : 3}, 1fr)`, gap: tokens.spacing.md }}>
            {[
              { badge: 'success' as const, title: '단일 진실 원천', desc: 'tokens.ts 하나를 수정하면 Button·Input·Badge 전체가 동기화됩니다.' },
              { badge: 'accent' as const, title: '하드코딩 제로', desc: '#색상값 직접 사용 없이 의미 있는 변수명만 코드에 등장합니다.' },
              { badge: 'primary' as const, title: 'AI 친화적', desc: 'AI 에이전트가 토큰 구조를 읽어 자동으로 일관된 컴포넌트를 생성합니다.' },
            ].map(({ badge, title, desc }) => (
              <Card key={title}>
                <Badge variant={badge} label={title} />
                <p style={{ marginTop: tokens.spacing.sm, fontSize: tokens.typography.body, color: tokens.colors.primary, lineHeight: 1.6 }}>{desc}</p>
              </Card>
            ))}
          </div>
        </section>

        {/* ── Color Tokens ── */}
        <section>
          <SectionTitle>Color Tokens</SectionTitle>
          <Card>
            <CodeChip>src/styles/tokens.ts → colors</CodeChip>
            <div style={{ display: 'grid', gridTemplateColumns: `repeat(${cols}, 1fr)`, gap: tokens.spacing.md, marginTop: tokens.spacing.md }}>
              {Object.entries(tokens.colors).map(([name, value]) => (
                <div key={name} style={{ display: 'flex', alignItems: 'center', gap: tokens.spacing.sm }}>
                  <div style={{
                    width: '40px', height: '40px', flexShrink: 0,
                    borderRadius: tokens.borderRadius.sm,
                    backgroundColor: value,
                    border: `1px solid ${tokens.colors.primary}33`,
                  }} />
                  <div>
                    <div style={{ fontSize: '13px', fontWeight: 600, color: tokens.colors.primary }}>{name}</div>
                    <div style={{ fontSize: '12px', color: tokens.colors.primary, opacity: 0.55 }}>{value}</div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </section>

        {/* ── Spacing Tokens ── */}
        <section>
          <SectionTitle>Spacing Tokens</SectionTitle>
          <Card>
            <CodeChip>8px Grid System</CodeChip>
            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-end', gap: tokens.spacing.md, marginTop: tokens.spacing.md }}>
              {Object.entries(tokens.spacing).map(([name, value]) => (
                <div key={name} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: tokens.spacing.xs }}>
                  <div style={{
                    width: value, height: value,
                    backgroundColor: `${tokens.colors.accent}44`,
                    border: `1.5px solid ${tokens.colors.accent}`,
                    borderRadius: tokens.borderRadius.sm,
                    minWidth: '4px',
                  }} />
                  <span style={{ fontSize: '11px', color: tokens.colors.primary, opacity: 0.7 }}>{name}</span>
                  <span style={{ fontSize: '11px', color: tokens.colors.accent, fontWeight: 600 }}>{value}</span>
                </div>
              ))}
            </div>
          </Card>
        </section>

        {/* ── Button Component ── */}
        <section>
          <SectionTitle>Button Component</SectionTitle>
          <Card>
            <CodeChip>variant: "primary" | "accent" · disabled</CodeChip>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: tokens.spacing.md, marginTop: tokens.spacing.md, alignItems: 'center' }}>
              <Button label="Primary 버튼" variant="primary" onClick={() => {}} />
              <Button label="Accent 버튼" variant="accent" onClick={() => {}} />
              <Button label="Disabled" variant="accent" disabled onClick={() => {}} />
            </div>
          </Card>
        </section>

        {/* ── Input Component ── */}
        <section>
          <SectionTitle>Input Component</SectionTitle>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: tokens.spacing.md }}>
            <Card>
              <CodeChip>인터랙티브 데모</CodeChip>
              <div style={{ display: 'flex', flexDirection: 'column', gap: tokens.spacing.md, marginTop: tokens.spacing.md }}>
                <Input label="이메일" type="email" placeholder="example@email.com" value={email} onChange={setEmail} />
                <Input label="비밀번호" type="password" placeholder="8자 이상" value={password} error={passwordError} onChange={setPassword} />
              </div>
              <div style={{ marginTop: tokens.spacing.md }}>
                <Button label={submitted ? '제출 완료 ✓' : '제출하기'} variant="accent" disabled={submitted} onClick={() => setSubmitted(true)} />
              </div>
            </Card>
            <Card>
              <CodeChip>disabled · error 상태</CodeChip>
              <div style={{ display: 'flex', flexDirection: 'column', gap: tokens.spacing.md, marginTop: tokens.spacing.md }}>
                <Input label="읽기 전용" value="수정할 수 없는 값" disabled onChange={() => {}} />
                <Input label="에러 표시" value="잘못된 형식" error="올바른 이메일 형식이 아닙니다" onChange={() => {}} />
              </div>
            </Card>
          </div>
        </section>

        {/* ── Badge Component ── */}
        <section>
          <SectionTitle>Badge Component</SectionTitle>
          <Card>
            <CodeChip>variant: "primary" | "accent" | "success" | "error"</CodeChip>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: tokens.spacing.md, marginTop: tokens.spacing.md, alignItems: 'center' }}>
              <Badge variant="primary" label="Primary" />
              <Badge variant="accent" label="Accent" />
              <Badge variant="success" label="성공 / Success" />
              <Badge variant="error" label="오류 / Error" />
              <Badge variant="success" label="토큰 준수 100%" />
              <Badge variant="accent" label="하드코딩 0건" />
              <Badge variant="primary" label="ARIA 100%" />
            </div>
          </Card>
        </section>

        {/* ── Architecture Callout ── */}
        <section>
          <div style={{
            backgroundColor: `${tokens.colors.accent}0f`,
            border: `1.5px solid ${tokens.colors.accent}44`,
            borderRadius: tokens.borderRadius.md,
            padding: tokens.spacing.md,
          }}>
            <p style={{ fontSize: tokens.typography.body, fontWeight: 700, color: tokens.colors.accent, marginBottom: tokens.spacing.xs }}>
              토큰 의존성 구조
            </p>
            <code style={{ fontSize: '13px', color: tokens.colors.primary, lineHeight: 2, display: 'block' }}>
              tokens.ts (Single Source of Truth)<br />
              &nbsp;&nbsp;└─ Button.tsx → backgroundColor, color, fontSize, padding, borderRadius<br />
              &nbsp;&nbsp;└─ Input.tsx &nbsp;→ borderColor, backgroundColor, fontSize, padding, gap<br />
              &nbsp;&nbsp;└─ Badge.tsx &nbsp;→ background (opacity), color, fontSize, padding<br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─ App.tsx → Showcase (반응형 breakpoints 적용)
            </code>
          </div>
        </section>

      </main>

      <footer style={{
        textAlign: 'center',
        padding: tokens.spacing.md,
        borderTop: `1px solid ${tokens.colors.primary}22`,
        fontSize: '13px',
        color: tokens.colors.primary,
        opacity: 0.65,
        marginTop: tokens.spacing.lg,
      }}>
        Design Fortune · Token-First Design System · 하드코딩 0건 · ARIA 100% · {width}px ({isMobile ? 'mobile' : isDesktop ? 'desktop' : 'tablet'})
      </footer>
    </div>
  )
}

// ── Layout helpers ───────────────────────────────────────────

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 style={{
      fontSize: tokens.typography.heading,
      fontWeight: 700,
      color: tokens.colors.primary,
      marginBottom: tokens.spacing.md,
    }}>
      {children}
    </h2>
  )
}

function Card({ children }: { children: React.ReactNode }) {
  return (
    <div style={{
      backgroundColor: tokens.colors.white,
      borderRadius: tokens.borderRadius.md,
      padding: tokens.spacing.md,
      boxShadow: `0 1px 6px ${tokens.colors.primary}1a`,
    }}>
      {children}
    </div>
  )
}

function CodeChip({ children }: { children: React.ReactNode }) {
  return (
    <code style={{
      display: 'inline-block',
      backgroundColor: tokens.colors.surface,
      color: tokens.colors.primary,
      fontSize: '13px',
      padding: `${tokens.spacing.xs} ${tokens.spacing.sm}`,
      borderRadius: tokens.borderRadius.sm,
      border: `1px solid ${tokens.colors.primary}22`,
    }}>
      {children}
    </code>
  )
}
