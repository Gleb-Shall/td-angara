import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function V2Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main className="flex-1 pt-[72px]">{children}</main>
      <Footer />
    </>
  )
}
