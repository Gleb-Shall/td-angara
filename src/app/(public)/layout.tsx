import HeaderV1 from '@/components/HeaderV1'
import FooterV1 from '@/components/FooterV1'

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ fontFamily: 'var(--font-outfit), system-ui, sans-serif' }} className="v1 flex flex-col min-h-screen">
      <HeaderV1 />
      <main className="flex-1">{children}</main>
      <FooterV1 />
    </div>
  )
}
