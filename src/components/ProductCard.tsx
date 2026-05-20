import Link from 'next/link'
import Image from 'next/image'
import { Product } from '@prisma/client'
import { ArrowRight } from 'lucide-react'

interface Props {
  product: Product
}

export default function ProductCard({ product }: Props) {
  const image = product.images[0] ?? null
  const outOfStock = !product.isActive || Number(product.stock) === 0

  return (
    <Link
      href={`/catalog/${product.id}`}
      className="group bg-white rounded-2xl overflow-hidden border border-[var(--border)] hover:border-[var(--amber)] hover:shadow-xl transition-all duration-300"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-[var(--cream)]">
        {image ? (
          <Image
            src={image}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            unoptimized={image.startsWith('/uploads/')}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-[var(--muted)]">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg>
          </div>
        )}
        {outOfStock && (
          <span className="absolute top-3 left-3 bg-gray-700/90 text-white text-xs px-2.5 py-1 rounded-full font-medium">
            Нет в наличии
          </span>
        )}
      </div>
      <div className="p-5">
        <h3 className="font-bold text-[var(--text)] mb-1.5 group-hover:text-[var(--amber)] transition-colors line-clamp-1 text-[15px]">
          {product.name}
        </h3>
        <p className="text-[var(--muted)] text-sm line-clamp-2 mb-4 leading-relaxed">
          {product.description}
        </p>
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xl font-black text-[var(--forest)]">
              {Number(product.price).toLocaleString('ru-RU')} ₽
            </span>
            <span className="text-xs text-[var(--muted)] ml-1">/ {product.unit}</span>
          </div>
          <span className="w-8 h-8 rounded-full bg-[var(--cream)] group-hover:bg-[var(--amber)] flex items-center justify-center transition-colors">
            <ArrowRight size={14} className="text-[var(--forest)] group-hover:text-white transition-colors" />
          </span>
        </div>
      </div>
    </Link>
  )
}
