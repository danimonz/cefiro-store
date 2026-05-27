'use client'

import { createContext, useContext, useState, useEffect } from 'react'

const CartContext = createContext(null)

export function CartProvider({ children }) {
  const [items, setItems] = useState([])
  const [mounted, setMounted] = useState(false)

  // Hydrate from localStorage once mounted
  useEffect(() => {
    setMounted(true)
    try {
      const saved = localStorage.getItem('cefiro-cart')
      if (saved) setItems(JSON.parse(saved))
    } catch {}
  }, [])

  // Persist to localStorage
  useEffect(() => {
    if (!mounted) return
    localStorage.setItem('cefiro-cart', JSON.stringify(items))
  }, [items, mounted])

  function addItem(product, qty = 1) {
    setItems(prev => {
      const existing = prev.find(i => i.id === product.id)
      if (existing) {
        return prev.map(i =>
          i.id === product.id ? { ...i, qty: i.qty + qty } : i
        )
      }
      return [...prev, { ...product, qty }]
    })
  }

  function removeItem(id) {
    setItems(prev => prev.filter(i => i.id !== id))
  }

  function updateQty(id, qty) {
    if (qty < 1) { removeItem(id); return }
    setItems(prev => prev.map(i => i.id === id ? { ...i, qty } : i))
  }

  function clearCart() {
    setItems([])
  }

  const count = items.reduce((sum, i) => sum + i.qty, 0)
  const subtotal = items.reduce((sum, i) => sum + i.price * i.qty, 0)

  return (
    <CartContext.Provider value={{ items, count, subtotal, addItem, removeItem, updateQty, clearCart }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}
