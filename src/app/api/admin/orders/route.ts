import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireAdmin } from '@/lib/adminAuth'
import { OrderStatus } from '@prisma/client'

export async function GET(req: NextRequest) {
  const deny = await requireAdmin()
  if (deny) return deny

  const { searchParams } = req.nextUrl
  const status = searchParams.get('status') as OrderStatus | null
  const page = Number(searchParams.get('page') ?? 1)
  const limit = 20
  const skip = (page - 1) * limit

  const where = status ? { status } : {}

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

  return NextResponse.json({ orders, total, page, limit })
}
