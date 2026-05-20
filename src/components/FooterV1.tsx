import Link from 'next/link'
import Image from 'next/image'
import { MapPin, Phone } from 'lucide-react'

export default function FooterV1() {
  return (
    <footer style={{ background: '#1C2B1A' }} className="text-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-10">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <Image src="/brand/landing_logo_x2.png" alt="ТД Ангара" width={32} height={32} className="brightness-0 invert" />
            <div className="leading-tight">
              <div className="font-bold text-sm tracking-wide">АНГАРА</div>
              <div className="text-[10px] tracking-[0.15em] text-white/50">ТОРГОВЫЙ ДОМ</div>
            </div>
          </div>
          <p className="text-white/55 text-sm leading-relaxed">
            Пиломатериалы из сосны и лиственницы.<br />
            Сушка до 12–14%, сортировка по ГОСТ.
          </p>
        </div>

        <div>
          <h4 className="font-semibold mb-4 text-[#C8893A] text-sm uppercase tracking-wider">Навигация</h4>
          <ul className="space-y-2.5 text-sm text-white/65">
            <li><Link href="/catalog" className="hover:text-white transition-colors">Каталог</Link></li>
            <li><Link href="/about" className="hover:text-white transition-colors">О компании</Link></li>
            <li><Link href="/contacts" className="hover:text-white transition-colors">Контакты</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-4 text-[#C8893A] text-sm uppercase tracking-wider">Контакты</h4>
          <ul className="space-y-3 text-sm text-white/65">
            <li className="flex items-start gap-2">
              <MapPin size={15} className="mt-0.5 shrink-0 text-[#C8893A]" />
              Красноярск, ул. Маерчака, 109М
            </li>
            <li className="flex items-center gap-2">
              <Phone size={15} className="shrink-0 text-[#C8893A]" />
              <a href="tel:+79535850509" className="hover:text-white transition-colors">+7 (953) 585-05-09</a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10 py-4 text-center text-xs text-white/30">
        © {new Date().getFullYear()} ТД Ангара. Все права защищены.
      </div>
    </footer>
  )
}
