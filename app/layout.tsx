import './globals.css'
import { Lora, Roboto } from 'next/font/google'

import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { Providers } from '@/components/Providers'
import BackToTop from '@/components/BackToTop'


const roboto = Roboto({
  subsets: ['latin'],
  variable: '--font-roboto',
  weight: ['400', '700'], // Gras pour les sous-titres ou descriptions
})

const lora = Lora({
  subsets: ['latin'],
  variable: '--font-lora',
  weight: ['400', '700'], // Gras pour les titres
})

export const metadata = {
  title: 'Holy Fire',
  description: 'Un autre regard sur le monde',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${roboto.variable} ${lora.variable} min-h-screen flex flex-col bg-gray-light`}>
        <Providers>
          <Header />
          <div className="flex-grow container mx-auto px-4 py-8">
            {children}
          </div>
          <BackToTop />
          <Footer />
        </Providers>
      </body>
    </html>
  )
}