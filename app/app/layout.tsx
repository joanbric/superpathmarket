import { Suspense } from 'react'
import AppMenu from './componets/menu'

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AppMenu />
      <div className="flex md:ml-10">
        <main className="duration-300 flex-1 md:py-4 px-4 transition-all text-white dark:text-white w-full max-w-7xl mx-auto">
          <Suspense fallback={<div>Loading...</div>}>
            {children}
          </Suspense>
        </main>
      </div>
    </>
  )
}
