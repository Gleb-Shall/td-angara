import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import { ArrowRight, CheckCircle, Truck, Award, Phone } from 'lucide-react'
import ProductCard from '@/components/ProductCard'

export const revalidate = 0

const FEATURES = [
  { icon: Award, title: 'Качество по ГОСТ', desc: 'Сортировка категорий C и D, влажность 12–14% после сушки' },
  { icon: CheckCircle, title: 'Собственное производство', desc: 'Сосна и лиственница из Сибири — напрямую с пилорамы' },
  { icon: Truck, title: 'Доставка по Красноярску', desc: 'Доставляем на объект, работаем с физлицами и юрлицами' },
  { icon: Phone, title: 'Работаем без выходных', desc: 'Принимаем заявки ежедневно, отвечаем быстро' },
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
      <section className="bg-[var(--forest)] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-20 md:py-28">
          <div className="max-w-2xl">
            <p className="text-[var(--amber)] text-sm font-semibold uppercase tracking-widest mb-4">
              Пиломатериалы в Красноярске
            </p>
            <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
              Сосна и<br />лиственница<br />
              <span className="text-[var(--amber)]">напрямую</span><br />с производства
            </h1>
            <p className="text-white/70 text-lg mb-8 leading-relaxed">
              Рейка, брусок, вагонка, имитация бруса, планкен и террасная доска.
              Сушка до 12–14%, сортировка по ГОСТ. Оптовые скидки.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/catalog"
                className="inline-flex items-center gap-2 bg-[var(--amber)] text-white px-6 py-3 rounded-lg font-semibold hover:bg-amber-600 transition-colors"
              >
                Смотреть каталог <ArrowRight size={18} />
              </Link>
              <a
                href="tel:+79535850509"
                className="inline-flex items-center gap-2 border border-white/30 text-white px-6 py-3 rounded-lg font-semibold hover:border-white/60 transition-colors"
              >
                <Phone size={18} /> +7 (953) 585-05-09
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Преимущества */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">Почему выбирают нас</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {FEATURES.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="text-center p-6">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[var(--cream)] mb-4">
                  <Icon size={24} className="text-[var(--amber)]" />
                </div>
                <h3 className="font-semibold mb-2">{title}</h3>
                <p className="text-[var(--muted)] text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Превью каталога */}
      <section className="py-16 bg-[var(--cream)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl md:text-3xl font-bold">Наши товары</h2>
            <Link href="/catalog" className="text-[var(--amber)] font-semibold hover:underline flex items-center gap-1">
              Весь каталог <ArrowRight size={16} />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {products.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[var(--forest)] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Готовы сделать заказ?</h2>
          <p className="text-white/70 mb-8">Добавьте товары в корзину и оставьте заявку — перезвоним в течение часа</p>
          <Link
            href="/catalog"
            className="inline-flex items-center gap-2 bg-[var(--amber)] text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-amber-600 transition-colors"
          >
            Перейти в каталог <ArrowRight size={20} />
          </Link>
        </div>
      </section>
    </>
  )
}
