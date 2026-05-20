import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--cream)]">
      <div className="text-center">
        <p className="text-7xl font-bold text-[var(--forest)] mb-4">404</p>
        <h1 className="text-2xl font-semibold mb-2">Страница не найдена</h1>
        <p className="text-[var(--muted)] mb-8">Запрошенная страница не существует</p>
        <Link
          href="/"
          className="inline-block bg-[var(--forest)] text-white px-6 py-3 rounded-xl font-semibold hover:bg-[var(--amber)] transition-colors"
        >
          На главную
        </Link>
      </div>
    </div>
  )
}
