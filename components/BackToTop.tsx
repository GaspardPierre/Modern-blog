
'use client'

import { useState, useEffect } from 'react'
import { ArrowBigUp } from 'lucide-react'

export default function BackToTop() {
  const [showBackToTop, setShowBackToTop] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowBackToTop(true)
      } else {
        setShowBackToTop(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  if (!showBackToTop) return null

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-4 right-4 bg-accent-500 text-white p-2 rounded-full shadow-lg hover:bg-accent-600 transition-colors z-50"
      aria-label="Back to top"
    >
      <ArrowBigUp 
      size={32}/>
    </button>
  )
}