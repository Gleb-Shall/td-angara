import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  await prisma.product.deleteMany()

  const products = [
    {
      name: 'Рейка сосновая',
      description: 'Строганая рейка из сосны. Применяется для обрешётки, декоративной отделки и изготовления мебели. Влажность 12–14%.',
      price: 45,
      unit: 'пог.м',
      stock: 5000,
      step: 1,
      images: ['https://images.unsplash.com/photo-1541123437800-1bb1317badc2?w=600&q=80'],
      isActive: true,
    },
    {
      name: 'Брусок 50×50',
      description: 'Строганый брусок сечением 50×50 мм. Используется в строительстве для каркасов, стропил и обрешётки.',
      price: 120,
      unit: 'пог.м',
      stock: 3000,
      step: 1,
      images: ['https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=600&q=80'],
      isActive: true,
    },
    {
      name: 'Вагонка сосна (категория B)',
      description: 'Классическая вагонка из сосны категории B. Идеальна для обшивки бань, саун и жилых помещений.',
      price: 380,
      unit: 'м²',
      stock: 800,
      step: 0.5,
      images: ['https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80'],
      isActive: true,
    },
    {
      name: 'Имитация бруса 140×20',
      description: 'Профилированная доска, имитирующая брус. Создаёт вид деревянного сруба. Применяется для наружной и внутренней отделки.',
      price: 520,
      unit: 'м²',
      stock: 600,
      step: 0.5,
      images: ['https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80'],
      isActive: true,
    },
    {
      name: 'Планкен прямой лиственница',
      description: 'Фасадная доска из лиственницы. Устойчива к влаге и перепадам температур. Долговечный материал для наружной отделки.',
      price: 890,
      unit: 'м²',
      stock: 400,
      step: 0.5,
      images: ['https://images.unsplash.com/photo-1564419320461-6870880221ad?w=600&q=80'],
      isActive: true,
    },
    {
      name: 'Террасная доска лиственница',
      description: 'Доска для открытых террас и настилов. Лиственница обеспечивает высокую устойчивость к влаге и биологическим поражениям.',
      price: 1200,
      unit: 'м²',
      stock: 300,
      step: 0.5,
      images: ['https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&q=80'],
      isActive: true,
    },
  ]

  for (const p of products) {
    await prisma.product.create({ data: p })
  }

  console.log('Seed завершён: добавлено', products.length, 'товаров')
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
