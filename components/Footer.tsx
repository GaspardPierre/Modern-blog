// components/Footer.tsx
import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Qui sommes nous ?</h3>
            <p className="text-sm text-gray-400"></p>« Ma bouche sera la bouche des malheurs qui n'ont point de bouche, ma voix, la liberté de celles qui s'affaissent au cachot du désespoir. » Aimé Césaire
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Navigation</h3>
            <ul className="space-y-2">
              <li><Link href="/" className="text-sm text-gray-400 hover:text-white">Home</Link></li>
              <li><Link href="/blog" className="text-sm text-gray-400 hover:text-white">Articles</Link></li>
              <li><Link href="/videos" className="text-sm text-gray-400 hover:text-white">Videos</Link></li>
              <li><Link href="/about" className="text-sm text-gray-400 hover:text-white">Auteurs</Link></li>
              <li><Link href="/about" className="text-sm text-gray-400 hover:text-white">A propos</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Connect</h3>
            <ul className="space-y-2">
              <li><Link href="#" className="text-sm text-gray-400 hover:text-white">Facebook</Link></li>
              <li><Link href="#" className="text-sm text-gray-400 hover:text-white">Twitter</Link></li>
              <li><Link href="#" className="text-sm text-gray-400 hover:text-white">LinkedIn</Link></li>
              <li><Link href="#" className="text-sm text-gray-400 hover:text-white">Instagram</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">S'inscrire</h3>
            <p className="text-sm text-gray-400 mb-2">Recevez notre Newsletter !</p>
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg mb-2"
            />
            <button className="w-full bg-primary text-white py-2 px-4 rounded-lg hover:bg-opacity-90">Subscribe</button>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-700 text-center text-sm text-gray-400">
          <p>&copy; 2024 Holy Fire. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}