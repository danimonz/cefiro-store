'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function HeroCTA() {
  const [hovered, setHovered] = useState(false)

  return (
    <div className="mt-14 fade-up fade-up-delay-5">
      <Link
        href="/products"
        className="inline-block text-[10px] uppercase px-10 py-4 transition-all duration-300"
        style={{
          letterSpacing: '0.35em',
          background: hovered ? '#F5F0E8' : '#C9A84C',
          color: '#0A0A0A',
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        Shop Now
      </Link>
    </div>
  )
}
