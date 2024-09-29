import './globals.css'
import { Inter, Poppins } from 'next/font/google'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { Providers } from '@/components/Providers'
import BackToTop from '@/components/BackToTop'


const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
})

const poppins = Poppins({
  weight: ['400', '600', '700'],
  subsets: ['latin'],
  variable: '--font-poppins',
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
      <body className={`${inter.variable} ${poppins.variable} min-h-screen flex flex-col bg-gray-light`}>
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