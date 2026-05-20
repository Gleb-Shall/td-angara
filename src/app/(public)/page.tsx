import Link from 'next/link'
import Image from 'next/image'
import { prisma } from '@/lib/prisma'
import { ArrowRight, Truck, Award, Phone, Layers } from 'lucide-react'
import ProductCard from '@/components/ProductCard'

export const revalidate = 0

const FEATURES = [
  { icon: Award, title: 'Качество по ГОСТ', desc: 'Категории C и D, влажность 12–14%' },
  { icon: Layers, title: 'Своё производство', desc: 'Сосна и лиственница из Сибири' },
  { icon: Truck, title: 'Доставка', desc: 'По Красноярску и краю' },
  { icon: Phone, title: 'Без выходных', desc: 'Ответим на любой вопрос' },
]

export default async function HomePage() {
  const products = await prisma.product.findMany({
    where: { isActive: true },
    take: 5,
    orderBy: { createdAt: 'asc' },
  })

  const [featured, ...rest] = products

  return (
    <>
      {/* Hero — split screen */}
      <section className="min-h-[100dvh] grid md:grid-cols-[55%_45%]">
        {/* Left: content */}
        <div className="bg-[var(--forest)] relative flex flex-col justify-between px-8 md:px-16 pt-16 pb-12 order-2 md:order-1">
          {/* Decorative large number */}
          <div className="absolute top-8 right-8 text-[120px] md:text-[160px] font-black text-white/[0.04] leading-none select-none pointer-events-none">
            14
          </div>

          <div className="relative z-10">
            <p className="text-[var(--amber)] text-[11px] font-bold uppercase tracking-[0.3em] mb-8">
              Пиломатериалы · Красноярск
            </p>
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-none text-white mb-6">
              ТД<br />
              <span className="text-[var(--amber)]">АН-</span><br />
              ГАРА
            </h1>
            <p className="text-white/50 text-sm leading-loose mb-10 max-w-[38ch] font-light tracking-wide">
              Рейка · Брусок · Вагонка · Имитация бруса<br />
              Планкен · Террасная доска
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/catalog"
                className="btn-press inline-flex items-center gap-2 bg-[var(--amber)] hover:bg-[var(--amber-dark)] text-white px-7 py-3.5 rounded-lg font-bold text-sm transition-colors duration-300"
              >
                Каталог <ArrowRight size={15} />
              </Link>
              <a
                href="tel:+79535850509"
                className="btn-press inline-flex items-center gap-2 border border-white/15 text-white/70 hover:text-white hover:border-white/35 px-7 py-3.5 rounded-lg font-medium text-sm transition-all duration-300"
              >
                <Phone size={14} /> +7 (953) 585-05-09
              </a>
            </div>
          </div>

          {/* Bottom stat bar */}
          <div className="relative z-10 mt-16 pt-8 border-t border-white/10 grid grid-cols-3 gap-4">
            {[
              { n: '2010', label: 'год основания' },
              { n: '14%', label: 'влажность после сушки' },
              { n: '109М', label: 'ул. Маерчака' },
            ].map(({ n, label }) => (
              <div key={label}>
                <div className="text-2xl font-black text-white tracking-tight">{n}</div>
                <div className="text-white/35 text-[11px] mt-0.5 leading-snug">{label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: photo */}
        <div className="relative min-h-[50vw] md:min-h-0 order-1 md:order-2">
          <Image
            src="/products/XL.webp"
            alt="Склад ТД Ангара"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-[var(--forest)]/20" />
          {/* Floating card */}
          <div className="absolute bottom-8 right-8 bg-[var(--forest)]/80 backdrop-blur-sm border border-white/10 rounded-xl px-5 py-4 max-w-[200px]">
            <p className="text-[var(--amber)] text-[10px] font-bold uppercase tracking-wider mb-1">В наличии</p>
            <p className="text-white text-sm font-semibold leading-snug">Большой ассортимент на складе</p>
          </div>
        </div>
      </section>

      {/* Преимущества — dividers, no cards */}
      <section className="bg-[var(--forest)] border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/10">
            {FEATURES.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="px-6 py-10 first:pl-0 last:pr-0">
                <Icon size={20} className="text-[var(--amber)] mb-4" strokeWidth={1.5} />
                <h3 className="font-bold text-white text-sm mb-1.5">{title}</h3>
                <p className="text-white/40 text-xs leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Editorial split — компания */}
      <section className="grid md:grid-cols-[42%_58%] min-h-[380px]">
        <div className="relative min-h-[280px]">
          <Image src="/products/2.webp" alt="ТД Ангара" fill className="object-cover" />
        </div>
        <div className="bg-[var(--cream)] flex flex-col justify-center px-10 md:px-20 py-16">
          <p className="text-[var(--amber)] text-[11px] font-bold uppercase tracking-[0.25em] mb-4">О компании</p>
          <h2 className="text-3xl md:text-4xl font-black tracking-tight text-[var(--text)] mb-5 leading-tight">
            Работаем с 2010 года,<br />знаем материал
          </h2>
          <p className="text-[var(--muted)] leading-relaxed mb-8 max-w-[50ch] text-sm">
            Собственный склад на ул. Маерчака, 109М. Прямые поставки без посредников.
            Обслуживаем строителей, подрядчиков и частных клиентов по всему Красноярскому краю.
          </p>
          <Link href="/about" className="inline-flex items-center gap-2 text-[var(--text)] font-semibold text-sm hover:text-[var(--amber)] transition-colors group">
            Подробнее
            <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
        </div>
      </section>

      {/* Товары — bento asymmetric */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="text-[var(--amber)] text-[11px] font-bold uppercase tracking-[0.25em] mb-3">Ассортимент</p>
              <h2 className="text-4xl font-black tracking-tight">Наши товары</h2>
            </div>
            <Link href="/catalog" className="hidden md:inline-flex items-center gap-2 text-[var(--muted)] hover:text-[var(--text)] font-medium text-sm transition-colors group">
              Весь каталог
              <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
            {featured && (
              <div className="md:col-span-7 card-reveal" style={{ animationDelay: '0ms' }}>
                <ProductCard product={featured} featured />
              </div>
            )}
            {rest[0] && (
              <div className="md:col-span-5 card-reveal" style={{ animationDelay: '80ms' }}>
                <ProductCard product={rest[0]} />
              </div>
            )}
            {rest.slice(1).map((p, i) => (
              <div key={p.id} className="md:col-span-4 card-reveal" style={{ animationDelay: `${(i + 2) * 80}ms` }}>
                <ProductCard product={p} />
              </div>
            ))}
          </div>

          <div className="md:hidden mt-8 text-center">
            <Link href="/catalog" className="inline-flex items-center gap-2 text-[var(--text)] font-semibold hover:text-[var(--amber)] transition-colors">
              Весь каталог <ArrowRight size={13} />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative min-h-[360px] flex items-center overflow-hidden">
        <Image src="/products/1.webp" alt="" fill className="object-cover" />
        <div className="absolute inset-0 bg-[var(--forest)]/85" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
          <div className="max-w-xl">
            <h2 className="text-4xl md:text-5xl font-black tracking-tight text-white mb-4 leading-tight">
              Готовы<br />сделать заказ?
            </h2>
            <p className="text-white/50 mb-8 text-sm leading-relaxed max-w-[40ch]">
              Добавьте товары в корзину и оставьте заявку — перезвоним в течение часа
            </p>
            <Link
              href="/catalog"
              className="btn-press inline-flex items-center gap-2 bg-[var(--amber)] hover:bg-[var(--amber-dark)] text-white px-8 py-4 rounded-lg font-bold transition-colors duration-300"
            >
              Перейти в каталог <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
