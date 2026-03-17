'use client'

import { useEffect, useRef } from 'react'

interface Star {
  x: number; y: number; radius: number
  baseOpacity: number; speed: number; phase: number
}

interface StarFieldProps {
  /** persona glow color (rgba string) — optional, defaults to purple */
  accentColor?: string
}

/** accent 색에서 RGB 추출 — rgba(r,g,b,a) 형식 지원 */
function parseRGB(color?: string): [number, number, number] {
  if (!color) return [200, 180, 255]
  const m = color.match(/rgba?\((\d+)[, ]+(\d+)[, ]+(\d+)/)
  if (m) return [Number(m[1]), Number(m[2]), Number(m[3])]
  return [200, 180, 255]
}

export default function StarField({ accentColor }: StarFieldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const colorRef  = useRef(accentColor)

  // accentColor가 바뀌면 colorRef 업데이트
  useEffect(() => { colorRef.current = accentColor }, [accentColor])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight }
    resize()
    window.addEventListener('resize', resize)

    const stars: Star[] = Array.from({ length: 220 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 1.1 + 0.2,
      baseOpacity: Math.random() * 0.45 + 0.1,
      speed: Math.random() * 0.6 + 0.2,
      phase: Math.random() * Math.PI * 2,
    }))

    let animId: number
    let t = 0

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      t += 0.016
      const [r, g, b] = parseRGB(colorRef.current)
      for (const s of stars) {
        const opacity = s.baseOpacity + Math.sin(t * s.speed + s.phase) * 0.18
        ctx.beginPath()
        ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${Math.max(0, Math.min(1, opacity))})`
        ctx.fill()
      }
      animId = requestAnimationFrame(draw)
    }
    draw()

    return () => { window.removeEventListener('resize', resize); cancelAnimationFrame(animId) }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" />
}
