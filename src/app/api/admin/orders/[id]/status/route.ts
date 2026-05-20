import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireAdmin } from '@/lib/adminAuth'
import { OrderStatus } from '@prisma/client'

const STATUS_LABELS: Record<OrderStatus, string> = {
  NEW: 'Новая',
  IN_PROGRESS: 'В обработке',
  DONE: 'Завершена',
  CANCELLED: 'Отменена',
}

type Ctx = { params: Promise<{ id: string }> }

export async function PUT(req: NextRequest, { params }: Ctx) {
  const deny = await requireAdmin()
  if (deny) return deny

  try {
    const { id } = await params
    const { status } = await req.json()

    if (!Object.values(OrderStatus).includes(status)) {
      return NextResponse.json({ error: 'Неверный статус' }, { status: 400 })
    }

    const current = await prisma.order.findUnique({ where: { id }, select: { status: true } })
    if (!current) return NextResponse.json({ error: 'Не найдено' }, { status: 404 })

    const order = await prisma.order.update({
      where: { id },
      data: {
        status,
        history: {
          create: {
            event: `Статус изменён: ${STATUS_LABELS[current.status]} → ${STATUS_LABELS[status as OrderStatus]}`,
          },
        },
      },
    })

    return NextResponse.json(order)
  } catch {
    return NextResponse.json({ error: 'Ошибка сервера' }, { status: 500 })
  }
}
