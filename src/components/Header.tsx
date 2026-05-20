'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Menu, X, TreePine } from 'lucide-react'
import CartIcon from './CartIcon'

const NAV = [
  { href: '/catalog', label: 'Каталог' },
  { href: '/about', label: 'О компании' },
  { href: '/contacts', label: 'Контакты' },
]

export default function Header() {
  const [open, setOpen] = useState(false)

  return (
    <header className="bg-[var(--forest)] text-white sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-bold text-lg tracking-tight hover:text-[var(--amber)] transition-colors">
          <TreePine size={24} className="text-[var(--amber)]" />
          ТД Ангара
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {NAV.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className="text-sm text-white/80 hover:text-white transition-colors"
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <div className="[&_a]:text-white [&_a]:hover:text-[var(--amber)]">
            <CartIcon />
          </div>
          <button
            className="md:hidden text-white"
            onClick={() => setOpen(!open)}
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="md:hidden border-t border-white/10 px-4 py-3 flex flex-col gap-3">
          {NAV.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              onClick={() => setOpen(false)}
              className="text-sm text-white/80 hover:text-white py-1"
            >
              {n.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  )
}
