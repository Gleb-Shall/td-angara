import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import Image from 'next/image'
import { Plus } from 'lucide-react'
import ProductToggle from '@/components/admin/ProductToggle'

export const revalidate = 0

export default async function AdminProductsPage() {
  const products = await prisma.product.findMany({ orderBy: { createdAt: 'desc' } })

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Товары</h1>
        <Link
          href="/admin/products/new"
          className="flex items-center gap-2 bg-[#1C2B1A] text-white px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-[#2563EB] transition-colors"
        >
          <Plus size={16} /> Добавить товар
        </Link>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="text-left px-4 py-3 font-medium text-gray-500">Товар</th>
              <th className="text-right px-4 py-3 font-medium text-gray-500">Цена</th>
              <th className="text-center px-4 py-3 font-medium text-gray-500">Наличие</th>
              <th className="text-center px-4 py-3 font-medium text-gray-500">Активен</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {products.map((p) => (
              <tr key={p.id} className="hover:bg-gray-50">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="relative w-10 h-10 rounded-lg overflow-hidden bg-gray-100 shrink-0">
                      {p.images[0] && (
                        <Image src={p.images[0]} alt={p.name} fill className="object-cover" sizes="40px" />
                      )}
                    </div>
                    <span className="font-medium">{p.name}</span>
                  </div>
                </td>
                <td className="px-4 py-3 text-right">{Number(p.price).toLocaleString('ru-RU')} ₽/{p.unit}</td>
                <td className="px-4 py-3 text-center text-gray-500">{Number(p.stock)} {p.unit}</td>
                <td className="px-4 py-3 text-center">
                  <ProductToggle id={p.id} isActive={p.isActive} />
                </td>
                <td className="px-4 py-3 text-right">
                  <Link
                    href={`/admin/products/${p.id}`}
                    className="text-[#2563EB] hover:underline font-medium"
                  >
                    Редактировать
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {products.length === 0 && (
          <p className="text-gray-400 text-sm py-10 text-center">Товаров нет. Добавьте первый.</p>
        )}
      </div>
    </div>
  )
}
