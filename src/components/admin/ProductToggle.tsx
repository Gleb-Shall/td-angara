'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function ProductToggle({ id, isActive }: { id: string; isActive: boolean }) {
  const [active, setActive] = useState(isActive)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const toggle = async () => {
    setLoading(true)
    await fetch(`/api/admin/products/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ isActive: !active }),
    })
    setActive(!active)
    setLoading(false)
    router.refresh()
  }

  return (
    <button
      onClick={toggle}
      disabled={loading}
      className={`relative inline-flex w-10 h-5 rounded-full transition-colors ${
        active ? 'bg-green-500' : 'bg-gray-300'
      } disabled:opacity-50`}
    >
      <span
        className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform ${
          active ? 'translate-x-5' : 'translate-x-0'
        }`}
      />
    </button>
  )
}
