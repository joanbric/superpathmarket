import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import { ReactNode } from 'react'
import Header from '@components/Header'
import { ThemeProvider } from './context/ThemeContext'
import { cookies } from 'next/headers'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin']
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin']
})

export const metadata: Metadata = {
  title: 'SuperPathMarket',
  description:
    'Shop smarter & save time! Our app maps your supermarket list into the fastest route, guiding you straight to each item. Never wander aisles again—check off your list in record time!',
  openGraph: {
    title: 'SuperPathMarket',
    description:
      'Shop smarter & save time! Our app maps your supermarket list into the fastest route, guiding you straight to each item. Never wander aisles again—check off your list in record time!',
    type: 'website',
    url: 'https://superpathmarket.com',
    siteName: 'SuperPathMarket',
    images: [
      {
        url: 'https://superpathmarket.com/og-image.png',
        width: 1200,
        height: 630
      }
    ]
  },
  twitter: {
    title: 'SuperPathMarket',
    description:
      'Shop smarter & save time! Our app maps your supermarket list into the fastest route, guiding you straight to each item. Never wander aisles again—check off your list in record time!',
    card: 'summary_large_image',
    site: 'https://superpathmarket.com',
    images: [
      {
        url: 'https://superpathmarket.com/og-image.png',
        width: 1200,
        height: 630
      }
    ]
  }
}

export default async function RootLayout({
  children
}: Readonly<{
  children: ReactNode
}>) {
  const cookieStore = await cookies()
  const themeCookie = cookieStore.get('theme')
  const savedTheme = themeCookie?.value as 'light' | 'dark' | undefined
  const theme = savedTheme || 'light'

  return (
    <html
      lang="en"
      className={theme}
    >
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased dark:bg-gray-900 min-h-screen flex flex-col`}
        draggable={false}
      >
        <ThemeProvider>
          <Header />
          {/* <div className="bg-gradient-to-b dark:from-gray-900 dark:to-gray-800 from-blue-50 min-h-screen to-white transition-colors"> */}
          {children}
          {/* </div> */}
        </ThemeProvider>
      </body>
    </html>
  )
}
