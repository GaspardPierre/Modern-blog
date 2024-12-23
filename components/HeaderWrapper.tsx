'use client'

import { usePathname } from 'next/navigation'
import Header from '@/components/Header'

export default function HeaderWrapper() {
  const pathname = usePathname()
  const isTransparent = pathname === '/'
  
  return <Header isTransparent={isTransparent} />
}
