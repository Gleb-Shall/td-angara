'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { OrderStatus } from '@prisma/client'
import toast from 'react-hot-toast'

const STATUS_LABELS: Record<OrderStatus, string> = {
  NEW: 'Новая',
  IN_PROGRESS: 'В обработке',
  DONE: 'Завершена',
  CANCELLED: 'Отменена',
}

interface Props {
  id: string
  currentStatus: OrderStatus
}

export default function OrderStatusSelect({ id, currentStatus }: Props) {
  const [status, setStatus] = useState(currentStatus)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleChange = async (next: OrderStatus) => {
    if (next === status) return
    setLoading(true)
    const res = await fetch(`/api/admin/orders/${id}/status`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: next }),
    })
    setLoading(false)
    if (res.ok) {
      setStatus(next)
      toast.success('Статус обновлён')
      router.refresh()
    } else {
      toast.error('Ошибка обновления статуса')
    }
  }

  return (
    <select
      value={status}
      disabled={loading}
      onChange={(e) => handleChange(e.target.value as OrderStatus)}
      className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#C8893A] bg-white disabled:opacity-60"
    >
      {Object.values(OrderStatus).map((s) => (
        <option key={s} value={s}>{STATUS_LABELS[s]}</option>
      ))}
    </select>
  )
}
