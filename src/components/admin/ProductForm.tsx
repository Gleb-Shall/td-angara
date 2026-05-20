'use client'

import { useState, useRef } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Trash2, Upload, X } from 'lucide-react'
import toast from 'react-hot-toast'
import { Product } from '@prisma/client'

interface Props {
  product?: Product
}

const UNITS = ['шт', 'м²', 'м³', 'пог.м', 'пачка']

export default function ProductForm({ product }: Props) {
  const router = useRouter()
  const fileRef = useRef<HTMLInputElement>(null)
  const isEdit = !!product

  const [form, setForm] = useState({
    name: product?.name ?? '',
    description: product?.description ?? '',
    price: product ? String(product.price) : '',
    unit: product?.unit ?? 'пог.м',
    customUnit: '',
    stock: product ? String(product.stock) : '',
    step: product ? String(product.step) : '1',
    isActive: product?.isActive ?? true,
  })
  const [images, setImages] = useState<string[]>(product?.images ?? [])
  const [uploading, setUploading] = useState(false)
  const [saving, setSaving] = useState(false)

  const knownUnit = UNITS.includes(form.unit)

  const uploadFile = async (file: File) => {
    if (!isEdit) {
      toast.error('Сначала сохраните товар, затем добавьте фото')
      return
    }
    setUploading(true)
    const fd = new FormData()
    fd.append('file', file)
    const res = await fetch(`/api/admin/products/${product.id}/upload`, { method: 'POST', body: fd })
    const data = await res.json()
    if (res.ok) setImages((prev) => [...prev, data.url])
    else toast.error('Ошибка загрузки')
    setUploading(false)
  }

  const removeImage = async (url: string) => {
    const next = images.filter((i) => i !== url)
    setImages(next)
    if (isEdit) {
      await fetch(`/api/admin/products/${product.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, images: next }),
      })
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    const unit = knownUnit ? form.unit : form.customUnit || form.unit

    const body = {
      name: form.name,
      description: form.description,
      price: Number(form.price),
      unit,
      stock: Number(form.stock),
      step: Number(form.step),
      isActive: form.isActive,
      images,
    }

    const res = await fetch(
      isEdit ? `/api/admin/products/${product.id}` : '/api/admin/products',
      {
        method: isEdit ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      }
    )

    setSaving(false)
    if (res.ok) {
      toast.success(isEdit ? 'Товар обновлён' : 'Товар создан')
      router.push('/admin/products')
      router.refresh()
    } else {
      toast.error('Ошибка сохранения')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl space-y-6">
      <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-5">
        <h2 className="font-semibold text-gray-700">Основные данные</h2>

        <div>
          <label className="block text-sm font-medium mb-1">Название *</label>
          <input
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-[var(--amber)]"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Описание</label>
          <textarea
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            rows={4}
            className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-[var(--amber)] resize-none"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Цена (₽) *</label>
            <input
              required
              type="number"
              min="0"
              step="0.01"
              value={form.price}
              onChange={(e) => setForm({ ...form, price: e.target.value })}
              className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-[var(--amber)]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Единица измерения *</label>
            <select
              value={knownUnit ? form.unit : '__custom__'}
              onChange={(e) => {
                if (e.target.value === '__custom__') setForm({ ...form, unit: '' })
                else setForm({ ...form, unit: e.target.value, customUnit: '' })
              }}
              className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-[var(--amber)] bg-white"
            >
              {UNITS.map((u) => <option key={u} value={u}>{u}</option>)}
              <option value="__custom__">Другая...</option>
            </select>
            {!knownUnit && (
              <input
                value={form.customUnit}
                onChange={(e) => setForm({ ...form, customUnit: e.target.value })}
                placeholder="Введите единицу"
                className="mt-2 w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-[var(--amber)]"
              />
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Наличие</label>
            <input
              type="number"
              min="0"
              step="any"
              value={form.stock}
              onChange={(e) => setForm({ ...form, stock: e.target.value })}
              className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-[var(--amber)]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              Шаг заказа
              <span className="text-gray-400 font-normal ml-1">(напр. 0.5, 1)</span>
            </label>
            <input
              type="number"
              min="0.001"
              step="any"
              required
              value={form.step}
              onChange={(e) => setForm({ ...form, step: e.target.value })}
              className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-[var(--amber)]"
            />
          </div>
        </div>

        <div className="flex items-center gap-3">
          <input
            id="isActive"
            type="checkbox"
            checked={form.isActive}
            onChange={(e) => setForm({ ...form, isActive: e.target.checked })}
            className="w-4 h-4 accent-[var(--forest)]"
          />
          <label htmlFor="isActive" className="text-sm font-medium">Активен (отображается в каталоге)</label>
        </div>
      </div>

      {/* Фотографии */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="font-semibold text-gray-700 mb-4">Фотографии</h2>

        <div className="flex flex-wrap gap-3 mb-4">
          {images.map((url) => (
            <div key={url} className="relative w-24 h-24 rounded-lg overflow-hidden group border border-gray-200">
              <Image src={url} alt="" fill className="object-cover" sizes="96px" />
              <button
                type="button"
                onClick={() => removeImage(url)}
                className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity"
              >
                <X size={20} className="text-white" />
              </button>
            </div>
          ))}

          {isEdit && (
            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              disabled={uploading}
              className="w-24 h-24 rounded-lg border-2 border-dashed border-gray-300 flex flex-col items-center justify-center text-gray-400 hover:border-[var(--amber)] hover:text-[var(--amber)] transition-colors disabled:opacity-50"
            >
              <Upload size={20} className="mb-1" />
              <span className="text-xs">{uploading ? 'Загрузка...' : 'Добавить'}</span>
            </button>
          )}
        </div>

        {!isEdit && (
          <p className="text-sm text-gray-400">Сначала сохраните товар, затем добавьте фотографии.</p>
        )}

        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => e.target.files?.[0] && uploadFile(e.target.files[0])}
        />
      </div>

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={saving}
          className="bg-[var(--forest)] text-white px-6 py-2.5 rounded-lg font-medium hover:bg-[var(--amber)] transition-colors disabled:opacity-60"
        >
          {saving ? 'Сохранение...' : isEdit ? 'Сохранить' : 'Создать товар'}
        </button>
        <button
          type="button"
          onClick={() => router.back()}
          className="border border-gray-200 px-6 py-2.5 rounded-lg font-medium hover:bg-gray-50 transition-colors"
        >
          Отмена
        </button>
      </div>
    </form>
  )
}
