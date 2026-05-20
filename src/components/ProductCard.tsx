import Link from 'next/link'
import Image from 'next/image'
import { Product } from '@prisma/client'
import { ArrowRight } from 'lucide-react'

interface Props {
  product: Product
  featured?: boolean
}

export default function ProductCard({ product, featured }: Props) {
  const image = product.images[0] ?? null
  const outOfStock = !product.isActive || Number(product.stock) === 0

  return (
    <Link
      href={`/catalog/${product.id}`}
      className="group relative bg-white rounded-2xl overflow-hidden border border-[var(--border)] hover:border-[var(--amber)]/40 hover:shadow-[0_20px_40px_-12px_rgba(28,43,26,0.15)] transition-all duration-300 flex flex-col h-full btn-press"
    >
      <div className={`relative overflow-hidden bg-[var(--cream)] ${featured ? 'aspect-[16/9]' : 'aspect-[4/3]'}`}>
        {image ? (
          <Image
            src={image}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-[1.03] transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            unoptimized={image.startsWith('/uploads/') || image.startsWith('/products/')}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-[var(--border)]">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round">
              <rect x="3" y="3" width="18" height="18" rx="2" /><path d="M3 9h18M9 21V9" />
            </svg>
          </div>
        )}
        {outOfStock && (
          <span className="absolute top-3 left-3 bg-zinc-800/85 text-white text-[11px] px-2.5 py-1 rounded-full font-medium tracking-wide">
            Нет в наличии
          </span>
        )}
      </div>

      <div className={`flex flex-col flex-1 ${featured ? 'p-6' : 'p-4'}`}>
        <h3 className={`font-bold text-[var(--text)] group-hover:text-[var(--amber)] transition-colors line-clamp-1 mb-1.5 ${featured ? 'text-lg' : 'text-[15px]'}`}>
          {product.name}
        </h3>
        <p className="text-[var(--muted)] text-sm line-clamp-2 leading-relaxed flex-1 mb-4">
          {product.description}
        </p>
        <div className="flex items-center justify-between">
          <div>
            <span className={`font-black text-[var(--forest)] ${featured ? 'text-2xl' : 'text-xl'}`}>
              {Number(product.price).toLocaleString('ru-RU')} ₽
            </span>
            <span className="text-xs text-[var(--muted)] ml-1">/ {product.unit}</span>
          </div>
          <span className="w-8 h-8 rounded-full border border-[var(--border)] group-hover:bg-[var(--amber)] group-hover:border-[var(--amber)] flex items-center justify-center transition-all duration-300">
            <ArrowRight size={13} className="text-[var(--muted)] group-hover:text-white group-hover:translate-x-0.5 transition-all duration-300" />
          </span>
        </div>
      </div>
    </Link>
  )
}
