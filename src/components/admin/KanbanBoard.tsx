'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ExternalLink, GripVertical, Phone, Calendar, Package } from 'lucide-react'
import toast from 'react-hot-toast'

type OrderStatus = 'NEW' | 'IN_PROGRESS' | 'DONE' | 'CANCELLED'

export type KanbanOrder = {
  id: string
  number: number
  clientName: string
  clientPhone: string
  totalAmount: number
  createdAt: string
  itemCount: number
  status: OrderStatus
}

const COLUMNS: {
  status: OrderStatus
  label: string
  color: string
  bg: string
  border: string
  dot: string
}[] = [
  {
    status: 'NEW',
    label: 'Новые',
    color: 'text-blue-700',
    bg: 'bg-blue-50',
    border: 'border-blue-200',
    dot: 'bg-blue-500',
  },
  {
    status: 'IN_PROGRESS',
    label: 'В обработке',
    color: 'text-amber-700',
    bg: 'bg-amber-50',
    border: 'border-amber-200',
    dot: 'bg-amber-500',
  },
  {
    status: 'DONE',
    label: 'Завершены',
    color: 'text-green-700',
    bg: 'bg-green-50',
    border: 'border-green-200',
    dot: 'bg-green-500',
  },
  {
    status: 'CANCELLED',
    label: 'Отменены',
    color: 'text-gray-500',
    bg: 'bg-gray-50',
    border: 'border-gray-200',
    dot: 'bg-gray-400',
  },
]

export default function KanbanBoard({ initialOrders }: { initialOrders: KanbanOrder[] }) {
  const [orders, setOrders] = useState(initialOrders)
  const [draggingId, setDraggingId] = useState<string | null>(null)
  const [dragOverCol, setDragOverCol] = useState<OrderStatus | null>(null)
  const [pending, setPending] = useState<Set<string>>(new Set())

  const moveOrder = async (orderId: string, newStatus: OrderStatus) => {
    const snapshot = orders
    setOrders((prev) => prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o)))
    setPending((prev) => new Set(prev).add(orderId))

    try {
      const res = await fetch(`/api/admin/orders/${orderId}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      })
      if (!res.ok) throw new Error()
    } catch {
      setOrders(snapshot)
      toast.error('Не удалось изменить статус')
    } finally {
      setPending((prev) => {
        const next = new Set(prev)
        next.delete(orderId)
        return next
      })
    }
  }

  const handleDragStart = (e: React.DragEvent, id: string) => {
    setDraggingId(id)
    e.dataTransfer.effectAllowed = 'move'
  }

  const handleDrop = (e: React.DragEvent, status: OrderStatus) => {
    e.preventDefault()
    const order = orders.find((o) => o.id === draggingId)
    if (draggingId && order && order.status !== status) {
      moveOrder(draggingId, status)
    }
    setDraggingId(null)
    setDragOverCol(null)
  }

  const byStatus = (status: OrderStatus) => orders.filter((o) => o.status === status)

  return (
    <div className="flex gap-3 overflow-x-auto pb-4 -mx-6 px-6 min-h-[56vh]">
      {COLUMNS.map((col) => {
        const colOrders = byStatus(col.status)
        const isOver = dragOverCol === col.status

        return (
          <div
            key={col.status}
            className={`shrink-0 w-72 flex flex-col rounded-xl border ${col.border} transition-all duration-150 ${isOver ? 'ring-2 ring-[var(--amber)] ring-offset-1' : ''}`}
            onDragOver={(e) => { e.preventDefault(); setDragOverCol(col.status) }}
            onDragLeave={(e) => {
              if (!e.currentTarget.contains(e.relatedTarget as Node)) setDragOverCol(null)
            }}
            onDrop={(e) => handleDrop(e, col.status)}
          >
            {/* Column header */}
            <div className={`${col.bg} rounded-t-xl px-3 py-2.5 flex items-center justify-between border-b ${col.border}`}>
              <div className="flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full ${col.dot} shrink-0`} />
                <span className={`font-semibold text-sm ${col.color}`}>{col.label}</span>
              </div>
              <span className={`text-xs font-bold tabular-nums w-5 h-5 flex items-center justify-center rounded-full ${col.bg} ${col.color} border ${col.border}`}>
                {colOrders.length}
              </span>
            </div>

            {/* Cards */}
            <div className="flex flex-col gap-2 p-2 flex-1 overflow-y-auto max-h-[calc(100vh-240px)]">
              {colOrders.map((order) => (
                <div
                  key={order.id}
                  draggable
                  onDragStart={(e) => handleDragStart(e, order.id)}
                  onDragEnd={() => { setDraggingId(null); setDragOverCol(null) }}
                  className={`bg-white rounded-lg border border-gray-100 p-3 cursor-grab active:cursor-grabbing hover:shadow-sm hover:border-gray-200 transition-all select-none ${draggingId === order.id ? 'opacity-40 shadow-lg' : ''} ${pending.has(order.id) ? 'animate-pulse' : ''}`}
                >
                  {/* Card header */}
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-1">
                      <GripVertical size={13} className="text-gray-200 shrink-0" />
                      <span className="font-bold text-sm text-[var(--forest)]">#{order.number}</span>
                    </div>
                    <Link
                      href={`/admin/orders/${order.id}`}
                      onClick={(e) => e.stopPropagation()}
                      title="Открыть заявку"
                      className="text-gray-300 hover:text-[var(--amber)] transition-colors"
                    >
                      <ExternalLink size={13} />
                    </Link>
                  </div>

                  {/* Client name */}
                  <p className="font-semibold text-sm text-gray-900 line-clamp-1 mb-2">{order.clientName}</p>

                  {/* Meta */}
                  <div className="space-y-1 mb-3">
                    <div className="flex items-center gap-1.5 text-xs text-gray-400">
                      <Phone size={10} className="shrink-0" />
                      <span>{order.clientPhone}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-gray-400">
                      <Calendar size={10} className="shrink-0" />
                      <span>{new Date(order.createdAt).toLocaleDateString('ru-RU')}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-gray-400">
                      <Package size={10} className="shrink-0" />
                      <span>{order.itemCount} позиц.</span>
                    </div>
                  </div>

                  {/* Footer: amount + quick move */}
                  <div className="flex items-center justify-between gap-2 pt-2 border-t border-gray-50">
                    <span className="font-bold text-[13px] text-[var(--forest)]">
                      {order.totalAmount.toLocaleString('ru-RU')} ₽
                    </span>
                    <select
                      value={order.status}
                      onChange={(e) => {
                        e.stopPropagation()
                        moveOrder(order.id, e.target.value as OrderStatus)
                      }}
                      onClick={(e) => e.stopPropagation()}
                      className="text-[11px] border border-gray-200 rounded px-1.5 py-0.5 bg-white text-gray-500 cursor-pointer hover:border-[var(--amber)] focus:outline-none focus:border-[var(--amber)] transition-colors"
                    >
                      <option value="NEW">Новая</option>
                      <option value="IN_PROGRESS">В обработке</option>
                      <option value="DONE">Завершена</option>
                      <option value="CANCELLED">Отменена</option>
                    </select>
                  </div>
                </div>
              ))}

              {colOrders.length === 0 && (
                <div className="flex-1 flex items-center justify-center min-h-[80px]">
                  <p className="text-xs text-gray-300">Пусто</p>
                </div>
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}
