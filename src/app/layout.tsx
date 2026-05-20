import type { Metadata } from 'next'
import { Outfit } from 'next/font/google'
import { Toaster } from 'react-hot-toast'
import './globals.css'

const outfit = Outfit({ subsets: ['latin'], variable: '--font-outfit' })

export const metadata: Metadata = {
  title: 'ТД Ангара — Пиломатериалы в Красноярске',
  description: 'Пиломатериалы из сосны и лиственницы. Рейка, брусок, вагонка, имитация бруса, планкен, террасная доска.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" className="h-full">
      <body className={`${outfit.variable} min-h-full flex flex-col`}>
        {children}
        <Toaster position="bottom-right" />
      </body>
    </html>
  )
}
