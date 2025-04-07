'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ShoppingCart } from 'lucide-react'
import ThemeToggle from './ThemeToggle'

export default function Header() {
  const rutaCompleta = usePathname()

  const isInSketch = rutaCompleta.includes('sketch')
  const isInApp = rutaCompleta.includes('app')
  const smallHeader = isInSketch || isInApp

  if (smallHeader) {
    return (
      <header className="bg-white dark:bg-gray-900 dark:shadow-gray-800 shadow-sm">
        <nav className="max-w-7xl mx-auto px-4 py-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Link
                href="/"
                className="flex items-center space-x-2"
              >
                <ShoppingCart className="dark:text-blue-400 h-6 text-blue-600 w-6" />
                <h1 className="dark:text-white font-bold text-gray-900 text-lg">SmartShop Assistant</h1>
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <ThemeToggle />
            </div>
          </div>
        </nav>
      </header>
    )
  } else {
    return (
      <header className="bg-white dark:bg-gray-900 dark:shadow-gray-800 shadow-sm">
        <nav className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Link
                href="/"
                className="flex items-center space-x-2"
              >
                <ShoppingCart className="dark:text-blue-400 h-8 text-blue-600 w-8" />
                <h1 className="dark:text-white font-bold text-2xl text-gray-900">SmartShop Assistant</h1>
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <ThemeToggle />
            </div>
          </div>
        </nav>
      </header>
    )
  }
}
