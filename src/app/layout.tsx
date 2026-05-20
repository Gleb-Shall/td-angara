import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Toaster } from 'react-hot-toast'
import './globals.css'

const inter = Inter({ subsets: ['latin', 'cyrillic'] })

export const metadata: Metadata = {
  title: 'ТД Ангара — Пиломатериалы в Красноярске',
  description: 'Пиломатериалы из сосны и лиственницы. Рейка, брусок, вагонка, имитация бруса, планкен, террасная доска.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" className="h-full">
      <body className={`${inter.className} min-h-full flex flex-col`}>
        {children}
        <Toaster position="bottom-right" />
      </body>
    </html>
  )
}
