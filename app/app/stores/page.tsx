import { Card, ListGroup, ListItem } from 'flowbite-react'
import EditStoreModal from './EditStoreModal'
import { Store } from '@/types'
import { API_URL } from '@libs/constants'
import Link from 'next/link'
import { Expand } from 'lucide-react'

export default async function StoresPage() {
  const stores = await fetch(`${API_URL}/stores`)
  const storesData = (await stores.json()) as Store[]

  return (
    <>
      <EditStoreModal operationType="create" />

      {storesData.length > 0 && (
        <ListGroup className="gap-8  grid grid-min-cols-5 items-stretch justify-items-center mt-10 p-1">
          {storesData.map(store => (
            <ListItem key={store.id} className='w-full'>
              <Card
                className="md:max-w-xs relative"
                imgSrc={store.img_url || '/imgs/sketch-placeholder.webp'}
                imgAlt={`${store.name} sketch`}
              >
                <Link href={`/app/stores/${store.id}`} className="absolute top-3 right-3 dark:bg-cyan-700 bg-white border border-gray-400 text-gray-500 dark:text-white dark:stroke-white p-1 rounded"><Expand /></Link>
                <h5 className="dark:text-white block max-w-full font-semibold overflow-ellipsis overflow-hidden text-gray-900 text-lg text-nowrap w-full">
                  {store.name}
                </h5>
                <small className="dark:text-white block overflow-ellipsis overflow-hidden text-gray-900 text-nowrap w-full">
                  {store.address}
                </small>
                <EditStoreModal operationType="edit" outline store={store} />
              </Card>
            </ListItem>
          ))}
        </ListGroup>
      )}
      {storesData.length === 0 && <p className="font-bold pt-5 text-center text-gray-500">No stores found</p>}
    </>
  )
}
