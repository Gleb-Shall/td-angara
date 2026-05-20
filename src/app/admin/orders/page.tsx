import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import { OrderStatus } from '@prisma/client'

export const revalidate = 0

const STATUS_LABELS: Record<OrderStatus, string> = {
  NEW: 'Новая',
  IN_PROGRESS: 'В обработке',
  DONE: 'Завершена',
  CANCELLED: 'Отменена',
}

const STATUS_COLORS: Record<OrderStatus, string> = {
  NEW: 'bg-blue-100 text-blue-700',
  IN_PROGRESS: 'bg-yellow-100 text-yellow-700',
  DONE: 'bg-green-100 text-green-700',
  CANCELLED: 'bg-gray-100 text-gray-500',
}

interface Props {
  searchParams: Promise<{ status?: string; page?: string }>
}

export default async function AdminOrdersPage({ searchParams }: Props) {
  const { status, page } = await searchParams
  const currentPage = Number(page ?? 1)
  const limit = 20
  const skip = (currentPage - 1) * limit

  const where = status && status !== 'ALL'
    ? { status: status as OrderStatus }
    : {}

  const [orders, total] = await Promise.all([
    prisma.order.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      skip,
      take: limit,
      include: { items: true },
    }),
    prisma.order.count({ where }),
  ])

  const totalPages = Math.ceil(total / limit)

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Заявки</h1>

      {/* Фильтры */}
      <div className="flex gap-2 mb-6 flex-wrap">
        {['ALL', ...Object.values(OrderStatus)].map((s) => (
          <Link
            key={s}
            href={`/admin/orders?status=${s}`}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              (status ?? 'ALL') === s
                ? 'bg-[var(--forest)] text-white'
                : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
            }`}
          >
            {s === 'ALL' ? 'Все' : STATUS_LABELS[s as OrderStatus]}
          </Link>
        ))}
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="text-left px-4 py-3 font-medium text-gray-500">№</th>
              <th className="text-left px-4 py-3 font-medium text-gray-500">Клиент</th>
              <th className="text-left px-4 py-3 font-medium text-gray-500">Телефон</th>
              <th className="text-left px-4 py-3 font-medium text-gray-500">Дата</th>
              <th className="text-right px-4 py-3 font-medium text-gray-500">Сумма</th>
              <th className="text-center px-4 py-3 font-medium text-gray-500">Статус</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {orders.map((order) => (
              <tr key={order.id} className="hover:bg-gray-50">
                <td className="px-4 py-3 font-medium">#{order.number}</td>
                <td className="px-4 py-3">{order.clientName}</td>
                <td className="px-4 py-3 text-gray-500">{order.clientPhone}</td>
                <td className="px-4 py-3 text-gray-500">
                  {new Date(order.createdAt).toLocaleDateString('ru-RU')}
                </td>
                <td className="px-4 py-3 text-right font-medium">
                  {Number(order.totalAmount).toLocaleString('ru-RU')} ₽
                </td>
                <td className="px-4 py-3 text-center">
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${STATUS_COLORS[order.status]}`}>
                    {STATUS_LABELS[order.status]}
                  </span>
                </td>
                <td className="px-4 py-3 text-right">
                  <Link
                    href={`/admin/orders/${order.id}`}
                    className="text-[var(--amber)] hover:underline font-medium"
                  >
                    Открыть
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {orders.length === 0 && (
          <p className="text-gray-400 text-sm py-10 text-center">Заявок нет</p>
        )}
      </div>

      {totalPages > 1 && (
        <div className="flex gap-2 mt-4 justify-center">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <Link
              key={p}
              href={`/admin/orders?status=${status ?? 'ALL'}&page=${p}`}
              className={`w-8 h-8 rounded flex items-center justify-center text-sm ${
                p === currentPage ? 'bg-[var(--forest)] text-white' : 'bg-white border border-gray-200 hover:bg-gray-50'
              }`}
            >
              {p}
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
