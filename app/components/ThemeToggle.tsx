'use client'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from '@/context/ThemeContext'

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()

  return (
    <button
      onClick={toggleTheme}
      className="bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 hover:bg-gray-200 p-2 rounded-lg transition-colors"
      aria-label="Toggle theme"
    >
      {theme === 'light' ? (
        <Moon className="dark:text-gray-400 h-5 text-gray-600 w-5" />
      ) : (
        <Sun className="dark:text-gray-400 h-5 text-gray-600 w-5" />
      )}
    </button>
  )
}
