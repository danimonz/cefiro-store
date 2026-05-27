import { promises as fs } from 'fs'
import path from 'path'
import ProductCard from '../components/ProductCard'
import FadeIn from '../components/FadeIn'

async function getProducts() {
  const filePath = path.join(process.cwd(), 'public', 'data', 'products.json')
  const raw = await fs.readFile(filePath, 'utf-8')
  return JSON.parse(raw)
}

export const metadata = {
  title: 'Shop — Cefiro Studios',
  description: 'Art prints, apparel, incense, and objects from Cefiro Studios.',
}

export default async function ProductsPage() {
  const products = await getProducts()

  return (
    <div className="min-h-screen pt-28 pb-32 px-8">
      <div className="max-w-5xl mx-auto">

        {/* Page header */}
        <FadeIn>
          <div className="text-center mb-20">
            <p
              className="text-[9px] tracking-[0.5em] uppercase mb-4"
              style={{ color: '#C9A84C' }}
            >
              Cefiro Studios
            </p>
            <h1
              className="font-display leading-none mb-6"
              style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', color: '#F5F0E8', letterSpacing: '0.06em' }}
            >
              The Shop
            </h1>
            <div className="gold-rule max-w-[80px] mx-auto" />
          </div>
        </FadeIn>

        {/* Products grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-10">
          {products.map((product, i) => (
            <FadeIn key={product.id} delay={i * 80}>
              <ProductCard product={product} />
            </FadeIn>
          ))}
        </div>
      </div>
    </div>
  )
}
