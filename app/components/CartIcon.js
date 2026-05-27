'use client'

import Link from 'next/link'
import { useCart } from '../lib/cart-context'

export default function CartIcon() {
  const { count } = useCart()

  return (
    <Link
      href="/cart"
      className="relative flex items-center gap-2 text-[10px] tracking-[0.25em] text-[#F5F0E8] opacity-60 hover:opacity-100 transition-opacity uppercase"
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
        <line x1="3" y1="6" x2="21" y2="6"/>
        <path d="M16 10a4 4 0 01-8 0"/>
      </svg>
      <span className="hidden md:inline">Cart</span>
      {count > 0 && (
        <span
          className="absolute -top-2 -right-2 w-4 h-4 rounded-full text-[9px] flex items-center justify-center font-sans"
          style={{ background: '#C9A84C', color: '#0A0A0A' }}
        >
          {count}
        </span>
      )}
    </Link>
  )
}
