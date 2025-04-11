import { Card, ListGroup, ListItem } from 'flowbite-react'
import EditStoreModal from './EditStoreModal'

const API_URL = process.env.NODE_ENV === 'development' ? 'http://localhost:3000/api' : 'https://superpathmarket.com'

interface Store {
  id: number
  name: string
  address: string
}

export default async function StoresPage() {
  const stores = await fetch(`${API_URL}/stores`)
  const storesData = (await stores.json()) as Store[]

  return (
    <>
      <EditStoreModal operationType="create" />

      {storesData.length > 0 && (
        <ListGroup className="gap-2 grid grid-min-cols-8 w-full mt-10 p-1">
          {storesData.map(store => (
            <ListItem key={store.id}>
              <Card
                className="md:max-w-xs"
                imgSrc="https://placehold.co/600x400/orange/white"
                imgAlt="Store Image"
              >
                <a
                  href={`/stores/${store.id}`}
                  className="w-full"
                >
                  <h5 className="dark:text-white font-semibold overflow-ellipsis overflow-hidden text-gray-900 text-lg text-nowrap">
                    {store.name}
                  </h5>
                  <small className="dark:text-white inline-block overflow-ellipsis overflow-hidden text-gray-900 text-nowrap w-full">
                    {store.address}
                  </small>
                </a>
              </Card>
            </ListItem>
          ))}
        </ListGroup>
      )}
      {storesData.length === 0 && <p className="font-bold pt-5 text-center text-gray-500">No stores found</p>}
    </>
  )
}
