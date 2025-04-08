import { Suspense } from 'react'
import AppMenu from './componets/menu'

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AppMenu />
      <div className="flex min-h-screen md:ml-10">
        <main className="duration-300 flex-1 p-4 transition-all text-white">
          <Suspense fallback={<div>Loading...</div>}>
            {children}
          </Suspense>
        </main>
      </div>
    </>
  )
}
