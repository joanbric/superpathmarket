import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import { ReactNode } from 'react'
import Header from '@components/Header'
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
    'Shop smarter & save time! Our app maps your supermarket list into the fastest route, guiding you straight to each item. Never wander aisles again—check off your list in record time!'
}

export default async function RootLayout({
  children
}: Readonly<{
  children: ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        style={{}}
        draggable={false}
      >
        <Header />
        {children}
      </body>
    </html>
  )
}
