'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import CartIcon from './CartIcon'

const NAV = [
  { href: '/catalog', label: 'Каталог' },
  { href: '/about', label: 'О компании' },
  { href: '/contacts', label: 'Контакты' },
]

function AngaraLogo() {
  return (
    <svg width="32" height="32" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <polygon points="50,4 93,27 93,73 50,96 7,73 7,27" stroke="#C8893A" strokeWidth="6" fill="none" />
      <text x="50" y="67" textAnchor="middle" fill="#C8893A" fontSize="52" fontWeight="800" fontFamily="system-ui">А</text>
    </svg>
  )
}

export default function HeaderV1() {
  const [open, setOpen] = useState(false)

  return (
    <header style={{ background: '#1C2B1A' }} className="text-white sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
          <AngaraLogo />
          <span className="leading-tight">
            <span className="block font-black text-sm tracking-widest text-white">АНГАРА</span>
            <span className="block text-[9px] tracking-[0.2em] text-white/45 font-medium">ТОРГОВЫЙ ДОМ</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {NAV.map((n) => (
            <Link key={n.href} href={n.href} className="text-sm text-white/65 hover:text-white transition-colors">
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <div className="[&_a]:text-white [&_a]:hover:text-[#C8893A]">
            <CartIcon />
          </div>
          <button className="md:hidden text-white/80 hover:text-white transition-colors" onClick={() => setOpen(!open)}>
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="md:hidden border-t border-white/10 px-6 py-4 flex flex-col gap-4">
          {NAV.map((n) => (
            <Link key={n.href} href={n.href} onClick={() => setOpen(false)} className="text-sm text-white/70 hover:text-white py-1">
              {n.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  )
}
