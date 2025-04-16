'use client'
import { Button, ButtonProps, Label, ModalFooter, TextInput } from 'flowbite-react'
import ModalComponent from '../../components/Modal'
import { createStore } from '@/actions'
import { useState } from 'react'
import { EditIcon, PlusIcon, SaveIcon, XCircle } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { Store } from '@/types'

type EditStoreModalProps = React.ButtonHTMLAttributes<HTMLButtonElement> & ButtonProps & {
  operationType: 'create' | 'edit'
  store?: Store
}

export default function EditStoreModal({ operationType, store = { id: 0, name: '', address: '', sketch_id: null, img_url: null }, ...props }: EditStoreModalProps) {
  const [imagePreview, setImagePreview] = useState<string>('')
  const [showModal, setShowModal] = useState(false)
  const router = useRouter()
  if (!showModal && imagePreview !== '') {
    setImagePreview('')
  }

  const closeModal = () => {
    setShowModal(false)
  }

  const handleSubmit = () => {
    router.replace('/app/stores')
    closeModal()
  }

  return (
    <>
      <Button
        onClick={() => {
          setShowModal(true)
        }}
        className="flex font-bold gap-2 items-center w-full max-w-[500px] mx-auto md:mr-10 md:w-auto"
        {...props}
      >
        {operationType === 'create' ? (
          <><PlusIcon /> Create store</>
        ) : (
          <><EditIcon /> Edit store</>
        )}

      </Button>
      <ModalComponent
        show={showModal}
        titleHeader={operationType === 'create' ? 'New Store' : 'Edit [store name]'}
        closeModal={closeModal}
        onSubmit={() => {}}
      >
        <form
          action={createStore}
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          <Label htmlFor="name">Name</Label>
          <TextInput
            id="name"
            placeholder="Asda Boldon Supercentre"
            name="name"
            required
            value={store.name}
          />
          <Label htmlFor="address">Address</Label>
          <TextInput
            id="address"
            placeholder="North Rd, Boldon Colliery, Newcastle upon Tyne NE35 9AR"
            name="address"
            required
            value={store.address}
          />
          <ModalFooter>
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
