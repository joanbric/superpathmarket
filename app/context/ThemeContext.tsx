'use client'
import { createContext, useContext, useEffect, useState } from 'react'
import { setCookie, getCookies } from 'cookies-next'

type Theme = 'light' | 'dark'

interface ThemeContextType {
  theme: Theme
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('light')

  useEffect(() => {
    const cookies = getCookies() as { theme?: Theme }
    const savedTheme = cookies.theme
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    const initialTheme = savedTheme || systemTheme
    
    if (theme !== initialTheme) {
      setTheme(initialTheme)
      setCookie('theme', initialTheme, { maxAge: 365 * 24 * 60 * 60 })
    }

    const root = window.document.documentElement
    root.classList.remove('light', 'dark')
    root.classList.add(initialTheme)
    root.setAttribute('data-theme', initialTheme)
  }, [theme])

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
    setCookie('theme', newTheme, { maxAge: 365 * 24 * 60 * 60 })
    
    const root = window.document.documentElement
    root.classList.remove('light', 'dark')
    root.classList.add(newTheme)
    root.setAttribute('data-theme', newTheme)
  }

  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}
