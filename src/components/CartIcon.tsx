'use client'

import Link from 'next/link'
import { ShoppingCart } from 'lucide-react'
import { useCartStore } from '@/store/cart'

export default function CartIcon() {
  const count = useCartStore((s) => s.items.reduce((acc, i) => acc + 1, 0))

  return (
    <Link
      href="/cart"
      className="relative flex items-center gap-1.5 text-sm font-medium text-[var(--forest)] hover:text-[var(--amber)] transition-colors"
    >
      <ShoppingCart size={22} />
      {count > 0 && (
        <span className="absolute -top-2 -right-2 bg-[var(--amber)] text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
          {count}
        </span>
      )}
    </Link>
  )
}
