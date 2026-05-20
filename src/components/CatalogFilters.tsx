'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useCallback } from 'react'
import { Search } from 'lucide-react'

export default function CatalogFilters() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const update = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString())
      if (value) params.set(key, value)
      else params.delete(key)
      router.push(`/catalog?${params.toString()}`)
    },
    [router, searchParams]
  )

  return (
    <div className="flex flex-col sm:flex-row gap-3">
      <div className="relative flex-1 max-w-sm">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--muted)]" />
        <input
          type="text"
          placeholder="Поиск по названию..."
          defaultValue={searchParams.get('q') ?? ''}
          onChange={(e) => update('q', e.target.value)}
          className="w-full pl-9 pr-4 py-2.5 border border-[var(--border)] rounded-lg text-sm focus:outline-none focus:border-[var(--amber)] bg-white"
        />
      </div>

      <select
        defaultValue={searchParams.get('sort') ?? ''}
        onChange={(e) => update('sort', e.target.value)}
        className="px-4 py-2.5 border border-[var(--border)] rounded-lg text-sm focus:outline-none focus:border-[var(--amber)] bg-white text-[var(--text)]"
      >
        <option value="">Сначала новые</option>
        <option value="price_asc">Цена: по возрастанию</option>
        <option value="price_desc">Цена: по убыванию</option>
      </select>
    </div>
  )
}
