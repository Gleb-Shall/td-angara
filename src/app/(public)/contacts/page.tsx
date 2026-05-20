import { MapPin, Phone, Clock } from 'lucide-react'

export const metadata = { title: 'Контакты — ТД Ангара' }

export default function ContactsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
      <h1 className="text-3xl font-bold mb-8">Контакты</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div className="space-y-5">
          <div className="flex gap-4">
            <div className="w-10 h-10 rounded-full bg-[var(--cream)] flex items-center justify-center shrink-0">
              <MapPin size={18} className="text-[var(--amber)]" />
            </div>
            <div>
              <p className="font-semibold mb-0.5">Адрес</p>
              <p className="text-[var(--muted)]">Красноярск, ул. Маерчака, 109М</p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="w-10 h-10 rounded-full bg-[var(--cream)] flex items-center justify-center shrink-0">
              <Phone size={18} className="text-[var(--amber)]" />
            </div>
            <div>
              <p className="font-semibold mb-0.5">Телефон</p>
              <a href="tel:+79535850509" className="text-[var(--amber)] hover:underline font-medium">
                +7 (953) 585-05-09
              </a>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="w-10 h-10 rounded-full bg-[var(--cream)] flex items-center justify-center shrink-0">
              <Clock size={18} className="text-[var(--amber)]" />
            </div>
            <div>
              <p className="font-semibold mb-0.5">Режим работы</p>
              <p className="text-[var(--muted)]">Пн–Сб: 8:00 – 18:00</p>
              <p className="text-[var(--muted)]">Вс: 9:00 – 15:00</p>
            </div>
          </div>
        </div>

        <div className="rounded-xl overflow-hidden border border-[var(--border)] h-64 md:h-auto bg-[var(--cream)] min-h-[280px]">
          <iframe
            src="https://yandex.ru/map-widget/v1/?ll=92.834866%2C56.045438&z=17&l=map&pt=92.834866%2C56.045438%2Cpm2rdm"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allow="geolocation"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="ТД Ангара на карте — ул. Маерчака, 109М, Красноярск"
          />
        </div>
      </div>
    </div>
  )
}
