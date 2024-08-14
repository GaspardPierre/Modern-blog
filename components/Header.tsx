'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X, Search } from 'lucide-react'
import LoginButton from './LoginButton'
import { Button } from './ui/button'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const searchInputRef = useRef(null)
  const searchContainerRef = useRef(null)

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)
  const toggleSearch = () => setIsSearchOpen(!isSearchOpen)

  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus()
    }
  }, [isSearchOpen])

  useEffect(() => {
    function handleClickOutside(event) {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target)) {
        setIsSearchOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const navItems = [
    { label: 'Home', href: '/' },
    { label: 'Blog', href: '/blog' },
    { label: 'Videos', href: '/videos' },
    { label: 'About', href: '/about' },
  ]

  return (
    <header className="bg-gradient-to-r from-gradient-1 to-gradient-2 shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <div className="text-2xl font-bold text-white">Holy Fire</div>
            <div ref={searchContainerRef} className="relative ">
              {isSearchOpen ? (
                <input
                  ref={searchInputRef}
                  type="search"
                  className="w-0 bg-white text-gray-900 rounded-full py-1 px-3 leading-tight focus:outline-none animate-expand"
                  placeholder="Search..."
                />
              ) : (
                <Button onClick={toggleSearch} 
                size="icon"
                className="text-white hover:text-text transition-colors ml-5">
                  <Search size={24} 
                  className='bg-transparent'/>
                </Button>
              )}
            </div>
          </div>
          
          {/* Mobile menu button */}
          <button onClick={toggleMenu} className="md:hidden text-white">
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Desktop navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <ul className="flex space-x-6 items-center">
              {navItems.map((item, index) => (
                <li key={index}>
                  <Link href={item.href} className="text-white hover:text-blue-200 transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            <LoginButton />
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
                    className="block py-2 text-text hover:text-blue-800 transition-colors"
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
                  className="block bg-transparent text-white px-4 rounded-lg hover:bg-secondary transition-colors text-center"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Open App
                </Link>
              </li>
            </ul>
          </nav>
        )}
      </div>
    </header>
  )
}