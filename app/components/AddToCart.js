'use client'

import { useState } from 'react'
import { useCart } from '../lib/cart-context'

export default function AddToCart({ product }) {
  const { addItem } = useCart()
  const [state, setState] = useState('idle') // idle | added

  function handleAdd() {
    addItem(product)
    setState('added')
    setTimeout(() => setState('idle'), 2000)
  }

  return (
    <button
      onClick={handleAdd}
      className="w-full py-4 text-[11px] tracking-[0.35em] uppercase transition-all duration-300 relative overflow-hidden"
      style={{
        background: state === 'added' ? 'transparent' : '#C9A84C',
        color: state === 'added' ? '#C9A84C' : '#0A0A0A',
        border: state === 'added' ? '1px solid #C9A84C' : '1px solid transparent',
        letterSpacing: '0.35em',
      }}
    >
      {state === 'added' ? '✓ Added to Cart' : 'Add to Cart'}
    </button>
  )
}
