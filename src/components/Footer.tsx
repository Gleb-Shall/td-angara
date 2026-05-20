import Link from 'next/link'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="relative bg-[var(--bg)] border-t border-[var(--border)] text-[var(--text)]">
      {/* Vertical I-beam orange left edge */}
      <div aria-hidden="true" className="pointer-events-none absolute left-0 top-0 h-full w-1.5 md:w-2.5 bg-[var(--primary)]" />

      <div className="max-w-[1440px] mx-auto px-8 md:px-14 lg:px-20 py-14 md:py-20">

        {/* Monumental top row */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-end pb-10 md:pb-14 border-b border-[var(--border)]">
          <div className="md:col-span-8">
            <p className="text-[var(--primary)] text-xs font-bold tracking-[0.25em] uppercase mb-4">
              Торговый дом · Красноярск
            </p>
            <h2
              className="text-[var(--text)] font-display leading-[0.85]"
              style={{ fontSize: 'clamp(3rem, 9vw, 7rem)', letterSpacing: '-0.05em' }}
            >
              ПИЛОМАТЕРИАЛ<br />ИЗ СЕРДЦА СИБИРИ
            </h2>
          </div>
          <div className="md:col-span-4 md:flex md:justify-end">
            <a
              href="tel:+79535850509"
              className="group inline-flex items-center gap-3 border border-[var(--primary)] bg-[var(--primary)] hover:bg-[var(--bg)] transition-colors duration-300 px-6 py-4 md:px-8 md:py-5"
            >
              <span className="block w-2 h-2 bg-[var(--text)] group-hover:bg-[var(--primary)] transition-colors" />
              <span className="text-[var(--text)] font-bold tracking-[0.15em] text-sm uppercase">
                Позвонить
              </span>
            </a>
          </div>
        </div>

        {/* 3-column info grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8 pt-12 md:pt-16">

          {/* Brand */}
          <div>
            <p
              className="text-[var(--text)] mb-2 font-display"
              style={{ fontSize: '2rem', letterSpacing: '-0.03em', lineHeight: 1 }}
            >
              АНГАРА ТД
            </p>
            <p className="text-[var(--muted-fg)] text-sm leading-relaxed max-w-xs">
              Пиломатериалы из сосны и лиственницы. Камерная сушка 12%. Сорта C–D.
            </p>
          </div>

          {/* Address & contacts */}
          <div>
            <p className="text-[var(--primary)] text-xs font-bold tracking-[0.25em] uppercase mb-5">
              База / Контакты
            </p>
            <ul className="space-y-3">
              <li>
                <span className="block text-[var(--muted-fg)] text-xs tracking-[0.2em] uppercase mb-1">Адрес</span>
                <span className="block text-[var(--text)] text-base leading-relaxed">
                  Красноярск,<br />улица Маерчака, 109М
                </span>
              </li>
              <li>
                <span className="block text-[var(--muted-fg)] text-xs tracking-[0.2em] uppercase mb-1">Телефон</span>
                <a href="tel:+79535850509" className="block text-[var(--text)] hover:text-[var(--primary)] transition-colors text-base">
                  +7 953 585 05 09
                </a>
              </li>
            </ul>
          </div>

          {/* Hours & nav */}
          <div>
            <p className="text-[var(--primary)] text-xs font-bold tracking-[0.25em] uppercase mb-5">
              Навигация
            </p>
            <ul className="space-y-2.5">
              <li>
                <Link href="/1/catalog" className="text-[var(--muted-fg)] hover:text-[var(--text)] text-sm transition-colors">
                  Каталог
                </Link>
              </li>
              <li>
                <Link href="/1/about" className="text-[var(--muted-fg)] hover:text-[var(--text)] text-sm transition-colors">
                  О компании
                </Link>
              </li>
              <li>
                <Link href="/1/contacts" className="text-[var(--muted-fg)] hover:text-[var(--text)] text-sm transition-colors">
                  Контакты
                </Link>
              </li>
            </ul>
            <div className="mt-8">
              <span className="block text-[var(--muted-fg)] text-xs tracking-[0.2em] uppercase mb-1">Часы работы</span>
              <span className="block text-[var(--text)] text-base">пн–пт · 10:00 — 18:00</span>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-14 md:mt-20 pt-6 border-t border-[var(--border)] flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <p className="text-[var(--muted-fg)] text-xs tracking-[0.2em] uppercase">
            © {year} · ТД «Ангара» · Все права защищены
          </p>
          <p className="text-[var(--muted-fg)] text-xs tracking-[0.2em] uppercase">
            Опт −10% от 10 м³ · Рассрочка 0%
          </p>
        </div>
      </div>
    </footer>
  )
}
