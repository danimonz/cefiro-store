'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useCart } from '../lib/cart-context'

export default function CartPageClient() {
  const { items, subtotal, removeItem, updateQty } = useCart()
  const isEmpty = items.length === 0

  return (
    <div
      style={{
        minHeight: '100vh',
        paddingTop: '100px',
        paddingBottom: '80px',
        paddingLeft: '32px',
        paddingRight: '32px',
      }}
    >
      <div style={{ maxWidth: '640px', margin: '0 auto' }}>

        {/* Header */}
        <div style={{ marginBottom: '48px' }}>
          <p
            style={{
              fontSize: '10px',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'rgba(26,26,26,0.35)',
              fontWeight: 400,
              marginBottom: '12px',
            }}
          >
            Cefiro Studios
          </p>
          <h1
            style={{
              fontSize: 'clamp(2rem, 5vw, 3rem)',
              fontWeight: 400,
              letterSpacing: '0.03em',
              color: '#1a1a1a',
              lineHeight: 1.1,
            }}
          >
            Your Cart
          </h1>
          <div style={{ height: '1px', background: 'rgba(0,0,0,0.06)', marginTop: '24px' }} />
        </div>

        {isEmpty ? (
          /* ── Empty state ──────────────────────────────────── */
          <div style={{ textAlign: 'center', paddingTop: '80px', paddingBottom: '80px' }}>
            <p
              style={{
                fontSize: '22px',
                fontWeight: 300,
                color: 'rgba(26,26,26,0.3)',
                marginBottom: '10px',
              }}
            >
              Nothing here yet.
            </p>
            <p
              style={{
                fontSize: '10px',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: 'rgba(26,26,26,0.2)',
                fontWeight: 400,
                marginBottom: '40px',
              }}
            >
              Your cart is empty
            </p>
            <Link
              href="/products"
              style={{
                display: 'inline-block',
                padding: '12px 36px',
                fontSize: '11px',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                background: '#1a1a1a',
                color: '#EFEFEF',
                textDecoration: 'none',
                fontWeight: 400,
              }}
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          /* ── Cart items ───────────────────────────────────── */
          <>
            <div>
              {items.map((item, i) => (
                <CartItem
                  key={item.id}
                  item={item}
                  isLast={i === items.length - 1}
                  onRemove={() => removeItem(item.id)}
                  onQtyChange={qty => updateQty(item.id, qty)}
                />
              ))}
            </div>

            {/* Summary */}
            <div style={{ paddingTop: '28px', borderTop: '1px solid rgba(0,0,0,0.06)', marginTop: '8px' }}>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'baseline',
                  marginBottom: '8px',
                }}
              >
                <span
                  style={{
                    fontSize: '11px',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    color: 'rgba(26,26,26,0.4)',
                    fontWeight: 400,
                  }}
                >
                  Subtotal
                </span>
                <span
                  style={{
                    fontSize: '18px',
                    fontWeight: 300,
                    color: '#1a1a1a',
                  }}
                >
                  ${subtotal.toFixed(2)}
                </span>
              </div>
              <p
                style={{
                  fontSize: '10px',
                  color: 'rgba(26,26,26,0.25)',
                  fontWeight: 300,
                  marginBottom: '24px',
                  letterSpacing: '0.02em',
                }}
              >
                Shipping calculated at checkout. Taxes included where applicable.
              </p>

              {/* Checkout — disabled */}
              <button
                disabled
                style={{
                  width: '100%',
                  padding: '14px 0',
                  fontSize: '11px',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  fontWeight: 400,
                  background: 'rgba(26,26,26,0.15)',
                  color: 'rgba(26,26,26,0.4)',
                  border: 'none',
                  cursor: 'not-allowed',
                  marginBottom: '16px',
                }}
                title="Stripe checkout coming soon"
              >
                Checkout — Coming Soon
              </button>

              <Link
                href="/products"
                style={{
                  display: 'block',
                  textAlign: 'center',
                  fontSize: '10px',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  color: 'rgba(26,26,26,0.35)',
                  textDecoration: 'none',
                  fontWeight: 400,
                  padding: '10px 0',
                }}
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

function CartItem({ item, isLast, onRemove, onQtyChange }) {
  return (
    <div
      style={{
        display: 'flex',
        gap: '20px',
        paddingTop: '24px',
        paddingBottom: '24px',
        borderBottom: isLast ? 'none' : '1px solid rgba(0,0,0,0.06)',
      }}
    >
      {/* Thumbnail */}
      <Link href={`/products/${item.slug}`} style={{ flexShrink: 0, lineHeight: 0 }}>
        <div
          style={{
            position: 'relative',
            width: '72px',
            height: '72px',
            background: '#E2E2E2',
          }}
        >
          <Image
            src={item.image}
            alt={item.name}
            fill
            sizes="72px"
            style={{ objectFit: 'contain', padding: '8px' }}
          />
        </div>
      </Link>

      {/* Info */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '12px', marginBottom: '4px' }}>
          <Link
            href={`/products/${item.slug}`}
            style={{
              fontSize: '12px',
              letterSpacing: '0.04em',
              textTransform: 'uppercase',
              fontWeight: 400,
              color: '#1a1a1a',
              textDecoration: 'none',
            }}
          >
            {item.name}
          </Link>
          <span style={{ fontSize: '12px', fontWeight: 300, color: '#1a1a1a', opacity: 0.6, flexShrink: 0 }}>
            ${(item.price * item.qty).toFixed(2)}
          </span>
        </div>

        {/* Qty + Remove */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginTop: '12px' }}>
          {/* Stepper */}
          <div style={{ display: 'flex', alignItems: 'center', border: '1px solid rgba(0,0,0,0.12)' }}>
            <button
              onClick={() => onQtyChange(item.qty - 1)}
              aria-label="Decrease quantity"
              style={{
                width: '28px',
                height: '28px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '14px',
                color: 'rgba(26,26,26,0.5)',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                lineHeight: 1,
              }}
            >
              −
            </button>
            <span
              style={{
                width: '28px',
                height: '28px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '11px',
                color: '#1a1a1a',
                fontWeight: 400,
              }}
            >
              {item.qty}
            </span>
            <button
              onClick={() => onQtyChange(item.qty + 1)}
              aria-label="Increase quantity"
              style={{
                width: '28px',
                height: '28px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '14px',
                color: 'rgba(26,26,26,0.5)',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                lineHeight: 1,
              }}
            >
              +
            </button>
          </div>

          {/* Remove */}
          <button
            onClick={onRemove}
            style={{
              fontSize: '9px',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: 'rgba(26,26,26,0.3)',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              fontWeight: 400,
              padding: 0,
            }}
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  )
}
