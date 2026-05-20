import Link from 'next/link'
import Image from 'next/image'
import { prisma } from '@/lib/prisma'
import { ArrowRight, Award, Layers, Truck, Phone } from 'lucide-react'
import ProductCardHome from '@/components/ProductCardHome'

export const revalidate = 0

const FEATURES = [
  { icon: Award, title: 'Качество по ГОСТ', desc: 'Категории C и D, влажность 12–14% после камерной сушки' },
  { icon: Layers, title: 'Собственное производство', desc: 'Сосна и лиственница из Сибири — с пилорамы напрямую' },
  { icon: Truck, title: 'Доставка по Красноярску', desc: 'На объект, с физлицами и юрлицами, без посредников' },
  { icon: Phone, title: 'Без выходных', desc: 'Принимаем заявки ежедневно — менеджер ответит быстро' },
]

export default async function V2HomePage() {
  let products: Awaited<ReturnType<typeof prisma.product.findMany>> = []
  try {
    products = await prisma.product.findMany({ where: { isActive: true }, take: 5, orderBy: { createdAt: 'asc' } })
  } catch {
    // DB unavailable
  }

  const [featured, ...rest] = products

  return (
    <>
      {/* Hero */}
      <section className="relative w-full overflow-hidden bg-[var(--bg)] text-[var(--text)]" style={{ minHeight: 'clamp(640px, 92vh, 1080px)', display: 'flex', flexDirection: 'column' }}>
        <div className="absolute inset-0 z-0 pointer-events-none" aria-hidden="true">
          <Image src="/products/XL.webp" alt="" fill className="object-cover opacity-30" priority />
          <div className="absolute inset-0 bg-gradient-to-b from-[var(--bg)] via-[var(--bg)]/70 to-[var(--bg)]" />
          <div className="absolute -top-40 -right-40 h-[60vh] w-[60vh] rounded-full bg-[var(--primary)]/10 blur-3xl" />
        </div>

        <div className="absolute left-4 sm:left-8 lg:left-10 top-0 bottom-0 z-10 hidden sm:flex flex-col items-center pointer-events-none" aria-hidden="true">
          <div className="w-px flex-1 bg-[var(--border)]" />
          <div className="my-3 h-3 w-3 rotate-45 bg-[var(--primary)]" />
          <div className="w-px flex-1 bg-gradient-to-b from-[var(--primary)] to-transparent" />
        </div>

        <div className="relative z-20 border-b border-[var(--border)]/70">
          <div className="mx-auto max-w-[1440px] px-4 sm:px-10 lg:px-16 py-3 flex flex-wrap items-center justify-between gap-3 text-[0.7rem] sm:text-xs uppercase tracking-[0.25em] text-[var(--accent)]/70">
            <span className="inline-flex items-center gap-2">
              <span className="h-1.5 w-1.5 bg-[var(--primary)] inline-block" />
              EST · Красноярск · Маерчака 109М
            </span>
            <span className="hidden md:inline">пн–пт 10:00 — 18:00</span>
            <span className="inline-flex items-center gap-2">
              Камерная сушка <span className="text-[var(--text)] font-bold">12%</span>
            </span>
          </div>
        </div>

        <div className="relative z-20 flex-1 mx-auto max-w-[1440px] px-4 sm:px-10 lg:px-16 pt-10 pb-16 md:pt-16 md:pb-24 lg:pt-20 lg:pb-28 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end h-full">
            <div className="lg:col-span-7 flex flex-col gap-8">
              <div className="flex items-center gap-4 reveal" style={{ animationDelay: '0ms' }}>
                <span className="h-px w-12 bg-[var(--primary)]" />
                <span className="text-xs sm:text-sm uppercase tracking-[0.35em] text-[var(--accent)]/80">★ ТД «Ангара» — с 2010</span>
              </div>

              <h1 className="font-display text-[var(--text)] reveal" style={{ fontSize: 'clamp(3rem, 11vw, 9.5rem)', lineHeight: 0.85, letterSpacing: '-0.04em', animationDelay: '120ms' }}>
                <span className="block">Пиломатериалы</span>
                <span className="block text-[var(--primary)]">из сосны</span>
                <span className="block">и лиственницы</span>
              </h1>

              <p className="reveal max-w-[60ch] text-base sm:text-lg leading-relaxed text-[var(--text)]/85" style={{ animationDelay: '240ms' }}>
                Рейка, брусок, вагонка, имитация бруса, планкен, террасная доска. Сорта C–D, камерная сушка{' '}
                <span className="text-[var(--accent)] font-bold">12%</span>, цены{' '}
                <span className="text-[var(--accent)] font-bold">от 58 ₽/шт</span>.{' '}
                Опт <span className="text-[var(--primary)] font-bold">−10%</span> от 10 м³.
              </p>

              <div className="reveal grid grid-cols-3 gap-px bg-[var(--border)] border border-[var(--border)] max-w-2xl" style={{ animationDelay: '360ms' }}>
                {[{ v: '58₽', l: 'от / штука' }, { v: '12%', l: 'камерная сушка' }, { v: '−10%', l: 'опт от 10 м³' }].map(({ v, l }, i) => (
                  <div key={l} className="bg-[var(--bg)] p-4 sm:p-5">
                    <div className="font-display leading-none tracking-tight" style={{ fontSize: 'clamp(1.75rem, 3vw, 2.25rem)', color: i === 0 ? 'var(--primary)' : 'var(--text)' }}>{v}</div>
                    <div className="mt-2 text-[0.65rem] sm:text-xs uppercase tracking-[0.2em] text-[var(--accent)]/70">{l}</div>
                  </div>
                ))}
              </div>

              <div className="reveal flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2" style={{ animationDelay: '480ms' }}>
                <a href="tel:+79535850509" className="group inline-flex items-center justify-center gap-3 bg-[var(--primary)] hover:bg-[var(--accent)] hover:text-[var(--bg)] text-[var(--text)] px-7 py-4 font-bold uppercase tracking-[0.2em] text-sm transition-colors duration-300" style={{ boxShadow: '10px 10px 0px #00000033' }}>
                  <span>Позвонить</span>
                  <span className="font-display tracking-normal text-base">+7 953 585 05 09</span>
                  <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
                </a>
                <Link href="/1/catalog" className="inline-flex items-center justify-center gap-2 border border-[var(--border)] hover:border-[var(--accent)] text-[var(--accent)] px-6 py-4 font-bold uppercase tracking-[0.2em] text-sm transition-colors duration-300">
                  Каталог
                </Link>
              </div>

              <p className="reveal text-sm text-[var(--text)]/60 max-w-[55ch] border-l-2 border-[var(--primary)] pl-4" style={{ animationDelay: '600ms' }}>
                Прямые поставки с производства: если качество не устроит — заменим или вернём деньги.
              </p>
            </div>

            <div className="lg:col-span-5">
              <div className="reveal relative" style={{ animationDelay: '200ms' }}>
                <div className="absolute -top-4 -left-2 sm:-left-6 z-20 bg-[var(--primary)] text-[var(--text)] px-4 py-2 text-[0.65rem] sm:text-xs font-bold uppercase tracking-[0.3em]" style={{ boxShadow: '10px 10px 0px #00000020' }}>
                  Сорта C–D · Сосна / Лиственница
                </div>
                <div className="relative w-full overflow-hidden bg-[var(--surface)] ring-1 ring-white/10" style={{ aspectRatio: '21/9' }}>
                  <Image src="/products/2.webp" alt="Пиломатериалы ТД Ангара" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 42vw" />
                </div>
                <div className="mt-1 grid grid-cols-2 gap-px bg-[var(--border)] border border-[var(--border)]">
                  <div className="bg-[var(--bg)] p-4">
                    <div className="text-[0.65rem] uppercase tracking-[0.25em] text-[var(--accent)]/70">Адрес</div>
                    <div className="mt-1 font-display text-xl text-[var(--text)] tracking-wide">Маерчака, 109М</div>
                  </div>
                  <div className="bg-[var(--bg)] p-4">
                    <div className="text-[0.65rem] uppercase tracking-[0.25em] text-[var(--accent)]/70">График</div>
                    <div className="mt-1 font-display text-xl text-[var(--text)] tracking-wide">Пн–Пт · 10–18</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="relative z-20 mx-auto max-w-[1440px] px-4 sm:px-10 lg:px-16 pb-6 hidden md:flex items-center justify-between text-[0.65rem] uppercase tracking-[0.35em] text-[var(--accent)]/50">
          <span>Прокрутите вниз</span>
          <span>Самовывоз · Доставка · Рассрочка 0%</span>
        </div>
      </section>

      {/* Преимущества */}
      <section className="bg-[var(--surface)] border-y border-[var(--border)]">
        <div className="max-w-[1440px] mx-auto px-6 divide-y divide-[var(--border)] md:divide-y-0 md:grid md:grid-cols-4 md:divide-x md:divide-[var(--border)]">
          {FEATURES.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="px-0 md:px-8 py-10 first:pl-0 last:pr-0">
              <Icon size={22} className="text-[var(--primary)] mb-4" strokeWidth={1.5} />
              <h3 className="font-bold text-[var(--text)] text-sm mb-2">{title}</h3>
              <p className="text-[var(--muted-fg)] text-sm leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Товары */}
      <section className="py-20 bg-[var(--bg)] bg-blueprint">
        <div className="max-w-[1440px] mx-auto px-6">
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="text-[var(--primary)] text-[11px] font-bold uppercase tracking-[0.25em] mb-3">Ассортимент</p>
              <h2 className="font-display text-[var(--text)]" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', lineHeight: 0.9, letterSpacing: '-0.03em' }}>
                Наши товары
              </h2>
            </div>
            <Link href="/1/catalog" className="hidden md:inline-flex items-center gap-2 text-[var(--muted-fg)] hover:text-[var(--text)] font-medium text-sm transition-colors group">
              Весь каталог <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
            {featured && (
              <div className="md:col-span-7 card-reveal" style={{ animationDelay: '0ms' }}>
                <ProductCardHome product={featured} featured />
              </div>
            )}
            {rest[0] && (
              <div className="md:col-span-5 card-reveal" style={{ animationDelay: '80ms' }}>
                <ProductCardHome product={rest[0]} />
              </div>
            )}
            {rest.slice(1).map((p, i) => (
              <div key={p.id} className="md:col-span-4 card-reveal" style={{ animationDelay: `${(i + 2) * 80}ms` }}>
                <ProductCardHome product={p} />
              </div>
            ))}
          </div>

          {products.length === 0 && (
            <p className="text-center text-[var(--muted-fg)] py-16">Товары загружаются...</p>
          )}
        </div>
      </section>

      {/* О компании */}
      <section className="grid md:grid-cols-12 min-h-[380px] border-t border-[var(--border)]">
        <div className="md:col-span-5 relative min-h-[260px]">
          <Image src="/products/1.webp" alt="ТД Ангара" fill className="object-cover" />
          <div className="absolute inset-0 bg-[var(--bg)]/20" />
        </div>
        <div className="md:col-span-7 bg-[var(--surface)] flex flex-col justify-center px-10 md:px-20 py-16 beam-left">
          <p className="text-[var(--primary)] text-[11px] font-bold uppercase tracking-[0.25em] mb-4">О компании</p>
          <h2 className="font-display text-[var(--text)] mb-5" style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', lineHeight: 0.9, letterSpacing: '-0.03em' }}>
            РАБОТАЕМ<br />С 2010 ГОДА
          </h2>
          <p className="text-[var(--accent)] leading-relaxed mb-8 max-w-[52ch]">
            Торговый дом «Ангара» — прямой поставщик пиломатериалов. Собственный склад на ул. Маерчака, 109М.
          </p>
          <Link href="/1/about" className="inline-flex items-center gap-2 text-[var(--text)] font-semibold text-sm hover:text-[var(--primary)] transition-colors group">
            Подробнее <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden bg-[var(--bg)] border-t border-[var(--border)]">
        <div className="absolute inset-0 bg-blueprint-fine pointer-events-none" aria-hidden="true" />
        <div className="relative z-10 max-w-[1440px] mx-auto px-6 py-20 md:py-32">
          <p className="text-[var(--primary)] text-xs font-bold uppercase tracking-[0.25em] mb-6">Готовы сделать заказ?</p>
          <h2 className="font-display text-[var(--text)] mb-10 max-w-3xl" style={{ fontSize: 'clamp(3rem, 8vw, 7rem)', lineHeight: 0.85, letterSpacing: '-0.04em' }}>
            НАЧНЁМ<br />ПРЯМО<br />СЕЙЧАС
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center">
            <Link href="/1/catalog" className="inline-flex items-center justify-center gap-2 bg-[var(--primary)] hover:bg-[var(--primary-dark)] text-[var(--text)] px-8 py-4 font-bold uppercase tracking-[0.15em] text-sm transition-colors duration-300">
              Перейти в каталог <ArrowRight size={17} />
            </Link>
            <a href="tel:+79535850509" className="inline-flex items-center justify-center gap-2 border border-[var(--border)] hover:border-[var(--primary)] text-[var(--text)] px-8 py-4 font-bold uppercase tracking-[0.15em] text-sm transition-colors duration-300">
              <Phone size={15} />
              +7 953 585 05 09
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
