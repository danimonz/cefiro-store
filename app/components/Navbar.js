import Link from 'next/link'
import CartIcon from './CartIcon'

export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 mix-blend-normal">
      <nav
        className="flex items-center justify-between px-8 py-5"
        style={{ background: 'linear-gradient(180deg, rgba(10,10,10,0.95) 0%, rgba(10,10,10,0) 100%)' }}
      >
        {/* Left nav links */}
        <div className="hidden md:flex items-center gap-10">
          <Link
            href="/products"
            className="text-[10px] tracking-[0.25em] text-[#F5F0E8] opacity-60 hover:opacity-100 transition-opacity uppercase"
          >
            Shop
          </Link>
          <Link
            href="/about"
            className="text-[10px] tracking-[0.25em] text-[#F5F0E8] opacity-60 hover:opacity-100 transition-opacity uppercase"
          >
            About
          </Link>
        </div>

        {/* Center wordmark */}
        <Link
          href="/"
          className="absolute left-1/2 -translate-x-1/2 font-display text-sm tracking-[0.4em] text-[#F5F0E8] uppercase hover:text-[#C9A84C] transition-colors"
        >
          Cefiro Studios
        </Link>

        {/* Right: cart */}
        <div className="ml-auto">
          <CartIcon />
        </div>
      </nav>
    </header>
  )
}
