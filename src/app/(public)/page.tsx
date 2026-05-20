import Link from 'next/link'
import Image from 'next/image'
import { prisma } from '@/lib/prisma'
import { ArrowRight, Truck, Award, Phone, Layers } from 'lucide-react'
import ProductCard from '@/components/ProductCard'

export const revalidate = 0

const FEATURES = [
  { icon: Award, title: 'Качество по ГОСТ', desc: 'Категории C и D, влажность 12–14% после камерной сушки' },
  { icon: Layers, title: 'Собственное производство', desc: 'Сосна и лиственница из Сибири — напрямую с пилорамы' },
  { icon: Truck, title: 'Доставка по Красноярску', desc: 'Доставляем на объект, работаем с физлицами и юрлицами' },
  { icon: Phone, title: 'Работаем без выходных', desc: 'Принимаем заявки ежедневно, менеджер ответит быстро' },
]

export default async function HomePage() {
  const products = await prisma.product.findMany({
    where: { isActive: true },
    take: 6,
    orderBy: { createdAt: 'desc' },
  })

  return (
    <>
      {/* Hero */}
      <section className="relative bg-[var(--forest)] text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/products/XL.webp"
            alt=""
            fill
            className="object-cover opacity-20"
            priority
          />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-24 md:py-36">
          <div className="max-w-2xl">
            <p className="text-[var(--amber)] text-xs font-bold uppercase tracking-[0.2em] mb-5">
              Пиломатериалы · Красноярск
            </p>
            <h1 className="text-5xl md:text-7xl font-black leading-[0.95] mb-6 tracking-tight">
              АНГАРА<br />
              <span className="text-[var(--amber)]">ТОРГОВЫЙ</span><br />
              ДОМ
            </h1>
            <p className="text-white/65 text-lg mb-10 leading-relaxed max-w-lg">
              Рейка, брусок, вагонка, имитация бруса, планкен и террасная доска.
              Сосна и лиственница напрямую с производства.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/catalog"
                className="inline-flex items-center gap-2 bg-[var(--amber)] text-white px-7 py-3.5 rounded-lg font-semibold hover:bg-amber-600 transition-colors text-sm"
              >
                Смотреть каталог <ArrowRight size={16} />
              </Link>
              <a
                href="tel:+79535850509"
                className="inline-flex items-center gap-2 border border-white/25 text-white px-7 py-3.5 rounded-lg font-semibold hover:border-white/50 transition-colors text-sm"
              >
                <Phone size={16} /> +7 (953) 585-05-09
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Фотоблок склада */}
      <section className="grid md:grid-cols-2 min-h-[380px]">
        <div className="relative min-h-[260px]">
          <Image src="/products/2.webp" alt="ТД Ангара — офис" fill className="object-cover" />
        </div>
        <div className="bg-[var(--cream)] flex flex-col justify-center px-10 py-14">
          <p className="text-[var(--amber)] text-xs font-bold uppercase tracking-[0.2em] mb-3">О компании</p>
          <h2 className="text-3xl font-bold text-[var(--text)] mb-4 leading-snug">
            Большой ассортимент<br />в наличии
          </h2>
          <p className="text-[var(--muted)] leading-relaxed mb-6">
            Торговый дом «Ангара» — поставщик пиломатериалов в Красноярске.
            Работаем с 2010 года, обслуживаем строительные компании и частных клиентов.
          </p>
          <Link href="/about" className="inline-flex items-center gap-2 text-[var(--forest)] font-semibold text-sm hover:text-[var(--amber)] transition-colors">
            Подробнее о нас <ArrowRight size={15} />
          </Link>
        </div>
      </section>

      {/* Преимущества */}
      <section className="bg-[var(--forest)] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-px bg-white/10">
            {FEATURES.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="bg-[var(--forest)] p-8">
                <Icon size={28} className="text-[var(--amber)] mb-4" />
                <h3 className="font-bold text-white mb-2">{title}</h3>
                <p className="text-white/55 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Каталог */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="text-[var(--amber)] text-xs font-bold uppercase tracking-[0.2em] mb-2">Ассортимент</p>
              <h2 className="text-3xl md:text-4xl font-bold">Наши товары</h2>
            </div>
            <Link href="/catalog" className="hidden sm:inline-flex items-center gap-2 text-[var(--forest)] font-semibold text-sm hover:text-[var(--amber)] transition-colors">
              Весь каталог <ArrowRight size={15} />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {products.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
          <div className="sm:hidden mt-8 text-center">
            <Link href="/catalog" className="inline-flex items-center gap-2 text-[var(--forest)] font-semibold hover:text-[var(--amber)] transition-colors">
              Весь каталог <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>

      {/* Фото-баннер с древесиной */}
      <section className="relative h-72 md:h-96 overflow-hidden">
        <Image src="/products/1.webp" alt="" fill className="object-cover" />
        <div className="absolute inset-0 bg-[var(--forest)]/70" />
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Готовы сделать заказ?</h2>
          <p className="text-white/70 mb-8 max-w-md">Добавьте товары в корзину и оставьте заявку — перезвоним в течение часа</p>
          <Link
            href="/catalog"
            className="inline-flex items-center gap-2 bg-[var(--amber)] text-white px-8 py-4 rounded-lg font-semibold hover:bg-amber-600 transition-colors"
          >
            Перейти в каталог <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </>
  )
}
