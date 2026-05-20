import { auth } from '@/lib/auth'
import { NextResponse } from 'next/server'

export async function requireAdmin() {
  const session = await auth()
  if (!session) {
    return NextResponse.json({ error: 'Не авторизован' }, { status: 401 })
  }
  return null
}
