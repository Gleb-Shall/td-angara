import { TreePine, Award, Users, Factory } from 'lucide-react'

export const metadata = { title: 'О компании — ТД Ангара' }

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
      <div className="flex items-center gap-3 mb-4">
        <TreePine size={32} className="text-[var(--amber)]" />
        <h1 className="text-3xl font-bold">О компании</h1>
      </div>
      <p className="text-[var(--muted)] text-lg leading-relaxed mb-12">
        ТД Ангара — производитель и поставщик пиломатериалов из Красноярска. Работаем с 2010 года, поставляем
        продукцию по всему Красноярскому краю.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
        {[
          { icon: Factory, label: 'Собственная пилорама', desc: 'Полный контроль качества от бревна до доски' },
          { icon: Award, label: 'Сортировка по ГОСТ', desc: 'Категории C и D, влажность 12–14% после камерной сушки' },
          { icon: Users, label: 'Работаем с 2010 года', desc: 'Тысячи выполненных заказов для физлиц и организаций' },
        ].map(({ icon: Icon, label, desc }) => (
          <div key={label} className="bg-white p-6 rounded-xl border border-[var(--border)]">
            <Icon size={28} className="text-[var(--amber)] mb-3" />
            <h3 className="font-semibold mb-1">{label}</h3>
            <p className="text-sm text-[var(--muted)]">{desc}</p>
          </div>
        ))}
      </div>

      <div className="bg-[var(--forest)] text-white rounded-2xl p-8">
        <h2 className="text-xl font-bold mb-4">Ассортимент</h2>
        <ul className="grid grid-cols-2 gap-2 text-white/80 text-sm">
          {['Рейка сосновая', 'Брусок 50×50', 'Вагонка сосна', 'Имитация бруса', 'Планкен лиственница', 'Террасная доска'].map((item) => (
            <li key={item} className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--amber)] shrink-0" />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
