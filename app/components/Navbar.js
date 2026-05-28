'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import CartIcon from './CartIcon'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50"
      style={{
        height: '56px',
        background: scrolled ? 'rgba(239,239,239,0.97)' : '#EFEFEF',
        borderBottom: `1px solid ${scrolled ? 'rgba(0,0,0,0.06)' : 'transparent'}`,
        transition: 'background 0.3s ease, border-color 0.3s ease',
      }}
    >
      <nav className="relative flex items-center justify-between h-full px-8">

        {/* Left: wordmark */}
        <Link
          href="/"
          style={{
            fontWeight: 500,
            fontSize: '18px',
            letterSpacing: '0.16em',
            color: '#1a1a1a',
            textDecoration: 'none',
            textTransform: 'uppercase',
          }}
        >
          CEFIRO
        </Link>

        {/* Center: nav links */}
        <div
          className="absolute flex items-center gap-8"
          style={{ left: '50%', transform: 'translateX(-50%)' }}
        >
          <NavLink href="/products">Shop</NavLink>
          <NavLink href="/about">About</NavLink>
        </div>

        {/* Right: cart icon */}
        <CartIcon />
      </nav>
    </header>
  )
}

function NavLink({ href, children }) {
  const [hovered, setHovered] = useState(false)

  return (
    <Link
      href={href}
      style={{
        fontWeight: 400,
        fontSize: '11px',
        letterSpacing: '0.06em',
        color: hovered ? '#1a1a1a' : 'rgba(26,26,26,0.45)',
        textDecoration: 'none',
        transition: 'color 0.25s ease',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {children}
    </Link>
  )
}
