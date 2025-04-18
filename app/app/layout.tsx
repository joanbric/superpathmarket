import { Suspense } from 'react'
import AppMenu from './componets/menu'

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AppMenu />
      <main className="dark:text-white max-w-7xl mx-auto px-4 text-white transition-all w-full md:py-4 flex-2 flex flex-col">
        <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
      </main>
    </>
  )
}
