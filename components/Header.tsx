'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

  const navItems = [
    { label: 'Browse', href: '/browse' },
    { label: 'Latest', href: '/latest' },
    { label: 'Blog', href: '/blog' },
    { label: 'Videos', href: '/videos' },
    { label: 'Articles', href: '/articles' },
    { label: 'Companies', href: '/companies' },
    { label: 'About', href: '/about' },
  ]

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <div className="text-2xl font-bold">Investment News Platform</div>
          
          {/* Mobile menu button */}
          <button onClick={toggleMenu} className="md:hidden">
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Desktop navigation */}
          <nav className="hidden md:block">
            <ul className="flex space-x-4">
              {navItems.map((item, index) => (
                <li key={index}>
                  <Link href={item.href} className="text-gray-600 hover:text-gray-900">
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/" className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-opacity-90">
                  Open App
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        {/* Mobile navigation */}
        {isMenuOpen && (
          <nav className="mt-4 md:hidden">
            <ul className="space-y-2">
              {navItems.map((item, index) => (
                <li key={index}>
                  <Link 
                    href={item.href} 
                    className="block py-2 text-gray-600 hover:text-gray-900"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link 
                  href="/" 
                  className="block py-2 bg-primary text-white px-4 rounded-lg hover:bg-opacity-90"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Open App
                </Link>
              </li>
            </ul>
          </nav>
        )}

        {/* Search bar */}
        <div className="mt-4">
          <input 
            type="text" 
            placeholder="Search articles, videos, companies..." 
            className="w-full px-4 py-2 border rounded-lg"
          />
        </div>
      </div>
    </header>
  )
}