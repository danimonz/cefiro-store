import Link from 'next/link'
import Image from 'next/image'

export default function ProductCard({ product, large = false }) {
  return (
    <Link
      href={`/products/${product.slug}`}
      className="group block"
      style={{ textDecoration: 'none' }}
    >
      {/* Image container */}
      <div
        className="relative overflow-hidden"
        style={{
          aspectRatio: large ? '3/4' : '2/3',
          background: '#111111',
        }}
      >
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes={large ? '(max-width: 768px) 100vw, 50vw' : '(max-width: 768px) 50vw, 33vw'}
          className="object-contain p-8 transition-transform duration-700 ease-out group-hover:scale-[1.03]"
        />
        {/* Hover overlay */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{ background: 'rgba(10,10,10,0.15)' }}
        />
        {/* Category tag */}
        <span
          className="absolute top-4 left-4 text-[8px] tracking-[0.3em] uppercase px-2 py-1"
          style={{
            color: '#C9A84C',
            border: '1px solid rgba(201,168,76,0.3)',
            background: 'rgba(10,10,10,0.7)',
          }}
        >
          {product.category}
        </span>
      </div>

      {/* Card info */}
      <div className="pt-4 pb-2">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="font-display text-base text-[#F5F0E8] group-hover:text-[#C9A84C] transition-colors leading-tight">
              {product.name}
            </h3>
            {product.subtitle && (
              <p className="text-[10px] tracking-[0.2em] text-[#F5F0E8] opacity-40 uppercase mt-0.5">
                {product.subtitle}
              </p>
            )}
          </div>
          <span
            className="text-sm font-sans shrink-0 mt-0.5"
            style={{ color: '#C9A84C' }}
          >
            ${product.price}
          </span>
        </div>
      </div>
    </Link>
  )
}
