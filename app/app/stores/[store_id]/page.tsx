import { Sketch, Store } from '@/types'
import { API_URL } from '@libs/constants'
import { Card } from 'flowbite-react'
import Link from 'next/link'
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

  const {store} = (await res.json()) as { store: Store, sketch: Sketch }

  return (
    <div>
      {store && (
        <>
          <Card className="max-w-[800px] mb-2 md:mb-4 w-full" theme={{root:{children: 'p-3 gap-0 md:p-6 md:gap-4'}}}>
            <h2 className="dark:text-white font-bold md:mb-4 text-xl md:text-2xl text-black">{store.name}</h2>

            <p className="dark:text-gray-300 text-gray-500">
              <b>Location:</b> {store.address}
            </p>
          </Card>

          <Card className="max-w-[800px] rounded-lg w-full" />
        </>
      )}
    </div>
  )
}
