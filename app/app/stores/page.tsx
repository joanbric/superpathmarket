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
        <ListGroup className="gap-2 grid grid-min-cols-5 mt-10">
          {storesData.map(store => (
            <ListItem key={store.id}>
              <Card className="md:max-w-xs">
                <a href="#" className='w-full'>
                  <h5 className="dark:text-white font-semibold text-gray-900 text-lg text-nowrap overflow-hidden overflow-ellipsis">{store.name}</h5>
                  <small className="dark:text-white text-gray-900 w-full inline-block text-nowrap overflow-hidden overflow-ellipsis">{store.address}</small>
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
