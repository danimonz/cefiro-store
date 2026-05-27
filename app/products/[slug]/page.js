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

  // Related: same category, or just others, exclude current
  const related = products
    .filter(p => p.id !== product.id && p.category === product.category)
    .slice(0, 3)
  const others = products.filter(p => p.id !== product.id).slice(0, 3)
  const relatedProducts = related.length > 0 ? related : others

  return (
    <div className="min-h-screen pt-24 pb-32">

      {/* ── Product Detail ───────────────────────────────────── */}
      <div className="max-w-5xl mx-auto px-8">
        <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-start">

          {/* Left: Image */}
          <FadeIn>
            <div
              className="relative w-full"
              style={{
                aspectRatio: '2/3',
                background: '#111111',
                border: '1px solid rgba(201,168,76,0.1)',
              }}
            >
              <Image
                src={product.image}
                alt={product.name}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-contain p-10"
                priority
              />
            </div>
          </FadeIn>

          {/* Right: Info */}
          <div className="md:pt-8 md:sticky md:top-24">
            {/* Category */}
            <FadeIn>
              <p
                className="text-[9px] tracking-[0.4em] uppercase mb-4"
                style={{ color: '#C9A84C' }}
              >
                {product.category}
              </p>
            </FadeIn>

            {/* Name */}
            <FadeIn delay={80}>
              <h1
                className="font-display leading-tight mb-1"
                style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', color: '#F5F0E8' }}
              >
                {product.name}
              </h1>
              {product.subtitle && (
                <p
                  className="text-[10px] tracking-[0.25em] uppercase mb-6"
                  style={{ color: '#F5F0E8', opacity: 0.4 }}
                >
                  {product.subtitle}
                </p>
              )}
            </FadeIn>

            {/* Price */}
            <FadeIn delay={120}>
              <p
                className="font-display text-3xl mb-8"
                style={{ color: '#C9A84C' }}
              >
                ${product.price}
              </p>
            </FadeIn>

            {/* Gold rule */}
            <div className="gold-rule mb-8" />

            {/* Description */}
            <FadeIn delay={160}>
              <p
                className="text-sm leading-7 mb-10"
                style={{ color: '#F5F0E8', opacity: 0.65, fontFamily: 'var(--font-inter)' }}
              >
                {product.description}
              </p>
            </FadeIn>

            {/* Dimensions / Details */}
            {product.dimensions && (
              <FadeIn delay={200}>
                <div
                  className="text-[9px] tracking-[0.25em] uppercase mb-10 pb-6"
                  style={{ color: '#F5F0E8', opacity: 0.35, borderBottom: '1px solid rgba(201,168,76,0.1)' }}
                >
                  {product.dimensions}
                </div>
              </FadeIn>
            )}

            {/* Add to Cart */}
            <FadeIn delay={240}>
              <AddToCart product={product} />
            </FadeIn>

            {/* Fine print */}
            <FadeIn delay={280}>
              <p
                className="text-[9px] tracking-[0.15em] text-center mt-4"
                style={{ color: '#F5F0E8', opacity: 0.2 }}
              >
                Free shipping on orders over $50
              </p>
            </FadeIn>
          </div>
        </div>
      </div>

      {/* ── Related Products ──────────────────────────────────── */}
      {relatedProducts.length > 0 && (
        <section className="max-w-5xl mx-auto px-8 mt-28">
          <FadeIn>
            <div className="flex items-center gap-6 mb-12">
              <div className="flex-1 gold-rule" />
              <h2
                className="font-display text-xs tracking-[0.4em] uppercase shrink-0"
                style={{ color: '#C9A84C' }}
              >
                You May Also Like
              </h2>
              <div className="flex-1 gold-rule" />
            </div>
          </FadeIn>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-10">
            {relatedProducts.map((p, i) => (
              <FadeIn key={p.id} delay={i * 100}>
                <ProductCard product={p} />
              </FadeIn>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
