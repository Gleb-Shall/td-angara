import Link from 'next/link'
import { MapPin, Phone, TreePine } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-[var(--forest)] text-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <div className="flex items-center gap-2 font-bold text-lg mb-2">
            <TreePine size={20} className="text-[var(--amber)]" />
            ТД Ангара
          </div>
          <p className="text-white/60 text-sm leading-relaxed">
            Пиломатериалы из сосны и лиственницы. Сушка до 12–14%, сортировка по ГОСТ.
          </p>
        </div>

        <div>
          <h4 className="font-semibold mb-3 text-[var(--amber)]">Навигация</h4>
          <ul className="space-y-2 text-sm text-white/70">
            <li><Link href="/catalog" className="hover:text-white transition-colors">Каталог</Link></li>
            <li><Link href="/about" className="hover:text-white transition-colors">О компании</Link></li>
            <li><Link href="/contacts" className="hover:text-white transition-colors">Контакты</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-3 text-[var(--amber)]">Контакты</h4>
          <ul className="space-y-2 text-sm text-white/70">
            <li className="flex items-start gap-2">
              <MapPin size={16} className="mt-0.5 shrink-0" />
              Красноярск, ул. Маерчака, 109М
            </li>
            <li className="flex items-center gap-2">
              <Phone size={16} className="shrink-0" />
              <a href="tel:+79535850509" className="hover:text-white transition-colors">
                +7 (953) 585-05-09
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10 py-4 text-center text-xs text-white/40">
        © {new Date().getFullYear()} ТД Ангара. Все права защищены.
      </div>
    </footer>
  )
}
