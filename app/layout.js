import { Inter } from 'next/font/google'
import './globals.css'
import { CartProvider } from './lib/cart-context'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata = {
  title: 'Cefiro Studios',
  description: 'Art, apparel, and objects from Cefiro Studios. Built by a Creator, Healer, and Athlete.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen flex flex-col">
        <CartProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  )
}
