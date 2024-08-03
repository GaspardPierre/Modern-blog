'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X, Search } from 'lucide-react'
import LoginButton from './LoginButton'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const searchInputRef = useRef(null)

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)
  const toggleSearch = () => setIsSearchOpen(!isSearchOpen)

  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus()
    }
  }, [isSearchOpen])

  const navItems = [
    { label: 'Latest', href: '/latest' },
    { label: 'Blog', href: '/blog' },
    { label: 'Videos', href: '/videos' },
    { label: 'About', href: '/about' },
  ]

  return (
    <header className="bg-gradient-to-r from-gradient-1 to-gradient-2 shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <div className="text-2xl font-bold text-white">Investment News Platform</div>
          
          {/* Mobile menu button */}
          <button onClick={toggleMenu} className="md:hidden text-white">
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Desktop navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <ul className="flex space-x-6">
              {navItems.map((item, index) => (
                <li key={index}>
                  <Link href={item.href} className="text-white hover:text-blue-200 transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            <LoginButton />
            <Link href="/" className="bg-white text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-100 transition-colors">
              Open App
            </Link>
            <button onClick={toggleSearch} className="text-white hover:text-blue-200 transition-colors">
              <Search size={20} />
            </button>
          </nav>
        </div>

        {/* Mobile navigation */}
        {isMenuOpen && (
          <nav className="mt-4 md:hidden bg-white rounded-lg shadow-md p-4">
            <ul className="space-y-3">
              {navItems.map((item, index) => (
                <li key={index}>
                  <Link
                    href={item.href}
                    className="block py-2 text-blue-600 hover:text-blue-800 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li className="py-2">
                <LoginButton />
              </li>
              <li>
                <Link
                  href="/"
                  className="block py-2 bg-blue-500 text-white px-4 rounded-lg hover:bg-blue-600 transition-colors text-center"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Open App
                </Link>
              </li>
            </ul>
          </nav>
        )}

        {/* Search bar */}
        <div className={`mt-4 transition-all duration-300 ease-in-out ${isSearchOpen ? 'opacity-100 max-h-20' : 'opacity-0 max-h-0 overflow-hidden'}`}>
          <div className="relative">
            <input
              ref={searchInputRef}
              type="text"
              placeholder="Search articles, videos, companies..."
              className="w-full px-4 py-2 pl-10 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-400" size={20} />
          </div>
        </div>
      </div>
    </header>
  )
}