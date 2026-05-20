'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Product } from '@prisma/client'
import { Plus, Minus, ShoppingCart, ArrowRight } from 'lucide-react'
import { useCartStore } from '@/store/cart'
import toast from 'react-hot-toast'

interface Props {
  product: Product
  featured?: boolean
}

export default function ProductCardHome({ product, featured }: Props) {
  const price = Number(product.price)
  const step = Number(product.step)
  const stock = Number(product.stock)
  const image = product.images[0] ?? null
  const outOfStock = !product.isActive || stock === 0

  const [quantity, setQuantity] = useState(step)
  const { addItem, updateQuantity, items } = useCartStore((s) => ({ addItem: s.addItem, updateQuantity: s.updateQuantity, items: s.items }))
  const cartItem = items.find((i) => i.productId === product.id)

  const changeQty = (delta: number) => {
    const next = Math.round((quantity + delta) * 1e10) / 1e10
    if (next >= step && next <= stock) setQuantity(next)
  }

  const changeCartQty = (delta: number) => {
    if (!cartItem) return
    const next = Math.round((cartItem.quantity + delta) * 1e10) / 1e10
    if (next >= step && next <= stock) updateQuantity(product.id, next)
  }

  const handleAdd = () => {
    addItem({
      productId: product.id,
      name: product.name,
      price,
      unit: product.unit,
      step,
      quantity,
      image: image ?? '/placeholder.jpg',
    })
    toast.success(`«${product.name}» добавлен в корзину`)
  }

  return (
    <div className="group relative bg-[var(--surface)] overflow-hidden border border-[var(--border)] hover:border-[var(--primary)]/60 transition-colors duration-300 flex flex-col h-full">
      <Link
        href={`/catalog/${product.id}`}
        className={`relative overflow-hidden bg-[var(--bg)] block ${featured ? 'aspect-[16/9]' : 'aspect-[4/3]'}`}
      >
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
          <span className="absolute top-3 left-3 bg-[var(--bg)]/85 text-[var(--text)] text-[11px] px-2.5 py-1 font-medium tracking-wide">
            Нет в наличии
          </span>
        )}
      </Link>

      <div className={`flex flex-col flex-1 ${featured ? 'p-6' : 'p-4'}`}>
        <Link href={`/catalog/${product.id}`} className="group/title">
          <h3 className={`font-bold text-[var(--text)] group-hover/title:text-[var(--primary)] transition-colors line-clamp-1 mb-1.5 ${featured ? 'text-lg' : 'text-[15px]'}`}>
            {product.name}
          </h3>
        </Link>
        <p className="text-[var(--muted-fg)] text-sm line-clamp-2 leading-relaxed flex-1 mb-4">
          {product.description}
        </p>

        <div className="flex items-baseline gap-1 mb-3">
          <span className={`font-black text-[var(--text)] ${featured ? 'text-2xl' : 'text-xl'}`}>
            {price.toLocaleString('ru-RU')} ₽
          </span>
          <span className="text-xs text-[var(--muted-fg)]">/ {product.unit}</span>
        </div>

        {outOfStock ? (
          <Link
            href={`/catalog/${product.id}`}
            className="inline-flex items-center justify-center gap-2 border border-[var(--border)] text-[var(--muted-fg)] py-2.5 font-semibold text-sm hover:text-[var(--text)] hover:border-[var(--text)] transition-colors"
          >
            Подробнее <ArrowRight size={14} />
          </Link>
        ) : cartItem ? (
          <div className="flex items-center border border-[var(--primary)] overflow-hidden">
            <button
              type="button"
              onClick={() => changeCartQty(-step)}
              disabled={cartItem.quantity <= step}
              aria-label="Уменьшить"
              className="w-8 h-9 flex items-center justify-center hover:bg-[var(--bg)] disabled:opacity-30 transition-colors"
            >
              <Minus size={13} />
            </button>
            <span className="text-xs font-semibold flex-1 text-center tabular-nums px-1 text-[var(--primary)]">
              {cartItem.quantity} {product.unit}
            </span>
            <button
              type="button"
              onClick={() => changeCartQty(step)}
              disabled={cartItem.quantity >= stock}
              aria-label="Увеличить"
              className="w-8 h-9 flex items-center justify-center hover:bg-[var(--bg)] disabled:opacity-30 transition-colors"
            >
              <Plus size={13} />
            </button>
          </div>
        ) : (
          <div className="flex items-stretch gap-2">
            <div className="flex items-center border border-[var(--border)] overflow-hidden shrink-0">
              <button
                type="button"
                onClick={() => changeQty(-step)}
                disabled={quantity <= step}
                aria-label="Уменьшить"
                className="w-8 h-9 flex items-center justify-center hover:bg-[var(--bg)] disabled:opacity-30 transition-colors"
              >
                <Minus size={13} />
              </button>
              <span className="text-xs font-semibold min-w-[3.5rem] text-center tabular-nums px-1">
                {quantity} {product.unit}
              </span>
              <button
                type="button"
                onClick={() => changeQty(step)}
                disabled={quantity >= stock}
                aria-label="Увеличить"
                className="w-8 h-9 flex items-center justify-center hover:bg-[var(--bg)] disabled:opacity-30 transition-colors"
              >
                <Plus size={13} />
              </button>
            </div>
            <button
              type="button"
              onClick={handleAdd}
              className="btn-press flex-1 inline-flex items-center justify-center gap-1.5 bg-[var(--primary)] hover:bg-[var(--primary-dark)] text-[var(--text)] font-semibold text-sm transition-colors px-3"
            >
              <ShoppingCart size={14} />
              <span className="hidden sm:inline">В корзину</span>
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
