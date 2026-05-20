import Link from 'next/link'
import Image from 'next/image'
import { prisma } from '@/lib/prisma'
import { ArrowRight, Truck, Award, Phone, Layers } from 'lucide-react'
import ProductCard from '@/components/ProductCard'

export const revalidate = 0

const FEATURES = [
  { icon: Award, title: 'Качество по ГОСТ', desc: 'Категории C и D, влажность 12–14% после камерной сушки' },
  { icon: Layers, title: 'Собственное производство', desc: 'Сосна и лиственница из Сибири — с пилорамы напрямую' },
  { icon: Truck, title: 'Доставка по Красноярску', desc: 'На объект, с физлицами и юрлицами, без посредников' },
  { icon: Phone, title: 'Без выходных', desc: 'Принимаем заявки ежедневно — менеджер ответит быстро' },
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
      {/* Hero — split screen, text left / image right */}
      <section className="min-h-[100dvh] grid md:grid-cols-2">
        <div className="bg-[var(--forest)] flex flex-col justify-center px-8 md:px-16 py-24 md:py-0">
          <p className="text-[var(--amber)] text-[11px] font-bold uppercase tracking-[0.25em] mb-6">
            Пиломатериалы · Красноярск
          </p>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tighter leading-none text-white mb-8">
            ТОРГОВЫЙ<br />
            <span className="text-[var(--amber)]">ДОМ</span><br />
            АНГАРА
          </h1>
          <p className="text-white/55 text-base leading-relaxed mb-10 max-w-[42ch]">
            Рейка, брусок, вагонка, имитация бруса, планкен и террасная доска.
            Сосна и лиственница напрямую с производства.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/catalog"
              className="btn-fill btn-press inline-flex items-center gap-2 bg-[var(--amber)] text-white px-7 py-3.5 rounded-lg font-semibold text-sm transition-colors"
            >
              <span>Смотреть каталог</span>
              <ArrowRight size={15} />
            </Link>
            <a
              href="tel:+79535850509"
              className="btn-press inline-flex items-center gap-2 border border-white/20 text-white/80 hover:text-white hover:border-white/40 px-7 py-3.5 rounded-lg font-semibold text-sm transition-all duration-300"
            >
              <Phone size={15} />
              +7 (953) 585-05-09
            </a>
          </div>
        </div>

        <div className="relative min-h-[55vw] md:min-h-0 order-first md:order-last">
          <Image
            src="/products/XL.webp"
            alt="Склад ТД Ангара"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[var(--forest)]/30 to-transparent" />
          <div className="absolute bottom-8 left-8">
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl px-5 py-3">
              <p className="text-white text-sm font-semibold">Большой ассортимент в наличии</p>
              <p className="text-white/60 text-xs mt-0.5">Оптовые и розничные поставки</p>
            </div>
          </div>
        </div>
      </section>

      {/* Преимущества — border divider, no cards */}
      <section className="bg-[var(--forest)]">
        <div className="max-w-7xl mx-auto px-6 divide-y divide-white/10 md:divide-y-0 md:grid md:grid-cols-4 md:divide-x md:divide-white/10">
          {FEATURES.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="px-0 md:px-8 py-10 first:pl-0 last:pr-0">
              <Icon size={22} className="text-[var(--amber)] mb-4" strokeWidth={1.5} />
              <h3 className="font-bold text-white text-sm mb-2">{title}</h3>
              <p className="text-white/45 text-sm leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Офис — editorial split */}
      <section className="grid md:grid-cols-12 min-h-[380px]">
        <div className="md:col-span-5 relative min-h-[260px]">
          <Image src="/products/2.webp" alt="ТД Ангара" fill className="object-cover" />
        </div>
        <div className="md:col-span-7 bg-[var(--cream-dark)] flex flex-col justify-center px-10 md:px-20 py-16">
          <p className="text-[var(--amber)] text-[11px] font-bold uppercase tracking-[0.25em] mb-4">О компании</p>
          <h2 className="text-3xl md:text-4xl font-black tracking-tight text-[var(--text)] mb-5 leading-snug">
            Работаем с 2010 года<br />в Красноярске
          </h2>
          <p className="text-[var(--muted)] leading-relaxed mb-8 max-w-[52ch]">
            Торговый дом «Ангара» — прямой поставщик пиломатериалов.
            Собственный склад на ул. Маерчака, 109М. Обслуживаем строителей,
            подрядчиков и частных клиентов.
          </p>
          <Link href="/about" className="inline-flex items-center gap-2 text-[var(--text)] font-semibold text-sm hover:text-[var(--amber)] transition-colors group">
            Подробнее
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
        </div>
      </section>

      {/* Товары — асимметричный bento */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="text-[var(--amber)] text-[11px] font-bold uppercase tracking-[0.25em] mb-3">Ассортимент</p>
              <h2 className="text-4xl font-black tracking-tight">Наши товары</h2>
            </div>
            <Link href="/catalog" className="hidden md:inline-flex items-center gap-2 text-[var(--muted)] hover:text-[var(--text)] font-medium text-sm transition-colors group">
              Весь каталог
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </div>

          {/* Bento grid: featured (7/12) + small (5/12), then 3 smaller */}
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
              Весь каталог <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA — photo overlay */}
      <section className="relative min-h-[380px] flex items-center overflow-hidden">
        <Image src="/products/1.webp" alt="" fill className="object-cover" />
        <div className="absolute inset-0 bg-[var(--forest)]/80" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
          <div className="max-w-xl">
            <h2 className="text-4xl md:text-5xl font-black tracking-tight text-white mb-4 leading-tight">
              Готовы<br />сделать заказ?
            </h2>
            <p className="text-white/55 mb-8 leading-relaxed">
              Добавьте товары в корзину и оставьте заявку — перезвоним в течение часа
            </p>
            <Link
              href="/catalog"
              className="btn-press inline-flex items-center gap-2 bg-[var(--amber)] hover:bg-[var(--amber-dark)] text-white px-8 py-4 rounded-lg font-semibold transition-colors duration-300"
            >
              Перейти в каталог <ArrowRight size={17} />
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
