import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

interface OrderItemInput {
  productId: string
  quantity: number
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { clientName, clientPhone, comment, items } = body

    if (!clientName || !clientPhone || !items?.length) {
      return NextResponse.json({ error: 'Заполните все обязательные поля' }, { status: 400 })
    }

    const productIds = items.map((i: OrderItemInput) => i.productId)
    const products = await prisma.product.findMany({
      where: { id: { in: productIds }, isActive: true },
    })

    if (products.length !== items.length) {
      return NextResponse.json({ error: 'Один или несколько товаров недоступны' }, { status: 400 })
    }

    const orderItems = items.map((item: OrderItemInput) => {
      const product = products.find((p) => p.id === item.productId)!
      const price = Number(product.price)
      const quantity = item.quantity
      return {
        productId: item.productId,
        name: product.name,
        price,
        unit: product.unit,
        quantity,
        total: Math.round(price * quantity * 100) / 100,
      }
    })

    const totalAmount = orderItems.reduce((sum: number, i: { total: number }) => sum + i.total, 0)

    const order = await prisma.order.create({
      data: {
        clientName,
        clientPhone,
        comment,
        totalAmount,
        items: { create: orderItems },
        history: {
          create: { event: 'Заявка создана' },
        },
      },
      include: { items: true },
    })

    return NextResponse.json({ id: order.id, number: order.number }, { status: 201 })
  } catch {
    return NextResponse.json({ error: 'Ошибка сервера' }, { status: 500 })
  }
}
