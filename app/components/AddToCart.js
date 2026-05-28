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
      style={{
        width: '100%',
        padding: '14px 0',
        fontSize: '11px',
        letterSpacing: '0.1em',
        textTransform: 'uppercase',
        fontWeight: 400,
        background: state === 'added' ? 'transparent' : '#1a1a1a',
        color: state === 'added' ? '#1a1a1a' : '#EFEFEF',
        border: state === 'added' ? '1px solid rgba(0,0,0,0.2)' : '1px solid transparent',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
      }}
    >
      {state === 'added' ? '✓ Added' : 'Add to Cart'}
    </button>
  )
}
