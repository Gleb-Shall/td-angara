'use client'

import Link from 'next/link'
import { useState } from 'react'
import CartIcon from './CartIcon'

const NAV = [
  { href: '/1/catalog', label: 'Каталог' },
  { href: '/1/about', label: 'О компании' },
  { href: '/1/contacts', label: 'Контакты' },
]

function AngaraLogo() {
  return (
    <svg width="32" height="32" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <polygon
        points="50,4 93,27 93,73 50,96 7,73 7,27"
        stroke="#C46A2D"
        strokeWidth="6"
        fill="none"
      />
      <text
        x="50"
        y="67"
        textAnchor="middle"
        fill="#C46A2D"
        fontSize="52"
        fontWeight="800"
        fontFamily="system-ui"
      >А</text>
    </svg>
  )
}

export default function Header() {
  const [open, setOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[var(--bg)] border-b border-[var(--border)]">
      <div className="max-w-[1440px] mx-auto px-5 md:px-8 flex items-center justify-between gap-4" style={{ minHeight: 72 }}>

        {/* Logo box */}
        <Link
          href="/1"
          aria-label="ТД Ангара — на главную"
          className="inline-flex items-center justify-center shrink-0 bg-[var(--surface)] border border-[var(--border)] hover:border-[var(--primary)] transition-colors duration-150"
          style={{ width: 48, height: 48 }}
        >
          <AngaraLogo />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center justify-center flex-1 gap-1" aria-label="Главная навигация">
          {NAV.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className="group relative inline-flex items-center gap-2 px-3.5 py-2.5 text-[0.72rem] font-bold uppercase tracking-[0.18em] text-[var(--text)] hover:text-[var(--accent)] transition-colors duration-150 whitespace-nowrap"
            >
              <span
                className="w-1.5 h-1.5 bg-[var(--border)] group-hover:bg-[var(--primary)] group-hover:rotate-45 transition-all duration-300"
                aria-hidden="true"
              />
              {n.label}
            </Link>
          ))}
        </nav>

        {/* Right actions */}
        <div className="flex items-center gap-2.5">
          {/* Phone — desktop */}
          <a
            href="tel:+79535850509"
            className="hidden md:flex flex-col items-end leading-none text-[var(--text)] hover:text-[var(--primary)] transition-colors duration-150 pr-1"
            aria-label="Позвонить по номеру +7 953 585 05 09"
          >
            <span className="text-[0.62rem] font-normal uppercase tracking-[0.25em] text-[var(--muted-fg)]">
              пн–пт 10:00–18:00
            </span>
            <span
              className="font-display text-xl mt-0.5"
              style={{ letterSpacing: '0.02em' }}
            >
              +7 953 585 05 09
            </span>
          </a>

          {/* CTA — desktop */}
          <a
            href="tel:+79535850509"
            className="hidden md:inline-flex items-center gap-2.5 bg-[var(--primary)] hover:bg-[var(--accent)] hover:text-[var(--bg)] text-[var(--text)] px-[18px] py-3 text-[0.75rem] font-black uppercase tracking-[0.18em] border border-[var(--primary)] transition-colors duration-150 whitespace-nowrap"
          >
            <span>Позвонить</span>
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="square" aria-hidden="true">
              <path d="M5 12h14M13 5l7 7-7 7" />
            </svg>
          </a>

          {/* Cart */}
          <div className="text-[var(--text)] [&_a]:text-[var(--text)] [&_a]:hover:text-[var(--primary)]">
            <CartIcon />
          </div>

          {/* Burger — mobile/tablet */}
          <button
            type="button"
            className="lg:hidden inline-flex flex-col justify-center items-center gap-[5px] bg-transparent border border-[var(--border)] hover:border-[var(--primary)] transition-colors duration-150 cursor-pointer"
            style={{ width: 44, height: 44 }}
            onClick={() => setOpen(!open)}
            aria-label={open ? 'Закрыть меню' : 'Открыть меню'}
            aria-expanded={open}
          >
            <span
              className="block w-[18px] h-[2px] bg-[var(--text)] transition-transform duration-300"
              style={open ? { transform: 'translateY(7px) rotate(45deg)' } : undefined}
            />
            <span
              className="block w-[18px] h-[2px] bg-[var(--text)] transition-opacity duration-150"
              style={open ? { opacity: 0 } : undefined}
            />
            <span
              className="block w-[18px] h-[2px] bg-[var(--text)] transition-transform duration-300"
              style={open ? { transform: 'translateY(-7px) rotate(-45deg)' } : undefined}
            />
          </button>
        </div>
      </div>

      {/* Mobile sheet */}
      <div
        className="lg:hidden fixed inset-x-0 bg-[var(--bg)] border-t border-[var(--border)] overflow-y-auto transition-all duration-300"
        style={{
          top: 72,
          bottom: 0,
          opacity: open ? 1 : 0,
          transform: open ? 'translateY(0)' : 'translateY(-12px)',
          pointerEvents: open ? 'auto' : 'none',
          maxHeight: 'calc(100vh - 72px)',
        }}
        aria-hidden={!open}
      >
        <div className="max-w-[1440px] mx-auto px-5 py-6 flex flex-col gap-6">
          <nav className="flex flex-col border-t border-[var(--border)]" aria-label="Мобильная навигация">
            {NAV.map((n, i) => (
              <Link
                key={n.href}
                href={n.href}
                onClick={() => setOpen(false)}
                className="flex items-baseline gap-4 py-[18px] px-3 border-b border-[var(--border)] border-l-4 border-l-transparent hover:border-l-[var(--primary)] hover:bg-[var(--surface)] transition-colors duration-150"
              >
                <span className="text-[0.7rem] font-bold uppercase tracking-[0.25em] text-[var(--muted-fg)]">
                  0{i + 1}
                </span>
                <span className="font-display" style={{ fontSize: 'clamp(1.75rem, 7vw, 2.5rem)', letterSpacing: '-0.02em', lineHeight: 1 }}>
                  {n.label}
                </span>
              </Link>
            ))}
          </nav>

          <div className="flex flex-col gap-4 pt-2">
            <a
              href="tel:+79535850509"
              onClick={() => setOpen(false)}
              className="flex flex-col bg-[var(--surface)] border-l-4 border-l-[var(--primary)] px-4 py-3.5 text-[var(--text)]"
            >
              <span className="text-[0.62rem] font-normal uppercase tracking-[0.25em] text-[var(--muted-fg)]">
                пн–пт 10:00–18:00
              </span>
              <span className="font-display text-[1.75rem] mt-0.5">
                +7 953 585 05 09
              </span>
            </a>
            <a
              href="tel:+79535850509"
              onClick={() => setOpen(false)}
              className="inline-flex w-full justify-center items-center bg-[var(--primary)] text-[var(--text)] text-sm font-black uppercase tracking-[0.15em] py-4"
            >
              Позвонить
            </a>
            <p className="text-[0.75rem] uppercase tracking-[0.18em] text-[var(--muted-fg)]">
              Красноярск, ул. Маерчака, 109М
            </p>
          </div>
        </div>
      </div>
    </header>
  )
}
