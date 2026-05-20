import { prisma } from '@/lib/prisma'
import { Package, ClipboardList, Bell } from 'lucide-react'
import Link from 'next/link'

export const revalidate = 0

export default async function DashboardPage() {
  const [totalProducts, totalOrders, newOrders] = await Promise.all([
    prisma.product.count(),
    prisma.order.count(),
    prisma.order.count({ where: { status: 'NEW' } }),
  ])

  const recentOrders = await prisma.order.findMany({
    take: 5,
    orderBy: { createdAt: 'desc' },
    include: { items: true },
  })

  const STATUS_LABELS: Record<string, string> = {
    NEW: 'Новая',
    IN_PROGRESS: 'В обработке',
    DONE: 'Завершена',
    CANCELLED: 'Отменена',
  }

  const STATUS_COLORS: Record<string, string> = {
    NEW: 'bg-blue-100 text-blue-700',
    IN_PROGRESS: 'bg-yellow-100 text-yellow-700',
    DONE: 'bg-green-100 text-green-700',
    CANCELLED: 'bg-gray-100 text-gray-500',
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-8">Дашборд</h1>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center gap-3 mb-2">
            <Package size={20} className="text-[var(--amber)]" />
            <span className="text-sm text-gray-500">Товаров</span>
          </div>
          <p className="text-3xl font-bold">{totalProducts}</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center gap-3 mb-2">
            <ClipboardList size={20} className="text-[var(--amber)]" />
            <span className="text-sm text-gray-500">Всего заявок</span>
          </div>
          <p className="text-3xl font-bold">{totalOrders}</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center gap-3 mb-2">
            <Bell size={20} className="text-blue-500" />
            <span className="text-sm text-gray-500">Новых заявок</span>
          </div>
          <p className="text-3xl font-bold text-blue-600">{newOrders}</p>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold">Последние заявки</h2>
          <Link href="/admin/orders" className="text-sm text-[var(--amber)] hover:underline">
            Все заявки →
          </Link>
        </div>
        <div className="divide-y divide-gray-100">
          {recentOrders.map((order) => (
            <Link
              key={order.id}
              href={`/admin/orders/${order.id}`}
              className="flex items-center justify-between py-3 hover:bg-gray-50 -mx-2 px-2 rounded transition-colors"
            >
              <div>
                <span className="font-medium text-sm">#{order.number} — {order.clientName}</span>
                <p className="text-xs text-gray-400 mt-0.5">
                  {new Date(order.createdAt).toLocaleString('ru-RU')}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium">{Number(order.totalAmount).toLocaleString('ru-RU')} ₽</span>
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${STATUS_COLORS[order.status]}`}>
                  {STATUS_LABELS[order.status]}
                </span>
              </div>
            </Link>
          ))}
          {recentOrders.length === 0 && (
            <p className="text-gray-400 text-sm py-4 text-center">Заявок пока нет</p>
          )}
        </div>
      </div>
    </div>
  )
}
