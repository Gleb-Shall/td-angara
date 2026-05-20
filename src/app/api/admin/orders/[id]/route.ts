import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireAdmin } from '@/lib/adminAuth'

type Ctx = { params: Promise<{ id: string }> }

export async function GET(_req: Request, { params }: Ctx) {
  const deny = await requireAdmin()
  if (deny) return deny

  const { id } = await params
  const order = await prisma.order.findUnique({
    where: { id },
    include: { items: true, history: { orderBy: { createdAt: 'asc' } } },
  })
  if (!order) return NextResponse.json({ error: 'Не найдено' }, { status: 404 })
  return NextResponse.json(order)
}
