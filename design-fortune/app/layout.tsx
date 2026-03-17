import type { Metadata, Viewport } from 'next'
import { Cinzel_Decorative, Cormorant_Garamond, Inter, Nunito } from 'next/font/google'
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
const nunito = Nunito({
  weight: ['400', '600', '700', '800'],
  subsets: ['latin'],
  variable: '--font-nunito',
  display: 'swap',
})

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

export const metadata: Metadata = {
  title: 'FortuneLog — 직군별 멘탈 케어 컬러테라피',
  description: 'PM, 디자이너, 개발자, QA를 위한 컬러테라피 기반 멘탈 케어 플랫폼',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="ko"
      className={`${cinzel.variable} ${cormorant.variable} ${inter.variable} ${nunito.variable}`}
      suppressHydrationWarning
    >
      <body>{children}</body>
    </html>
  )
}
