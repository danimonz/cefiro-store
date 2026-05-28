import { promises as fs } from 'fs'
import path from 'path'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import ProductCard from '../../components/ProductCard'
import AddToCart from '../../components/AddToCart'
import FadeIn from '../../components/FadeIn'

async function getProducts() {
  const filePath = path.join(process.cwd(), 'public', 'data', 'products.json')
  const raw = await fs.readFile(filePath, 'utf-8')
  return JSON.parse(raw)
}

export async function generateStaticParams() {
  const products = await getProducts()
  return products.map(p => ({ slug: p.slug }))
}

export async function generateMetadata({ params }) {
  const { slug } = await params
  const products = await getProducts()
  const product = products.find(p => p.slug === slug)
  if (!product) return {}
  return {
    title: `${product.name} — Cefiro Studios`,
    description: product.description,
  }
}

export default async function ProductPage({ params }) {
  const { slug } = await params
  const products = await getProducts()
  const product = products.find(p => p.slug === slug)

  if (!product) notFound()

  const related = products.filter(p => p.id !== product.id && p.category === product.category).slice(0, 3)
  const others = products.filter(p => p.id !== product.id).slice(0, 3)
  const relatedProducts = related.length > 0 ? related : others

  return (
    <div style={{ minHeight: '100vh', paddingTop: '80px', paddingBottom: '80px' }}>

      {/* ── Product detail ───────────────────────────────────── */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 32px' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '60px',
            alignItems: 'start',
          }}
        >
          {/* Left: image */}
          <FadeIn>
            <div
              style={{
                position: 'relative',
                width: '100%',
                paddingBottom: '100%',
                background: '#E2E2E2',
                overflow: 'hidden',
              }}
            >
              <Image
                src={product.image}
                alt={product.name}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                style={{ objectFit: 'contain', padding: '10%' }}
                priority
              />
            </div>
          </FadeIn>

          {/* Right: info */}
          <div style={{ paddingTop: '8px', position: 'sticky', top: '76px' }}>

            {/* Category */}
            <FadeIn>
              <p
                style={{
                  fontSize: '10px',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: 'rgba(26,26,26,0.45)',
                  marginBottom: '16px',
                  fontWeight: 400,
                }}
              >
                {product.category}
              </p>
            </FadeIn>

            {/* Name */}
            <FadeIn delay={60}>
              <h1
                style={{
                  fontSize: 'clamp(1.75rem, 3vw, 2.5rem)',
                  fontWeight: 400,
                  letterSpacing: '0.03em',
                  color: '#1a1a1a',
                  lineHeight: 1.2,
                  marginBottom: '20px',
                }}
              >
                {product.name}
              </h1>
            </FadeIn>

            {/* Price */}
            <FadeIn delay={100}>
              <p
                style={{
                  fontSize: '15px',
                  fontWeight: 300,
                  color: '#1a1a1a',
                  opacity: 0.6,
                  marginBottom: '28px',
                }}
              >
                ${product.price}
              </p>
            </FadeIn>

            {/* Divider */}
            <div style={{ height: '1px', background: 'rgba(0,0,0,0.06)', marginBottom: '28px' }} />

            {/* Description */}
            <FadeIn delay={140}>
              <p
                style={{
                  fontSize: '13px',
                  lineHeight: 1.8,
                  color: '#1a1a1a',
                  opacity: 0.6,
                  marginBottom: '28px',
                  fontWeight: 300,
                }}
              >
                {product.description}
              </p>
            </FadeIn>

            {/* Dimensions */}
            {product.dimensions && (
              <FadeIn delay={180}>
                <div
                  style={{
                    fontSize: '10px',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    color: 'rgba(26,26,26,0.35)',
                    fontWeight: 400,
                    paddingBottom: '24px',
                    borderBottom: '1px solid rgba(0,0,0,0.06)',
                    marginBottom: '28px',
                  }}
                >
                  {product.dimensions}
                </div>
              </FadeIn>
            )}

            {/* Add to cart */}
            <FadeIn delay={220}>
              <AddToCart product={product} />
            </FadeIn>

            {/* Fine print */}
            <FadeIn delay={260}>
              <p
                style={{
                  fontSize: '10px',
                  textAlign: 'center',
                  color: 'rgba(26,26,26,0.22)',
                  marginTop: '12px',
                  fontWeight: 300,
                  letterSpacing: '0.04em',
                }}
              >
                Free shipping on orders over $50
              </p>
            </FadeIn>
          </div>
        </div>
      </div>

      {/* ── Related products ─────────────────────────────────── */}
      {relatedProducts.length > 0 && (
        <section
          style={{
            maxWidth: '1200px',
            margin: '80px auto 0',
            padding: '0 32px',
          }}
        >
          {/* Section label */}
          <p
            style={{
              fontSize: '10px',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'rgba(26,26,26,0.35)',
              fontWeight: 400,
              marginBottom: '24px',
              paddingTop: '40px',
              borderTop: '1px solid rgba(0,0,0,0.06)',
            }}
          >
            You may also like
          </p>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '20px',
            }}
          >
            {relatedProducts.map((p, i) => (
              <FadeIn key={p.id} delay={i * 80}>
                <ProductCard product={p} />
              </FadeIn>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
