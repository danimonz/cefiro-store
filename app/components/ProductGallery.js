'use client'

import { useRef, useState } from 'react'
import Image from 'next/image'

const SWIPE_THRESHOLD = 40 // px of horizontal drag before it counts as a swipe

export default function ProductGallery({ images, alt, bleed = false }) {
  // Full-bleed shots (own backdrop) fill the frame; cut-outs get breathing room
  const fit = bleed ? { objectFit: 'cover' } : { objectFit: 'contain', padding: '10%' }
  const [active, setActive] = useState(0)
  const touchStartX = useRef(null)
  const count = images.length
  const hasMany = count > 1

  function go(delta) {
    setActive(i => (i + delta + count) % count)
  }

  function onKeyDown(e) {
    if (!hasMany) return
    if (e.key === 'ArrowRight') { e.preventDefault(); go(1) }
    if (e.key === 'ArrowLeft') { e.preventDefault(); go(-1) }
  }

  function onTouchStart(e) {
    touchStartX.current = e.touches[0].clientX
  }

  function onTouchEnd(e) {
    if (touchStartX.current === null) return
    const dx = e.changedTouches[0].clientX - touchStartX.current
    touchStartX.current = null
    if (Math.abs(dx) > SWIPE_THRESHOLD) go(dx < 0 ? 1 : -1)
  }

  return (
    <div>
      {/* Main image — every image is stacked and crossfaded */}
      <div
        role={hasMany ? 'region' : undefined}
        aria-roledescription={hasMany ? 'carousel' : undefined}
        aria-label={hasMany ? `${alt} images` : undefined}
        tabIndex={hasMany ? 0 : undefined}
        onKeyDown={onKeyDown}
        onTouchStart={hasMany ? onTouchStart : undefined}
        onTouchEnd={hasMany ? onTouchEnd : undefined}
        className="gallery-main"
        style={{
          position: 'relative',
          width: '100%',
          paddingBottom: '100%',
          background: 'var(--tile)',
          overflow: 'hidden',
        }}
      >
        {images.map((src, i) => (
          <div
            key={src}
            aria-hidden={i !== active}
            style={{
              position: 'absolute',
              inset: 0,
              opacity: i === active ? 1 : 0,
              transition: 'opacity 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          >
            <Image
              src={src}
              alt={hasMany ? `${alt} — image ${i + 1} of ${count}` : alt}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              style={fit}
              {...(i === 0 ? { loading: 'eager', fetchPriority: 'high' } : {})}
            />
          </div>
        ))}

        {hasMany && (
          <span
            aria-live="polite"
            style={{
              position: 'absolute',
              right: '14px',
              bottom: '12px',
              fontSize: '10px',
              letterSpacing: '0.1em',
              color: 'rgba(20,23,27,0.35)',
              fontWeight: 400,
            }}
          >
            {active + 1} / {count}
          </span>
        )}
      </div>

      {/* Thumbnails */}
      {hasMany && (
        <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
          {images.map((src, i) => (
            <button
              key={src}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`Show image ${i + 1}`}
              aria-current={i === active}
              data-active={i === active}
              className="gallery-thumb"
            >
              <Image
                src={src}
                alt=""
                fill
                sizes="64px"
                style={bleed ? { objectFit: 'cover' } : { objectFit: 'contain', padding: '12%' }}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
