import { notFound } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import ProductDetail from '@/components/ProductDetail'

export const revalidate = 0

interface Props {
  params: Promise<{ id: string }>
}

export default async function ProductPage({ params }: Props) {
  const { id } = await params
  const product = await prisma.product.findFirst({
    where: { id, isActive: true },
  })

  if (!product) notFound()

  return <ProductDetail product={product} />
}
