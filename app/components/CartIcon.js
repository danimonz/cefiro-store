'use client'

import Link from 'next/link'
import { useCart } from '../lib/cart-context'

export default function CartIcon() {
  const { count } = useCart()

  return (
    <Link
      href="/cart"
      className="relative flex items-center"
      style={{ color: '#1a1a1a', lineHeight: 0 }}
      aria-label={`Cart${count > 0 ? `, ${count} item${count !== 1 ? 's' : ''}` : ''}`}
    >
      <svg width="15" height="17" viewBox="0 0 20 22" fill="none">
        <path
          d="M1 6H19V20C19 20.5523 18.5523 21 18 21H2C1.44772 21 1 20.5523 1 20V6Z"
          stroke="#1a1a1a"
          strokeWidth="1.3"
        />
        <path
          d="M6 6V4C6 2.34315 7.34315 1 9 1H11C12.6569 1 14 2.34315 14 4V6"
          stroke="#1a1a1a"
          strokeWidth="1.3"
        />
      </svg>

      {count > 0 && (
        <span
          className="absolute flex items-center justify-center"
          style={{
            width: '14px',
            height: '14px',
            borderRadius: '50%',
            background: '#1a1a1a',
            color: '#EFEFEF',
            fontSize: '8px',
            fontWeight: 400,
            top: '-6px',
            right: '-8px',
            lineHeight: 1,
          }}
        >
          {count}
        </span>
      )}
    </Link>
  )
}
