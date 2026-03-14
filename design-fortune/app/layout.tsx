import type { Metadata, Viewport } from 'next'
import { Cinzel_Decorative, Cormorant_Garamond, Inter } from 'next/font/google'
import './globals.css'

/* ── next/font/google 사용 — @import 없이 폰트 로드 ── */
const cinzel = Cinzel_Decorative({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-cinzel',
  display: 'swap',
})
const cormorant = Cormorant_Garamond({
  weight: ['300', '400', '600'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  variable: '--font-cormorant',
  display: 'swap',
})
const inter = Inter({
  weight: ['300', '400', '500'],
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

export const metadata: Metadata = {
  title: 'Design Fortune — 오늘의 디자인 운세',
  description: '디자이너를 위한 힐링과 영감의 운세 카드',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="ko"
      className={`${cinzel.variable} ${cormorant.variable} ${inter.variable}`}
      suppressHydrationWarning
    >
      <body>{children}</body>
    </html>
  )
}
