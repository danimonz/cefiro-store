import { promises as fs } from 'fs'
import path from 'path'
import ProductCard from './components/ProductCard'

async function getProducts() {
  const filePath = path.join(process.cwd(), 'public', 'data', 'products.json')
  const raw = await fs.readFile(filePath, 'utf-8')
  return JSON.parse(raw)
}

export default async function HomePage() {
  const products = await getProducts()

  return (
    <div
      style={{
        paddingTop: '76px',
        paddingLeft: '32px',
        paddingRight: '32px',
        paddingBottom: '80px',
      }}
    >
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '20px',
        }}
      >
        {products.map((product, i) => (
          <div
            key={product.id}
            style={{
              animation: 'fadeUp 0.5s ease both',
              animationDelay: `${i * 60}ms`,
            }}
          >
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  )
}
