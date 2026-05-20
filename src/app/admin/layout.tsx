import AdminSidebar from '@/components/admin/AdminSidebar'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen" style={{ background: '#F9FAFB', color: '#111827' }}>
      <AdminSidebar />
      <main className="flex-1 p-6 md:p-8" style={{ color: '#111827' }}>{children}</main>
    </div>
  )
}
