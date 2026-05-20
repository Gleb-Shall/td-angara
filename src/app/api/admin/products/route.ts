import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireAdmin } from '@/lib/adminAuth'

export async function GET() {
  const deny = await requireAdmin()
  if (deny) return deny

  const products = await prisma.product.findMany({ orderBy: { createdAt: 'desc' } })
  return NextResponse.json(products)
}

export async function POST(req: NextRequest) {
  const deny = await requireAdmin()
  if (deny) return deny

  try {
    const body = await req.json()
    const { name, description, price, unit, stock, step, images, isActive } = body

    if (!name || !price || !unit) {
      return NextResponse.json({ error: 'Заполните обязательные поля' }, { status: 400 })
    }

    const product = await prisma.product.create({
      data: { name, description, price: Number(price), unit, stock: Number(stock ?? 0), step: Number(step ?? 1), images: images ?? [], isActive: isActive ?? true },
    })
    return NextResponse.json(product, { status: 201 })
  } catch {
    return NextResponse.json({ error: 'Ошибка сервера' }, { status: 500 })
  }
}
