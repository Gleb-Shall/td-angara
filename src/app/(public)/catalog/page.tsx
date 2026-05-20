import { prisma } from '@/lib/prisma'
import ProductCard from '@/components/ProductCard'
import CatalogFilters from '@/components/CatalogFilters'

export const revalidate = 0

export const metadata = {
  title: 'Каталог — ТД Ангара',
  description: 'Пиломатериалы из сосны и лиственницы: рейка, брусок, вагонка, имитация бруса, планкен, террасная доска.',
}

interface Props {
  searchParams: Promise<{ q?: string; sort?: string }>
}

export default async function CatalogPage({ searchParams }: Props) {
  const { q, sort } = await searchParams

  let products: Awaited<ReturnType<typeof prisma.product.findMany>> = []
  try {
    products = await prisma.product.findMany({
      where: {
        isActive: true,
        ...(q ? { name: { contains: q, mode: 'insensitive' } } : {}),
      },
      orderBy:
        sort === 'price_asc'
          ? { price: 'asc' }
          : sort === 'price_desc'
          ? { price: 'desc' }
          : { createdAt: 'desc' },
    })
  } catch {
    // DB unavailable
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
      <h1 className="text-3xl font-bold mb-2">Каталог</h1>
      <p className="text-[var(--muted)] mb-8">
        {products.length} {products.length === 1 ? 'товар' : products.length < 5 ? 'товара' : 'товаров'}
      </p>

      <CatalogFilters />

      {products.length === 0 ? (
        <div className="text-center py-20 text-[var(--muted)]">
          <p className="text-xl mb-2">Ничего не найдено</p>
          <p className="text-sm">Попробуйте изменить запрос</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-8">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  )
}
