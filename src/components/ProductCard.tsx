import Link from 'next/link'
import Image from 'next/image'
import { Product } from '@prisma/client'

interface Props {
  product: Product
}

export default function ProductCard({ product }: Props) {
  const image = product.images[0] ?? '/placeholder.jpg'

  return (
    <Link
      href={`/catalog/${product.id}`}
      className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-[var(--border)]"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-[var(--cream)]">
        <Image
          src={image}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        {!product.isActive || Number(product.stock) === 0 ? (
          <span className="absolute top-2 left-2 bg-gray-500 text-white text-xs px-2 py-1 rounded-full">
            Нет в наличии
          </span>
        ) : null}
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-[var(--text)] mb-1 group-hover:text-[var(--amber)] transition-colors line-clamp-1">
          {product.name}
        </h3>
        <p className="text-[var(--muted)] text-sm line-clamp-2 mb-3">
          {product.description}
        </p>
        <div className="flex items-baseline justify-between">
          <span className="text-lg font-bold text-[var(--forest)]">
            {Number(product.price).toLocaleString('ru-RU')} ₽
          </span>
          <span className="text-sm text-[var(--muted)]">/ {product.unit}</span>
        </div>
      </div>
    </Link>
  )
}
