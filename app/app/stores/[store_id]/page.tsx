import { Sketch, Store } from '@/types'
import { API_URL } from '@libs/constants'
import Link from 'next/link'
import { Suspense } from 'react'
import CanvasWrapper from './CanvasWrapper'


export default async function StorePage({ params }: { params: Promise<{ store_id: string }> }) {
  const { store_id } = await params

  const res = await fetch(`${API_URL}/stores/${store_id}`)

  if (!res.ok) {
    return (
      <div className="flex flex-col gap-5 items-center">
        <p className="font-bold text-gray-400 text-xl">
          {res.status === 400 || res.status === 404 ? 'Store not found' : 'Unexpected error'}
        </p>

        <Link
          href="/app/stores"
          className="bg-blue-700 dark:bg-blue-600 dark:focus:ring-blue-800 dark:hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium hover:bg-blue-800 px-5 py-2.5 rounded-lg text-sm text-white"
        >
          Go back to stores
        </Link>
      </div>
    )
  }

  const { store, sketch } = (await res.json()) as { store: Store; sketch: Sketch }

  if (store)
    return (
      <>


        <Suspense fallback={<p>Loading sketch...</p>}>
          <CanvasWrapper store={store} sketchID={store.id.toString()} nodes={sketch.nodes}  />
        </Suspense>
      </>
    )
}
