import { prisma } from '@/lib/prisma'
import { Package, ClipboardList, Bell, TrendingUp } from 'lucide-react'
import KanbanBoard from '@/components/admin/KanbanBoard'

export const revalidate = 0

export default async function DashboardPage() {
  const [totalProducts, totalOrders, newOrders, doneOrders, orders] = await Promise.all([
    prisma.product.count(),
    prisma.order.count(),
    prisma.order.count({ where: { status: 'NEW' } }),
    prisma.order.count({ where: { status: 'DONE' } }),
    prisma.order.findMany({
      orderBy: { createdAt: 'desc' },
      include: { items: { select: { id: true } } },
    }),
  ])

  const kanbanOrders = orders.map((o) => ({
    id: o.id,
    number: o.number,
    clientName: o.clientName,
    clientPhone: o.clientPhone,
    totalAmount: Number(o.totalAmount),
    createdAt: o.createdAt.toISOString(),
    itemCount: o.items.length,
    status: o.status as 'NEW' | 'IN_PROGRESS' | 'DONE' | 'CANCELLED',
  }))

  const STATS = [
    { icon: Package, label: 'Товаров', value: totalProducts, color: 'text-gray-400' },
    { icon: ClipboardList, label: 'Всего заявок', value: totalOrders, color: 'text-gray-400' },
    { icon: Bell, label: 'Новых', value: newOrders, color: 'text-blue-500', highlight: newOrders > 0 },
    { icon: TrendingUp, label: 'Завершено', value: doneOrders, color: 'text-green-500' },
  ]

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Дашборд</h1>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
        {STATS.map(({ icon: Icon, label, value, color, highlight }) => (
          <div
            key={label}
            className={`bg-white rounded-xl border p-4 ${highlight ? 'border-blue-200 bg-blue-50' : 'border-gray-200'}`}
          >
            <div className="flex items-center gap-2 mb-1.5">
              <Icon size={16} className={color} />
              <span className="text-xs text-gray-500">{label}</span>
            </div>
            <p className={`text-2xl font-bold ${highlight ? 'text-blue-700' : ''}`}>{value}</p>
          </div>
        ))}
      </div>

      {/* Kanban */}
      <div className="mb-2">
        <h2 className="font-semibold text-gray-700 text-sm mb-4">Заявки</h2>
        <KanbanBoard initialOrders={kanbanOrders} />
      </div>
    </div>
  )
}
