'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Trash2, Plus, Minus, ShoppingCart, CheckCircle } from 'lucide-react'
import { useCartStore } from '@/store/cart'
import toast from 'react-hot-toast'

export default function CartPageClient() {
  const { items, updateQuantity, removeItem, clearCart, total } = useCartStore()
  const [form, setForm] = useState({ name: '', phone: '', comment: '' })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState<number | null>(null)

  const changeQty = (productId: string, step: number, delta: number, current: number) => {
    const next = Math.round((current + delta * step) * 1e10) / 1e10
    if (next >= step) updateQuantity(productId, next)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name.trim() || !form.phone.trim()) {
      toast.error('Заполните имя и телефон')
      return
    }

    setLoading(true)
    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          clientName: form.name,
          clientPhone: form.phone,
          comment: form.comment,
          items: items.map((i) => ({ productId: i.productId, quantity: i.quantity })),
        }),
      })

      const data = await res.json()
      if (!res.ok) throw new Error(data.error)

      setSuccess(data.number)
      clearCart()
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Ошибка отправки')
    } finally {
      setLoading(false)
    }
  }

  if (success !== null) {
    return (
      <div className="max-w-lg mx-auto px-4 py-20 text-center">
        <CheckCircle size={56} className="text-green-500 mx-auto mb-4" />
        <h1 className="text-2xl font-bold mb-2">Заявка отправлена!</h1>
        <p className="text-[var(--muted)] mb-2">Номер заявки: <strong>#{success}</strong></p>
        <p className="text-[var(--muted)] mb-8">Мы свяжемся с вами в ближайшее время.</p>
        <Link
          href="/catalog"
          className="inline-block bg-[var(--forest)] text-white px-6 py-3 rounded-xl font-semibold hover:bg-[var(--amber)] transition-colors"
        >
          Вернуться в каталог
        </Link>
      </div>
    )
  }

  if (items.length === 0) {
    return (
      <div className="max-w-lg mx-auto px-4 py-20 text-center">
        <ShoppingCart size={56} className="text-[var(--muted)] mx-auto mb-4" />
        <h1 className="text-2xl font-bold mb-2">Корзина пуста</h1>
        <p className="text-[var(--muted)] mb-8">Добавьте товары из каталога</p>
        <Link
          href="/catalog"
          className="inline-block bg-[var(--forest)] text-white px-6 py-3 rounded-xl font-semibold hover:bg-[var(--amber)] transition-colors"
        >
          Перейти в каталог
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
      <h1 className="text-3xl font-bold mb-8">Корзина</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Список товаров */}
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <div key={item.productId} className="bg-white rounded-xl border border-[var(--border)] p-4 flex gap-4">
              <Link
                href={`/catalog/${item.productId}`}
                className="relative w-20 h-20 rounded-lg overflow-hidden shrink-0 bg-[var(--cream)] group"
              >
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  sizes="80px"
                />
              </Link>
              <div className="flex-1 min-w-0">
                <Link
                  href={`/catalog/${item.productId}`}
                  className="block hover:text-[var(--amber)] transition-colors"
                >
                  <h3 className="font-semibold text-sm line-clamp-1 mb-1">{item.name}</h3>
                </Link>
                <p className="text-[var(--muted)] text-sm mb-3">
                  {item.price.toLocaleString('ru-RU')} ₽ / {item.unit}
                </p>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => changeQty(item.productId, item.step, -1, item.quantity)}
                    className="w-7 h-7 rounded border border-[var(--border)] flex items-center justify-center hover:bg-[var(--cream)] transition-colors"
                  >
                    <Minus size={12} />
                  </button>
                  <span className="text-sm font-medium w-16 text-center">
                    {item.quantity} {item.unit}
                  </span>
                  <button
                    onClick={() => changeQty(item.productId, item.step, 1, item.quantity)}
                    className="w-7 h-7 rounded border border-[var(--border)] flex items-center justify-center hover:bg-[var(--cream)] transition-colors"
                  >
                    <Plus size={12} />
                  </button>
                </div>
              </div>
              <div className="flex flex-col items-end justify-between shrink-0">
                <button
                  onClick={() => removeItem(item.productId)}
                  className="text-[var(--muted)] hover:text-red-500 transition-colors"
                >
                  <Trash2 size={16} />
                </button>
                <p className="font-semibold text-sm">
                  {(item.price * item.quantity).toLocaleString('ru-RU')} ₽
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Форма заявки */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl border border-[var(--border)] p-6 sticky top-20">
            <div className="flex justify-between items-center mb-4 pb-4 border-b border-[var(--border)]">
              <span className="font-semibold">Итого</span>
              <span className="text-xl font-bold text-[var(--forest)]">
                {total().toLocaleString('ru-RU')} ₽
              </span>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Имя *</label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Иван Иванов"
                  className="w-full border border-[var(--border)] rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-[var(--amber)]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Телефон *</label>
                <input
                  type="tel"
                  required
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  placeholder="+7 (953) 585-05-09"
                  className="w-full border border-[var(--border)] rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-[var(--amber)]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Комментарий</label>
                <textarea
                  value={form.comment}
                  onChange={(e) => setForm({ ...form, comment: e.target.value })}
                  placeholder="Адрес доставки, пожелания..."
                  rows={3}
                  className="w-full border border-[var(--border)] rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-[var(--amber)] resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[var(--forest)] text-white py-3 rounded-xl font-semibold hover:bg-[var(--amber)] transition-colors disabled:opacity-60"
              >
                {loading ? 'Отправляем...' : 'Отправить заявку'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
