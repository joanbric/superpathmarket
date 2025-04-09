'use client'
import { Button, Card, FileInput, Label, ListGroup, ModalFooter, Select, TextInput } from 'flowbite-react'
import ModalComponent from '@components/Modal'
import { createProduct } from '@/actions'
import { useEffect, useState } from 'react'
import { PlusIcon, SaveIcon, Trash2, XCircle } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { Store } from '@/types'

type StorePrice = {
  storeId: number
  price: number
}

export default function EditProductModal({ operationType }: { operationType: 'create' | 'edit' }) {
  const [imagePreview, setImagePreview] = useState<string>('')
  const [showModal, setShowModal] = useState(false)
  const router = useRouter()
  const [stores, setStores] = useState<Store[]>([])
  const [storePrices, setStorePrices] = useState<StorePrice[]>([{ storeId: 0, price: 0 }])

  const getRemainingStores = (storeId: number) =>
    stores.filter(store => store.id === storeId || !storePrices.some(storePrice => storePrice.storeId === store.id))

  useEffect(() => {
    fetch('/api/stores')
      .then(res => res.json())
      .then(data => {
        setStores(data)
      })
  }, [])

  if (!showModal && imagePreview !== '') {
    setImagePreview('')
  }

  const closeModal = () => {
    setShowModal(false)
  }

  const handleSubmit = () => {
    router.replace('/app/products')
    closeModal()
  }
  const handleAddStorePrice = () => {
    setStorePrices([...storePrices, { storeId: 0, price: 0 }])
  }
  const handleDeleteStorePrice = (storeId: number) => {
    const newStorePrices = [...storePrices]
    newStorePrices.splice(
      newStorePrices.findIndex(storePrice => storePrice.storeId === storeId),
      1
    )
    setStorePrices(newStorePrices)
  }

  return (
    <>
      <Button
        onClick={() => {
          setShowModal(true)
        }}
        className="flex font-bold gap-2 items-center"
      >
        <PlusIcon /> Create product
      </Button>
      <ModalComponent
        show={showModal}
        titleHeader={operationType === 'create' ? 'New Product' : 'Edit [product name]'}
        closeModal={closeModal}
        onSubmit={handleSubmit}
        theme={{
          body: { base: 'px-1 md:px-6' },
          content: { base: 'px-2 md:px-4' },
          header: { base: 'px-2 md:px-5' },
          footer: { base: 'px-2 md:px-5' }
        }}
      >
        <form
          action={createProduct}
          onSubmit={closeModal}
          className="space-y-4"
        >
          <Card theme={{ root: { children: 'p-4' } }}>
            {/* <div className="flex items-center justify-center my-3 w-full"> */}
            <Label
              htmlFor="dropzone-file"
              className="w-full"
            >
              {!imagePreview ? (
                <div className="bg-gray-50 border-2 border-dashed border-gray-300 cursor-pointer dark:bg-gray-700 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:border-gray-500 flex flex-col h-64 hover:bg-gray-100 items-center justify-center pb-6 pt-5 rounded-lg">
                  <svg
                    className="dark:text-gray-400 h-8 mb-4 text-gray-500 w-8"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 16"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                    />
                  </svg>
                  <p className="dark:text-gray-400 mb-2 text-gray-500 text-sm">
                    <span className="font-semibold">Click to upload</span> or drag and drop
                  </p>
                  <p className="dark:text-gray-400 text-gray-500 text-xs">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                </div>
              ) : (
                <img
                  src={imagePreview}
                  alt=""
                />
              )}
              <FileInput
                id="dropzone-file"
                className="hidden"
                name="image"
                onChange={e => {
                  if (e.target.files && e.target.files.length > 0) {
                    setImagePreview(URL.createObjectURL(e.target.files[0]))
                  }
                }}
              />
            </Label>
            {/* </div> */}
          </Card>
          <Card theme={{ root: { children: 'p-4' } }}>
            <Label htmlFor="name">Name</Label>
            <TextInput
              id="name"
              placeholder="Sugar"
              name="name"
              required
            />
            <Label htmlFor="plu">PLU</Label>
            <TextInput
              id="plu"
              placeholder="123456789"
              name="plu"
              required
            />
          </Card>

          <Card
            className="w-full"
            theme={{ root: { children: 'p-4' } }}
          >
            <header className="flex flex-wrap items-center justify-between w-full">
              <h5 className="dark:text-white font-semibold text-gray-900 text-lg tracking-tight">Store Prices</h5>
              <Button
                className="flex font-bold gap-2 items-center"
                content="hola"
                size="sm"
                outline
                pill
                theme={{ outlineColor: { default: 'border md:border-0' }, size: { sm: 'px-0 h-fit md:h-9 md:px-3' } }}
                onClick={handleAddStorePrice}
              >
                <PlusIcon /> <span className="hidden md:inline">Add Store Price</span>
              </Button>
            </header>

            <ListGroup>
              {storePrices.map((storePrice, index) => (
                <li
                  key={index}
                  className="border-b border-gray-200 dark:border-gray-600 gap-2 grid grid-cols-[6fr_1fr] grid-flow-col grid-rows-2 px-2 py-2 w-full md:flex md:gap-2 md:items-center"
                >
                  <div className="flex flex-col gap-2 md:flex-2">
                    <Label htmlFor="store">Store</Label>
                    <Select
                      id="store"
                      name="store"
                      value={storePrice.storeId}
                      className="is_active"
                      onChange={e => {
                        const newStorePrices = [...storePrices]
                        newStorePrices[index].storeId = Number(e.target.value)
                        setStorePrices(newStorePrices)
                      }}
                    >
                      <option value="0">Select Store</option>
                      {getRemainingStores(storePrice.storeId).map(store => (
                        <option
                          key={store.id}
                          value={store.id}
                        >
                          {store.name} --&gt; {store.address.split(',')[0]}
                        </option>
                      ))}
                    </Select>
                  </div>
                  <div className="flex flex-col gap-2 md:flex-1">
                    <Label htmlFor="price">Price</Label>
                    <TextInput
                      id="price"
                      placeholder="599"
                      name="price"
                      required
                      value={storePrice.price}
                      onChange={e => {
                        const newStorePrices = [...storePrices]
                        newStorePrices[index].price = Number(e.target.value)
                        setStorePrices(newStorePrices)
                      }}
                    />
                  </div>
                  <button
                    onClick={() => handleDeleteStorePrice(storePrice.storeId)}
                    className="active:bg-red-500 active:dark:bg-red-700 active:text-white border-0 dark:text-white flex h-full hover:bg-red-500 hover:dark:bg-red-700 hover:text-white items-center justify-center outline-0 p-1 place-self-center rounded-lg row-span-2 text-red-500 w-full md:flex-0 md:place-self-end md:py-2"
                    type="button"
                  >
                    <Trash2 />
                  </button>
                </li>
              ))}
            </ListGroup>
          </Card>

          <ModalFooter className="justify-end">
            <Button
              color="red"
              onClick={closeModal}
              className="flex font-bold gap-2 items-center"
              outline
            >
              <XCircle className="w-5" /> Cancel
            </Button>
            <Button
              type="submit"
              className="flex font-bold gap-2 items-center"
            >
              <SaveIcon className="w-5" /> Save
            </Button>
          </ModalFooter>
        </form>
      </ModalComponent>
    </>
  )
}
