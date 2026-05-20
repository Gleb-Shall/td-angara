'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Trash2 } from 'lucide-react'
import toast from 'react-hot-toast'

export default function DeleteProductButton({ id }: { id: string }) {
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleDelete = async () => {
    if (!confirm('Удалить товар? Это действие необратимо.')) return
    setLoading(true)
    const res = await fetch(`/api/admin/products/${id}`, { method: 'DELETE' })
    if (res.ok) {
      toast.success('Товар удалён')
      router.push('/admin/products')
      router.refresh()
    } else {
      toast.error('Ошибка удаления')
      setLoading(false)
    }
  }

  return (
    <button
      onClick={handleDelete}
      disabled={loading}
      className="flex items-center gap-2 text-red-500 border border-red-200 px-4 py-2 rounded-lg text-sm hover:bg-red-50 transition-colors disabled:opacity-50"
    >
      <Trash2 size={16} />
      Удалить
    </button>
  )
}
