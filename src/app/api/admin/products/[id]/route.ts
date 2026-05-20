import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireAdmin } from '@/lib/adminAuth'

type Ctx = { params: Promise<{ id: string }> }

export async function GET(_req: Request, { params }: Ctx) {
  const deny = await requireAdmin()
  if (deny) return deny
  const { id } = await params
  const product = await prisma.product.findUnique({ where: { id } })
  if (!product) return NextResponse.json({ error: 'Не найдено' }, { status: 404 })
  return NextResponse.json(product)
}

export async function PUT(req: NextRequest, { params }: Ctx) {
  const deny = await requireAdmin()
  if (deny) return deny
  try {
    const { id } = await params
    const body = await req.json()
    const { name, description, price, unit, stock, step, images, isActive } = body
    const product = await prisma.product.update({
      where: { id },
      data: { name, description, price: Number(price), unit, stock: Number(stock), step: Number(step), images, isActive },
    })
    return NextResponse.json(product)
  } catch {
    return NextResponse.json({ error: 'Ошибка сервера' }, { status: 500 })
  }
}

export async function DELETE(_req: Request, { params }: Ctx) {
  const deny = await requireAdmin()
  if (deny) return deny
  const { id } = await params
  await prisma.product.delete({ where: { id } })
  return NextResponse.json({ ok: true })
}
