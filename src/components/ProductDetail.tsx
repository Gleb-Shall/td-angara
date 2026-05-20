'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Product } from '@prisma/client'
import { ShoppingCart, ChevronLeft, ChevronRight, Plus, Minus } from 'lucide-react'
import { useCartStore } from '@/store/cart'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

function isValidStep(value: number, step: number): boolean {
  return Math.round((value / step) * 1e10) % 1e10 === 0
}

interface Props {
  product: Product
}

export default function ProductDetail({ product }: Props) {
  const price = Number(product.price)
  const step = Number(product.step)
  const stock = Number(product.stock)

  const [quantity, setQuantity] = useState(step)
  const [imgIdx, setImgIdx] = useState(0)
  const addItem = useCartStore((s) => s.addItem)
  const router = useRouter()

  const images = product.images.length ? product.images : ['/placeholder.jpg']

  const changeQty = (delta: number) => {
    const next = Math.round((quantity + delta) * 1e10) / 1e10
    if (next >= step && next <= stock) setQuantity(next)
  }

  const handleQtyInput = (val: string) => {
    const num = parseFloat(val)
    if (!isNaN(num) && num >= step && isValidStep(num, step)) {
      setQuantity(Math.min(num, stock))
    }
  }

  const handleAddToCart = () => {
    addItem({
      productId: product.id,
      name: product.name,
      price,
      unit: product.unit,
      step,
      quantity,
      image: images[0],
    })
    toast.success(`«${product.name}» добавлен в корзину`)
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
      <button
        onClick={() => router.back()}
        className="flex items-center gap-1 text-[var(--muted)] hover:text-[var(--text)] mb-6 text-sm transition-colors"
      >
        <ChevronLeft size={16} /> Назад
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Галерея */}
        <div>
          <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-[var(--cream)] mb-3">
            <Image
              src={images[imgIdx]}
              alt={product.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            {images.length > 1 && (
              <>
                <button
                  onClick={() => setImgIdx((i) => (i - 1 + images.length) % images.length)}
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-1.5 hover:bg-white"
                >
                  <ChevronLeft size={18} />
                </button>
                <button
                  onClick={() => setImgIdx((i) => (i + 1) % images.length)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-1.5 hover:bg-white"
                >
                  <ChevronRight size={18} />
                </button>
              </>
            )}
          </div>
          {images.length > 1 && (
            <div className="flex gap-2">
              {images.map((src, i) => (
                <button
                  key={i}
                  onClick={() => setImgIdx(i)}
                  className={`relative w-16 h-16 rounded-lg overflow-hidden border-2 transition-colors ${
                    i === imgIdx ? 'border-[var(--amber)]' : 'border-transparent'
                  }`}
                >
                  <Image src={src} alt="" fill className="object-cover" sizes="64px" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Информация */}
        <div>
          <h1 className="text-2xl md:text-3xl font-bold mb-2">{product.name}</h1>

          <div className="flex items-baseline gap-2 mb-4">
            <span className="text-3xl font-bold text-[var(--forest)]">
              {price.toLocaleString('ru-RU')} ₽
            </span>
            <span className="text-[var(--muted)]">/ {product.unit}</span>
          </div>

          <div className="flex items-center gap-2 mb-6">
            <span
              className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                stock > 0 ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'
              }`}
            >
              {stock > 0 ? `В наличии: ${stock} ${product.unit}` : 'Нет в наличии'}
            </span>
          </div>

          <p className="text-[var(--muted)] leading-relaxed mb-8">{product.description}</p>

          {stock > 0 && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Количество ({product.unit}), шаг {step}
                </label>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => changeQty(-step)}
                    disabled={quantity <= step}
                    className="w-10 h-10 rounded-lg border border-[var(--border)] flex items-center justify-center hover:bg-[var(--cream)] disabled:opacity-30 transition-colors"
                  >
                    <Minus size={16} />
                  </button>
                  <input
                    type="number"
                    value={quantity}
                    min={step}
                    max={stock}
                    step={step}
                    onChange={(e) => handleQtyInput(e.target.value)}
                    className="w-24 text-center border border-[var(--border)] rounded-lg py-2 focus:outline-none focus:border-[var(--amber)]"
                  />
                  <button
                    onClick={() => changeQty(step)}
                    disabled={quantity >= stock}
                    className="w-10 h-10 rounded-lg border border-[var(--border)] flex items-center justify-center hover:bg-[var(--cream)] disabled:opacity-30 transition-colors"
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>

              <div className="text-lg font-semibold text-[var(--forest)]">
                Итого: {(price * quantity).toLocaleString('ru-RU')} ₽
              </div>

              <button
                onClick={handleAddToCart}
                className="w-full flex items-center justify-center gap-2 bg-[var(--forest)] text-white px-6 py-3.5 rounded-xl font-semibold hover:bg-[var(--amber)] transition-colors"
              >
                <ShoppingCart size={20} />
                Добавить в корзину
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
