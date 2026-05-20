import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, MapPin, Phone, Clock } from 'lucide-react'

export const metadata = { title: 'О компании — ТД Ангара' }

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[420px] flex items-end overflow-hidden">
        <Image src="/products/2.webp" alt="ТД Ангара" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--forest)] via-[var(--forest)]/60 to-transparent" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full pb-16">
          <p className="text-[var(--amber)] text-[11px] font-bold uppercase tracking-[0.25em] mb-3">О компании</p>
          <h1 className="text-5xl md:text-6xl font-black tracking-tighter text-white leading-none">
            Торговый дом<br />
            <span className="text-[var(--amber)]">«Ангара»</span>
          </h1>
        </div>
      </section>

      {/* Основной текст */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-12 gap-12">
          <div className="md:col-span-7">
            <p className="text-lg text-[var(--text)] leading-relaxed mb-6">
              Торговый дом «Ангара» — поставщик пиломатериалов в Красноярске.
              Работаем с 2010 года, обслуживаем строительные компании, подрядчиков и частных клиентов.
            </p>
            <p className="text-[var(--muted)] leading-relaxed mb-6">
              Собственный склад на ул. Маерчака позволяет поддерживать большой ассортимент в постоянном наличии.
              Работаем с физическими и юридическими лицами, предоставляем все необходимые документы.
            </p>
            <p className="text-[var(--muted)] leading-relaxed">
              Вся продукция сертифицирована, соответствует категориям C и D по ГОСТ.
              Влажность после камерной сушки — 12–14%.
            </p>
          </div>

          <div className="md:col-span-5 space-y-0 divide-y divide-[var(--border)]">
            {[
              { label: 'Год основания', value: '2010' },
              { label: 'Расположение', value: 'Красноярск' },
              { label: 'Режим работы', value: 'Без выходных' },
              { label: 'Доставка', value: 'По Красноярскому краю' },
            ].map(({ label, value }) => (
              <div key={label} className="flex justify-between items-center py-4">
                <span className="text-[var(--muted)] text-sm">{label}</span>
                <span className="font-bold text-[var(--text)]">{value}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Фото склада */}
      <section className="grid md:grid-cols-2 min-h-[340px]">
        <div className="relative min-h-[260px]">
          <Image src="/products/XL.webp" alt="Склад" fill className="object-cover" />
        </div>
        <div className="relative min-h-[260px]">
          <Image src="/products/3.webp" alt="Пиломатериалы" fill className="object-cover" />
        </div>
      </section>

      {/* Контакты */}
      <section className="bg-[var(--cream)] py-16">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-[var(--amber)] text-[11px] font-bold uppercase tracking-[0.25em] mb-4">Контакты</p>
          <h2 className="text-3xl font-black tracking-tight mb-10">Как с нами связаться</h2>

          <div className="grid md:grid-cols-3 gap-px bg-[var(--border)]">
            {[
              { icon: MapPin, label: 'Адрес', value: 'г. Красноярск, ул. Маерчака, 109М' },
              { icon: Phone, label: 'Телефон', value: '+7 (953) 585-05-09', href: 'tel:+79535850509' },
              { icon: Clock, label: 'Режим работы', value: 'Ежедневно, без выходных' },
            ].map(({ icon: Icon, label, value, href }) => (
              <div key={label} className="bg-white p-8">
                <Icon size={20} className="text-[var(--amber)] mb-4" strokeWidth={1.5} />
                <p className="text-[var(--muted)] text-xs uppercase tracking-wider mb-2">{label}</p>
                {href ? (
                  <a href={href} className="font-bold text-[var(--text)] hover:text-[var(--amber)] transition-colors">{value}</a>
                ) : (
                  <p className="font-bold text-[var(--text)]">{value}</p>
                )}
              </div>
            ))}
          </div>

          <div className="mt-10">
            <Link href="/catalog" className="inline-flex items-center gap-2 bg-[var(--forest)] text-white px-7 py-3.5 rounded-lg font-semibold text-sm hover:bg-[var(--amber)] transition-colors group">
              Смотреть каталог
              <ArrowRight size={15} className="group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
