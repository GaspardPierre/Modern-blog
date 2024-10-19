'use client'

import { useRouter } from 'next/navigation'
import { MoveLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'


export default function BackButton() {
  const router = useRouter()

  return (
    <Button
      onClick={() => router.back()}
      variant="borderless"
      className="mt-4 flex items-center"
    >

  <MoveLeft 
  className='mx-2'/>  Tous les articles ...
    </Button>
  )
}