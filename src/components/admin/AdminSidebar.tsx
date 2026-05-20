'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Package, ClipboardList, LayoutDashboard, TreePine, LogOut } from 'lucide-react'
import { signOut } from 'next-auth/react'

const NAV = [
  { href: '/admin/dashboard', icon: LayoutDashboard, label: 'Дашборд' },
  { href: '/admin/products', icon: Package, label: 'Товары' },
  { href: '/admin/orders', icon: ClipboardList, label: 'Заявки' },
]

export default function AdminSidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-56 shrink-0 bg-[var(--forest)] text-white flex flex-col min-h-screen">
      <div className="p-5 border-b border-white/10">
        <Link href="/" className="flex items-center gap-2 font-bold text-lg">
          <TreePine size={20} className="text-[var(--amber)]" />
          ТД Ангара
        </Link>
        <p className="text-white/40 text-xs mt-0.5">Админ-панель</p>
      </div>

      <nav className="flex-1 p-3 space-y-1">
        {NAV.map(({ href, icon: Icon, label }) => {
          const active = pathname.startsWith(href)
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                active ? 'bg-white/15 text-white' : 'text-white/60 hover:text-white hover:bg-white/10'
              }`}
            >
              <Icon size={18} />
              {label}
            </Link>
          )
        })}
      </nav>

      <div className="p-3 border-t border-white/10">
        <button
          onClick={() => signOut({ callbackUrl: '/admin/login' })}
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-white/60 hover:text-white hover:bg-white/10 transition-colors w-full"
        >
          <LogOut size={18} />
          Выйти
        </button>
      </div>
    </aside>
  )
}
