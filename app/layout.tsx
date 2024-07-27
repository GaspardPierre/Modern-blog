import './globals.css'
import { Inter } from 'next/font/google'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Holy Fire',
  description: 'Stay informed with the latest investment news and analysis',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen flex flex-col bg-gray-light`}>
        <Header />
        <div className="flex-grow container mx-auto px-4 py-8">
          {children}
        </div>
        <Footer />
      </body>
    </html>
  )
}