import { notFound } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import OrderStatusSelect from '@/components/admin/OrderStatusSelect'
import { OrderStatus } from '@prisma/client'

export const revalidate = 0

const STATUS_LABELS: Record<OrderStatus, string> = {
  NEW: 'Новая',
  IN_PROGRESS: 'В обработке',
  DONE: 'Завершена',
  CANCELLED: 'Отменена',
}

interface Props {
  params: Promise<{ id: string }>
}

export default async function OrderDetailPage({ params }: Props) {
  const { id } = await params
  const order = await prisma.order.findUnique({
    where: { id },
    include: {
      items: true,
      history: { orderBy: { createdAt: 'asc' } },
    },
  })
  if (!order) notFound()

  return (
    <div className="max-w-3xl">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Заявка #{order.number}</h1>
        <OrderStatusSelect id={order.id} currentStatus={order.status} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {/* Данные клиента */}
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <h2 className="font-semibold mb-3 text-gray-700">Данные клиента</h2>
          <dl className="space-y-2 text-sm">
            <div>
              <dt className="text-gray-400">Имя</dt>
              <dd className="font-medium">{order.clientName}</dd>
            </div>
            <div>
              <dt className="text-gray-400">Телефон</dt>
              <dd>
                <a href={`tel:${order.clientPhone}`} className="text-[#C8893A] font-medium">
                  {order.clientPhone}
                </a>
              </dd>
            </div>
            {order.comment && (
              <div>
                <dt className="text-gray-400">Комментарий</dt>
                <dd>{order.comment}</dd>
              </div>
            )}
            <div>
              <dt className="text-gray-400">Дата</dt>
              <dd>{new Date(order.createdAt).toLocaleString('ru-RU')}</dd>
            </div>
          </dl>
        </div>

        {/* Статус */}
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <h2 className="font-semibold mb-3 text-gray-700">Статус</h2>
          <p className="text-2xl font-bold text-[#1C2B1A]">{STATUS_LABELS[order.status]}</p>
          <p className="text-sm text-gray-400 mt-1">
            Обновлено: {new Date(order.updatedAt).toLocaleString('ru-RU')}
          </p>
        </div>
      </div>

      {/* Состав заказа */}
      <div className="bg-white rounded-xl border border-gray-200 p-5 mb-6">
        <h2 className="font-semibold mb-4 text-gray-700">Состав заказа</h2>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100">
              <th className="text-left py-2 font-medium text-gray-500">Товар</th>
              <th className="text-right py-2 font-medium text-gray-500">Кол-во</th>
              <th className="text-right py-2 font-medium text-gray-500">Цена</th>
              <th className="text-right py-2 font-medium text-gray-500">Сумма</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {order.items.map((item) => (
              <tr key={item.id}>
                <td className="py-2">{item.name}</td>
                <td className="py-2 text-right">{Number(item.quantity)} {item.unit}</td>
                <td className="py-2 text-right text-gray-500">{Number(item.price).toLocaleString('ru-RU')} ₽</td>
                <td className="py-2 text-right font-medium">{Number(item.total).toLocaleString('ru-RU')} ₽</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="border-t border-gray-200">
              <td colSpan={3} className="py-3 font-semibold text-right">Итого:</td>
              <td className="py-3 font-bold text-[#1C2B1A] text-right text-base">
                {Number(order.totalAmount).toLocaleString('ru-RU')} ₽
              </td>
            </tr>
          </tfoot>
        </table>
      </div>

      {/* История */}
      <div className="bg-white rounded-xl border border-gray-200 p-5">
        <h2 className="font-semibold mb-4 text-gray-700">История изменений</h2>
        <ol className="relative border-l border-gray-200 ml-2 space-y-4">
          {order.history.map((h) => (
            <li key={h.id} className="ml-4">
              <div className="absolute w-2.5 h-2.5 bg-[#C8893A] rounded-full -left-1.5 mt-1" />
              <p className="text-sm">{h.event}</p>
              <p className="text-xs text-gray-400 mt-0.5">
                {new Date(h.createdAt).toLocaleString('ru-RU')}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </div>
  )
}
