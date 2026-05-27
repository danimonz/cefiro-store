'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useCart } from '../lib/cart-context'

export default function CartPageClient() {
  const { items, subtotal, removeItem, updateQty } = useCart()

  const isEmpty = items.length === 0

  return (
    <div className="min-h-screen pt-28 pb-32 px-8">
      <div className="max-w-2xl mx-auto">

        {/* Header */}
        <div className="mb-16">
          <p
            className="text-[9px] tracking-[0.5em] uppercase mb-3"
            style={{ color: '#C9A84C' }}
          >
            Cefiro Studios
          </p>
          <h1
            className="font-display leading-none"
            style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)', color: '#F5F0E8', letterSpacing: '0.05em' }}
          >
            Your Cart
          </h1>
          <div className="gold-rule mt-6 max-w-[60px]" />
        </div>

        {isEmpty ? (
          /* ── Empty State ────────────────────────────────────── */
          <div className="text-center py-24">
            <p
              className="font-display text-2xl mb-4"
              style={{ color: '#F5F0E8', opacity: 0.3 }}
            >
              Nothing here yet.
            </p>
            <p
              className="text-[10px] tracking-[0.2em] uppercase mb-12"
              style={{ color: '#F5F0E8', opacity: 0.2 }}
            >
              Your cart is empty
            </p>
            <Link
              href="/products"
              className="text-[10px] tracking-[0.35em] uppercase px-10 py-4 transition-all duration-300 inline-block"
              style={{
                color: '#0A0A0A',
                background: '#C9A84C',
              }}
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          /* ── Cart Items ─────────────────────────────────────── */
          <>
            <div
              className="divide-y"
              style={{ borderTop: '1px solid rgba(201,168,76,0.12)', borderColor: 'rgba(201,168,76,0.12)' }}
            >
              {items.map(item => (
                <CartItem
                  key={item.id}
                  item={item}
                  onRemove={() => removeItem(item.id)}
                  onQtyChange={qty => updateQty(item.id, qty)}
                />
              ))}
            </div>

            {/* ── Summary ─────────────────────────────────────── */}
            <div
              className="mt-10 pt-8"
              style={{ borderTop: '1px solid rgba(201,168,76,0.2)' }}
            >
              <div className="flex justify-between items-baseline mb-4">
                <span
                  className="text-[10px] tracking-[0.3em] uppercase"
                  style={{ color: '#F5F0E8', opacity: 0.4 }}
                >
                  Subtotal
                </span>
                <span
                  className="font-display text-2xl"
                  style={{ color: '#C9A84C' }}
                >
                  ${subtotal.toFixed(2)}
                </span>
              </div>
              <p
                className="text-[9px] tracking-[0.15em] mb-8"
                style={{ color: '#F5F0E8', opacity: 0.25 }}
              >
                Shipping calculated at checkout. Taxes included where applicable.
              </p>

              {/* Checkout button — disabled, coming soon */}
              <button
                disabled
                className="w-full py-4 text-[11px] tracking-[0.35em] uppercase mb-4 cursor-not-allowed"
                style={{
                  background: 'rgba(201,168,76,0.15)',
                  color: '#C9A84C',
                  border: '1px solid rgba(201,168,76,0.3)',
                  opacity: 0.7,
                }}
                title="Stripe checkout coming soon"
              >
                Checkout — Coming Soon
              </button>

              {/* Continue shopping */}
              <Link
                href="/products"
                className="block text-center text-[9px] tracking-[0.3em] uppercase py-3 transition-opacity hover:opacity-80"
                style={{ color: '#F5F0E8', opacity: 0.35 }}
              >
                ← Continue Shopping
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

function CartItem({ item, onRemove, onQtyChange }) {
  return (
    <div
      className="flex gap-6 py-6"
      style={{ borderColor: 'rgba(201,168,76,0.1)' }}
    >
      {/* Thumbnail */}
      <Link href={`/products/${item.slug}`} className="shrink-0">
        <div
          className="relative w-20 h-28"
          style={{ background: '#111111', border: '1px solid rgba(201,168,76,0.1)' }}
        >
          <Image
            src={item.image}
            alt={item.name}
            fill
            sizes="80px"
            className="object-contain p-2"
          />
        </div>
      </Link>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-start gap-4 mb-1">
          <Link
            href={`/products/${item.slug}`}
            className="font-display text-base leading-tight hover:text-[#C9A84C] transition-colors"
            style={{ color: '#F5F0E8' }}
          >
            {item.name}
          </Link>
          <span
            className="font-sans text-sm shrink-0"
            style={{ color: '#C9A84C' }}
          >
            ${(item.price * item.qty).toFixed(2)}
          </span>
        </div>

        {item.subtitle && (
          <p
            className="text-[9px] tracking-[0.2em] uppercase mb-4"
            style={{ color: '#F5F0E8', opacity: 0.35 }}
          >
            {item.subtitle}
          </p>
        )}

        {/* Qty + Remove */}
        <div className="flex items-center gap-4 mt-3">
          {/* Quantity selector */}
          <div
            className="flex items-center"
            style={{ border: '1px solid rgba(201,168,76,0.2)' }}
          >
            <button
              onClick={() => onQtyChange(item.qty - 1)}
              className="w-8 h-8 flex items-center justify-center text-sm transition-colors hover:bg-[rgba(201,168,76,0.1)]"
              style={{ color: '#F5F0E8', opacity: 0.6 }}
              aria-label="Decrease quantity"
            >
              −
            </button>
            <span
              className="w-8 h-8 flex items-center justify-center text-xs"
              style={{ color: '#F5F0E8' }}
            >
              {item.qty}
            </span>
            <button
              onClick={() => onQtyChange(item.qty + 1)}
              className="w-8 h-8 flex items-center justify-center text-sm transition-colors hover:bg-[rgba(201,168,76,0.1)]"
              style={{ color: '#F5F0E8', opacity: 0.6 }}
              aria-label="Increase quantity"
            >
              +
            </button>
          </div>

          {/* Remove */}
          <button
            onClick={onRemove}
            className="text-[8px] tracking-[0.2em] uppercase transition-colors hover:text-[#C9A84C]"
            style={{ color: '#F5F0E8', opacity: 0.3 }}
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  )
}
