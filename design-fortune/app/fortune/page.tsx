'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function FortunePage() {
  const router = useRouter()
  useEffect(() => { router.replace('/') }, [router])
  return <div className="min-h-screen" style={{ background: '#030014' }} />
}
