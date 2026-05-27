import Link from 'next/link'
import { promises as fs } from 'fs'
import path from 'path'
import ProductCard from './components/ProductCard'
import FadeIn from './components/FadeIn'
import HeroCTA from './components/HeroCTA'

async function getProducts() {
  const filePath = path.join(process.cwd(), 'public', 'data', 'products.json')
  const raw = await fs.readFile(filePath, 'utf-8')
  return JSON.parse(raw)
}

export default async function HomePage() {
  const products = await getProducts()
  const featured = products.filter(p => p.featured)

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-8 overflow-hidden">

        {/* Background geometric deco */}
        <div
          className="absolute inset-0 pointer-events-none"
          aria-hidden="true"
        >
          {/* Radial vignette */}
          <div
            className="absolute inset-0"
            style={{
              background: 'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(201,168,76,0.03) 0%, transparent 70%)',
            }}
          />
          {/* Art Deco lines */}
          <div
            className="absolute left-8 top-1/4 bottom-1/4 w-px"
            style={{ background: 'linear-gradient(180deg, transparent, rgba(201,168,76,0.18) 30%, rgba(201,168,76,0.18) 70%, transparent)' }}
          />
          <div
            className="absolute right-8 top-1/4 bottom-1/4 w-px"
            style={{ background: 'linear-gradient(180deg, transparent, rgba(201,168,76,0.18) 30%, rgba(201,168,76,0.18) 70%, transparent)' }}
          />
          {/* Horizontal rules */}
          <div
            className="absolute left-0 right-0"
            style={{ top: '15%', height: '1px', background: 'linear-gradient(90deg, transparent, rgba(201,168,76,0.1) 20%, rgba(201,168,76,0.1) 80%, transparent)' }}
          />
          <div
            className="absolute left-0 right-0"
            style={{ bottom: '15%', height: '1px', background: 'linear-gradient(90deg, transparent, rgba(201,168,76,0.1) 20%, rgba(201,168,76,0.1) 80%, transparent)' }}
          />
        </div>

        {/* Hero content */}
        <div className="relative z-10 text-center max-w-4xl mx-auto fade-up">
          {/* Overline */}
          <p
            className="text-[9px] tracking-[0.5em] uppercase mb-12 fade-up fade-up-delay-1"
            style={{ color: '#C9A84C' }}
          >
            Est. Los Angeles · MMXXV
          </p>

          {/* Main wordmark */}
          <h1
            className="font-display leading-none mb-8 fade-up fade-up-delay-2"
            style={{
              fontSize: 'clamp(3.5rem, 12vw, 10rem)',
              color: '#F5F0E8',
              letterSpacing: '0.08em',
            }}
          >
            CEFIRO
            <br />
            <span style={{ color: '#C9A84C', opacity: 0.85 }}>STUDIOS</span>
          </h1>

          {/* Gold rule */}
          <div className="gold-rule my-10 mx-auto max-w-xs fade-up fade-up-delay-3" />

          {/* Tagline */}
          <p
            className="text-base md:text-lg leading-relaxed max-w-md mx-auto fade-up fade-up-delay-4"
            style={{
              color: '#F5F0E8',
              opacity: 0.55,
              fontFamily: 'var(--font-inter)',
              letterSpacing: '0.02em',
            }}
          >
            Art made with intention. Objects built to last. Culture that hits.
          </p>

          {/* CTA */}
          <HeroCTA />
        </div>

        {/* Scroll indicator */}
        <div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          style={{ opacity: 0.3 }}
          aria-hidden="true"
        >
          <span className="text-[8px] tracking-[0.3em] uppercase" style={{ color: '#F5F0E8' }}>Scroll</span>
          <div
            className="w-px h-12"
            style={{
              background: 'linear-gradient(180deg, rgba(201,168,76,0.6), transparent)',
              animation: 'pulse 2s ease-in-out infinite',
            }}
          />
        </div>
      </section>

      {/* ── Featured Products ─────────────────────────────────── */}
      <section className="px-8 pb-32" style={{ paddingTop: '8rem' }}>
        <div className="max-w-5xl mx-auto">

          {/* Section header */}
          <FadeIn>
            <div className="flex items-center gap-6 mb-16">
              <div className="flex-1 gold-rule" />
              <h2
                className="font-display text-xs tracking-[0.4em] uppercase shrink-0"
                style={{ color: '#C9A84C' }}
              >
                Featured
              </h2>
              <div className="flex-1 gold-rule" />
            </div>
          </FadeIn>

          {/* Staggered product grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-10">

            {/* Large card — first product, spans full width on mobile */}
            <FadeIn delay={0} className="col-span-2 md:col-span-1 md:row-span-2">
              <ProductCard product={featured[0]} large={true} />
            </FadeIn>

            {/* Second product */}
            <FadeIn delay={100}>
              <ProductCard product={featured[1]} />
            </FadeIn>

            {/* Third product */}
            <FadeIn delay={200}>
              <ProductCard product={featured[2]} />
            </FadeIn>

            {/* Fourth product — offset */}
            <FadeIn delay={150} className="col-span-2 md:col-span-2">
              <div className="md:grid md:grid-cols-2 md:gap-10">
                <ProductCard product={featured[3]} />
                {featured[4] && (
                  <div className="hidden md:block">
                    <ProductCard product={featured[4]} />
                  </div>
                )}
              </div>
            </FadeIn>
          </div>

          {/* View all link */}
          <FadeIn delay={300}>
            <div className="text-center mt-20">
              <div className="gold-rule mb-10 max-w-xs mx-auto" />
              <Link
                href="/products"
                className="text-[9px] tracking-[0.4em] uppercase transition-colors hover:text-[#C9A84C]"
                style={{ color: '#F5F0E8', opacity: 0.5 }}
              >
                View All Products
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── Brand Statement ───────────────────────────────────── */}
      <section
        className="relative px-8 py-32 overflow-hidden"
        style={{ background: '#0D0D0D', borderTop: '1px solid rgba(201,168,76,0.1)', borderBottom: '1px solid rgba(201,168,76,0.1)' }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 60% 80% at 50% 50%, rgba(201,168,76,0.04) 0%, transparent 70%)' }}
          aria-hidden="true"
        />
        <div className="relative max-w-2xl mx-auto text-center">
          <FadeIn>
            <p
              className="text-[9px] tracking-[0.4em] uppercase mb-8"
              style={{ color: '#C9A84C' }}
            >
              The Ethos
            </p>
            <blockquote
              className="font-display leading-relaxed"
              style={{
                fontSize: 'clamp(1.5rem, 4vw, 2.25rem)',
                color: '#F5F0E8',
                opacity: 0.85,
              }}
            >
              "Learn clearly.
              <br />
              Create honestly.
              <br />
              Serve locally."
            </blockquote>
            <div className="gold-rule mt-10 max-w-[120px] mx-auto" />
          </FadeIn>
        </div>
      </section>
    </>
  )
}
