import Link from 'next/link'
import Image from 'next/image'

export default function ProductCard({ product }) {
  return (
    <Link
      href={`/products/${product.slug}`}
      className="product-card block"
      style={{ textDecoration: 'none' }}
    >
      {/* Square image tile */}
      <div style={{ position: 'relative', width: '100%', paddingBottom: '100%', background: 'var(--tile)', overflow: 'hidden' }}>
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 50vw, 33vw"
          className="product-card-img"
          style={product.bleed ? { objectFit: 'cover' } : { objectFit: 'contain', padding: '10%' }}
        />
      </div>

      {/* Info */}
      <div style={{ paddingTop: '14px' }}>
        <p
          style={{
            fontWeight: 400,
            fontSize: '12px',
            letterSpacing: '0.04em',
            textTransform: 'uppercase',
            color: 'var(--ink)',
            marginBottom: '4px',
          }}
        >
          {product.name}
        </p>
        <p
          style={{
            fontWeight: 300,
            fontSize: '12px',
            color: 'var(--ink)',
            opacity: 0.45,
          }}
        >
          ${product.price}
        </p>
      </div>
    </Link>
  )
}
