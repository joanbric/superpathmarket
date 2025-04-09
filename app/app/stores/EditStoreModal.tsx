'use client'
import { Button, Label, ModalFooter, TextInput } from 'flowbite-react'
import ModalComponent from '../../components/Modal'
import { createStore } from '@/actions'
import { useState } from 'react'
import { PlusIcon, SaveIcon, XCircle } from 'lucide-react'
import { useRouter } from 'next/navigation'

type EditStoreModalProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  operationType: 'create' | 'edit'
}

export default function EditStoreModal({ operationType }: EditStoreModalProps) {
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
    console.log('vamos a ver')
    router.replace('/app/stores')
    console.log('pura paja')
    closeModal()
  }

  return (
    <>
      <Button
        onClick={() => {
          setShowModal(true)
        }}
        className="flex font-bold gap-2 items-center w-full max-w-[500px] mx-auto md:mr-10 md:w-auto"
      >
        <PlusIcon /> Create store
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
          />
          <Label htmlFor="address">Address</Label>
          <TextInput
            id="address"
            placeholder="North Rd, Boldon Colliery, Newcastle upon Tyne NE35 9AR"
            name="address"
            required
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
