'use client'

import { useEffect, useRef } from 'react'

interface Star {
  x: number
  y: number
  radius: number
  baseOpacity: number
  speed: number
  phase: number
}

export default function StarField() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resize = () => {
      canvas.width  = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const stars: Star[] = Array.from({ length: 220 }, () => ({
      x:           Math.random() * canvas.width,
      y:           Math.random() * canvas.height,
      radius:      Math.random() * 1.1 + 0.2,
      baseOpacity: Math.random() * 0.45 + 0.1,
      speed:       Math.random() * 0.6 + 0.2,
      phase:       Math.random() * Math.PI * 2,
    }))

    let animId: number
    let t = 0

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      t += 0.016

      for (const s of stars) {
        const opacity = s.baseOpacity + Math.sin(t * s.speed + s.phase) * 0.18
        ctx.beginPath()
        ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(200, 180, 255, ${Math.max(0, Math.min(1, opacity))})`
        ctx.fill()
      }

      animId = requestAnimationFrame(draw)
    }
    draw()

    return () => {
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(animId)
    }
  }, [])

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" />
}
